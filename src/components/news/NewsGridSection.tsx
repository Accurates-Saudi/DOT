import { Container, Pagination, Section } from "@/components/shared";
import type {
  NewsArticlePreview,
  NewsGridContent,
  NewsPaginationContent,
  PaginationMeta,
} from "@/types";

import { NewsCard } from "./NewsCard";

export interface NewsGridSectionProps {
  content: NewsGridContent;
  articles: NewsArticlePreview[];
  pagination: NewsPaginationContent;
  paginationMeta: PaginationMeta;
}

export function NewsGridSection({
  content,
  articles,
  pagination,
  paginationMeta,
}: NewsGridSectionProps) {
  return (
    <Section
      id="news-grid"
      padding="lg"
      aria-label="News articles"
      className="bg-white"
    >
      <Container>
        <div className="mb-10 flex items-center gap-3 sm:mb-12">
          <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
          <p className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
            {content.label}
          </p>
        </div>

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

        <Pagination
          className="mt-12 sm:mt-14"
          currentPage={paginationMeta.currentPage}
          totalPages={paginationMeta.totalPages}
          basePath="/news"
          previousLabel={pagination.previousLabel}
          nextLabel={pagination.nextLabel}
          pageLabel={pagination.pageLabel}
        />
      </Container>
    </Section>
  );
}
