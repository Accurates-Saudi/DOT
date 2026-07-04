import { Award } from "lucide-react";

import type { Route } from "./+types/admin.certificates";
import { AdminSectionPlaceholderPage } from "@/pages/admin";

export default function AdminCertificatesRoute() {
  return (
    <AdminSectionPlaceholderPage
      eyebrow="Certificates"
      title="Certificates can be managed here in a later phase."
      description="This section is intentionally limited to the shell for now, giving you a branded protected route that is ready for future certificate content and media workflows."
      icon={Award}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Certificates | Admin | Dynamic Oil Tools" },
];
