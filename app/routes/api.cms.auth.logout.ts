import type { Route } from "./+types/api.cms.auth.logout";

import { logoutCmsUser, requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { assertMethod, jsonResponse, toErrorResponse } from "@/server/cms/http.server";

export async function action({ request }: Route.ActionArgs) {
  try {
    assertMethod(request, ["POST"]);
    await requireCmsAuthSession(request, ["editor"]);
    const setCookie = await logoutCmsUser(request);

    return jsonResponse(
      { data: { success: true } },
      { headers: { "Set-Cookie": setCookie } },
    );
  } catch (error) {
    return toErrorResponse(error);
  }
}
