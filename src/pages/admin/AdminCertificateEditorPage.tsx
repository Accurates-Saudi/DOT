import { useMemo, useState } from "react";

import { AdminEntityEditorShell } from "@/components/admin/collection/AdminEntityEditorShell";
import {
  AdminField,
  AdminFieldGroup,
  AdminInput,
  AdminTextarea,
} from "@/components/admin/collection/AdminEntityFormFields";
import { AdminMediaPicker } from "@/components/admin/collection/AdminMediaPicker";
import type { Locale } from "@/i18n/config";
import type { CmsCertificateEntity, CmsCertificatePayload } from "@/types/cms-entities";
import { getLocalizedPayload } from "@/utils/cms-entities";
import { cmsClient, CmsApiError } from "@/sdk/cms";

export function AdminCertificateEditorPage({
  contentKey,
  initialPayload,
  initialStatus,
  locale,
  backTo,
}: {
  contentKey: string;
  initialPayload: CmsCertificatePayload;
  initialStatus: string;
  locale: Locale;
  backTo: string;
}) {
  const [payload, setPayload] = useState(initialPayload);
  const [status, setStatus] = useState(initialStatus);
  const [activeLocale, setActiveLocale] = useState<Locale>(locale);
  const [busy, setBusy] = useState<"save" | "publish" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const item = useMemo(
    () => getLocalizedPayload<CmsCertificateEntity>(payload, activeLocale),
    [payload, activeLocale],
  );

  function updateItem(updater: (current: CmsCertificateEntity) => CmsCertificateEntity) {
    setPayload((current) => {
      const localized = getLocalizedPayload<CmsCertificateEntity>(current, activeLocale);
      if (!localized) return current;
      return { ...current, locales: { ...current.locales, [activeLocale]: updater(localized) } };
    });
  }

  async function persist(publish: boolean) {
    try {
      setBusy(publish ? "publish" : "save");
      setError(null);
      const action = publish ? cmsClient.content.publish : cmsClient.content.saveDraft;
      const result = await action({
        key: contentKey,
        type: "certificate",
        payload,
        changeSummary: publish ? "Published certificate" : "Saved certificate draft",
      });
      setStatus(result.entry.status);
    } catch (cause) {
      setError(cause instanceof CmsApiError ? cause.message : "Unable to save certificate.");
    } finally {
      setBusy(null);
    }
  }

  if (!item) return null;

  return (
    <AdminEntityEditorShell
      backTo={backTo}
      title={item.title || "Certificate"}
      statusLabel={status}
      previewOpen={false}
      onPreviewToggle={() => undefined}
      isSaving={busy === "save"}
      isPublishing={busy === "publish"}
      onSaveDraft={() => void persist(false)}
      onPublish={() => void persist(true)}
      previewPanel={null}
    >
      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
      <div className="mb-4 flex gap-2">
        {(["en", "ar"] as const).map((option) => (
          <button key={option} type="button" className={activeLocale === option ? "rounded-md bg-[var(--dot-orange)] px-3 py-1.5 text-sm text-white" : "rounded-md border border-[#e5e5e5] px-3 py-1.5 text-sm text-[#333]"} onClick={() => setActiveLocale(option)}>
            {option.toUpperCase()}
          </button>
        ))}
      </div>
      <AdminFieldGroup title="Certificate">
        <AdminField label="Title">
          <AdminInput value={item.title ?? ""} onChange={(e) => updateItem((c) => ({ ...c, title: e.target.value }))} />
        </AdminField>
        <AdminField label="Description">
          <AdminTextarea rows={3} value={item.description ?? ""} onChange={(e) => updateItem((c) => ({ ...c, description: e.target.value }))} />
        </AdminField>
        <AdminMediaPicker label="Image" value={item.image} onChange={(image) => updateItem((c) => ({ ...c, image }))} />
      </AdminFieldGroup>
    </AdminEntityEditorShell>
  );
}
