import type { MediaLibraryItem } from "@/types";

import type { CmsRequester } from "./request";
import type {
  CmsMediaApi,
  CmsMediaMutationInput,
  CmsMediaUploadInput,
  CmsRequestOptions,
} from "./types";

const MEDIA_TAG = "cms:media";

function mergeTags(...groups: Array<readonly string[] | undefined>): string[] {
  return [...new Set(groups.flatMap((group) => group ?? []))];
}

function mediaTag(id: string): string {
  return `${MEDIA_TAG}:${id}`;
}

function resolveFileName(input: CmsMediaMutationInput): string {
  if (input.fileName) {
    return input.fileName;
  }

  if ("name" in input.file && typeof input.file.name === "string" && input.file.name) {
    return input.file.name;
  }

  return "upload.bin";
}

function appendOptionalText(
  formData: FormData,
  key: string,
  value: string | number | undefined,
): void {
  if (value === undefined || value === "") return;
  formData.set(key, String(value));
}

function toMediaFormData(
  input: CmsMediaUploadInput | CmsMediaMutationInput,
): FormData {
  const formData = new FormData();
  formData.set("file", input.file, resolveFileName(input));

  if ("key" in input) {
    formData.set("key", input.key);
  }

  if ("mediaId" in input && input.mediaId) {
    formData.set("mediaId", input.mediaId);
  }

  appendOptionalText(formData, "width", input.width);
  appendOptionalText(formData, "height", input.height);
  appendOptionalText(formData, "altEn", input.alt?.en);
  appendOptionalText(formData, "altAr", input.alt?.ar);

  return formData;
}

export function createCmsMediaApi(requester: CmsRequester): CmsMediaApi {
  async function list(options?: CmsRequestOptions): Promise<MediaLibraryItem[]> {
    return requester.request<MediaLibraryItem[]>("/api/cms/media", {
      ...options,
      method: "GET",
      cache: {
        tags: mergeTags([MEDIA_TAG], options?.cache?.tags),
        ...(options?.cache ?? {}),
      },
    });
  }

  async function get(
    id: string,
    options?: CmsRequestOptions,
  ): Promise<MediaLibraryItem> {
    return requester.request<MediaLibraryItem>(`/api/cms/media/${encodeURIComponent(id)}`, {
      ...options,
      method: "GET",
      cache: {
        tags: mergeTags([MEDIA_TAG, mediaTag(id)], options?.cache?.tags),
        ...(options?.cache ?? {}),
      },
    });
  }

  async function upload(
    input: CmsMediaUploadInput,
    options?: CmsRequestOptions,
  ): Promise<MediaLibraryItem> {
    return requester.request<MediaLibraryItem>("/api/cms/media", {
      ...options,
      method: "POST",
      body: toMediaFormData(input),
      invalidateTags: mergeTags([MEDIA_TAG], options?.invalidateTags),
    });
  }

  async function replace(
    id: string,
    input: CmsMediaMutationInput,
    options?: CmsRequestOptions,
  ): Promise<MediaLibraryItem> {
    return requester.request<MediaLibraryItem>(`/api/cms/media/${encodeURIComponent(id)}`, {
      ...options,
      method: "PUT",
      body: toMediaFormData(input),
      invalidateTags: mergeTags([MEDIA_TAG, mediaTag(id)], options?.invalidateTags),
    });
  }

  function getFileUrl(id: string, versionNumber?: number): string {
    const base = `/api/cms/media/${encodeURIComponent(id)}/file`;
    return versionNumber ? `${base}?v=${versionNumber}` : base;
  }

  async function download(
    id: string,
    options?: CmsRequestOptions & { versionNumber?: number },
  ): Promise<Response> {
    const versionQuery =
      options?.versionNumber !== undefined ? `?v=${options.versionNumber}` : "";

    return requester.request<Response>(
      `/api/cms/media/${encodeURIComponent(id)}/file${versionQuery}`,
      {
        ...options,
        method: "GET",
        responseType: "response",
      },
    );
  }

  return {
    list,
    get,
    upload,
    replace,
    getFileUrl,
    download,
  };
}
