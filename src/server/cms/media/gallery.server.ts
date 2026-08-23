import { createProductDetail } from "@/data/products/factory";
import { productRecords } from "@/data/products/registry";
import { siteSettings } from "@/data/site";
import { localeContentMessages } from "@/content/shared";
import { defaultLocale } from "@/i18n/config";
import { buildAboutContent, buildHomeContent } from "@/i18n/content";
import { buildCatalogsPageContent } from "@/i18n/content/pages/catalogs";
import { getLocalizedNewsArticles, getLocalizedNewsBySlug } from "@/i18n/content/news";
import { getDefaultSiteSettingsPayload } from "@/server/cms/content/site-settings.server";
import type { MediaLibraryItem } from "@/types";

import { listPublishedContentPayloads } from "../content/service.server";
import { listMediaAssets } from "./service.server";

export interface MediaGalleryItem {
  id: string;
  url: string;
  label: string;
  source: "upload" | "website";
  updatedAt?: string;
}

const IMAGE_URL_PATTERN =
  /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$|^\/api\/cms\/media\//i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isImageUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("data:")) return false;
  return (
    IMAGE_URL_PATTERN.test(trimmed) ||
    trimmed.startsWith("/assets/") ||
    trimmed.includes("/assets/") ||
    trimmed.startsWith("http")
  );
}

function labelFromUrl(url: string): string {
  const withoutQuery = url.split("?")[0] ?? url;
  const segments = withoutQuery.split("/");
  return decodeURIComponent(segments.at(-1) ?? url);
}

function addGalleryUrl(
  map: Map<string, MediaGalleryItem>,
  url: string,
  label?: string,
) {
  if (!isImageUrl(url)) return;

  if (!map.has(url)) {
    map.set(url, {
      id: `website:${url}`,
      url,
      label: label ?? labelFromUrl(url),
      source: "website",
    });
  }
}

function collectImageUrls(value: unknown, map: Map<string, MediaGalleryItem>) {
  if (typeof value === "string") {
    addGalleryUrl(map, value);
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) collectImageUrls(item, map);
    return;
  }

  if (!isRecord(value)) return;

  if (typeof value.src === "string" && isImageUrl(value.src)) {
    const alt = typeof value.alt === "string" ? value.alt : undefined;
    addGalleryUrl(map, value.src, alt ?? labelFromUrl(value.src));
  }

  for (const nested of Object.values(value)) {
    collectImageUrls(nested, map);
  }
}

async function collectStaticWebsiteImages(): Promise<Map<string, MediaGalleryItem>> {
  const map = new Map<string, MediaGalleryItem>();
  const locale = defaultLocale;
  const messages = localeContentMessages[locale];

  collectImageUrls(getDefaultSiteSettingsPayload(), map);
  collectImageUrls(buildHomeContent(messages, locale), map);
  collectImageUrls(buildAboutContent(messages, locale), map);
  collectImageUrls(buildCatalogsPageContent(messages, locale), map);

  for (const record of productRecords) {
    collectImageUrls(createProductDetail(record), map);
  }

  for (const preview of getLocalizedNewsArticles(messages)) {
    const article = getLocalizedNewsBySlug(messages, preview.slug);
    if (article) collectImageUrls(article, map);
  }

  collectImageUrls(siteSettings, map);

  return map;
}

async function collectPublishedCmsImages(): Promise<Map<string, MediaGalleryItem>> {
  const map = new Map<string, MediaGalleryItem>();
  const entries = await listPublishedContentPayloads();

  for (const entry of entries) {
    collectImageUrls(entry.payload, map);
  }

  return map;
}

export async function listMediaGalleryItems(search = ""): Promise<MediaGalleryItem[]> {
  const [uploads, staticImages, cmsImages] = await Promise.all([
    listMediaAssets(),
    collectStaticWebsiteImages(),
    collectPublishedCmsImages(),
  ]);

  const merged = new Map<string, MediaGalleryItem>();

  for (const item of staticImages.values()) {
    merged.set(item.url, item);
  }

  for (const item of cmsImages.values()) {
    merged.set(item.url, item);
  }

  for (const upload of uploads) {
    // The gallery/picker only renders images; skip non-image assets (e.g. PDFs)
    // so they don't appear as broken thumbnails.
    if (upload.type !== "image") continue;

    const url = upload.currentVersion?.url;
    if (!url) continue;

    merged.set(url, {
      id: upload.id,
      url,
      label: upload.key,
      source: "upload",
      updatedAt: upload.updatedAt,
    });
  }

  const normalizedSearch = search.trim().toLowerCase();
  const items = [...merged.values()].sort((left, right) => {
    if (left.source !== right.source) {
      return left.source === "upload" ? -1 : 1;
    }

    return left.label.localeCompare(right.label);
  });

  if (!normalizedSearch) return items;

  return items.filter(
    (item) =>
      item.label.toLowerCase().includes(normalizedSearch) ||
      item.url.toLowerCase().includes(normalizedSearch),
  );
}

export function galleryItemToMediaLibraryItem(item: MediaGalleryItem): MediaLibraryItem {
  return {
    id: item.id,
    key: item.label,
    type: "image",
    latestVersionNumber: 1,
    currentVersion: {
      id: item.id,
      versionNumber: 1,
      filename: item.label,
      url: item.url,
      mimeType: "image/*",
      size: 0,
      createdAt: item.updatedAt ?? new Date().toISOString(),
    },
    createdAt: item.updatedAt ?? new Date().toISOString(),
    updatedAt: item.updatedAt ?? new Date().toISOString(),
  };
}
