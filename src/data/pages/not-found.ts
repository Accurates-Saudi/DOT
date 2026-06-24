import type { NotFoundPageContent } from "@/types";

import { siteSettings } from "@/data/site";

const { contact } = siteSettings;

export const notFoundPageContent: NotFoundPageContent = {
  meta: {
    title: "Page Not Found",
    description:
      "The page you are looking for could not be found. Return to Dynamic Oil Tools or explore our products and services.",
  },
  label: "Error 404",
  title: "Page Not Found",
  description:
    "The page you requested may have been moved, removed, or is temporarily unavailable. Use the links below to continue browsing our engineering solutions and product catalog.",
  ctaPrimary: {
    label: "Return to Homepage",
    href: "/",
  },
  ctaSecondary: {
    label: "Contact Support",
    href: "/contact",
  },
  quickLinksHeading: "Explore Our Site",
  quickLinks: [
    {
      id: "products",
      label: "Products",
      description: "Engineered screens, strainers, and filtration solutions.",
      href: "/products",
      icon: "products",
    },
    {
      id: "about",
      label: "About Us",
      description: "Our mission, capabilities, and manufacturing expertise.",
      href: "/about",
      icon: "about",
    },
    {
      id: "catalogs",
      label: "Catalogs",
      description: "Download technical catalogs and product documentation.",
      href: "/catalogs",
      icon: "catalogs",
    },
    {
      id: "contact",
      label: "Contact Us",
      description: "Reach our engineering team for inquiries and support.",
      href: "/contact",
      icon: "contact",
    },
  ],
  supportHeading: "Need immediate assistance?",
  supportBody:
    "Our engineering and sales teams are available to help with product specifications, technical support, and partnership inquiries.",
  supportEmail: {
    label: "Email Us",
    href: `mailto:${contact.email}`,
  },
  supportPhone: {
    label: "Call Us",
    href: `tel:${contact.phone.replace(/\s/g, "")}`,
  },
};

export const notFoundPageMeta = notFoundPageContent.meta;
