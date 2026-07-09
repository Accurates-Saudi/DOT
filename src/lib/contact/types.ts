import type { ContactFormValues } from "@/types";

export const CONTACT_HONEYPOT_FIELD = "website";

export type ContactFieldName = keyof ContactFormValues;

export type ContactValidationCode =
  | "required"
  | "too_short"
  | "too_long"
  | "invalid_email"
  | "invalid_phone";

export type ContactFieldErrors = Partial<
  Record<ContactFieldName, ContactValidationCode>
>;

export interface ContactInquiryInput extends ContactFormValues {
  [CONTACT_HONEYPOT_FIELD]?: string;
  locale?: string;
}

export interface SanitizedContactInquiry extends ContactFormValues {
  locale?: string;
}

export interface ContactValidationMessages {
  nameRequired: string;
  nameTooShort: string;
  nameTooLong: string;
  companyTooLong: string;
  emailRequired: string;
  emailInvalid: string;
  emailTooLong: string;
  phoneTooLong: string;
  phoneInvalid: string;
  subjectRequired: string;
  subjectTooShort: string;
  subjectTooLong: string;
  messageRequired: string;
  messageTooShort: string;
  messageTooLong: string;
}

export interface ContactInquirySuccessResponse {
  ok: true;
  message: string;
}

export interface ContactInquiryErrorResponse {
  ok: false;
  error: {
    code:
      | "validation_failed"
      | "rate_limited"
      | "smtp_not_configured"
      | "send_failed"
      | "invalid_json"
      | "unsupported_media_type"
      | "method_not_allowed"
      | "internal_error";
    message: string;
    fieldErrors?: ContactFieldErrors;
  };
}

export type ContactInquiryResponse =
  | ContactInquirySuccessResponse
  | ContactInquiryErrorResponse;
