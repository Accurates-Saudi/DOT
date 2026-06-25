import { CookieBanner } from "./CookieBanner";
import { CookiePreferencesModal } from "./CookiePreferencesModal";

export function CookieConsentUI() {
  return (
    <>
      <CookieBanner />
      <CookiePreferencesModal />
    </>
  );
}
