import type { Route } from "./+types/catalogs";
import { CatalogsPage } from "@/pages";
import { buildCatalogsContent } from "@/i18n/content";
import { createPageMeta } from "@/i18n/meta";
import { defaultLocale, isValidLocale, loadMessages, type Locale } from "@/i18n";
import { getLocaleRouteData } from "@/i18n/route-data";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = isValidLocale(params.locale ?? defaultLocale)
    ? (params.locale as Locale)
    : defaultLocale;
  const messages = await loadMessages(locale);
  const pageContent = buildCatalogsContent(messages, locale);
  const { getPublishedCatalogItems } = await import(
    "@/server/cms/content/entity-content.server"
  );
  const items = await getPublishedCatalogItems(locale);

  return {
    pageContent: {
      ...pageContent,
      library: {
        ...pageContent.library,
        items,
      },
    },
  };
}

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
