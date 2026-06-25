import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type { NotFoundPageContent } from "@/types";

import { formatPhoneHref, siteSettings } from "@/data/site";

import { getMessagesSection, localizeLinkItem, mergeIndexed } from "../helpers";
import { notFoundQuickLinksStructure } from "../defaults/not-found-structure";

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
    quickLinks: mergeIndexed(page.quickLinks, notFoundQuickLinksStructure).map(
      (link) => ({
        ...link,
        href: localizeLinkItem({ label: link.label, href: link.href }, locale)
          .href!,
      }),
    ),
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
