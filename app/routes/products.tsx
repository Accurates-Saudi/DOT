import type { Route } from "./+types/products";
import { ProductsPage } from "@/pages";
import { buildProductsContent } from "@/i18n/content";
import { createPageMeta } from "@/i18n/meta";
import { defaultLocale, isValidLocale, loadMessages, type Locale } from "@/i18n";
import { getLocaleRouteData } from "@/i18n/route-data";
import { toProductItem } from "@/data/products/factory";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = isValidLocale(params.locale ?? defaultLocale)
    ? (params.locale as Locale)
    : defaultLocale;
  const messages = await loadMessages(locale);
  const pageContent = buildProductsContent(messages, locale);
  const { getPublishedProductDetails } = await import(
    "@/server/cms/content/entity-content.server"
  );
  const products = await getPublishedProductDetails(locale);

  return {
    pageContent: {
      ...pageContent,
      listing: {
        ...pageContent.listing,
        items: products.map(toProductItem),
      },
    },
  };
}

export function meta({ matches }: Route.MetaArgs) {
  const localeData = getLocaleRouteData(matches);
  if (!localeData) return [];

  const content = buildProductsContent(localeData.messages, localeData.locale);

  return createPageMeta({
    title: content.meta.title,
    description: content.meta.description,
    pathname: `/${localeData.locale}/products`,
    locale: localeData.locale,
  });
}

export default function Products() {
  return <ProductsPage />;
}
