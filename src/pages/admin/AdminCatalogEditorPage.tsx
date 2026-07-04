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
import type { CmsCatalogEntity, CmsCatalogPayload } from "@/types/cms-entities";
import { getLocalizedPayload } from "@/utils/cms-entities";
import { cmsClient, CmsApiError } from "@/sdk/cms";

export function AdminCatalogEditorPage({
  contentKey,
  initialPayload,
  initialStatus,
  locale,
  backTo,
}: {
  contentKey: string;
  initialPayload: CmsCatalogPayload;
  initialStatus: string;
  locale: Locale;
  backTo: string;
}) {
  const [payload, setPayload] = useState(initialPayload);
  const [savedPayload, setSavedPayload] = useState(initialPayload);
  const [status, setStatus] = useState(initialStatus);
  const [activeLocale, setActiveLocale] = useState<Locale>(locale);
  const [busy, setBusy] = useState<"save" | "publish" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const item = useMemo(
    () => getLocalizedPayload<CmsCatalogEntity>(payload, activeLocale),
    [payload, activeLocale],
  );

  function updateItem(updater: (current: CmsCatalogEntity) => CmsCatalogEntity) {
    setPayload((current) => {
      const localized = getLocalizedPayload<CmsCatalogEntity>(current, activeLocale);
      if (!localized) return current;
      return { ...current, locales: { ...current.locales, [activeLocale]: updater(localized) } };
    });
  }

  const isDirty =
    status === "static" ||
    JSON.stringify(payload) !== JSON.stringify(savedPayload);

  async function persist(publish: boolean, changeSummary: string) {
    try {
      setBusy(publish ? "publish" : "save");
      setError(null);
      const action = publish ? cmsClient.content.publish : cmsClient.content.saveDraft;
      const result = await action({
        key: contentKey,
        type: "page",
        payload,
        changeSummary,
      });
      setStatus(result.entry.status);
      setSavedPayload(payload);
    } catch (cause) {
      setError(cause instanceof CmsApiError ? cause.message : "Unable to save catalog.");
    } finally {
      setBusy(null);
    }
  }

  if (!item) return null;

  return (
    <AdminEntityEditorShell
      backTo={backTo}
      title={item.title || "Catalog"}
      statusLabel={status}
      isDirty={isDirty}
      isSaving={busy === "save"}
      isPublishing={busy === "publish"}
      onSaveDraft={(changeSummary) => persist(false, changeSummary)}
      onPublish={(changeSummary) => persist(true, changeSummary)}
    >
      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
      <div className="mb-4 flex gap-2">
        {(["en", "ar"] as const).map((option) => (
          <button key={option} type="button" className={activeLocale === option ? "rounded-md bg-[var(--dot-orange)] px-3 py-1.5 text-sm text-white" : "rounded-md border border-[#e5e5e5] px-3 py-1.5 text-sm text-[#333]"} onClick={() => setActiveLocale(option)}>
            {option.toUpperCase()}
          </button>
        ))}
      </div>
      <AdminFieldGroup title="Catalog">
        <AdminField label="Title">
          <AdminInput value={item.title} onChange={(e) => updateItem((c) => ({ ...c, title: e.target.value }))} />
        </AdminField>
        <AdminField label="Category">
          <AdminInput value={item.category ?? ""} onChange={(e) => updateItem((c) => ({ ...c, category: e.target.value }))} />
        </AdminField>
        <AdminField label="Description">
          <AdminTextarea rows={4} value={item.description} onChange={(e) => updateItem((c) => ({ ...c, description: e.target.value }))} />
        </AdminField>
        <AdminMediaPicker label="Thumbnail" value={item.cover} onChange={(cover) => updateItem((c) => ({ ...c, cover }))} />
        <AdminField label="PDF URL">
          <AdminInput value={item.pdf?.href ?? ""} onChange={(e) => updateItem((c) => ({ ...c, pdf: { href: e.target.value, fileName: c.pdf?.fileName } }))} />
        </AdminField>
      </AdminFieldGroup>
    </AdminEntityEditorShell>
  );
}
