import { useCallback, useMemo } from "react";
import { useLoaderData } from "react-router";

import {
  CmsEditableSection,
  CmsEditorPreviewBridge,
  CmsSectionEditorPanel,
  useCmsVisualPageEditor,
} from "@/components/cms/CmsVisualEditor";
import { createProductsPageSectionEditors } from "@/components/cms/website-section-editors";
import {
  ProductsCtaSection,
  ProductsGrid,
  ProductsHeroSection,
} from "@/components/products";
import { useCmsExperience } from "@/contexts/cms-experience-context";
import { buildProductsContent } from "@/i18n/content";
import { useProductsPageContent } from "@/i18n/content/hooks";
import { useI18n, useLocale } from "@/i18n/hooks";
import type { Locale } from "@/i18n/config";
import type { ProductsPageContent } from "@/types";

export function ProductsPage() {
  const loaderData = useLoaderData<{ pageContent?: ProductsPageContent } | undefined>();
  const fallbackContent = useProductsPageContent();
  const productsPageContent = loaderData?.pageContent ?? fallbackContent;
  const { getContentOverride } = useCmsExperience();
  const { messages } = useI18n();
  const locale = useLocale();
  const sections = useMemo(() => createProductsPageSectionEditors(), []);

  const getInitialContent = useCallback(
    (editingLocale: Locale) => {
      const base =
        getContentOverride<ProductsPageContent>(`products.${editingLocale}`) ??
        buildProductsContent(messages, editingLocale);

      return {
        ...base,
        listing: {
          ...base.listing,
          items: productsPageContent.listing.items,
        },
      };
    },
    [getContentOverride, messages, productsPageContent.listing.items],
  );

  const editor = useCmsVisualPageEditor({
    getInitialContent,
    contentKeyPrefix: "products",
    siteLocale: locale,
    contentType: "page",
    sections,
  });

  const displayContent = editor.isInteractive ? editor.page : productsPageContent;

  return (
    <>
      <CmsSectionEditorPanel editor={editor} />

      <CmsEditorPreviewBridge editor={editor}>
      <CmsEditableSection
        sectionId="products-hero"
        title="Products Hero"
        isSelected={editor.selectedSectionId === "products-hero"}
        onSelect={editor.setSelectedSectionId}
      >
        <ProductsHeroSection content={displayContent.hero} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="products-listing"
        title="Products Listing"
        isSelected={editor.selectedSectionId === "products-listing"}
        onSelect={editor.setSelectedSectionId}
      >
        <ProductsGrid content={displayContent.listing} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="products-cta"
        title="Products CTA"
        isSelected={editor.selectedSectionId === "products-cta"}
        onSelect={editor.setSelectedSectionId}
      >
        <ProductsCtaSection content={displayContent.cta} />
      </CmsEditableSection>
      </CmsEditorPreviewBridge>
    </>
  );
}
