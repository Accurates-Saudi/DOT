import type { NotFoundQuickLink } from "@/types";

export const notFoundQuickLinksStructure: Pick<
  NotFoundQuickLink,
  "id" | "icon"
>[] = [
  { id: "products", icon: "products" },
  { id: "about", icon: "about" },
  { id: "catalogs", icon: "catalogs" },
  { id: "contact", icon: "contact" },
];
