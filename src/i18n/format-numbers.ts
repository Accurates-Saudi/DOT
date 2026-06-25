import type { Locale } from "./config";

const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"] as const;

const ARABIC_NUMBERING_SYSTEM = "arab" as const;

function getNumberFormatLocale(locale: Locale): string {
  return locale === "ar" ? "ar-SA" : "en-US";
}

function getDateFormatLocale(locale: Locale): string {
  return locale === "ar" ? "ar-SA-u-nu-arab" : "en-US";
}

/** Western digits → Arabic-Indic (٠–٩). No-op for English. */
export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(getNumberFormatLocale(locale), {
    ...(locale === "ar" ? { numberingSystem: ARABIC_NUMBERING_SYSTEM } : {}),
  }).format(value);
}

/**
 * Localizes mixed text that may contain digits and leading phone/country-code "+".
 * English: "+966 (13) 8041290" → Arabic: "٩٦٦ (١٣) ٨٠٤١٢٩٠+"
 */
export function formatNumericText(text: string, locale: Locale): string {
  if (locale !== "ar" || !text) return text;

  let trailingAffixes = "";
  let working = text;

  if (working.startsWith("+")) {
    trailingAffixes += "+";
    working = working.slice(1);
  }

  return (
    working.replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)] ?? digit) +
    trailingAffixes
  );
}

/** Animated stat / counter value with optional trailing symbol (e.g. "+"). */
export function formatStatisticValue(
  value: number,
  suffix: string | undefined,
  locale: Locale,
): string {
  const formatted = formatNumber(value, locale);
  if (!suffix) return formatted;
  return `${formatted}${suffix}`;
}

export function formatDate(
  isoDate: string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions,
): string {
  return new Date(isoDate).toLocaleDateString(getDateFormatLocale(locale), options);
}

export function formatNewsDateParts(isoDate: string, locale: Locale) {
  const date = new Date(isoDate);
  return {
    day: date.toLocaleDateString(getDateFormatLocale(locale), { day: "2-digit" }),
    month: date.toLocaleDateString(getDateFormatLocale(locale), { month: "short" }),
  };
}

export function formatNewsDate(isoDate: string, locale: Locale): string {
  return formatDate(isoDate, locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
