import type { HomePageContent } from "@/types";

import { dotMapLocation } from "@/data/map";
import { newsArticles } from "@/data/news/articles";

import { productsPageContent } from "./products";

import heroBg1 from "@/assets/hero/hero-1.png";
import heroBg2 from "@/assets/hero/hero-2.png";
import aboutPhoto from "@/assets/about/about.jpg";
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
        label: "Precision Manufacturing for Oil & Gas",
        headline: "Engineered for Demanding Operations.",
        headlineAccent: "Built in Saudi Arabia.",
        subheadline:
          "Precision machining, downhole equipment, and engineered manufacturing solutions designed to deliver reliability, quality, and performance for the global oil & gas industry.",
        ctaPrimary: { label: "Explore Products", href: "/products" },
        ctaSecondary: { label: "About DOT", href: "/about" },
        background: {
          src: heroBg1,
          alt: "Industrial oil and gas facility with pipeline infrastructure at golden hour",
        },
      },
      {
        label: "Engineering • Manufacturing • Services",
        headline: "Precision Solutions.",
        headlineAccent: "Trusted in the Field.",
        subheadline:
          "From advanced machining and screen manufacturing to repair, refurbishment, and premium connection services, DOT supports operators with dependable solutions built for demanding environments.",
        ctaPrimary: { label: "Our Services", href: "/products" },
        ctaSecondary: { label: "Contact Us", href: "/contact" },
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
        "Engineering Excellence for Oil & Gas\nManufacturing • Machining • Industrial Services",
      items: [
        { label: "Precision\nMachining", icon: "maintenance" },
        { label: "Downhole\nEquipment", icon: "petroleum" },
        { label: "Engineering\nServices", icon: "engineering" },
        { label: "Plant\nSupport", icon: "plant" },
      ],
      thumbnail: {
        src: aboutPhoto,
        alt: "Dynamic Oil Tools operations",
      },
    },
    label: "Who we are",
    heading: "Driven by Precision.",
    headingAccent: "Built for Performance.",
    body: [
      "Dynamic Oil Tools (DOT) is a Saudi-based manufacturer specializing in precision machining, oil & gas equipment, engineering services, advanced manufacturing, and product treatments",
      "We combine engineering expertise with world-class manufacturing capabilities to deliver reliable, high-performance solutions that meet the demands of the global energy industry.",
    ],
    ctaPrimary: { label: "About DOT", href: "/about" },
    ctaVideo: { label: "Watch Our Video", href: "#about-video" },
    media: {
      videoId: "yarNwqOcXKU",
      showPlayButton: true,
    },
  },
  services: {
    heading: "What We",
    headingAccent: "Can Offer",
    ctaPrimary: { label: "Explore Services", href: "/products" },
    items: [
      {
        id: "oil-gas-equipment",
        title: "Oil & Gas Equipment",
        description:
          "Precision-engineered downhole and surface equipment manufactured to meet the demanding requirements of upstream and downstream oil & gas operations.",
        icon: "oil-gas",
        href: "/products",
      },
      {
        id: "process-industry-screens",
        title: "Process Industry Screens",
        description:
          "High-performance screening solutions designed for efficient separation, filtration, and long-term reliability across industrial processing applications.",
        icon: "process",
        href: "/products",
      },
      {
        id: "downhole-screens",
        title: "Downhole Screens",
        description:
          "Advanced sand control screen systems engineered to maximize production, improve well performance, and extend operational life.",
        icon: "downhole",
        href: "/products",
      },
      {
        id: "screen-baskets-strainers",
        title: "Screen Baskets & Strainers",
        description:
          "Custom-manufactured baskets and strainers built for accurate filtration, high flow efficiency, and dependable industrial performance.",
        icon: "strainers",
        href: "/products",
      },
      {
        id: "product-treatments",
        title: "Product Treatments",
        description:
          "Specialized surface treatments including hardbanding, laser cladding, and premium finishing services to improve durability, wear resistance, and equipment life.",
        icon: "treatments",
        href: "/products",
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
        value: 8,
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
    label: "",
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
      "Our engineering team combines advanced design, simulation, and precision manufacturing to develop reliable oil & gas solutions that meet demanding industry standards.",
    bullets: [
      
    ],
    steps: [
      {
        step: "01",
        title: "Designing, Modeling & Analysis",
        description:
          "Every solution begins with precision engineering. Using advanced CAD software and engineering analysis, our team develops optimized designs tailored to customer requirements and operational performance.",
        tag: "Autodesk Inventor Professional",
        icon: "modeling",
      },
      {
        step: "02",
        title: "CNC Machine Code Generator",
        description:
          "Approved designs are transformed into high-quality components through advanced CNC machining and CAM programming, ensuring consistent accuracy, repeatability, and manufacturing efficiency.",
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
