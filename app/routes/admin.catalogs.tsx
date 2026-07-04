import { redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.catalogs";
import { AdminCollectionListPage } from "@/pages/admin/AdminCollectionListPage";
import { defaultLocale } from "@/i18n/config";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { archiveContentEntry } from "@/server/cms/content/service.server";
import { CMS_COLLECTION_ORDER_KEYS } from "@/types/cms-entities";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const { buildAdminCatalogRows } = await import(
    "@/server/cms/content/admin-collection.server"
  );
  const url = new URL(request.url);
  const rows = await buildAdminCatalogRows(defaultLocale, url.searchParams.get("q") ?? "");
  return { q: url.searchParams.get("q") ?? "", status: url.searchParams.get("status") ?? "all", rows };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await requireCmsAuthSession(request, ["editor"]);
  const { duplicateContentEntry, saveCollectionOrder } = await import(
    "@/server/cms/content/entity-content.server"
  );
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");
  if (intent === "reorder") {
    await saveCollectionOrder({
      orderKey: CMS_COLLECTION_ORDER_KEYS.catalog,
      orderedKeys: JSON.parse(String(formData.get("orderedKeys") ?? "[]")) as string[],
      actorId: session.user.id,
    });
    return { ok: true };
  }
  const key = String(formData.get("key") ?? "");
  if (intent === "duplicate" && key) {
    const suffix = `${Date.now()}`;
    await duplicateContentEntry({ sourceKey: key, targetKey: `${key}.copy-${suffix}`, actorId: session.user.id });
    return redirect(`/admin/catalogs/${encodeURIComponent(`${key}.copy-${suffix}`)}`);
  }
  if (intent === "archive" && key) {
    await archiveContentEntry({ key, actorId: session.user.id });
    return redirect("/admin/catalogs");
  }
  return { ok: false };
}

export default function AdminCatalogsRoute() {
  const { q, status, rows } = useLoaderData<typeof loader>();
  return (
    <AdminCollectionListPage
      title="Catalogs"
      description="Manage downloadable catalogs."
      collectionPath="/admin/catalogs"
      searchValue={q}
      searchPlaceholder="Search catalogs"
      addNewHref="/admin/catalogs/new"
      rows={rows}
      statusFilter={status}
      emptyMessage="No catalogs were found."
      editPath={(row) => `/admin/catalogs/${encodeURIComponent(row.cmsKey ?? row.key)}`}
    />
  );
}
