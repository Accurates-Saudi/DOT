import { redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.news";
import { AdminCollectionListPage } from "@/pages/admin/AdminCollectionListPage";
import { defaultLocale } from "@/i18n/config";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { archiveContentEntry } from "@/server/cms/content/service.server";
import { CMS_COLLECTION_ORDER_KEYS } from "@/types/cms-entities";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const { buildAdminNewsRows } = await import(
    "@/server/cms/content/admin-collection.server"
  );
  const url = new URL(request.url);
  const rows = await buildAdminNewsRows(defaultLocale, url.searchParams.get("q") ?? "");
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
      orderKey: CMS_COLLECTION_ORDER_KEYS.news,
      orderedKeys: JSON.parse(String(formData.get("orderedKeys") ?? "[]")) as string[],
      actorId: session.user.id,
    });
    return { ok: true };
  }

  const key = String(formData.get("key") ?? "");
  if (intent === "duplicate" && key) {
    const suffix = `${Date.now()}`;
    await duplicateContentEntry({
      sourceKey: key,
      targetKey: `${key}.copy-${suffix}`,
      actorId: session.user.id,
      slug: `${key.split(".").pop()}-copy-${suffix}`,
    });
    return redirect(`/admin/news/${encodeURIComponent(`${key}.copy-${suffix}`)}`);
  }
  if (intent === "archive" && key) {
    await archiveContentEntry({ key, actorId: session.user.id });
    return redirect("/admin/news");
  }
  return { ok: false };
}

export default function AdminNewsRoute() {
  const { q, status, rows } = useLoaderData<typeof loader>();
  return (
    <AdminCollectionListPage
      title="News"
      description="Manage news articles. Order matches the public website."
      collectionPath="/admin/news"
      searchValue={q}
      searchPlaceholder="Search news by key or slug"
      addNewHref="/admin/news/new"
      rows={rows}
      statusFilter={status}
      emptyMessage="No news articles were found."
      editPath={(row) => `/admin/news/${encodeURIComponent(row.cmsKey ?? row.key)}`}
    />
  );
}

export const meta: Route.MetaFunction = () => [{ title: "News | Admin | Dynamic Oil Tools" }];
