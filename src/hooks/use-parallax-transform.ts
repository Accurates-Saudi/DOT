import { useLayoutEffect, useRef } from "react";

export type ParallaxMode = "viewport" | "scroll";

export interface UseParallaxTransformOptions {
  /** Parallax intensity — higher values move the background more relative to scroll */
  speed?: number;
  disabled?: boolean;
  /** viewport: shift relative to viewport center (mid-page sections). scroll: shift with page scroll (page heroes). */
  mode?: ParallaxMode;
}

export function useParallaxTransform({
  speed = 0.35,
  disabled = false,
  mode = "viewport",
}: UseParallaxTransformOptions = {}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (disabled) return;

    const element = containerRef.current;
    const target = targetRef.current;
    if (!element || !target) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = element.getBoundingClientRect();
      const maxShift = element.offsetHeight * 0.4;

      let translateY: number;
      if (mode === "scroll") {
        translateY = window.scrollY * -speed;
      } else {
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = elementCenter - viewportCenter;
        translateY = distanceFromCenter * -speed;
      }

      translateY = Math.max(-maxShift, Math.min(maxShift, translateY));
      target.style.transform = `translate3d(0, ${translateY}px, 0)`;
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId) cancelAnimationFrame(rafId);
      target.style.transform = "";
    };
  }, [speed, disabled, mode]);

  return { containerRef, targetRef };
}
