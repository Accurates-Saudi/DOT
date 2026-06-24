import type { FooterContent } from "@/types";

import dotLogo from "@/assets/logos/dot.webp";
import saudiMadeLogo from "@/assets/logos/saudi-made.png";

import { siteSettings } from "./site";

export const footerContent: FooterContent = {
  description: siteSettings.description,
  logos: {
    dot: {
      src: dotLogo,
      alt: "Dynamic Oil Tools",
    },
    saudiMade: {
      src: saudiMadeLogo,
      alt: "Saudi Made",
    },
  },
  quickLinks: {
    title: "Quick Links",
    items: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Catalogs", href: "/catalogs" },
      { label: "News", href: "/news" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  services: {
    title: "Services",
    items: [
      { label: "Oil & Gas Equipment", href: "/services" },
      { label: "Process Industry Screens", href: "/services" },
      { label: "Downhole Screens", href: "/services" },
      { label: "Screen Baskets & Strainers", href: "/services" },
      { label: "Product Treatments", href: "/services" },
    ],
  },
  contact: {
    title: "Contact Information",
    items: [
      {
        type: "email",
        label: "Email",
        value: siteSettings.contact.email,
        href: `mailto:${siteSettings.contact.email}`,
      },
      {
        type: "phone",
        label: "Phone",
        value: siteSettings.contact.phone,
        href: `tel:${siteSettings.contact.phone.replace(/\s/g, "")}`,
      },
      {
        type: "address",
        label: "Address",
        value: `${siteSettings.contact.address}, ${siteSettings.contact.city}, ${siteSettings.contact.country}`,
      },
    ],
  },
  bottomBar: {
    legalName: siteSettings.legalName,
    legalLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
};
