import { PageHeroSection } from "@/components/shared";
import { useServicesPageMeta } from "@/i18n/content/hooks";
import { useI18n, useTranslation } from "@/i18n/hooks";
import { useMemo } from "react";

export function ServicesPage() {
  const servicesPageMeta = useServicesPageMeta();
  const { localizePath } = useI18n();
  const { t } = useTranslation("common");

  const breadcrumbs = useMemo(
    () => [
      { label: t("home"), href: localizePath("/") },
      { label: servicesPageMeta.title },
    ],
    [localizePath, servicesPageMeta.title, t],
  );

  return (
    <PageHeroSection
      id="services-hero"
      aria-label={servicesPageMeta.title}
      breadcrumbs={breadcrumbs}
      title={servicesPageMeta.title}
      introduction={servicesPageMeta.description}
    />
  );
}
