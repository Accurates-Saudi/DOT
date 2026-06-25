import { data } from "react-router";

import type { Route } from "./+types/$";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { buildNotFoundContent } from "@/i18n/content";
import { createPageMeta } from "@/i18n/meta";
import { getLocaleRouteData } from "@/i18n/route-data";

export function loader() {
  return data(null, { status: 404 });
}

export function meta({ matches }: Route.MetaArgs) {
  const localeData = getLocaleRouteData(matches);
  if (!localeData) return [{ name: "robots", content: "noindex, nofollow" }];

  const content = buildNotFoundContent(localeData.messages, localeData.locale);

  return [
    ...createPageMeta({
      title: content.meta.title,
      description: content.meta.description,
      pathname: matches.at(-1)?.pathname ?? `/${localeData.locale}`,
      locale: localeData.locale,
    }),
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function NotFound() {
  return <NotFoundPage />;
}
