import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";

export interface ProductGalleryProps {
  heading: string;
  images: ImageAsset[];
  className?: string;
}

export function ProductGallery({
  heading,
  images,
  className,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState<ImageAsset | null>(null);

  const close = useCallback(() => setActiveImage(null), []);

  useEffect(() => {
    if (!activeImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage, close]);

  return (
    <>
      <div className={className}>
        <h2 className="text-xl font-bold text-[#0c1524] sm:text-2xl">
          {heading}
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {images.map((image, index) => (
            <li key={`${image.src}-${index}`}>
              <button
                type="button"
                onClick={() => setActiveImage(image)}
                className="group w-full overflow-hidden rounded-2xl border border-[#0c1524]/8 bg-white p-1.5 text-left transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-24px_rgba(12,21,36,0.16)] sm:p-2"
                aria-label={`Expand image: ${image.alt}`}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-[0.75rem] sm:rounded-xl">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="size-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c1524]/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded product image"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close expanded image"
          >
            <X className="size-5" />
          </button>
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className={cn(
              "max-h-[85vh] max-w-full rounded-xl object-contain shadow-2xl",
            )}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
