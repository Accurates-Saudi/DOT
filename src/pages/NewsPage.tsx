import {
  FeaturedNews,
  NewsGridSection,
  NewsHeroSection,
} from "@/components/news";
import {
  useI18n,
} from "@/i18n/hooks";
import {
  useNewsPageContent,
} from "@/i18n/content/hooks";
import {
  getLocalizedFeaturedNews,
  getLocalizedNewsExcludingFeatured,
} from "@/i18n/content";
import { useMemo } from "react";

export function NewsPage() {
  const newsPageContent = useNewsPageContent();
  const { locale, messages } = useI18n();
  const featuredArticle = useMemo(
    () => getLocalizedFeaturedNews(messages, locale),
    [locale, messages],
  );
  const articles = useMemo(
    () => getLocalizedNewsExcludingFeatured(messages, locale),
    [locale, messages],
  );

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
