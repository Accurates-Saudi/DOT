import dotLogo from "@/assets/logos/dot.webp";
import saudiMadeLogo from "@/assets/logos/saudi-made.png";
import { siteSettings } from "@/data/site";

import type { CmsSiteSettingsPayload } from "@/types/cms-site-settings";

import { getPublicContentPayloadByKey } from "./service.server";

export const CMS_SITE_SETTINGS_KEY = "site.settings";

export function getDefaultSiteSettingsPayload(): CmsSiteSettingsPayload {
  return {
    companyName: siteSettings.companyName,
    legalName: siteSettings.legalName,
    tagline: siteSettings.tagline,
    description: siteSettings.description,
    locale: siteSettings.locale,
    contact: { ...siteSettings.contact },
    social: { ...siteSettings.social },
    logos: {
      dot: {
        src: dotLogo,
        alt: siteSettings.companyName,
      },
      saudiMade: {
        src: saudiMadeLogo,
        alt: "Saudi Made",
      },
    },
  };
}

export async function getPublishedSiteSettings(): Promise<CmsSiteSettingsPayload> {
  const defaults = getDefaultSiteSettingsPayload();
  const payload = await getPublicContentPayloadByKey(CMS_SITE_SETTINGS_KEY);

  if (!payload || typeof payload !== "object") {
    return defaults;
  }

  const override = payload as Partial<CmsSiteSettingsPayload>;

  return {
    ...defaults,
    ...override,
    contact: {
      ...defaults.contact,
      ...(override.contact ?? {}),
    },
    social: {
      ...defaults.social,
      ...(override.social ?? {}),
    },
    logos: {
      dot: {
        ...defaults.logos.dot,
        ...(override.logos?.dot ?? {}),
      },
      saudiMade: {
        ...defaults.logos.saudiMade,
        ...(override.logos?.saudiMade ?? {}),
      },
    },
  };
}
