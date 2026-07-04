import { useLoaderData } from "react-router";

import { CatalogHeroSection, CatalogLibrarySection } from "@/components/catalogs";
import { useCatalogsPageContent } from "@/i18n/content/hooks";
import type { CatalogsPageContent } from "@/types";

export function CatalogsPage() {
  const loaderData = useLoaderData<{ pageContent?: CatalogsPageContent } | undefined>();
  const fallbackContent = useCatalogsPageContent();
  const catalogsPageContent = loaderData?.pageContent ?? fallbackContent;

  return (
    <>
      <CatalogHeroSection content={catalogsPageContent.hero} />
      <CatalogLibrarySection content={catalogsPageContent.library} />
    </>
  );
}
