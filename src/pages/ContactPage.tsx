import {
  ContactEngineeringCtaSection,
  ContactHeroSection,
  ContactLocationSection,
  ContactMainSection,
} from "@/components/contact";
import { useContactPageContent } from "@/i18n/content/hooks";

export function ContactPage() {
  const contactPageContent = useContactPageContent();

  return (
    <>
      <ContactHeroSection content={contactPageContent.hero} />
      <ContactMainSection content={contactPageContent.main} />
      <ContactLocationSection content={contactPageContent.location} />
      <ContactEngineeringCtaSection content={contactPageContent.engineeringCta} />
    </>
  );
}
