import {
  FeaturedNews,
  NewsGridSection,
  NewsHeroSection,
} from "@/components/news";
import { usePaginationPage } from "@/components/shared";
import { newsPageContent } from "@/data/pages/news";
import {
  getFeaturedNewsArticle,
  getPaginatedNewsArticles,
} from "@/lib/news";

export function NewsPage() {
  const currentPage = usePaginationPage();
  const featuredArticle = getFeaturedNewsArticle();
  const { articles, meta } = getPaginatedNewsArticles(
    currentPage,
    newsPageContent.grid.itemsPerPage,
  );

  return (
    <>
      <NewsHeroSection content={newsPageContent.hero} />
      <FeaturedNews
        article={featuredArticle}
        content={newsPageContent.featured}
      />
      <NewsGridSection
        content={newsPageContent.grid}
        articles={articles}
        pagination={newsPageContent.pagination}
        paginationMeta={meta}
      />
    </>
  );
}
