import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Keeps transform-based carousels working inside RTL pages.
 * Translation math assumes a left-to-right track.
 */
export function CarouselLtrScope({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div dir="ltr" className={cn("carousel-ltr", className)}>
      {children}
    </div>
  );
}
