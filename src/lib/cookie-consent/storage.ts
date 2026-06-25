import {
  COOKIE_CONSENT_VERSION,
  type CookieConsentChoices,
  type StoredCookieConsent,
} from "@/types/cookie-consent";

export const COOKIE_CONSENT_STORAGE_KEY = "dot-cookie-consent";

function isBrowser() {
  return typeof window !== "undefined";
}

function isValidConsent(value: unknown): value is CookieConsentChoices {
  if (!value || typeof value !== "object") return false;

  const consent = value as Record<string, unknown>;

  return (
    consent.necessary === true &&
    typeof consent.analytics === "boolean" &&
    typeof consent.marketing === "boolean" &&
    typeof consent.preferences === "boolean"
  );
}

export function readStoredConsent(): StoredCookieConsent | null {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;

    const record = parsed as Partial<StoredCookieConsent>;

    if (
      record.version !== COOKIE_CONSENT_VERSION ||
      !isValidConsent(record.consent) ||
      typeof record.timestamp !== "string"
    ) {
      return null;
    }

    return {
      version: record.version,
      consent: record.consent,
      timestamp: record.timestamp,
    };
  } catch {
    return null;
  }
}

export function writeStoredConsent(consent: CookieConsentChoices): StoredCookieConsent {
  const payload: StoredCookieConsent = {
    version: COOKIE_CONSENT_VERSION,
    consent,
    timestamp: new Date().toISOString(),
  };

  if (isBrowser()) {
    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify(payload),
    );
  }

  return payload;
}

export function clearStoredConsent(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
}

export function hasStoredConsent(): boolean {
  return readStoredConsent() !== null;
}
