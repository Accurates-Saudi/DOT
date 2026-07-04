import type { CMSAuthSession } from "@/types";

import {
  getCmsAuthSession,
  getCmsUserCount,
} from "./service.server";

export interface CmsAdminAccessState {
  session: CMSAuthSession | null;
  userCount: number;
  requiresSetup: boolean;
}

export async function getCmsAdminAccessState(
  request: Request,
): Promise<CmsAdminAccessState> {
  const [session, userCount] = await Promise.all([
    getCmsAuthSession(request),
    getCmsUserCount(),
  ]);

  return {
    session,
    userCount,
    requiresSetup: userCount === 0,
  };
}
