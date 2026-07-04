import { Settings } from "lucide-react";

import type { Route } from "./+types/admin.settings";
import { AdminSectionPlaceholderPage } from "@/pages/admin";

export default function AdminSettingsRoute() {
  return (
    <AdminSectionPlaceholderPage
      eyebrow="Settings"
      title="Settings is reserved for future CMS configuration."
      description="Site-wide configuration, capability toggles, and other administration tools can be added here later without changing the protected route structure."
      icon={Settings}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Settings | Admin | Dynamic Oil Tools" },
];
