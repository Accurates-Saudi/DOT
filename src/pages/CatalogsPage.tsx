import {
  CatalogHeroSection,
  CatalogLibrarySection,
} from "@/components/catalogs";
import { catalogsPageContent } from "@/data/pages/catalogs";

export function CatalogsPage() {
  return (
    <>
      <CatalogHeroSection content={catalogsPageContent.hero} />
      <CatalogLibrarySection content={catalogsPageContent.library} />
    </>
  );
}
