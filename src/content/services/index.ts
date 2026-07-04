import { buildAboutPageContent } from "@/i18n/content/pages/about";
import { toCmsSource } from "@/utils/cms-content";

import { localeContentMessages } from "../shared";

const enAboutPage = buildAboutPageContent(localeContentMessages.en, "en");
const arAboutPage = buildAboutPageContent(localeContentMessages.ar, "ar");
const enCommon = localeContentMessages.en.common as { home: string };
const arCommon = localeContentMessages.ar.common as { home: string };

const enServicesPage = {
  meta: (
    localeContentMessages.en.pages as {
      services: { meta: { title: string; description: string } };
    }
  ).services.meta,
  hero: {
    breadcrumbs: [
      { label: enCommon.home, href: "/en" },
      {
        label: (
          localeContentMessages.en.pages as {
            services: { meta: { title: string } };
          }
        ).services.meta.title,
      },
    ],
    title: (
      localeContentMessages.en.pages as {
        services: { meta: { title: string } };
      }
    ).services.meta.title,
    introduction: (
      localeContentMessages.en.pages as {
        services: { meta: { description: string } };
      }
    ).services.meta.description,
    backgroundImage: enAboutPage.hero.backgroundImage!,
  },
};

const arServicesPage = {
  meta: (
    localeContentMessages.ar.pages as {
      services: { meta: { title: string; description: string } };
    }
  ).services.meta,
  hero: {
    breadcrumbs: [
      { label: arCommon.home, href: "/ar" },
      {
        label: (
          localeContentMessages.ar.pages as {
            services: { meta: { title: string } };
          }
        ).services.meta.title,
      },
    ],
    title: (
      localeContentMessages.ar.pages as {
        services: { meta: { title: string } };
      }
    ).services.meta.title,
    introduction: (
      localeContentMessages.ar.pages as {
        services: { meta: { description: string } };
      }
    ).services.meta.description,
    backgroundImage: arAboutPage.hero.backgroundImage!,
  },
};

export const servicesContentSource = toCmsSource(
  enServicesPage,
  arServicesPage,
  ["services"],
);
