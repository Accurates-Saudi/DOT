import { useCallback, useMemo } from "react";

import {
  CmsEditableSection,
  CmsEditorPreviewBridge,
  CmsSectionEditorPanel,
  useCmsVisualPageEditor,
} from "@/components/cms/CmsVisualEditor";
import { createContactPageSectionEditors } from "@/components/cms/website-section-editors";
import {
  ContactEngineeringCtaSection,
  ContactFeedbackSection,
  ContactHeroSection,
  ContactLocationSection,
  ContactMainSection,
} from "@/components/contact";
import { useCmsExperience } from "@/contexts/cms-experience-context";
import { buildContactContent } from "@/i18n/content";
import { useContactPageContent } from "@/i18n/content/hooks";
import { useI18n, useLocale } from "@/i18n/hooks";
import type { Locale } from "@/i18n/config";
import type { ContactPageContent } from "@/types";

export function ContactPage() {
  const contactPageContent = useContactPageContent();
  const { getContentOverride } = useCmsExperience();
  const { messages } = useI18n();
  const locale = useLocale();
  const sections = useMemo(() => createContactPageSectionEditors(), []);

  const getInitialContent = useCallback(
    (editingLocale: Locale) =>
      getContentOverride<ContactPageContent>(`contact.${editingLocale}`) ??
      buildContactContent(messages, editingLocale),
    [getContentOverride, messages],
  );

  const editor = useCmsVisualPageEditor({
    getInitialContent,
    contentKeyPrefix: "contact",
    siteLocale: locale,
    contentType: "page",
    sections,
  });

  const displayContent = editor.isInteractive ? editor.page : contactPageContent;

  return (
    <>
      <CmsSectionEditorPanel editor={editor} />
      <CmsEditorPreviewBridge editor={editor}>
      <CmsEditableSection
        sectionId="contact-hero"
        title="Contact Hero"
        isSelected={editor.selectedSectionId === "contact-hero"}
        onSelect={editor.setSelectedSectionId}
      >
        <ContactHeroSection content={displayContent.hero} />
      </CmsEditableSection>
      <CmsEditableSection
        sectionId="contact-main"
        title="Contact Section"
        isSelected={editor.selectedSectionId === "contact-main"}
        onSelect={editor.setSelectedSectionId}
      >
        <ContactMainSection content={displayContent.main} />
      </CmsEditableSection>
      <CmsEditableSection
        sectionId="contact-feedback"
        title="Feedback Section"
        isSelected={editor.selectedSectionId === "contact-feedback"}
        onSelect={editor.setSelectedSectionId}
      >
        <ContactFeedbackSection content={displayContent.feedback} />
      </CmsEditableSection>
      <CmsEditableSection
        sectionId="contact-location"
        title="Contact Location"
        isSelected={editor.selectedSectionId === "contact-location"}
        onSelect={editor.setSelectedSectionId}
      >
        <ContactLocationSection content={displayContent.location} />
      </CmsEditableSection>
      <CmsEditableSection
        sectionId="contact-engineering-cta"
        title="Contact CTA"
        isSelected={editor.selectedSectionId === "contact-engineering-cta"}
        onSelect={editor.setSelectedSectionId}
      >
        <ContactEngineeringCtaSection content={displayContent.engineeringCta} />
      </CmsEditableSection>
      </CmsEditorPreviewBridge>
    </>
  );
}
