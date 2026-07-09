import {
  FEEDBACK_HONEYPOT_FIELD,
  type FeedbackInput,
  type FeedbackResponse,
} from "@/lib/feedback/types";
import {
  DEFAULT_FEEDBACK_VALIDATION_MESSAGES,
  FEEDBACK_CATEGORY_IDS,
  validateFeedbackSubmission,
} from "@/lib/feedback/validation";
import {
  EmailConfigurationError,
  EmailDeliveryError,
  sendFeedbackEmail,
} from "@/server/email/email.service.server";
import {
  assertFeedbackRateLimit,
  ContactRateLimitError,
} from "@/server/contact/rate-limit.server";

function isHoneypotTriggered(input: FeedbackInput): boolean {
  const honeypotValue = input[FEEDBACK_HONEYPOT_FIELD];
  return typeof honeypotValue === "string" && honeypotValue.trim().length > 0;
}

export async function processFeedbackSubmission(input: {
  payload: FeedbackInput;
  ipAddress?: string;
}): Promise<FeedbackResponse> {
  if (isHoneypotTriggered(input.payload)) {
    return {
      ok: true,
      message: "Thank you for your feedback.",
    };
  }

  try {
    assertFeedbackRateLimit(input.ipAddress);
  } catch (error) {
    if (error instanceof ContactRateLimitError) {
      return {
        ok: false,
        error: {
          code: "rate_limited",
          message: error.message,
        },
      };
    }

    throw error;
  }

  const validation = validateFeedbackSubmission(
    input.payload,
    DEFAULT_FEEDBACK_VALIDATION_MESSAGES,
    FEEDBACK_CATEGORY_IDS,
  );

  if (!validation.ok) {
    return {
      ok: false,
      error: {
        code: "validation_failed",
        message: validation.message,
        fieldErrors: validation.fieldErrors,
      },
    };
  }

  try {
    await sendFeedbackEmail(validation.data);
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      console.error("[feedback] SMTP configuration error:", error.message);
      return {
        ok: false,
        error: {
          code: "smtp_not_configured",
          message:
            "Feedback email delivery is not configured yet. Please contact us directly by phone or email.",
        },
      };
    }

    if (error instanceof EmailDeliveryError) {
      console.error("[feedback] SMTP delivery error:", error.message, error.cause);
      return {
        ok: false,
        error: {
          code: "send_failed",
          message:
            "We could not send your feedback right now. Please try again shortly.",
        },
      };
    }

    throw error;
  }

  return {
    ok: true,
    message: "Thank you for your feedback.",
  };
}
