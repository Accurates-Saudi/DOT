import type { Route } from "./+types/api.cms.media";

import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { listMediaGalleryItems } from "@/server/cms/media/gallery.server";
import { uploadMediaAsset } from "@/server/cms/media/service.server";
import {
  assertMethod,
  jsonResponse,
  toErrorResponse,
} from "@/server/cms/http.server";
import {
  readUploadedFile,
  assertImageUpload,
  assertDocumentUpload,
} from "@/server/cms/request.server";

function toOptionalNumber(value: FormDataEntryValue | null): number | undefined {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : undefined;
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    assertMethod(request, ["GET"]);
    await requireCmsAuthSession(request, ["editor"]);
    const data = await listMediaGalleryItems();
    return jsonResponse({ data });
  } catch (error) {
    return toErrorResponse(error);
  }
}

export async function action({ request }: Route.ActionArgs) {
  try {
    assertMethod(request, ["POST"]);
    const session = await requireCmsAuthSession(request, ["editor"]);
    const formData = await request.formData();
    const upload = await readUploadedFile(formData.get("file"));
    const isDocument = String(formData.get("kind") ?? "").trim() === "document";
    if (isDocument) {
      assertDocumentUpload(upload.mimeType);
    } else {
      assertImageUpload(upload.mimeType);
    }
    const key = String(formData.get("key") ?? "").trim();

    const mediaId = String(formData.get("mediaId") ?? "").trim();

    const data = await uploadMediaAsset({
      key,
      actorId: session.user.id,
      ...upload,
      ...(isDocument ? { type: "DOCUMENT" as const } : {}),
      ...(mediaId ? { mediaId } : {}),
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

    return jsonResponse(
      {
        data: {
          id: data.id,
          url: data.currentVersion?.url,
          label: data.key,
          source: "upload",
          updatedAt: data.updatedAt,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return toErrorResponse(error);
  }
}
