import { useLoaderData } from "react-router";

import {
  NewsContactCtaSection,
  NewsDetailView,
  RelatedNewsSection,
} from "@/components/news";
import { newsDetailCta } from "@/data/pages/news";
import { getRelatedNews } from "@/lib/news";
import type { NewsArticleDetail } from "@/types";

interface NewsDetailLoaderData {
  article: NewsArticleDetail;
}

export function NewsDetailPage() {
  const { article } = useLoaderData() as NewsDetailLoaderData;
  const relatedArticles = getRelatedNews(article.slug);

  return (
    <>
      <NewsDetailView article={article} />
      <RelatedNewsSection articles={relatedArticles} />
      <NewsContactCtaSection content={newsDetailCta} />
    </>
  );
}
