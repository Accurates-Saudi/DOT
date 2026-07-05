import type { CatalogItem } from "@/types";

/** Non-translatable catalog item ids merged with locale message text. */
export const catalogItemIds: Pick<CatalogItem, "id">[] = [
  { id: "corporate-profile" },
  { id: "ground-water-screens" },
  { id: "oil-and-gas-equipment" },
  { id: "process-industry-screens" },
];
