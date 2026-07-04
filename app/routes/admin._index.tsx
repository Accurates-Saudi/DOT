import { useLoaderData, useRouteLoaderData } from "react-router";

import type { Route } from "./+types/admin._index";
import { AdminDashboardPage } from "@/pages/admin";
import { defaultLocale } from "@/i18n/config";
import {
  getAdminDashboardCounts,
  getAdminRecentUpdates,
  listAdminDraftItems,
} from "@/server/cms/content/admin-dashboard.server";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import type { loader as adminLoader } from "./admin";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);

  const [counts, recentUpdates, drafts] = await Promise.all([
    getAdminDashboardCounts(defaultLocale),
    getAdminRecentUpdates(defaultLocale, 8),
    listAdminDraftItems(defaultLocale),
  ]);

  return {
    counts,
    recentUpdates,
    draftCount: drafts.length,
  };
}

export default function AdminDashboardIndexRoute() {
  const adminData = useRouteLoaderData<typeof adminLoader>("routes/admin");
  const data = useLoaderData<typeof loader>();

  return (
    <AdminDashboardPage
      userName={adminData?.session.user.name ?? "CMS User"}
      userRole={adminData?.session.user.role ?? "editor"}
      counts={data.counts}
      recentUpdates={data.recentUpdates}
      draftCount={data.draftCount}
    />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Admin Dashboard | Dynamic Oil Tools" },
];
