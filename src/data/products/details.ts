import type {
  ImageAsset,
  ProductDetailContent,
  SpecificationRow,
} from "@/types";

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

const sharedGalleryImages: ImageAsset[] = [
  { src: capEngineering, alt: "Engineered screen component close-up" },
  { src: capManufacturing, alt: "Manufacturing process for screen products" },
  { src: capQuality, alt: "Quality inspection of screen assembly" },
  { src: engineeringCnc, alt: "CNC machining of screen components" },
];

const defaultInquiryCta = {
  heading: "Need More Technical Information?",
  body: "Our engineering team is available to discuss specifications, applications, and custom requirements.",
  ctaPrimary: { label: "Contact Us", href: "/contact" },
  ctaSecondary: { label: "Request Information", href: "/contact" },
};

const defaultDownloads = [
  {
    id: "datasheet",
    title: "Product Datasheet",
    description: "Technical specifications and performance data.",
    fileType: "PDF",
    href: "/catalogs",
  },
  {
    id: "catalog",
    title: "Technical Catalog",
    description: "Full product range and engineering overview.",
    fileType: "PDF",
    href: "/catalogs",
  },
  {
    id: "certifications",
    title: "Certifications",
    description: "Quality and compliance documentation.",
    fileType: "PDF",
    href: "/catalogs",
  },
];

interface ProductSeed {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  image: ImageAsset;
  overview: string[];
  benefits: string[];
  specifications: SpecificationRow[];
  galleryImages?: ImageAsset[];
}

function createProductDetail(seed: ProductSeed): ProductDetailContent {
  return {
    id: seed.id,
    slug: seed.slug,
    meta: {
      title: seed.name,
      description: seed.shortDescription,
    },
    hero: {
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: seed.name },
      ],
      name: seed.name,
      description: seed.shortDescription,
      image: seed.image,
      ctaContact: { label: "Contact Us", href: "/contact" },
      ctaCatalog: { label: "Download Catalog", href: "/catalogs" },
    },
    overview: {
      heading: "Product Overview",
      paragraphs: seed.overview,
      benefits: {
        title: "Key Benefits",
        items: seed.benefits,
      },
    },
    specifications: {
      heading: "Technical Specifications",
      rows: seed.specifications,
    },
    gallery: {
      heading: "Product Gallery",
      images: seed.galleryImages ?? sharedGalleryImages,
    },
    downloads: {
      heading: "Downloads",
      items: defaultDownloads,
    },
    inquiryCta: defaultInquiryCta,
  };
}

const productSeeds: ProductSeed[] = [
  {
    id: "wire-wrapped-screens",
    slug: "wire-wrapped-screens",
    name: "Wire Wrapped Screens",
    shortDescription:
      "Precision-wound wire screens for sand control and filtration in oil, gas, and water well applications.",
    image: { src: capEngineering, alt: "Wire wrapped screen" },
    overview: [
      "DOT wire wrapped screens are manufactured using precision-wound wire wrapped around support rods, creating uniform slot openings for reliable sand control and fluid filtration.",
      "Designed for demanding downhole environments, these screens deliver consistent flow performance and extended service life across a wide range of well completion applications.",
    ],
    benefits: [
      "Uniform slot openings for precise filtration",
      "High collapse resistance in deep wells",
      "Corrosion-resistant material options",
      "Custom slot sizes and diameters available",
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
    name: "Premium Mesh Screens",
    shortDescription:
      "High-performance mesh screen systems engineered for consistent flow rates in demanding conditions.",
    image: { src: capQuality, alt: "Premium mesh screen" },
    overview: [
      "Premium mesh screens combine multi-layer mesh construction with robust support structures for superior filtration performance in production and injection wells.",
      "Engineered for high flow capacity and sand exclusion, these screens maintain performance under variable downhole conditions.",
    ],
    benefits: [
      "High open area for maximum flow capacity",
      "Multi-layer mesh construction",
      "Proven sand exclusion performance",
      "Compatible with standard completion tools",
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
    name: "Downhole Sand Control",
    shortDescription:
      "Engineered sand control solutions for production wells in unconsolidated formations.",
    image: { src: engineeringCad, alt: "Downhole sand control screen" },
    overview: [
      "DOT downhole sand control systems are designed to maximize reservoir contact while preventing sand production in challenging formation environments.",
      "Our engineering team works with operators to select the optimal screen configuration for each well's geological and operational requirements.",
    ],
    benefits: [
      "Maximized reservoir contact area",
      "Reduced formation damage risk",
      "Field-proven sand exclusion",
      "Engineering support for well design",
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
    name: "Gravel Pack Screens",
    shortDescription:
      "Robust screen assemblies for open-hole and cased-hole gravel pack completions.",
    image: { src: capManufacturing, alt: "Gravel pack screen" },
    overview: [
      "Gravel pack screens are engineered to support gravel pack operations while maintaining structural integrity under gravel placement and production loads.",
      "Available in standard and heavy-wall configurations for open-hole and cased-hole completion designs.",
    ],
    benefits: [
      "Heavy-wall construction for gravel pack loads",
      "Uniform gravel placement support",
      "High collapse and burst ratings",
      "Multiple connection options",
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
    name: "Process Industry Screens",
    shortDescription:
      "Custom-engineered screening solutions for chemical, petrochemical, and process industries.",
    image: { src: engineeringBg, alt: "Process industry screen" },
    overview: [
      "Process industry screens are manufactured to precise specifications for separation, filtration, and sizing applications in industrial processing plants.",
      "DOT delivers custom geometries, materials, and mesh configurations tailored to each process requirement.",
    ],
    benefits: [
      "Custom geometries and mesh configurations",
      "Chemical and corrosion resistant materials",
      "Precision manufacturing tolerances",
      "Rapid prototyping and production",
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
    name: "Screen Baskets",
    shortDescription:
      "Precision-manufactured screen baskets for centrifuges, separators, and filtration systems.",
    image: { src: whyChooseFeatured, alt: "Screen basket" },
    overview: [
      "DOT screen baskets are precision-manufactured to exact dimensional specifications for centrifuge, separator, and filtration equipment.",
      "Each basket is engineered for structural integrity, uniform slot geometry, and long service life in continuous operation.",
    ],
    benefits: [
      "Exact dimensional tolerances",
      "Uniform slot geometry",
      "High structural strength",
      "Replacement and custom designs",
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
    name: "Industrial Strainers",
    shortDescription:
      "Heavy-duty strainers and inline filtration devices for pipeline and plant operations.",
    image: { src: capInnovation, alt: "Industrial strainer" },
    overview: [
      "Industrial strainers protect downstream equipment by removing debris and particulates from process fluids in pipeline, refinery, and plant operations.",
      "Available in Y-type, basket, and custom inline configurations with pressure ratings for demanding service.",
    ],
    benefits: [
      "Equipment protection from debris",
      "High pressure ratings",
      "Easy maintenance and cleaning",
      "Custom inlet/outlet configurations",
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
    name: "Slotted Liners",
    shortDescription:
      "Precision-cut slotted liners for well completions with controlled flow distribution.",
    image: { src: engineeringCnc, alt: "Slotted liner" },
    overview: [
      "Slotted liners provide controlled flow distribution and sand exclusion in well completions where slot geometry and open area are critical to performance.",
      "DOT manufactures slotted liners with precision CNC cutting for consistent slot width and spacing.",
    ],
    benefits: [
      "Precision CNC slot cutting",
      "Controlled open area percentage",
      "High collapse resistance",
      "Custom slot patterns available",
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
    name: "Screen Couplings",
    shortDescription:
      "Engineered couplings, adapters, and completion accessories for DOT screen systems.",
    image: { src: facilityImage, alt: "Screen couplings" },
    overview: [
      "Screen couplings and accessories provide reliable connections between screen joints and completion hardware in downhole assemblies.",
      "Manufactured to match DOT screen systems and compatible with standard completion tooling.",
    ],
    benefits: [
      "Seamless integration with DOT screens",
      "High-strength threaded connections",
      "Corrosion-resistant coatings",
      "Full traceability and documentation",
    ],
    specifications: [
      { label: "Material", value: "Alloy steel, stainless steel, CRA" },
      { label: "Application", value: "Screen joint connections, completions" },
      { label: "Size Range", value: "Matched to screen OD range" },
      { label: "Operating Conditions", value: "Downhole pressure and temperature rated" },
      { label: "Industry Standards", value: "API thread profiles, ISO 9001" },
    ],
  },
  {
    id: "custom-filtration",
    slug: "custom-filtration",
    name: "Custom Filtration",
    shortDescription:
      "Bespoke filtration and separation solutions developed through collaborative engineering.",
    image: { src: overviewHero, alt: "Custom filtration system" },
    overview: [
      "DOT custom filtration solutions are developed in partnership with clients to address unique operational challenges not met by standard product lines.",
      "From concept through manufacturing, our engineering team delivers tailored designs backed by rigorous testing and quality assurance.",
    ],
    benefits: [
      "Collaborative engineering process",
      "Prototype to production capability",
      "Application-specific material selection",
      "Full technical documentation",
    ],
    specifications: [
      { label: "Material", value: "Application-specific alloy selection" },
      { label: "Application", value: "Custom separation and filtration" },
      { label: "Size Range", value: "Engineered per project requirements" },
      { label: "Operating Conditions", value: "Defined per project specification" },
      { label: "Industry Standards", value: "Project-specific compliance requirements" },
    ],
  },
];

export const productDetails: ProductDetailContent[] = productSeeds.map(
  createProductDetail,
);

export const productDetailsBySlug = Object.fromEntries(
  productDetails.map((product) => [product.slug, product]),
) as Record<string, ProductDetailContent>;
