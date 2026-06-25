import type { Route } from "./+types/contact";
import { ContactPage } from "@/pages";
import { buildContactContent } from "@/i18n/content";
import { createPageMeta } from "@/i18n/meta";
import { getLocaleRouteData } from "@/i18n/route-data";

export function meta({ matches }: Route.MetaArgs) {
  const localeData = getLocaleRouteData(matches);
  if (!localeData) return [];

  const content = buildContactContent(localeData.messages, localeData.locale);

  return createPageMeta({
    title: content.meta.title,
    description: content.meta.description,
    pathname: `/${localeData.locale}/contact`,
    locale: localeData.locale,
  });
}

export default function Contact() {
  return <ContactPage />;
}
