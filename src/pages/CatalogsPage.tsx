import { useCallback, useMemo } from "react";
import { useLoaderData } from "react-router";

import {
  CmsEditableSection,
  CmsSectionEditorPanel,
  useCmsVisualPageEditor,
} from "@/components/cms/CmsVisualEditor";
import { createCatalogsPageSectionEditors } from "@/components/cms/website-section-editors";
import { CatalogHeroSection, CatalogLibrarySection } from "@/components/catalogs";
import { useCmsExperience } from "@/contexts/cms-experience-context";
import { buildCatalogsContent } from "@/i18n/content";
import { useCatalogsPageContent } from "@/i18n/content/hooks";
import { useI18n, useLocale } from "@/i18n/hooks";
import type { Locale } from "@/i18n/config";
import type { CatalogsPageContent } from "@/types";

export function CatalogsPage() {
  const loaderData = useLoaderData<{ pageContent?: CatalogsPageContent } | undefined>();
  const fallbackContent = useCatalogsPageContent();
  const catalogsPageContent = loaderData?.pageContent ?? fallbackContent;
  const { getContentOverride } = useCmsExperience();
  const { messages } = useI18n();
  const locale = useLocale();
  const sections = useMemo(() => createCatalogsPageSectionEditors(), []);

  const getInitialContent = useCallback(
    (editingLocale: Locale) => {
      const base =
        getContentOverride<CatalogsPageContent>(`catalogs.${editingLocale}`) ??
        buildCatalogsContent(messages, editingLocale);

      return {
        ...base,
        library: {
          ...base.library,
          items: catalogsPageContent.library.items,
        },
      };
    },
    [catalogsPageContent.library.items, getContentOverride, messages],
  );

  const editor = useCmsVisualPageEditor({
    getInitialContent,
    contentKeyPrefix: "catalogs",
    siteLocale: locale,
    contentType: "page",
    sections,
  });

  const displayContent = editor.isInteractive ? editor.page : catalogsPageContent;

  return (
    <>
      <CmsSectionEditorPanel editor={editor} />

      <CmsEditableSection
        sectionId="catalogs-hero"
        title="Catalogs Hero"
        isSelected={editor.selectedSectionId === "catalogs-hero"}
        onSelect={editor.setSelectedSectionId}
      >
        <CatalogHeroSection content={displayContent.hero} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="catalogs-library"
        title="Catalog Library"
        isSelected={editor.selectedSectionId === "catalogs-library"}
        onSelect={editor.setSelectedSectionId}
      >
        <CatalogLibrarySection content={displayContent.library} />
      </CmsEditableSection>
    </>
  );
}
