import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

import type { ProductItem } from "@/types";
import { cn } from "@/lib/utils";

export interface FeaturedProductCardProps {
  product: ProductItem;
  viewProductLabel: string;
  slidesPerView: number;
  className?: string;
}

export function FeaturedProductCard({
  product,
  viewProductLabel,
  slidesPerView,
  className,
}: FeaturedProductCardProps) {
  const gapCount = Math.max(slidesPerView - 1, 0);
  const gapTotal = gapCount * 1.25;
  const slideWidth =
    slidesPerView === 1
      ? "100%"
      : `calc((100% - ${gapTotal}rem) / ${slidesPerView})`;

  return (
    <article
      data-featured-product-slide
      className={cn("group shrink-0", className)}
      style={{ width: slideWidth, flexBasis: slideWidth }}
    >
      <div className="card-hover group/card flex h-full flex-col overflow-hidden rounded-2xl border border-[#0c1524]/8 bg-white shadow-[0_10px_36px_-24px_rgba(12,21,36,0.14)] hover:shadow-[0_16px_44px_-22px_rgba(12,21,36,0.2)]">
        <div className="aspect-[4/3] overflow-hidden bg-[#f8f7f6]">
          <img
            src={product.image.src}
            alt={product.image.alt}
            className="img-zoom-hover size-full object-cover object-center"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
          <p className="text-[0.6875rem] font-semibold tracking-[0.14em] text-[#F68E05] uppercase sm:text-xs">
            {product.category}
          </p>

          <h3 className="mt-2 text-base font-bold leading-snug tracking-tight text-[#0c1524] sm:text-[1.0625rem]">
            {product.name}
          </h3>

          <Link
            to={`/products/${product.slug}`}
            className="text-link-hover text-link-arrow mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.8125rem] font-semibold text-[#0c1524] hover:text-[#F68E05] sm:text-sm"
          >
            {viewProductLabel}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
