import type { Route } from "./+types/home";
import { HomePage } from "@/pages";
import { buildHomeContent } from "@/i18n/content";
import { createPageMeta } from "@/i18n/meta";
import { getLocaleRouteData } from "@/i18n/route-data";

export function meta({ matches }: Route.MetaArgs) {
  const localeData = getLocaleRouteData(matches);
  if (!localeData) return [];

  const content = buildHomeContent(localeData.messages, localeData.locale);

  return createPageMeta({
    title: content.meta.title,
    description: content.meta.description,
    pathname: `/${localeData.locale}`,
    locale: localeData.locale,
  });
}

export default function Home() {
  return <HomePage />;
}
