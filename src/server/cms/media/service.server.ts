import type { Prisma } from "@/generated/prisma/client";

import type { CMSLocalizedValue, MediaLibraryItem } from "@/types";

import { getPrismaClient } from "../db.server";
import { CmsHttpError } from "../http.server";
import { toMediaLibraryItem } from "../serializers.server";
import { readMediaVersionFile, saveMediaVersionFile } from "./storage.server";

export function buildMediaFileUrl(
  assetId: string,
  versionNumber: number,
): string {
  return `/api/cms/media/${assetId}/file?v=${versionNumber}`;
}

const mediaVersionInclude = {
  createdBy: true,
} satisfies Prisma.CmsMediaVersionInclude;

const mediaAssetInclude = {
  currentVersion: { include: mediaVersionInclude },
} satisfies Prisma.CmsMediaAssetInclude;

function normalizeAlt(alt?: CMSLocalizedValue<string>): Prisma.InputJsonValue | undefined {
  if (!alt) return undefined;
  return alt as unknown as Prisma.InputJsonValue;
}

export async function listMediaAssets(): Promise<MediaLibraryItem[]> {
  const prisma = getPrismaClient();
  const assets = await prisma.cmsMediaAsset.findMany({
    include: mediaAssetInclude,
    orderBy: { updatedAt: "desc" },
  });

  return assets.map((asset) =>
    toMediaLibraryItem(asset, (assetId, versionNumber) =>
      buildMediaFileUrl(assetId, versionNumber),
    ),
  );
}

export async function getMediaAssetById(id: string): Promise<MediaLibraryItem> {
  const prisma = getPrismaClient();
  const asset = await prisma.cmsMediaAsset.findUnique({
    where: { id },
    include: mediaAssetInclude,
  });

  if (!asset) {
    throw new CmsHttpError(404, "media_not_found", `No CMS media asset exists for "${id}".`);
  }

  return toMediaLibraryItem(asset, (assetId, versionNumber) =>
    buildMediaFileUrl(assetId, versionNumber),
  );
}

export async function createMediaAsset(input: {
  key: string;
  actorId: string;
  fileName: string;
  mimeType: string;
  bytes: Uint8Array;
  width?: number;
  height?: number;
  alt?: CMSLocalizedValue<string>;
}): Promise<MediaLibraryItem> {
  if (!input.key.trim()) {
    throw new CmsHttpError(400, "invalid_media_key", "Media key is required.");
  }

  const prisma = getPrismaClient();
  return prisma.$transaction(async (tx) => {
    const asset = await tx.cmsMediaAsset.create({
      data: {
        key: input.key,
        type: "IMAGE",
        latestVersionNumber: 0,
        createdById: input.actorId,
        updatedById: input.actorId,
      },
    });

    const versionNumber = 1;
    const file = await saveMediaVersionFile({
      assetId: asset.id,
      versionNumber,
      fileName: input.fileName,
      mimeType: input.mimeType,
      bytes: input.bytes,
    });

    const version = await tx.cmsMediaVersion.create({
      data: {
        assetId: asset.id,
        versionNumber,
        storageKey: file.storageKey,
        originalFilename: input.fileName,
        mimeType: input.mimeType,
        size: input.bytes.byteLength,
        ...(input.width ? { width: input.width } : {}),
        ...(input.height ? { height: input.height } : {}),
        ...(input.alt ? { alt: normalizeAlt(input.alt) } : {}),
        createdById: input.actorId,
      },
    });

    const updated = await tx.cmsMediaAsset.update({
      where: { id: asset.id },
      data: {
        latestVersionNumber: versionNumber,
        currentVersionId: version.id,
        updatedById: input.actorId,
      },
      include: mediaAssetInclude,
    });

    return toMediaLibraryItem(updated, (assetId, versionNumber) =>
      buildMediaFileUrl(assetId, versionNumber),
    );
  });
}

export async function uploadMediaAsset(input: {
  key: string;
  actorId: string;
  fileName: string;
  mimeType: string;
  bytes: Uint8Array;
  width?: number;
  height?: number;
  alt?: CMSLocalizedValue<string>;
  mediaId?: string;
}): Promise<MediaLibraryItem> {
  const prisma = getPrismaClient();

  if (input.mediaId) {
    return replaceMediaAsset({
      id: input.mediaId,
      actorId: input.actorId,
      fileName: input.fileName,
      mimeType: input.mimeType,
      bytes: input.bytes,
      ...(input.width ? { width: input.width } : {}),
      ...(input.height ? { height: input.height } : {}),
      ...(input.alt ? { alt: input.alt } : {}),
    });
  }

  const existing = await prisma.cmsMediaAsset.findUnique({
    where: { key: input.key },
    select: { id: true },
  });

  if (existing) {
    return replaceMediaAsset({
      id: existing.id,
      actorId: input.actorId,
      fileName: input.fileName,
      mimeType: input.mimeType,
      bytes: input.bytes,
      ...(input.width ? { width: input.width } : {}),
      ...(input.height ? { height: input.height } : {}),
      ...(input.alt ? { alt: input.alt } : {}),
    });
  }

  return createMediaAsset(input);
}

export async function replaceMediaAsset(input: {
  id: string;
  actorId: string;
  fileName: string;
  mimeType: string;
  bytes: Uint8Array;
  width?: number;
  height?: number;
  alt?: CMSLocalizedValue<string>;
}): Promise<MediaLibraryItem> {
  const prisma = getPrismaClient();
  return prisma.$transaction(async (tx) => {
    const asset = await tx.cmsMediaAsset.findUnique({
      where: { id: input.id },
    });

    if (!asset) {
      throw new CmsHttpError(404, "media_not_found", `No CMS media asset exists for "${input.id}".`);
    }

    const versionNumber = asset.latestVersionNumber + 1;
    const file = await saveMediaVersionFile({
      assetId: asset.id,
      versionNumber,
      fileName: input.fileName,
      mimeType: input.mimeType,
      bytes: input.bytes,
    });

    const version = await tx.cmsMediaVersion.create({
      data: {
        assetId: asset.id,
        versionNumber,
        storageKey: file.storageKey,
        originalFilename: input.fileName,
        mimeType: input.mimeType,
        size: input.bytes.byteLength,
        ...(input.width ? { width: input.width } : {}),
        ...(input.height ? { height: input.height } : {}),
        ...(input.alt ? { alt: normalizeAlt(input.alt) } : {}),
        createdById: input.actorId,
      },
    });

    const updated = await tx.cmsMediaAsset.update({
      where: { id: asset.id },
      data: {
        latestVersionNumber: versionNumber,
        currentVersionId: version.id,
        updatedById: input.actorId,
      },
      include: mediaAssetInclude,
    });

    return toMediaLibraryItem(updated, (assetId, versionNumber) =>
      buildMediaFileUrl(assetId, versionNumber),
    );
  });
}

export async function getMediaFile(
  id: string,
  versionNumber?: number,
): Promise<{
  bytes: Uint8Array;
  mimeType: string;
  fileName: string;
  versionNumber: number;
}> {
  const prisma = getPrismaClient();
  const asset = await prisma.cmsMediaAsset.findUnique({
    where: { id },
    include: {
      currentVersion: true,
    },
  });

  if (!asset) {
    throw new CmsHttpError(404, "media_not_found", `No CMS media asset exists for "${id}".`);
  }

  const version =
    versionNumber !== undefined
      ? await prisma.cmsMediaVersion.findFirst({
          where: {
            assetId: id,
            versionNumber,
          },
        })
      : asset.currentVersion;

  if (!version) {
    throw new CmsHttpError(404, "media_not_found", `No CMS media version exists for "${id}".`);
  }

  return {
    bytes: await readMediaVersionFile(version.storageKey),
    mimeType: version.mimeType,
    fileName: version.originalFilename,
    versionNumber: version.versionNumber,
  };
}

export async function getCurrentMediaFile(id: string): Promise<{
  bytes: Uint8Array;
  mimeType: string;
  fileName: string;
}> {
  const file = await getMediaFile(id);
  return {
    bytes: file.bytes,
    mimeType: file.mimeType,
    fileName: file.fileName,
  };
}
