import { redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.careers.$key";
import { AdminCareerEditorPage } from "@/pages/admin/AdminCareerEditorPage";
import { defaultLocale } from "@/i18n/config";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { getContentEntryByKey } from "@/server/cms/content/service.server";
import type { CmsCareerPayload } from "@/types/cms-entities";
import { buildEntityKey, parseEntityId } from "@/types/cms-entities";

export async function loader({ request, params }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const key = decodeURIComponent(params.key);

  try {
    const detail = await getContentEntryByKey(key);
    const payload = (detail.entry.currentVersion?.payload ??
      detail.publishedVersion?.payload) as CmsCareerPayload;

    return {
      contentKey: key,
      slug: detail.entry.slug ?? parseEntityId("career", key) ?? key,
      payload,
      status: detail.entry.status,
    };
  } catch {
    const { getStaticCareerPayload } = await import(
      "@/server/cms/content/entity-content.server"
    );
    const slug = parseEntityId("career", key) ?? key.replace(/^career\./, "");
    const staticPayload = await getStaticCareerPayload(slug);
    if (!staticPayload) throw redirect("/admin/careers");

    return {
      contentKey: buildEntityKey("career", slug),
      slug,
      payload: staticPayload,
      status: "static",
    };
  }
}

export default function AdminCareerEditRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <AdminCareerEditorPage
      contentKey={data.contentKey}
      slug={data.slug}
      initialPayload={data.payload}
      initialStatus={data.status}
      locale={defaultLocale}
      backTo="/admin/careers"
    />
  );
}
