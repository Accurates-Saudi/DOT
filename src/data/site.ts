import type { SeoDefaults, SiteSettings } from "@/types";

export const siteSettings: SiteSettings = {
  companyName: "Dynamic Oil Tools",
  legalName: "Dynamic Oil Tools Co.",
  tagline: "Precision Engineering for Oil & Gas",
  description:
    "Saudi industrial manufacturing company delivering high-performance oil & gas tools and equipment for the energy sector.",
  locale: "en-SA",
  contact: {
    email: "info@dynamicoiltools.com",
    phone: "+966 (13) 8041290",
    address: "Industrial City 3, Sector II, Block 7",
    city: "Dammam",
    country: "Saudi Arabia",
  },
  social: {
    linkedin: "https://linkedin.com/company/dynamic-oil-tools",
  },
};

export function formatPhoneHref(phone: string): string {
  return `tel:${phone.replace(/[\s()]/g, "")}`;
}

export const seoDefaults: SeoDefaults = {
  titleTemplate: "%s | Dynamic Oil Tools",
  defaultDescription: siteSettings.description,
  siteUrl: "https://www.dynamicoiltools.com",
};
