import { PageHeroSection } from "@/components/shared";
import { useServicesPageContent } from "@/i18n/content/hooks";

export function ServicesPage() {
  const servicesPageContent = useServicesPageContent();

  return (
    <PageHeroSection
      id="services-hero"
      aria-label={servicesPageContent.hero.title}
      breadcrumbs={servicesPageContent.hero.breadcrumbs}
      title={servicesPageContent.hero.title}
      introduction={servicesPageContent.hero.introduction}
      backgroundImage={servicesPageContent.hero.backgroundImage}
    />
  );
}
