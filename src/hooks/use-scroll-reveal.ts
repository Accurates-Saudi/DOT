import { useEffect, useRef, useState } from "react";

import { getRevealProps } from "@/lib/animations/reveal";

import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

export interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {},
) {
  const { threshold = 0.08, rootMargin = "0px 0px -4% 0px" } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [prefersReducedMotion, threshold, rootMargin]);

  const revealProps = (delayMs = 0, className?: string) =>
    getRevealProps(isVisible, delayMs, className);

  return { ref, isVisible, revealProps };
}
