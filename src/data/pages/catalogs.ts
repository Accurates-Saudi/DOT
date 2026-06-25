import type { CatalogsPageContent } from "@/types";

import corporateProfile from "@/assets/catalogs/Corporate Profile.jpg";
import groundWaterScreens from "@/assets/catalogs/Ground Water Screens.jpg";
import oilAndGasEquipment from "@/assets/catalogs/Oil and Gas Equipment.jpg";
import processIndustryScreens from "@/assets/catalogs/Process Industry Screens.jpg";
import overviewHero from "@/assets/about/overview-hero.png";

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
        id: "corporate-profile",
        title: "Corporate Profile",
        description:
          "Company overview covering Dynamic Oil Tools' capabilities, facilities, and commitment to Saudi industrial excellence.",
        cover: {
          src: corporateProfile,
          alt: "Corporate Profile catalog cover",
        },
      },
      {
        id: "ground-water-screens",
        title: "Ground Water Screens",
        description:
          "Technical catalog for groundwater well screens, slot configurations, and filtration applications.",
        cover: {
          src: groundWaterScreens,
          alt: "Ground Water Screens catalog cover",
        },
      },
      {
        id: "oil-and-gas-equipment",
        title: "Oil and Gas Equipment",
        description:
          "Engineered downhole screens, sand control systems, and oil & gas production equipment.",
        cover: {
          src: oilAndGasEquipment,
          alt: "Oil and Gas Equipment catalog cover",
        },
      },
      {
        id: "process-industry-screens",
        title: "Process Industry Screens",
        description:
          "Industrial screens and strainers for process plants, refineries, and utility filtration systems.",
        cover: {
          src: processIndustryScreens,
          alt: "Process Industry Screens catalog cover",
        },
      },
    ],
  },
};

export const catalogsPageMeta = catalogsPageContent.meta;
