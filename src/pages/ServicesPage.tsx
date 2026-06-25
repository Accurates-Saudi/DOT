import { PageHeroSection } from "@/components/shared";
import { servicesPageMeta } from "@/data/pages";

export function ServicesPage() {
  return (
    <PageHeroSection
      id="services-hero"
      aria-label="Services introduction"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services" },
      ]}
      title={servicesPageMeta.title}
      introduction={servicesPageMeta.description}
    />
  );
}
