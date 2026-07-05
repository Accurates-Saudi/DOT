import { useCallback, useMemo } from "react";

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
import { useCmsExperience } from "@/contexts/cms-experience-context";
import { buildHomeContent } from "@/i18n/content";
import { useHomePageContent } from "@/i18n/content/hooks";
import { useI18n, useLocale } from "@/i18n/hooks";
import type { Locale } from "@/i18n/config";
import type { CertificateItem, HomePageContent } from "@/types";

export function HomePage({
  certificateItems,
}: {
  certificateItems?: CertificateItem[];
}) {
  const homePageContent = useHomePageContent();
  const { getContentOverride } = useCmsExperience();
  const { messages } = useI18n();
  const locale = useLocale();
  const sections = useMemo(() => createHomePageSectionEditors(), []);

  const getInitialContent = useCallback(
    (editingLocale: Locale) => {
      let base =
        getContentOverride<HomePageContent>(`home.${editingLocale}`) ??
        buildHomeContent(messages, editingLocale);

      if (certificateItems?.length) {
        base = {
          ...base,
          certificates: {
            ...base.certificates,
            items: certificateItems,
          },
        };
      }

      return base;
    },
    [certificateItems, getContentOverride, messages],
  );

  const editor = useCmsVisualPageEditor({
    getInitialContent,
    contentKeyPrefix: "home",
    siteLocale: locale,
    contentType: "page",
    sections,
  });

  const displayContent = editor.isInteractive ? editor.page : homePageContent;

  return (
    <>
      <CmsSectionEditorPanel editor={editor} />

      <CmsEditableSection
        sectionId="hero"
        title="Hero Section"
        isSelected={editor.selectedSectionId === "hero"}
        onSelect={editor.setSelectedSectionId}
      >
        <HeroSection content={displayContent.hero} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="about"
        title="Who We Are"
        isSelected={editor.selectedSectionId === "about"}
        onSelect={editor.setSelectedSectionId}
      >
        <AboutSection content={displayContent.about} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="company-statistics"
        title="Company Statistics"
        isSelected={editor.selectedSectionId === "company-statistics"}
        onSelect={editor.setSelectedSectionId}
      >
        <CompanyStatisticsSection content={displayContent.companyStatistics} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="services"
        title="Services"
        isSelected={editor.selectedSectionId === "services"}
        onSelect={editor.setSelectedSectionId}
      >
        <ServicesSection content={displayContent.services} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="why-choose-us"
        title="Why Choose Us"
        isSelected={editor.selectedSectionId === "why-choose-us"}
        onSelect={editor.setSelectedSectionId}
      >
        <WhyChooseUsSection content={displayContent.whyChooseUs} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="engineering"
        title="Engineering"
        isSelected={editor.selectedSectionId === "engineering"}
        onSelect={editor.setSelectedSectionId}
      >
        <EngineeringSection content={displayContent.engineering} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="featured-products"
        title="Products Section"
        isSelected={editor.selectedSectionId === "featured-products"}
        onSelect={editor.setSelectedSectionId}
      >
        <FeaturedProductsSection content={displayContent.featuredProducts} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="certificates"
        title="Certificates"
        isSelected={editor.selectedSectionId === "certificates"}
        onSelect={editor.setSelectedSectionId}
      >
        <CertificatesSection content={displayContent.certificates} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="news"
        title="News Section"
        isSelected={editor.selectedSectionId === "news"}
        onSelect={editor.setSelectedSectionId}
      >
        <NewsSection content={displayContent.news} />
      </CmsEditableSection>

      <CmsEditableSection
        sectionId="trusted-partners"
        title="Trusted Partners"
        isSelected={editor.selectedSectionId === "trusted-partners"}
        onSelect={editor.setSelectedSectionId}
      >
        <TrustedPartnersSection content={displayContent.trustedPartners} />
      </CmsEditableSection>
    </>
  );
}
