import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

export const HERO_SLIDE_INTERVAL_MS = 7000;
export const HERO_SLIDE_FADE_MS = 2000;
export const HERO_KEN_BURNS_MS = 4600;

export interface UseHeroSlideshowOptions {
  slideCount: number;
  intervalMs?: number;
  enabled?: boolean;
}

export function useHeroSlideshow({
  slideCount,
  intervalMs = HERO_SLIDE_INTERVAL_MS,
  enabled = true,
}: UseHeroSlideshowOptions) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const shouldAnimate = enabled && slideCount > 1 && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldAnimate) {
      setActiveIndex(0);
      return;
    }

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slideCount);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs, shouldAnimate, slideCount]);

  return {
    activeIndex,
    prefersReducedMotion,
    fadeDurationMs: prefersReducedMotion ? 0 : HERO_SLIDE_FADE_MS,
    shouldAnimate,
  };
}
