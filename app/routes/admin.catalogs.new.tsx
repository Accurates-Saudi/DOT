import { useLoaderData } from "react-router";

import type { Route } from "./+types/admin.catalogs.new";
import { AdminCatalogEditorPage } from "@/pages/admin/AdminCatalogEditorPage";
import { defaultLocale } from "@/i18n/config";
import { createDefaultCatalogPayload } from "@/server/cms/content/entity-content.server";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { buildEntityKey } from "@/types/cms-entities";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const id = `catalog-${Date.now()}`;
  return {
    contentKey: buildEntityKey("catalog", id),
    payload: createDefaultCatalogPayload(id),
    status: "draft",
  };
}

export default function AdminCatalogNewRoute() {
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
