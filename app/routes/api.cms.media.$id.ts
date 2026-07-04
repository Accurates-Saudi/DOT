import type { Route } from "./+types/api.cms.media.$id";

import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import {
  getMediaAssetById,
  replaceMediaAsset,
} from "@/server/cms/media/service.server";
import {
  assertMethod,
  jsonResponse,
  toErrorResponse,
} from "@/server/cms/http.server";
import { readUploadedFile } from "@/server/cms/request.server";

function toOptionalNumber(value: FormDataEntryValue | null): number | undefined {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : undefined;
}

export async function loader({ request, params }: Route.LoaderArgs) {
  try {
    assertMethod(request, ["GET"]);
    await requireCmsAuthSession(request, ["editor"]);
    const data = await getMediaAssetById(params.id);
    return jsonResponse({ data });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function action({ request, params }: Route.ActionArgs) {
  try {
    assertMethod(request, ["PUT", "PATCH"]);
    const session = await requireCmsAuthSession(request, ["editor"]);
    const formData = await request.formData();
    const upload = await readUploadedFile(formData.get("file"));

    const data = await replaceMediaAsset({
      id: params.id,
      actorId: session.user.id,
      ...upload,
      ...(toOptionalNumber(formData.get("width"))
        ? { width: toOptionalNumber(formData.get("width")) }
        : {}),
      ...(toOptionalNumber(formData.get("height"))
        ? { height: toOptionalNumber(formData.get("height")) }
        : {}),
      ...(String(formData.get("altEn") ?? "").trim() ||
      String(formData.get("altAr") ?? "").trim()
        ? {
            alt: {
              en: String(formData.get("altEn") ?? "").trim(),
              ar: String(formData.get("altAr") ?? "").trim(),
            },
          }
        : {}),
    });

    return jsonResponse({ data });
  } catch (error) {
    return toErrorResponse(error);
  }
}
