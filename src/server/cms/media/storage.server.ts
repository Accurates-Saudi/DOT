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

function buildRelativeStorageKey(input: {
  assetId: string;
  versionNumber: number;
  fileName: string;
  mimeType: string;
}): string {
  const extension = getExtension(input.fileName, input.mimeType);
  const fileName = `v${input.versionNumber}${extension}`;
  return path.posix.join(sanitizeSegment(input.assetId), fileName);
}

async function uploadToS3(input: {
  storageKey: string;
  mimeType: string;
  bytes: Uint8Array;
}): Promise<void> {
  const { s3 } = getCmsEnv();
  if (!s3) {
    throw new Error("S3 storage is not configured.");
  }

  const { PutObjectCommand, S3Client } = await import("@aws-sdk/client-s3");
  const client = new S3Client({
    region: s3.region,
    credentials: {
      accessKeyId: s3.accessKeyId,
      secretAccessKey: s3.secretAccessKey,
    },
  });

  await client.send(
    new PutObjectCommand({
      Bucket: s3.bucketName,
      Key: input.storageKey,
      Body: input.bytes,
      ContentType: input.mimeType,
    }),
  );
}

async function readFromS3(storageKey: string): Promise<Uint8Array> {
  const { s3 } = getCmsEnv();
  if (!s3) {
    throw new Error("S3 storage is not configured.");
  }

  const { GetObjectCommand, S3Client } = await import("@aws-sdk/client-s3");
  const client = new S3Client({
    region: s3.region,
    credentials: {
      accessKeyId: s3.accessKeyId,
      secretAccessKey: s3.secretAccessKey,
    },
  });

  const response = await client.send(
    new GetObjectCommand({
      Bucket: s3.bucketName,
      Key: storageKey,
    }),
  );

  if (!response.Body) {
    throw new Error(`Missing S3 object body for "${storageKey}".`);
  }

  return new Uint8Array(await response.Body.transformToByteArray());
}

function isS3StorageKey(storageKey: string): boolean {
  return storageKey.startsWith("cms-media/");
}

export async function saveMediaVersionFile(input: {
  assetId: string;
  versionNumber: number;
  fileName: string;
  mimeType: string;
  bytes: Uint8Array;
}): Promise<{ storageKey: string }> {
  const relativeStorageKey = buildRelativeStorageKey(input);
  const { mediaStoragePath, s3 } = getCmsEnv();

  if (s3) {
    const storageKey = path.posix.join("cms-media", relativeStorageKey);
    await uploadToS3({
      storageKey,
      mimeType: input.mimeType,
      bytes: input.bytes,
    });

    return { storageKey };
  }

  const folder = path.join(mediaStoragePath, sanitizeSegment(input.assetId));
  const absolutePath = path.join(folder, path.basename(relativeStorageKey));

  await mkdir(folder, { recursive: true });
  await writeFile(absolutePath, input.bytes);

  return {
    storageKey: relativeStorageKey,
  };
}

export async function readMediaVersionFile(storageKey: string): Promise<Uint8Array> {
  if (isS3StorageKey(storageKey)) {
    return readFromS3(storageKey);
  }

  const { mediaStoragePath } = getCmsEnv();
  const absolutePath = path.join(mediaStoragePath, storageKey);
  return readFile(absolutePath);
}
