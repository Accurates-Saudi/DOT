import type { HomePageContent } from "@/types";

import { dotMapLocation } from "@/data/map";
import { newsArticles } from "@/data/news/articles";

import { productsPageContent } from "./products";

import heroBg1 from "@/assets/hero/hero-1.png";
import heroBg2 from "@/assets/hero/hero-2.png";
import aboutImage from "@/assets/about/facility.png";
import statisticsBg from "@/assets/about/overview-hero.png";
import whyChooseFeatured from "@/assets/why-choose/featured.png";
import whyChooseMissionBg from "@/assets/why-choose/mission-bg.png";
import whyChooseVisionBg from "@/assets/why-choose/vision-bg.png";
import cert1 from "@/assets/certificates/cert-1.png";
import cert2 from "@/assets/certificates/cert-2.png";
import cert3 from "@/assets/certificates/cert-3.png";
import cert4 from "@/assets/certificates/cert-4.png";
import cert5 from "@/assets/certificates/cert-5.png";
import newsHeader from "@/assets/news/header.png";
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
        "Factory of Technical Services for Industries\nAdvanced manufacturing & engineering",
      items: [
        { label: "Industrial\nMaintenance", icon: "maintenance" },
        { label: "Petroleum\nSolutions", icon: "petroleum" },
        { label: "Technical\nEngineering", icon: "engineering" },
        { label: "Plant Support\nServices", icon: "plant" },
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
  companyStatistics: {
    backgroundImage: {
      src: statisticsBg,
      alt: "Dynamic Oil Tools industrial manufacturing facility",
    },
    items: [
      {
        id: "years-experience",
        value: 24,
        suffix: "+",
        label: "Years Experience",
        icon: "experience",
      },
      {
        id: "projects-completed",
        value: 100,
        suffix: "+",
        label: "Projects",
        icon: "projects",
      },
      {
        id: "clients-worldwide",
        value: 50,
        suffix: "+",
        label: "Clients",
        icon: "clients",
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
  featuredProducts: {
    label: "Our Products",
    heading: "Featured Products",
    description:
      "A selection of engineered screens, strainers, and filtration solutions built for demanding oil & gas and industrial applications.",
    viewProductLabel: "View Product",
    exploreAll: { label: "Explore All Products", href: "/products" },
    autoplayDelayMs: 2500,
    transitionMs: 700,
    items: productsPageContent.listing.items.slice(0, 8),
  },
  certificates: {
    heading: "Our",
    headingAccent: "Certificates",
    subheading: "Recognized Globally",
    autoplayDelayMs: 2000,
    transitionMs: 800,
    items: [
      {
        id: "api-spec-4f",
        title: "API Spec 4F Certificate of Registration",
        image: {
          src: cert1,
          alt: "API Spec 4F Certificate of Registration",
        },
      },
      {
        id: "api-spec-7-1",
        title: "API Spec 7-1 Certificate of Registration",
        image: {
          src: cert2,
          alt: "API Spec 7-1 Certificate of Registration",
        },
      },
      {
        id: "api-spec-11b",
        title: "API Spec 11B Certificate of Registration",
        image: {
          src: cert3,
          alt: "API Spec 11B Certificate of Registration",
        },
      },
      {
        id: "api-spec-16a",
        title: "API Spec 16A Certificate of Registration",
        image: {
          src: cert4,
          alt: "API Spec 16A Certificate of Registration",
        },
      },
      {
        id: "api-spec-19c",
        title: "API Spec 19C Certificate of Registration",
        image: {
          src: cert5,
          alt: "API Spec 19C Certificate of Registration",
        },
      },
    ],
  },
  news: {
    label: "News & Insights",
    heading: "Industry",
    headingAccent: "Insights & Updates",
    description:
      "Stay informed with the latest company news, industry developments, exhibitions, and announcements from Dynamic Oil Tools across the oil and gas sector.",
    viewAll: { label: "View All News", href: "/news" },
    headerImage: {
      src: newsHeader,
      alt: "Dynamic Oil Tools manufacturing facility",
    },
    articles: newsArticles,
    locationMap: {
      title: "Our Location",
      ...dotMapLocation,
    },
    newsletter: {
      heading: "Stay Informed",
      description:
        "Subscribe to our newsletter for the latest updates, industry insights, and company news.",
      placeholder: "Enter your email",
      buttonLabel: "Subscribe",
    },
  },
};
