import type { Route } from "./+types/catalogs";
import { CatalogsPage } from "@/pages";
import { catalogsPageMeta } from "@/data/pages";
import { seoDefaults } from "@/data/site";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: seoDefaults.titleTemplate.replace("%s", catalogsPageMeta.title),
    },
    { name: "description", content: catalogsPageMeta.description },
  ];
}

export default function Catalogs() {
  return <CatalogsPage />;
}
