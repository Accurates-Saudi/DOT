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
}

export interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
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
    image: ImageAsset;
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

export interface NewsArticlePreview {
  id: string;
  slug: string;
  title: ContentValue<string>;
  excerpt: ContentValue<string>;
  category: ContentValue<string>;
  publishedAt: string;
  image: ImageAsset;
}

export interface NewsSectionContent {
  label: ContentValue<string>;
  heading: ContentValue<string>;
  headingAccent: ContentValue<string>;
  description: ContentValue<string>;
  viewAll: LinkItem;
  headerImage?: ImageAsset;
  articles: NewsArticlePreview[];
  newsletter: {
    heading: ContentValue<string>;
    description: ContentValue<string>;
    placeholder: ContentValue<string>;
    buttonLabel: ContentValue<string>;
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
  whyChooseUs: WhyChooseUsSectionContent;
  engineering: EngineeringSectionContent;
  certificates: CertificatesSectionContent;
  news: NewsSectionContent;
}

/** News article scaffold for future CMS news management */
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

export interface NewsListingContent extends PageContent {
  heading: string;
  subheading?: string;
}
