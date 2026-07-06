import type {
  CmsCareerPayload,
  CmsCatalogPayload,
  CmsCertificatePayload,
  CmsNewsPayload,
  CmsPartnerPayload,
  CmsProductPayload,
} from "@/types/cms-entities";
import type { Locale } from "@/i18n/config";
import type { CareerJobDetail, NewsArticleDetail, ProductDetailContent } from "@/types";
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

export function createDefaultPartnerPayload(id: string): CmsPartnerPayload {
  const emptyItem = {
    id,
    name: "",
    logo: { src: "", alt: "" },
  };

  return createEmptyLocalizedPayload(emptyItem, emptyItem, 0);
}

export function createDefaultCareerPayload(slug: string): CmsCareerPayload {
  const emptyJob: CareerJobDetail = {
    id: slug,
    slug,
    title: "",
    department: "",
    location: "",
    employmentType: "",
    experience: "",
    overview: "",
    responsibilities: [],
    requirements: [],
    preferredSkills: [],
    meta: { title: "", description: "" },
  };

  return {
    ...createEmptyLocalizedPayload(emptyJob, emptyJob, 0),
    isActive: true,
  };
}

function buildCareerTemplateJob(slug: string, locale: Locale): CareerJobDetail {
  if (locale === "ar") {
    return {
      id: slug,
      slug,
      title: "المسمى الوظيفي",
      department: "اسم القسم",
      location: "المدينة، المملكة العربية السعودية",
      employmentType: "دوام كامل",
      experience: "٢–٤ سنوات",
      overview: "اكتب نبذة مختصرة عن الوظيفة والفريق والمسؤوليات الرئيسية هنا.",
      responsibilities: [
        "مسؤولية ١",
        "مسؤولية ٢",
        "مسؤولية ٣",
        "مسؤولية ٤",
      ],
      requirements: [
        "متطلب ١",
        "متطلب ٢",
        "متطلب ٣",
        "متطلب ٤",
      ],
      preferredSkills: [
        "مهارة ١",
        "مهارة ٢",
        "مهارة ٣",
        "مهارة ٤",
      ],
      meta: {
        title: "المسمى الوظيفي",
        description: "وصف مختصر لهذه الوظيفة يظهر في نتائج البحث.",
      },
    };
  }

  return {
    id: slug,
    slug,
    title: "Job Title",
    department: "Department name",
    location: "City, Saudi Arabia",
    employmentType: "Full-Time",
    experience: "2–4 Years",
    overview:
      "Write a short overview of the role, team, and main responsibilities here.",
    responsibilities: [
      "Responsibility 1",
      "Responsibility 2",
      "Responsibility 3",
      "Responsibility 4",
    ],
    requirements: ["Requirement 1", "Requirement 2", "Requirement 3", "Requirement 4"],
    preferredSkills: ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
    meta: {
      title: "Job Title",
      description: "Short description of this role for search results.",
    },
  };
}

export function createCareerTemplatePayload(slug: string): CmsCareerPayload {
  return {
    ...createEmptyLocalizedPayload(
      buildCareerTemplateJob(slug, "en"),
      buildCareerTemplateJob(slug, "ar"),
      0,
    ),
    isActive: true,
  };
}

export function createDefaultCatalogPayload(id: string): CmsCatalogPayload {
  const emptyItem = {
    id,
    title: "",
    description: "",
    cover: { src: "", alt: "" },
    pdf: { href: "", fileName: "" },
  };

  return createEmptyLocalizedPayload(emptyItem, emptyItem, 0);
}
