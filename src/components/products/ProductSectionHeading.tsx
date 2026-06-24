import { cn } from "@/lib/utils";

export interface ProductSectionHeadingProps {
  title: string;
  className?: string;
}

export function ProductSectionHeading({
  title,
  className,
}: ProductSectionHeadingProps) {
  return (
    <div className={className}>
      <span
        className="block h-[3px] w-8 rounded-sm bg-[#F68E05]"
        aria-hidden
      />
      <h2 className="mt-2.5 text-[0.8125rem] font-bold tracking-[0.16em] text-[#0c1524] uppercase">
        {title}
      </h2>
    </div>
  );
}
