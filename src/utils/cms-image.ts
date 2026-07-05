import type { ImageAsset } from "@/types";

export function buildMediaFileUrl(
  mediaId: string,
  versionNumber: number,
): string {
  return `/api/cms/media/${mediaId}/file?v=${versionNumber}`;
}

export function resolveImagePreviewSrc(image: ImageAsset): string {
  if (image.mediaId && image.mediaVersion) {
    return buildMediaFileUrl(image.mediaId, image.mediaVersion);
  }

  return image.src;
}

export function getImageAltEn(image: ImageAsset): string {
  return image.localizedAlt?.en ?? image.alt ?? "";
}

export function getImageAltAr(image: ImageAsset): string {
  return image.localizedAlt?.ar ?? image.alt ?? "";
}

export function patchImageLocalizedAlt(
  image: ImageAsset,
  locale: "en" | "ar",
  value: string,
): ImageAsset {
  const localizedAlt = {
    en: locale === "en" ? value : getImageAltEn(image),
    ar: locale === "ar" ? value : getImageAltAr(image),
  };

  return {
    ...image,
    localizedAlt,
    alt: localizedAlt.en || image.alt,
  };
}

export function applyUploadedMediaToImage(
  image: ImageAsset,
  input: {
    mediaId: string;
    src: string;
    mediaVersion?: number;
    filename?: string;
    width?: number;
    height?: number;
    alt?: { en: string; ar: string };
  },
): ImageAsset {
  const localizedAlt = input.alt ?? image.localizedAlt;
  const altEn = localizedAlt?.en ?? getImageAltEn(image);
  const altAr = localizedAlt?.ar ?? getImageAltAr(image);
  const mediaVersion =
    input.mediaVersion ??
    (() => {
      const match = input.src.match(/[?&]v=(\d+)/);
      return match ? Number(match[1]) : undefined;
    })();

  return {
    ...image,
    src: input.src,
    mediaId: input.mediaId,
    ...(mediaVersion ? { mediaVersion } : {}),
    ...(input.filename ? { filename: input.filename } : {}),
    ...(input.width ? { width: input.width } : {}),
    ...(input.height ? { height: input.height } : {}),
    localizedAlt: { en: altEn, ar: altAr },
    alt: altEn || image.alt,
  };
}

export function readImageDimensions(
  file: File,
): Promise<{ width?: number; height?: number }> {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve({});
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();

    const finish = (result: { width?: number; height?: number }) => {
      URL.revokeObjectURL(url);
      resolve(result);
    };

    const timeoutId = window.setTimeout(() => finish({}), 1500);

    img.onload = () => {
      window.clearTimeout(timeoutId);
      finish({
        width: img.naturalWidth || undefined,
        height: img.naturalHeight || undefined,
      });
    };

    img.onerror = () => {
      window.clearTimeout(timeoutId);
      finish({});
    };

    img.src = url;
  });
}
