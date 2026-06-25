import type { Route } from "./+types/catalogs";
import { CatalogsPage } from "@/pages";
import { buildCatalogsContent } from "@/i18n/content";
import { createPageMeta } from "@/i18n/meta";
import { getLocaleRouteData } from "@/i18n/route-data";

export function meta({ matches }: Route.MetaArgs) {
  const localeData = getLocaleRouteData(matches);
  if (!localeData) return [];

  const content = buildCatalogsContent(localeData.messages, localeData.locale);

  return createPageMeta({
    title: content.meta.title,
    description: content.meta.description,
    pathname: `/${localeData.locale}/catalogs`,
    locale: localeData.locale,
  });
}

export default function Catalogs() {
  return <CatalogsPage />;
}
