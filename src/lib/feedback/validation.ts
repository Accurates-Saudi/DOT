import type {
  FeedbackFieldErrors,
  FeedbackFieldName,
  FeedbackInput,
  FeedbackValidationCode,
  FeedbackValidationMessages,
  SanitizedFeedback,
} from "./types";

export const FEEDBACK_FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  category: { max: 50 },
  rating: { max: 2 },
  message: { min: 10, max: 3000 },
} as const;

export const FEEDBACK_CATEGORY_IDS = [
  "general",
  "website",
  "products",
  "services",
  "support",
] as const;

export const FEEDBACK_RATING_VALUES = ["5", "4", "3", "2", "1"] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function setFieldError(
  fieldErrors: FeedbackFieldErrors,
  field: FeedbackFieldName,
  code: FeedbackValidationCode,
) {
  if (!fieldErrors[field]) {
    fieldErrors[field] = code;
  }
}

export function validateFeedbackSubmission(
  input: FeedbackInput,
  messages: FeedbackValidationMessages,
  allowedCategories: readonly string[] = FEEDBACK_CATEGORY_IDS,
): {
  ok: true;
  data: SanitizedFeedback;
} | {
  ok: false;
  fieldErrors: FeedbackFieldErrors;
  message: string;
} {
  const fieldErrors: FeedbackFieldErrors = {};

  const name = asTrimmedString(input.name);
  const email = asTrimmedString(input.email);
  const category = asTrimmedString(input.category);
  const rating = asTrimmedString(input.rating);
  const message = asTrimmedString(input.message);
  const locale = asTrimmedString(input.locale) || undefined;

  if (!name) {
    setFieldError(fieldErrors, "name", "required");
  } else if (name.length < FEEDBACK_FIELD_LIMITS.name.min) {
    setFieldError(fieldErrors, "name", "too_short");
  } else if (name.length > FEEDBACK_FIELD_LIMITS.name.max) {
    setFieldError(fieldErrors, "name", "too_long");
  }

  if (!email) {
    setFieldError(fieldErrors, "email", "required");
  } else if (!EMAIL_PATTERN.test(email)) {
    setFieldError(fieldErrors, "email", "invalid_email");
  } else if (email.length > FEEDBACK_FIELD_LIMITS.email.max) {
    setFieldError(fieldErrors, "email", "too_long");
  }

  if (!category) {
    setFieldError(fieldErrors, "category", "required");
  } else if (!allowedCategories.includes(category)) {
    setFieldError(fieldErrors, "category", "invalid_category");
  }

  if (rating && !FEEDBACK_RATING_VALUES.includes(rating as (typeof FEEDBACK_RATING_VALUES)[number])) {
    setFieldError(fieldErrors, "rating", "invalid_rating");
  }

  if (!message) {
    setFieldError(fieldErrors, "message", "required");
  } else if (message.length < FEEDBACK_FIELD_LIMITS.message.min) {
    setFieldError(fieldErrors, "message", "too_short");
  } else if (message.length > FEEDBACK_FIELD_LIMITS.message.max) {
    setFieldError(fieldErrors, "message", "too_long");
  }

  if (Object.keys(fieldErrors).length > 0) {
    const firstField = Object.keys(fieldErrors)[0] as FeedbackFieldName;
    return {
      ok: false,
      fieldErrors,
      message: resolveFieldValidationMessage(
        firstField,
        fieldErrors[firstField]!,
        messages,
      ),
    };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      category,
      rating,
      message,
      locale,
    },
  };
}

export function resolveFieldValidationMessage(
  field: FeedbackFieldName,
  code: FeedbackValidationCode,
  messages: FeedbackValidationMessages,
): string {
  switch (field) {
    case "name":
      if (code === "required") return messages.nameRequired;
      if (code === "too_short") return messages.nameTooShort;
      return messages.nameTooLong;
    case "email":
      if (code === "required") return messages.emailRequired;
      if (code === "invalid_email") return messages.emailInvalid;
      return messages.emailTooLong;
    case "category":
      return code === "required"
        ? messages.categoryRequired
        : messages.categoryInvalid;
    case "rating":
      return messages.ratingInvalid;
    case "message":
      if (code === "required") return messages.messageRequired;
      if (code === "too_short") return messages.messageTooShort;
      return messages.messageTooLong;
    default:
      return messages.nameRequired;
  }
}

export const DEFAULT_FEEDBACK_VALIDATION_MESSAGES: FeedbackValidationMessages = {
  nameRequired: "Name is required.",
  nameTooShort: "Name must be at least 2 characters.",
  nameTooLong: "Name must be 100 characters or fewer.",
  emailRequired: "Email is required.",
  emailInvalid: "Enter a valid email address.",
  emailTooLong: "Email must be 254 characters or fewer.",
  categoryRequired: "Please select a feedback category.",
  categoryInvalid: "Please select a valid feedback category.",
  ratingInvalid: "Please select a valid rating.",
  messageRequired: "Message is required.",
  messageTooShort: "Message must be at least 10 characters.",
  messageTooLong: "Message must be 3,000 characters or fewer.",
};
