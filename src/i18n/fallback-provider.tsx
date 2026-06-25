import type { ReactNode } from "react";

import { defaultLocale } from "./config";
import { I18nProvider } from "./provider";
import type { TranslationMessages } from "./types";

import enMessages from "./locales/en.json";

/**
 * Provides i18n context outside the locale route tree (e.g. error boundaries).
 */
export function FallbackI18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nProvider
      locale={defaultLocale}
      messages={enMessages as TranslationMessages}
    >
      {children}
    </I18nProvider>
  );
}
