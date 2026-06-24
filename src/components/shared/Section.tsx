import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const sectionVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-background",
      muted: "bg-muted",
      primary: "bg-primary text-primary-foreground",
      accent: "bg-accent/10",
    },
    padding: {
      none: "py-0",
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-20 md:py-32",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

export interface SectionProps extends VariantProps<typeof sectionVariants> {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

export function Section({
  children,
  className,
  variant,
  padding,
  id,
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(sectionVariants({ variant, padding }), className)}
    >
      {children}
    </section>
  );
}
