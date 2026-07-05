import type { CMSContentType as CMSContentTypeDto } from "@/types";

import {
  archiveEntityContent,
  resolveArchivePayload,
  unarchiveEntityContent,
} from "./entity-content.server";

export type AdminCollectionEntityType =
  | "product"
  | "news"
  | "certificate"
  | "catalog"
  | "career";

function toCmsContentType(entityType: AdminCollectionEntityType): CMSContentTypeDto {
  return entityType === "catalog" || entityType === "career" ? "page" : entityType;
}

export async function processCollectionArchiveAction(
  actorId: string,
  key: string,
  entityType: AdminCollectionEntityType,
): Promise<void> {
  const { payload, slug } = await resolveArchivePayload(key, entityType);

  await archiveEntityContent({
    key,
    type: toCmsContentType(entityType),
    actorId,
    slug,
    payload,
  });
}

export async function processCollectionUnarchiveAction(
  actorId: string,
  key: string,
): Promise<void> {
  await unarchiveEntityContent({ key, actorId });
}
