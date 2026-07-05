import { Images, Loader2, Upload } from "lucide-react";
import { useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { CmsMediaLibrarySheet } from "@/components/cms/CmsMediaLibrarySheet";
import { CmsPanelCard, CmsPanelField } from "@/components/cms/CmsPanelPrimitives";
import { cn } from "@/lib/utils";
import { cmsClient, CmsApiError } from "@/sdk/cms";
import type { ImageAsset } from "@/types";
import {
  applyUploadedMediaToImage,
  getImageAltAr,
  getImageAltEn,
  patchImageLocalizedAlt,
  readImageDimensions,
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);

  async function handleFileSelected(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(12);

    try {
      const dimensions = await readImageDimensions(file);
      setUploadProgress(35);

      const alt = {
        en: getImageAltEn(image),
        ar: getImageAltAr(image),
      };

      const media = image.mediaId
        ? await cmsClient.media.replace(image.mediaId, {
            file,
            fileName: file.name,
            ...dimensions,
            alt,
          })
        : await cmsClient.media.upload({
            key: mediaKey,
            file,
            fileName: file.name,
            ...dimensions,
            alt,
          });

      setUploadProgress(85);

      const uploadedVersion = media.currentVersion;
      if (!uploadedVersion) {
        throw new Error("Uploaded media is missing version details.");
      }

      onImageChange(
        applyUploadedMediaToImage(image, {
          mediaId: media.id,
          src: uploadedVersion.url,
          filename: uploadedVersion.filename,
          width: uploadedVersion.width,
          height: uploadedVersion.height,
          alt: uploadedVersion.alt ?? alt,
        }),
      );

      setUploadProgress(100);
    } catch (uploadError) {
      setError(
        uploadError instanceof CmsApiError
          ? uploadError.message
          : uploadError instanceof Error
            ? uploadError.message
            : "Unable to upload this image right now.",
      );
    } finally {
      window.setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(null);
      }, 250);
    }
  }

  return (
    <>
      <CmsPanelCard title={label}>
        <div className="space-y-4">
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-[#0c1524]/52 uppercase">
              Current Image
            </p>
            <div className="mt-3 overflow-hidden rounded-2xl border border-[#0c1524]/10 bg-white">
              {image.src ? (
                <img
                  src={image.src}
                  alt={getImageAltEn(image) || label}
                  className="max-h-56 w-full object-contain"
                />
              ) : (
                <div className="flex min-h-40 items-center justify-center bg-[#f7f8fa] text-[#0c1524]/45">
                  <Images className="size-8" />
                </div>
              )}
            </div>
            {image.filename ? (
              <p className="mt-2 text-sm text-[#0c1524]/56">{image.filename}</p>
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

          {isUploading ? (
            <div className="space-y-2">
              <div className="h-2 overflow-hidden rounded-full bg-[#0c1524]/8">
                <div
                  className={cn(
                    "h-full rounded-full bg-[var(--dot-orange)] transition-all duration-300",
                    uploadProgress === null && "w-1/3 animate-pulse",
                  )}
                  style={
                    uploadProgress !== null
                      ? { width: `${uploadProgress}%` }
                      : undefined
                  }
                />
              </div>
              <p className="text-sm text-[#0c1524]/56">Uploading image...</p>
            </div>
          ) : null}

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

      <CmsMediaLibrarySheet open={libraryOpen} onOpenChange={setLibraryOpen} />
    </>
  );
}
