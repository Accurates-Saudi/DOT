import type { CMSAuthSession } from "@/types";

import type {
  CmsAuthApi,
  CmsBootstrapAdminInput,
  CmsLoginInput,
  CmsRequestOptions,
} from "./types";
import type { CmsRequester } from "./request";

const AUTH_TAG = "cms:auth";

export function createCmsAuthApi(requester: CmsRequester): CmsAuthApi {
  async function getSession(options?: CmsRequestOptions): Promise<CMSAuthSession | null> {
    return requester.request<CMSAuthSession | null>("/api/cms/auth/me", {
      ...options,
      method: "GET",
      cache: {
        tags: [AUTH_TAG],
        ...(options?.cache ?? {}),
      },
    });
  }

  async function login(
    input: CmsLoginInput,
    options?: CmsRequestOptions,
  ): Promise<CMSAuthSession> {
    return requester.request<CMSAuthSession>("/api/cms/auth/login", {
      ...options,
      method: "POST",
      json: input,
      invalidateTags: [AUTH_TAG],
    });
  }

  async function logout(
    options?: CmsRequestOptions,
  ): Promise<{ success: true }> {
    return requester.request<{ success: true }>("/api/cms/auth/logout", {
      ...options,
      method: "POST",
      invalidateTags: [AUTH_TAG],
    });
  }

  async function bootstrapAdmin(
    input: CmsBootstrapAdminInput,
    options?: CmsRequestOptions,
  ): Promise<CMSAuthSession> {
    return requester.request<CMSAuthSession>("/api/cms/auth/bootstrap", {
      ...options,
      method: "POST",
      json: input,
      invalidateTags: [AUTH_TAG],
    });
  }

  return {
    getSession,
    login,
    logout,
    bootstrapAdmin,
  };
}
