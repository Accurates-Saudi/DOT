import type {
  CMSAuthSession,
  CMSContentRecord,
  CMSContentStatus,
  CMSContentType,
  CMSContentVersion,
  CMSLocalizedValue,
  MediaLibraryItem,
} from "@/types";

export interface CMSContentEntryDetail {
  entry: CMSContentRecord;
  publishedVersion?: CMSContentVersion;
  versions: CMSContentVersion[];
}

export interface CmsApiEnvelope<T> {
  data: T;
}

export interface CmsApiErrorEnvelope {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface CmsCacheEntry<T> {
  value: T;
  expiresAt?: number;
  tags?: readonly string[];
}

export interface CmsCacheAdapter {
  get<T>(key: string): CmsCacheEntry<T> | null | Promise<CmsCacheEntry<T> | null>;
  set<T>(key: string, entry: CmsCacheEntry<T>): void | Promise<void>;
  delete(key: string): void | Promise<void>;
  invalidateTags?(tags: readonly string[]): void | Promise<void>;
  clear?(): void | Promise<void>;
}

export interface CmsCachePolicy {
  key?: string;
  ttlMs?: number;
  tags?: readonly string[];
  bypass?: boolean;
}

export interface CmsClientConfig {
  baseUrl?: string;
  fetch?: typeof fetch;
  credentials?: RequestCredentials;
  defaultHeaders?:
    | HeadersInit
    | (() => HeadersInit | Promise<HeadersInit>);
  cache?: CmsCacheAdapter;
  defaultCacheTtlMs?: number;
  requestSignal?: AbortSignal;
}

export type CmsResponseType = "json" | "response" | "text" | "arrayBuffer";

export interface CmsRequestOptions
  extends Omit<RequestInit, "body" | "method" | "headers" | "signal" | "cache"> {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: HeadersInit;
  signal?: AbortSignal;
  body?: BodyInit | null;
  json?: unknown;
  responseType?: CmsResponseType;
  cache?: CmsCachePolicy;
  invalidateTags?: readonly string[];
}

export interface CmsLoginInput {
  email: string;
  password: string;
}

export interface CmsBootstrapAdminInput extends CmsLoginInput {
  name: string;
}

export interface CmsContentListFilters {
  type?: CMSContentType;
  status?: CMSContentStatus;
  search?: string;
}

export interface CmsContentMutationInput {
  type: CMSContentType;
  payload: unknown;
  slug?: string;
  changeSummary?: string;
  publish?: boolean;
}

export interface CmsUpsertContentInput extends CmsContentMutationInput {
  key: string;
}

export interface CmsMediaMutationInput {
  file: Blob;
  fileName?: string;
  width?: number;
  height?: number;
  alt?: CMSLocalizedValue<string>;
}

export interface CmsMediaUploadInput extends CmsMediaMutationInput {
  key: string;
  mediaId?: string;
}

export interface CmsAuthApi {
  getSession(options?: CmsRequestOptions): Promise<CMSAuthSession | null>;
  login(input: CmsLoginInput, options?: CmsRequestOptions): Promise<CMSAuthSession>;
  logout(options?: CmsRequestOptions): Promise<{ success: true }>;
  bootstrapAdmin(
    input: CmsBootstrapAdminInput,
    options?: CmsRequestOptions,
  ): Promise<CMSAuthSession>;
}

export interface CmsContentApi {
  list(
    filters?: CmsContentListFilters,
    options?: CmsRequestOptions,
  ): Promise<CMSContentRecord[]>;
  get(key: string, options?: CmsRequestOptions): Promise<CMSContentEntryDetail>;
  create(
    input: CmsUpsertContentInput,
    options?: CmsRequestOptions,
  ): Promise<CMSContentEntryDetail>;
  update(
    key: string,
    input: CmsContentMutationInput,
    options?: CmsRequestOptions,
  ): Promise<CMSContentEntryDetail>;
  saveDraft(
    input: CmsUpsertContentInput,
    options?: CmsRequestOptions,
  ): Promise<CMSContentEntryDetail>;
  publish(
    input: CmsUpsertContentInput,
    options?: CmsRequestOptions,
  ): Promise<CMSContentEntryDetail>;
  archive(key: string, options?: CmsRequestOptions): Promise<CMSContentEntryDetail>;
}

export interface CmsMediaApi {
  list(options?: CmsRequestOptions): Promise<MediaLibraryItem[]>;
  get(id: string, options?: CmsRequestOptions): Promise<MediaLibraryItem>;
  upload(
    input: CmsMediaUploadInput,
    options?: CmsRequestOptions,
  ): Promise<MediaLibraryItem>;
  replace(
    id: string,
    input: CmsMediaMutationInput,
    options?: CmsRequestOptions,
  ): Promise<MediaLibraryItem>;
  getFileUrl(id: string, versionNumber?: number): string;
  download(
    id: string,
    options?: CmsRequestOptions & { versionNumber?: number },
  ): Promise<Response>;
}

export interface CmsClient {
  auth: CmsAuthApi;
  content: CmsContentApi;
  media: CmsMediaApi;
  request<T>(path: string, options?: CmsRequestOptions): Promise<T>;
  buildUrl(path: string): string;
}
