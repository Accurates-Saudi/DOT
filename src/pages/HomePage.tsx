import {
  AboutSection,
  CertificatesSection,
  CompanyStatisticsSection,
  EngineeringSection,
  FeaturedProductsSection,
  HeroSection,
  NewsSection,
  ServicesSection,
  TrustedPartnersSection,
  WhyChooseUsSection,
} from "@/components/sections";
import { homePageContent } from "@/data/pages/home";

export function HomePage() {
  return (
    <>
      <HeroSection content={homePageContent.hero} />
      <AboutSection content={homePageContent.about} />
      <ServicesSection content={homePageContent.services} />
      <CompanyStatisticsSection content={homePageContent.companyStatistics} />
      <WhyChooseUsSection content={homePageContent.whyChooseUs} />
      <EngineeringSection content={homePageContent.engineering} />
      <FeaturedProductsSection content={homePageContent.featuredProducts} />
      <CertificatesSection content={homePageContent.certificates} />
      <NewsSection content={homePageContent.news} />
      <TrustedPartnersSection content={homePageContent.trustedPartners} />
    </>
  );
}
