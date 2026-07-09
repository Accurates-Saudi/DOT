import type { Route } from "./+types/api.feedback";

import type { FeedbackInput } from "@/lib/feedback/types";
import {
  assertMethod,
  CmsHttpError,
  jsonResponse,
  readJsonBody,
} from "@/server/cms/http.server";
import { getRequestMetadata } from "@/server/cms/request.server";
import { processFeedbackSubmission } from "@/server/feedback/service.server";

function toFeedbackRouteErrorResponse(error: unknown): Response {
  if (error instanceof CmsHttpError) {
    const code =
      error.code === "invalid_json"
        ? "invalid_json"
        : error.code === "unsupported_media_type"
          ? "unsupported_media_type"
          : error.code === "method_not_allowed"
            ? "method_not_allowed"
            : "internal_error";

    return jsonResponse(
      {
        ok: false,
        error: {
          code,
          message: error.message,
        },
      },
      { status: error.status },
    );
  }

  console.error("[feedback] Unexpected route error:", error);

  return jsonResponse(
    {
      ok: false,
      error: {
        code: "internal_error",
        message: "An unexpected error occurred while processing your feedback.",
      },
    },
    { status: 500 },
  );
}

export async function action({ request }: Route.ActionArgs) {
  try {
    assertMethod(request, ["POST"]);
    const payload = await readJsonBody<FeedbackInput>(request);
    const metadata = getRequestMetadata(request);
    const result = await processFeedbackSubmission({
      payload,
      ipAddress: metadata.ipAddress,
    });

    if (!result.ok) {
      const status =
        result.error.code === "rate_limited"
          ? 429
          : result.error.code === "smtp_not_configured"
            ? 503
            : result.error.code === "validation_failed"
              ? 400
              : result.error.code === "send_failed"
                ? 502
                : 500;

      return jsonResponse(result, { status });
    }

    return jsonResponse(result, { status: 200 });
  } catch (error) {
    return toFeedbackRouteErrorResponse(error);
  }
}
