import { cn } from "@/lib/utils";

export interface TriangleBulletListProps {
  items: string[];
  className?: string;
}

export function TriangleBulletList({
  items,
  className,
}: TriangleBulletListProps) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <li
          key={index}
          className="flex gap-2.5 text-[0.8125rem] leading-[1.75] text-[#0c1524]/75 sm:text-sm"
        >
          <span
            className="mt-[0.4rem] shrink-0 text-[0.45rem] text-[#F68E05]"
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
