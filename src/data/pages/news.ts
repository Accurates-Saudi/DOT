import type { NewsPageContent } from "@/types";

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
  },
  featured: {
    readMoreLabel: "Read More",
  },
  grid: {
    label: "Latest News",
    readMoreLabel: "Read More",
    itemsPerPage: 3,
  },
  pagination: {
    previousLabel: "Previous",
    nextLabel: "Next",
    pageLabel: "Page",
  },
};

export const newsPageMeta = newsPageContent.meta;
