import { CmsHttpError } from "./http.server";

const IMAGE_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
]);

export function assertImageUpload(mimeType: string): void {
  if (!IMAGE_MIME_TYPES.has(mimeType)) {
    throw new CmsHttpError(
      400,
      "invalid_image_type",
      "Only PNG, JPEG, WebP, and SVG image uploads are supported.",
    );
  }
}

export function getRequestMetadata(request: Request): {
  ipAddress?: string;
  userAgent?: string;
} {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ipAddress = forwardedFor?.split(",")[0]?.trim() || undefined;
  const userAgent = request.headers.get("user-agent") ?? undefined;

  return { ipAddress, userAgent };
}

export async function readUploadedFile(
  value: FormDataEntryValue | null,
): Promise<{
  fileName: string;
  mimeType: string;
  bytes: Uint8Array;
}> {
  if (!(value instanceof File)) {
    throw new CmsHttpError(400, "missing_file", "Expected a file upload.");
  }

  const buffer = await value.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  if (bytes.byteLength === 0) {
    throw new CmsHttpError(400, "empty_file", "Uploaded file is empty.");
  }

  return {
    fileName: value.name,
    mimeType: value.type || "application/octet-stream",
    bytes,
  };
}
