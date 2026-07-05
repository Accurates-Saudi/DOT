import type { Route } from "./+types/careers";
import { CareersPage } from "@/pages";
import { buildCareersContent } from "@/i18n/content";
import { createPageMeta } from "@/i18n/meta";
import { defaultLocale, isValidLocale, type Locale } from "@/i18n";
import { getLocaleRouteData } from "@/i18n/route-data";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = isValidLocale(params.locale ?? defaultLocale)
    ? (params.locale as Locale)
    : defaultLocale;
  const { getPublishedCareerJobs } = await import(
    "@/server/cms/content/entity-content.server"
  );
  const jobs = await getPublishedCareerJobs(locale);

  return { jobs };
}

export function meta({ matches }: Route.MetaArgs) {
  const localeData = getLocaleRouteData(matches);
  if (!localeData) return [];

  const content = buildCareersContent(localeData.messages, localeData.locale);

  return createPageMeta({
    title: content.meta.title,
    description: content.meta.description,
    pathname: `/${localeData.locale}/careers`,
    locale: localeData.locale,
  });
}

export default function Careers() {
  return <CareersPage />;
}
