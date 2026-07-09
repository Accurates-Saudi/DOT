export const FEEDBACK_HONEYPOT_FIELD = "companyWebsite";

export type FeedbackFieldName = "name" | "email" | "category" | "rating" | "message";

export type FeedbackValidationCode =
  | "required"
  | "too_short"
  | "too_long"
  | "invalid_email"
  | "invalid_category"
  | "invalid_rating";

export type FeedbackFieldErrors = Partial<
  Record<FeedbackFieldName, FeedbackValidationCode>
>;

export interface FeedbackInput {
  name: string;
  email: string;
  category: string;
  rating: string;
  message: string;
  [FEEDBACK_HONEYPOT_FIELD]?: string;
  locale?: string;
}

export interface SanitizedFeedback extends Omit<FeedbackInput, typeof FEEDBACK_HONEYPOT_FIELD> {}

export interface FeedbackValidationMessages {
  nameRequired: string;
  nameTooShort: string;
  nameTooLong: string;
  emailRequired: string;
  emailInvalid: string;
  emailTooLong: string;
  categoryRequired: string;
  categoryInvalid: string;
  ratingInvalid: string;
  messageRequired: string;
  messageTooShort: string;
  messageTooLong: string;
}

export interface FeedbackSuccessResponse {
  ok: true;
  message: string;
}

export interface FeedbackErrorResponse {
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
    fieldErrors?: FeedbackFieldErrors;
  };
}

export type FeedbackResponse = FeedbackSuccessResponse | FeedbackErrorResponse;
