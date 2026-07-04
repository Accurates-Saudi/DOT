import { createCmsClient } from "./client";
import type { CmsClient, CmsClientConfig } from "./types";

function pickForwardedHeaders(request: Request): Headers {
  const headers = new Headers();
  const cookie = request.headers.get("cookie");
  const acceptLanguage = request.headers.get("accept-language");

  if (cookie) {
    headers.set("cookie", cookie);
  }

  if (acceptLanguage) {
    headers.set("accept-language", acceptLanguage);
  }

  return headers;
}

export function createCmsServerClient(
  request: Request,
  config: Omit<CmsClientConfig, "baseUrl" | "defaultHeaders" | "requestSignal"> = {},
): CmsClient {
  return createCmsClient({
    ...config,
    baseUrl: new URL(request.url).origin,
    defaultHeaders: pickForwardedHeaders(request),
    requestSignal: request.signal,
  });
}

export const createCmsLoaderClient = createCmsServerClient;
export const createCmsActionClient = createCmsServerClient;
