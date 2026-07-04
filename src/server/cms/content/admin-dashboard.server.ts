import type { Locale } from "@/i18n/config";
import { defaultLocale } from "@/i18n/config";
import type { CMSContentRecord, CMSContentType } from "@/types";
import { getRowMetaExtractor } from "@/utils/cms-entities";

import { getPrismaClient } from "../db.server";
import { toCmsContentRecord } from "../serializers.server";

import {
  buildAdminCatalogRows,
  buildAdminCertificateRows,
  buildAdminNewsRows,
  buildAdminProductRows,
} from "./admin-collection.server";
import { listContentEntries } from "./service.server";

export interface AdminDashboardItem {
  id: string;
  key: string;
  title: string;
  type: string;
  status: string;
  updatedAt: string;
  changeSummary?: string;
  authorName?: string;
  editPath: string;
}

const contentVersionInclude = {
  createdBy: true,
} as const;

function getAdminEditPath(key: string, type: CMSContentType): string {
  const encoded = encodeURIComponent(key);

  switch (type) {
    case "product":
      return `/admin/products/${encoded}`;
    case "news":
      return `/admin/news/${encoded}`;
    case "certificate":
      return `/admin/certificates/${encoded}`;
    case "page":
      return key.startsWith("catalog.")
        ? `/admin/catalogs/${encoded}`
        : "/admin/settings";
    default:
      return "/admin";
  }
}

function resolveContentTitle(record: CMSContentRecord, locale: Locale): string {
  if (record.key.endsWith(".order")) {
    return record.key.replace(".order", " order");
  }

  const extractor = getRowMetaExtractor(
    record.type === "page" && record.key.startsWith("catalog.")
      ? "page"
      : record.type,
  );

  return extractor(record, locale).title;
}

function toDashboardItem(
  record: CMSContentRecord,
  locale: Locale,
): AdminDashboardItem {
  return {
    id: record.id,
    key: record.key,
    title: resolveContentTitle(record, locale),
    type: record.type,
    status: record.status,
    updatedAt: record.updatedAt,
    changeSummary: record.currentVersion?.changeSummary,
    authorName: record.currentVersion?.createdBy?.name,
    editPath: getAdminEditPath(record.key, record.type),
  };
}

export async function getAdminDashboardCounts(locale: Locale = defaultLocale) {
  const prisma = getPrismaClient();

  const [productRows, newsRows, certificateRows, catalogRows, media, users] =
    await Promise.all([
      buildAdminProductRows(locale),
      buildAdminNewsRows(locale),
      buildAdminCertificateRows(locale),
      buildAdminCatalogRows(locale),
      prisma.cmsMediaAsset.count(),
      prisma.cmsUser.count(),
    ]);

  const active = <T extends { status: string }>(rows: T[]) =>
    rows.filter((row) => row.status !== "archived").length;

  return {
    products: active(productRows),
    news: active(newsRows),
    certificates: active(certificateRows),
    catalogs: active(catalogRows),
    media,
    users,
  };
}

export async function getAdminRecentUpdates(
  locale: Locale = defaultLocale,
  limit = 8,
): Promise<AdminDashboardItem[]> {
  const prisma = getPrismaClient();

  const entries = await prisma.cmsContentEntry.findMany({
    where: {
      status: { not: "ARCHIVED" },
      key: { not: { endsWith: ".order" } },
    },
    include: {
      currentVersion: { include: contentVersionInclude },
    },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });

  return entries.map((entry) => toDashboardItem(toCmsContentRecord(entry), locale));
}

export async function listAdminDraftItems(
  locale: Locale = defaultLocale,
  search = "",
): Promise<AdminDashboardItem[]> {
  const drafts = await listContentEntries({
    status: "draft",
    ...(search ? { search } : {}),
  });

  const publishedWithPendingChanges = await listContentEntries(
    search ? { search } : undefined,
  );

  const pending = publishedWithPendingChanges.filter(
    (record) =>
      record.status === "published" &&
      record.currentVersion &&
      !record.currentVersion.isPublished,
  );

  const merged = new Map<string, CMSContentRecord>();
  for (const record of [...drafts, ...pending]) {
    if (record.key.endsWith(".order")) continue;
    merged.set(record.key, record);
  }

  return [...merged.values()]
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
    .map((record) => toDashboardItem(record, locale));
}
