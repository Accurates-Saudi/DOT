import { createCmsCacheKey } from "./cache";
import type {
  CmsApiErrorEnvelope,
  CmsApiEnvelope,
  CmsCacheAdapter,
  CmsClientConfig,
  CmsRequestOptions,
  CmsResponseType,
} from "./types";

export class CmsApiError extends Error {
  readonly status: number;

  readonly code: string;

  readonly details?: unknown;

  readonly response: Response;

  constructor(input: {
    status: number;
    code: string;
    message: string;
    details?: unknown;
    response: Response;
  }) {
    super(input.message);
    this.name = "CmsApiError";
    this.status = input.status;
    this.code = input.code;
    this.details = input.details;
    this.response = input.response;
  }
}

export interface CmsRequester {
  cache?: CmsCacheAdapter;
  buildUrl(path: string): string;
  request<T>(path: string, options?: CmsRequestOptions): Promise<T>;
}

function isAbsoluteUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function normalizeBaseUrl(baseUrl?: string): string {
  if (!baseUrl) return "";
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

function normalizePath(path: string): string {
  if (isAbsoluteUrl(path) || path.startsWith("/")) {
    return path;
  }

  return `/${path}`;
}

async function resolveHeaders(
  headers?: CmsClientConfig["defaultHeaders"],
): Promise<HeadersInit | undefined> {
  if (!headers) return undefined;
  return typeof headers === "function" ? headers() : headers;
}

async function parseErrorResponse(response: Response): Promise<CmsApiError> {
  const contentType = response.headers.get("Content-Type") ?? "";

  if (contentType.includes("application/json")) {
    const json = (await response.json()) as CmsApiErrorEnvelope;
    return new CmsApiError({
      status: response.status,
      code: json.error?.code ?? "request_failed",
      message: json.error?.message ?? `CMS request failed with status ${response.status}.`,
      details: json.error?.details,
      response,
    });
  }

  const message = await response.text();
  return new CmsApiError({
    status: response.status,
    code: "request_failed",
    message: message || `CMS request failed with status ${response.status}.`,
    response,
  });
}

async function parseSuccessResponse<T>(
  response: Response,
  responseType: CmsResponseType,
): Promise<T> {
  switch (responseType) {
    case "response":
      return response as T;
    case "text":
      return (await response.text()) as T;
    case "arrayBuffer":
      return (await response.arrayBuffer()) as T;
    case "json":
    default: {
      if (response.status === 204) {
        return undefined as T;
      }

      const json = (await response.json()) as CmsApiEnvelope<T> | T;
      if (
        json !== null &&
        typeof json === "object" &&
        "data" in (json as Record<string, unknown>)
      ) {
        return (json as CmsApiEnvelope<T>).data;
      }

      return json as T;
    }
  }
}

export function createCmsRequester(config: CmsClientConfig = {}): CmsRequester {
  const fetchImpl = config.fetch ?? fetch;
  const baseUrl = normalizeBaseUrl(config.baseUrl);

  function buildUrl(path: string): string {
    const normalizedPath = normalizePath(path);
    if (isAbsoluteUrl(normalizedPath)) {
      return normalizedPath;
    }

    return baseUrl ? `${baseUrl}${normalizedPath}` : normalizedPath;
  }

  async function request<T>(
    path: string,
    options: CmsRequestOptions = {},
  ): Promise<T> {
    const {
      method = "GET",
      headers: requestHeaders,
      body: requestBody,
      json,
      responseType = "json",
      cache: cachePolicy,
      invalidateTags,
      signal,
      ...fetchInit
    } = options;
    const url = buildUrl(path);
    const defaultHeaders = await resolveHeaders(config.defaultHeaders);
    const headers = new Headers(defaultHeaders);

    if (requestHeaders) {
      new Headers(requestHeaders).forEach((value, key) => {
        headers.set(key, value);
      });
    }

    let body = requestBody ?? null;
    if (json !== undefined) {
      body = JSON.stringify(json);
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
      }
    }

    const cacheKey =
      method === "GET" && responseType === "json" && config.cache && !cachePolicy?.bypass
        ? cachePolicy?.key ?? createCmsCacheKey(method, url)
        : null;

    if (cacheKey) {
      const cachedEntry = await config.cache?.get<T>(cacheKey);
      if (cachedEntry) {
        return cachedEntry.value;
      }
    }

    const response = await fetchImpl(url, {
      ...fetchInit,
      method,
      headers,
      body,
      credentials: config.credentials ?? "same-origin",
      signal: signal ?? config.requestSignal,
    });

    if (!response.ok) {
      throw await parseErrorResponse(response);
    }

    const data = await parseSuccessResponse<T>(response, responseType);

    if (cacheKey && config.cache) {
      const ttlMs = cachePolicy?.ttlMs ?? config.defaultCacheTtlMs;
      await config.cache.set(cacheKey, {
        value: data,
        expiresAt: typeof ttlMs === "number" ? Date.now() + ttlMs : undefined,
        tags: cachePolicy?.tags,
      });
    }

    if (invalidateTags?.length && config.cache?.invalidateTags) {
      await config.cache.invalidateTags(invalidateTags);
    }

    return data;
  }

  return {
    cache: config.cache,
    buildUrl,
    request,
  };
}
