import { ArrowBigRightDash } from "lucide-react";

import { cn } from "@/lib/utils";

export interface TriangleBulletListProps {
  items: string[];
  className?: string;
  compact?: boolean;
}

export function TriangleBulletList({
  items,
  className,
  compact = false,
}: TriangleBulletListProps) {
  return (
    <ul className={cn(compact ? "space-y-2" : "space-y-3", className)}>
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-2 text-[0.75rem] leading-[1.65] text-[#0c1524]/80 sm:text-[0.8125rem] sm:leading-[1.7]"
        >
          <ArrowBigRightDash
            className="mt-0.5 size-3.5 shrink-0 text-[#F68E05]"
            strokeWidth={2.25}
            aria-hidden
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
