export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeStorageKey = "dot-locale";

export const localeCookieName = "dot_locale";

export const rtlLocales: readonly Locale[] = ["ar"];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

export const localeHtmlLang: Record<Locale, string> = {
  en: "en",
  ar: "ar",
};

export const localeOpenGraphLocale: Record<Locale, string> = {
  en: "en_US",
  ar: "ar_SA",
};

export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function isValidLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
