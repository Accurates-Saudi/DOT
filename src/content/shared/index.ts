import type { TranslationMessages } from "@/i18n/types";
import { buildCookieConsentCopy } from "@/i18n/content/cookie";
import { buildFooterContent } from "@/i18n/content/pages/footer";
import { buildNavigation } from "@/i18n/content/pages/navigation";
import { buildTrustedPartnersContent } from "@/i18n/content/pages/trusted-partners";
import enMessagesJson from "@/i18n/locales/en.json";
import arMessagesJson from "@/i18n/locales/ar.json";
import { toCmsSource } from "@/utils/cms-content";

const enMessages = enMessagesJson as TranslationMessages;
const arMessages = arMessagesJson as TranslationMessages;

export const localeContentMessages = {
  en: enMessages,
  ar: arMessages,
} as const;

export const siteContentSource = toCmsSource(
  enMessages.site as Record<string, string>,
  arMessages.site as Record<string, string>,
  ["shared", "site"],
);

export const navigationContentSource = toCmsSource(
  buildNavigation(enMessages, "en"),
  buildNavigation(arMessages, "ar"),
  ["shared", "navigation"],
);

export const navigationUiContentSource = toCmsSource(
  enMessages.nav as Record<string, unknown>,
  arMessages.nav as Record<string, unknown>,
  ["shared", "navigation-ui"],
);

export const footerContentSource = toCmsSource(
  buildFooterContent(enMessages, "en"),
  buildFooterContent(arMessages, "ar"),
  ["shared", "footer"],
);

export const cookieContentSource = toCmsSource(
  buildCookieConsentCopy(enMessages),
  buildCookieConsentCopy(arMessages),
  ["shared", "cookie"],
);

export const trustedPartnersContentSource = toCmsSource(
  buildTrustedPartnersContent(enMessages),
  buildTrustedPartnersContent(arMessages),
  ["shared", "trusted-partners"],
);
