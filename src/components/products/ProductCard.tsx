import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import type { ProductItem } from "@/types";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  product: ProductItem;
  viewProductLabel: string;
  className?: string;
}

export function ProductCard({
  product,
  viewProductLabel,
  className,
}: ProductCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border border-[#0c1524]/8 bg-white shadow-[0_8px_32px_-20px_rgba(12,21,36,0.14)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-18px_rgba(12,21,36,0.18)]",
        className,
      )}
    >
      <div className="aspect-[16/10] overflow-hidden bg-[#0c1524]/[0.03]">
        <img
          src={product.image.src}
          alt={product.image.alt}
          className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-[0.6875rem] font-bold tracking-[0.16em] text-[#F68E05] uppercase">
          {product.category}
        </p>

        <h3 className="mt-2 text-base font-semibold leading-snug text-[#0c1524] sm:text-[1.0625rem]">
          {product.name}
        </h3>

        <p className="mt-2.5 flex-1 text-[0.8125rem] leading-[1.7] text-[#0c1524]/65 sm:text-sm">
          {product.description}
        </p>

        <Link
          to={product.href}
          className="mt-5 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold tracking-wide text-[#0c1524] uppercase transition-colors duration-200 hover:text-[#F68E05]"
        >
          {viewProductLabel}
          <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
