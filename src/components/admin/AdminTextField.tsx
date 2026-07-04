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
    <label className="block space-y-2" htmlFor={inputId}>
      <span
        className={cn(
          "block text-[0.7rem] font-semibold tracking-[0.22em] uppercase",
          isLight ? "text-[#0c1524]/66" : "text-white/68",
        )}
      >
        {label}
      </span>
      <div className={cn("relative", className)}>
        <input
          {...props}
          id={inputId}
          className={cn(
            "h-12 w-full rounded-xl border px-4 text-sm outline-none transition",
            isLight
              ? "border-[#0c1524]/10 bg-white text-[#0c1524] shadow-[0_10px_30px_-18px_rgba(12,21,36,0.22)] placeholder:text-[#0c1524]/32 focus:border-[var(--dot-orange)] focus:ring-4 focus:ring-[color:rgba(246,142,5,0.12)]"
              : "border-white/12 bg-white/6 text-white placeholder:text-white/38 focus:border-[var(--dot-orange)] focus:bg-white/8 focus:ring-2 focus:ring-[color:rgba(246,142,5,0.18)]",
            "disabled:cursor-not-allowed disabled:opacity-60",
            error &&
              (isLight
                ? "border-red-300 focus:ring-red-400/15"
                : "border-red-400/80 focus:ring-red-400/20"),
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
            isLight ? "text-[#0c1524]/52" : "text-white/54",
          )}
        >
          {hint}
        </span>
      ) : null}
    </label>
  );
}
