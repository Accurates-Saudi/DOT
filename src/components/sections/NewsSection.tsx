import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { Link } from "react-router";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import { useNewsCarousel } from "@/hooks/use-news-carousel";
import type { NewsArticlePreview, NewsSectionContent } from "@/types";
import { cn } from "@/lib/utils";

const TRANSITION_MS = 600;

export interface NewsSectionProps {
  content: NewsSectionContent;
}

export function NewsSection({ content }: NewsSectionProps) {
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
  } = useNewsCarousel(content.articles.length);

  const extendedArticles = useMemo(() => {
    if (!canScroll) return content.articles;

    const leading = content.articles.slice(-clones);
    const trailing = content.articles.slice(0, clones);
    return [...leading, ...content.articles, ...trailing];
  }, [canScroll, clones, content.articles]);

  return (
    <Section
      id="news"
      padding="lg"
      variant="default"
      aria-label="Latest news"
      className="overflow-hidden bg-white"
    >
      <Container size="wide">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-[1.75rem] font-bold leading-[1.15] tracking-tight text-[#0c1524] sm:text-[2rem] lg:text-[2.15rem]">
            {content.heading}{" "}
            <span className="text-[#F68E05]">{content.headingAccent}</span>
          </h2>

          <span
            className="mx-auto mt-4 block h-px w-10 bg-[#F68E05]"
            aria-hidden
          />

          <p className="mx-auto mt-4 max-w-xl text-[0.875rem] leading-relaxed text-[#0c1524]/62 sm:text-sm">
            {content.description}
          </p>
        </header>

        <div className="relative mx-auto mt-8 max-w-6xl sm:mt-10">
          {canScroll && (
            <>
              <CarouselButton
                direction="prev"
                onClick={prev}
                className="-left-1 sm:-left-3 lg:-left-5"
              />
              <CarouselButton
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
                  slidesPerView={slidesPerView}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-9 flex justify-center sm:mt-10">
          <Button
            size="lg"
            className="group h-12 rounded-full border-transparent bg-[#F68E05] px-8 text-[0.9375rem] font-medium text-white shadow-[0_8px_24px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] hover:shadow-[0_12px_28px_-10px_rgba(246,142,5,0.5)] sm:h-[3.25rem] sm:px-10"
            asChild
          >
            <Link to={content.viewAll.href}>
              {content.viewAll.label}
              <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function NewsCard({
  article,
  slidesPerView,
}: {
  article: NewsArticlePreview;
  slidesPerView: number;
}) {
  const href = `/news/${article.slug}`;
  const date = formatNewsDateParts(article.publishedAt);
  const gapCount = Math.max(slidesPerView - 1, 0);
  const slideWidth =
    slidesPerView === 1
      ? "100%"
      : `calc((100% - ${gapCount * 1.5}rem) / ${slidesPerView})`;

  return (
    <article
      data-news-slide
      className="group flex h-full shrink-0 flex-col overflow-hidden rounded-xl border border-[#0c1524]/8 bg-white transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-16px_rgba(12,21,36,0.16)]"
      style={{ width: slideWidth, flexBasis: slideWidth }}
    >
      <Link to={href} className="relative block overflow-hidden rounded-t-xl">
        <div className="aspect-[4/3] overflow-hidden bg-[#f4f3f2] sm:aspect-[16/11]">
          <img
            src={article.image.src}
            alt={article.image.alt}
            className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
        <DateBadge day={date.day} month={date.month} />
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <h3 className="text-[0.9375rem] font-bold leading-snug text-[#0c1524] sm:text-base">
          <Link
            to={href}
            className="line-clamp-2 transition-colors duration-200 hover:text-[#F68E05]"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 flex-1 text-[0.8125rem] leading-relaxed text-[#0c1524]/58 sm:text-sm">
          {article.excerpt}
        </p>

        <Link
          to={href}
          className="group/link mt-5 inline-flex items-center gap-2 text-[0.875rem] font-medium text-[#F68E05] transition-colors duration-200 hover:text-[#E07F04]"
        >
          Read More
          <span
            className="inline-block transition-transform duration-300 ease-out group-hover/link:translate-x-1"
            aria-hidden
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

function DateBadge({ day, month }: { day: string; month: string }) {
  return (
    <div className="absolute left-4 top-4 flex min-w-[2.6rem] flex-col items-center rounded-md bg-[#F68E05] px-2 py-1.5 text-white shadow-[0_4px_14px_-6px_rgba(246,142,5,0.7)]">
      <span className="text-sm font-bold leading-none">{day}</span>
      <span className="mt-0.5 text-[0.625rem] font-semibold uppercase leading-none">
        {month}
      </span>
    </div>
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

function formatNewsDateParts(isoDate: string) {
  const date = new Date(isoDate);
  return {
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    month: date.toLocaleDateString("en-US", { month: "short" }),
  };
}
