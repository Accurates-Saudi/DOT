import {
  CmsEditableSection,
  CmsSectionEditorPanel,
  useCmsVisualPageEditor,
} from "@/components/cms/CmsVisualEditor";
import { createContactPageSectionEditors } from "@/components/cms/website-section-editors";
import {
  ContactEngineeringCtaSection,
  ContactHeroSection,
  ContactLocationSection,
  ContactMainSection,
} from "@/components/contact";
import { useContactPageContent } from "@/i18n/content/hooks";
import { useLocale } from "@/i18n/hooks";
import { useMemo } from "react";

export function ContactPage() {
  const contactPageContent = useContactPageContent();
  const locale = useLocale();
  const sections = useMemo(() => createContactPageSectionEditors(), []);
  const editor = useCmsVisualPageEditor({
    initialContent: contactPageContent,
    contentKey: `contact.${locale}`,
    contentType: "page",
    sections,
  });

  return (
    <>
      <CmsSectionEditorPanel editor={editor} />
      <ContactHeroSection content={editor.page.hero} />
      <CmsEditableSection
        sectionId="contact-main"
        title="Contact Section"
        isSelected={editor.selectedSectionId === "contact-main"}
        onSelect={editor.setSelectedSectionId}
      >
        <ContactMainSection content={editor.page.main} />
      </CmsEditableSection>
      <ContactLocationSection content={editor.page.location} />
      <ContactEngineeringCtaSection content={editor.page.engineeringCta} />
    </>
  );
}
