import { useLoaderData } from "react-router";

import {
  NewsContactCtaSection,
  NewsDetailView,
  RelatedNewsSection,
} from "@/components/news";
import { useNewsPageContent } from "@/i18n/content/hooks";
import type { NewsArticleDetail, NewsArticlePreview } from "@/types";

interface NewsDetailLoaderData {
  article: NewsArticleDetail;
  relatedArticles: NewsArticlePreview[];
}

export function NewsDetailPage() {
  const { article, relatedArticles } = useLoaderData() as NewsDetailLoaderData;
  const newsPageContent = useNewsPageContent();

  return (
    <>
      <NewsDetailView article={article} />
      <RelatedNewsSection articles={relatedArticles} />
      <NewsContactCtaSection content={newsPageContent.detailCta} />
    </>
  );
}
