import type { ReactNode } from "react";

import { useLocale } from "@/i18n/hooks";
import { requiresLtrNumericIsolation } from "@/i18n/format-numbers";
import { cn } from "@/lib/utils";

export interface LocalizedNumericProps {
  children: ReactNode;
  className?: string;
  /** Keep number + symbols (e.g. +) in left-to-right order on Arabic pages. */
  isolateLtr?: boolean;
}

/**
 * Wraps numeric UI so affixes like "+" stay on the right in RTL layouts.
 */
export function LocalizedNumeric({
  children,
  className,
  isolateLtr,
}: LocalizedNumericProps) {
  const locale = useLocale();

  if (locale !== "ar") {
    return <span className={className}>{children}</span>;
  }

  const shouldIsolate =
    isolateLtr ??
    (typeof children === "string" && requiresLtrNumericIsolation(children));

  if (!shouldIsolate) {
    return <span className={className}>{children}</span>;
  }

  return (
    <bdi dir="ltr" className={cn("inline-block", className)}>
      {children}
    </bdi>
  );
}
