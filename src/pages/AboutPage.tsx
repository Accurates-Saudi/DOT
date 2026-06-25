import {
  AboutHeroSection,
  CompanyOverviewSection,
  EngineeringManufacturingSection,
} from "@/components/about";
import { useAboutPageContent } from "@/i18n/content/hooks";

export function AboutPage() {
  const aboutPageContent = useAboutPageContent();

  return (
    <>
      <AboutHeroSection content={aboutPageContent.hero} />
      <CompanyOverviewSection content={aboutPageContent.companyOverview} />
      <EngineeringManufacturingSection
        content={aboutPageContent.engineeringManufacturing}
      />
    </>
  );
}
