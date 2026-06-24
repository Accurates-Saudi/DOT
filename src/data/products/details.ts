import type { ProductDetailContent, SpecificationRow } from "@/types";

import capEngineering from "@/assets/about/capabilities/engineering.png";
import capInnovation from "@/assets/about/capabilities/innovation.png";
import capManufacturing from "@/assets/about/capabilities/manufacturing.png";
import capQuality from "@/assets/about/capabilities/quality.png";
import facilityImage from "@/assets/about/facility.png";
import overviewHero from "@/assets/about/overview-hero.png";
import engineeringBg from "@/assets/engineering/bg.png";
import engineeringCad from "@/assets/engineering/cad.png";
import engineeringCnc from "@/assets/engineering/cnc.png";
import whyChooseFeatured from "@/assets/why-choose/featured.png";

const defaultContactCta = {
  heading: "Need Technical Assistance?",
  body: "Our engineering team is ready to help you select the right solution for your application.",
  ctaPrimary: { label: "Contact Us", href: "/contact" },
  ctaSecondary: { label: "Request Information", href: "/contact" },
};

interface ProductSeed {
  id: string;
  slug: string;
  category: string;
  name: string;
  introduction: string;
  image: { src: string; alt: string };
  overview: string | string[];
  applications: string[];
  features: string[];
  benefits: string[];
  specifications?: SpecificationRow[];
}

function normalizeOverview(overview: string | string[]): string[] {
  if (Array.isArray(overview)) return overview;

  const sentences = overview
    .match(/[^.!?]+[.!?]+/g)
    ?.map((sentence) => sentence.trim())
    .filter(Boolean);

  return sentences?.length ? sentences : [overview];
}

function createProductDetail(seed: ProductSeed): ProductDetailContent {
  return {
    id: seed.id,
    slug: seed.slug,
    category: seed.category,
    meta: {
      title: seed.name,
      description: seed.introduction,
    },
    hero: {
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: seed.category, href: "/products" },
        { label: seed.name },
      ],
      category: seed.category,
      name: seed.name,
      introduction: seed.introduction,
      image: seed.image,
      ctaContact: { label: "Contact Us", href: "/contact" },
    },
    overview: {
      heading: "Overview",
      paragraphs: normalizeOverview(seed.overview),
    },
    info: {
      applications: { title: "Applications", items: seed.applications },
      features: { title: "Features", items: seed.features },
      benefits: { title: "Benefits", items: seed.benefits },
    },
    ...(seed.specifications?.length
      ? {
          specifications: {
            heading: "Technical Data",
            rows: seed.specifications,
          },
        }
      : {}),
    contactCta: defaultContactCta,
  };
}

const productSeeds: ProductSeed[] = [
  {
    id: "wire-wrapped-screens",
    slug: "wire-wrapped-screens",
    category: "Downhole Screens",
    name: "Wire Wrapped Screens",
    introduction:
      "Precision-wound wire screens for sand control and filtration in oil, gas, and water well applications.",
    image: { src: capEngineering, alt: "Wire wrapped screen" },
    overview:
      "DOT wire wrapped screens are manufactured using precision-wound wire wrapped around support rods, creating uniform slot openings for reliable sand control and fluid filtration in demanding downhole environments.",
    applications: [
      "Oil and gas production wells",
      "Water well completions",
      "Sand control operations",
      "Injection and disposal wells",
    ],
    features: [
      "Uniform slot openings",
      "Precision-wound wire construction",
      "High collapse resistance",
      "Custom slot sizes and diameters",
    ],
    benefits: [
      "Consistent flow performance",
      "Extended service life",
      "Corrosion-resistant material options",
      "Field-proven reliability",
    ],
    specifications: [
      { label: "Material", value: "Stainless steel, duplex, nickel alloys" },
      { label: "Application", value: "Sand control, water wells, oil & gas production" },
      { label: "Size Range", value: "2\" to 20\" OD, custom lengths" },
      { label: "Operating Conditions", value: "Up to 10,000 psi, 300°F standard" },
      { label: "Industry Standards", value: "API 5CT, ISO 9001 manufacturing" },
    ],
  },
  {
    id: "premium-mesh-screens",
    slug: "premium-mesh-screens",
    category: "Downhole Screens",
    name: "Premium Mesh Screens",
    introduction:
      "High-performance mesh screen systems engineered for consistent flow rates in demanding conditions.",
    image: { src: capQuality, alt: "Premium mesh screen" },
    overview:
      "Premium mesh screens combine multi-layer mesh construction with robust support structures for superior filtration performance in production and injection wells.",
    applications: [
      "Production wells",
      "Injection wells",
      "Sand control completions",
      "Horizontal well applications",
    ],
    features: [
      "Multi-layer mesh construction",
      "High open area design",
      "Robust support structure",
      "Standard completion compatibility",
    ],
    benefits: [
      "Maximum flow capacity",
      "Proven sand exclusion",
      "Performance under variable conditions",
      "Reduced completion risk",
    ],
    specifications: [
      { label: "Material", value: "316L stainless steel mesh, alloy support" },
      { label: "Application", value: "Production wells, injection wells, sand control" },
      { label: "Size Range", value: "2-3/8\" to 13-3/8\" OD" },
      { label: "Operating Conditions", value: "High temperature and pressure rated" },
      { label: "Industry Standards", value: "API compliant, ISO 9001 certified" },
    ],
  },
  {
    id: "downhole-sand-control",
    slug: "downhole-sand-control",
    category: "Downhole Screens",
    name: "Downhole Sand Control",
    introduction:
      "Engineered sand control solutions for production wells in unconsolidated formations.",
    image: { src: engineeringCad, alt: "Downhole sand control screen" },
    overview:
      "DOT downhole sand control systems maximize reservoir contact while preventing sand production in challenging formation environments, with engineering support for well-specific configurations.",
    applications: [
      "Unconsolidated formations",
      "Horizontal wells",
      "High-rate producers",
      "Weakly consolidated reservoirs",
    ],
    features: [
      "Optimized screen geometry",
      "Formation-specific design",
      "Sour service options",
      "High-temperature rated variants",
    ],
    benefits: [
      "Maximized reservoir contact",
      "Reduced formation damage",
      "Field-proven sand exclusion",
      "Engineering support included",
    ],
    specifications: [
      { label: "Material", value: "Stainless steel, Inconel, duplex alloys" },
      { label: "Application", value: "Unconsolidated formations, horizontal wells" },
      { label: "Size Range", value: "Custom configurations per well design" },
      { label: "Operating Conditions", value: "Sour service and high-temp rated options" },
      { label: "Industry Standards", value: "NACE MR0175, API standards" },
    ],
  },
  {
    id: "gravel-pack-screens",
    slug: "gravel-pack-screens",
    category: "Downhole Screens",
    name: "Gravel Pack Screens",
    introduction:
      "Robust screen assemblies for open-hole and cased-hole gravel pack completions.",
    image: { src: capManufacturing, alt: "Gravel pack screen" },
    overview:
      "Gravel pack screens support gravel placement operations while maintaining structural integrity under gravel pack and production loads in open-hole and cased-hole designs.",
    applications: [
      "Open-hole gravel pack",
      "Cased-hole gravel pack",
      "Horizontal completions",
      "High-permeability formations",
    ],
    features: [
      "Heavy-wall construction",
      "Uniform gravel placement support",
      "High collapse and burst ratings",
      "Multiple connection options",
    ],
    benefits: [
      "Structural integrity under load",
      "Reliable gravel pack support",
      "Proven completion performance",
      "Configurable for well design",
    ],
    specifications: [
      { label: "Material", value: "Carbon steel, stainless steel, CRA alloys" },
      { label: "Application", value: "Open-hole and cased-hole gravel pack" },
      { label: "Size Range", value: "4-1/2\" to 20\" OD" },
      { label: "Operating Conditions", value: "Rated for gravel pack operations" },
      { label: "Industry Standards", value: "API 5CT, customer-specific specs" },
    ],
  },
  {
    id: "process-industry-screens",
    slug: "process-industry-screens",
    category: "Process Screens",
    name: "Process Industry Screens",
    introduction:
      "Custom-engineered screening solutions for chemical, petrochemical, and process industries.",
    image: { src: engineeringBg, alt: "Process industry screen" },
    overview:
      "Process industry screens are manufactured to precise specifications for separation, filtration, and sizing in chemical, petrochemical, and industrial processing plants.",
    applications: [
      "Chemical processing",
      "Petrochemical plants",
      "Food and beverage processing",
      "Industrial separation systems",
    ],
    features: [
      "Custom geometries and mesh",
      "Corrosion-resistant materials",
      "Precision manufacturing tolerances",
      "Rapid prototyping capability",
    ],
    benefits: [
      "Tailored to process requirements",
      "Long service life in corrosive media",
      "Consistent separation performance",
      "Reduced downtime and maintenance",
    ],
    specifications: [
      { label: "Material", value: "SS316, SS304, Hastelloy, Monel" },
      { label: "Application", value: "Chemical, petrochemical, food processing" },
      { label: "Size Range", value: "Custom per application" },
      { label: "Operating Conditions", value: "Corrosive and high-temperature environments" },
      { label: "Industry Standards", value: "ASME, ASTM material standards" },
    ],
  },
  {
    id: "screen-baskets",
    slug: "screen-baskets",
    category: "Strainers & Baskets",
    name: "Screen Baskets",
    introduction:
      "Precision-manufactured screen baskets for centrifuges, separators, and filtration systems.",
    image: { src: whyChooseFeatured, alt: "Screen basket" },
    overview:
      "DOT screen baskets are precision-manufactured to exact dimensional specifications for centrifuge, separator, and filtration equipment in continuous industrial operation.",
    applications: [
      "Centrifuge equipment",
      "Separator vessels",
      "Filtration systems",
      "OEM equipment integration",
    ],
    features: [
      "Exact dimensional tolerances",
      "Uniform slot geometry",
      "High structural strength",
      "Custom and replacement designs",
    ],
    benefits: [
      "Reliable separation performance",
      "Extended equipment service life",
      "Reduced replacement frequency",
      "OEM specification compliance",
    ],
    specifications: [
      { label: "Material", value: "Stainless steel, specialty alloys" },
      { label: "Application", value: "Centrifuges, separators, filtration vessels" },
      { label: "Size Range", value: "Custom per equipment specification" },
      { label: "Operating Conditions", value: "Continuous industrial operation" },
      { label: "Industry Standards", value: "OEM specifications, ISO 9001" },
    ],
  },
  {
    id: "industrial-strainers",
    slug: "industrial-strainers",
    category: "Strainers & Baskets",
    name: "Industrial Strainers",
    introduction:
      "Heavy-duty strainers and inline filtration devices for pipeline and plant operations.",
    image: { src: capInnovation, alt: "Industrial strainer" },
    overview:
      "Industrial strainers protect downstream equipment by removing debris and particulates from process fluids in pipeline, refinery, and plant operations under high pressure.",
    applications: [
      "Pipeline protection",
      "Refinery operations",
      "Plant process lines",
      "Pump and valve protection",
    ],
    features: [
      "Y-type and basket configurations",
      "High pressure ratings",
      "Easy maintenance access",
      "Custom inlet/outlet options",
    ],
    benefits: [
      "Downstream equipment protection",
      "Reduced maintenance costs",
      "Reliable continuous operation",
      "Configurable for plant layout",
    ],
    specifications: [
      { label: "Material", value: "Carbon steel, stainless steel, duplex" },
      { label: "Application", value: "Pipeline, refinery, plant protection" },
      { label: "Size Range", value: "1\" to 48\" nominal bore" },
      { label: "Operating Conditions", value: "ANSI pressure classes 150–2500" },
      { label: "Industry Standards", value: "ASME B16.34, API 6D" },
    ],
  },
  {
    id: "slotted-liners",
    slug: "slotted-liners",
    category: "Downhole Screens",
    name: "Slotted Liners",
    introduction:
      "Precision-cut slotted liners for well completions with controlled flow distribution.",
    image: { src: engineeringCnc, alt: "Slotted liner" },
    overview:
      "Slotted liners provide controlled flow distribution and sand exclusion in well completions where slot geometry and open area are critical to long-term performance.",
    applications: [
      "Well completions",
      "Horizontal wells",
      "Open-hole completions",
      "Cased-hole liners",
    ],
    features: [
      "Precision CNC slot cutting",
      "Controlled open area percentage",
      "High collapse resistance",
      "Custom slot patterns",
    ],
    benefits: [
      "Consistent flow distribution",
      "Reliable sand exclusion",
      "Predictable production performance",
      "Configurable slot geometry",
    ],
    specifications: [
      { label: "Material", value: "Carbon steel, stainless steel, CRA" },
      { label: "Application", value: "Well completions, horizontal wells" },
      { label: "Size Range", value: "4-1/2\" to 13-3/8\" OD" },
      { label: "Operating Conditions", value: "Standard and high-temp rated" },
      { label: "Industry Standards", value: "API 5CT, customer well specs" },
    ],
  },
  {
    id: "screen-couplings",
    slug: "screen-couplings",
    category: "Accessories",
    name: "Screen Couplings",
    introduction:
      "Engineered couplings, adapters, and completion accessories for DOT screen systems.",
    image: { src: facilityImage, alt: "Screen couplings" },
    overview:
      "Screen couplings and accessories provide reliable connections between screen joints and completion hardware, manufactured to match DOT screen systems and standard completion tooling.",
    applications: [
      "Screen joint connections",
      "Downhole completions",
      "Screen assembly integration",
      "Field repair and replacement",
    ],
    features: [
      "High-strength threaded connections",
      "DOT screen system compatibility",
      "Corrosion-resistant coatings",
      "Full traceability",
    ],
    benefits: [
      "Seamless system integration",
      "Reliable downhole connections",
      "Reduced assembly time",
      "Complete documentation support",
    ],
  },
  {
    id: "custom-filtration",
    slug: "custom-filtration",
    category: "Custom Engineering",
    name: "Custom Filtration",
    introduction:
      "Bespoke filtration and separation solutions developed through collaborative engineering.",
    image: { src: overviewHero, alt: "Custom filtration system" },
    overview:
      "DOT custom filtration solutions are developed in partnership with clients to address unique operational challenges, from concept through manufacturing with rigorous testing and quality assurance.",
    applications: [
      "Unique separation challenges",
      "Specialized industrial processes",
      "Prototype and pilot projects",
      "Replacement of obsolete equipment",
    ],
    features: [
      "Collaborative engineering process",
      "Application-specific materials",
      "Prototype to production capability",
      "Full technical documentation",
    ],
    benefits: [
      "Tailored to exact requirements",
      "Reduced operational risk",
      "Single-source engineering support",
      "Scalable from pilot to production",
    ],
  },
];

export const productDetails: ProductDetailContent[] = productSeeds.map(
  createProductDetail,
);

export const productDetailsBySlug = Object.fromEntries(
  productDetails.map((product) => [product.slug, product]),
) as Record<string, ProductDetailContent>;
