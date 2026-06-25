/**
 * Product data template — copy this file to add a new product.
 *
 * 1. Duplicate as `your-product-slug.ts` in this folder.
 * 2. Import hero (and optional specification) images from `src/assets/products/`.
 * 3. Export a `ProductRecord` constant.
 * 4. Register the import in `../registry.ts`.
 *
 * Product types:
 * - Standard: omit `specifications` entirely.
 * - With technical data: add `specifications` with `rows` and/or `image`.
 */

import type { ProductRecord } from "@/types";

// import heroImage from "@/assets/products/your-product-slug/hero.webp";
// import specificationImage from "@/assets/products/your-product-slug/specification.webp";

export const productTemplate: ProductRecord = {
  id: "your-product-slug",
  slug: "your-product-slug",
  category: "Category Name",
  name: "Product Name",
  listingTeaser: "Short description for the products listing card.",
  introduction: "One or two sentences shown below the product title on the detail page.",
  image: {
    src: "", // heroImage
    alt: "Product name",
  },
  overview: [
    "First overview paragraph.",
    "Second overview paragraph (optional).",
  ],
  applications: ["Application one", "Application two"],
  features: ["Feature one", "Feature two"],
  benefits: ["Benefit one", "Benefit two"],

  // Omit for standard products without technical data:
  // specifications: {
  //   // HTML table rows (optional):
  //   rows: [
  //     { label: "Material", value: "Stainless steel" },
  //     { label: "Size Range", value: '2" to 20" OD' },
  //   ],
  //   // Specification table image (optional):
  //   image: {
  //     src: "", // specificationImage
  //     alt: "Product name technical specification table",
  //   },
  // },
};
