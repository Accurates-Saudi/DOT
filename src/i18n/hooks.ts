import { useMemo } from "react";

import {
  formatDate,
  formatNewsDate,
  formatNewsDateParts,
  formatNumber,
  formatNumericText,
  formatStatisticValue,
} from "./format-numbers";
import { useI18nContext } from "./provider";
import type { TranslateFn } from "./types";

export function useI18n() {
  return useI18nContext();
}

export function useLocale() {
  return useI18nContext().locale;
}

export function useDirection() {
  return useI18nContext().direction;
}

export function useLocalizedPath() {
  return useI18nContext().localizePath;
}

export function useTranslation(namespace?: string): {
  t: TranslateFn;
  locale: ReturnType<typeof useLocale>;
} {
  const { t: baseT, locale } = useI18nContext();

  const t = useMemo<TranslateFn>(() => {
    if (!namespace) return baseT;

    return (key, params) => baseT(`${namespace}.${key}`, params);
  }, [baseT, namespace]);

  return { t, locale };
}

export function useNumberFormat() {
  const { locale } = useI18nContext();

  return useMemo(
    () => ({
      locale,
      formatNumber: (value: number) => formatNumber(value, locale),
      formatNumericText: (text: string) => formatNumericText(text, locale),
      formatStatisticValue: (value: number, suffix?: string) =>
        formatStatisticValue(value, suffix, locale),
      formatDate: (isoDate: string, options: Intl.DateTimeFormatOptions) =>
        formatDate(isoDate, locale, options),
      formatNewsDate: (isoDate: string) => formatNewsDate(isoDate, locale),
      formatNewsDateParts: (isoDate: string) =>
        formatNewsDateParts(isoDate, locale),
    }),
    [locale],
  );
}
