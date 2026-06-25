import type { Route } from "./+types/services";
import { ServicesPage } from "@/pages/ServicesPage";
import { buildServicesMeta } from "@/i18n/content";
import { createPageMeta } from "@/i18n/meta";
import { getLocaleRouteData } from "@/i18n/route-data";

export function meta({ matches }: Route.MetaArgs) {
  const localeData = getLocaleRouteData(matches);
  if (!localeData) return [];

  const pageMeta = buildServicesMeta(localeData.messages);

  return createPageMeta({
    title: pageMeta.title,
    description: pageMeta.description,
    pathname: `/${localeData.locale}/services`,
    locale: localeData.locale,
  });
}

export default function Services() {
  return <ServicesPage />;
}
