import type {
  CookieCategory,
  CookieConsentChoices,
  OptionalCookieCategory,
} from "@/types/cookie-consent";

export function createDefaultConsent(): CookieConsentChoices {
  return {
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  };
}

export function createAcceptAllConsent(): CookieConsentChoices {
  return {
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
  };
}

export function createRejectNonEssentialConsent(): CookieConsentChoices {
  return createDefaultConsent();
}

export function hasConsent(
  category: CookieCategory,
  consent: CookieConsentChoices | null | undefined,
): boolean {
  if (!consent) return category === "necessary";
  if (category === "necessary") return true;
  return consent[category];
}

export function mergeConsent(
  current: CookieConsentChoices,
  updates: Partial<Pick<CookieConsentChoices, OptionalCookieCategory>>,
): CookieConsentChoices {
  return {
    necessary: true,
    analytics: updates.analytics ?? current.analytics,
    marketing: updates.marketing ?? current.marketing,
    preferences: updates.preferences ?? current.preferences,
  };
}
