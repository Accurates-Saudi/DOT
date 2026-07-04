import type { Route } from "./+types/api.cms.auth.login";

import { loginCmsUser } from "@/server/cms/auth/service.server";
import {
  assertMethod,
  jsonResponse,
  readJsonBody,
  toErrorResponse,
} from "@/server/cms/http.server";
import { getRequestMetadata } from "@/server/cms/request.server";

interface LoginBody {
  email: string;
  password: string;
}

export async function action({ request }: Route.ActionArgs) {
  try {
    assertMethod(request, ["POST"]);
    const body = await readJsonBody<LoginBody>(request);
    const metadata = getRequestMetadata(request);
    const result = await loginCmsUser({
      email: body.email,
      password: body.password,
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
    });

    return jsonResponse(
      { data: result.session },
      { headers: { "Set-Cookie": result.setCookie } },
    );
  } catch (error) {
    return toErrorResponse(error);
  }
}
