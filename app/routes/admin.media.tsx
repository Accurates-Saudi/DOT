import { Images } from "lucide-react";

import type { Route } from "./+types/admin.media";
import { AdminSectionPlaceholderPage } from "@/pages/admin";

export default function AdminMediaRoute() {
  return (
    <AdminSectionPlaceholderPage
      eyebrow="Media Library"
      title="The media manager belongs at the center of website operations."
      description="This section is reserved for upload, replacement, preview, search, usage visibility, and URL-based asset workflows that stay connected through media IDs."
      icon={Images}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Media Library | Admin | Dynamic Oil Tools" },
];
