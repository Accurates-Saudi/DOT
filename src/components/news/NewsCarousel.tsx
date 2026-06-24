import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

import { useNewsCarousel } from "@/hooks/use-news-carousel";
import type { NewsArticlePreview } from "@/types";
import { cn } from "@/lib/utils";

import { NewsCard } from "./NewsCard";

const TRANSITION_MS = 600;

export interface NewsCarouselProps {
  articles: NewsArticlePreview[];
  readMoreLabel?: string;
  className?: string;
}

export function NewsCarousel({
  articles,
  readMoreLabel = "Read More",
  className,
}: NewsCarouselProps) {
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
    handleTransitionEnd,
    pointerHandlers,
  } = useNewsCarousel(articles.length);

  const extendedArticles = useMemo(() => {
    if (!canScroll) return articles;

    const leading = articles.slice(-clones);
    const trailing = articles.slice(0, clones);
    return [...leading, ...articles, ...trailing];
  }, [articles, canScroll, clones]);

  return (
    <div className={cn("relative mx-auto max-w-6xl", className)}>
      {canScroll && (
        <>
          <NewsCarouselButton
            direction="prev"
            onClick={prev}
            className="-left-1 sm:-left-3 lg:-left-5"
          />
          <NewsCarouselButton
            direction="next"
            onClick={next}
            className="-right-1 sm:-right-3 lg:-right-5"
          />
        </>
      )}

      <div
        ref={viewportRef}
        className={cn(
          "overflow-hidden px-1",
          canScroll && "cursor-grab active:cursor-grabbing",
        )}
        {...(canScroll ? pointerHandlers : {})}
      >
        <div
          data-news-track
          className="flex gap-5 sm:gap-6"
          style={{
            transform: `translate3d(${translateX}px, 0, 0)`,
            transition:
              isAnimating && !isDragging
                ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedArticles.map((article, slideIndex) => (
            <NewsCard
              key={`${article.id}-${slideIndex}`}
              article={article}
              readMoreLabel={readMoreLabel}
              slidesPerView={slidesPerView}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NewsCarouselButton({
  direction,
  onClick,
  className,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous news" : "Next news"}
      onClick={onClick}
      className={cn(
        "absolute top-[32%] z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#0c1524]/8 bg-white text-[#F68E05] shadow-[0_6px_20px_-10px_rgba(12,21,36,0.25)] transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[0_8px_24px_-10px_rgba(12,21,36,0.3)] active:scale-95 sm:size-10",
        className,
      )}
    >
      <Icon className="size-4 stroke-[2.25]" />
    </button>
  );
}
