import type {
  CmsContentEntry,
  CmsContentVersion,
  CmsMediaAsset,
  CmsMediaVersion,
  CmsRole,
  CmsUser,
} from "@/generated/prisma/client";

import type {
  CMSContentRecord,
  CMSContentStatus,
  CMSContentType,
  CMSContentVersion as CMSContentVersionDto,
  CMSMediaType,
  CMSMediaVersion as CMSMediaVersionDto,
  CMSRole as CMSRoleDto,
  CMSUser,
  MediaLibraryItem,
} from "@/types";

type ContentVersionWithAuthor = CmsContentVersion & {
  createdBy?: CmsUser | null;
};

type ContentEntryWithCurrentVersion = CmsContentEntry & {
  currentVersion?: ContentVersionWithAuthor | null;
};

type MediaVersionWithAuthor = CmsMediaVersion & {
  createdBy?: CmsUser | null;
};

type MediaAssetWithCurrentVersion = CmsMediaAsset & {
  currentVersion?: MediaVersionWithAuthor | null;
};

function toRole(role: CmsRole): CMSRoleDto {
  return role.toLowerCase() as CMSRoleDto;
}

function toContentType(type: string): CMSContentType {
  return type.toLowerCase() as CMSContentType;
}

function toContentStatus(status: string): CMSContentStatus {
  return status.toLowerCase() as CMSContentStatus;
}

function toMediaType(type: string): CMSMediaType {
  return type.toLowerCase() as CMSMediaType;
}

export function toCmsUser(user: CmsUser): CMSUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: toRole(user.role),
  };
}

export function toCmsContentVersion(
  version: ContentVersionWithAuthor,
): CMSContentVersionDto {
  return {
    id: version.id,
    versionNumber: version.versionNumber,
    payload: version.payload,
    ...(version.changeSummary ? { changeSummary: version.changeSummary } : {}),
    isPublished: version.isPublished,
    createdAt: version.createdAt.toISOString(),
    ...(version.publishedAt ? { publishedAt: version.publishedAt.toISOString() } : {}),
    ...(version.createdBy ? { createdBy: toCmsUser(version.createdBy) } : {}),
  };
}

export function toCmsContentRecord(
  entry: ContentEntryWithCurrentVersion,
): CMSContentRecord {
  return {
    id: entry.id,
    key: entry.key,
    type: toContentType(entry.type),
    status: toContentStatus(entry.status),
    ...(entry.slug ? { slug: entry.slug } : {}),
    latestVersionNumber: entry.latestVersionNumber,
    createdAt: entry.createdAt.toISOString(),
    updatedAt: entry.updatedAt.toISOString(),
    ...(entry.currentVersion
      ? { currentVersion: toCmsContentVersion(entry.currentVersion) }
      : {}),
  };
}

export function toCmsMediaVersion(
  version: MediaVersionWithAuthor,
  url: string,
): CMSMediaVersionDto {
  return {
    id: version.id,
    versionNumber: version.versionNumber,
    filename: version.originalFilename,
    url,
    mimeType: version.mimeType,
    size: version.size,
    ...(version.width ? { width: version.width } : {}),
    ...(version.height ? { height: version.height } : {}),
    ...(version.alt
      ? { alt: version.alt as unknown as CMSMediaVersionDto["alt"] }
      : {}),
    createdAt: version.createdAt.toISOString(),
    ...(version.createdBy ? { createdBy: toCmsUser(version.createdBy) } : {}),
  };
}

export function toMediaLibraryItem(
  asset: MediaAssetWithCurrentVersion,
  resolveUrl: (assetId: string) => string,
): MediaLibraryItem {
  return {
    id: asset.id,
    key: asset.key,
    type: toMediaType(asset.type),
    latestVersionNumber: asset.latestVersionNumber,
    ...(asset.currentVersion
      ? {
          currentVersion: toCmsMediaVersion(
            asset.currentVersion,
            resolveUrl(asset.id),
          ),
        }
      : {}),
    createdAt: asset.createdAt.toISOString(),
    updatedAt: asset.updatedAt.toISOString(),
  };
}
