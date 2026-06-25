import type {
  ProductDetailContent,
  ProductItem,
  ProductRecord,
  ProductSpecificationsContent,
} from "@/types";

const defaultContactCta = {
  heading: "Need Technical Assistance?",
  body: "Our engineering team is ready to help you find the right solution for your well completion requirements.",
  ctaPrimary: { label: "Contact Us", href: "/contact" },
  ctaSecondary: { label: "Request Information", href: "/contact" },
} as const;

const defaultSectionHeadings = {
  overview: "Overview",
  applications: "Applications",
  features: "Features",
  benefits: "Benefits",
  technicalData: "Technical Data",
} as const;

function normalizeOverview(
  overview: ProductRecord["overview"],
): string[] {
  if (Array.isArray(overview)) return overview;

  const sentences = overview
    .match(/[^.!?]+[.!?]+/g)
    ?.map((sentence) => sentence.trim())
    .filter(Boolean);

  return sentences?.length ? sentences : [overview];
}

function buildSpecifications(
  record: ProductRecord,
): ProductSpecificationsContent | undefined {
  const { specifications } = record;
  if (!specifications) return undefined;

  const hasRows = Boolean(specifications.rows?.length);
  const hasImage = Boolean(specifications.image);

  if (!hasRows && !hasImage) return undefined;

  return {
    heading: specifications.heading ?? defaultSectionHeadings.technicalData,
    ...(hasImage ? { image: specifications.image } : {}),
    ...(hasRows ? { rows: specifications.rows } : {}),
  };
}

export function createProductDetail(record: ProductRecord): ProductDetailContent {
  const specifications = buildSpecifications(record);

  return {
    id: record.id,
    slug: record.slug,
    category: record.category,
    ...(record.listingTeaser ? { listingTeaser: record.listingTeaser } : {}),
    meta: {
      title: record.name,
      description: record.introduction,
    },
    hero: {
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: record.category, href: "/products" },
        { label: record.name },
      ],
      category: record.category,
      name: record.name,
      introduction: record.introduction,
      image: record.image,
      ctaContact: { label: "Contact Us", href: "/contact" },
    },
    overview: {
      heading: defaultSectionHeadings.overview,
      paragraphs: normalizeOverview(record.overview),
    },
    info: {
      applications: {
        title: defaultSectionHeadings.applications,
        items: record.applications,
      },
      features: {
        title: defaultSectionHeadings.features,
        items: record.features,
      },
      benefits: {
        title: defaultSectionHeadings.benefits,
        items: record.benefits,
      },
    },
    ...(specifications ? { specifications } : {}),
    contactCta: defaultContactCta,
  };
}

export function toProductItem(product: ProductDetailContent): ProductItem {
  return {
    id: product.id,
    slug: product.slug,
    name: product.hero.name,
    description: product.listingTeaser ?? product.hero.introduction,
    category: product.category,
    image: product.hero.image,
  };
}

export function buildProductCatalog(records: ProductRecord[]): {
  productDetails: ProductDetailContent[];
  productDetailsBySlug: Record<string, ProductDetailContent>;
} {
  const slugs = new Set<string>();

  for (const record of records) {
    if (slugs.has(record.slug)) {
      throw new Error(`Duplicate product slug: ${record.slug}`);
    }
    slugs.add(record.slug);
  }

  const productDetails = records.map(createProductDetail);

  return {
    productDetails,
    productDetailsBySlug: Object.fromEntries(
      productDetails.map((product) => [product.slug, product]),
    ),
  };
}
