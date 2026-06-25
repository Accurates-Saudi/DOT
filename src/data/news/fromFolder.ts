import type { ImageAsset, NewsArticleDetail } from "@/types";

import { parseArticleContent } from "@/lib/news/parseArticleContent";

export interface NewsArticleFolderInput {
  id: string;
  slug: string;
  category: string;
  contentRaw: string;
  cover: ImageAsset;
  gallery?: ImageAsset[];
}

export function createNewsArticleFromFolder(
  input: NewsArticleFolderInput,
): NewsArticleDetail {
  const { title, publishedAt, content, excerpt } = parseArticleContent(
    input.contentRaw,
  );

  return {
    id: input.id,
    slug: input.slug,
    title,
    excerpt,
    category: input.category,
    publishedAt,
    image: input.cover,
    content,
    ...(input.gallery && input.gallery.length > 0
      ? { gallery: input.gallery }
      : {}),
    meta: {
      title,
      description: excerpt,
    },
  };
}
