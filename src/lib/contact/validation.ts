import type {
  ContactFieldErrors,
  ContactFieldName,
  ContactInquiryInput,
  ContactValidationCode,
  ContactValidationMessages,
  SanitizedContactInquiry,
} from "./types";

export const CONTACT_FIELD_LIMITS = {
  name: { min: 2, max: 100 },
  company: { max: 150 },
  email: { max: 254 },
  phone: { max: 30 },
  subject: { min: 3, max: 200 },
  message: { min: 10, max: 5000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s.-]+$/;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function setFieldError(
  fieldErrors: ContactFieldErrors,
  field: ContactFieldName,
  code: ContactValidationCode,
) {
  if (!fieldErrors[field]) {
    fieldErrors[field] = code;
  }
}

export function validateContactInquiry(
  input: ContactInquiryInput,
  messages: ContactValidationMessages,
): {
  ok: true;
  data: SanitizedContactInquiry;
} | {
  ok: false;
  fieldErrors: ContactFieldErrors;
  message: string;
} {
  const fieldErrors: ContactFieldErrors = {};

  const name = asTrimmedString(input.name);
  const company = asTrimmedString(input.company);
  const email = asTrimmedString(input.email);
  const phone = asTrimmedString(input.phone);
  const subject = asTrimmedString(input.subject);
  const message = asTrimmedString(input.message);
  const locale = asTrimmedString(input.locale) || undefined;

  if (!name) {
    setFieldError(fieldErrors, "name", "required");
  } else if (name.length < CONTACT_FIELD_LIMITS.name.min) {
    setFieldError(fieldErrors, "name", "too_short");
  } else if (name.length > CONTACT_FIELD_LIMITS.name.max) {
    setFieldError(fieldErrors, "name", "too_long");
  }

  if (company.length > CONTACT_FIELD_LIMITS.company.max) {
    setFieldError(fieldErrors, "company", "too_long");
  }

  if (!email) {
    setFieldError(fieldErrors, "email", "required");
  } else if (!EMAIL_PATTERN.test(email)) {
    setFieldError(fieldErrors, "email", "invalid_email");
  } else if (email.length > CONTACT_FIELD_LIMITS.email.max) {
    setFieldError(fieldErrors, "email", "too_long");
  }

  if (phone) {
    if (phone.length > CONTACT_FIELD_LIMITS.phone.max) {
      setFieldError(fieldErrors, "phone", "too_long");
    } else if (!PHONE_PATTERN.test(phone)) {
      setFieldError(fieldErrors, "phone", "invalid_phone");
    }
  }

  if (!subject) {
    setFieldError(fieldErrors, "subject", "required");
  } else if (subject.length < CONTACT_FIELD_LIMITS.subject.min) {
    setFieldError(fieldErrors, "subject", "too_short");
  } else if (subject.length > CONTACT_FIELD_LIMITS.subject.max) {
    setFieldError(fieldErrors, "subject", "too_long");
  }

  if (!message) {
    setFieldError(fieldErrors, "message", "required");
  } else if (message.length < CONTACT_FIELD_LIMITS.message.min) {
    setFieldError(fieldErrors, "message", "too_short");
  } else if (message.length > CONTACT_FIELD_LIMITS.message.max) {
    setFieldError(fieldErrors, "message", "too_long");
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      fieldErrors,
      message: resolveFirstValidationMessage(fieldErrors, messages),
    };
  }

  return {
    ok: true,
    data: {
      name,
      company,
      email,
      phone,
      subject,
      message,
      locale,
    },
  };
}

export function resolveValidationMessage(
  code: ContactValidationCode,
  messages: ContactValidationMessages,
): string {
  switch (code) {
    case "required":
      return messages.nameRequired;
    case "too_short":
      return messages.nameTooShort;
    case "too_long":
      return messages.nameTooLong;
    case "invalid_email":
      return messages.emailInvalid;
    case "invalid_phone":
      return messages.phoneInvalid;
    default:
      return messages.nameRequired;
  }
}

export function resolveFieldValidationMessage(
  field: ContactFieldName,
  code: ContactValidationCode,
  messages: ContactValidationMessages,
): string {
  switch (field) {
    case "name":
      if (code === "required") return messages.nameRequired;
      if (code === "too_short") return messages.nameTooShort;
      return messages.nameTooLong;
    case "company":
      return messages.companyTooLong;
    case "email":
      if (code === "required") return messages.emailRequired;
      if (code === "invalid_email") return messages.emailInvalid;
      return messages.emailTooLong;
    case "phone":
      return code === "too_long" ? messages.phoneTooLong : messages.phoneInvalid;
    case "subject":
      if (code === "required") return messages.subjectRequired;
      if (code === "too_short") return messages.subjectTooShort;
      return messages.subjectTooLong;
    case "message":
      if (code === "required") return messages.messageRequired;
      if (code === "too_short") return messages.messageTooShort;
      return messages.messageTooLong;
    default:
      return messages.nameRequired;
  }
}

function resolveFirstValidationMessage(
  fieldErrors: ContactFieldErrors,
  messages: ContactValidationMessages,
): string {
  const firstField = Object.keys(fieldErrors)[0] as ContactFieldName | undefined;
  if (!firstField || !fieldErrors[firstField]) {
    return messages.nameRequired;
  }

  return resolveFieldValidationMessage(
    firstField,
    fieldErrors[firstField],
    messages,
  );
}

export const DEFAULT_CONTACT_VALIDATION_MESSAGES: ContactValidationMessages = {
  nameRequired: "Name is required.",
  nameTooShort: "Name must be at least 2 characters.",
  nameTooLong: "Name must be 100 characters or fewer.",
  companyTooLong: "Company name must be 150 characters or fewer.",
  emailRequired: "Email is required.",
  emailInvalid: "Enter a valid email address.",
  emailTooLong: "Email must be 254 characters or fewer.",
  phoneTooLong: "Phone must be 30 characters or fewer.",
  phoneInvalid: "Enter a valid phone number.",
  subjectRequired: "Subject is required.",
  subjectTooShort: "Subject must be at least 3 characters.",
  subjectTooLong: "Subject must be 200 characters or fewer.",
  messageRequired: "Message is required.",
  messageTooShort: "Message must be at least 10 characters.",
  messageTooLong: "Message must be 5,000 characters or fewer.",
};
