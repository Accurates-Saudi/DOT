import { useLoaderData } from "react-router";
import { useMemo } from "react";

import {
  NewsContactCtaSection,
  NewsDetailView,
  RelatedNewsSection,
} from "@/components/news";
import { useI18n } from "@/i18n/hooks";
import { useNewsPageContent } from "@/i18n/content/hooks";
import { getLocalizedRelatedNews } from "@/i18n/content";
import type { NewsArticleDetail } from "@/types";

interface NewsDetailLoaderData {
  article: NewsArticleDetail;
}

export function NewsDetailPage() {
  const { article } = useLoaderData() as NewsDetailLoaderData;
  const { locale, messages } = useI18n();
  const newsPageContent = useNewsPageContent();
  const relatedArticles = useMemo(
    () => getLocalizedRelatedNews(messages, locale, article.slug),
    [article.slug, locale, messages],
  );

  return (
    <>
      <NewsDetailView article={article} />
      <RelatedNewsSection articles={relatedArticles} />
      <NewsContactCtaSection content={newsPageContent.detailCta} />
    </>
  );
}
