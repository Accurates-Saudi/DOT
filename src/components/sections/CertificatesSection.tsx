import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

import { Container, Section } from "@/components/shared";
import { useCertificatesCarousel } from "@/hooks/use-certificates-carousel";
import type { CertificateItem, CertificatesSectionContent } from "@/types";
import { cn } from "@/lib/utils";

export interface CertificatesSectionProps {
  content: CertificatesSectionContent;
}

export function CertificatesSection({ content }: CertificatesSectionProps) {
  const transitionMs = content.transitionMs ?? 800;
  const autoplayDelayMs = content.autoplayDelayMs ?? 2000;

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
  } = useCertificatesCarousel({
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
      id="certificates"
      padding="none"
      variant="default"
      aria-label="Our certificates"
      className="overflow-hidden bg-white py-10 sm:py-12 lg:py-14"
    >
      <Container size="wide">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.3fr)_minmax(0,0.7fr)] lg:gap-10 xl:gap-12">
          <div className="max-w-xs lg:max-w-none">
            <h2 className="text-[1.75rem] font-bold leading-[1.1] tracking-tight text-[#0c1524] sm:text-[2rem] lg:text-[2.15rem]">
              {content.heading}
              <span className="block text-[#F68E05]">{content.headingAccent}</span>
            </h2>

            <span
              className="mt-3 block h-px w-10 bg-[#F68E05] sm:mt-4"
              aria-hidden
            />

            <p className="mt-3 text-[0.8125rem] font-medium text-[#0c1524]/72 sm:mt-4 sm:text-sm">
              {content.subheading}
            </p>
          </div>

          <div className="relative min-w-0">
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
                data-certificate-track
                className="flex gap-4 sm:gap-5"
                style={{
                  transform: `translate3d(${translateX}px, 0, 0)`,
                  transition:
                    isAnimating && !isDragging
                      ? `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`
                      : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedItems.map((item, slideIndex) => (
                  <CertificateCard
                    key={`${item.id}-${slideIndex}`}
                    item={item}
                    slidesPerView={slidesPerView}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function CertificateCard({
  item,
  slidesPerView,
}: {
  item: CertificateItem;
  slidesPerView: number;
}) {
  const slideWidth =
    slidesPerView === 1
      ? "100%"
      : slidesPerView === 2
        ? "calc((100% - 1.25rem) / 2)"
        : "calc((100% - 2.5rem) / 3)";

  return (
    <article
      data-certificate-slide
      className="group shrink-0"
      style={{ width: slideWidth, flexBasis: slideWidth }}
      aria-label={item.title ?? item.image.alt}
    >
      <div className="overflow-hidden rounded-sm border border-[#0c1524]/8 bg-white p-2 shadow-[0_4px_18px_-12px_rgba(12,21,36,0.22)] transition-[transform,box-shadow] duration-300 ease-out group-hover:scale-[1.015] group-hover:shadow-[0_8px_24px_-12px_rgba(12,21,36,0.28)] sm:p-2.5">
        <div className="aspect-[5/3.2] overflow-hidden bg-[#faf9f8]">
          <img
            src={item.image.src}
            alt={item.image.alt}
            className="size-full object-contain object-center"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </article>
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
  const label =
    direction === "prev" ? "Previous certificate" : "Next certificate";

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#0c1524]/6 bg-white text-[#F68E05] shadow-[0_6px_20px_-10px_rgba(12,21,36,0.28)] transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[0_8px_24px_-10px_rgba(12,21,36,0.32)] active:scale-95 sm:size-10",
        className,
      )}
    >
      <Icon className="size-4 stroke-[2.25] sm:size-[1.125rem]" />
    </button>
  );
}
