import type { Route } from "./+types/api.cms.media.$id.file";

import { getMediaFile } from "@/server/cms/media/service.server";
import { assertMethod, toErrorResponse } from "@/server/cms/http.server";

function parseVersionParam(value: string | null): number | undefined {
  if (!value?.trim()) return undefined;
  const versionNumber = Number(value);
  return Number.isInteger(versionNumber) && versionNumber > 0
    ? versionNumber
    : undefined;
}

export async function loader({ request, params }: Route.LoaderArgs) {
  try {
    assertMethod(request, ["GET"]);
    const url = new URL(request.url);
    const versionNumber = parseVersionParam(url.searchParams.get("v"));
    const file = await getMediaFile(params.id, versionNumber);

    return new Response(Buffer.from(file.bytes), {
      status: 200,
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": `inline; filename="${file.fileName}"`,
        "Cache-Control": versionNumber
          ? "public, max-age=31536000, immutable"
          : "public, max-age=60, must-revalidate",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return toErrorResponse(error);
  }
}
