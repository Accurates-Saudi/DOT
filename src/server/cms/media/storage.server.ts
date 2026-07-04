import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { getCmsEnv } from "../env.server";

function sanitizeSegment(value: string): string {
  return value.replace(/[^a-zA-Z0-9._-]+/g, "-");
}

function getExtension(fileName: string, mimeType: string): string {
  const fromName = path.extname(fileName).toLowerCase();
  if (fromName) return fromName;

  const mimeMap: Record<string, string> = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "application/pdf": ".pdf",
  };

  return mimeMap[mimeType] ?? "";
}

export async function saveMediaVersionFile(input: {
  assetId: string;
  versionNumber: number;
  fileName: string;
  mimeType: string;
  bytes: Uint8Array;
}): Promise<{ storageKey: string }> {
  const { mediaStoragePath } = getCmsEnv();
  const extension = getExtension(input.fileName, input.mimeType);
  const folder = path.join(mediaStoragePath, sanitizeSegment(input.assetId));
  const fileName = `v${input.versionNumber}${extension}`;
  const absolutePath = path.join(folder, fileName);

  await mkdir(folder, { recursive: true });
  await writeFile(absolutePath, input.bytes);

  return {
    storageKey: path.posix.join(sanitizeSegment(input.assetId), fileName),
  };
}

export async function readMediaVersionFile(storageKey: string): Promise<Uint8Array> {
  const { mediaStoragePath } = getCmsEnv();
  const absolutePath = path.join(mediaStoragePath, storageKey);
  return readFile(absolutePath);
}
