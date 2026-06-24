import { cn } from "@/lib/utils";

/** Tailwind animate-in utility presets (tw-animate-css) */
export const animationPresets = {
  fadeIn: "animate-in fade-in duration-300 fill-mode-both",
  fadeInUp: "animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both",
  fadeInDown: "animate-in fade-in slide-in-from-top-4 duration-500 fill-mode-both",
  fadeInLeft: "animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both",
  fadeInRight: "animate-in fade-in slide-in-from-right-4 duration-500 fill-mode-both",
  scaleIn: "animate-in fade-in zoom-in-95 duration-300 fill-mode-both",
} as const;

export type AnimationPreset = keyof typeof animationPresets;

export function getAnimationClass(
  preset: AnimationPreset,
  options?: { delay?: number; className?: string },
) {
  return cn(
    animationPresets[preset],
    options?.delay && `delay-[${options.delay}ms]`,
    options?.className,
  );
}

/** CSS transition utility for interactive elements */
export const transitionPresets = {
  default: "transition-all duration-300 ease-in-out",
  colors: "transition-colors duration-200 ease-in-out",
  transform: "transition-transform duration-300 ease-out",
  opacity: "transition-opacity duration-200 ease-in-out",
} as const;
