import type { Route } from "./+types/api.cms.media.$id.file";

import { getCurrentMediaFile } from "@/server/cms/media/service.server";
import { assertMethod, toErrorResponse } from "@/server/cms/http.server";

export async function loader({ request, params }: Route.LoaderArgs) {
  try {
    assertMethod(request, ["GET"]);
    const file = await getCurrentMediaFile(params.id);

    return new Response(Buffer.from(file.bytes), {
      status: 200,
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": `inline; filename="${file.fileName}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return toErrorResponse(error);
  }
}
