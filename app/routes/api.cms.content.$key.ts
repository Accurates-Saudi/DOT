import type { Route } from "./+types/api.cms.content.$key";

import type { CMSContentType } from "@/types";

import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import {
  archiveContentEntry,
  getContentEntryByKey,
  upsertContentEntry,
} from "@/server/cms/content/service.server";
import {
  assertMethod,
  jsonResponse,
  readJsonBody,
  toErrorResponse,
} from "@/server/cms/http.server";

interface UpdateContentBody {
  type: CMSContentType;
  payload: unknown;
  slug?: string;
  changeSummary?: string;
  publish?: boolean;
}

export async function loader({ request, params }: Route.LoaderArgs) {
  try {
    assertMethod(request, ["GET"]);
    await requireCmsAuthSession(request, ["editor"]);
    const data = await getContentEntryByKey(params.key);
    return jsonResponse({ data });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function action({ request, params }: Route.ActionArgs) {
  try {
    assertMethod(request, ["PUT", "PATCH", "DELETE"]);
    const session = await requireCmsAuthSession(request, ["editor"]);

    if (request.method.toUpperCase() === "DELETE") {
      const data = await archiveContentEntry({
        key: params.key,
        actorId: session.user.id,
      });
      return jsonResponse({ data });
    }

    const body = await readJsonBody<UpdateContentBody>(request);
    const data = await upsertContentEntry({
      key: params.key,
      type: body.type,
      payload: body.payload,
      actorId: session.user.id,
      ...(body.slug !== undefined ? { slug: body.slug } : {}),
      ...(body.changeSummary ? { changeSummary: body.changeSummary } : {}),
      ...(body.publish !== undefined ? { publish: body.publish } : {}),
    });

    return jsonResponse({ data });
  } catch (error) {
    return toErrorResponse(error);
  }
}
