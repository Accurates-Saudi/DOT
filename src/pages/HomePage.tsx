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
import type { CertificateItem } from "@/types";

export function HomePage({
  certificateItems,
}: {
  certificateItems?: CertificateItem[];
}) {
  const homePageContent = useHomePageContent();
  const locale = useLocale();
  const sections = useMemo(() => createHomePageSectionEditors(), []);
  const pageContent = useMemo(
    () =>
      certificateItems?.length
        ? {
            ...homePageContent,
            certificates: {
              ...homePageContent.certificates,
              items: certificateItems,
            },
          }
        : homePageContent,
    [certificateItems, homePageContent],
  );
  const editor = useCmsVisualPageEditor({
    initialContent: pageContent,
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
        sectionId="company-statistics"
        title="Company Statistics"
        isSelected={editor.selectedSectionId === "company-statistics"}
        onSelect={editor.setSelectedSectionId}
      >
        <CompanyStatisticsSection content={editor.page.companyStatistics} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="services"
        title="Services"
        isSelected={editor.selectedSectionId === "services"}
        onSelect={editor.setSelectedSectionId}
      >
        <ServicesSection content={editor.page.services} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="why-choose-us"
        title="Why Choose Us"
        isSelected={editor.selectedSectionId === "why-choose-us"}
        onSelect={editor.setSelectedSectionId}
      >
        <WhyChooseUsSection content={editor.page.whyChooseUs} />
      </CmsEditableSection>

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

      <CmsEditableSection
        sectionId="news"
        title="News Section"
        isSelected={editor.selectedSectionId === "news"}
        onSelect={editor.setSelectedSectionId}
      >
        <NewsSection content={editor.page.news} />
      </CmsEditableSection>

      <TrustedPartnersSection content={editor.page.trustedPartners} />
    </>
  );
}

