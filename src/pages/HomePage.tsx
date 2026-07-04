import { useMemo } from "react";

import {
  CmsEditableSection,
  CmsSectionEditorPanel,
  useCmsVisualPageEditor,
} from "@/components/cms/CmsVisualEditor";
import { createHomePageSectionEditors } from "@/components/cms/website-section-editors";
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
import { useHomePageContent } from "@/i18n/content/hooks";
import { useLocale } from "@/i18n/hooks";

export function HomePage() {
  const homePageContent = useHomePageContent();
  const locale = useLocale();
  const sections = useMemo(() => createHomePageSectionEditors(), []);
  const editor = useCmsVisualPageEditor({
    initialContent: homePageContent,
    contentKey: `home.${locale}`,
    contentType: "page",
    sections,
  });

  return (
    <>
      <CmsSectionEditorPanel editor={editor} />

      <CmsEditableSection
        sectionId="hero"
        title="Hero Section"
        isSelected={editor.selectedSectionId === "hero"}
        onSelect={editor.setSelectedSectionId}
      >
        <HeroSection content={editor.page.hero} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="about"
        title="Who We Are"
        isSelected={editor.selectedSectionId === "about"}
        onSelect={editor.setSelectedSectionId}
      >
        <AboutSection content={editor.page.about} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="services"
        title="Services"
        isSelected={editor.selectedSectionId === "services"}
        onSelect={editor.setSelectedSectionId}
      >
        <ServicesSection content={editor.page.services} />
      </CmsEditableSection>

      <CompanyStatisticsSection content={editor.page.companyStatistics} />

      <WhyChooseUsSection content={editor.page.whyChooseUs} />

      <CmsEditableSection
        sectionId="engineering"
        title="Engineering"
        isSelected={editor.selectedSectionId === "engineering"}
        onSelect={editor.setSelectedSectionId}
      >
        <EngineeringSection content={editor.page.engineering} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="featured-products"
        title="Products Section"
        isSelected={editor.selectedSectionId === "featured-products"}
        onSelect={editor.setSelectedSectionId}
      >
        <FeaturedProductsSection content={editor.page.featuredProducts} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="certificates"
        title="Certificates"
        isSelected={editor.selectedSectionId === "certificates"}
        onSelect={editor.setSelectedSectionId}
      >
        <CertificatesSection content={editor.page.certificates} />
      </CmsEditableSection>

      <NewsSection content={editor.page.news} />

      <TrustedPartnersSection content={editor.page.trustedPartners} />
    </>
  );
}

