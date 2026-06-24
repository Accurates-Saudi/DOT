import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation: {
  company: NavItem[];
  resources: NavItem[];
} = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [{ label: "News", href: "/news" }],
};
