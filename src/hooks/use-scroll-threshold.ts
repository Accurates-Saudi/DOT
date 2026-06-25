import { useEffect, useLayoutEffect, useState } from "react";

export interface UseScrollThresholdOptions {
  threshold?: number;
  enabled?: boolean;
}

export function useScrollThreshold({
  threshold = 48,
  enabled = true,
}: UseScrollThresholdOptions = {}) {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useLayoutEffect(() => {
    if (!enabled) {
      setIsPastThreshold(false);
      return;
    }

    setIsPastThreshold(window.scrollY > threshold);
  }, [enabled, threshold]);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      setIsPastThreshold(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled, threshold]);

  return isPastThreshold;
}
