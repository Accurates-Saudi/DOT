import type {
  CmsContentStatus,
  CmsContentType,
  Prisma,
} from "@/generated/prisma/client";

import type {
  CMSContentRecord,
  CMSContentStatus as CMSContentStatusDto,
  CMSContentType as CMSContentTypeDto,
  CMSContentVersion,
} from "@/types";

import { getPrismaClient } from "../db.server";
import { CmsHttpError } from "../http.server";
import {
  toCmsContentRecord,
  toCmsContentVersion,
} from "../serializers.server";

const contentVersionInclude = {
  createdBy: true,
} satisfies Prisma.CmsContentVersionInclude;

const contentEntryInclude = {
  currentVersion: { include: contentVersionInclude },
  publishedVersion: { include: contentVersionInclude },
  versions: {
    include: contentVersionInclude,
    orderBy: { versionNumber: "desc" as const },
    take: 20,
  },
} satisfies Prisma.CmsContentEntryInclude;

function toPrismaContentType(type: CMSContentTypeDto): CmsContentType {
  return type.toUpperCase() as CmsContentType;
}

function toPrismaContentStatus(status: CMSContentStatusDto): CmsContentStatus {
  return status.toUpperCase() as CmsContentStatus;
}

export interface CMSContentEntryDetail {
  entry: CMSContentRecord;
  publishedVersion?: CMSContentVersion;
  versions: CMSContentVersion[];
}

export async function getPublicContentPayloadByKey(
  key: string,
): Promise<unknown | null> {
  const prisma = getPrismaClient();
  const entry = await prisma.cmsContentEntry.findUnique({
    where: { key },
    include: {
      currentVersion: true,
      publishedVersion: true,
    },
  });

  if (!entry) {
    return null;
  }

  const version = entry.publishedVersion;

  return version?.payload ?? null;
}

function toDetail(
  entry: Prisma.CmsContentEntryGetPayload<{ include: typeof contentEntryInclude }>,
): CMSContentEntryDetail {
  return {
    entry: toCmsContentRecord(entry),
    ...(entry.publishedVersion
      ? { publishedVersion: toCmsContentVersion(entry.publishedVersion) }
      : {}),
    versions: entry.versions.map(toCmsContentVersion),
  };
}

export async function listContentEntries(filters?: {
  type?: CMSContentTypeDto;
  status?: CMSContentStatusDto;
  search?: string;
}): Promise<CMSContentRecord[]> {
  const prisma = getPrismaClient();
  const entries = await prisma.cmsContentEntry.findMany({
    where: {
      ...(filters?.type ? { type: toPrismaContentType(filters.type) } : {}),
      ...(filters?.status ? { status: toPrismaContentStatus(filters.status) } : {}),
      ...(filters?.search
        ? {
            OR: [
              { key: { contains: filters.search, mode: "insensitive" } },
              { slug: { contains: filters.search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: {
      currentVersion: { include: contentVersionInclude },
    },
    orderBy: { updatedAt: "desc" },
  });

  return entries.map(toCmsContentRecord);
}

export async function getContentEntryByKey(
  key: string,
): Promise<CMSContentEntryDetail> {
  const prisma = getPrismaClient();
  const entry = await prisma.cmsContentEntry.findUnique({
    where: { key },
    include: contentEntryInclude,
  });

  if (!entry) {
    throw new CmsHttpError(404, "content_not_found", `No CMS content exists for "${key}".`);
  }

  return toDetail(entry);
}

export async function upsertContentEntry(input: {
  key: string;
  type: CMSContentTypeDto;
  payload: unknown;
  actorId: string;
  slug?: string;
  changeSummary?: string;
  publish?: boolean;
}): Promise<CMSContentEntryDetail> {
  if (!input.key.trim()) {
    throw new CmsHttpError(400, "invalid_content_key", "Content key is required.");
  }

  const prisma = getPrismaClient();
  return prisma.$transaction(async (tx) => {
    const now = new Date();
    const existing = await tx.cmsContentEntry.findUnique({
      where: { key: input.key },
    });

    const nextVersionNumber = (existing?.latestVersionNumber ?? 0) + 1;

    const entry =
      existing ??
      (await tx.cmsContentEntry.create({
        data: {
          key: input.key,
          type: toPrismaContentType(input.type),
          status: input.publish ? "PUBLISHED" : "DRAFT",
          ...(input.slug ? { slug: input.slug } : {}),
          latestVersionNumber: 0,
          createdById: input.actorId,
          updatedById: input.actorId,
        },
      }));

    const version = await tx.cmsContentVersion.create({
      data: {
        entryId: entry.id,
        versionNumber: nextVersionNumber,
        payload: input.payload as Prisma.InputJsonValue,
        ...(input.changeSummary ? { changeSummary: input.changeSummary } : {}),
        createdById: input.actorId,
        isPublished: Boolean(input.publish),
        ...(input.publish ? { publishedAt: now } : {}),
      },
      include: contentVersionInclude,
    });

    const updated = await tx.cmsContentEntry.update({
      where: { id: entry.id },
      data: {
        type: toPrismaContentType(input.type),
        ...(input.slug !== undefined ? { slug: input.slug } : {}),
        latestVersionNumber: nextVersionNumber,
        currentVersionId: version.id,
        ...(input.publish
          ? {
              publishedVersionId: version.id,
              status: "PUBLISHED",
            }
          : {
              status: existing?.publishedVersionId ? existing.status : "DRAFT",
            }),
        updatedById: input.actorId,
        updatedAt: now,
      },
      include: contentEntryInclude,
    });

    return toDetail(updated);
  });
}

export async function archiveContentEntry(input: {
  key: string;
  actorId: string;
}): Promise<CMSContentEntryDetail> {
  const prisma = getPrismaClient();
  const existing = await prisma.cmsContentEntry.findUnique({
    where: { key: input.key },
  });

  if (!existing) {
    throw new CmsHttpError(404, "content_not_found", `No CMS content exists for "${input.key}".`);
  }

  const updated = await prisma.cmsContentEntry.update({
    where: { key: input.key },
    data: {
      status: "ARCHIVED",
      updatedById: input.actorId,
    },
    include: contentEntryInclude,
  });

  return toDetail(updated);
}
