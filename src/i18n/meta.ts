import type { Locale } from "@/i18n/config";
import { siteSettings } from "@/data/site";
import {
  buildCanonicalUrl,
  buildHrefLangLinks,
  buildOpenGraphLocale,
  buildPageTitle,
  toAbsoluteUrl,
} from "@/i18n/seo";

const DEFAULT_OG_IMAGE = "/og-image.png";

export function createPageMeta({
  title,
  description,
  pathname,
  locale,
  ogImage,
  robots = "index, follow",
}: {
  title: string;
  description: string;
  pathname: string;
  locale: Locale;
  ogImage?: string;
  robots?: string;
}) {
  const pageTitle = buildPageTitle(title);
  const canonical = buildCanonicalUrl(pathname, locale);
  const alternates = buildHrefLangLinks(pathname);
  const imageUrl = toAbsoluteUrl(ogImage ?? DEFAULT_OG_IMAGE);

  return [
    { title: pageTitle },
    { name: "description", content: description },
    { name: "robots", content: robots },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: siteSettings.companyName },
    { property: "og:locale", content: buildOpenGraphLocale(locale) },
    { property: "og:url", content: canonical },
    { property: "og:image", content: imageUrl },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { tagName: "link", rel: "canonical", href: canonical },
    ...alternates.map((link) => ({
      tagName: "link" as const,
      rel: link.rel,
      hrefLang: link.hrefLang,
      href: link.href,
    })),
  ];
}
