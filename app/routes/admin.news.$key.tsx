import { redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.news.$key";
import { AdminNewsEditorPage } from "@/pages/admin/AdminNewsEditorPage";
import { defaultLocale } from "@/i18n/config";
import { createDefaultNewsPayload, getStaticNewsPayload } from "@/server/cms/content/entity-content.server";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { getContentEntryByKey } from "@/server/cms/content/service.server";
import type { CmsNewsPayload } from "@/types/cms-entities";
import { buildEntityKey, parseEntityId } from "@/types/cms-entities";

export async function loader({ request, params }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const key = decodeURIComponent(params.key);
  try {
    const detail = await getContentEntryByKey(key);
    const payload = (detail.entry.currentVersion?.payload ?? detail.publishedVersion?.payload) as CmsNewsPayload;
    return {
      contentKey: key,
      slug: detail.entry.slug ?? parseEntityId("news", key) ?? key,
      payload,
      status: detail.entry.status,
    };
  } catch {
    const slug = parseEntityId("news", key) ?? key.replace(/^news\./, "");
    const staticPayload = await getStaticNewsPayload(slug);
    if (!staticPayload) throw redirect("/admin/news");
    return {
      contentKey: buildEntityKey("news", slug),
      slug,
      payload: staticPayload,
      status: "static",
    };
  }
}

export default function AdminNewsEditRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <AdminNewsEditorPage
      contentKey={data.contentKey}
      slug={data.slug}
      initialPayload={data.payload}
      initialStatus={data.status}
      locale={defaultLocale}
      backTo="/admin/news"
    />
  );
}
