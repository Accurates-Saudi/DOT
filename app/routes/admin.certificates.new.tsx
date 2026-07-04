import { useLoaderData } from "react-router";

import type { Route } from "./+types/admin.certificates.new";
import { AdminCertificateEditorPage } from "@/pages/admin/AdminCertificateEditorPage";
import { defaultLocale } from "@/i18n/config";
import { requireCmsAuthSession } from "@/server/cms/auth/service.server";
import { createDefaultCertificatePayload } from "@/utils/cms-entity-defaults";
import { buildEntityKey } from "@/types/cms-entities";

export async function loader({ request }: Route.LoaderArgs) {
  await requireCmsAuthSession(request, ["editor"]);
  const id = `certificate-${Date.now()}`;
  return {
    contentKey: buildEntityKey("certificate", id),
    payload: createDefaultCertificatePayload(id),
    status: "draft",
  };
}

export default function AdminCertificateNewRoute() {
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
