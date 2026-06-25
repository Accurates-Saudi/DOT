import { cn } from "@/lib/utils";

/** Scroll-reveal props for fade + upward translate (GPU-accelerated). */
export function getRevealProps(
  isVisible: boolean,
  delayMs = 0,
  className?: string,
) {
  return {
    className: cn(
      "transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
      className,
    ),
    style: { transitionDelay: isVisible ? `${delayMs}ms` : "0ms" },
  };
}
