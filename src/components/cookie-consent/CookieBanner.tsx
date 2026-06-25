import { useEffect, useRef } from "react";

import { Container } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useCookieConsentCopy } from "@/i18n/content/hooks";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export function CookieBanner() {
  const {
    showBanner,
    acceptAll,
    rejectNonEssential,
    openPreferences,
  } = useCookieConsent();
  const copy = useCookieConsentCopy();
  const prefersReducedMotion = usePrefersReducedMotion();
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showBanner) {
      bannerRef.current?.focus();
    }
  }, [showBanner]);

  if (!showBanner) return null;

  return (
    <div
      ref={bannerRef}
      tabIndex={-1}
      role="region"
      aria-label={copy.regionAria}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-[60] outline-none",
        !prefersReducedMotion &&
          "animate-in fade-in-0 slide-in-from-bottom-4 duration-500",
      )}
    >
      <Container size="wide" className="pointer-events-auto px-4 pb-4 sm:px-6 sm:pb-5">
        <div className="rounded-2xl border border-[#0c1524]/10 bg-white p-4 shadow-[0_20px_60px_-24px_rgba(12,21,36,0.35)] sm:p-5 lg:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="min-w-0 lg:max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#F68E05]" aria-hidden />
                <p className="text-[0.6875rem] font-bold tracking-[0.18em] text-[#F68E05] uppercase sm:text-xs">
                  {copy.banner.title}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#0c1524]/72 sm:text-[0.9375rem]">
                {copy.banner.description}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center lg:shrink-0">
              <Button
                type="button"
                variant="accent"
                size="lg"
                className="h-11 rounded-full px-5 text-sm font-medium"
                onClick={acceptAll}
              >
                {copy.banner.acceptAll}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-11 rounded-full px-5 text-sm font-medium"
                onClick={rejectNonEssential}
              >
                {copy.banner.rejectNonEssential}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="h-11 rounded-full px-5 text-sm font-medium text-[#0c1524]/80"
                onClick={openPreferences}
              >
                {copy.banner.customize}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
