import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

const RESUME_AUTOPLAY_MS = 2500;

function getSlidesPerView(width: number) {
  if (width < 420) return 1;
  if (width < 620) return 2;
  return 3;
}

export interface UseCertificatesCarouselOptions {
  itemCount: number;
  autoplayDelayMs?: number;
  transitionMs?: number;
}

export function useCertificatesCarousel({
  itemCount,
  autoplayDelayMs = 2000,
  transitionMs = 800,
}: UseCertificatesCarouselOptions) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);

  const [slidesPerView, setSlidesPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [slideStride, setSlideStride] = useState(0);
  const [autoplayTick, setAutoplayTick] = useState(0);

  const indexRef = useRef(0);
  const isPausedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const resumeTimerRef = useRef<number | null>(null);
  const autoplayTimerRef = useRef<number | null>(null);

  const clones = slidesPerView;
  const canScroll = itemCount > slidesPerView;
  const startIndex = clones;

  const pauseAutoplay = useCallback(() => {
    isPausedRef.current = true;
    if (autoplayTimerRef.current !== null) {
      window.clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      isPausedRef.current = false;
      resumeTimerRef.current = null;
      setAutoplayTick((tick) => tick + 1);
    }, RESUME_AUTOPLAY_MS);
  }, []);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    setSlidesPerView(getSlidesPerView(viewport.clientWidth));

    const firstSlide = viewport.querySelector<HTMLElement>(
      "[data-certificate-slide]",
    );
    if (!firstSlide) return;

    const track = viewport.querySelector<HTMLElement>(
      "[data-certificate-track]",
    );
    const gap = track
      ? Number.parseFloat(window.getComputedStyle(track).gap || "0") || 0
      : 0;

    setSlideStride(firstSlide.offsetWidth + gap);
  }, []);

  const goTo = useCallback(
    (nextIndex: number, animate = true) => {
      if (!canScroll) return;

      setIsAnimating(animate);
      setDragOffset(0);
      dragOffsetRef.current = 0;
      indexRef.current = nextIndex;
      setIndex(nextIndex);
    },
    [canScroll],
  );

  const next = useCallback(() => {
    if (!canScroll) return;
    goTo(indexRef.current + 1);
  }, [canScroll, goTo]);

  const prev = useCallback(() => {
    if (!canScroll) return;
    goTo(indexRef.current - 1);
  }, [canScroll, goTo]);

  const handleTransitionEnd = useCallback(() => {
    if (!canScroll) return;

    const current = indexRef.current;
    const maxRealIndex = clones + itemCount - 1;

    if (current > maxRealIndex) {
      goTo(clones, false);
      return;
    }

    if (current < clones) {
      goTo(maxRealIndex, false);
    }
  }, [canScroll, clones, itemCount, goTo]);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    if (!canScroll) {
      setIndex(0);
      indexRef.current = 0;
      return;
    }

    setIndex(startIndex);
    indexRef.current = startIndex;
  }, [canScroll, startIndex, slidesPerView, itemCount]);

  useEffect(() => {
    measure();

    const viewport = viewportRef.current;
    if (!viewport) return;

    const observer = new ResizeObserver(() => measure());
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [measure, itemCount, slidesPerView]);

  useEffect(() => {
    if (!canScroll || prefersReducedMotion || isPausedRef.current || isDragging) {
      return;
    }

    autoplayTimerRef.current = window.setTimeout(next, autoplayDelayMs);
    return () => {
      if (autoplayTimerRef.current !== null) {
        window.clearTimeout(autoplayTimerRef.current);
        autoplayTimerRef.current = null;
      }
    };
  }, [
    autoplayDelayMs,
    autoplayTick,
    canScroll,
    index,
    isDragging,
    next,
    prefersReducedMotion,
  ]);

  useEffect(
    () => () => {
      if (resumeTimerRef.current !== null) {
        window.clearTimeout(resumeTimerRef.current);
      }
      if (autoplayTimerRef.current !== null) {
        window.clearTimeout(autoplayTimerRef.current);
      }
    },
    [],
  );

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!canScroll) return;

      pauseAutoplay();
      setIsDragging(true);
      setIsAnimating(false);
      dragStartXRef.current = event.clientX;
      dragOffsetRef.current = 0;
      setDragOffset(0);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [canScroll, pauseAutoplay],
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
    setIsAnimating(true);

    const threshold = slideStride * 0.18;
    const delta = dragOffsetRef.current;

    if (delta <= -threshold) {
      next();
    } else if (delta >= threshold) {
      prev();
    } else {
      setDragOffset(0);
      dragOffsetRef.current = 0;
    }
  }, [canScroll, isDragging, next, prev, slideStride]);

  const onPointerUp = useCallback(() => {
    finishDrag();
  }, [finishDrag]);

  const onPointerCancel = useCallback(() => {
    finishDrag();
  }, [finishDrag]);

  const translateX = canScroll ? -(index * slideStride) + dragOffset : 0;

  return {
    viewportRef,
    slidesPerView,
    clones,
    canScroll,
    translateX,
    isAnimating,
    isDragging,
    transitionMs,
    next,
    prev,
    pauseAutoplay,
    handleTransitionEnd,
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
    },
  };
}
