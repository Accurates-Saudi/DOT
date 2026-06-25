import { COOKIE_CATEGORIES } from "@/types/cookie-consent";
import type { CookieCategory, CookieCategoryDefinition } from "@/types/cookie-consent";
import type { TranslationMessages } from "@/i18n/types";

import { getMessagesSection } from "./helpers";

interface CookieCategoryMessages {
  label: string;
  description: string;
  required?: boolean;
}

interface CookieMessages {
  banner: Record<string, string>;
  modal: Record<string, string>;
  categories:
    | CookieCategoryDefinition[]
    | Record<CookieCategory, CookieCategoryMessages>;
  regionAria: string;
}

function normalizeCookieCategories(
  categories: CookieMessages["categories"],
): CookieCategoryDefinition[] {
  if (Array.isArray(categories)) {
    return categories;
  }

  return COOKIE_CATEGORIES.map((id) => ({
    id,
    label: categories[id].label,
    description: categories[id].description,
    ...(categories[id].required ? { required: true } : {}),
  }));
}

export function buildCookieConsentCopy(messages: TranslationMessages) {
  const cookie = getMessagesSection<CookieMessages>(messages, "cookie");

  return {
    banner: cookie.banner,
    modal: cookie.modal,
    categories: normalizeCookieCategories(cookie.categories),
    regionAria: cookie.regionAria,
  };
}
