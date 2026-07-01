import { productDetails } from "@/data/products/registry";
import { realNewsArticles } from "@/data/news/realArticles";
import { seoDefaults } from "@/data/site";
import { locales, type Locale } from "@/i18n/config";
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
};

function getSiteBase(): string {
  return seoDefaults.siteUrl.replace(/\/$/, "");
}

function buildLocalizedUrl(path: string, locale: Locale): string {
  const localizedPath = localizePath(path, locale);
  return `${getSiteBase()}${localizedPath}`;
}

function toLastmod(value?: string): string | undefined {
  if (!value) return undefined;

  if (value.includes("T")) {
    return value;
  }

  return `${value}T00:00:00.000Z`;
}

function createEntries(
  path: string,
  options?: Pick<SitemapEntry, "lastmod" | "changefreq" | "priority">,
): SitemapEntry[] {
  return locales.map((locale) => ({
    loc: buildLocalizedUrl(path, locale),
    ...options,
  }));
}

export function getSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const generatedAt = new Date().toISOString();

  for (const path of STATIC_PATHS) {
    const options =
      path === "/"
        ? { lastmod: generatedAt, changefreq: "weekly" as const, priority: 1 }
        : path === "/news"
          ? { lastmod: generatedAt, changefreq: "weekly" as const, priority: 0.8 }
          : { lastmod: generatedAt, changefreq: "monthly" as const, priority: 0.7 };

    entries.push(...createEntries(path, options));
  }

  for (const product of productDetails) {
    entries.push(
      ...createEntries(`/products/${product.slug}`, {
        lastmod: generatedAt,
        changefreq: "monthly",
        priority: 0.8,
      }),
    );
  }

  for (const article of realNewsArticles) {
    entries.push(
      ...createEntries(`/news/${article.slug}`, {
        lastmod: toLastmod(article.publishedAt),
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
      const tags = [
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        entry.lastmod ? `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : "",
        entry.changefreq ? `    <changefreq>${entry.changefreq}</changefreq>` : "",
        entry.priority !== undefined
          ? `    <priority>${entry.priority.toFixed(1)}</priority>`
          : "",
      ]
        .filter(Boolean)
        .join("\n");

      return `  <url>\n${tags}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlNodes}
</urlset>`;
}

export function renderRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${getSiteBase()}/sitemap.xml
`;
}
