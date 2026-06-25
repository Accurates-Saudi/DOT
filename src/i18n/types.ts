import type { Locale } from "./config";

export type TranslationValue = string | TranslationMessages;

export interface TranslationMessages {
  [key: string]: TranslationValue;
}

export interface I18nContextValue {
  locale: Locale;
  messages: TranslationMessages;
  direction: "ltr" | "rtl";
  t: TranslateFn;
  localizePath: (path: string) => string;
}

export type TranslateFn = (
  key: string,
  params?: Record<string, string | number>,
) => string;

export interface LocaleRouteData {
  locale: Locale;
  messages: TranslationMessages;
}
