import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

import { Container, CarouselLtrScope, Section } from "@/components/shared";
import { useCarouselKeyboard, useCertificatesCarousel, useScrollReveal } from "@/hooks";
import type { CertificateItem, CertificatesSectionContent } from "@/types";
import { cn } from "@/lib/utils";

export interface CertificatesSectionProps {
  content: CertificatesSectionContent;
}

export function CertificatesSection({ content }: CertificatesSectionProps) {
  const transitionMs = content.transitionMs ?? 520;
  const { ref: sectionRef, revealProps } = useScrollReveal();

  const {
    viewportRef,
    slidesPerView,
    canScroll,
    translateX,
    isAnimating,
    isDragging,
    next,
    prev,
    pauseAutoplay,
    resumeAutoplay,
    pointerHandlers,
  } = useCertificatesCarousel({
    itemCount: content.items.length,
    transitionMs,
  });

  useCarouselKeyboard(viewportRef, {
    enabled: canScroll,
    onPrev: prev,
    onNext: next,
    pauseAutoplay,
    label: "Certificates carousel",
  });

  const extendedItems = useMemo(() => {
    if (!canScroll) return content.items;
    return [...content.items, ...content.items];
  }, [canScroll, content.items]);

  return (
    <Section
      id="certificates"
      padding="section72"
      variant="default"
      aria-label="Our certificates"
      className="overflow-hidden bg-white"
    >
      <Container size="wide">
        <div
          ref={sectionRef}
          className="grid items-center gap-8 md:grid-cols-[minmax(0,0.26fr)_minmax(0,0.74fr)] md:gap-8 lg:gap-10"
        >
          <div {...revealProps(0, "max-w-xs md:max-w-none")}>
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

          <div {...revealProps(120, "relative min-w-0")}>
            <CarouselLtrScope className="relative">
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
              onMouseLeave={canScroll ? resumeAutoplay : undefined}
            >
              <div
                data-certificate-track
                className="flex gap-3"
                style={{
                  transform: `translate3d(${translateX}px, 0, 0)`,
                  transition:
                    isAnimating && !isDragging
                      ? `transform ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`
                      : "none",
                }}
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
            </CarouselLtrScope>
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
  const gapCount = Math.max(slidesPerView - 1, 0);
  const gapTotal = gapCount * 0.75;
  const slideWidth =
    slidesPerView === 1
      ? "100%"
      : `calc((100% - ${gapTotal}rem) / ${slidesPerView})`;

  return (
    <article
      data-certificate-slide
      className="group shrink-0"
      style={{ width: slideWidth, flexBasis: slideWidth }}
      aria-label={item.title ?? item.image.alt}
    >
      <div className="card-hover overflow-hidden rounded-sm border border-[#0c1524]/8 bg-white shadow-[0_4px_18px_-12px_rgba(12,21,36,0.22)] hover:shadow-[0_6px_20px_-14px_rgba(12,21,36,0.24)]">
        <div className="aspect-[4/3] overflow-hidden bg-white">
          <img
            src={item.image.src}
            alt={item.image.alt}
            className="img-zoom-hover size-full object-cover object-center"
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
        "carousel-nav-btn absolute top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#0c1524]/6 bg-white text-[#F68E05] shadow-[0_6px_20px_-10px_rgba(12,21,36,0.28)] sm:size-10",
        className,
      )}
    >
      <Icon className="size-4 stroke-[2.25] sm:size-[1.125rem]" />
    </button>
  );
}
