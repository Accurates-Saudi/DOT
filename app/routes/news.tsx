import type { Route } from "./+types/news";
import { NewsPage } from "@/pages";
import { buildNewsContent } from "@/i18n/content";
import { createPageMeta } from "@/i18n/meta";
import { getLocaleRouteData } from "@/i18n/route-data";

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
