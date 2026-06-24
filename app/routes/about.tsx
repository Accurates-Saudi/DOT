import type { Route } from "./+types/about";
import { AboutPage } from "@/pages";
import { aboutPageMeta } from "@/data/pages";
import { seoDefaults } from "@/data/site";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: seoDefaults.titleTemplate.replace("%s", aboutPageMeta.title),
    },
    { name: "description", content: aboutPageMeta.description },
  ];
}

export default function About() {
  return <AboutPage />;
}
