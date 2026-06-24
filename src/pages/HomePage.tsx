import {
  AboutSection,
  HeroSection,
  ServicesSection,
  WhyChooseUsSection,
} from "@/components/sections";
import { homePageContent } from "@/data/pages/home";

export function HomePage() {
  return (
    <>
      <HeroSection content={homePageContent.hero} />
      <AboutSection content={homePageContent.about} />
      <ServicesSection content={homePageContent.services} />
      <WhyChooseUsSection content={homePageContent.whyChooseUs} />
    </>
  );
}
