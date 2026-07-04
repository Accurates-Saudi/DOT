import { useMemo } from "react";

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
import { useAboutPageContent } from "@/i18n/content/hooks";
import { useLocale } from "@/i18n/hooks";

export function AboutPage() {
  const aboutPageContent = useAboutPageContent();
  const locale = useLocale();
  const sections = useMemo(() => createAboutPageSectionEditors(), []);
  const editor = useCmsVisualPageEditor({
    initialContent: aboutPageContent,
    contentKey: `about.${locale}`,
    contentType: "page",
    sections,
  });

  return (
    <>
      <CmsSectionEditorPanel editor={editor} />
      <CmsEditableSection
        sectionId="about-hero"
        title="About Hero"
        isSelected={editor.selectedSectionId === "about-hero"}
        onSelect={editor.setSelectedSectionId}
      >
        <AboutHeroSection content={editor.page.hero} />
      </CmsEditableSection>
      <CmsEditableSection
        sectionId="company-overview"
        title="Who We Are"
        isSelected={editor.selectedSectionId === "company-overview"}
        onSelect={editor.setSelectedSectionId}
      >
        <CompanyOverviewSection content={editor.page.companyOverview} />
      </CmsEditableSection>
      <CmsEditableSection
        sectionId="engineering-manufacturing"
        title="Engineering & Manufacturing"
        isSelected={editor.selectedSectionId === "engineering-manufacturing"}
        onSelect={editor.setSelectedSectionId}
      >
        <EngineeringManufacturingSection
          content={editor.page.engineeringManufacturing}
        />
      </CmsEditableSection>
    </>
  );
}
