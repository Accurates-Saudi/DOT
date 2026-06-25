import { cn } from "@/lib/utils";

/** Scroll-reveal props — subtle fade + 12px upward translate. */
export function getRevealProps(
  isVisible: boolean,
  delayMs = 0,
  className?: string,
) {
  return {
    className: cn(
      "transition-[opacity,transform] duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      className,
    ),
    style: { transitionDelay: isVisible ? `${delayMs}ms` : "0ms" },
  };
}
