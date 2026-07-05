import { useCallback, useMemo } from "react";

import { PageHeroSection } from "@/components/shared";
import {
  CmsEditableSection,
  CmsSectionEditorPanel,
  useCmsVisualPageEditor,
} from "@/components/cms/CmsVisualEditor";
import { createServicesPageSectionEditors } from "@/components/cms/website-section-editors";
import { useCmsExperience } from "@/contexts/cms-experience-context";
import { buildServicesPageContent } from "@/i18n/content";
import { useServicesPageContent } from "@/i18n/content/hooks";
import { useLocale } from "@/i18n/hooks";
import type { Locale } from "@/i18n/config";

export function ServicesPage() {
  const servicesPageContent = useServicesPageContent();
  const { getContentOverride } = useCmsExperience();
  const locale = useLocale();
  const sections = useMemo(() => createServicesPageSectionEditors(), []);

  const getInitialContent = useCallback(
    (editingLocale: Locale) =>
      getContentOverride<ReturnType<typeof buildServicesPageContent>>(
        `services.${editingLocale}`,
      ) ?? buildServicesPageContent(editingLocale),
    [getContentOverride],
  );

  const editor = useCmsVisualPageEditor({
    getInitialContent,
    contentKeyPrefix: "services",
    siteLocale: locale,
    contentType: "page",
    sections,
  });

  const displayContent = editor.isInteractive ? editor.page : servicesPageContent;

  return (
    <>
      <CmsSectionEditorPanel editor={editor} />

      <CmsEditableSection
        sectionId="services-hero"
        title="Services Hero"
        isSelected={editor.selectedSectionId === "services-hero"}
        onSelect={editor.setSelectedSectionId}
      >
        <PageHeroSection
          id="services-hero"
          aria-label={displayContent.hero.title}
          breadcrumbs={displayContent.hero.breadcrumbs}
          title={displayContent.hero.title}
          introduction={displayContent.hero.introduction}
          backgroundImage={displayContent.hero.backgroundImage}
        />
      </CmsEditableSection>
    </>
  );
}
