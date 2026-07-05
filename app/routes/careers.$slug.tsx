import { redirect } from "react-router";

import type { Route } from "./+types/careers.$slug";
import { CareerDetailPage } from "@/pages/CareerDetailPage";
import { createPageMeta } from "@/i18n/meta";
import { defaultLocale, isValidLocale } from "@/i18n";
import { getLocaleRouteData } from "@/i18n/route-data";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale ?? defaultLocale;

  if (!isValidLocale(locale)) {
    throw redirect(`/${defaultLocale}/careers/${params.slug}`);
  }

  const { getPublishedCareerJobBySlug } = await import(
    "@/server/cms/content/entity-content.server"
  );
  const job = await getPublishedCareerJobBySlug(locale, params.slug);

  if (!job) {
    throw new Response("Not Found", { status: 404 });
  }

  return { job, locale };
}

export function meta({ loaderData, matches }: Route.MetaArgs) {
  const job = loaderData?.job;
  const localeData = getLocaleRouteData(matches);

  if (!job || !localeData) {
    return [{ title: "Career Not Found" }];
  }

  return createPageMeta({
    title: job.meta.title,
    description: job.meta.description,
    pathname: `/${localeData.locale}/careers/${job.slug}`,
    locale: localeData.locale,
  });
}

export default function CareerDetail() {
  return <CareerDetailPage />;
}
