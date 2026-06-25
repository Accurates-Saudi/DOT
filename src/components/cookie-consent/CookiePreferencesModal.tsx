import { useEffect, useId, useRef, useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { Button } from "@/components/ui/button";
import {
  cookieCategoryDefinitions,
  cookieConsentCopy,
} from "@/data/cookie-consent";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  createAcceptAllConsent,
  createDefaultConsent,
  createRejectNonEssentialConsent,
  mergeConsent,
} from "@/lib/cookie-consent";
import type {
  CookieConsentChoices,
  OptionalCookieCategory,
} from "@/types/cookie-consent";
import { cn } from "@/lib/utils";

export function CookiePreferencesModal() {
  const {
    isPreferencesOpen,
    closePreferences,
    consent,
    updateConsent,
    acceptAll,
    rejectNonEssential,
  } = useCookieConsent();
  const prefersReducedMotion = usePrefersReducedMotion();
  const titleId = useId();
  const descriptionId = useId();

  const [draft, setDraft] = useState<CookieConsentChoices>(
    consent ?? createDefaultConsent(),
  );

  useEffect(() => {
    if (isPreferencesOpen) {
      setDraft(consent ?? createDefaultConsent());
    }
  }, [consent, isPreferencesOpen]);

  const handleToggle = (category: OptionalCookieCategory, enabled: boolean) => {
    setDraft((current) => mergeConsent(current, { [category]: enabled }));
  };

  const handleSave = () => {
    updateConsent({
      analytics: draft.analytics,
      marketing: draft.marketing,
      preferences: draft.preferences,
    });
  };

  return (
    <DialogPrimitive.Root
      open={isPreferencesOpen}
      onOpenChange={(open) => {
        if (!open) closePreferences();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-[70] bg-[#0c1524]/55 supports-backdrop-filter:backdrop-blur-[2px]",
            !prefersReducedMotion &&
              "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
          )}
        />
        <DialogPrimitive.Content
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={cn(
            "fixed top-1/2 left-1/2 z-[80] flex max-h-[min(90vh,44rem)] w-[min(calc(100vw-2rem),32rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-[#0c1524]/10 bg-white shadow-[0_24px_80px_-24px_rgba(12,21,36,0.35)] outline-none",
            !prefersReducedMotion &&
              "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          )}
          onEscapeKeyDown={() => closePreferences()}
        >
          <div className="border-b border-[#0c1524]/8 px-5 py-5 sm:px-6">
            <DialogPrimitive.Title
              id={titleId}
              className="text-lg font-semibold tracking-tight text-[#0c1524] sm:text-xl"
            >
              {cookieConsentCopy.modal.title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description
              id={descriptionId}
              className="mt-2 text-sm leading-relaxed text-[#0c1524]/68"
            >
              {cookieConsentCopy.modal.description}
            </DialogPrimitive.Description>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
            <ul className="space-y-3">
              {cookieCategoryDefinitions.map((category) => {
                const isRequired = category.required === true;
                const enabled =
                  category.id === "necessary"
                    ? true
                    : draft[category.id as OptionalCookieCategory];

                return (
                  <li
                    key={category.id}
                    className="rounded-xl border border-[#0c1524]/8 bg-[#fcfcfb] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#0c1524]">
                          {category.label}
                          {isRequired && (
                            <span className="ml-2 text-[0.6875rem] font-medium tracking-wide text-[#F68E05] uppercase">
                              Always on
                            </span>
                          )}
                        </p>
                        <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-[#0c1524]/65">
                          {category.description}
                        </p>
                      </div>

                      <ConsentToggle
                        checked={enabled}
                        disabled={isRequired}
                        label={`${category.label} cookies`}
                        onCheckedChange={(checked) => {
                          if (category.id === "necessary") return;
                          handleToggle(
                            category.id as OptionalCookieCategory,
                            checked,
                          );
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-2 border-t border-[#0c1524]/8 bg-[#faf9f8] px-5 py-4 sm:flex-row sm:flex-wrap sm:px-6">
            <Button
              type="button"
              variant="accent"
              size="lg"
              className="h-11 flex-1 rounded-full px-5 text-sm font-medium sm:min-w-[9rem] sm:flex-none"
              onClick={handleSave}
            >
              {cookieConsentCopy.modal.save}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="h-11 flex-1 rounded-full px-5 text-sm font-medium sm:min-w-[9rem] sm:flex-none"
              onClick={() => {
                setDraft(createAcceptAllConsent());
                acceptAll();
              }}
            >
              {cookieConsentCopy.modal.acceptAll}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              className="h-11 flex-1 rounded-full px-5 text-sm font-medium text-[#0c1524]/80 sm:min-w-[9rem] sm:flex-none"
              onClick={() => {
                setDraft(createRejectNonEssentialConsent());
                rejectNonEssential();
              }}
            >
              {cookieConsentCopy.modal.rejectNonEssential}
            </Button>
          </div>

          <DialogPrimitive.Close asChild>
            <button
              type="button"
              className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-[#0c1524]/10 text-[#0c1524]/70 transition-colors hover:border-[#0c1524]/20 hover:bg-[#0c1524]/5 hover:text-[#0c1524] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#F68E05]/35"
              aria-label="Close cookie preferences"
            >
              <span aria-hidden className="text-lg leading-none">
                &times;
              </span>
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function ConsentToggle({
  checked,
  disabled,
  label,
  onCheckedChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#F68E05]/35 disabled:cursor-not-allowed",
        checked
          ? "border-[#F68E05] bg-[#F68E05]"
          : "border-[#0c1524]/15 bg-[#0c1524]/8",
        disabled && "opacity-70",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-white shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          checked && "translate-x-[1.35rem]",
        )}
      />
    </button>
  );
}
