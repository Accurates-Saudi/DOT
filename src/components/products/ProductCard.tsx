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
        "group/card card-hover overflow-hidden rounded-2xl border border-[#0c1524]/8 bg-white p-1.5 shadow-[0_12px_40px_-24px_rgba(12,21,36,0.16)] hover:shadow-[0_16px_44px_-20px_rgba(12,21,36,0.22)] sm:p-2",
        className,
      )}
    >
      <div className="aspect-[4/3] overflow-hidden rounded-[0.75rem] sm:rounded-xl">
        <img
          src={product.image.src}
          alt={product.image.alt}
          className="img-zoom-hover size-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="px-3 py-4 sm:px-4 sm:py-5">
        <h3 className="text-[0.8125rem] font-bold tracking-[0.06em] text-[#0c1524] uppercase sm:text-sm">
          {product.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-[0.75rem] leading-snug text-[#0c1524]/60 sm:text-xs">
          {product.description}
        </p>

        <Link
          to={`/products/${product.slug}`}
          className="text-link-hover text-link-arrow mt-3 inline-flex items-center gap-1 text-[0.6875rem] font-semibold tracking-wide text-[#0c1524] uppercase hover:text-[#F68E05] sm:text-xs"
        >
          {viewProductLabel}
          <ArrowRight className="size-3" />
        </Link>
      </div>
    </article>
  );
}
