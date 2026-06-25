export const ANIMATION_DURATION = {
  instant: 0,
  fast: 200,
  normal: 280,
  slow: 500,
  slower: 600,
} as const;

export const ANIMATION_EASING = {
  default: "cubic-bezier(0, 0, 0.2, 1)",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export const STAGGER_DELAY = {
  sm: 50,
  md: 100,
  lg: 150,
} as const;
