import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

import type { BreadcrumbItem } from "@/types";
import { cn } from "@/lib/utils";

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  highlightLast?: boolean;
  variant?: "default" | "onDark";
}

export function Breadcrumb({
  items,
  className,
  highlightLast,
  variant = "default",
}: BreadcrumbProps) {
  const isOnDark = variant === "onDark";

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight
                  className={cn(
                    "size-3.5 shrink-0",
                    isOnDark ? "text-white/40" : "text-muted-foreground/50",
                  )}
                  aria-hidden
                />
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "font-medium",
                    isLast && highlightLast
                      ? "text-[#F68E05]"
                      : isLast
                        ? isOnDark
                          ? "text-white"
                          : "text-foreground"
                        : isOnDark
                          ? "text-white/70"
                          : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className={cn(
                    "transition-colors",
                    isOnDark
                      ? "text-white/70 hover:text-white"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
