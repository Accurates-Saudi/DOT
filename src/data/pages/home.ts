import type { HomePageContent } from "@/types";

import heroBg1 from "@/assets/hero/hero-1.png";
import heroBg2 from "@/assets/hero/hero-2.png";

export const homePageContent: HomePageContent = {
  meta: {
    title: "Home",
    description:
      "Dynamic Oil Tools — Saudi industrial manufacturing and oil & gas solutions built for reliability and performance.",
  },
  hero: {
    intervalMs: 7000,
    slides: [
      {
        label: "Engineered for excellence",
        headline: "Engineering performance.",
        headlineAccent: "Powering energy.",
        subheadline:
          "Advanced manufacturing and precision solutions for the global oil and gas industry.",
        ctaPrimary: { label: "Explore Our Solutions", href: "/products" },
        ctaSecondary: { label: "Learn More About Us", href: "/about" },
        background: {
          src: heroBg1,
          alt: "Industrial oil and gas facility with pipeline infrastructure at golden hour",
        },
      },
      {
        label: "Built for demanding operations",
        headline: "Precision tools.",
        headlineAccent: "Proven in the field.",
        subheadline:
          "High-performance oil & gas equipment manufactured in Saudi Arabia for reliability under pressure.",
        ctaPrimary: { label: "View Our Products", href: "/products" },
        ctaSecondary: { label: "Contact Our Team", href: "/contact" },
        background: {
          src: heroBg2,
          alt: "Advanced manufacturing and refinery operations at sunset",
        },
      },
    ],
  },
};
