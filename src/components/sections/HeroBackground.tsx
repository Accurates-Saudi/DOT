import type { CSSProperties } from "react";

import type { ImageAsset } from "@/types";
import { HERO_KEN_BURNS_MS } from "@/hooks/use-hero-slideshow";
import { useNumberFormat } from "@/i18n/hooks";
import { cn } from "@/lib/utils";

interface HeroBackgroundProps {
  images: ImageAsset[];
  activeIndex: number;
  fadeDurationMs: number;
  shouldAnimate: boolean;
  prefersReducedMotion: boolean;
}

export function HeroBackground({
  images,
  activeIndex,
  fadeDurationMs,
  shouldAnimate,
  prefersReducedMotion,
}: HeroBackgroundProps) {
  const { formatNumber } = useNumberFormat();

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
            className="absolute inset-0 overflow-hidden rtl:-scale-x-100"
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
                "hero-cover-image size-full object-cover",
                shouldAnimate && "hero-ken-burns",
              )}
              style={
                {
                  "--hero-object-pos": image.objectPosition ?? "center",
                  "--hero-object-pos-mobile":
                    image.mobileObjectPosition ??
                    image.objectPosition ??
                    "center",
                  ...(shouldAnimate
                    ? {
                        "--hero-slide-duration": `${HERO_KEN_BURNS_MS}ms`,
                        animationDelay: `${index * 1.5}s`,
                      }
                    : {}),
                } as CSSProperties
              }
            />
          </div>
        );
      })}

      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-[#0b1520]/75 via-[#0b1520]/55 to-[#0b1520]/80 lg:bg-gradient-to-r lg:from-[#0b1520]/80 lg:via-[#0b1520]/45 lg:to-transparent rtl:lg:bg-gradient-to-l" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-[#0b1520]/60 via-transparent to-[#0b1520]/20 lg:from-[#0b1520]/50 lg:to-[#0b1520]/15" />

      <p className="sr-only" aria-live="polite">
        {prefersReducedMotion
          ? "Background slideshow paused"
          : `Showing slide ${formatNumber(activeIndex + 1)} of ${formatNumber(images.length)}`}
      </p>
    </div>
  );
}
