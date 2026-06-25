import type { AboutPageContent } from "@/types";

import aboutImage from "@/assets/about/overview-hero.png";
import capEngineering from "@/assets/about/capabilities/engineering.png";
import capInnovation from "@/assets/about/capabilities/innovation.png";
import capManufacturing from "@/assets/about/capabilities/manufacturing.png";
import capQuality from "@/assets/about/capabilities/quality.png";

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
    backgroundImage: {
      src: aboutImage,
      alt: "Dynamic Oil Tools industrial manufacturing facility",
    },
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
      alt: "Precision-engineered oil and gas tooling manufactured by Dynamic Oil Tools",
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
    label: "Our Capabilities",
    heading: "What We Do Best",
    subheading:
      "We combine engineering expertise, advanced manufacturing and rigorous quality control to deliver reliable solutions that perform in the toughest conditions.",
    capabilities: [
      {
        id: "engineering-excellence",
        icon: "engineering",
        title: "Engineering Excellence",
        description:
          "Advanced design, simulation and technical expertise to develop high-performance solutions.",
        image: {
          src: capEngineering,
          alt: "Engineering blueprints and precision metal components",
        },
      },
      {
        id: "advanced-manufacturing",
        icon: "manufacturing",
        title: "Advanced Manufacturing",
        description:
          "State-of-the-art production capabilities ensuring precision, efficiency and scalability.",
        image: {
          src: capManufacturing,
          alt: "Advanced laser cutting and manufacturing process",
        },
      },
      {
        id: "quality-assurance",
        icon: "quality",
        title: "Quality Assurance",
        description:
          "Strict quality control processes ensuring reliability, compliance and long-term performance.",
        image: {
          src: capQuality,
          alt: "Quality inspection of industrial filtration equipment",
        },
      },
      {
        id: "continuous-innovation",
        icon: "innovation",
        title: "Continuous Innovation",
        description:
          "Ongoing R&D and process improvement to meet evolving industry demands.",
        image: {
          src: capInnovation,
          alt: "Finished industrial pipes ready for deployment",
        },
      },
    ],
    cta: {
      heading: "Looking for Engineering Solutions?",
      body: "Partner with DOT for reliable, efficient and high-performance solutions built for your toughest challenges.",
      ctaPrimary: { label: "Contact Us", href: "/contact" },
      ctaSecondary: { label: "View Products", href: "/products" },
    },
  },
};
