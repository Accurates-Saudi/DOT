import type { Route } from "./+types/products";
import { ProductsPage } from "@/pages";
import { productsPageMeta } from "@/data/pages";
import { seoDefaults } from "@/data/site";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: seoDefaults.titleTemplate.replace("%s", productsPageMeta.title),
    },
    { name: "description", content: productsPageMeta.description },
  ];
}

export default function Products() {
  return <ProductsPage />;
}
