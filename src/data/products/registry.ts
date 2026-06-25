import { buildProductCatalog } from "./factory";
import { loadProductRecordsFromAssets } from "./loadFromAssets";

export const productRecords = loadProductRecordsFromAssets();

const catalog = buildProductCatalog(productRecords);

export const productDetails = catalog.productDetails;
export const productDetailsBySlug = catalog.productDetailsBySlug;
