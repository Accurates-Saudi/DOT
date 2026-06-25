import type { Locale } from "@/i18n/config";
import {
  buildCanonicalUrl,
  buildHrefLangLinks,
  buildOpenGraphLocale,
  buildPageTitle,
} from "@/i18n/seo";

export function createPageMeta({
  title,
  description,
  pathname,
  locale,
  ogImage,
}: {
  title: string;
  description: string;
  pathname: string;
  locale: Locale;
  ogImage?: string;
}) {
  const pageTitle = buildPageTitle(title);
  const canonical = buildCanonicalUrl(pathname, locale);
  const alternates = buildHrefLangLinks(pathname);

  return [
    { title: pageTitle },
    { name: "description", content: description },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: description },
    { property: "og:locale", content: buildOpenGraphLocale(locale) },
    { property: "og:url", content: canonical },
    { tagName: "link", rel: "canonical", href: canonical },
    ...alternates.map((link) => ({
      tagName: "link" as const,
      rel: link.rel,
      hrefLang: link.hrefLang,
      href: link.href,
    })),
    ...(ogImage ? [{ property: "og:image", content: ogImage }] : []),
  ];
}
