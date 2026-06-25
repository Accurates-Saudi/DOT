import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type { NotFoundPageContent } from "@/types";

import { formatPhoneHref, siteSettings } from "@/data/site";

import { getMessagesSection, localizeLinkItem, localizeLinkItems } from "../helpers";

export function buildNotFoundPageContent(
  messages: TranslationMessages,
  locale: Locale,
): NotFoundPageContent {
  const pages = getMessagesSection<{ notFound: NotFoundPageContent }>(
    messages,
    "pages",
  );
  const page = pages.notFound;
  const { contact } = siteSettings;

  return {
    meta: page.meta,
    label: page.label,
    title: page.title,
    description: page.description,
    ctaPrimary: localizeLinkItem(page.ctaPrimary, locale),
    ctaSecondary: localizeLinkItem(page.ctaSecondary, locale),
    quickLinksHeading: page.quickLinksHeading,
    quickLinks: page.quickLinks.map((link) => ({
      ...link,
      href: localizeLinkItem({ label: link.label, href: link.href }, locale).href!,
    })),
    supportHeading: page.supportHeading,
    supportBody: page.supportBody,
    supportEmail: {
      label: page.supportEmail.label,
      href: `mailto:${contact.email}`,
    },
    supportPhone: {
      label: page.supportPhone.label,
      href: formatPhoneHref(contact.phone),
    },
  };
}
