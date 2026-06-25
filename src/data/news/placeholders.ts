import type { NewsArticleDetail } from "@/types";

import placeholderCoverOne from "@/assets/news/article-3.png";
import placeholderCoverTwo from "@/assets/news/article-4.png";

/**
 * PLACEHOLDER ARTICLES — replace when real content folders are available.
 *
 * To add a real article:
 * 1. Create a folder under src/assets/news/ with content.txt, cover image, and optional gallery images.
 * 2. Register it in src/data/news/realArticles.ts using createNewsArticleFromFolder().
 * 3. Remove the matching placeholder entry below.
 */
export const placeholderNewsArticles: NewsArticleDetail[] = [
  {
    id: "placeholder-manufacturing-expansion",
    slug: "placeholder-manufacturing-capacity-expansion",
    title: "[Placeholder] Manufacturing capacity expansion supports growing demand",
    excerpt:
      "Placeholder company update — replace with a real news folder when content is available.",
    category: "Operations",
    publishedAt: "2022-03-15",
    image: {
      src: placeholderCoverOne,
      alt: "Placeholder news cover image",
    },
    content: [
      "This is a placeholder news article used to maintain layout on the News page until additional DOT company updates are published.",
      "Replace this entry by adding a new article folder under src/assets/news/ and registering it in src/data/news/realArticles.ts.",
    ],
    meta: {
      title: "[Placeholder] Manufacturing Capacity Expansion",
      description:
        "Placeholder company update — replace when real DOT news content is available.",
    },
  },
  {
    id: "placeholder-product-launch",
    slug: "placeholder-new-downhole-tool-line",
    title: "[Placeholder] New downhole tool line engineered for high-pressure environments",
    excerpt:
      "Placeholder product announcement — replace with a real news folder when content is available.",
    category: "Product",
    publishedAt: "2022-02-10",
    image: {
      src: placeholderCoverTwo,
      alt: "Placeholder news cover image",
    },
    content: [
      "This is a placeholder news article used to maintain layout on the News page until additional DOT company updates are published.",
      "Replace this entry by adding a new article folder under src/assets/news/ and registering it in src/data/news/realArticles.ts.",
    ],
    meta: {
      title: "[Placeholder] New Downhole Tool Line",
      description:
        "Placeholder product announcement — replace when real DOT news content is available.",
    },
  },
];
