import { redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.partners.$key";
import { AdminPartnerEditorPage } from "@/pages/admin/AdminPartnerEditorPage";
import { defaultLocale } from "@/i18n/config";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { getContentEntryByKey } from "@/server/cms/content/service.server";
import type { CmsPartnerPayload } from "@/types/cms-entities";
import { buildEntityKey, parseEntityId } from "@/types/cms-entities";

export async function loader({ request, params }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const key = decodeURIComponent(params.key);

  try {
    const detail = await getContentEntryByKey(key);
    return {
      contentKey: key,
      payload: (detail.entry.currentVersion?.payload ??
        detail.publishedVersion?.payload) as CmsPartnerPayload,
      status: detail.entry.status,
    };
  } catch {
    const { getStaticPartnerPayload } = await import(
      "@/server/cms/content/entity-content.server"
    );
    const id = parseEntityId("partner", key) ?? key.replace(/^partner\./, "");
    const staticPayload = await getStaticPartnerPayload(id);
    if (!staticPayload) throw redirect("/admin/partners");

    return {
      contentKey: buildEntityKey("partner", id),
      payload: staticPayload,
      status: "static",
    };
  }
}

export default function AdminPartnerEditRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <AdminPartnerEditorPage
      contentKey={data.contentKey}
      initialPayload={data.payload}
      initialStatus={data.status}
      locale={defaultLocale}
      backTo="/admin/partners"
    />
  );
}
