import type {
  CookieConsentChoices,
  OptionalCookieCategory,
} from "@/types/cookie-consent";

import {
  createDefaultConsent,
  mergeConsent,
} from "./consent";
import { applyConsentToScripts, resetManagedScripts } from "./script-manager";
import {
  clearStoredConsent,
  readStoredConsent,
  writeStoredConsent,
} from "./storage";

export function updateConsent(
  updates: Partial<Pick<CookieConsentChoices, OptionalCookieCategory>>,
): CookieConsentChoices {
  const current = readStoredConsent()?.consent ?? createDefaultConsent();
  const next = mergeConsent(current, updates);
  writeStoredConsent(next);
  applyConsentToScripts(next);
  return next;
}

export function resetConsent(): void {
  clearStoredConsent();
  resetManagedScripts();
}
