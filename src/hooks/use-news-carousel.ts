import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

function getSlidesPerView(width: number) {
  if (width < 640) return 1;
  if (width < 900) return 2;
  return 3;
}

export function useNewsCarousel(itemCount: number) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const [slidesPerView, setSlidesPerView] = useState(3);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [slideStride, setSlideStride] = useState(0);

  const indexRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);

  const clones = slidesPerView;
  const canScroll = itemCount > slidesPerView;
  const startIndex = clones;

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    setSlidesPerView(getSlidesPerView(viewport.clientWidth));

    const firstSlide = viewport.querySelector<HTMLElement>("[data-news-slide]");
    if (!firstSlide) return;

    const track = viewport.querySelector<HTMLElement>("[data-news-track]");
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

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!canScroll) return;

      setIsDragging(true);
      setIsAnimating(false);
      dragStartXRef.current = event.clientX;
      dragOffsetRef.current = 0;
      setDragOffset(0);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [canScroll],
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

  const translateX = canScroll ? -(index * slideStride) + dragOffset : 0;

  return {
    viewportRef,
    slidesPerView,
    clones,
    canScroll,
    translateX,
    isAnimating,
    isDragging,
    next,
    prev,
    handleTransitionEnd,
    pointerHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: finishDrag,
      onPointerCancel: finishDrag,
    },
  };
}
