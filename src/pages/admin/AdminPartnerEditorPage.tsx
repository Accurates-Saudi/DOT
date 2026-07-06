import { useEffect, useMemo, useState } from "react";

import { ClientLogo } from "@/components/sections/trusted-partners/ClientLogo";
import { AdminEntityEditorShell } from "@/components/admin/collection/AdminEntityEditorShell";
import {
  AdminField,
  AdminFieldGroup,
  AdminInput,
} from "@/components/admin/collection/AdminEntityFormFields";
import { AdminMediaPicker } from "@/components/admin/collection/AdminMediaPicker";
import { useAdminWorkspace } from "@/contexts/admin-workspace-context";
import type { Locale } from "@/i18n/config";
import type { CmsPartnerPayload } from "@/types/cms-entities";
import type { ClientLogoItem } from "@/types";
import { getLocalizedPayload } from "@/utils/cms-entities";
import { cmsClient, CmsApiError } from "@/sdk/cms";

export function AdminPartnerEditorPage({
  contentKey,
  initialPayload,
  initialStatus,
  locale,
  backTo,
}: {
  contentKey: string;
  initialPayload: CmsPartnerPayload;
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
  const { registerPreview } = useAdminWorkspace();

  const item = useMemo(
    () => getLocalizedPayload<ClientLogoItem>(payload, activeLocale),
    [payload, activeLocale],
  );

  const isDirty =
    status === "static" ||
    JSON.stringify(payload) !== JSON.stringify(savedPayload);

  useEffect(() => {
    if (!item?.logo?.src) {
      registerPreview(null);
      return;
    }

    registerPreview({
      locale: activeLocale,
      title: `${item.name || "Partner"} Preview`,
      render: () => (
        <div className="flex min-h-[240px] items-center justify-center bg-[#f9f8f7] p-10">
          <ClientLogo item={item} />
        </div>
      ),
    });

    return () => registerPreview(null);
  }, [activeLocale, item, registerPreview]);

  function updateItem(updater: (current: ClientLogoItem) => ClientLogoItem) {
    setPayload((current) => {
      const localized = getLocalizedPayload<ClientLogoItem>(current, activeLocale);
      if (!localized) return current;
      return {
        ...current,
        locales: { ...current.locales, [activeLocale]: updater(localized) },
      };
    });
  }

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
      setError(cause instanceof CmsApiError ? cause.message : "Unable to save partner logo.");
    } finally {
      setBusy(null);
    }
  }

  if (!item) return null;

  return (
    <AdminEntityEditorShell
      backTo={backTo}
      title={item.name || item.logo.alt || "Partner Logo"}
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
      <AdminFieldGroup
        title="Partner Logo"
        description="Logos appear in the Trusted by Industry Leaders marquee on the home page."
      >
        <AdminField label="Brand name">
          <AdminInput
            value={item.name}
            onChange={(event) =>
              updateItem((current) => ({
                ...current,
                name: event.target.value,
                logo: {
                  ...current.logo,
                  alt: event.target.value || current.logo.alt,
                },
              }))
            }
            placeholder="Company name"
          />
        </AdminField>
        <AdminMediaPicker
          label="Logo image"
          value={item.logo}
          onChange={(logo) =>
            updateItem((current) => ({
              ...current,
              logo: {
                ...logo,
                alt: logo.alt || current.name || current.logo.alt,
              },
            }))
          }
        />
        <AdminField label="Website URL (optional)">
          <AdminInput
            value={item.href ?? ""}
            onChange={(event) =>
              updateItem((current) => ({
                ...current,
                href: event.target.value.trim() || undefined,
              }))
            }
            placeholder="https://example.com"
          />
        </AdminField>
      </AdminFieldGroup>
    </AdminEntityEditorShell>
  );
}
