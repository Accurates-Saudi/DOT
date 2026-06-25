import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

async function main() {
  const [
    { homePageContent },
    { aboutPageContent },
    { productsPageContent },
    { contactPageContent },
    { catalogsPageContent },
    { newsPageContent, newsDetailCta },
    { notFoundPageContent },
    { footerContent },
    { mainNavigation },
    { cookieConsentCopy, cookieCategoryDefinitions },
    { siteSettings },
    { trustedPartnersContent },
    { dotMapLocation },
    { aboutPageMeta, servicesPageMeta },
    { newsArticleDetails },
    { productDetails },
  ] = await Promise.all([
    import("../src/data/pages/home.ts"),
    import("../src/data/pages/about.ts"),
    import("../src/data/pages/contact.ts"),
    import("../src/data/pages/products.ts"),
    import("../src/data/pages/catalogs.ts"),
    import("../src/data/pages/news.ts"),
    import("../src/data/pages/not-found.ts"),
    import("../src/data/footer.ts"),
    import("../src/data/navigation.ts"),
    import("../src/data/cookie-consent.ts"),
    import("../src/data/site.ts"),
    import("../src/data/trusted-partners.ts"),
    import("../src/data/map.ts"),
    import("../src/data/pages/index.ts"),
    import("../src/data/news/details.ts"),
    import("../src/data/products/registry.ts"),
  ]);

  const messages = buildMessages({
    homePageContent,
    aboutPageContent,
    productsPageContent,
    contactPageContent,
    catalogsPageContent,
    newsPageContent,
    newsDetailCta,
    notFoundPageContent,
    footerContent,
    mainNavigation,
    cookieConsentCopy,
    cookieCategoryDefinitions,
    siteSettings,
    trustedPartnersContent,
    dotMapLocation,
    servicesPageMeta,
    newsArticleDetails,
    productDetails,
  });

  const outDir = path.join(root, "src/i18n/locales");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, "en.json"),
    `${JSON.stringify(messages, null, 2)}\n`,
  );
  console.log("Generated en.json");
}

function stripAssets(value) {
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(stripAssets);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  if ("src" in value) {
    return { alt: value.alt ?? "" };
  }

  const preservedKeys = new Set([
    "href",
    "external",
    "action",
    "id",
    "slug",
    "type",
    "icon",
    "value",
    "suffix",
    "publishedAt",
    "videoId",
    "showPlayButton",
    "embedUrl",
    "mapsUrl",
    "directionsUrl",
    "intervalMs",
    "autoplayDelayMs",
    "transitionMs",
    "marqueeDurationMs",
    "required",
    "fileName",
    "step",
    "tag",
  ]);

  const linkKeys = new Set([
    "ctaPrimary",
    "ctaSecondary",
    "viewAll",
    "exploreAll",
    "ctaVideo",
    "ctaContact",
    "supportEmail",
    "supportPhone",
  ]);

  const output = {};

  for (const [key, nested] of Object.entries(value)) {
    if (linkKeys.has(key) && nested && typeof nested === "object") {
      output[key] = {
        label: nested.label,
        ...(nested.href ? { href: nested.href } : {}),
        ...(nested.action ? { action: nested.action } : {}),
      };
      continue;
    }

    if (preservedKeys.has(key)) {
      output[key] = nested;
      continue;
    }

    output[key] = stripAssets(nested);
  }

  return output;
}

function buildMessages(input) {
  return {
    site: {
      companyName: input.siteSettings.companyName,
      legalName: input.siteSettings.legalName,
      tagline: input.siteSettings.tagline,
      description: input.siteSettings.description,
    },
    seo: {
      defaultDescription: input.siteSettings.description,
      rightsReserved: "All rights reserved.",
      returnHome: "Return to homepage",
      errorTitle: "Something went wrong",
      errorDetails: "An unexpected error occurred. Please try again later.",
    },
    nav: {
      items: input.mainNavigation.map(({ label, href }) => ({ label, href })),
      login: "Login",
      linkedIn: "LinkedIn",
      openMenu: "Open menu",
      mobileMenuTitle: "Navigation menu",
      mainAria: "Main navigation",
      mobileAria: "Mobile navigation",
      homeAria: "{{company}} — Home",
      linkedInAria: "Dynamic Oil Tools on LinkedIn",
    },
    footer: stripAssets(input.footerContent),
    cookie: {
      banner: input.cookieConsentCopy.banner,
      modal: input.cookieConsentCopy.modal,
      categories: input.cookieCategoryDefinitions,
      regionAria: "Cookie consent",
    },
    map: stripAssets(input.dotMapLocation),
    language: {
      label: "Language",
      switchTo: "Switch to {{language}}",
      current: "Current language: {{language}}",
    },
    common: {
      home: "Home",
      breadcrumbAria: "Breadcrumb",
      pagination: {
        previous: "Previous",
        next: "Next",
        page: "Page {{page}}",
      },
      readMore: "Read More",
      viewMore: "View More",
      contactUs: "Contact Us",
    },
    pages: {
      home: stripAssets(input.homePageContent),
      about: stripAssets(input.aboutPageContent),
      products: stripAssets(input.productsPageContent),
      contact: stripAssets(input.contactPageContent),
      catalogs: stripAssets(input.catalogsPageContent),
      news: {
        ...stripAssets(input.newsPageContent),
        detailCta: stripAssets(input.newsDetailCta),
      },
      notFound: stripAssets(input.notFoundPageContent),
      services: stripAssets({
        meta: input.servicesPageMeta,
        breadcrumbs: [
          { label: "Home", href: "/" },
          { label: "Services" },
        ],
      }),
    },
    trustedPartners: stripAssets(input.trustedPartnersContent),
    productsCatalog: {
      sections: {
        overview: "Overview",
        applications: "Applications",
        features: "Features",
        benefits: "Benefits",
        technicalData: "Technical Data",
      },
      contactCta: {
        heading: "Need Technical Assistance?",
        body: "Our engineering team is ready to help you find the right solution for your well completion requirements.",
        ctaPrimary: { label: "Contact Us", href: "/contact" },
        ctaSecondary: { label: "Request Information", href: "/contact" },
      },
      items: Object.fromEntries(
        input.productDetails.map((product) => [
          product.slug,
          {
            name: product.hero.name,
            category: product.category,
            introduction: product.hero.introduction,
            listingTeaser: product.listingTeaser,
            overview: product.overview.paragraphs,
            applications: product.info.applications.items,
            features: product.info.features.items,
            benefits: product.info.benefits.items,
            specifications: product.specifications
              ? {
                  heading: product.specifications.heading,
                  rows: product.specifications.rows,
                }
              : undefined,
            meta: product.meta,
            breadcrumbs: product.hero.breadcrumbs.map((item) => ({
              label: item.label,
              ...(item.href ? { href: item.href } : {}),
            })),
          },
        ]),
      ),
    },
    newsArticles: Object.fromEntries(
      input.newsArticleDetails.map((article) => [
        article.slug,
        {
          title: article.title,
          excerpt: article.excerpt,
          category: article.category,
          content: article.content,
          meta: article.meta,
        },
      ]),
    ),
  };
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
