import { Package2 } from "lucide-react";

import type { Route } from "./+types/admin.products";
import { AdminSectionPlaceholderPage } from "@/pages/admin";

export default function AdminProductsRoute() {
  return (
    <AdminSectionPlaceholderPage
      eyebrow="Products"
      title="Products workspace is ready for the next phase."
      description="This protected section is scaffolded inside the admin shell so product CRUD, localization, and publishing flows can be added without reworking authentication or layout."
      icon={Package2}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Products | Admin | Dynamic Oil Tools" },
];
