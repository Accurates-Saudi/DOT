import { ArrowRight } from "lucide-react";
import { useCallback, useState, type CSSProperties } from "react";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { NewsArticlePreview, NewsGridContent } from "@/types";
import { cn } from "@/lib/utils";

import { NewsCard } from "./NewsCard";
import { NewsCarousel } from "./NewsCarousel";

const CAROUSEL_FADE_MS = 550;
const STAGGER_MS = 75;

export interface NewsGridSectionProps {
  content: NewsGridContent;
  articles: NewsArticlePreview[];
}

export function NewsGridSection({ content, articles }: NewsGridSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [showCarousel, setShowCarousel] = useState(true);

  const handleViewMore = useCallback(() => {
    setExpanded(true);

    if (prefersReducedMotion) {
      setShowCarousel(false);
      return;
    }

    window.setTimeout(() => setShowCarousel(false), CAROUSEL_FADE_MS);
  }, [prefersReducedMotion]);

  return (
    <Section
      id="news-grid"
      padding="lg"
      aria-label="News articles"
      className="overflow-hidden bg-white"
    >
      <Container size="wide">
        <div className="mb-10 flex items-center gap-3 sm:mb-12">
          <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
          <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
            {content.label}
          </p>
        </div>

        <div className="relative">
          {expanded && (
            <ul
              className="grid list-none grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12"
              aria-live="polite"
            >
              {articles.map((article, index) => (
                <li
                  key={article.id}
                  className={cn(
                    !prefersReducedMotion && "news-grid-item-enter",
                  )}
                  style={
                    !prefersReducedMotion
                      ? ({
                          "--news-stagger": `${index * STAGGER_MS}ms`,
                        } as CSSProperties)
                      : undefined
                  }
                >
                  <NewsCard
                    article={article}
                    readMoreLabel={content.readMoreLabel}
                  />
                </li>
              ))}
            </ul>
          )}

          {showCarousel && (
            <div
              className={cn(
                "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none",
                expanded
                  ? "pointer-events-none absolute inset-x-0 top-0 z-10 opacity-0 motion-reduce:opacity-0"
                  : "relative opacity-100",
                expanded &&
                  !prefersReducedMotion &&
                  "-translate-y-2 scale-[0.985] motion-reduce:translate-y-0 motion-reduce:scale-100",
              )}
            >
              <NewsCarousel
                articles={articles}
                readMoreLabel={content.readMoreLabel}
              />

              <div
                className={cn(
                  "mt-9 flex justify-center transition-[opacity,transform] duration-[400ms] ease-out sm:mt-10 motion-reduce:transition-none",
                  expanded && "opacity-0 motion-reduce:opacity-0",
                  expanded &&
                    !prefersReducedMotion &&
                    "translate-y-2 motion-reduce:translate-y-0",
                )}
              >
                <Button
                  type="button"
                  size="lg"
                  onClick={handleViewMore}
                  disabled={expanded}
                  aria-expanded={expanded}
                  className="group h-12 rounded-full border-transparent bg-[#F68E05] px-8 text-[0.9375rem] font-medium text-white shadow-[0_8px_24px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] hover:shadow-[0_12px_28px_-10px_rgba(246,142,5,0.5)] disabled:pointer-events-none sm:h-[3.25rem] sm:px-10"
                >
                  {content.viewMoreLabel}
                  <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
