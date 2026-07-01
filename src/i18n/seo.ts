import {
  defaultLocale,
  localeHtmlLang,
  localeOpenGraphLocale,
  locales,
  type Locale,
} from "./config";
import { seoDefaults } from "@/data/site";
import { localizePath, stripLocaleFromPath } from "./utils";

export function buildCanonicalUrl(pathname: string, locale: Locale): string {
  const { pathname: pathWithoutLocale } = stripLocaleFromPath(pathname);
  const localizedPath = localizePath(pathWithoutLocale, locale);
  const base = seoDefaults.siteUrl.replace(/\/$/, "");
  return `${base}${localizedPath === "/" ? `/${locale}` : localizedPath}`;
}

export function buildAlternateLinks(pathname: string) {
  const { pathname: pathWithoutLocale } = stripLocaleFromPath(pathname);

  return locales.map((locale) => ({
    rel: "alternate" as const,
    hrefLang: localeHtmlLang[locale],
    href: buildCanonicalUrl(pathWithoutLocale, locale),
  }));
}

export function buildHrefLangLinks(pathname: string) {
  const alternates = buildAlternateLinks(pathname);

  return [
    ...alternates,
    {
      rel: "alternate" as const,
      hrefLang: "x-default",
      href: buildCanonicalUrl(pathname, defaultLocale),
    },
  ];
}

export function buildPageTitle(pageTitle: string): string {
  return seoDefaults.titleTemplate.replace("%s", pageTitle);
}

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (
    pathOrUrl.startsWith("http://") ||
    pathOrUrl.startsWith("https://") ||
    pathOrUrl.startsWith("data:")
  ) {
    return pathOrUrl;
  }

  const base = seoDefaults.siteUrl.replace(/\/$/, "");
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

export function buildOpenGraphLocale(locale: Locale): string {
  return localeOpenGraphLocale[locale];
}
