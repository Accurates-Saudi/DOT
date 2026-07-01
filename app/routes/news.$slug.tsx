import { redirect } from "react-router";

import type { Route } from "./+types/news.$slug";
import { NewsDetailPage } from "@/pages/NewsDetailPage";
import { getLocalizedNewsBySlug } from "@/i18n/content";
import { createPageMeta } from "@/i18n/meta";
import { defaultLocale, isValidLocale, loadMessages } from "@/i18n";
import { getLocaleRouteData } from "@/i18n/route-data";
import { isPlaceholderNewsSlug } from "@/data/news/placeholders";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale ?? defaultLocale;

  if (!isValidLocale(locale)) {
    throw redirect(`/${defaultLocale}/news/${params.slug}`);
  }

  const messages = await loadMessages(locale);
  const article = getLocalizedNewsBySlug(messages, params.slug);

  if (!article) {
    throw new Response("Not Found", { status: 404 });
  }

  return { article, locale };
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
