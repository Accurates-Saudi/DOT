import { Container, Section } from "@/components/shared";
import type { NewsArticlePreview } from "@/types";

import { NewsCard } from "./NewsCard";

export interface RelatedNewsSectionProps {
  articles: NewsArticlePreview[];
  heading?: string;
  readMoreLabel?: string;
}

export function RelatedNewsSection({
  articles,
  heading = "Related News",
  readMoreLabel = "Read More",
}: RelatedNewsSectionProps) {
  if (articles.length === 0) return null;

  return (
    <Section
      id="related-news"
      variant="muted"
      padding="md"
      aria-label="Related news"
      className="border-t border-border"
    >
      <Container size="wide">
        <div className="mb-6 flex items-center gap-3 sm:mb-8">
          <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
          <h2 className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
            {heading}
          </h2>
        </div>

        <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {articles.map((article) => (
            <li key={article.id}>
              <NewsCard article={article} readMoreLabel={readMoreLabel} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
