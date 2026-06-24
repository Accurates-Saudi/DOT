import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      default: "max-w-7xl",
      narrow: "max-w-4xl",
      wide: "max-w-[90rem]",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface ContainerProps extends VariantProps<typeof containerVariants> {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
}

export function Container({
  children,
  className,
  size,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component className={cn(containerVariants({ size }), className)}>
      {children}
    </Component>
  );
}
