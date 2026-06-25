import { CatalogHeroSection, CatalogLibrarySection } from "@/components/catalogs";
import { useCatalogsPageContent } from "@/i18n/content/hooks";

export function CatalogsPage() {
  const catalogsPageContent = useCatalogsPageContent();

  return (
    <>
      <CatalogHeroSection content={catalogsPageContent.hero} />
      <CatalogLibrarySection content={catalogsPageContent.library} />
    </>
  );
}
