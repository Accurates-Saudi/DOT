import { Images, Loader2, Upload } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { CmsMediaLibrarySheet } from "@/components/cms/CmsMediaLibrarySheet";
import { CmsPanelCard, CmsPanelField } from "@/components/cms/CmsPanelPrimitives";
import { cmsClient, CmsApiError } from "@/sdk/cms";
import type { MediaGalleryItem } from "@/server/cms/media/gallery.server";
import type { ImageAsset } from "@/types";
import {
  applyUploadedMediaToImage,
  getImageAltAr,
  getImageAltEn,
  patchImageLocalizedAlt,
  preloadImageSrc,
  readImageDimensions,
  resolveImagePreviewSrc,
} from "@/utils/cms-image";

export interface CmsPanelImageFieldProps {
  label: string;
  image: ImageAsset;
  mediaKey: string;
  onImageChange: (image: ImageAsset) => void;
}

export function CmsPanelImageField({
  label,
  image,
  mediaKey,
  onImageChange,
}: CmsPanelImageFieldProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const instantPreviewRef = useRef<string | null>(null);
  const sourceImageRef = useRef(image);
  const [instantPreview, setInstantPreview] = useState<string | null>(null);
  const [pendingFilename, setPendingFilename] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);

  useEffect(() => {
    sourceImageRef.current = image;
  }, [image]);

  useEffect(() => {
    return () => {
      if (instantPreviewRef.current) {
        URL.revokeObjectURL(instantPreviewRef.current);
      }
    };
  }, []);

  function clearInstantPreview() {
    if (instantPreviewRef.current) {
      URL.revokeObjectURL(instantPreviewRef.current);
      instantPreviewRef.current = null;
    }
    setInstantPreview(null);
  }

  function showInstantPreview(file: File) {
    clearInstantPreview();
    const previewUrl = URL.createObjectURL(file);
    instantPreviewRef.current = previewUrl;
    setInstantPreview(previewUrl);
    setPendingFilename(file.name);

    onImageChange({
      ...sourceImageRef.current,
      src: previewUrl,
      filename: file.name,
    });
  }

  async function handleFileSelected(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    const imageBeforeUpload = sourceImageRef.current;

    setError(null);
    setIsUploading(true);
    showInstantPreview(file);

    try {
      const alt = {
        en: getImageAltEn(imageBeforeUpload),
        ar: getImageAltAr(imageBeforeUpload),
      };

      const uploadPromise = cmsClient.media.upload({
        key: mediaKey,
        file,
        fileName: file.name,
        alt,
        ...(imageBeforeUpload.mediaId ? { mediaId: imageBeforeUpload.mediaId } : {}),
      });

      const [dimensions, media] = await Promise.all([
        readImageDimensions(file),
        uploadPromise,
      ]);

      const uploadedVersion = media.currentVersion;
      if (!uploadedVersion) {
        throw new Error("Uploaded media is missing version details.");
      }

      const nextImage = applyUploadedMediaToImage(imageBeforeUpload, {
        mediaId: media.id,
        src: uploadedVersion.url,
        mediaVersion: uploadedVersion.versionNumber,
        filename: uploadedVersion.filename,
        width: uploadedVersion.width ?? dimensions.width,
        height: uploadedVersion.height ?? dimensions.height,
        alt: uploadedVersion.alt ?? alt,
      });

      await preloadImageSrc(resolveImagePreviewSrc(nextImage));
      onImageChange(nextImage);
      clearInstantPreview();
      setPendingFilename(null);
    } catch (uploadError) {
      clearInstantPreview();
      setPendingFilename(null);
      onImageChange(imageBeforeUpload);
      setError(
        uploadError instanceof CmsApiError
          ? uploadError.message
          : uploadError instanceof Error
            ? uploadError.message
            : "Unable to upload this image right now.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  const previewSrc = instantPreview ?? resolveImagePreviewSrc(image);
  const displayFilename = pendingFilename ?? image.filename;

  function handleLibrarySelect(item: MediaGalleryItem) {
    setError(null);

    if (item.source === "upload") {
      const versionMatch = item.url.match(/[?&]v=(\d+)/);
      const nextImage = applyUploadedMediaToImage(sourceImageRef.current, {
        mediaId: item.id,
        src: item.url,
        ...(versionMatch ? { mediaVersion: Number(versionMatch[1]) } : {}),
        filename: item.label,
        alt: {
          en: item.label || getImageAltEn(sourceImageRef.current),
          ar: getImageAltAr(sourceImageRef.current),
        },
      });
      onImageChange(nextImage);
      clearInstantPreview();
      setPendingFilename(item.label);
      return;
    }

    onImageChange({
      ...sourceImageRef.current,
      src: item.url,
      alt: item.label || sourceImageRef.current.alt,
      localizedAlt: {
        en: item.label || getImageAltEn(sourceImageRef.current),
        ar: getImageAltAr(sourceImageRef.current),
      },
      filename: item.label,
      mediaId: undefined,
      mediaVersion: undefined,
    });
    clearInstantPreview();
    setPendingFilename(item.label);
  }

  return (
    <>
      <CmsPanelCard title={label}>
        <div className="space-y-4">
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-[#0c1524]/52 uppercase">
              Current Image
            </p>
            <div className="relative mt-3 overflow-hidden rounded-2xl border border-[#0c1524]/10 bg-[#f7f8fa]">
              {previewSrc ? (
                <img
                  src={previewSrc}
                  alt={getImageAltEn(image) || label}
                  className="max-h-56 min-h-40 w-full object-contain"
                />
              ) : (
                <div className="flex min-h-40 items-center justify-center text-[#0c1524]/45">
                  <Images className="size-8" />
                </div>
              )}
              {isUploading ? (
                <div className="absolute inset-x-0 bottom-0 bg-[#0c1524]/72 px-3 py-2 text-center text-xs font-medium text-white">
                  Uploading image...
                </div>
              ) : null}
            </div>
            {displayFilename ? (
              <p className="mt-2 text-sm text-[#0c1524]/56">{displayFilename}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id={inputId}
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (file) {
                  void handleFileSelected(file);
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              className="h-11 flex-1 rounded-2xl"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              Replace Image
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 flex-1 rounded-2xl"
              disabled={isUploading}
              onClick={() => setLibraryOpen(true)}
            >
              Choose from Media Library
            </Button>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <CmsPanelField
            label="Alt Text (English)"
            value={getImageAltEn(image)}
            onChange={(value) =>
              onImageChange(patchImageLocalizedAlt(image, "en", value))
            }
          />
          <CmsPanelField
            label="Alt Text (Arabic)"
            value={getImageAltAr(image)}
            onChange={(value) =>
              onImageChange(patchImageLocalizedAlt(image, "ar", value))
            }
          />
        </div>
      </CmsPanelCard>

      <CmsMediaLibrarySheet
        open={libraryOpen}
        onOpenChange={setLibraryOpen}
        selectedUrl={previewSrc}
        onSelect={handleLibrarySelect}
      />
    </>
  );
}
