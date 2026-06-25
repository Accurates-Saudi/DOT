import { Outlet, redirect, useRouteLoaderData } from "react-router";

import type { Route } from "./+types/_locale";
import { MainLayout } from "@/components/layout";
import { I18nProvider } from "@/i18n";
import {
  defaultLocale,
  isValidLocale,
  loadMessages,
  localeHtmlLang,
  getDirection,
  parseLocaleCookie,
} from "@/i18n";

const KNOWN_PAGE_SLUGS = [
  "about",
  "services",
  "products",
  "catalogs",
  "news",
  "contact",
] as const;

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale = params.locale ?? defaultLocale;

  if (!isValidLocale(locale)) {
    if (KNOWN_PAGE_SLUGS.includes(locale as (typeof KNOWN_PAGE_SLUGS)[number])) {
      const cookieLocale = parseLocaleCookie(request.headers.get("Cookie"));
      const targetLocale =
        cookieLocale && isValidLocale(cookieLocale) ? cookieLocale : defaultLocale;
      throw redirect(`/${targetLocale}/${locale}`);
    }

    throw redirect(`/${defaultLocale}`);
  }

  const messages = await loadMessages(locale);

  return { locale, messages };
}

export default function LocaleLayout() {
  const data = useRouteLoaderData<typeof loader>("routes/_locale");

  if (!data) {
    return <Outlet />;
  }

  return (
    <I18nProvider locale={data.locale} messages={data.messages}>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </I18nProvider>
  );
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) return [];

  return [
    { htmlLang: localeHtmlLang[loaderData.locale] },
    { dir: getDirection(loaderData.locale) },
  ];
}
