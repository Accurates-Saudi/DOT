import type { ImageAsset } from "@/types";

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
    filename?: string;
    width?: number;
    height?: number;
    alt?: { en: string; ar: string };
  },
): ImageAsset {
  const localizedAlt = input.alt ?? image.localizedAlt;
  const altEn = localizedAlt?.en ?? getImageAltEn(image);
  const altAr = localizedAlt?.ar ?? getImageAltAr(image);

  return {
    ...image,
    src: input.src,
    mediaId: input.mediaId,
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
    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      resolve({
        width: img.naturalWidth || undefined,
        height: img.naturalHeight || undefined,
      });
      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({});
    };

    img.src = url;
  });
}
