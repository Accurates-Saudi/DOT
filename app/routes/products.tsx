import type { Route } from "./+types/products";
import { ProductsPage } from "@/pages";
import { buildProductsContent } from "@/i18n/content";
import { createPageMeta } from "@/i18n/meta";
import { getLocaleRouteData } from "@/i18n/route-data";

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
