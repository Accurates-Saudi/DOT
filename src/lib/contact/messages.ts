import type { TranslationMessages } from "@/i18n/types";

import type { ContactValidationMessages } from "./types";
import { DEFAULT_CONTACT_VALIDATION_MESSAGES } from "./validation";

interface ContactFormMessagesShape {
  validation?: Partial<ContactValidationMessages>;
  feedback?: {
    success?: string;
    submitError?: string;
    rateLimited?: string;
    smtpNotConfigured?: string;
    sendFailed?: string;
    networkError?: string;
  };
}

export function getContactValidationMessages(
  messages: TranslationMessages,
): ContactValidationMessages {
  const form = (messages as { pages?: { contact?: { main?: { form?: ContactFormMessagesShape } } } })
    .pages?.contact?.main?.form;

  return {
    ...DEFAULT_CONTACT_VALIDATION_MESSAGES,
    ...form?.validation,
  };
}

export function getContactFormFeedbackMessages(messages: TranslationMessages) {
  const feedback = (messages as { pages?: { contact?: { main?: { form?: ContactFormMessagesShape } } } })
    .pages?.contact?.main?.form?.feedback;

  return {
    success:
      feedback?.success ??
      "Your inquiry has been sent successfully. Our team will respond shortly.",
    submitError:
      feedback?.submitError ??
      "We could not submit your inquiry. Please review the form and try again.",
    rateLimited:
      feedback?.rateLimited ??
      "Too many submissions. Please wait a few minutes and try again.",
    smtpNotConfigured:
      feedback?.smtpNotConfigured ??
      "Contact form email delivery is not configured yet. Please contact us directly by phone or email.",
    sendFailed:
      feedback?.sendFailed ??
      "We could not send your inquiry right now. Please try again shortly or contact us directly.",
    networkError:
      feedback?.networkError ??
      "A network error occurred. Please check your connection and try again.",
  };
}
