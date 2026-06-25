import type { NewsPageContent } from "@/types";

import newsHeader from "@/assets/news/header.png";

export const newsPageContent: NewsPageContent = {
  meta: {
    title: "News",
    description:
      "Company news, exhibitions, project updates, and industry activities from Dynamic Oil Tools.",
  },
  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "News" },
    ],
    label: "News & Updates",
    title: "News & Updates",
    introduction:
      "Stay informed about our latest projects, exhibitions, company updates and engineering developments.",
    backgroundImage: {
      src: newsHeader,
      alt: "Dynamic Oil Tools news and company updates",
    },
  },
  featured: {
    readMoreLabel: "Read More",
  },
  grid: {
    label: "Latest News",
    readMoreLabel: "Read More",
    viewMoreLabel: "View More",
  },
};

export const newsDetailCta = {
  heading: "Need More Information?",
  body: "Contact our team for project inquiries, technical support, and company updates.",
  ctaPrimary: { label: "Contact Our Team", href: "/contact" },
} as const;

export const newsPageMeta = newsPageContent.meta;
