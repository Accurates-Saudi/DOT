import type { HomePageContent } from "@/types";

import heroBg1 from "@/assets/hero/hero-1.png";
import heroBg2 from "@/assets/hero/hero-2.png";
import aboutImage from "@/assets/about/facility.png";
import whyChooseFeatured from "@/assets/why-choose/featured.png";
import whyChooseMissionBg from "@/assets/why-choose/mission-bg.png";
import whyChooseVisionBg from "@/assets/why-choose/vision-bg.png";
import engineeringBg from "@/assets/engineering/bg.png";

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
  services: {
    heading: "What We",
    headingAccent: "Can Offer",
    ctaPrimary: { label: "Explore Services", href: "/services" },
    items: [
      {
        id: "oil-gas-equipment",
        title: "Oil & Gas Equipment",
        description:
          "Precision-manufactured tools and equipment for upstream and downstream operations, built to withstand demanding field conditions.",
        icon: "oil-gas",
        href: "/services",
      },
      {
        id: "process-industry-screens",
        title: "Process Industry Screens",
        description:
          "Engineered screening solutions for process industries, designed for efficiency, durability, and consistent performance.",
        icon: "process",
        href: "/services",
      },
      {
        id: "downhole-screens",
        title: "Downhole Screens",
        description:
          "High-performance downhole screen systems for sand control and filtration in oil, gas, and water well applications.",
        icon: "downhole",
        href: "/services",
      },
      {
        id: "screen-baskets-strainers",
        title: "Screen Baskets & Strainers",
        description:
          "Custom screen baskets and strainers manufactured to precise specifications for industrial separation and filtration.",
        icon: "strainers",
        href: "/services",
      },
      {
        id: "product-treatments",
        title: "Product Treatments",
        description:
          "Specialized surface treatments and finishing processes that enhance product durability, corrosion resistance, and service life.",
        icon: "treatments",
        href: "/services",
      },
    ],
  },
  whyChooseUs: {
    label: "Why Choose Us",
    heading: "Why Choose Us",
    subheading: "We Are a Leader In Industrial Market",
    featuredImage: {
      src: whyChooseFeatured,
      alt: "Precision-machined industrial component manufactured by Dynamic Oil Tools",
    },
    ctaPanel: {
      heading: "We Are Open For Opportunities!",
      ctaPrimary: { label: "View Our Works", href: "/products" },
      ctaSecondary: { label: "Make An Appointment", href: "/contact" },
    },
    mission: {
      title: "Mission",
      body: "Delivering cutting-edge products to our customers through our continuously innovative facility. Supporting our clients with technically advanced and cost-efficient solutions.",
      backgroundImage: {
        src: whyChooseMissionBg,
        alt: "",
      },
    },
    vision: {
      title: "Vision",
      body: "DOT aims to be a global leader focused on manufacturing high-quality, market-oriented, and state-of-the-art products for the oil and gas industry.",
      backgroundImage: {
        src: whyChooseVisionBg,
        alt: "",
      },
    },
    tagline: "Precision. Performance. Partnership.",
  },
  engineering: {
    label: "R&D / Engineering Department",
    heading: "How",
    headingAccent: "We",
    headingSuffix: "Work",
    intro:
      "Our engineering process combines advanced design, simulation, and precision manufacturing to deliver reliable and high-performance solutions.",
    bullets: [
      "Modeling, assembling of industrial products using various CAD softwares",
      "FEM Engineering Analysis of industrial products",
    ],
    steps: [
      {
        step: "01",
        title: "Designing, Modeling & Analysis",
        description:
          "We utilize industry-leading CAD tools to design and model industrial components with accuracy and efficiency.",
        tag: "Autodesk Inventor Professional",
        icon: "modeling",
      },
      {
        step: "02",
        title: "CNC Machine Code Generator",
        description:
          "We generate precise CNC codes using advanced CAM software to ensure seamless manufacturing.",
        tag: "Inventor HSM (CAM) & Feature CAM",
        icon: "cnc",
      },
    ],
    backgroundImage: {
      src: engineeringBg,
      alt: "",
    },
  },
};
