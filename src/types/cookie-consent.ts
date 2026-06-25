export const COOKIE_CONSENT_VERSION = 1;

export const COOKIE_CATEGORIES = [
  "necessary",
  "analytics",
  "marketing",
  "preferences",
] as const;

export type CookieCategory = (typeof COOKIE_CATEGORIES)[number];

export type OptionalCookieCategory = Exclude<CookieCategory, "necessary">;

export interface CookieConsentChoices {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface StoredCookieConsent {
  version: number;
  consent: CookieConsentChoices;
  timestamp: string;
}

export interface CookieCategoryDefinition {
  id: CookieCategory;
  label: string;
  description: string;
  required?: boolean;
}
