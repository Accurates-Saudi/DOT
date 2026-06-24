import { Home } from "lucide-react";
import { Link } from "react-router";

import type { BreadcrumbItem } from "@/types";
import { cn } from "@/lib/utils";

export interface ProductDetailBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function ProductDetailBreadcrumb({
  items,
  className,
}: ProductDetailBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn(className)}>
      <ol className="flex flex-wrap items-center gap-1 text-[0.6875rem] leading-none sm:text-[11px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center">
              {index > 0 && (
                <span className="mx-1.5 text-[#0c1524]/30" aria-hidden>
                  /
                </span>
              )}

              {isFirst && item.href ? (
                <Link
                  to={item.href}
                  className="flex items-center gap-1 text-[#0c1524]/45 transition-colors hover:text-[#0c1524]/70"
                >
                  <Home className="size-3 shrink-0" aria-hidden />
                  <span>{item.label}</span>
                </Link>
              ) : isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "font-medium",
                    isLast ? "text-[#F68E05]" : "text-[#0c1524]/45",
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-[#0c1524]/45 transition-colors hover:text-[#0c1524]/70"
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
