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
} from "@/i18n";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale ?? defaultLocale;

  if (!isValidLocale(locale)) {
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
