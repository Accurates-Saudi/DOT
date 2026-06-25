export {
  createAcceptAllConsent,
  createDefaultConsent,
  createRejectNonEssentialConsent,
  hasConsent,
  mergeConsent,
} from "./consent";

export { resetConsent, updateConsent } from "./actions";

export {
  applyConsentToScripts,
  registerCookieScript,
  resetManagedScripts,
  type CookieScriptLoader,
} from "./script-manager";

export {
  clearStoredConsent,
  COOKIE_CONSENT_STORAGE_KEY,
  hasStoredConsent,
  readStoredConsent,
  writeStoredConsent,
} from "./storage";
