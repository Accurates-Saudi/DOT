import { useMemo, useState } from "react";

import { AdminEntityEditorShell } from "@/components/admin/collection/AdminEntityEditorShell";
import {
  AdminField,
  AdminFieldGroup,
  AdminInput,
  AdminTextarea,
} from "@/components/admin/collection/AdminEntityFormFields";
import { AdminMediaPicker } from "@/components/admin/collection/AdminMediaPicker";
import { AdminPdfPicker } from "@/components/admin/collection/AdminPdfPicker";
import type { Locale } from "@/i18n/config";
import type { CmsCatalogPayload } from "@/types/cms-entities";
import type { CatalogItem } from "@/types";
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
    () => getLocalizedPayload<CatalogItem>(payload, activeLocale),
    [payload, activeLocale],
  );

  function updateItem(updater: (current: CatalogItem) => CatalogItem) {
    setPayload((current) => {
      const localized = getLocalizedPayload<CatalogItem>(current, activeLocale);
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
          <button
            key={option}
            type="button"
            className={
              activeLocale === option
                ? "rounded-md bg-[var(--dot-orange)] px-3 py-1.5 text-sm text-white"
                : "rounded-md border border-[#e5e5e5] px-3 py-1.5 text-sm text-[#333]"
            }
            onClick={() => setActiveLocale(option)}
          >
            {option.toUpperCase()}
          </button>
        ))}
      </div>
      <AdminFieldGroup title="Catalog">
        <AdminField label="Title">
          <AdminInput
            value={item.title}
            onChange={(event) => updateItem((current) => ({ ...current, title: event.target.value }))}
          />
        </AdminField>
        <AdminField label="Description">
          <AdminTextarea
            rows={4}
            value={item.description}
            onChange={(event) =>
              updateItem((current) => ({ ...current, description: event.target.value }))
            }
          />
        </AdminField>
        <AdminMediaPicker
          label="Cover Image"
          value={item.cover}
          onChange={(cover) => updateItem((current) => ({ ...current, cover }))}
        />
        <AdminPdfPicker
          label="Download Link"
          value={item.pdf}
          keyHint={contentKey.replace(/[^a-zA-Z0-9]+/g, "-")}
          onChange={(pdf) => updateItem((current) => ({ ...current, pdf }))}
        />
      </AdminFieldGroup>
    </AdminEntityEditorShell>
  );
}
