import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

const RESUME_AUTOPLAY_MS = 2500;
const SCROLL_SPEED_PX_PER_SEC = 36;
const ARROW_TRANSITION_MS = 520;

function getSlidesPerView(width: number) {
  if (width < 420) return 1;
  if (width < 620) return 2;
  return 3;
}

export interface UseCertificatesCarouselOptions {
  itemCount: number;
  /** @deprecated Continuous scroll ignores step delays */
  autoplayDelayMs?: number;
  /** Used for arrow-key / button nudges */
  transitionMs?: number;
}

export function useCertificatesCarousel({
  itemCount,
  transitionMs = ARROW_TRANSITION_MS,
}: UseCertificatesCarouselOptions) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);

  const [slidesPerView, setSlidesPerView] = useState(3);
  const [offset, setOffset] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [slideStride, setSlideStride] = useState(0);
  const [setWidth, setSetWidth] = useState(0);

  const offsetRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const resumeTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);

  const canScroll = itemCount > slidesPerView;

  const pauseAutoplay = useCallback(() => {
    setIsAutoplayPaused(true);
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const resumeAutoplay = useCallback(() => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    setIsAutoplayPaused(false);
  }, []);

  const pauseAutoplayTemporarily = useCallback(() => {
    setIsAutoplayPaused(true);
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      setIsAutoplayPaused(false);
      resumeTimerRef.current = null;
    }, RESUME_AUTOPLAY_MS);
  }, []);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    setSlidesPerView(getSlidesPerView(viewport.clientWidth));

    const slides = viewport.querySelectorAll<HTMLElement>(
      "[data-certificate-slide]",
    );
    if (slides.length === 0) return;

    const track = viewport.querySelector<HTMLElement>(
      "[data-certificate-track]",
    );
    const gap = track
      ? Number.parseFloat(window.getComputedStyle(track).gap || "0") || 0
      : 0;

    const firstSlide = slides[0];
    const stride = firstSlide.offsetWidth + gap;
    setSlideStride(stride);

    const originals = Math.min(itemCount, slides.length / 2);
    const measuredSetWidth = stride * originals;
    setSetWidth(measuredSetWidth > 0 ? measuredSetWidth : 0);
  }, [itemCount]);

  const normalizeOffset = useCallback(
    (value: number) => {
      if (setWidth <= 0) return value;
      let next = value % setWidth;
      if (next < 0) next += setWidth;
      return next;
    },
    [setWidth],
  );

  const commitOffset = useCallback(
    (value: number) => {
      const normalized = normalizeOffset(value);
      offsetRef.current = normalized;
      setOffset(normalized);
    },
    [normalizeOffset],
  );

  const nudge = useCallback(
    (direction: 1 | -1) => {
      if (!canScroll || slideStride <= 0) return;

      pauseAutoplayTemporarily();
      setIsAnimating(true);
      commitOffset(offsetRef.current + direction * slideStride);

      window.setTimeout(() => setIsAnimating(false), transitionMs);
    },
    [canScroll, commitOffset, pauseAutoplayTemporarily, slideStride, transitionMs],
  );

  const next = useCallback(() => nudge(1), [nudge]);
  const prev = useCallback(() => nudge(-1), [nudge]);

  useEffect(() => {
    measure();

    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [measure, itemCount, slidesPerView]);

  useEffect(() => {
    if (
      !canScroll ||
      prefersReducedMotion ||
      isAutoplayPaused ||
      isDragging ||
      setWidth <= 0
    ) {
      lastFrameRef.current = null;
      return;
    }

    const tick = (timestamp: number) => {
      if (isAutoplayPaused || isDragging) {
        lastFrameRef.current = null;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (lastFrameRef.current === null) {
        lastFrameRef.current = timestamp;
      } else {
        const deltaSec = (timestamp - lastFrameRef.current) / 1000;
        lastFrameRef.current = timestamp;
        commitOffset(offsetRef.current + SCROLL_SPEED_PX_PER_SEC * deltaSec);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastFrameRef.current = null;
    };
  }, [
    canScroll,
    commitOffset,
    isAutoplayPaused,
    isDragging,
    prefersReducedMotion,
    setWidth,
  ]);

  useEffect(
    () => () => {
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
      }
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    },
    [],
  );

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!canScroll) return;

      pauseAutoplayTemporarily();
      setIsDragging(true);
      setIsAnimating(false);
      dragStartXRef.current = event.clientX;
      dragOffsetRef.current = 0;
      setDragOffset(0);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [canScroll, pauseAutoplayTemporarily],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!isDragging || !canScroll) return;

      const delta = event.clientX - dragStartXRef.current;
      dragOffsetRef.current = delta;
      setDragOffset(delta);
    },
    [canScroll, isDragging],
  );

  const finishDrag = useCallback(() => {
    if (!isDragging || !canScroll) return;

    setIsDragging(false);
    commitOffset(offsetRef.current - dragOffsetRef.current);
    dragOffsetRef.current = 0;
    setDragOffset(0);
  }, [canScroll, commitOffset, isDragging]);

  const translateX = canScroll ? -(offset + dragOffset) : 0;

  return {
    viewportRef,
    slidesPerView,
    clones: 0,
    canScroll,
    translateX,
    isAnimating,
    isDragging,
    transitionMs,
    next,
    prev,
    pauseAutoplay: pauseAutoplayTemporarily,
    resumeAutoplay,
    handleTransitionEnd: undefined,
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finishDrag,
      onPointerCancel: finishDrag,
    },
  };
}
