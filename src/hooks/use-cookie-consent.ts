import { useCookieConsentContext } from "@/contexts/cookie-consent-context";
import type {
  CookieCategory,
  CookieConsentChoices,
  OptionalCookieCategory,
} from "@/types/cookie-consent";

export function useCookieConsent() {
  const context = useCookieConsentContext();

  return {
    consent: context.consent,
    isReady: context.isReady,
    showBanner: context.showBanner,
    isPreferencesOpen: context.isPreferencesOpen,
    hasConsent: context.hasConsent,
    acceptAll: context.acceptAll,
    rejectNonEssential: context.rejectNonEssential,
    updateConsent: context.updateConsent,
    resetConsent: context.resetConsent,
    openPreferences: context.openPreferences,
    closePreferences: context.closePreferences,
  };
}

export type {
  CookieCategory,
  CookieConsentChoices,
  OptionalCookieCategory,
};
