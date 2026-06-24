import type { CSSProperties } from "react";
import type { ImageAsset } from "@/types";
import { useHeroSlideshow } from "@/hooks";
import { cn } from "@/lib/utils";

const KEN_BURNS_DURATION_MS = 5500;

interface HeroBackgroundProps {
  images: ImageAsset[];
  intervalMs?: number;
}

export function HeroBackground({ images, intervalMs = 7000 }: HeroBackgroundProps) {
  const { activeIndex, prefersReducedMotion, fadeDurationMs, shouldAnimate } =
    useHeroSlideshow({
      slideCount: images.length,
      intervalMs,
    });

  if (images.length === 0) {
    return (
      <div
        className="absolute inset-0 bg-[#0a1219]"
        aria-hidden
      />
    );
  }

  return (
    <div className="absolute inset-0 bg-[#0a1219]" aria-hidden>
      {images.map((image, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={image.src}
            className="absolute inset-0 overflow-hidden"
            style={{
              opacity: isActive ? 1 : 0,
              transition: `opacity ${fadeDurationMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              zIndex: isActive ? 2 : 1,
            }}
          >
            <img
              src={image.src}
              alt=""
              decoding="async"
              fetchPriority={index === 0 ? "high" : "low"}
              className={cn(
                "size-full object-cover object-center",
                shouldAnimate && "hero-ken-burns",
              )}
              style={
                shouldAnimate
                  ? ({
                      "--hero-slide-duration": `${KEN_BURNS_DURATION_MS}ms`,
                      animationDelay: `${index * 1.75}s`,
                    } as CSSProperties)
                  : undefined
              }
            />
          </div>
        );
      })}

      <div className="absolute inset-0 z-[3] bg-gradient-to-r from-[#0b1520]/80 via-[#0b1520]/45 to-transparent" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#0b1520]/50 via-transparent to-[#0b1520]/15" />

      <p className="sr-only" aria-live="polite">
        {prefersReducedMotion
          ? "Background slideshow paused"
          : `Showing slide ${activeIndex + 1} of ${images.length}`}
      </p>
    </div>
  );
}
