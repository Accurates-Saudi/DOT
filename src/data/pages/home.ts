import type { HomePageContent } from "@/types";

import heroBg1 from "@/assets/hero/hero-1.png";
import heroBg2 from "@/assets/hero/hero-2.png";
import aboutImage from "@/assets/about/facility.png";

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
  about: {
    servicesBanner: {
      title:
        "Factory of Technical Services for Industries — Advanced manufacturing & engineering",
      items: [
        { label: "Industrial Maintenance", icon: "maintenance" },
        { label: "Petroleum Solutions", icon: "petroleum" },
        { label: "Technical Engineering", icon: "engineering" },
        { label: "Plant Support Services", icon: "plant" },
      ],
      thumbnail: {
        src: heroBg1,
        alt: "DOT industrial operations overview",
      },
    },
    label: "Who we are",
    heading: "Driven by precision.",
    headingAccent: "Built for performance.",
    body: [
      "Dynamic Oil Tools is a Saudi industrial manufacturer specializing in oil & gas equipment, engineering services, advanced manufacturing, machining, and product treatments.",
      "We combine technical expertise with disciplined production to deliver tools and solutions that perform reliably in demanding field environments.",
    ],
    ctaPrimary: { label: "More About Us", href: "/about" },
    ctaVideo: { label: "Watch Our Video", href: "/about" },
    media: {
      image: {
        src: aboutImage,
        alt: "Dynamic Oil Tools manufacturing facility and industrial operations",
      },
      showPlayButton: true,
    },
  },
};
