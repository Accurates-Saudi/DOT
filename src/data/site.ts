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
    phone: "+966 XX XXX XXXX",
    address: "Industrial District",
    city: "Dammam",
    country: "Kingdom of Saudi Arabia",
  },
  social: {
    linkedin: "https://linkedin.com/company/dynamic-oil-tools",
  },
};

export const seoDefaults: SeoDefaults = {
  titleTemplate: "%s | Dynamic Oil Tools",
  defaultDescription: siteSettings.description,
  siteUrl: "https://www.dynamicoiltools.com",
};
