import type { Ref } from "react";

export interface ParallaxBackgroundImageProps {
  src: string;
  targetRef: Ref<HTMLImageElement>;
  priority?: boolean;
}

export function ParallaxBackgroundImage({
  src,
  targetRef,
  priority = false,
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
        className="absolute left-0 w-full min-h-[170%] object-cover object-center will-change-transform -top-[35%]"
      />
    </div>
  );
}
