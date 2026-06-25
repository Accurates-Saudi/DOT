import type { ProductRecord } from "@/types";

import { fitToBaseScreenJoint } from "./items/fit-to-base-screen-joint";
import { openholeSystem } from "./items/openhole-system";
import { buildProductCatalog } from "./factory";

/**
 * Register every product here. Order determines default listing sequence.
 * Add one import + array entry per product (~28 total when complete).
 */
export const productRecords: ProductRecord[] = [
  openholeSystem,
  fitToBaseScreenJoint,
];

const catalog = buildProductCatalog(productRecords);

export const productDetails = catalog.productDetails;
export const productDetailsBySlug = catalog.productDetailsBySlug;
