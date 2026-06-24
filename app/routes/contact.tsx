import type { Route } from "./+types/contact";
import { ContactPage } from "@/pages";
import { contactPageMeta } from "@/data/pages";
import { seoDefaults } from "@/data/site";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: seoDefaults.titleTemplate.replace("%s", contactPageMeta.title),
    },
    { name: "description", content: contactPageMeta.description },
  ];
}

export default function Contact() {
  return <ContactPage />;
}
