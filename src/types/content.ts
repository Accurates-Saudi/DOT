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
    headline: ContentValue<string>;
    subheadline: ContentValue<string>;
    ctaPrimary: LinkItem;
    ctaSecondary?: LinkItem;
    backgroundImage?: ImageAsset;
  };
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
