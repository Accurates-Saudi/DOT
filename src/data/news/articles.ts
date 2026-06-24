import type { NewsArticlePreview } from "@/types";

import newsArticle1 from "@/assets/news/article-1.png";
import newsArticle2 from "@/assets/news/article-2.png";
import newsArticle3 from "@/assets/news/article-3.png";
import newsArticle4 from "@/assets/news/article-4.png";

export const newsArticles: NewsArticlePreview[] = [
  {
    id: "adipec-2025",
    slug: "adipec-2025-exhibition",
    title:
      "Dynamic Oil Tools showcases advanced manufacturing at ADIPEC 2025",
    excerpt:
      "Our team presented precision-engineered oil and gas solutions to industry partners, highlighting DOT's commitment to quality, innovation, and Saudi-made manufacturing excellence.",
    category: "Exhibition",
    publishedAt: "2025-05-28",
    image: {
      src: newsArticle1,
      alt: "DOT team at ADIPEC industry exhibition",
    },
  },
  {
    id: "partnership-aramco",
    slug: "strategic-partnership-announcement",
    title: "DOT strengthens strategic partnerships in the energy sector",
    excerpt:
      "Building on long-term relationships with leading operators and service companies across the region to deliver reliable field-ready solutions.",
    category: "Corporate",
    publishedAt: "2025-05-20",
    image: {
      src: newsArticle2,
      alt: "Corporate partnership signing ceremony",
    },
  },
  {
    id: "facility-expansion",
    slug: "manufacturing-capacity-expansion",
    title: "Manufacturing capacity expansion supports growing demand",
    excerpt:
      "New machining and treatment capabilities enhance our ability to deliver high-performance tools at scale for demanding oil and gas operations.",
    category: "Operations",
    publishedAt: "2025-05-12",
    image: {
      src: newsArticle3,
      alt: "Expanded DOT manufacturing operations",
    },
  },
  {
    id: "product-launch",
    slug: "new-downhole-tool-line",
    title: "New downhole tool line engineered for high-pressure environments",
    excerpt:
      "DOT introduces an expanded portfolio of precision-manufactured downhole tools designed for durability, performance, and field reliability.",
    category: "Product",
    publishedAt: "2025-05-05",
    image: {
      src: newsArticle4,
      alt: "DOT downhole tools product line",
    },
  },
  {
    id: "quality-certification",
    slug: "api-quality-management-renewal",
    title: "DOT renews API quality management certification standards",
    excerpt:
      "Continued certification reflects our disciplined manufacturing processes and commitment to international oil and gas quality benchmarks.",
    category: "Quality",
    publishedAt: "2025-04-22",
    image: {
      src: newsArticle2,
      alt: "API quality certification renewal",
    },
  },
  {
    id: "industry-summit",
    slug: "saudi-energy-summit-2025",
    title: "DOT participates in Saudi Energy Summit 2025",
    excerpt:
      "Industry leaders gathered to discuss manufacturing innovation, localization, and long-term partnerships across the energy value chain.",
    category: "Event",
    publishedAt: "2025-04-10",
    image: {
      src: newsArticle3,
      alt: "Saudi Energy Summit participation",
    },
  },
];
