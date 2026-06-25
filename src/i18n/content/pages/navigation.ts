import type { LinkItem } from "@/types";
import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import { getMessagesSection, localizeLinkItem, localizeLinkItems } from "../helpers";

interface NavMessages {
  items: LinkItem[];
}

export function buildNavigation(
  messages: TranslationMessages,
  locale: Locale,
): LinkItem[] {
  const nav = getMessagesSection<NavMessages>(messages, "nav");
  return localizeLinkItems(nav.items ?? [], locale);
}

export function localizeBreadcrumbs<
  T extends { label: string; href?: string },
>(items: T[], locale: Locale): T[] {
  return items.map((item) => ({
    ...item,
    ...(item.href ? { href: localizeLinkItem({ label: item.label, href: item.href }, locale).href } : {}),
  }));
}
