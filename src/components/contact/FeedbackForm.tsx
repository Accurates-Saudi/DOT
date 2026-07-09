import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import { Button } from "@/components/ui";
import { submitFeedback } from "@/lib/feedback/client";
import {
  getFeedbackResponseMessages,
  getFeedbackValidationMessages,
} from "@/lib/feedback/messages";
import {
  FEEDBACK_HONEYPOT_FIELD,
  type FeedbackErrorResponse,
  type FeedbackFieldErrors,
  type FeedbackFieldName,
} from "@/lib/feedback/types";
import {
  resolveFieldValidationMessage,
  validateFeedbackSubmission,
} from "@/lib/feedback/validation";
import { useI18n, useLocale } from "@/i18n/hooks";
import type { FeedbackFormContent, FeedbackFormValues } from "@/types";
import { cn } from "@/lib/utils";

const INITIAL_VALUES: FeedbackFormValues = {
  name: "",
  email: "",
  category: "",
  rating: "",
  message: "",
};

export interface FeedbackFormProps {
  content: FeedbackFormContent;
  className?: string;
}

const inputClassName =
  "form-input-interactive h-11 w-full rounded-sm border border-[#0c1524]/12 bg-white px-3.5 text-sm text-[#0c1524] placeholder:text-[#0c1524]/40 focus:outline-none";

export function FeedbackForm({ content, className }: FeedbackFormProps) {
  const locale = useLocale();
  const { messages } = useI18n();
  const validationMessages = useMemo(
    () => getFeedbackValidationMessages(messages),
    [messages],
  );
  const responseMessages = useMemo(
    () => getFeedbackResponseMessages(messages),
    [messages],
  );

  const [values, setValues] = useState<FeedbackFormValues>(INITIAL_VALUES);
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FeedbackFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allowedCategories = useMemo(
    () => content.categories.map((category) => category.id),
    [content.categories],
  );

  function updateField(field: keyof FeedbackFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    setFormError(null);
    setSuccessMessage(null);
  }

  function resolveDisplayedFieldError(field: FeedbackFieldName): string | undefined {
    const code = fieldErrors[field];
    if (!code) return undefined;
    return resolveFieldValidationMessage(field, code, validationMessages);
  }

  function resolveApiErrorMessage(error: FeedbackErrorResponse["error"]): string {
    switch (error.code) {
      case "rate_limited":
        return responseMessages.rateLimited;
      case "smtp_not_configured":
        return responseMessages.smtpNotConfigured;
      case "send_failed":
        return responseMessages.sendFailed;
      case "validation_failed":
        return error.message || responseMessages.submitError;
      default:
        return responseMessages.submitError;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    const validation = validateFeedbackSubmission(
      { ...values, [FEEDBACK_HONEYPOT_FIELD]: honeypot, locale },
      validationMessages,
      allowedCategories,
    );

    if (!validation.ok) {
      setFieldErrors(validation.fieldErrors);
      setFormError(validation.message);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitFeedback({
        ...validation.data,
        [FEEDBACK_HONEYPOT_FIELD]: honeypot,
      });

      if (!result.ok) {
        if (result.error.fieldErrors) {
          setFieldErrors(result.error.fieldErrors);
        }
        setFormError(resolveApiErrorMessage(result.error));
        return;
      }

      setValues(INITIAL_VALUES);
      setHoneypot("");
      setSuccessMessage(result.message || responseMessages.success);
    } catch {
      setFormError(responseMessages.networkError);
    } finally {
      setIsSubmitting(false);
    }
  }

  const placeholders = content.placeholders ?? {};

  return (
    <div
      className={cn(
        "rounded-sm border border-[#0c1524]/10 bg-white p-6 shadow-[0_16px_48px_-32px_rgba(12,21,36,0.18)] sm:p-8",
        className,
      )}
    >
      <h3 className="text-xl font-bold tracking-tight text-[#0c1524] sm:text-2xl">
        {content.heading}
      </h3>
      {content.description && (
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#0c1524]/65 sm:text-base">
          {content.description}
        </p>
      )}

      {successMessage && (
        <div
          role="status"
          className="mt-6 flex items-start gap-3 rounded-sm border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
        >
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>{successMessage}</p>
        </div>
      )}

      {formError && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <p>{formError}</p>
        </div>
      )}

      <form
        id="feedback-form"
        onSubmit={handleSubmit}
        className="relative mt-8 space-y-5"
        noValidate
      >
        <div
          className="absolute start-[-9999px] top-auto h-px w-px overflow-hidden"
          aria-hidden
        >
          <label htmlFor="feedback-company-website">Company website</label>
          <input
            id="feedback-company-website"
            name={FEEDBACK_HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            id="feedback-name"
            label={content.fields.name}
            placeholder={placeholders.name}
            value={values.name}
            onChange={(value) => updateField("name", value)}
            autoComplete="name"
            required
            error={resolveDisplayedFieldError("name")}
          />
          <FormField
            id="feedback-email"
            label={content.fields.email}
            type="email"
            placeholder={placeholders.email}
            value={values.email}
            onChange={(value) => updateField("email", value)}
            autoComplete="email"
            required
            error={resolveDisplayedFieldError("email")}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="feedback-category"
              className="mb-2 block text-[0.6875rem] font-bold tracking-[0.12em] text-[#0c1524]/70 uppercase sm:text-xs"
            >
              {content.fields.category}
            </label>
            <select
              id="feedback-category"
              name="category"
              value={values.category}
              onChange={(event) => updateField("category", event.target.value)}
              required
              aria-invalid={Boolean(resolveDisplayedFieldError("category"))}
              aria-describedby={
                resolveDisplayedFieldError("category")
                  ? "feedback-category-error"
                  : undefined
              }
              className={cn(
                inputClassName,
                resolveDisplayedFieldError("category") &&
                  "border-red-300 focus:border-red-400 focus:ring-red-100",
              )}
            >
              <option value="" disabled>
                {placeholders.category ?? content.fields.category}
              </option>
              {content.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            {resolveDisplayedFieldError("category") && (
              <p
                id="feedback-category-error"
                className="mt-2 text-xs text-red-700"
                role="alert"
              >
                {resolveDisplayedFieldError("category")}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="feedback-rating"
              className="mb-2 block text-[0.6875rem] font-bold tracking-[0.12em] text-[#0c1524]/70 uppercase sm:text-xs"
            >
              {content.fields.rating}
            </label>
            <select
              id="feedback-rating"
              name="rating"
              value={values.rating}
              onChange={(event) => updateField("rating", event.target.value)}
              aria-invalid={Boolean(resolveDisplayedFieldError("rating"))}
              aria-describedby={
                resolveDisplayedFieldError("rating")
                  ? "feedback-rating-error"
                  : undefined
              }
              className={cn(
                inputClassName,
                resolveDisplayedFieldError("rating") &&
                  "border-red-300 focus:border-red-400 focus:ring-red-100",
              )}
            >
              <option value="">
                {content.ratingPlaceholder ?? placeholders.rating ?? ""}
              </option>
              {content.ratings.map((rating) => (
                <option key={rating.value} value={rating.value}>
                  {rating.label}
                </option>
              ))}
            </select>
            {resolveDisplayedFieldError("rating") && (
              <p
                id="feedback-rating-error"
                className="mt-2 text-xs text-red-700"
                role="alert"
              >
                {resolveDisplayedFieldError("rating")}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="feedback-message"
            className="mb-2 block text-[0.6875rem] font-bold tracking-[0.12em] text-[#0c1524]/70 uppercase sm:text-xs"
          >
            {content.fields.message}
          </label>
          <textarea
            id="feedback-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder={placeholders.message}
            required
            aria-invalid={Boolean(resolveDisplayedFieldError("message"))}
            aria-describedby={
              resolveDisplayedFieldError("message")
                ? "feedback-message-error"
                : undefined
            }
            className={cn(
              inputClassName,
              "h-auto min-h-[8.5rem] resize-y py-3",
              resolveDisplayedFieldError("message") &&
                "border-red-300 focus:border-red-400 focus:ring-red-100",
            )}
          />
          {resolveDisplayedFieldError("message") && (
            <p
              id="feedback-message-error"
              className="mt-2 text-xs text-red-700"
              role="alert"
            >
              {resolveDisplayedFieldError("message")}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="accent"
          disabled={isSubmitting}
          className="h-12 w-full rounded-sm px-7 text-[0.8125rem] font-bold tracking-[0.08em] uppercase sm:w-auto"
        >
          <Send className="size-4" strokeWidth={2.25} />
          {content.submitLabel}
        </Button>
      </form>
    </div>
  );
}

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
}

function FormField({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  required,
  error,
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.6875rem] font-bold tracking-[0.12em] text-[#0c1524]/70 uppercase sm:text-xs"
      >
        {label}
      </label>
      <input
        id={id}
        name={id.replace("feedback-", "")}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={errorId}
        className={cn(
          inputClassName,
          error && "border-red-300 focus:border-red-400 focus:ring-red-100",
        )}
      />
      {error && (
        <p id={errorId} className="mt-2 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
