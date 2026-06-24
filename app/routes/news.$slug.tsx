import type { Route } from "./+types/news.$slug";
import { NewsDetailPage } from "@/pages/NewsDetailPage";
import { getNewsBySlug } from "@/lib/news";
import { seoDefaults } from "@/data/site";

export function loader({ params }: Route.LoaderArgs) {
  const article = getNewsBySlug(params.slug);

  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }

  return { article };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const article = loaderData?.article;

  if (!article) {
    return [{ title: "News Not Found" }];
  }

  return [
    {
      title: seoDefaults.titleTemplate.replace("%s", article.meta.title),
    },
    { name: "description", content: article.meta.description },
  ];
}

export default function NewsDetail() {
  return <NewsDetailPage />;
}
