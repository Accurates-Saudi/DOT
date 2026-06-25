import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router";

import { FeaturedProductCard } from "@/components/products/FeaturedProductCard";
import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import { useFeaturedProductsCarousel } from "@/hooks/use-featured-products-carousel";
import type { FeaturedProductsSectionContent } from "@/types";
import { cn } from "@/lib/utils";

export interface FeaturedProductsSectionProps {
  content: FeaturedProductsSectionContent;
}

export function FeaturedProductsSection({ content }: FeaturedProductsSectionProps) {
  const transitionMs = content.transitionMs ?? 700;
  const autoplayDelayMs = content.autoplayDelayMs ?? 2500;

  const {
    viewportRef,
    slidesPerView,
    clones,
    canScroll,
    translateX,
    isAnimating,
    isDragging,
    next,
    prev,
    pauseAutoplay,
    handleTransitionEnd,
    pointerHandlers,
  } = useFeaturedProductsCarousel({
    itemCount: content.items.length,
    autoplayDelayMs,
    transitionMs,
  });

  const extendedItems = useMemo(() => {
    if (!canScroll) return content.items;

    const leading = content.items.slice(-clones);
    const trailing = content.items.slice(0, clones);
    return [...leading, ...content.items, ...trailing];
  }, [canScroll, clones, content.items]);

  return (
    <Section
      id="featured-products"
      padding="section72"
      variant="default"
      aria-label="Featured products"
      className="overflow-hidden bg-white"
    >
      <Container size="wide">
        <header className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
            <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-[#0c1524]/55 uppercase sm:text-xs">
              {content.label}
            </p>
          </div>

          <h2 className="mt-4 text-[1.875rem] font-bold leading-[1.1] tracking-tight text-[#0c1524] sm:text-[2.1rem] lg:text-[2.35rem]">
            {content.heading}
          </h2>

          <span className="mt-4 block h-px w-10 bg-[#F68E05]" aria-hidden />

          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-[#0c1524]/68 sm:text-base">
            {content.description}
          </p>
        </header>

        <div className="relative mt-8 min-w-0 sm:mt-10">
          {canScroll && (
            <>
              <CarouselButton
                direction="prev"
                onClick={() => {
                  pauseAutoplay();
                  prev();
                }}
                className="left-0 -translate-x-1/2"
              />
              <CarouselButton
                direction="next"
                onClick={() => {
                  pauseAutoplay();
                  next();
                }}
                className="right-0 translate-x-1/2"
              />
            </>
          )}

          <div
            ref={viewportRef}
            className={cn(
              "overflow-hidden",
              canScroll && "cursor-grab active:cursor-grabbing",
            )}
            {...(canScroll ? pointerHandlers : {})}
            onMouseEnter={canScroll ? pauseAutoplay : undefined}
          >
            <div
              data-featured-product-track
              className="flex gap-5"
              style={{
                transform: `translate3d(${translateX}px, 0, 0)`,
                transition:
                  isAnimating && !isDragging
                    ? `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`
                    : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedItems.map((product, slideIndex) => (
                <FeaturedProductCard
                  key={`${product.id}-${slideIndex}`}
                  product={product}
                  viewProductLabel={content.viewProductLabel}
                  slidesPerView={slidesPerView}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Button
            size="lg"
            className="group h-12 rounded-full border-transparent bg-[#F68E05] px-8 text-[0.9375rem] font-medium text-white shadow-[0_8px_24px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] hover:shadow-[0_12px_28px_-10px_rgba(246,142,5,0.5)] sm:h-[3.25rem] sm:px-10"
            asChild
          >
            <Link to={content.exploreAll.href}>
              {content.exploreAll.label}
              <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function CarouselButton({
  direction,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const label = direction === "prev" ? "Previous product" : "Next product";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-[42%] z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#0c1524]/6 bg-white text-[#F68E05] shadow-[0_6px_20px_-10px_rgba(12,21,36,0.28)] transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[0_8px_24px_-10px_rgba(12,21,36,0.32)] active:scale-95 sm:size-10",
        className,
      )}
    >
      <Icon className="size-4 stroke-[2.25] sm:size-[1.125rem]" />
    </button>
  );
}
