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
    heading: "Company Overview",
    body: [
      "Company introduction placeholder.",
      "Additional overview content placeholder.",
    ],
    image: {
      src: aboutImage,
      alt: "Dynamic Oil Tools manufacturing facility",
    },
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
