import { Newspaper } from "lucide-react";

import type { Route } from "./+types/admin.news";
import { AdminSectionPlaceholderPage } from "@/pages/admin";

export default function AdminNewsRoute() {
  return (
    <AdminSectionPlaceholderPage
      eyebrow="News"
      title="News management will plug into this protected shell."
      description="The route, navigation state, and admin UI foundation are already in place, so article workflows can be layered in with the CMS SDK when content management begins."
      icon={Newspaper}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "News | Admin | Dynamic Oil Tools" },
];
