import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";

import type { Locale } from "./config";
import { getDirection } from "./utils";
import { createTranslator, localizePath as buildLocalizedPath } from "./utils";
import type { I18nContextValue, TranslationMessages } from "./types";
import { LocaleDocumentSync } from "./LocaleDocumentSync";

const I18nContext = createContext<I18nContextValue | null>(null);

export interface I18nProviderProps {
  locale: Locale;
  messages: TranslationMessages;
  children: ReactNode;
}

export function I18nProvider({
  locale,
  messages,
  children,
}: I18nProviderProps) {
  const direction = getDirection(locale);

  const localizePath = useCallback(
    (path: string) => buildLocalizedPath(path, locale),
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      messages,
      direction,
      t: createTranslator(messages),
      localizePath,
    }),
    [direction, locale, localizePath, messages],
  );

  return (
    <I18nContext.Provider value={value}>
      <LocaleDocumentSync locale={locale} />
      {children}
    </I18nContext.Provider>
  );
}

export function useI18nContext(): I18nContextValue {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18nContext must be used within an I18nProvider");
  }

  return context;
}
