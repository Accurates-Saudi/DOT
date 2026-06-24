import type { NewsArticleDetail } from "@/types";

import newsArticle1 from "@/assets/news/article-1.png";
import newsArticle2 from "@/assets/news/article-2.png";
import newsArticle3 from "@/assets/news/article-3.png";
import newsArticle4 from "@/assets/news/article-4.png";

export const newsArticleDetails: NewsArticleDetail[] = [
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
    content: [
      "Dynamic Oil Tools participated in ADIPEC 2025, connecting with operators, service companies, and industry partners across the energy sector.",
      "Our booth highlighted precision-manufactured screens, downhole tools, and filtration solutions engineered for demanding field conditions. Visitors reviewed our Saudi-made capabilities and discussed project requirements with our technical team.",
      "The exhibition reinforced DOT's focus on quality manufacturing, reliable delivery, and long-term partnerships across the region.",
    ],
    gallery: [
      {
        src: newsArticle2,
        alt: "DOT exhibition stand at ADIPEC",
      },
      {
        src: newsArticle3,
        alt: "Technical discussion with industry partners",
      },
    ],
    meta: {
      title: "ADIPEC 2025 Exhibition",
      description:
        "Dynamic Oil Tools showcases advanced manufacturing and oil & gas solutions at ADIPEC 2025.",
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
    content: [
      "Dynamic Oil Tools continues to strengthen strategic partnerships with leading energy sector organizations across Saudi Arabia and the wider region.",
      "These collaborations support reliable supply of engineered oil and gas tools, responsive project delivery, and alignment with operator requirements for quality and performance.",
      "DOT remains committed to building long-term relationships founded on manufacturing discipline, technical capability, and field-ready solutions.",
    ],
    meta: {
      title: "Strategic Partnership Announcement",
      description:
        "DOT strengthens strategic partnerships in the energy sector to deliver reliable field-ready solutions.",
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
    content: [
      "Dynamic Oil Tools has expanded manufacturing capacity at its Saudi facility to meet growing demand for precision-engineered oil and gas products.",
      "New machining and treatment capabilities improve throughput for screens, downhole assemblies, and industrial filtration components while maintaining strict quality controls.",
      "The expansion supports faster project delivery and continued investment in Saudi industrial manufacturing excellence.",
    ],
    gallery: [
      {
        src: newsArticle4,
        alt: "CNC machining operations at DOT facility",
      },
      {
        src: newsArticle1,
        alt: "Manufacturing floor overview",
      },
      {
        src: newsArticle2,
        alt: "Quality inspection during production",
      },
    ],
    meta: {
      title: "Manufacturing Capacity Expansion",
      description:
        "DOT expands manufacturing capacity to support growing demand for high-performance oil and gas tools.",
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
    content: [
      "Dynamic Oil Tools has introduced an expanded downhole tool line designed for high-pressure, high-temperature well environments.",
      "The portfolio includes precision-manufactured components engineered for durability, consistent performance, and compatibility with demanding completion programs.",
      "Product development reflects DOT's focus on field reliability, quality materials, and manufacturing processes aligned with international oil and gas standards.",
    ],
    meta: {
      title: "New Downhole Tool Line",
      description:
        "DOT introduces a new downhole tool line engineered for high-pressure oil and gas environments.",
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
    content: [
      "Dynamic Oil Tools has renewed its API quality management certification, confirming continued alignment with international oil and gas industry standards.",
      "The certification reflects disciplined manufacturing processes, documented quality systems, and ongoing commitment to product consistency across our operations.",
      "DOT maintains rigorous inspection and process controls to support operator confidence and long-term field performance.",
    ],
    meta: {
      title: "API Quality Certification Renewal",
      description:
        "DOT renews API quality management certification standards across its manufacturing operations.",
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
    content: [
      "Dynamic Oil Tools participated in Saudi Energy Summit 2025, joining industry leaders to discuss manufacturing innovation and energy sector development.",
      "Discussions focused on localization, industrial capability, and partnerships that support reliable supply across the energy value chain.",
      "DOT's participation reflects its commitment to Saudi industrial growth and collaboration with operators and service partners.",
    ],
    gallery: [
      {
        src: newsArticle1,
        alt: "DOT representatives at Saudi Energy Summit",
      },
    ],
    meta: {
      title: "Saudi Energy Summit 2025",
      description:
        "DOT participates in Saudi Energy Summit 2025 to discuss manufacturing innovation and industry partnerships.",
    },
  },
];

export const newsDetailsBySlug = Object.fromEntries(
  newsArticleDetails.map((article) => [article.slug, article]),
) as Record<string, NewsArticleDetail>;
