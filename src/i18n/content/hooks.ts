import { useMemo } from "react";

import { useCmsExperience } from "@/contexts/cms-experience-context";
import { useI18n } from "@/i18n/hooks";

import {
  buildAboutContent,
  buildCatalogsContent,
  buildCookieConsentCopy,
  buildContactContent,
  buildFooter,
  buildHomeContent,
  buildMainNavigation,
  buildNewsContent,
  buildNavigationUi,
  buildNotFoundContent,
  buildProductsContent,
  buildServicesPageContent,
  buildServicesMeta,
  buildSiteCopy,
  buildTrustedPartners,
  getLocalizedNewsBySlug,
  getLocalizedProductBySlug,
  getLocalizedRelatedNews,
  getLocalizedRelatedProducts,
} from "./index";

export function useMainNavigation() {
  const { locale, messages } = useI18n();
  return useMemo(
    () => buildMainNavigation(messages, locale),
    [locale, messages],
  );
}

export function useNavigationCopy() {
  const { locale } = useI18n();
  return useMemo(() => buildNavigationUi(locale), [locale]);
}

export function useFooterContent() {
  const { locale, messages } = useI18n();
  const { getContentOverride } = useCmsExperience();
  return useMemo(() => {
    return (
      getContentOverride<ReturnType<typeof buildFooter>>(`footer.${locale}`) ??
      buildFooter(messages, locale)
    );
  }, [getContentOverride, locale, messages]);
}

export function useHomePageContent() {
  const { locale, messages } = useI18n();
  const { getContentOverride } = useCmsExperience();
  return useMemo(() => {
    return (
      getContentOverride<ReturnType<typeof buildHomeContent>>(`home.${locale}`) ??
      buildHomeContent(messages, locale)
    );
  }, [getContentOverride, locale, messages]);
}

export function useAboutPageContent() {
  const { locale, messages } = useI18n();
  const { getContentOverride } = useCmsExperience();
  return useMemo(() => {
    return (
      getContentOverride<ReturnType<typeof buildAboutContent>>(`about.${locale}`) ??
      buildAboutContent(messages, locale)
    );
  }, [getContentOverride, locale, messages]);
}

export function useProductsPageContent() {
  const { locale, messages } = useI18n();
  const { getContentOverride } = useCmsExperience();
  return useMemo(() => {
    return (
      getContentOverride<ReturnType<typeof buildProductsContent>>(
        `products.${locale}`,
      ) ?? buildProductsContent(messages, locale)
    );
  }, [getContentOverride, locale, messages]);
}

export function useContactPageContent() {
  const { locale, messages } = useI18n();
  const { getContentOverride } = useCmsExperience();
  return useMemo(() => {
    return (
      getContentOverride<ReturnType<typeof buildContactContent>>(`contact.${locale}`) ??
      buildContactContent(messages, locale)
    );
  }, [getContentOverride, locale, messages]);
}

export function useCatalogsPageContent() {
  const { locale, messages } = useI18n();
  const { getContentOverride } = useCmsExperience();
  return useMemo(() => {
    return (
      getContentOverride<ReturnType<typeof buildCatalogsContent>>(
        `catalogs.${locale}`,
      ) ?? buildCatalogsContent(messages, locale)
    );
  }, [getContentOverride, locale, messages]);
}

export function useNewsPageContent() {
  const { locale, messages } = useI18n();
  const { getContentOverride } = useCmsExperience();
  return useMemo(() => {
    return (
      getContentOverride<ReturnType<typeof buildNewsContent>>(`news.${locale}`) ??
      buildNewsContent(messages, locale)
    );
  }, [getContentOverride, locale, messages]);
}

export function useNotFoundPageContent() {
  const { locale, messages } = useI18n();
  const { getContentOverride } = useCmsExperience();
  return useMemo(() => {
    return (
      getContentOverride<ReturnType<typeof buildNotFoundContent>>(
        `not-found.${locale}`,
      ) ?? buildNotFoundContent(messages, locale)
    );
  }, [getContentOverride, locale, messages]);
}

export function useServicesPageMeta() {
  const { locale, messages } = useI18n();
  return useMemo(() => buildServicesMeta(messages, locale), [locale, messages]);
}

export function useTrustedPartnersContent() {
  const { locale, messages } = useI18n();
  return useMemo(() => buildTrustedPartners(messages, locale), [locale, messages]);
}

export function useServicesPageContent() {
  const { locale } = useI18n();
  const { getContentOverride } = useCmsExperience();
  return useMemo(() => {
    return (
      getContentOverride<ReturnType<typeof buildServicesPageContent>>(
        `services.${locale}`,
      ) ?? buildServicesPageContent(locale)
    );
  }, [getContentOverride, locale]);
}

export function useProductBySlug(slug: string) {
  const { locale, messages } = useI18n();
  return useMemo(
    () => getLocalizedProductBySlug(messages, locale, slug),
    [locale, messages, slug],
  );
}

export function useRelatedProducts(slug: string, limit = 3) {
  const { locale, messages } = useI18n();
  return useMemo(
    () => getLocalizedRelatedProducts(messages, locale, slug, limit),
    [locale, messages, slug, limit],
  );
}

export function useNewsBySlug(slug: string) {
  const { locale, messages } = useI18n();
  return useMemo(
    () => getLocalizedNewsBySlug(messages, locale, slug),
    [locale, messages, slug],
  );
}

export function useRelatedNews(slug: string, limit = 3) {
  const { locale, messages } = useI18n();
  return useMemo(
    () => getLocalizedRelatedNews(messages, locale, slug, limit),
    [locale, messages, slug, limit],
  );
}

export function useCookieConsentCopy() {
  const { locale, messages } = useI18n();
  return useMemo(
    () => buildCookieConsentCopy(messages, locale),
    [locale, messages],
  );
}

export function useSiteCopy() {
  const { locale } = useI18n();
  return useMemo(() => buildSiteCopy(locale) as {
    companyName: string;
    legalName: string;
    tagline: string;
    description: string;
  }, [locale]);
}
