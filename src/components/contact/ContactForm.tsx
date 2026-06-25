import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui";
import { useNumberFormat } from "@/i18n/hooks";
import type { ContactFormContent, ContactFormValues } from "@/types";
import { cn } from "@/lib/utils";

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export interface ContactFormProps {
  content: ContactFormContent;
  onSubmit?: (values: ContactFormValues) => void | Promise<void>;
  isSubmitting?: boolean;
  className?: string;
}

const inputClassName =
  "form-input-interactive h-11 w-full rounded-sm border border-[#0c1524]/12 bg-white px-3.5 text-sm text-[#0c1524] placeholder:text-[#0c1524]/40 focus:outline-none";

export function ContactForm({
  content,
  onSubmit,
  isSubmitting = false,
  className,
}: ContactFormProps) {
  const { formatNumericText } = useNumberFormat();
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (onSubmit) {
      await onSubmit(values);
      return;
    }

    // Placeholder until backend integration — keeps form functional in dev
    console.info("[ContactForm] Submission ready for API integration:", values);
  }

  function updateField(field: keyof ContactFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  const placeholders = content.placeholders ?? {};
  const localizedPlaceholders = {
    name: placeholders.name,
    company: placeholders.company,
    email: placeholders.email,
    phone: placeholders.phone
      ? formatNumericText(placeholders.phone)
      : undefined,
    subject: placeholders.subject,
    message: placeholders.message,
  };

  return (
    <div
      className={cn(
        "rounded-sm border border-[#0c1524]/10 bg-white p-6 shadow-[0_16px_48px_-32px_rgba(12,21,36,0.18)] sm:p-8",
        className,
      )}
    >
      <h2 className="text-xl font-bold tracking-tight text-[#0c1524] sm:text-2xl">
        {content.heading}
      </h2>
      {content.description && (
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-[#0c1524]/65 sm:text-base">
          {content.description}
        </p>
      )}

      <form
        id="contact-form"
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
        noValidate
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            id="contact-name"
            label={content.fields.name}
            placeholder={localizedPlaceholders.name}
            value={values.name}
            onChange={(value) => updateField("name", value)}
            autoComplete="name"
            required
          />
          <FormField
            id="contact-company"
            label={content.fields.company}
            placeholder={localizedPlaceholders.company}
            value={values.company}
            onChange={(value) => updateField("company", value)}
            autoComplete="organization"
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField
            id="contact-email"
            label={content.fields.email}
            type="email"
            placeholder={localizedPlaceholders.email}
            value={values.email}
            onChange={(value) => updateField("email", value)}
            autoComplete="email"
            required
          />
          <FormField
            id="contact-phone"
            label={content.fields.phone}
            type="tel"
            placeholder={localizedPlaceholders.phone}
            value={values.phone}
            onChange={(value) => updateField("phone", value)}
            autoComplete="tel"
          />
        </div>

        <FormField
          id="contact-subject"
          label={content.fields.subject}
          placeholder={localizedPlaceholders.subject}
          value={values.subject}
          onChange={(value) => updateField("subject", value)}
          required
        />

        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block text-[0.6875rem] font-bold tracking-[0.12em] text-[#0c1524]/70 uppercase sm:text-xs"
          >
            {content.fields.message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder={localizedPlaceholders.message}
            required
            className={cn(
              inputClassName,
              "h-auto min-h-[8.5rem] resize-y py-3",
            )}
          />
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
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
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
}: FormFieldProps) {
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
        name={id.replace("contact-", "")}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={inputClassName}
      />
    </div>
  );
}
