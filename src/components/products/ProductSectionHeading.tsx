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
        className="block h-1 w-9 rounded-sm bg-[#F68E05]"
        aria-hidden
      />
      <h2 className="mt-3 text-[0.8125rem] font-bold tracking-[0.14em] text-[#0c1524] uppercase sm:text-sm">
        {title}
      </h2>
    </div>
  );
}
