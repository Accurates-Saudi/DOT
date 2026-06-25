import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import { localizePath } from "@/i18n/utils";
import type { LinkItem } from "@/types";

export function getMessagesSection<T>(
  messages: TranslationMessages,
  key: string,
): T {
  return (messages[key] ?? {}) as T;
}

export function localizeLinkItem(
  item: LinkItem,
  locale: Locale,
): LinkItem {
  if (!item.href || item.href.startsWith("#") || item.external) {
    return item;
  }

  return {
    ...item,
    href: localizePath(item.href, locale),
  };
}

export function localizeLinkItems(
  items: LinkItem[],
  locale: Locale,
): LinkItem[] {
  return items.map((item) => localizeLinkItem(item, locale));
}

export function localizeHref(href: string | undefined, locale: Locale): string | undefined {
  if (!href) return href;
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }
  return localizePath(href, locale);
}
