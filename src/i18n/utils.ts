import {
  defaultLocale,
  isValidLocale,
  isRtlLocale,
  type Locale,
} from "./config";
import type { TranslationMessages, TranslateFn } from "./types";

const PARAM_PATTERN = /\{\{(\w+)\}\}/g;

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return isRtlLocale(locale) ? "rtl" : "ltr";
}

export function normalizePath(path: string): string {
  if (!path || path === "/") return "/";
  return path.startsWith("/") ? path : `/${path}`;
}

export function stripLocaleFromPath(pathname: string): {
  locale: Locale | null;
  pathname: string;
} {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return { locale: null, pathname: "/" };
  }

  const maybeLocale = segments[0];

  if (isValidLocale(maybeLocale)) {
    const rest = segments.slice(1).join("/");
    return {
      locale: maybeLocale,
      pathname: rest ? `/${rest}` : "/",
    };
  }

  return { locale: null, pathname: pathname || "/" };
}

export function localizePath(path: string, locale: Locale): string {
  const normalized = normalizePath(path);

  if (
    normalized.startsWith("http://") ||
    normalized.startsWith("https://") ||
    normalized.startsWith("mailto:") ||
    normalized.startsWith("tel:") ||
    normalized.startsWith("#")
  ) {
    return path;
  }

  const { pathname } = stripLocaleFromPath(normalized);

  if (pathname === "/") {
    return `/${locale}`;
  }

  return `/${locale}${pathname}`;
}

export function detectLocaleFromPathname(pathname: string): Locale | null {
  return stripLocaleFromPath(pathname).locale;
}

export function resolveLocale(
  pathname: string,
  storedLocale?: string | null,
): Locale {
  const fromPath = detectLocaleFromPathname(pathname);
  if (fromPath) return fromPath;

  if (storedLocale && isValidLocale(storedLocale)) {
    return storedLocale;
  }

  return defaultLocale;
}

export function getNestedValue(
  messages: TranslationMessages,
  key: string,
): string | undefined {
  const value = key.split(".").reduce<unknown>((current, segment) => {
    if (current && typeof current === "object" && segment in current) {
      return (current as TranslationMessages)[segment];
    }
    return undefined;
  }, messages);

  return typeof value === "string" ? value : undefined;
}

export function createTranslator(messages: TranslationMessages): TranslateFn {
  return (key, params) => {
    const template = getNestedValue(messages, key);

    if (!template) {
      if (import.meta.env.DEV) {
        console.warn(`[i18n] Missing translation key: ${key}`);
      }
      return key;
    }

    if (!params) return template;

    return template.replace(PARAM_PATTERN, (_, token: string) => {
      const value = params[token];
      return value === undefined ? `{{${token}}}` : String(value);
    });
  };
}

export function parseLocaleCookie(cookieHeader: string | null): Locale | null {
  if (!cookieHeader) return null;

  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${"dot_locale"}=`));

  if (!match) return null;

  const value = decodeURIComponent(match.split("=")[1] ?? "");
  return isValidLocale(value) ? value : null;
}

export function createLocaleCookie(locale: Locale): string {
  const maxAge = 60 * 60 * 24 * 365;
  return `dot_locale=${encodeURIComponent(locale)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}
