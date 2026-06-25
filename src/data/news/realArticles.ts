import { createNewsArticleFromFolder } from "@/data/news/fromFolder";

import tenarisContent from "@/assets/news/article 1/content.txt?raw";
import tenarisCover from "@/assets/news/article 1/15973096881597309435tenaras.webp";
import sabicContent from "@/assets/news/article 2/content.txt?raw";
import sabicCover from "@/assets/news/article 2/15973052941588839913sabic-1.webp";

const tenarisVisit = createNewsArticleFromFolder({
  id: "tenaris-visit",
  slug: "tenaris-visit",
  category: "Corporate",
  contentRaw: tenarisContent,
  cover: {
    src: tenarisCover,
    alt: "Tenaris team visit to Dynamic Oil Tools",
  },
});

const sabicConference = createNewsArticleFromFolder({
  id: "sabic-conference-2020",
  slug: "sabic-conference-2020",
  category: "Event",
  contentRaw: sabicContent,
  cover: {
    src: sabicCover,
    alt: "Dynamic Oil Tools at SABIC Conference 2020",
  },
});

/** Real DOT news articles loaded from src/assets/news/[article folder]/ */
export const realNewsArticles = [tenarisVisit, sabicConference];
