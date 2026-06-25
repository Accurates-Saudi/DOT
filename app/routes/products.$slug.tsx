import { redirect } from "react-router";

import type { Route } from "./+types/products.$slug";
import { ProductDetailPage } from "@/pages/ProductDetailPage";
import { getLocalizedProductBySlug } from "@/i18n/content";
import { createPageMeta } from "@/i18n/meta";
import { defaultLocale, isValidLocale, loadMessages } from "@/i18n";
import { getLocaleRouteData } from "@/i18n/route-data";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale ?? defaultLocale;

  if (!isValidLocale(locale)) {
    throw redirect(`/${defaultLocale}/products/${params.slug}`);
  }

  const messages = await loadMessages(locale);
  const product = getLocalizedProductBySlug(messages, locale, params.slug);

  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }

  return { product, locale };
}

export function meta({ loaderData, matches }: Route.MetaArgs) {
  const product = loaderData?.product;
  const localeData = getLocaleRouteData(matches);

  if (!product || !localeData) {
    return [{ title: "Product Not Found" }];
  }

  return createPageMeta({
    title: product.meta.title,
    description: product.meta.description,
    pathname: `/${localeData.locale}/products/${product.slug}`,
    locale: localeData.locale,
    ogImage: product.hero.image.src,
  });
}

export default function ProductDetail() {
  return <ProductDetailPage />;
}
