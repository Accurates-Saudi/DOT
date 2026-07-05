import { useLoaderData, useRouteLoaderData } from "react-router";

import type { Route } from "./+types/admin.settings";
import { AdminSettingsPage } from "@/pages/admin/AdminSettingsPage";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import {
  CMS_SITE_SETTINGS_KEY,
  getDefaultSiteSettingsPayload,
  getPublishedSiteSettings,
} from "@/server/cms/content/site-settings.server";
import { getContentEntryByKey } from "@/server/cms/content/service.server";
import type { loader as adminLoader } from "./admin";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);

  try {
    const detail = await getContentEntryByKey(CMS_SITE_SETTINGS_KEY);
    const payload =
      (detail.entry.currentVersion?.payload as ReturnType<typeof getDefaultSiteSettingsPayload>) ??
      (await getPublishedSiteSettings());

    return {
      payload,
      status: detail.entry.status,
    };
  } catch {
    return {
      payload: getDefaultSiteSettingsPayload(),
      status: "static",
    };
  }
}

export default function AdminSettingsRoute() {
  useRouteLoaderData<typeof adminLoader>("routes/admin");
  const data = useLoaderData<typeof loader>();

  return (
    <AdminSettingsPage initialPayload={data.payload} initialStatus={data.status} />
  );
}

export const meta: Route.MetaFunction = () => [
  { title: "Settings | Admin | Dynamic Oil Tools" },
];
