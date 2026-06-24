import { AboutSection, HeroSection } from "@/components/sections";
import { homePageContent } from "@/data/pages/home";

export function HomePage() {
  return (
    <>
      <HeroSection content={homePageContent.hero} />
      <AboutSection content={homePageContent.about} />
    </>
  );
}
