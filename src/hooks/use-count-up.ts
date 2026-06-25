import { useEffect, useRef, useState } from "react";

export interface UseCountUpOptions {
  target: number;
  isActive: boolean;
  durationMs?: number;
  disabled?: boolean;
}

export function useCountUp({
  target,
  isActive,
  durationMs = 2000,
  disabled = false,
}: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    if (disabled) {
      setValue(target);
      hasAnimatedRef.current = true;
      return;
    }

    if (hasAnimatedRef.current) return;

    let startTime: number | null = null;
    let rafId = 0;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        setValue(target);
        hasAnimatedRef.current = true;
      }
    };

    setValue(0);
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [target, isActive, durationMs, disabled]);

  return value;
}
