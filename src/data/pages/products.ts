import type { ProductsPageContent } from "@/types";

import { productDetails, toProductItem } from "@/data/products";
import overviewHero from "@/assets/about/overview-hero.png";

export const productsPageContent: ProductsPageContent = {
  meta: {
    title: "Products",
    description:
      "Explore Dynamic Oil Tools' engineered screens, strainers, and filtration solutions for oil & gas and industrial applications.",
  },
  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Products" },
    ],
    title: "Products",
    introduction:
      "Engineered screens, strainers, and filtration solutions for oil & gas and industrial applications.",
    backgroundImage: {
      src: overviewHero,
      alt: "Dynamic Oil Tools industrial manufacturing facility",
    },
  },
  listing: {
    searchPlaceholder: "Search products…",
    emptyStateMessage: "No products match your search.",
    viewProductLabel: "View Product",
    items: productDetails.map(toProductItem),
  },
  cta: {
    heading: "Need a custom engineering solution?",
    body: "Contact our team.",
    ctaPrimary: { label: "Contact Us", href: "/contact" },
  },
};
