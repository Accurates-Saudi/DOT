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
    label: "Product Portfolio",
    title: "Engineered Solutions for Demanding Operations",
    introduction:
      "Precision-manufactured screens, strainers, and filtration systems designed for reliability in upstream, downstream, and industrial environments.",
  },
  listing: {
    label: "Our Products",
    heading: "Industrial Product Range",
    subheading:
      "Browse our portfolio of engineered solutions — each developed through rigorous design, advanced manufacturing, and field-proven performance.",
    searchPlaceholder: "Search products…",
    emptyStateMessage: "No products match your search. Try a different term.",
    viewProductLabel: "View Product",
    items: [
      {
        id: "wire-wrapped-screens",
        slug: "wire-wrapped-screens",
        name: "Wire Wrapped Screens",
        description:
          "Precision-wound wire screens for sand control and filtration in oil, gas, and water well applications.",
        category: "Downhole Screens",
        image: {
          src: capEngineering,
          alt: "Precision wire wrapped screen manufactured for downhole filtration",
        },
        href: "/contact",
      },
      {
        id: "premium-mesh-screens",
        slug: "premium-mesh-screens",
        name: "Premium Mesh Screens",
        description:
          "High-performance mesh screen systems engineered for consistent flow rates and extended service life in harsh conditions.",
        category: "Downhole Screens",
        image: {
          src: capQuality,
          alt: "Premium mesh screen assembly for industrial filtration",
        },
        href: "/contact",
      },
      {
        id: "downhole-sand-control",
        slug: "downhole-sand-control",
        name: "Downhole Sand Control Screens",
        description:
          "Engineered sand control solutions for production wells, designed to maximize reservoir contact and minimize formation damage.",
        category: "Downhole Screens",
        image: {
          src: engineeringCad,
          alt: "CAD design of downhole sand control screen system",
        },
        href: "/contact",
      },
      {
        id: "gravel-pack-screens",
        slug: "gravel-pack-screens",
        name: "Gravel Pack Screens",
        description:
          "Robust gravel pack screen assemblies for open-hole and cased-hole completions in challenging reservoir conditions.",
        category: "Downhole Screens",
        image: {
          src: capManufacturing,
          alt: "Gravel pack screen manufacturing on precision production line",
        },
        href: "/contact",
      },
      {
        id: "process-industry-screens",
        slug: "process-industry-screens",
        name: "Process Industry Screens",
        description:
          "Custom-engineered screening solutions for chemical, petrochemical, and process industries requiring precise separation.",
        category: "Process Screens",
        image: {
          src: engineeringBg,
          alt: "Industrial process screening equipment in manufacturing facility",
        },
        href: "/contact",
      },
      {
        id: "screen-baskets",
        slug: "screen-baskets",
        name: "Screen Baskets",
        description:
          "Precision-manufactured screen baskets for centrifuges, separators, and industrial filtration systems to exact specifications.",
        category: "Strainers & Baskets",
        image: {
          src: whyChooseFeatured,
          alt: "Precision-machined screen basket component",
        },
        href: "/contact",
      },
      {
        id: "industrial-strainers",
        slug: "industrial-strainers",
        name: "Industrial Strainers",
        description:
          "Heavy-duty strainers and inline filtration devices for pipeline, refinery, and plant operations under high pressure.",
        category: "Strainers & Baskets",
        image: {
          src: capInnovation,
          alt: "Industrial strainer assemblies ready for field deployment",
        },
        href: "/contact",
      },
      {
        id: "slotted-liners",
        slug: "slotted-liners",
        name: "Slotted Liners",
        description:
          "Precision-cut slotted liners for well completions, offering controlled flow distribution and reliable sand exclusion.",
        category: "Downhole Screens",
        image: {
          src: engineeringCnc,
          alt: "CNC-machined slotted liner for well completion",
        },
        href: "/contact",
      },
      {
        id: "screen-couplings",
        slug: "screen-couplings",
        name: "Screen Couplings & Accessories",
        description:
          "Engineered couplings, adapters, and completion accessories designed for seamless integration with DOT screen systems.",
        category: "Accessories",
        image: {
          src: facilityImage,
          alt: "Screen coupling and accessory components at DOT manufacturing facility",
        },
        href: "/contact",
      },
      {
        id: "custom-filtration",
        slug: "custom-filtration",
        name: "Custom Filtration Systems",
        description:
          "Bespoke filtration and separation solutions developed through collaborative engineering for unique operational requirements.",
        category: "Custom Engineering",
        image: {
          src: overviewHero,
          alt: "Custom-engineered filtration system manufactured by Dynamic Oil Tools",
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
