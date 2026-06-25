import type { CatalogsPageContent } from "@/types";

import capEngineering from "@/assets/about/capabilities/engineering.png";
import capManufacturing from "@/assets/about/capabilities/manufacturing.png";
import capQuality from "@/assets/about/capabilities/quality.png";
import facilityImage from "@/assets/about/facility.png";
import overviewHero from "@/assets/about/overview-hero.png";
import engineeringBg from "@/assets/engineering/bg.png";
import engineeringCad from "@/assets/engineering/cad.png";
import engineeringCnc from "@/assets/engineering/cnc.png";
import whyChooseFeatured from "@/assets/why-choose/featured.png";

export const catalogsPageContent: CatalogsPageContent = {
  meta: {
    title: "Catalogs",
    description:
      "Download Dynamic Oil Tools product catalogs, technical brochures, and company profiles.",
  },
  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Catalogs" },
    ],
    title: "Catalogs & Resources",
    introduction:
      "Access our technical documentation, product catalogs, and company profiles. Download PDF resources for engineering reference, procurement, and project planning.",
    backgroundImage: {
      src: overviewHero,
      alt: "Dynamic Oil Tools industrial manufacturing facility",
    },
  },
  library: {
    label: "Document Library",
    downloadLabel: "Download PDF",
    pdfLabel: "PDF",
    items: [
      {
        id: "company-profile",
        title: "Company Profile",
        description:
          "An overview of Dynamic Oil Tools — our capabilities, facilities, and commitment to Saudi industrial excellence.",
        cover: {
          src: overviewHero,
          alt: "Dynamic Oil Tools company profile cover",
        },
        pdf: {
          href: "/downloads/dot-company-profile.pdf",
          fileName: "dot-company-profile.pdf",
        },
      },
      {
        id: "product-catalog",
        title: "Product Catalog",
        description:
          "Complete reference of engineered screens, strainers, and filtration solutions for oil & gas and industrial applications.",
        cover: {
          src: whyChooseFeatured,
          alt: "Dynamic Oil Tools product catalog cover",
        },
        pdf: {
          href: "/downloads/dot-product-catalog.pdf",
          fileName: "dot-product-catalog.pdf",
        },
      },
      {
        id: "wire-wrapped-screens",
        title: "Wire Wrapped Screens",
        description:
          "Technical brochure covering sand control screens, slot configurations, and well completion applications.",
        cover: {
          src: capEngineering,
          alt: "Wire wrapped screens brochure cover",
        },
        pdf: {
          href: "/downloads/wire-wrapped-screens-brochure.pdf",
          fileName: "wire-wrapped-screens-brochure.pdf",
        },
      },
      {
        id: "downhole-solutions",
        title: "Downhole Solutions",
        description:
          "Engineered downhole screen assemblies, gravel pack systems, and sand control solutions for production wells.",
        cover: {
          src: engineeringCad,
          alt: "Downhole solutions catalog cover",
        },
        pdf: {
          href: "/downloads/downhole-solutions-catalog.pdf",
          fileName: "downhole-solutions-catalog.pdf",
        },
      },
      {
        id: "process-strainers",
        title: "Process Industry Strainers",
        description:
          "Industrial strainers and inline filtration products for process plants, refineries, and utility systems.",
        cover: {
          src: capManufacturing,
          alt: "Process industry strainers brochure cover",
        },
        pdf: {
          href: "/downloads/process-industry-strainers.pdf",
          fileName: "process-industry-strainers.pdf",
        },
      },
      {
        id: "filtration-systems",
        title: "Filtration Systems",
        description:
          "Technical guide to filtration media, housing configurations, and performance specifications.",
        cover: {
          src: capQuality,
          alt: "Filtration systems technical guide cover",
        },
        pdf: {
          href: "/downloads/filtration-systems-guide.pdf",
          fileName: "filtration-systems-guide.pdf",
        },
      },
      {
        id: "manufacturing-capabilities",
        title: "Manufacturing Capabilities",
        description:
          "Facility overview, production processes, and quality systems supporting precision industrial manufacturing.",
        cover: {
          src: facilityImage,
          alt: "Manufacturing capabilities brochure cover",
        },
        pdf: {
          href: "/downloads/manufacturing-capabilities.pdf",
          fileName: "manufacturing-capabilities.pdf",
        },
      },
      {
        id: "engineering-services",
        title: "Engineering Services",
        description:
          "Design engineering, CAD modeling, and CNC machining services for custom oil & gas components.",
        cover: {
          src: engineeringCnc,
          alt: "Engineering services overview cover",
        },
        pdf: {
          href: "/downloads/engineering-services-overview.pdf",
          fileName: "engineering-services-overview.pdf",
        },
      },
      {
        id: "quality-certifications",
        title: "Quality & Certifications",
        description:
          "Quality management framework, industry certifications, and compliance documentation summary.",
        cover: {
          src: engineeringBg,
          alt: "Quality and certifications profile cover",
        },
        pdf: {
          href: "/downloads/quality-certifications-profile.pdf",
          fileName: "quality-certifications-profile.pdf",
        },
      },
    ],
  },
};

export const catalogsPageMeta = catalogsPageContent.meta;
