import type { Route } from "./+types/about";
import { AboutPage } from "@/pages";
import { buildAboutContent } from "@/i18n/content";
import { createPageMeta } from "@/i18n/meta";
import { getLocaleRouteData } from "@/i18n/route-data";

export function meta({ matches }: Route.MetaArgs) {
  const localeData = getLocaleRouteData(matches);
  if (!localeData) return [];

  const content = buildAboutContent(localeData.messages, localeData.locale);

  return createPageMeta({
    title: content.meta.title,
    description: content.meta.description,
    pathname: `/${localeData.locale}/about`,
    locale: localeData.locale,
  });
}

export default function About() {
  return <AboutPage />;
}
