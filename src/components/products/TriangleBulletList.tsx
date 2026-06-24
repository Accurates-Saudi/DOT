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
          <span
            className="mt-[0.35rem] shrink-0 text-[0.4rem] text-[#F68E05]"
            aria-hidden
          >
            ▶
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
