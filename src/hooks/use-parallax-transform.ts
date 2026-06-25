import { useEffect, useRef, useState } from "react";

export interface UseParallaxTransformOptions {
  /** Parallax intensity — higher values move the background more relative to scroll */
  speed?: number;
  disabled?: boolean;
}

export function useParallaxTransform({
  speed = 0.35,
  disabled = false,
}: UseParallaxTransformOptions = {}) {
  const containerRef = useRef<HTMLElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    if (disabled) return;

    const element = containerRef.current;
    if (!element) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = element.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      setTranslateY(distanceFromCenter * -speed);
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
    };
  }, [speed, disabled]);

  return { containerRef, translateY };
}
