import {
  ContactEngineeringCtaSection,
  ContactHeroSection,
  ContactLocationSection,
  ContactMainSection,
} from "@/components/contact";
import { contactPageContent } from "@/data/pages/contact";

export function ContactPage() {
  return (
    <>
      <ContactHeroSection content={contactPageContent.hero} />
      <ContactMainSection content={contactPageContent.main} />
      <ContactLocationSection content={contactPageContent.location} />
      <ContactEngineeringCtaSection content={contactPageContent.engineeringCta} />
    </>
  );
}
