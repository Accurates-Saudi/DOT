import type { SeoDefaults, SiteSettings } from "@/types";
import enMessagesJson from "@/i18n/locales/en.json";

const enMessages = enMessagesJson as {
  site: {
    companyName: string;
    legalName: string;
    tagline: string;
    description: string;
  };
  footer: {
    contact: {
      items: Array<{
        type: "email" | "phone" | "address";
        value: string;
      }>;
    };
  };
};

const footerContactItems = enMessages.footer.contact.items;
const email =
  footerContactItems.find((item) => item.type === "email")?.value ??
  "info@dynamicoiltools.com";
const phone =
  footerContactItems.find((item) => item.type === "phone")?.value ??
  "+966 (13) 8041290";
const fullAddress =
  footerContactItems.find((item) => item.type === "address")?.value ??
  "Industrial City 3, Sector II, Block 7, Dammam, Saudi Arabia";
const addressParts = fullAddress.split(",").map((part) => part.trim());

export const siteSettings: SiteSettings = {
  companyName: enMessages.site.companyName,
  legalName: enMessages.site.legalName,
  tagline: enMessages.site.tagline,
  description: enMessages.site.description,
  locale: "en-SA",
  contact: {
    email,
    phone,
    address: addressParts.slice(0, -2).join(", ") || fullAddress,
    city: addressParts.at(-2) ?? "Dammam",
    country: addressParts.at(-1) ?? "Saudi Arabia",
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
