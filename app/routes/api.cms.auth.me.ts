import type { Route } from "./+types/api.cms.auth.me";

import { getCmsAuthSession } from "@/server/cms/auth/service.server";
import { assertMethod, jsonResponse, toErrorResponse } from "@/server/cms/http.server";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    assertMethod(request, ["GET"]);
    const session = await getCmsAuthSession(request);
    return jsonResponse({ data: session });
  } catch (error) {
    return toErrorResponse(error);
  }
}
