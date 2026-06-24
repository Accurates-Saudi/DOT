import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva("space-y-3", {
  variants: {
    align: {
      left: "text-left",
      center: "mx-auto max-w-3xl text-center",
    },
    size: {
      default: "",
      lg: "max-w-4xl",
    },
  },
  defaultVariants: {
    align: "left",
    size: "default",
  },
});

export interface SectionHeadingProps
  extends VariantProps<typeof headingVariants> {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  actions?: ReactNode;
}

export function SectionHeading({
  title,
  subtitle,
  description,
  align,
  size,
  className,
  actions,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        headingVariants({ align, size }),
        actions && "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="space-y-3">
        {subtitle && (
          <p className="text-sm font-medium tracking-wider text-primary uppercase">
            {subtitle}
          </p>
        )}
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
