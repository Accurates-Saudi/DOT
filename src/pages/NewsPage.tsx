import {
  FeaturedNews,
  NewsGridSection,
  NewsHeroSection,
} from "@/components/news";
import { newsPageContent } from "@/data/pages/news";
import {
  getFeaturedNewsArticle,
  getNewsArticlesExcludingFeatured,
} from "@/lib/news";

export function NewsPage() {
  const featuredArticle = getFeaturedNewsArticle();
  const articles = getNewsArticlesExcludingFeatured();

  return (
    <>
      <NewsHeroSection content={newsPageContent.hero} />
      <FeaturedNews
        article={featuredArticle}
        content={newsPageContent.featured}
      />
      <NewsGridSection content={newsPageContent.grid} articles={articles} />
    </>
  );
}
