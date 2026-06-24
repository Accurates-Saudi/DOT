import { Container, Section } from "@/components/shared";
import type { NewsArticlePreview, NewsFeaturedContent } from "@/types";

import { NewsCard } from "./NewsCard";

export interface FeaturedNewsProps {
  article: NewsArticlePreview;
  content: NewsFeaturedContent;
}

export function FeaturedNews({ article, content }: FeaturedNewsProps) {
  return (
    <Section
      id="featured-news"
      padding="lg"
      aria-label="Featured news article"
      className="border-b border-[#0c1524]/6 bg-white"
    >
      <Container size="wide">
        <div className="mb-10 flex items-center gap-3 sm:mb-12">
          <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
          <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
            {content.label}
          </p>
        </div>

        <ul className="grid list-none grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <li>
            <NewsCard
              article={article}
              readMoreLabel={content.readMoreLabel}
            />
          </li>
        </ul>
      </Container>
    </Section>
  );
}
