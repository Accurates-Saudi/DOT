import type { NavItem } from "@/types";

export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Catalogs", href: "/catalogs" },
  { label: "Contact Us", href: "/contact" },
];

export const footerNavigation: {
  company: NavItem[];
  resources: NavItem[];
} = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Catalogs", href: "/catalogs" },
    { label: "Contact Us", href: "/contact" },
  ],
  resources: [{ label: "News", href: "/news" }],
};
