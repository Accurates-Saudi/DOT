import * as React from "react";

import { cn } from "@/lib/utils";

interface AdminTextFieldProps extends React.ComponentProps<"input"> {
  label: string;
  hint?: string;
  error?: string;
}

export function AdminTextField({
  label,
  hint,
  error,
  className,
  id,
  ...props
}: AdminTextFieldProps) {
  const inputId = id ?? React.useId();

  return (
    <label className="block space-y-2" htmlFor={inputId}>
      <span className="block text-[0.7rem] font-semibold tracking-[0.22em] text-white/68 uppercase">
        {label}
      </span>
      <input
        {...props}
        id={inputId}
        className={cn(
          "h-12 w-full rounded-xl border border-white/12 bg-white/6 px-4 text-sm text-white outline-none transition",
          "placeholder:text-white/38 focus:border-[var(--dot-orange)] focus:bg-white/8 focus:ring-2 focus:ring-[color:rgba(246,142,5,0.18)]",
          "disabled:cursor-not-allowed disabled:opacity-60",
          error && "border-red-400/80 focus:ring-red-400/20",
          className,
        )}
      />
      {error ? (
        <span className="block text-sm text-red-300">{error}</span>
      ) : hint ? (
        <span className="block text-sm text-white/54">{hint}</span>
      ) : null}
    </label>
  );
}
