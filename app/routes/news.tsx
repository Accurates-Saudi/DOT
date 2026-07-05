import type { Route } from "./+types/news";
import { NewsPage } from "@/pages";
import { buildNewsContent } from "@/i18n/content";
import { toNewsArticlePreview } from "@/i18n/content/news";
import { createPageMeta } from "@/i18n/meta";
import { defaultLocale, isValidLocale, type Locale } from "@/i18n";
import { getLocaleRouteData } from "@/i18n/route-data";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = isValidLocale(params.locale ?? defaultLocale)
    ? (params.locale as Locale)
    : defaultLocale;
  const { getPublishedNewsArticles } = await import(
    "@/server/cms/content/entity-content.server"
  );
  const articles = (await getPublishedNewsArticles(locale)).map(toNewsArticlePreview);
  const [featuredArticle, ...gridArticles] = articles;

  return { featuredArticle, gridArticles };
}

export function meta({ matches }: Route.MetaArgs) {
  const localeData = getLocaleRouteData(matches);
  if (!localeData) return [];

  const content = buildNewsContent(localeData.messages, localeData.locale);

  return createPageMeta({
    title: content.meta.title,
    description: content.meta.description,
    pathname: `/${localeData.locale}/news`,
    locale: localeData.locale,
  });
}

export default function News() {
  return <NewsPage />;
}
