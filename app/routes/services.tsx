import type { Route } from "./+types/services";
import { ServicesPage } from "@/pages";
import { servicesPageMeta } from "@/data/pages";
import { seoDefaults } from "@/data/site";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: seoDefaults.titleTemplate.replace("%s", servicesPageMeta.title),
    },
    { name: "description", content: servicesPageMeta.description },
  ];
}

export default function Services() {
  return <ServicesPage />;
}
