import * as React from "react";

import { cn } from "@/lib/utils";

interface AdminTextFieldProps extends React.ComponentProps<"input"> {
  label: string;
  hint?: string;
  error?: string;
  tone?: "light" | "dark";
  inputClassName?: string;
}

export function AdminTextField({
  label,
  hint,
  error,
  tone = "light",
  className,
  inputClassName,
  id,
  ...props
}: AdminTextFieldProps) {
  const inputId = id ?? React.useId();
  const isLight = tone === "light";

  return (
    <label className="block space-y-1.5" htmlFor={inputId}>
      <span
        className={cn(
          "block text-sm font-medium",
          isLight ? "text-[#333]" : "text-white/80",
        )}
      >
        {label}
      </span>
      <div className={cn("relative", className)}>
        <input
          {...props}
          id={inputId}
          className={cn(
            "h-10 w-full rounded-md border px-3 text-sm outline-none transition",
            isLight
              ? "border-[#e5e5e5] bg-white text-[#111] placeholder:text-[#aaa] focus:border-[var(--dot-orange)] focus:ring-1 focus:ring-[var(--dot-orange)]"
              : "border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-[var(--dot-orange)] focus:ring-1 focus:ring-[var(--dot-orange)]",
            "disabled:cursor-not-allowed disabled:opacity-60",
            error &&
              (isLight
                ? "border-red-400 focus:ring-red-400"
                : "border-red-400 focus:ring-red-400"),
            inputClassName,
          )}
        />
      </div>
      {error ? (
        <span className={cn("block text-sm", isLight ? "text-red-600" : "text-red-300")}>
          {error}
        </span>
      ) : hint ? (
        <span
          className={cn(
            "block text-sm",
            isLight ? "text-[#888]" : "text-white/60",
          )}
        >
          {hint}
        </span>
      ) : null}
    </label>
  );
}
