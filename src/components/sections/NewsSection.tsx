import { ArrowRight, Calendar, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { useMemo, type FormEvent } from "react";
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

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Section
      id="news"
      padding="none"
      variant="default"
      aria-label="Latest news"
      className="overflow-hidden bg-white py-10 sm:py-12 lg:py-14"
    >
      <Container size="wide">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-10">
          <div className="max-w-lg">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-7 bg-[#F68E05]" aria-hidden />
              <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-[#0c1524]/55 uppercase sm:text-xs">
                {content.label}
              </p>
            </div>

            <h2 className="mt-4 text-[1.85rem] font-bold leading-[1.1] tracking-tight text-[#0c1524] sm:text-[2rem] lg:text-[2.1rem]">
              {content.heading}{" "}
              <span className="text-[#F68E05]">{content.headingAccent}</span>
            </h2>

            <p className="mt-4 text-[0.875rem] leading-relaxed text-[#0c1524]/65 sm:text-sm">
              {content.description}
            </p>

            <Link
              to={content.viewAll.href}
              className="group mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold tracking-[0.12em] text-[#F68E05] uppercase transition-colors duration-200 hover:text-[#E07F04]"
            >
              {content.viewAll.label}
              <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </Link>
          </div>

          {content.headerImage && (
            <div className="relative hidden overflow-hidden lg:block">
              <div className="aspect-[16/9] xl:aspect-[5/3]">
                <img
                  src={content.headerImage.src}
                  alt={content.headerImage.alt}
                  className="size-full object-cover object-center lg:object-right"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white to-transparent"
                aria-hidden
              />
            </div>
          )}
        </div>

        <div className="relative mt-8 sm:mt-10">
          {canScroll && (
            <>
              <CarouselButton
                direction="prev"
                onClick={prev}
                className="left-0 -translate-x-1/2"
              />
              <CarouselButton
                direction="next"
                onClick={next}
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
          >
            <div
              data-news-track
              className="flex gap-4 sm:gap-5"
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

        <div className="mt-8 flex justify-center sm:mt-9">
          <Button
            className="group h-11 rounded-full border-transparent bg-[#F68E05] px-7 text-[0.875rem] font-medium text-white shadow-[0_8px_24px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] hover:shadow-[0_12px_28px_-10px_rgba(246,142,5,0.5)] sm:h-12 sm:px-8"
            asChild
          >
            <Link to={content.viewAll.href}>
              {content.viewAll.label}
              <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 bg-[#f3f2f1] px-5 py-5 sm:mt-10 sm:px-6 sm:py-5 lg:px-8">
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-5"
          >
            <div className="flex shrink-0 items-start gap-4 lg:items-center lg:gap-5">
              <div className="flex size-11 shrink-0 items-center justify-center bg-[#F68E05] text-white sm:size-12">
                <Mail className="size-5" aria-hidden />
              </div>
              <div className="min-w-0 lg:max-w-[14rem]">
                <p className="text-sm font-bold text-[#0c1524]">
                  {content.newsletter.heading}
                </p>
                <p className="mt-1 text-[0.8125rem] leading-relaxed text-[#0c1524]/60">
                  {content.newsletter.description}
                </p>
              </div>
            </div>

            <input
              type="email"
              name="email"
              required
              placeholder={content.newsletter.placeholder}
              className="h-11 min-w-0 flex-1 border border-[#0c1524]/10 bg-white px-4 text-sm text-[#0c1524] outline-none transition-[border-color] duration-200 placeholder:text-[#0c1524]/40 focus:border-[#F68E05]/45"
            />

            <Button
              type="submit"
              className="group h-11 w-full shrink-0 justify-between rounded-sm border-transparent bg-[#F68E05] px-5 text-[0.8125rem] font-semibold tracking-wide text-white uppercase transition-[background-color] duration-200 hover:bg-[#E07F04] sm:h-12 lg:w-auto lg:min-w-[10.5rem]"
            >
              {content.newsletter.buttonLabel}
              <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </Button>
          </form>
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
  const date = formatNewsDate(article.publishedAt);
  const gapCount = Math.max(slidesPerView - 1, 0);
  const slideWidth =
    slidesPerView === 1
      ? "100%"
      : `calc((100% - ${gapCount * 1.25}rem) / ${slidesPerView})`;

  return (
    <article
      data-news-slide
      className="group flex h-full shrink-0 flex-col overflow-hidden rounded-lg border border-[#0c1524]/5 bg-white shadow-[0_2px_12px_-6px_rgba(12,21,36,0.12)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-12px_rgba(12,21,36,0.18)]"
      style={{ width: slideWidth, flexBasis: slideWidth }}
    >
      <Link to={href} className="block overflow-hidden rounded-t-lg">
        <div className="aspect-[16/11] overflow-hidden bg-[#f4f3f2]">
          <img
            src={article.image.src}
            alt={article.image.alt}
            className="size-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-4 pb-5 pt-4 sm:px-5">
        <div className="flex items-center gap-1.5 text-[0.75rem] text-[#0c1524]/52">
          <Calendar className="size-3.5 shrink-0 text-[#F68E05]" aria-hidden />
          <time dateTime={article.publishedAt}>{date}</time>
        </div>

        <h3 className="mt-3 min-h-[2.75rem] text-[0.9375rem] font-bold leading-snug text-[#0c1524] sm:min-h-[3rem] sm:text-base">
          <Link
            to={href}
            className="line-clamp-2 transition-colors duration-200 hover:text-[#F68E05]"
          >
            {article.title}
          </Link>
        </h3>

        <p className="mt-2.5 line-clamp-3 flex-1 text-[0.8125rem] leading-relaxed text-[#0c1524]/58">
          {article.excerpt}
        </p>

        <Link
          to={href}
          className="group/link mt-4 inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-[0.1em] text-[#F68E05] uppercase transition-colors duration-200 hover:text-[#E07F04]"
        >
          Read More
          <ArrowRight className="size-3.5 transition-transform duration-300 ease-out group-hover/link:translate-x-0.5" />
        </Link>
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

  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous news" : "Next news"}
      onClick={onClick}
      className={cn(
        "absolute top-[38%] z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#0c1524]/6 bg-white text-[#F68E05] shadow-[0_6px_20px_-10px_rgba(12,21,36,0.28)] transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[0_8px_24px_-10px_rgba(12,21,36,0.32)] active:scale-95 sm:size-10",
        className,
      )}
    >
      <Icon className="size-4 stroke-[2.25]" />
    </button>
  );
}

function formatNewsDate(isoDate: string) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
