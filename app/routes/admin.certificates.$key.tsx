import { redirect, useLoaderData } from "react-router";

import type { Route } from "./+types/admin.certificates.$key";
import { AdminCertificateEditorPage } from "@/pages/admin/AdminCertificateEditorPage";
import { defaultLocale } from "@/i18n/config";
import { createDefaultCertificatePayload } from "@/server/cms/content/entity-content.server";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { getContentEntryByKey } from "@/server/cms/content/service.server";
import type { CmsCertificatePayload } from "@/types/cms-entities";

export async function loader({ request, params }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const key = decodeURIComponent(params.key);
  try {
    const detail = await getContentEntryByKey(key);
    return {
      contentKey: key,
      payload: (detail.entry.currentVersion?.payload ?? detail.publishedVersion?.payload) as CmsCertificatePayload,
      status: detail.entry.status,
    };
  } catch {
    throw redirect("/admin/certificates");
  }
}

export default function AdminCertificateEditRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <AdminCertificateEditorPage
      contentKey={data.contentKey}
      initialPayload={data.payload}
      initialStatus={data.status}
      locale={defaultLocale}
      backTo="/admin/certificates"
    />
  );
}
