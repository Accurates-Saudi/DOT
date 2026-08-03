import {
  CONTACT_HONEYPOT_FIELD,
  type ContactInquiryInput,
  type ContactInquiryResponse,
} from "@/lib/contact/types";
import {
  DEFAULT_CONTACT_VALIDATION_MESSAGES,
  validateContactInquiry,
} from "@/lib/contact/validation";
import {
  EmailConfigurationError,
  EmailDeliveryError,
  sendContactInquiryEmail,
} from "@/server/email/email.service.server";
import { assertContactRateLimit, ContactRateLimitError } from "./rate-limit.server";

function isHoneypotTriggered(input: ContactInquiryInput): boolean {
  const honeypotValue = input[CONTACT_HONEYPOT_FIELD];
  return typeof honeypotValue === "string" && honeypotValue.trim().length > 0;
}

export async function processContactInquirySubmission(input: {
  payload: ContactInquiryInput;
  ipAddress?: string;
}): Promise<ContactInquiryResponse> {
  if (isHoneypotTriggered(input.payload)) {
    return {
      ok: true,
      message: "Your inquiry has been sent successfully.",
    };
  }

  try {
    assertContactRateLimit(input.ipAddress);
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

  const validation = validateContactInquiry(
    input.payload,
    DEFAULT_CONTACT_VALIDATION_MESSAGES,
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
    await sendContactInquiryEmail(validation.data);
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      console.error("[contact] Email configuration error:", error.message);
      return {
        ok: false,
        error: {
          code: "smtp_not_configured",
          message:
            "Contact form email delivery is not configured yet. Please contact us directly by phone or email.",
        },
      };
    }

    if (error instanceof EmailDeliveryError) {
      console.error("[contact] Email delivery error:", error.message, error.cause);
      return {
        ok: false,
        error: {
          code: "send_failed",
          message:
            "We could not send your inquiry right now. Please try again shortly or contact us directly.",
        },
      };
    }

    throw error;
  }

  return {
    ok: true,
    message: "Your inquiry has been sent successfully.",
  };
}
