import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type { FooterContent } from "@/types";

import dotLogo from "@/assets/logos/dot.webp";
import saudiMadeLogo from "@/assets/logos/saudi-made.png";

import { getMessagesSection, localizeLinkItems } from "../helpers";

export function buildFooterContent(
  messages: TranslationMessages,
  locale: Locale,
): FooterContent {
  const footer = getMessagesSection<FooterContent>(messages, "footer");

  return {
    ...footer,
    logos: {
      dot: { ...footer.logos.dot, src: dotLogo },
      saudiMade: { ...footer.logos.saudiMade, src: saudiMadeLogo },
    },
    quickLinks: {
      ...footer.quickLinks,
      items: localizeLinkItems(footer.quickLinks.items, locale),
    },
    services: {
      ...footer.services,
      items: localizeLinkItems(footer.services.items, locale),
    },
    bottomBar: {
      ...footer.bottomBar,
      legalLinks: localizeLinkItems(footer.bottomBar.legalLinks, locale),
    },
  };
}
