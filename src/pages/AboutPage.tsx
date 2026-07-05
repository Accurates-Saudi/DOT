import { useCallback, useMemo } from "react";

import {
  CmsEditableSection,
  CmsSectionEditorPanel,
  useCmsVisualPageEditor,
} from "@/components/cms/CmsVisualEditor";
import { createAboutPageSectionEditors } from "@/components/cms/website-section-editors";
import {
  AboutHeroSection,
  CompanyOverviewSection,
  EngineeringManufacturingSection,
} from "@/components/about";
import { useCmsExperience } from "@/contexts/cms-experience-context";
import { buildAboutContent } from "@/i18n/content";
import { useAboutPageContent } from "@/i18n/content/hooks";
import { useI18n, useLocale } from "@/i18n/hooks";
import type { Locale } from "@/i18n/config";
import type { AboutPageContent } from "@/types";

export function AboutPage() {
  const aboutPageContent = useAboutPageContent();
  const { getContentOverride } = useCmsExperience();
  const { messages } = useI18n();
  const locale = useLocale();
  const sections = useMemo(() => createAboutPageSectionEditors(), []);

  const getInitialContent = useCallback(
    (editingLocale: Locale) =>
      getContentOverride<AboutPageContent>(`about.${editingLocale}`) ??
      buildAboutContent(messages, editingLocale),
    [getContentOverride, messages],
  );

  const editor = useCmsVisualPageEditor({
    getInitialContent,
    contentKeyPrefix: "about",
    siteLocale: locale,
    contentType: "page",
    sections,
  });

  const displayContent = editor.isInteractive ? editor.page : aboutPageContent;

  return (
    <>
      <CmsSectionEditorPanel editor={editor} />
      <CmsEditableSection
        sectionId="about-hero"
        title="About Hero"
        isSelected={editor.selectedSectionId === "about-hero"}
        onSelect={editor.setSelectedSectionId}
      >
        <AboutHeroSection content={displayContent.hero} />
      </CmsEditableSection>
      <CmsEditableSection
        sectionId="company-overview"
        title="Who We Are"
        isSelected={editor.selectedSectionId === "company-overview"}
        onSelect={editor.setSelectedSectionId}
      >
        <CompanyOverviewSection content={displayContent.companyOverview} />
      </CmsEditableSection>
      <CmsEditableSection
        sectionId="engineering-manufacturing"
        title="Engineering & Manufacturing"
        isSelected={editor.selectedSectionId === "engineering-manufacturing"}
        onSelect={editor.setSelectedSectionId}
      >
        <EngineeringManufacturingSection
          content={displayContent.engineeringManufacturing}
        />
      </CmsEditableSection>
    </>
  );
}
