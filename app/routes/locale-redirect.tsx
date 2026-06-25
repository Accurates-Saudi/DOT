import { redirect } from "react-router";

import type { Route } from "./+types/locale-redirect";
import {
  defaultLocale,
  isValidLocale,
  parseLocaleCookie,
  localeStorageKey,
} from "@/i18n";

export function loader({ request }: Route.LoaderArgs) {
  const cookieLocale = parseLocaleCookie(request.headers.get("Cookie"));
  const url = new URL(request.url);
  const locale =
    cookieLocale && isValidLocale(cookieLocale) ? cookieLocale : defaultLocale;

  throw redirect(`/${locale}${url.search}${url.hash}`);
}

export function clientLoader() {
  let locale = defaultLocale;

  try {
    const stored = localStorage.getItem(localeStorageKey);
    if (stored && isValidLocale(stored)) locale = stored;
  } catch {
    // ignore
  }

  throw redirect(`/${locale}`);
}

clientLoader.hydrate = true;

export default function LocaleRedirect() {
  return null;
}
