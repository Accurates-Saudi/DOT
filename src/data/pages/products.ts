import type { ProductsPageContent } from "@/types";

import capEngineering from "@/assets/about/capabilities/engineering.png";
import capInnovation from "@/assets/about/capabilities/innovation.png";
import capManufacturing from "@/assets/about/capabilities/manufacturing.png";
import capQuality from "@/assets/about/capabilities/quality.png";
import facilityImage from "@/assets/about/facility.png";
import overviewHero from "@/assets/about/overview-hero.png";
import engineeringBg from "@/assets/engineering/bg.png";
import engineeringCad from "@/assets/engineering/cad.png";
import engineeringCnc from "@/assets/engineering/cnc.png";
import whyChooseFeatured from "@/assets/why-choose/featured.png";

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
  },
  listing: {
    searchPlaceholder: "Search products…",
    emptyStateMessage: "No products match your search.",
    viewProductLabel: "View Product",
    items: [
      {
        id: "wire-wrapped-screens",
        slug: "wire-wrapped-screens",
        name: "Wire Wrapped Screens",
        description: "Sand control and filtration for well applications.",
        category: "Downhole Screens",
        image: {
          src: capEngineering,
          alt: "Wire wrapped screen",
        },
        href: "/contact",
      },
      {
        id: "premium-mesh-screens",
        slug: "premium-mesh-screens",
        name: "Premium Mesh Screens",
        description: "High-performance mesh for demanding conditions.",
        category: "Downhole Screens",
        image: {
          src: capQuality,
          alt: "Premium mesh screen",
        },
        href: "/contact",
      },
      {
        id: "downhole-sand-control",
        slug: "downhole-sand-control",
        name: "Downhole Sand Control",
        description: "Sand control solutions for production wells.",
        category: "Downhole Screens",
        image: {
          src: engineeringCad,
          alt: "Downhole sand control screen",
        },
        href: "/contact",
      },
      {
        id: "gravel-pack-screens",
        slug: "gravel-pack-screens",
        name: "Gravel Pack Screens",
        description: "Screen assemblies for open and cased-hole completions.",
        category: "Downhole Screens",
        image: {
          src: capManufacturing,
          alt: "Gravel pack screen",
        },
        href: "/contact",
      },
      {
        id: "process-industry-screens",
        slug: "process-industry-screens",
        name: "Process Industry Screens",
        description: "Screening solutions for process industries.",
        category: "Process Screens",
        image: {
          src: engineeringBg,
          alt: "Process industry screen",
        },
        href: "/contact",
      },
      {
        id: "screen-baskets",
        slug: "screen-baskets",
        name: "Screen Baskets",
        description: "Precision baskets for separators and filtration.",
        category: "Strainers & Baskets",
        image: {
          src: whyChooseFeatured,
          alt: "Screen basket",
        },
        href: "/contact",
      },
      {
        id: "industrial-strainers",
        slug: "industrial-strainers",
        name: "Industrial Strainers",
        description: "Heavy-duty strainers for pipeline and plant use.",
        category: "Strainers & Baskets",
        image: {
          src: capInnovation,
          alt: "Industrial strainer",
        },
        href: "/contact",
      },
      {
        id: "slotted-liners",
        slug: "slotted-liners",
        name: "Slotted Liners",
        description: "Precision-cut liners for well completions.",
        category: "Downhole Screens",
        image: {
          src: engineeringCnc,
          alt: "Slotted liner",
        },
        href: "/contact",
      },
      {
        id: "screen-couplings",
        slug: "screen-couplings",
        name: "Screen Couplings",
        description: "Couplings and accessories for screen systems.",
        category: "Accessories",
        image: {
          src: facilityImage,
          alt: "Screen couplings",
        },
        href: "/contact",
      },
      {
        id: "custom-filtration",
        slug: "custom-filtration",
        name: "Custom Filtration",
        description: "Bespoke filtration for unique requirements.",
        category: "Custom Engineering",
        image: {
          src: overviewHero,
          alt: "Custom filtration system",
        },
        href: "/contact",
      },
    ],
  },
  cta: {
    heading: "Need a custom engineering solution?",
    body: "Contact our team.",
    ctaPrimary: { label: "Contact Us", href: "/contact" },
  },
};
