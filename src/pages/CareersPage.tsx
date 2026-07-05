import { useCallback, useMemo } from "react";
import { useLoaderData } from "react-router";

import {
  CmsEditableSection,
  CmsEditorPreviewBridge,
  CmsSectionEditorPanel,
  useCmsVisualPageEditor,
} from "@/components/cms/CmsVisualEditor";
import { createCareersPageSectionEditors } from "@/components/cms/website-section-editors";
import {
  CareersBenefitsSection,
  CareersCtaSection,
  CareersHeroSection,
  CareersHiringProcessSection,
  CareersOpeningsSection,
} from "@/components/careers";
import { useCmsExperience } from "@/contexts/cms-experience-context";
import { buildCareersContent } from "@/i18n/content";
import { useCareersPageContent } from "@/i18n/content/hooks";
import { useI18n, useLocale } from "@/i18n/hooks";
import type { Locale } from "@/i18n/config";
import type { CareerJobDetail, CareersPageContent } from "@/types";

export function CareersPage() {
  const loaderData = useLoaderData<{ jobs?: CareerJobDetail[] } | undefined>();
  const fallbackContent = useCareersPageContent();
  const jobs = loaderData?.jobs ?? [];
  const { getContentOverride } = useCmsExperience();
  const { messages } = useI18n();
  const locale = useLocale();
  const sections = useMemo(() => createCareersPageSectionEditors(), []);

  const getInitialContent = useCallback(
    (editingLocale: Locale) =>
      getContentOverride<CareersPageContent>(`careers.${editingLocale}`) ??
      buildCareersContent(messages, editingLocale),
    [getContentOverride, messages],
  );

  const editor = useCmsVisualPageEditor({
    getInitialContent,
    contentKeyPrefix: "careers",
    siteLocale: locale,
    contentType: "page",
    sections,
  });

  const displayContent = editor.isInteractive ? editor.page : fallbackContent;

  return (
    <>
      <CmsSectionEditorPanel editor={editor} />

      <CmsEditorPreviewBridge editor={editor}>
        <CmsEditableSection
          sectionId="careers-hero"
          title="Careers Hero"
          isSelected={editor.selectedSectionId === "careers-hero"}
          onSelect={editor.setSelectedSectionId}
        >
          <CareersHeroSection content={displayContent.hero} />
        </CmsEditableSection>

        <CmsEditableSection
          sectionId="careers-benefits"
          title="Benefits"
          isSelected={editor.selectedSectionId === "careers-benefits"}
          onSelect={editor.setSelectedSectionId}
        >
          <CareersBenefitsSection items={displayContent.benefits.items} />
        </CmsEditableSection>

        <CmsEditableSection
          sectionId="careers-openings"
          title="Open Positions"
          isSelected={editor.selectedSectionId === "careers-openings"}
          onSelect={editor.setSelectedSectionId}
        >
          <CareersOpeningsSection content={displayContent.openings} jobs={jobs} />
        </CmsEditableSection>

        <CmsEditableSection
          sectionId="careers-hiring-process"
          title="Hiring Process"
          isSelected={editor.selectedSectionId === "careers-hiring-process"}
          onSelect={editor.setSelectedSectionId}
        >
          <CareersHiringProcessSection content={displayContent.hiringProcess} />
        </CmsEditableSection>

        <CmsEditableSection
          sectionId="careers-cta"
          title="Careers CTA"
          isSelected={editor.selectedSectionId === "careers-cta"}
          onSelect={editor.setSelectedSectionId}
        >
          <CareersCtaSection content={displayContent.cta} />
        </CmsEditableSection>

        <CmsEditableSection
          sectionId="careers-detail-copy"
          title="Job Detail Page"
          isSelected={editor.selectedSectionId === "careers-detail-copy"}
          onSelect={editor.setSelectedSectionId}
        >
          <div className="hidden" aria-hidden />
        </CmsEditableSection>
      </CmsEditorPreviewBridge>
    </>
  );
}
