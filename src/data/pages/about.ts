import type { AboutPageContent } from "@/types";

import aboutImage from "@/assets/about/facility.png";

export const aboutPageContent: AboutPageContent = {
  meta: {
    title: "About",
    description:
      "Learn about Dynamic Oil Tools — our mission, capabilities, and commitment to Saudi industrial excellence.",
  },
  hero: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "About Us" },
    ],
    title: "About Us",
    introduction:
      "Dynamic Oil Tools is a Saudi industrial manufacturing company serving the oil & gas and energy industries.",
  },
  companyOverview: {
    label: "Company Overview",
    heading: "Who We Are",
    body: [
      "DOT is a Saudi-based manufacturer of high-performance screens, strainers, and filtration solutions engineered for demanding oil & gas and industrial applications.",
      "Built on a strong engineering foundation, we combine advanced manufacturing capabilities with a commitment to reliability, quality, and client-focused service — delivering products that perform in the field and support long-term operational efficiency.",
    ],
    image: {
      src: aboutImage,
      alt: "Dynamic Oil Tools manufacturing facility in Saudi Arabia",
    },
    features: [
      {
        id: "saudi-made",
        icon: "saudi-made",
        title: "Saudi Made",
        description: "Proudly designed and manufactured in Saudi Arabia.",
      },
      {
        id: "quality-driven",
        icon: "quality-driven",
        title: "Quality Driven",
        description:
          "Committed to the highest quality standards across every process.",
      },
      {
        id: "client-focused",
        icon: "client-focused",
        title: "Client Focused",
        description:
          "Building long-term partnerships through trust and reliability.",
      },
      {
        id: "global-supply",
        icon: "global-supply",
        title: "Global Supply",
        description:
          "Serving clients across the globe with consistent performance.",
      },
    ],
    stats: [
      {
        id: "experience",
        icon: "experience",
        value: "20+",
        label: "Years of Experience",
      },
      {
        id: "facility",
        icon: "facility",
        value: "25,000+",
        label: "m² Manufacturing Facility",
      },
      {
        id: "professionals",
        icon: "professionals",
        value: "150+",
        label: "Skilled Professionals",
      },
      {
        id: "countries",
        icon: "countries",
        value: "30+",
        label: "Countries Served",
      },
    ],
  },
  engineeringManufacturing: {
    heading: "Engineering & Manufacturing Excellence",
    subheading: "Key capabilities and industrial strengths placeholder.",
    capabilities: [
      {
        id: "capability-1",
        title: "Capability placeholder",
        description: "Technical expertise placeholder.",
      },
      {
        id: "capability-2",
        title: "Capability placeholder",
        description: "Industrial strength placeholder.",
      },
      {
        id: "capability-3",
        title: "Capability placeholder",
        description: "Manufacturing excellence placeholder.",
      },
    ],
  },
};
