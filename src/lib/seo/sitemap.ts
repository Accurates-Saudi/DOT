import { productDetails } from "@/data/products/registry";
import { realNewsArticles } from "@/data/news/realArticles";
import { seoDefaults } from "@/data/site";
import { locales, type Locale } from "@/i18n/config";
import { localeHtmlLang } from "@/i18n/config";
import { localizePath } from "@/i18n/utils";

const STATIC_PATHS = [
  "/",
  "/about",
  "/services",
  "/products",
  "/catalogs",
  "/news",
  "/contact",
] as const;

export type SitemapEntry = {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  alternates: Array<{ hreflang: string; href: string }>;
};

function getSiteBase(): string {
  return seoDefaults.siteUrl.replace(/\/$/, "");
}

function buildLocalizedUrl(path: string, locale: Locale): string {
  const localizedPath = localizePath(path, locale);
  return `${getSiteBase()}${localizedPath}`;
}

function buildAlternates(path: string): SitemapEntry["alternates"] {
  const alternates = locales.map((locale) => ({
    hreflang: localeHtmlLang[locale],
    href: buildLocalizedUrl(path, locale),
  }));

  return [
    ...alternates,
    {
      hreflang: "x-default",
      href: buildLocalizedUrl(path, "en"),
    },
  ];
}

function createEntry(
  path: string,
  options?: Pick<SitemapEntry, "lastmod" | "changefreq" | "priority">,
): SitemapEntry[] {
  return locales.map((locale) => ({
    loc: buildLocalizedUrl(path, locale),
    alternates: buildAlternates(path),
    ...options,
  }));
}

export function getSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  for (const path of STATIC_PATHS) {
    const options =
      path === "/"
        ? { changefreq: "weekly" as const, priority: 1 }
        : path === "/news"
          ? { changefreq: "weekly" as const, priority: 0.8 }
          : { changefreq: "monthly" as const, priority: 0.7 };

    entries.push(...createEntry(path, options));
  }

  for (const product of productDetails) {
    entries.push(
      ...createEntry(`/products/${product.slug}`, {
        changefreq: "monthly",
        priority: 0.8,
      }),
    );
  }

  for (const article of realNewsArticles) {
    entries.push(
      ...createEntry(`/news/${article.slug}`, {
        lastmod: article.publishedAt,
        changefreq: "yearly",
        priority: 0.6,
      }),
    );
  }

  return entries;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function renderSitemapXml(entries: SitemapEntry[]): string {
  const urlNodes = entries
    .map((entry) => {
      const alternateLinks = entry.alternates
        .map(
          (alternate) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.hreflang)}" href="${escapeXml(alternate.href)}" />`,
        )
        .join("\n");

      const optionalTags = [
        entry.lastmod ? `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : "",
        entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>` : "",
        entry.priority !== undefined
          ? `    <priority>${entry.priority.toFixed(1)}</priority>`
          : "",
      ]
        .filter(Boolean)
        .join("\n");

      return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
${optionalTags ? `${optionalTags}\n` : ""}${alternateLinks}
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlNodes}
</urlset>`;
}

export function renderRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${getSiteBase()}/sitemap.xml
`;
}
