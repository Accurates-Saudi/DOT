import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Container, Section } from "@/components/shared";
import { Button } from "@/components/ui";
import type { NewsArticlePreview, NewsGridContent } from "@/types";

import { NewsCard } from "./NewsCard";
import { NewsCarousel } from "./NewsCarousel";

export interface NewsGridSectionProps {
  content: NewsGridContent;
  articles: NewsArticlePreview[];
}

export function NewsGridSection({ content, articles }: NewsGridSectionProps) {
  const [showAll, setShowAll] = useState(false);

  return (
    <Section
      id="news-grid"
      padding="lg"
      aria-label="News articles"
      className="overflow-hidden bg-white"
    >
      <Container size={showAll ? "default" : "wide"}>
        <div className="mb-10 flex items-center gap-3 sm:mb-12">
          <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
          <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
            {content.label}
          </p>
        </div>

        {showAll ? (
          <ul className="grid list-none grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {articles.map((article) => (
              <li key={article.id}>
                <NewsCard
                  article={article}
                  readMoreLabel={content.readMoreLabel}
                />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <NewsCarousel
              articles={articles}
              readMoreLabel={content.readMoreLabel}
            />

            <div className="mt-9 flex justify-center sm:mt-10">
              <Button
                type="button"
                size="lg"
                onClick={() => setShowAll(true)}
                className="group h-12 rounded-full border-transparent bg-[#F68E05] px-8 text-[0.9375rem] font-medium text-white shadow-[0_8px_24px_-10px_rgba(246,142,5,0.45)] transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-px hover:bg-[#E07F04] hover:shadow-[0_12px_28px_-10px_rgba(246,142,5,0.5)] sm:h-[3.25rem] sm:px-10"
              >
                {content.viewMoreLabel}
                <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
              </Button>
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}
