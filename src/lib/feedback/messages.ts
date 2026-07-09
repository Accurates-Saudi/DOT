import type { TranslationMessages } from "@/i18n/types";

import type { FeedbackValidationMessages } from "./types";
import { DEFAULT_FEEDBACK_VALIDATION_MESSAGES } from "./validation";

interface FeedbackFormMessagesShape {
  validation?: Partial<FeedbackValidationMessages>;
  responses?: {
    success?: string;
    submitError?: string;
    rateLimited?: string;
    smtpNotConfigured?: string;
    sendFailed?: string;
    networkError?: string;
  };
}

function getFeedbackFormMessages(messages: TranslationMessages) {
  return (messages as {
    pages?: { contact?: { feedback?: { form?: FeedbackFormMessagesShape } } };
  }).pages?.contact?.feedback?.form;
}

export function getFeedbackValidationMessages(
  messages: TranslationMessages,
): FeedbackValidationMessages {
  return {
    ...DEFAULT_FEEDBACK_VALIDATION_MESSAGES,
    ...getFeedbackFormMessages(messages)?.validation,
  };
}

export function getFeedbackResponseMessages(messages: TranslationMessages) {
  const responses = getFeedbackFormMessages(messages)?.responses;

  return {
    success:
      responses?.success ??
      "Thank you for your feedback. We appreciate your input.",
    submitError:
      responses?.submitError ??
      "We could not submit your feedback. Please review the form and try again.",
    rateLimited:
      responses?.rateLimited ??
      "Too many submissions. Please wait a few minutes and try again.",
    smtpNotConfigured:
      responses?.smtpNotConfigured ??
      "Feedback email delivery is not configured yet. Please contact us directly by phone or email.",
    sendFailed:
      responses?.sendFailed ??
      "We could not send your feedback right now. Please try again shortly.",
    networkError:
      responses?.networkError ??
      "A network error occurred. Please check your connection and try again.",
  };
}
