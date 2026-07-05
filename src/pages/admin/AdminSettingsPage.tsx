import { useMemo, useState } from "react";

import {
  AdminField,
  AdminFieldGroup,
  AdminInput,
  AdminTextarea,
} from "@/components/admin/collection/AdminEntityFormFields";
import { AdminMediaPicker } from "@/components/admin/collection/AdminMediaPicker";
import { AdminSaveDialog } from "@/components/admin/collection/AdminSaveDialog";
import { AdminSurface } from "@/components/admin";
import type { CmsSiteSettingsPayload } from "@/types/cms-site-settings";
import { cmsClient, CmsApiError } from "@/sdk/cms";

export function AdminSettingsPage({
  initialPayload,
  initialStatus,
}: {
  initialPayload: CmsSiteSettingsPayload;
  initialStatus: string;
}) {
  const [payload, setPayload] = useState(initialPayload);
  const [savedPayload, setSavedPayload] = useState(initialPayload);
  const [status, setStatus] = useState(initialStatus);
  const [busy, setBusy] = useState<"save" | "publish" | null>(null);
  const [pendingAction, setPendingAction] = useState<"draft" | "publish" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isDirty = JSON.stringify(payload) !== JSON.stringify(savedPayload);

  async function persist(publish: boolean, changeSummary: string) {
    try {
      setBusy(publish ? "publish" : "save");
      setError(null);
      const action = publish ? cmsClient.content.publish : cmsClient.content.saveDraft;
      const result = await action({
        key: "site.settings",
        type: "site",
        payload,
        changeSummary,
      });
      setStatus(result.entry.status);
      setSavedPayload(payload);
      setPendingAction(null);
    } catch (cause) {
      setError(cause instanceof CmsApiError ? cause.message : "Unable to save settings.");
    } finally {
      setBusy(null);
    }
  }

  const statusLabel = useMemo(() => status, [status]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-medium text-[#111]">Company Settings</h2>
          <p className="mt-1 text-sm text-[#666]">
            Status: {statusLabel}
            {isDirty ? (
              <span className="ml-2 rounded bg-[#fff7ed] px-2 py-0.5 text-xs font-medium text-[var(--dot-orange)]">
                Unsaved changes
              </span>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={Boolean(busy) || !isDirty}
            className="rounded-md border border-[#e5e5e5] bg-white px-4 py-2 text-sm text-[#333] disabled:opacity-60"
            onClick={() => setPendingAction("draft")}
          >
            Save Draft
          </button>
          <button
            type="button"
            disabled={Boolean(busy) || !isDirty}
            className="rounded-md bg-[var(--dot-orange)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            onClick={() => setPendingAction("publish")}
          >
            Publish
          </button>
        </div>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <AdminSurface contentClassName="space-y-5">
        <AdminFieldGroup title="Company">
          <div className="grid gap-4 lg:grid-cols-2">
            <AdminField label="Company Name">
              <AdminInput
                value={payload.companyName}
                onChange={(event) =>
                  setPayload((current) => ({ ...current, companyName: event.target.value }))
                }
              />
            </AdminField>
            <AdminField label="Legal Name">
              <AdminInput
                value={payload.legalName}
                onChange={(event) =>
                  setPayload((current) => ({ ...current, legalName: event.target.value }))
                }
              />
            </AdminField>
          </div>
          <AdminField label="Tagline">
            <AdminInput
              value={payload.tagline}
              onChange={(event) =>
                setPayload((current) => ({ ...current, tagline: event.target.value }))
              }
            />
          </AdminField>
          <AdminField label="Description">
            <AdminTextarea
              rows={3}
              value={payload.description}
              onChange={(event) =>
                setPayload((current) => ({ ...current, description: event.target.value }))
              }
            />
          </AdminField>
        </AdminFieldGroup>

        <AdminFieldGroup title="Logos">
          <AdminMediaPicker
            label="Primary Logo"
            value={payload.logos.dot}
            onChange={(dot) =>
              setPayload((current) => ({
                ...current,
                logos: { ...current.logos, dot },
              }))
            }
          />
          <AdminMediaPicker
            label="Saudi Made Logo"
            value={payload.logos.saudiMade}
            onChange={(saudiMade) =>
              setPayload((current) => ({
                ...current,
                logos: { ...current.logos, saudiMade },
              }))
            }
          />
        </AdminFieldGroup>

        <AdminFieldGroup title="Contact">
          <div className="grid gap-4 lg:grid-cols-2">
            <AdminField label="Email">
              <AdminInput
                value={payload.contact.email}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    contact: { ...current.contact, email: event.target.value },
                  }))
                }
              />
            </AdminField>
            <AdminField label="Phone">
              <AdminInput
                value={payload.contact.phone}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    contact: { ...current.contact, phone: event.target.value },
                  }))
                }
              />
            </AdminField>
          </div>
          <AdminField label="HR / Careers Email">
            <AdminInput
              type="email"
              value={payload.contact.hrEmail ?? ""}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  contact: { ...current.contact, hrEmail: event.target.value },
                }))
              }
              placeholder="e.g. careers@company.com"
            />
          </AdminField>
          <p className="text-sm text-[#888]">
            Job applications from careers pages use the HR / Careers email. If empty, the main
            contact email is used.
          </p>
          <AdminField label="Address">
            <AdminInput
              value={payload.contact.address}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  contact: { ...current.contact, address: event.target.value },
                }))
              }
            />
          </AdminField>
          <div className="grid gap-4 lg:grid-cols-2">
            <AdminField label="City">
              <AdminInput
                value={payload.contact.city}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    contact: { ...current.contact, city: event.target.value },
                  }))
                }
              />
            </AdminField>
            <AdminField label="Country">
              <AdminInput
                value={payload.contact.country}
                onChange={(event) =>
                  setPayload((current) => ({
                    ...current,
                    contact: { ...current.contact, country: event.target.value },
                  }))
                }
              />
            </AdminField>
          </div>
        </AdminFieldGroup>

        <AdminFieldGroup title="Social">
          <AdminField label="LinkedIn URL">
            <AdminInput
              value={payload.social.linkedin ?? ""}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  social: { ...current.social, linkedin: event.target.value },
                }))
              }
            />
          </AdminField>
        </AdminFieldGroup>
      </AdminSurface>

      <AdminSaveDialog
        open={pendingAction !== null}
        action={pendingAction ?? "draft"}
        onClose={() => {
          if (!busy) setPendingAction(null);
        }}
        onConfirm={(changeSummary) => void persist(pendingAction === "publish", changeSummary)}
        isSubmitting={Boolean(busy)}
      />
    </div>
  );
}
