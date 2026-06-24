import type { CSSProperties } from "react";
import type { ImageAsset } from "@/types";
import { useHeroSlideshow } from "@/hooks";
import { cn } from "@/lib/utils";

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
        className="absolute inset-0 bg-muted"
        aria-hidden
      />
    );
  }

  return (
    <div className="absolute inset-0" aria-hidden>
      {images.map((image, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={image.src}
            className="absolute inset-0 overflow-hidden"
            style={{
              opacity: isActive ? 1 : 0,
              transition: `opacity ${fadeDurationMs}ms ease-in-out`,
              zIndex: isActive ? 1 : 0,
            }}
          >
            <img
              key={shouldAnimate && isActive ? `active-${activeIndex}` : image.src}
              src={image.src}
              alt=""
              decoding="async"
              fetchPriority={index === 0 ? "high" : "low"}
              className={cn(
                "size-full object-cover object-center",
                shouldAnimate && isActive && "hero-ken-burns",
              )}
              style={
                shouldAnimate && isActive
                  ? ({
                      "--hero-slide-duration": `${intervalMs}ms`,
                    } as CSSProperties)
                  : undefined
              }
            />
          </div>
        );
      })}

      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-background/90 via-background/50 to-background/10" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background/25 via-transparent to-background/10" />

      <p className="sr-only" aria-live="polite">
        {prefersReducedMotion
          ? "Background slideshow paused"
          : `Showing slide ${activeIndex + 1} of ${images.length}`}
      </p>
    </div>
  );
}
