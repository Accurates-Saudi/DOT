/**
 * Content field metadata for future CMS inline editing.
 * Static content uses the same shape; CMS will attach field keys for editing.
 */
export interface ContentFieldMeta {
  /** Unique field key for CMS mapping (e.g. "home.hero.title") */
  key: string;
  /** Human-readable label for admin UI */
  label?: string;
  /** Field type hint for CMS editors */
  type?: "text" | "richtext" | "image" | "url" | "number" | "boolean";
}

export type ContentValue<T> = T;

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** CSS object-position for background / cover images (e.g. "center", "60% center") */
  objectPosition?: string;
  /** Narrow-viewport focal point when cover crop differs from desktop */
  mobileObjectPosition?: string;
}

export interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
  /** In-app action instead of navigation */
  action?: "cookie-preferences";
}

export interface HeroSlide {
  label: ContentValue<string>;
  headline: ContentValue<string>;
  headlineAccent: ContentValue<string>;
  subheadline: ContentValue<string>;
  ctaPrimary: LinkItem;
  ctaSecondary?: LinkItem;
  background: ImageAsset;
}

export interface AboutServiceItem {
  label: ContentValue<string>;
  icon: "maintenance" | "petroleum" | "engineering" | "plant";
}

export interface AboutSectionContent {
  servicesBanner?: {
    title: ContentValue<string>;
    items: AboutServiceItem[];
    thumbnail?: ImageAsset;
  };
  label: ContentValue<string>;
  heading: ContentValue<string>;
  headingAccent: ContentValue<string>;
  body: ContentValue<string>[];
  ctaPrimary: LinkItem;
  ctaVideo?: LinkItem;
  media: {
    image?: ImageAsset;
    videoId?: string;
    videoUrl?: string;
    showPlayButton?: boolean;
  };
}

export interface ServiceItem {
  id: string;
  title: ContentValue<string>;
  description: ContentValue<string>;
  icon: "oil-gas" | "process" | "downhole" | "strainers" | "treatments";
  href?: string;
}

export interface ServicesSectionContent {
  heading: ContentValue<string>;
  headingAccent: ContentValue<string>;
  ctaPrimary: LinkItem;
  items: ServiceItem[];
}

export interface CompanyStatisticItem {
  id: string;
  value: number;
  suffix?: string;
  label: ContentValue<string>;
  icon: "experience" | "projects" | "clients" | "countries";
}

export interface CompanyStatisticsSectionContent {
  backgroundImage: ImageAsset;
  items: CompanyStatisticItem[];
}

export interface WhyChooseUsSectionContent {
  label: ContentValue<string>;
  heading: ContentValue<string>;
  subheading: ContentValue<string>;
  featuredImage: ImageAsset;
  ctaPanel: {
    heading: ContentValue<string>;
    ctaPrimary: LinkItem;
    ctaSecondary: LinkItem;
  };
  mission: {
    title: ContentValue<string>;
    body: ContentValue<string>;
    backgroundImage?: ImageAsset;
  };
  vision: {
    title: ContentValue<string>;
    body: ContentValue<string>;
    backgroundImage?: ImageAsset;
  };
  tagline: ContentValue<string>;
}

export interface EngineeringCapabilityStep {
  step: ContentValue<string>;
  title: ContentValue<string>;
  description: ContentValue<string>;
  tag: ContentValue<string>;
  icon: "modeling" | "cnc";
}

export interface EngineeringSectionContent {
  label: ContentValue<string>;
  heading: ContentValue<string>;
  headingAccent: ContentValue<string>;
  headingSuffix: ContentValue<string>;
  intro: ContentValue<string>;
  bullets: ContentValue<string>[];
  steps: EngineeringCapabilityStep[];
  backgroundImage?: ImageAsset;
}

export interface CertificateItem {
  id: string;
  title?: ContentValue<string>;
  image: ImageAsset;
}

export interface CertificatesSectionContent {
  heading: ContentValue<string>;
  headingAccent: ContentValue<string>;
  subheading: ContentValue<string>;
  items: CertificateItem[];
  autoplayDelayMs?: number;
  transitionMs?: number;
}

export interface ClientLogoItem {
  id: string;
  name: ContentValue<string>;
  logo: ImageAsset;
  href?: string;
}

export interface TrustedPartnersSectionContent {
  label: ContentValue<string>;
  heading: ContentValue<string>;
  description: ContentValue<string>;
  logos: ClientLogoItem[];
  marqueeDurationMs?: number;
}

export interface FeaturedProductsSectionContent {
  label: ContentValue<string>;
  heading: ContentValue<string>;
  description: ContentValue<string>;
  viewProductLabel: ContentValue<string>;
  exploreAll: LinkItem;
  items: ProductItem[];
  autoplayDelayMs?: number;
  transitionMs?: number;
}

export interface NewsArticlePreview {
  id: string;
  slug: string;
  title: ContentValue<string>;
  excerpt: ContentValue<string>;
  category: ContentValue<string>;
  publishedAt: string;
  image: ImageAsset;
}

export interface MapLocationContent {
  placeName: ContentValue<string>;
  address: ContentValue<string>;
  embedUrl: string;
  mapsUrl: string;
  directionsUrl?: string;
  directionsLabel?: ContentValue<string>;
  viewLargerMapLabel?: ContentValue<string>;
}

export interface NewsSectionContent {
  label: ContentValue<string>;
  heading: ContentValue<string>;
  headingAccent: ContentValue<string>;
  description: ContentValue<string>;
  viewAll: LinkItem;
  headerImage?: ImageAsset;
  articles: NewsArticlePreview[];
  locationMap?: MapLocationContent & {
    title?: ContentValue<string>;
  };
  newsletter: {
    heading: ContentValue<string>;
    description: ContentValue<string>;
    placeholder: ContentValue<string>;
    buttonLabel: ContentValue<string>;
  };
}

export interface FooterContactItem {
  type: "email" | "phone" | "address";
  label: ContentValue<string>;
  value: ContentValue<string>;
  href?: string;
}

export interface FooterLinkGroup {
  title: ContentValue<string>;
  items: LinkItem[];
}

export interface FooterContent {
  description: ContentValue<string>;
  logos: {
    dot: ImageAsset;
    saudiMade: ImageAsset;
  };
  quickLinks: FooterLinkGroup;
  services: FooterLinkGroup;
  contact: {
    title: ContentValue<string>;
    items: FooterContactItem[];
  };
  bottomBar: {
    legalName: ContentValue<string>;
    legalLinks: LinkItem[];
  };
}

export interface NavItem extends LinkItem {
  children?: NavItem[];
}

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface AboutHeroContent {
  breadcrumbs: BreadcrumbItem[];
  title: ContentValue<string>;
  introduction: ContentValue<string>;
  backgroundImage?: ImageAsset;
}

export interface CompanyOverviewFeature {
  id: string;
  icon: "saudi-made" | "quality-driven" | "client-focused" | "global-supply";
  title: ContentValue<string>;
  description: ContentValue<string>;
}

export interface CompanyOverviewStat {
  id: string;
  icon: "experience" | "facility" | "professionals" | "countries";
  value: number;
  suffix?: string;
  label: ContentValue<string>;
}

export interface CompanyOverviewContent {
  label: ContentValue<string>;
  heading: ContentValue<string>;
  specializations: {
    label: ContentValue<string>;
    items: ContentValue<string>[];
  };
  body: ContentValue<string>[];
  image: ImageAsset;
  features: CompanyOverviewFeature[];
  stats: CompanyOverviewStat[];
}

export interface EngineeringManufacturingCapability {
  id: string;
  icon: "engineering" | "manufacturing" | "quality" | "innovation";
  title: ContentValue<string>;
  description: ContentValue<string>;
  image: ImageAsset;
}

export interface EngineeringManufacturingCta {
  heading: ContentValue<string>;
  body: ContentValue<string>;
  ctaPrimary: LinkItem;
  ctaSecondary: LinkItem;
}

export interface EngineeringManufacturingContent {
  label: ContentValue<string>;
  heading: ContentValue<string>;
  subheading: ContentValue<string>;
  capabilities: EngineeringManufacturingCapability[];
  cta: EngineeringManufacturingCta;
}

export interface AboutPageContent extends PageContent {
  hero: AboutHeroContent;
  companyOverview: CompanyOverviewContent;
  engineeringManufacturing: EngineeringManufacturingContent;
}

export interface ProductsHeroContent extends AboutHeroContent {}

export interface ProductItem {
  id: string;
  slug: string;
  name: ContentValue<string>;
  description: ContentValue<string>;
  category: ContentValue<string>;
  image: ImageAsset;
  /** Lower values appear first within a category group */
  listingOrder?: number;
}

export interface ProductsListingContent {
  searchPlaceholder: ContentValue<string>;
  emptyStateMessage: ContentValue<string>;
  viewProductLabel: ContentValue<string>;
  items: ProductItem[];
}

export interface ProductsCtaContent {
  heading: ContentValue<string>;
  body: ContentValue<string>;
  ctaPrimary: LinkItem;
}

export interface ProductsPageContent extends PageContent {
  hero: ProductsHeroContent;
  listing: ProductsListingContent;
  cta: ProductsCtaContent;
}

export interface CatalogHeroContent {
  breadcrumbs: BreadcrumbItem[];
  title: ContentValue<string>;
  introduction: ContentValue<string>;
  backgroundImage?: ImageAsset;
}

export interface CatalogPdfResource {
  href: string;
  fileName?: string;
}

export interface CatalogItem {
  id: string;
  title: ContentValue<string>;
  description: ContentValue<string>;
  cover: ImageAsset;
  pdf?: CatalogPdfResource;
}

export interface CatalogLibraryContent {
  label: ContentValue<string>;
  downloadLabel: ContentValue<string>;
  pdfLabel: ContentValue<string>;
  items: CatalogItem[];
}

export interface CatalogsPageContent extends PageContent {
  hero: CatalogHeroContent;
  library: CatalogLibraryContent;
}

export interface ContactHeroContent {
  breadcrumbs: BreadcrumbItem[];
  label: ContentValue<string>;
  title: ContentValue<string>;
  introduction: ContentValue<string>;
  backgroundImage?: ImageAsset;
}

export interface ContactInfoItem {
  id: string;
  type: "phone" | "email" | "address" | "hours";
  label: ContentValue<string>;
  value: ContentValue<string>;
  href?: string;
}

export interface ContactInfoContent {
  label: ContentValue<string>;
  heading: ContentValue<string>;
  items: ContactInfoItem[];
}

export interface ContactFormFieldLabels {
  name: ContentValue<string>;
  company: ContentValue<string>;
  email: ContentValue<string>;
  phone: ContentValue<string>;
  subject: ContentValue<string>;
  message: ContentValue<string>;
}

export interface ContactFormContent {
  heading: ContentValue<string>;
  description?: ContentValue<string>;
  fields: ContactFormFieldLabels;
  placeholders?: Partial<ContactFormFieldLabels>;
  submitLabel: ContentValue<string>;
}

export interface ContactMainSectionContent {
  info: ContactInfoContent;
  form: ContactFormContent;
}

export interface ContactLocationContent {
  label: ContentValue<string>;
  heading: ContentValue<string>;
  address: ContentValue<string>;
  mapPlaceholderLabel: ContentValue<string>;
  map?: MapLocationContent;
  /** @deprecated Use map.embedUrl */
  mapEmbedUrl?: string;
}

export interface ContactEngineeringCtaContent {
  heading: ContentValue<string>;
  body: ContentValue<string>;
  ctaPrimary: LinkItem;
}

export interface ContactPageContent extends PageContent {
  hero: ContactHeroContent;
  main: ContactMainSectionContent;
  location: ContactLocationContent;
  engineeringCta: ContactEngineeringCtaContent;
}

export interface ContactFormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface SpecificationRow {
  label: ContentValue<string>;
  value: ContentValue<string>;
}

export interface DownloadResource {
  id: string;
  title: ContentValue<string>;
  description: ContentValue<string>;
  fileType: ContentValue<string>;
  href: string;
}

export interface ProductDetailHeroContent {
  breadcrumbs: BreadcrumbItem[];
  category: ContentValue<string>;
  name: ContentValue<string>;
  introduction: ContentValue<string>;
  image: ImageAsset;
  ctaContact: LinkItem;
}

export interface ProductOverviewContent {
  heading: ContentValue<string>;
  paragraphs: ContentValue<string>[];
}

export interface ProductInfoColumn {
  title: ContentValue<string>;
  items: ContentValue<string>[];
}

export interface ProductDetailInfoContent {
  applications: ProductInfoColumn;
  features: ProductInfoColumn;
  benefits: ProductInfoColumn;
}

export interface ProductSpecificationsContent {
  heading: ContentValue<string>;
  image?: ImageAsset;
  rows?: SpecificationRow[];
}

export interface ProductContactCtaContent {
  heading: ContentValue<string>;
  body: ContentValue<string>;
  ctaPrimary: LinkItem;
  ctaSecondary?: LinkItem;
}

export interface ProductSpecificationsInput {
  heading?: ContentValue<string>;
  image?: ImageAsset;
  rows?: SpecificationRow[];
}

/** Authoring schema — one file per product; passed through createProductDetail */
export interface ProductRecord {
  id: string;
  slug: string;
  /** Top-level family used for listing groups */
  category: ContentValue<string>;
  /** Optional detail label (e.g. Sand Control, Oil & Gas Industry) */
  subcategory?: ContentValue<string>;
  name: ContentValue<string>;
  introduction: ContentValue<string>;
  /** Short blurb for listing cards; falls back to introduction when omitted */
  listingTeaser?: ContentValue<string>;
  image: ImageAsset;
  overview: ContentValue<string> | ContentValue<string>[];
  applications: ContentValue<string>[];
  features: ContentValue<string>[];
  benefits: ContentValue<string>[];
  /** Optional — omit entirely when the product has no technical data */
  specifications?: ProductSpecificationsInput;
  /** Lower values appear first on the products listing within the same category */
  listingOrder?: number;
}

export interface ProductDetailContent {
  id: string;
  slug: string;
  category: ContentValue<string>;
  listingOrder?: number;
  listingTeaser?: ContentValue<string>;
  meta: PageMeta;
  hero: ProductDetailHeroContent;
  overview: ProductOverviewContent;
  info: ProductDetailInfoContent;
  specifications?: ProductSpecificationsContent;
  contactCta: ProductContactCtaContent;
}

export interface SiteSettings {
  companyName: string;
  legalName: string;
  tagline: string;
  description: string;
  locale: string;
  contact: {
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  social: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface SeoDefaults {
  titleTemplate: string;
  defaultDescription: string;
  siteUrl: string;
}

/** Base shape for page-level content blocks — extended per page */
export interface PageContent {
  meta: PageMeta;
}

/** Homepage content scaffold — sections will populate this later */
export interface HomePageContent extends PageContent {
  hero: {
    slides: HeroSlide[];
    intervalMs?: number;
  };
  about: AboutSectionContent;
  services: ServicesSectionContent;
  companyStatistics: CompanyStatisticsSectionContent;
  whyChooseUs: WhyChooseUsSectionContent;
  engineering: EngineeringSectionContent;
  featuredProducts: FeaturedProductsSectionContent;
  certificates: CertificatesSectionContent;
  news: NewsSectionContent;
  trustedPartners: TrustedPartnersSectionContent;
}

/** Full news article — CMS-ready corporate update */
export interface NewsArticleDetail {
  id: string;
  slug: string;
  title: ContentValue<string>;
  excerpt: ContentValue<string>;
  category: ContentValue<string>;
  publishedAt: string;
  image: ImageAsset;
  content: ContentValue<string>[];
  gallery?: ImageAsset[];
  meta: PageMeta;
}

export interface NewsDetailCtaContent {
  heading: ContentValue<string>;
  body: ContentValue<string>;
  ctaPrimary: LinkItem;
}

/** @deprecated Use NewsArticleDetail */
export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: ImageAsset;
  author?: string;
  tags?: string[];
}

export interface NewsHeroContent {
  breadcrumbs: BreadcrumbItem[];
  label: ContentValue<string>;
  title: ContentValue<string>;
  introduction: ContentValue<string>;
  backgroundImage?: ImageAsset;
}

export interface NewsFeaturedContent {
  readMoreLabel: ContentValue<string>;
}

export interface NewsGridContent {
  label: ContentValue<string>;
  readMoreLabel: ContentValue<string>;
  viewMoreLabel: ContentValue<string>;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface NewsPageContent extends PageContent {
  hero: NewsHeroContent;
  featured: NewsFeaturedContent;
  grid: NewsGridContent;
}

/** @deprecated Use NewsPageContent */
export interface NewsListingContent extends PageContent {
  heading: string;
  subheading?: string;
}

export interface NotFoundQuickLink {
  id: string;
  label: ContentValue<string>;
  description: ContentValue<string>;
  href: string;
  icon: "products" | "about" | "catalogs" | "contact";
}

export interface NotFoundPageContent extends PageContent {
  label: ContentValue<string>;
  title: ContentValue<string>;
  description: ContentValue<string>;
  ctaPrimary: LinkItem;
  ctaSecondary: LinkItem;
  quickLinksHeading: ContentValue<string>;
  quickLinks: NotFoundQuickLink[];
  supportHeading: ContentValue<string>;
  supportBody: ContentValue<string>;
  supportEmail: LinkItem;
  supportPhone: LinkItem;
}
