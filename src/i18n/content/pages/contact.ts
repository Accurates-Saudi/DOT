import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type { ContactPageContent } from "@/types";
import type { MapLocationContent } from "@/types";

import { formatPhoneHref, siteSettings } from "@/data/site";

import { dotMapLocation } from "@/data/map";

import { pageHeroAssets } from "../assets/pages";
import { contactInfoItemsStructure } from "../defaults/contact-structure";
import { getMessagesSection, localizeLinkItem, mergeIndexed } from "../helpers";
import { localizeBreadcrumbs } from "./navigation";

export function buildContactPageContent(
  messages: TranslationMessages,
  locale: Locale,
): ContactPageContent {
  const pages = getMessagesSection<{ contact: ContactPageContent }>(
    messages,
    "pages",
  );
  const page = pages.contact;
  const { contact } = siteSettings;
  const mapMessages = getMessagesSection<Partial<MapLocationContent>>(
    messages,
    "map",
  );

  return {
    meta: page.meta,
    hero: {
      ...page.hero,
      breadcrumbs: localizeBreadcrumbs(page.hero.breadcrumbs, locale),
      backgroundImage: page.hero.backgroundImage
        ? { ...page.hero.backgroundImage, src: pageHeroAssets.overviewHero }
        : undefined,
    },
    main: {
      info: {
        ...page.main.info,
        items: mergeIndexed(
          page.main.info.items,
          contactInfoItemsStructure,
        ).map((item) => ({
          ...item,
          value:
            item.type === "phone"
              ? contact.phone
              : item.type === "email"
                ? contact.email
                : item.value,
          href:
            item.type === "phone"
              ? formatPhoneHref(contact.phone)
              : item.type === "email"
                ? `mailto:${contact.email}`
                : item.href,
        })),
      },
      form: page.main.form,
    },
    location: {
      ...page.location,
      map: {
        ...dotMapLocation,
        ...mapMessages,
        address: page.location.address,
      },
    },
    engineeringCta: {
      ...page.engineeringCta,
      ctaPrimary: localizeLinkItem(page.engineeringCta.ctaPrimary, locale),
    },
  };
}
