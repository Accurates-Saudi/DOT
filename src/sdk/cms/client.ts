import { createCmsAuthApi } from "./auth";
import { createCmsContentApi } from "./content";
import { createCmsMediaApi } from "./media";
import { createCmsRequester } from "./request";
import type { CmsClient, CmsClientConfig } from "./types";

export function createCmsClient(config: CmsClientConfig = {}): CmsClient {
  const requester = createCmsRequester(config);

  return {
    auth: createCmsAuthApi(requester),
    content: createCmsContentApi(requester),
    media: createCmsMediaApi(requester),
    request: requester.request,
    buildUrl: requester.buildUrl,
  };
}

export const cmsClient = createCmsClient();
