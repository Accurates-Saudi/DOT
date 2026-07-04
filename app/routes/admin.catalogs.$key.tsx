import { redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.catalogs.$key";
import { AdminCatalogEditorPage } from "@/pages/admin/AdminCatalogEditorPage";
import { defaultLocale } from "@/i18n/config";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { getContentEntryByKey } from "@/server/cms/content/service.server";
import type { CmsCatalogPayload } from "@/types/cms-entities";

export async function loader({ request, params }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const key = decodeURIComponent(params.key);
  try {
    const detail = await getContentEntryByKey(key);
    return {
      contentKey: key,
      payload: (detail.entry.currentVersion?.payload ?? detail.publishedVersion?.payload) as CmsCatalogPayload,
      status: detail.entry.status,
    };
  } catch {
    throw redirect("/admin/catalogs");
  }
}

export default function AdminCatalogEditRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <AdminCatalogEditorPage
      contentKey={data.contentKey}
      initialPayload={data.payload}
      initialStatus={data.status}
      locale={defaultLocale}
      backTo="/admin/catalogs"
    />
  );
}
