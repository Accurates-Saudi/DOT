import { useEffect, useMemo, useState, type ReactNode } from "react";
import { FileText } from "lucide-react";

import { AdminPreviewFrame } from "@/components/admin/collection/AdminPreviewFrame";
import { CareerDetailView } from "@/components/careers/CareerDetailView";
import { AdminEntityEditorShell } from "@/components/admin/collection/AdminEntityEditorShell";
import {
  AdminField,
  AdminFieldGroup,
  AdminInput,
  AdminStringListEditor,
  AdminTextarea,
} from "@/components/admin/collection/AdminEntityFormFields";
import { useAdminWorkspace } from "@/contexts/admin-workspace-context";
import { CmsExperienceProvider } from "@/contexts/cms-experience-context";
import { localeContentMessages } from "@/content/shared";
import { buildCareersContent } from "@/i18n/content";
import type { Locale } from "@/i18n/config";
import type { CmsCareerPayload } from "@/types/cms-entities";
import type { CareerJobDetail } from "@/types";
import { getLocalizedPayload } from "@/utils/cms-entities";
import { createCareerTemplatePayload } from "@/utils/cms-entity-defaults";
import { cmsClient, CmsApiError } from "@/sdk/cms";

function CareerJobPreview({
  job,
  locale,
  detailHero,
  detailSidebar,
}: {
  job: CareerJobDetail;
  locale: Locale;
  detailHero: ReturnType<typeof buildCareersContent>["detailHero"];
  detailSidebar: ReturnType<typeof buildCareersContent>["detailSidebar"];
}): ReactNode {
  return (
    <CmsExperienceProvider session={null}>
      <AdminPreviewFrame locale={locale}>
        <CareerDetailView job={job} detailHero={detailHero} detailSidebar={detailSidebar} />
      </AdminPreviewFrame>
    </CmsExperienceProvider>
  );
}

interface AdminCareerEditorPageProps {
  contentKey: string;
  slug: string;
  initialPayload: CmsCareerPayload;
  initialStatus: string;
  locale: Locale;
  backTo: string;
}

export function AdminCareerEditorPage({
  contentKey,
  slug,
  initialPayload,
  initialStatus,
  locale,
  backTo,
}: AdminCareerEditorPageProps) {
  const [payload, setPayload] = useState(initialPayload);
  const [savedPayload, setSavedPayload] = useState(initialPayload);
  const [status, setStatus] = useState(initialStatus);
  const [activeLocale, setActiveLocale] = useState<Locale>(locale);
  const [busy, setBusy] = useState<"save" | "publish" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { registerPreview } = useAdminWorkspace();

  const job = useMemo(
    () => getLocalizedPayload<CareerJobDetail>(payload, activeLocale),
    [payload, activeLocale],
  );

  const careersPageContent = useMemo(
    () => buildCareersContent(localeContentMessages[activeLocale], activeLocale),
    [activeLocale],
  );

  const isActive = payload.isActive !== false;

  const isDirty =
    status === "static" ||
    JSON.stringify(payload) !== JSON.stringify(savedPayload);

  const previewTitle = `${job?.title || "Job"} Preview`;

  useEffect(() => {
    if (!job) {
      registerPreview(null);
      return;
    }

    registerPreview({
      locale: activeLocale,
      title: previewTitle,
      render: () => (
        <CareerJobPreview
          job={job}
          locale={activeLocale}
          detailHero={careersPageContent.detailHero}
          detailSidebar={careersPageContent.detailSidebar}
        />
      ),
    });

    return () => registerPreview(null);
  }, [activeLocale, careersPageContent, job, previewTitle, registerPreview]);

  function updateJob(updater: (current: CareerJobDetail) => CareerJobDetail) {
    setPayload((current) => {
      const localized = getLocalizedPayload<CareerJobDetail>(current, activeLocale);
      if (!localized) return current;
      return {
        ...current,
        locales: { ...current.locales, [activeLocale]: updater(localized) },
      };
    });
  }

  function loadTemplate() {
    if (
      isDirty &&
      !window.confirm("Replace the current content with the starter template?")
    ) {
      return;
    }

    const template = createCareerTemplatePayload(slug);
    setPayload((current) => ({
      ...template,
      listingOrder: current.listingOrder,
      isActive: current.isActive !== false,
    }));
  }

  async function persist(publish: boolean, changeSummary: string) {
    try {
      setBusy(publish ? "publish" : "save");
      setError(null);
      const action = publish ? cmsClient.content.publish : cmsClient.content.saveDraft;
      const result = await action({
        key: contentKey,
        type: "page",
        slug,
        payload,
        changeSummary,
      });
      setStatus(result.entry.status);
      setSavedPayload(payload);
    } catch (cause) {
      setError(cause instanceof CmsApiError ? cause.message : "Unable to save job posting.");
    } finally {
      setBusy(null);
    }
  }

  if (!job) return null;

  return (
    <AdminEntityEditorShell
      backTo={backTo}
      title={job.title || "New Job Posting"}
      statusLabel={isActive ? status : "inactive"}
      isDirty={isDirty}
      isSaving={busy === "save"}
      isPublishing={busy === "publish"}
      onSaveDraft={(changeSummary) => persist(false, changeSummary)}
      onPublish={(changeSummary) => persist(true, changeSummary)}
    >
      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
      <div className="mb-4 flex flex-wrap items-center gap-2">
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
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-[#e5e5e5] bg-white px-3 py-1.5 text-sm text-[#333] hover:border-[#d4d4d4]"
          onClick={loadTemplate}
        >
          <FileText className="size-4" />
          Load Template
        </button>
      </div>
      <p className="mb-4 text-sm text-[#888]">
        Use Load Template to fill EN and AR with placeholder fields you can replace.
      </p>
      <div className="space-y-5">
        <AdminFieldGroup title="Visibility">
          <label className="flex items-center gap-3 text-sm text-[#333]">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) =>
                setPayload((current) => ({
                  ...current,
                  isActive: event.target.checked,
                }))
              }
              className="size-4 rounded border-[#d4d4d4]"
            />
            Active on website
          </label>
          <p className="text-sm text-[#888]">
            Inactive jobs stay in the admin list but are hidden from the public careers page.
          </p>
        </AdminFieldGroup>
        <AdminFieldGroup title="Job Posting">
          <AdminField label="Title">
            <AdminInput
              value={job.title}
              onChange={(event) =>
                updateJob((current) => ({
                  ...current,
                  title: event.target.value,
                  meta: { ...current.meta, title: event.target.value },
                }))
              }
            />
          </AdminField>
          <AdminField label="Slug">
            <AdminInput
              value={job.slug}
              onChange={(event) =>
                updateJob((current) => ({
                  ...current,
                  slug: event.target.value,
                  id: event.target.value,
                }))
              }
            />
          </AdminField>
          <AdminField label="Department">
            <AdminInput
              value={job.department}
              onChange={(event) =>
                updateJob((current) => ({ ...current, department: event.target.value }))
              }
            />
          </AdminField>
          <AdminField label="Location">
            <AdminInput
              value={job.location}
              onChange={(event) =>
                updateJob((current) => ({ ...current, location: event.target.value }))
              }
            />
          </AdminField>
          <AdminField label="Employment Type">
            <AdminInput
              value={job.employmentType}
              onChange={(event) =>
                updateJob((current) => ({ ...current, employmentType: event.target.value }))
              }
            />
          </AdminField>
          <AdminField label="Experience">
            <AdminInput
              value={job.experience}
              onChange={(event) =>
                updateJob((current) => ({ ...current, experience: event.target.value }))
              }
            />
          </AdminField>
          <AdminField label="Listing Order">
            <AdminInput
              type="number"
              value={String(payload.listingOrder ?? job.listingOrder ?? "")}
              onChange={(event) => {
                const next = event.target.value.trim();
                const listingOrder = next === "" ? undefined : Number(next);
                setPayload((current) => ({
                  ...current,
                  listingOrder: Number.isFinite(listingOrder) ? listingOrder : undefined,
                }));
              }}
            />
          </AdminField>
          <AdminField label="Overview">
            <AdminTextarea
              rows={4}
              value={job.overview}
              onChange={(event) =>
                updateJob((current) => ({ ...current, overview: event.target.value }))
              }
            />
          </AdminField>
        </AdminFieldGroup>
        <AdminFieldGroup title="Details">
          <AdminStringListEditor
            label="Responsibilities"
            values={job.responsibilities}
            onChange={(responsibilities) =>
              updateJob((current) => ({ ...current, responsibilities }))
            }
            addLabel="Add responsibility"
          />
          <AdminStringListEditor
            label="Requirements"
            values={job.requirements}
            onChange={(requirements) => updateJob((current) => ({ ...current, requirements }))}
            addLabel="Add requirement"
          />
          <AdminStringListEditor
            label="Preferred Skills"
            values={job.preferredSkills}
            onChange={(preferredSkills) =>
              updateJob((current) => ({ ...current, preferredSkills }))
            }
            addLabel="Add skill"
          />
        </AdminFieldGroup>
        <AdminFieldGroup title="SEO">
          <AdminField label="Meta Title">
            <AdminInput
              value={job.meta.title}
              onChange={(event) =>
                updateJob((current) => ({
                  ...current,
                  meta: { ...current.meta, title: event.target.value },
                }))
              }
            />
          </AdminField>
          <AdminField label="Meta Description">
            <AdminTextarea
              rows={3}
              value={job.meta.description}
              onChange={(event) =>
                updateJob((current) => ({
                  ...current,
                  meta: { ...current.meta, description: event.target.value },
                }))
              }
            />
          </AdminField>
        </AdminFieldGroup>
      </div>
    </AdminEntityEditorShell>
  );
}
