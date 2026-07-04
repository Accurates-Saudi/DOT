import type { Route } from "./+types/api.cms.content";

import type {
  CMSContentStatus,
  CMSContentType,
} from "@/types";

import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import {
  listContentEntries,
  upsertContentEntry,
} from "@/server/cms/content/service.server";
import {
  assertMethod,
  jsonResponse,
  readJsonBody,
  toErrorResponse,
} from "@/server/cms/http.server";

interface UpsertContentBody {
  key: string;
  type: CMSContentType;
  payload: unknown;
  slug?: string;
  changeSummary?: string;
  publish?: boolean;
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    assertMethod(request, ["GET"]);
    await requireCmsAuthSession(request, ["editor"]);

    const url = new URL(request.url);
    const type = url.searchParams.get("type") as CMSContentType | null;
    const status = url.searchParams.get("status") as CMSContentStatus | null;
    const search = url.searchParams.get("search") ?? undefined;

    const data = await listContentEntries({
      ...(type ? { type } : {}),
      ...(status ? { status } : {}),
      ...(search ? { search } : {}),
    });

    return jsonResponse({ data });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function action({ request }: Route.ActionArgs) {
  try {
    assertMethod(request, ["POST"]);
    const session = await requireCmsAuthSession(request, ["editor"]);
    const body = await readJsonBody<UpsertContentBody>(request);
    const data = await upsertContentEntry({
      key: body.key,
      type: body.type,
      payload: body.payload,
      actorId: session.user.id,
      ...(body.slug !== undefined ? { slug: body.slug } : {}),
      ...(body.changeSummary ? { changeSummary: body.changeSummary } : {}),
      ...(body.publish !== undefined ? { publish: body.publish } : {}),
    });

    return jsonResponse({ data }, { status: 201 });
  } catch (error) {
    return toErrorResponse(error);
  }
}
