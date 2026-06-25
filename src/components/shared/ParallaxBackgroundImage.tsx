import type { Ref } from "react";

export interface ParallaxBackgroundImageProps {
  src: string;
  targetRef: Ref<HTMLImageElement>;
  priority?: boolean;
  /** Focal point when the image is cropped — useful for ultra-wide panoramas */
  objectPosition?: string;
}

export function ParallaxBackgroundImage({
  src,
  targetRef,
  priority = false,
  objectPosition = "center",
}: ParallaxBackgroundImageProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#0c1524]"
      aria-hidden
    >
      <img
        ref={targetRef}
        src={src}
        alt=""
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="absolute top-1/2 left-1/2 h-[125%] w-auto min-w-full max-w-none -translate-x-1/2 -translate-y-1/2 object-cover will-change-transform"
        style={{ objectPosition }}
      />
    </div>
  );
}
