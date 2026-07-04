import * as React from "react";

import { cn } from "@/lib/utils";

interface AdminCheckboxFieldProps extends Omit<React.ComponentProps<"input">, "type"> {
  label: string;
  hint?: string;
}

export function AdminCheckboxField({
  label,
  hint,
  className,
  id,
  ...props
}: AdminCheckboxFieldProps) {
  const inputId = id ?? React.useId();

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-md border border-[#e5e5e5] bg-[#f8f8f8] px-3 py-2.5 transition hover:border-[#d4d4d4]",
        className,
      )}
    >
      <input
        {...props}
        id={inputId}
        type="checkbox"
        className="mt-0.5 size-4 rounded border-[#d4d4d4] text-[var(--dot-orange)] focus:ring-[var(--dot-orange)]"
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-[#333]">{label}</span>
        {hint ? (
          <span className="mt-0.5 block text-sm text-[#888]">{hint}</span>
        ) : null}
      </span>
    </label>
  );
}
