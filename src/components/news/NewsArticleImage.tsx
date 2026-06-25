import type { ImageAsset } from "@/types";
import { cn } from "@/lib/utils";

export interface NewsArticleImageProps {
  image: ImageAsset;
  variant?: "card" | "detail" | "gallery" | "featured";
  priority?: boolean;
  className?: string;
  frameClassName?: string;
}

const frameVariants = {
  card: "aspect-[4/3] sm:aspect-[16/11]",
  detail: "min-h-[12rem] px-3 py-4 sm:min-h-[16rem] sm:px-4 sm:py-5 lg:min-h-[18rem]",
  gallery: "min-h-[10rem] px-2 py-3 sm:min-h-[12rem] sm:px-3 sm:py-4",
  featured: "aspect-[16/10] px-3 py-4 lg:aspect-[16/9] lg:px-4 lg:py-5",
};

const imageVariants = {
  card: "h-full w-full",
  detail: "max-h-[min(26rem,65vh)] w-full",
  gallery: "max-h-64 w-full sm:max-h-72",
  featured: "h-full w-full",
};

export function NewsArticleImage({
  image,
  variant = "detail",
  priority = false,
  className,
  frameClassName,
}: NewsArticleImageProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden bg-[#f4f3f2]",
        variant === "card" ? "rounded-t-xl" : "rounded-xl border border-[#0c1524]/8",
        frameVariants[variant],
        frameClassName,
      )}
    >
      <img
        src={image.src}
        alt={image.alt}
        className={cn(
          "object-contain object-center",
          imageVariants[variant],
          className,
        )}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
      />
    </div>
  );
}
