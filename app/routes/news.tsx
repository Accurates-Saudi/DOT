import type { Route } from "./+types/news";
import { NewsPage } from "@/pages";
import { newsPageMeta } from "@/data/pages";
import { seoDefaults } from "@/data/site";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: seoDefaults.titleTemplate.replace("%s", newsPageMeta.title),
    },
    { name: "description", content: newsPageMeta.description },
  ];
}

export default function News() {
  return <NewsPage />;
}
