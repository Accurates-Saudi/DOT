import { redirect } from "react-router";

import type { Route } from "./+types/news.$slug";
import { NewsDetailPage } from "@/pages/NewsDetailPage";
import { createPageMeta } from "@/i18n/meta";
import { defaultLocale, isValidLocale } from "@/i18n";
import { getLocaleRouteData } from "@/i18n/route-data";
import { isPlaceholderNewsSlug } from "@/data/news/placeholders";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale ?? defaultLocale;

  if (!isValidLocale(locale)) {
    throw redirect(`/${defaultLocale}/news/${params.slug}`);
  }

  const { getPublishedNewsBySlug, getPublishedNewsArticles } = await import(
    "@/server/cms/content/entity-content.server"
  );
  const article = await getPublishedNewsBySlug(locale, params.slug);

  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }

  const { toNewsArticlePreview, getRelatedNewsPreviews } = await import(
    "@/i18n/content/news"
  );
  const allPreviews = (await getPublishedNewsArticles(locale)).map(
    toNewsArticlePreview,
  );
  const relatedArticles = getRelatedNewsPreviews(allPreviews, params.slug);

  return { article, relatedArticles, locale };
}

export function meta({ loaderData, matches }: Route.MetaArgs) {
  const article = loaderData?.article;
  const localeData = getLocaleRouteData(matches);

  if (!article || !localeData) {
    return [{ title: "News Not Found" }];
  }

  return createPageMeta({
    title: article.meta.title,
    description: article.meta.description,
    pathname: `/${localeData.locale}/news/${article.slug}`,
    locale: localeData.locale,
    ogImage: article.image.src,
    robots: isPlaceholderNewsSlug(article.slug) ? "noindex, nofollow" : undefined,
  });
}

export default function NewsDetail() {
  return <NewsDetailPage />;
}
