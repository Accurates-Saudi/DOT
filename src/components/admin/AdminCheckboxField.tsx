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
        "flex cursor-pointer items-start gap-3 rounded-2xl border border-[#0c1524]/10 bg-[#0c1524]/[0.02] px-4 py-3 transition hover:border-[var(--dot-orange)]/35 hover:bg-[var(--dot-orange)]/[0.04]",
        className,
      )}
    >
      <input
        {...props}
        id={inputId}
        type="checkbox"
        className="mt-0.5 size-4 rounded border-[#0c1524]/18 text-[var(--dot-orange)] focus:ring-[var(--dot-orange)]"
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-[#0c1524]">{label}</span>
        {hint ? (
          <span className="mt-1 block text-sm leading-6 text-[#0c1524]/55">{hint}</span>
        ) : null}
      </span>
    </label>
  );
}
