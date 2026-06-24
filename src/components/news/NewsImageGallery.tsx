import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";

export interface NewsImageGalleryProps {
  images: ImageAsset[];
  className?: string;
}

export function NewsImageGallery({ images, className }: NewsImageGalleryProps) {
  if (images.length === 0) return null;

  return (
    <section
      aria-label="Additional images"
      className={cn("mt-8 border-t border-[#0c1524]/8 pt-8 sm:mt-9 sm:pt-9", className)}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
        <h2 className="text-[0.6875rem] font-bold tracking-[0.2em] text-[#F68E05] uppercase sm:text-xs">
          Gallery
        </h2>
      </div>

      <ul
        className={cn(
          "grid list-none gap-4 sm:gap-5",
          images.length === 1
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2",
          images.length >= 3 && "lg:grid-cols-3",
        )}
      >
        {images.map((image, index) => (
          <li key={`${image.src}-${index}`}>
            <div className="overflow-hidden rounded-xl bg-[#f4f3f2]">
              <img
                src={image.src}
                alt={image.alt}
                className="aspect-[4/3] w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
