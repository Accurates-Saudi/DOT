import { data } from "react-router";

import type { Route } from "./+types/$";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { notFoundPageMeta } from "@/data/pages/not-found";
import { seoDefaults } from "@/data/site";

export function loader() {
  return data(null, { status: 404 });
}

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: seoDefaults.titleTemplate.replace("%s", notFoundPageMeta.title),
    },
    { name: "description", content: notFoundPageMeta.description },
    { name: "robots", content: "noindex, nofollow" },
  ];
}

export default function NotFound() {
  return <NotFoundPage />;
}
