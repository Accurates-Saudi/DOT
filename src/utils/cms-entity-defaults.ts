import type {
  CmsCatalogPayload,
  CmsCertificatePayload,
  CmsNewsPayload,
  CmsProductPayload,
} from "@/types/cms-entities";
import type { Locale } from "@/i18n/config";
import type { NewsArticleDetail, ProductDetailContent } from "@/types";
import { createEmptyLocalizedPayload } from "@/utils/cms-entities";

export function createDefaultProductPayload(
  slug: string,
  _locale: Locale = "en",
): CmsProductPayload {
  const emptyProduct: ProductDetailContent = {
    id: slug,
    slug,
    category: "Products",
    meta: { title: "", description: "" },
    hero: {
      breadcrumbs: [],
      category: "",
      name: "",
      introduction: "",
      image: { src: "", alt: "" },
      ctaContact: { label: "Contact Us", href: "/contact" },
    },
    overview: { heading: "Overview", paragraphs: [] },
    info: {
      applications: { title: "Applications", items: [] },
      features: { title: "Features", items: [] },
      benefits: { title: "Benefits", items: [] },
    },
    contactCta: {
      heading: "Need Technical Assistance?",
      body: "Our engineering team is ready to help you find the right solution for your well completion requirements.",
      ctaPrimary: { label: "Contact Us", href: "/contact" },
    },
  };

  return createEmptyLocalizedPayload(emptyProduct, emptyProduct, 0);
}

export function createDefaultNewsPayload(slug: string): CmsNewsPayload {
  const emptyArticle: NewsArticleDetail = {
    id: slug,
    slug,
    title: "",
    excerpt: "",
    category: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    image: { src: "", alt: "" },
    content: [],
    meta: { title: "", description: "" },
  };

  return createEmptyLocalizedPayload(emptyArticle, emptyArticle, 0);
}

export function createDefaultCertificatePayload(id: string): CmsCertificatePayload {
  const emptyItem = {
    id,
    title: "",
    image: { src: "", alt: "" },
  };

  return createEmptyLocalizedPayload(emptyItem, emptyItem, 0);
}

export function createDefaultCatalogPayload(id: string): CmsCatalogPayload {
  const emptyItem: CmsCatalogPayload["locales"]["en"] = {
    id,
    title: "",
    description: "",
    cover: { src: "", alt: "" },
    category: "",
  };

  return createEmptyLocalizedPayload(emptyItem, emptyItem, 0);
}
