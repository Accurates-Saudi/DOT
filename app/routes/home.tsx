import { useLoaderData } from "react-router";

import { toProductItem } from "@/data/products/factory";
import type { Route } from "./+types/home";
import { HomePage } from "@/pages";
import { buildHomeContent } from "@/i18n/content";
import { toNewsArticlePreview } from "@/i18n/content/news";
import { createPageMeta } from "@/i18n/meta";
import { defaultLocale, isValidLocale, type Locale } from "@/i18n";
import { getLocaleRouteData } from "@/i18n/route-data";
import { buildOrganizationJsonLd } from "@/lib/seo/json-ld";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = isValidLocale(params.locale ?? defaultLocale)
    ? (params.locale as Locale)
    : defaultLocale;
  const { getPublishedCertificates, getPublishedNewsArticles, getPublishedProductDetails } =
    await import("@/server/cms/content/entity-content.server");
  const [certificateItems, newsArticles, featuredProductItems] = await Promise.all([
    getPublishedCertificates(locale),
    getPublishedNewsArticles(locale),
    getPublishedProductDetails(locale),
  ]);

  return {
    certificateItems,
    newsArticles: newsArticles.map(toNewsArticlePreview).slice(0, 3),
    featuredProductItems: featuredProductItems.map(toProductItem).slice(0, 8),
  };
}

export function meta({ matches }: Route.MetaArgs) {
  const localeData = getLocaleRouteData(matches);
  if (!localeData) return [];

  const content = buildHomeContent(localeData.messages, localeData.locale);

  return [
    ...createPageMeta({
      title: content.meta.title,
      description: content.meta.description,
      pathname: `/${localeData.locale}`,
      locale: localeData.locale,
    }),
    { "script:ld+json": buildOrganizationJsonLd() },
  ];
}

export default function Home() {
  const data = useLoaderData<typeof loader>();
  return (
    <HomePage
      certificateItems={data.certificateItems}
      newsArticles={data.newsArticles}
      featuredProductItems={data.featuredProductItems}
    />
  );
}
