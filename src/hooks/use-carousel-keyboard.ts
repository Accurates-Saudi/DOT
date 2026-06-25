import { useEffect, type RefObject } from "react";

export interface UseCarouselKeyboardOptions {
  enabled: boolean;
  onPrev: () => void;
  onNext: () => void;
  pauseAutoplay?: () => void;
  label?: string;
}

export function useCarouselKeyboard(
  viewportRef: RefObject<HTMLElement | null>,
  {
    enabled,
    onPrev,
    onNext,
    pauseAutoplay,
    label = "Carousel",
  }: UseCarouselKeyboardOptions,
) {
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !enabled) return;

    viewport.setAttribute("tabindex", "0");
    viewport.setAttribute("role", "region");
    viewport.setAttribute("aria-label", label);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        pauseAutoplay?.();
        onPrev();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        pauseAutoplay?.();
        onNext();
      }
    };

    viewport.addEventListener("keydown", handleKeyDown);
    return () => viewport.removeEventListener("keydown", handleKeyDown);
  }, [enabled, label, onNext, onPrev, pauseAutoplay, viewportRef]);
}
