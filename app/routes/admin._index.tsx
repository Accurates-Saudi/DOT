import type { Route } from "./+types/admin._index";
import { AdminDashboardPage } from "@/pages/admin";

export default function AdminDashboardIndexRoute() {
  return <AdminDashboardPage />;
}

export const meta: Route.MetaFunction = () => [
  { title: "Admin Dashboard | Dynamic Oil Tools" },
];
