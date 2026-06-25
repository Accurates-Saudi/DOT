import { useMemo } from "react";

import { useI18n } from "@/i18n/hooks";

import { buildCookieConsentCopy } from "./cookie";
import {
  buildAboutContent,
  buildCatalogsContent,
  buildContactContent,
  buildFooter,
  buildHomeContent,
  buildMainNavigation,
  buildNewsContent,
  buildNotFoundContent,
  buildProductsContent,
  buildServicesMeta,
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

export function useFooterContent() {
  const { locale, messages } = useI18n();
  return useMemo(() => buildFooter(messages, locale), [locale, messages]);
}

export function useHomePageContent() {
  const { locale, messages } = useI18n();
  return useMemo(() => buildHomeContent(messages, locale), [locale, messages]);
}

export function useAboutPageContent() {
  const { locale, messages } = useI18n();
  return useMemo(() => buildAboutContent(messages, locale), [locale, messages]);
}

export function useProductsPageContent() {
  const { locale, messages } = useI18n();
  return useMemo(() => buildProductsContent(messages, locale), [locale, messages]);
}

export function useContactPageContent() {
  const { locale, messages } = useI18n();
  return useMemo(() => buildContactContent(messages, locale), [locale, messages]);
}

export function useCatalogsPageContent() {
  const { locale, messages } = useI18n();
  return useMemo(() => buildCatalogsContent(messages, locale), [locale, messages]);
}

export function useNewsPageContent() {
  const { locale, messages } = useI18n();
  return useMemo(() => buildNewsContent(messages, locale), [locale, messages]);
}

export function useNotFoundPageContent() {
  const { locale, messages } = useI18n();
  return useMemo(() => buildNotFoundContent(messages, locale), [locale, messages]);
}

export function useServicesPageMeta() {
  const { messages } = useI18n();
  return useMemo(() => buildServicesMeta(messages), [messages]);
}

export function useTrustedPartnersContent() {
  const { messages } = useI18n();
  return useMemo(() => buildTrustedPartners(messages), [messages]);
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
  const { messages } = useI18n();
  return useMemo(
    () => getLocalizedNewsBySlug(messages, slug),
    [messages, slug],
  );
}

export function useRelatedNews(slug: string, limit = 3) {
  const { messages } = useI18n();
  return useMemo(
    () => getLocalizedRelatedNews(messages, slug, limit),
    [messages, slug, limit],
  );
}

export function useCookieConsentCopy() {
  const { messages } = useI18n();
  return useMemo(() => buildCookieConsentCopy(messages), [messages]);
}

export function useSiteCopy() {
  const { messages } = useI18n();
  return useMemo(() => messages.site as {
    companyName: string;
    legalName: string;
    tagline: string;
    description: string;
  }, [messages]);
}
