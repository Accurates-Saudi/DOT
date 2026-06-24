import {
  AboutHeroSection,
  CompanyOverviewSection,
  EngineeringManufacturingSection,
} from "@/components/about";
import { aboutPageContent } from "@/data/pages/about";

export function AboutPage() {
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
