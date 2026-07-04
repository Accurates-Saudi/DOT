import type { Locale } from "@/i18n/config";

import type {
  CatalogsPageContent,
  FooterContent,
  HomePageContent,
  LinkItem,
  NavItem,
  NewsArticleDetail,
  NewsPageContent,
  ProductDetailContent,
  ProductsPageContent,
} from "./content";

export type ContentLocale = Locale;

export interface LocalizedValue<T> {
  en: T;
  ar: T;
}

export type LocalizedText = LocalizedValue<string>;

export interface EditableBinding {
  id: string;
  type: "text" | "richtext" | "image" | "link" | "button";
}

export interface MediaReference {
  id: string;
  alt: LocalizedText;
  width?: number;
  height?: number;
  objectPosition?: string;
  mobileObjectPosition?: string;
}

export interface LinkReference {
  label: LocalizedText;
  href?: LocalizedValue<string>;
  external?: boolean;
  action?: LinkItem["action"];
}

type Primitive = number | boolean | null | undefined;

export type CmsSource<T> = T extends string
  ? LocalizedText
  : T extends Primitive
    ? T
    : T extends { src: string; alt: string }
      ? MediaReference
      : T extends { label: string; href?: string }
        ? LinkReference
        : T extends Array<infer U>
          ? CmsSource<U>[]
          : T extends object
            ? { [K in keyof T]: CmsSource<T[K]> }
            : T;

export type HeroContentSource = CmsSource<HomePageContent["hero"]>;
export type NavigationItemSource = CmsSource<NavItem>;
export type FooterContentSource = CmsSource<FooterContent>;
export type ProductContentSource = CmsSource<ProductDetailContent>;
export type ProductsPageContentSource = CmsSource<ProductsPageContent>;
export type NewsContentSource = CmsSource<NewsArticleDetail>;
export type NewsPageContentSource = CmsSource<NewsPageContent>;
export type CatalogsPageContentSource = CmsSource<CatalogsPageContent>;
