import type { CMSContentRecord } from "@/types";

import type { CmsRequester } from "./request";
import type {
  CMSContentEntryDetail,
  CmsContentApi,
  CmsContentListFilters,
  CmsContentMutationInput,
  CmsRequestOptions,
  CmsUpsertContentInput,
} from "./types";

const CONTENT_TAG = "cms:content";

function mergeTags(...groups: Array<readonly string[] | undefined>): string[] {
  return [...new Set(groups.flatMap((group) => group ?? []))];
}

function buildListPath(filters?: CmsContentListFilters): string {
  const searchParams = new URLSearchParams();

  if (filters?.type) {
    searchParams.set("type", filters.type);
  }

  if (filters?.status) {
    searchParams.set("status", filters.status);
  }

  if (filters?.search) {
    searchParams.set("search", filters.search);
  }

  const query = searchParams.toString();
  return query ? `/api/cms/content?${query}` : "/api/cms/content";
}

function entryTag(key: string): string {
  return `${CONTENT_TAG}:${key}`;
}

export function createCmsContentApi(requester: CmsRequester): CmsContentApi {
  async function list(
    filters?: CmsContentListFilters,
    options?: CmsRequestOptions,
  ): Promise<CMSContentRecord[]> {
    return requester.request<CMSContentRecord[]>(buildListPath(filters), {
      ...options,
      method: "GET",
      cache: {
        tags: mergeTags([CONTENT_TAG], options?.cache?.tags),
        ...(options?.cache ?? {}),
      },
    });
  }

  async function get(
    key: string,
    options?: CmsRequestOptions,
  ): Promise<CMSContentEntryDetail> {
    return requester.request<CMSContentEntryDetail>(
      `/api/cms/content/${encodeURIComponent(key)}`,
      {
        ...options,
        method: "GET",
        cache: {
          tags: mergeTags([CONTENT_TAG, entryTag(key)], options?.cache?.tags),
          ...(options?.cache ?? {}),
        },
      },
    );
  }

  async function create(
    input: CmsUpsertContentInput,
    options?: CmsRequestOptions,
  ): Promise<CMSContentEntryDetail> {
    return requester.request<CMSContentEntryDetail>("/api/cms/content", {
      ...options,
      method: "POST",
      json: input,
      invalidateTags: mergeTags(
        [CONTENT_TAG, entryTag(input.key)],
        options?.invalidateTags,
      ),
    });
  }

  async function update(
    key: string,
    input: CmsContentMutationInput,
    options?: CmsRequestOptions,
  ): Promise<CMSContentEntryDetail> {
    return requester.request<CMSContentEntryDetail>(
      `/api/cms/content/${encodeURIComponent(key)}`,
      {
        ...options,
        method: "PUT",
        json: input,
        invalidateTags: mergeTags(
          [CONTENT_TAG, entryTag(key)],
          options?.invalidateTags,
        ),
      },
    );
  }

  async function saveDraft(
    input: CmsUpsertContentInput,
    options?: CmsRequestOptions,
  ): Promise<CMSContentEntryDetail> {
    return create(
      {
        ...input,
        publish: false,
      },
      options,
    );
  }

  async function publish(
    input: CmsUpsertContentInput,
    options?: CmsRequestOptions,
  ): Promise<CMSContentEntryDetail> {
    return create(
      {
        ...input,
        publish: true,
      },
      options,
    );
  }

  async function archive(
    key: string,
    options?: CmsRequestOptions,
  ): Promise<CMSContentEntryDetail> {
    return requester.request<CMSContentEntryDetail>(
      `/api/cms/content/${encodeURIComponent(key)}`,
      {
        ...options,
        method: "DELETE",
        invalidateTags: mergeTags(
          [CONTENT_TAG, entryTag(key)],
          options?.invalidateTags,
        ),
      },
    );
  }

  return {
    list,
    get,
    create,
    update,
    saveDraft,
    publish,
    archive,
  };
}
