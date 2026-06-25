import { useMemo } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { ClientLogoItem } from "@/types";
import { cn } from "@/lib/utils";

import { ClientLogo } from "./ClientLogo";

export interface ClientLogoMarqueeProps {
  logos: ClientLogoItem[];
  isVisible: boolean;
  durationMs?: number;
}

export function ClientLogoMarquee({
  logos,
  isVisible,
  durationMs = 48000,
}: ClientLogoMarqueeProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const marqueeItems = useMemo(
    () => [...logos, ...logos],
    [logos],
  );

  if (prefersReducedMotion) {
    return (
      <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-12">
        {logos.map((item, index) => (
          <ClientLogo
            key={item.id}
            item={item}
            revealClassName={cn(
              "transition-[opacity,transform] duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
            revealStyle={{
              transitionDelay: isVisible ? `${index * 70}ms` : "0ms",
            }}
          />
        ))}
      </ul>
    );
  }

  return (
    <div
      className="trusted-partners-marquee relative"
      role="region"
      aria-label="Industry partner logos"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#f9f8f7] via-[#f9f8f7]/80 to-transparent sm:w-20 lg:w-28"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#f9f8f7] via-[#f9f8f7]/80 to-transparent sm:w-20 lg:w-28"
        aria-hidden
      />

      <div
        className={cn(
          "overflow-hidden transition-opacity duration-700 ease-out",
          isVisible ? "opacity-100" : "opacity-0",
        )}
      >
        <ul
          className="trusted-partners-marquee-track flex w-max items-center gap-12 px-4 sm:gap-16 sm:px-6 lg:gap-20"
          style={{ animationDuration: `${durationMs}ms` }}
        >
          {marqueeItems.map((item, index) => (
            <ClientLogo
              key={`${item.id}-${index}`}
              item={item}
              hiddenFromAssistiveTech={index >= logos.length}
              revealClassName={cn(
                "transition-opacity duration-500 ease-out",
                isVisible ? "opacity-100" : "opacity-0",
              )}
              revealStyle={{
                transitionDelay: isVisible
                  ? `${Math.min(index, logos.length - 1) * 60}ms`
                  : "0ms",
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
