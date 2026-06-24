import { useEffect, useState } from "react";

export interface UseScrollThresholdOptions {
  threshold?: number;
  enabled?: boolean;
}

export function useScrollThreshold({
  threshold = 48,
  enabled = true,
}: UseScrollThresholdOptions = {}) {
  const [isPastThreshold, setIsPastThreshold] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setIsPastThreshold(false);
      return;
    }

    const handleScroll = () => {
      setIsPastThreshold(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled, threshold]);

  return isPastThreshold;
}
