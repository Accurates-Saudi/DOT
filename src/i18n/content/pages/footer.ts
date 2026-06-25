import type { Locale } from "@/i18n/config";
import type { TranslationMessages } from "@/i18n/types";
import type { FooterContent } from "@/types";

import dotLogo from "@/assets/logos/dot.webp";
import saudiMadeLogo from "@/assets/logos/saudi-made.png";

import { getMessagesSection, localizeLinkItem, localizeLinkItems } from "../helpers";
import { homeServiceItemsStructure } from "../defaults/home-structure";

type HomeServicesMessages = {
  services: {
    items: { title: string }[];
  };
};

export function buildFooterContent(
  messages: TranslationMessages,
  locale: Locale,
): FooterContent {
  const footer = getMessagesSection<FooterContent>(messages, "footer");
  const home = getMessagesSection<{ home: HomeServicesMessages }>(
    messages,
    "pages",
  ).home;

  const serviceItems = homeServiceItemsStructure.map((structure, index) => {
    const service = home.services.items[index];
    const label = service?.title ?? footer.services.items[index]?.label ?? "";

    return localizeLinkItem(
      {
        label,
        href: "/services",
      },
      locale,
    );
  });

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
      title: footer.services.title,
      items: serviceItems,
    },
    bottomBar: {
      ...footer.bottomBar,
      legalLinks: localizeLinkItems(footer.bottomBar.legalLinks, locale),
    },
  };
}
