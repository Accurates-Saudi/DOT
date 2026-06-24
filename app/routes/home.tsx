import type { Route } from "./+types/home";
import { HomePage } from "@/pages";
import { homePageContent } from "@/data/pages/home";
import { seoDefaults } from "@/data/site";

export function meta({}: Route.MetaArgs) {
  const { title, description } = homePageContent.meta;
  return [
    { title: seoDefaults.titleTemplate.replace("%s", title) },
    { name: "description", content: description },
  ];
}

export default function Home() {
  return <HomePage />;
}
