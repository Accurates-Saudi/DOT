import { useRouteLoaderData } from "react-router";

import type { Route } from "./+types/admin._index";
import { AdminDashboardPage } from "@/pages/admin";
import type { loader as adminLoader } from "./admin";

export default function AdminDashboardIndexRoute() {
  const adminData = useRouteLoaderData<typeof adminLoader>("routes/admin");

  return <AdminDashboardPage userRole={adminData?.session.user.role ?? "editor"} />;
}

export const meta: Route.MetaFunction = () => [
  { title: "Admin Dashboard | Dynamic Oil Tools" },
];
