import type { Route } from "./+types/api.cms.auth.bootstrap";

import { bootstrapCmsAdmin } from "@/server/cms/auth/service.server";
import { assertMethod, jsonResponse, readJsonBody, toErrorResponse } from "@/server/cms/http.server";
import { getRequestMetadata } from "@/server/cms/request.server";

interface BootstrapBody {
  email: string;
  password: string;
  name: string;
}

export async function action({ request }: Route.ActionArgs) {
  try {
    assertMethod(request, ["POST"]);
    const body = await readJsonBody<BootstrapBody>(request);
    const metadata = getRequestMetadata(request);
    const result = await bootstrapCmsAdmin({
      email: body.email,
      password: body.password,
      name: body.name,
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
    });

    return jsonResponse(
      { data: result.session },
      { headers: { "Set-Cookie": result.setCookie }, status: 201 },
    );
  } catch (error) {
    return toErrorResponse(error);
  }
}
