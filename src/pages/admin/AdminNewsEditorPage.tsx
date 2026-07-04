import { useEffect, useMemo, useState } from "react";

import { NewsDetailView } from "@/components/news/NewsDetailView";
import { AdminEntityEditorShell } from "@/components/admin/collection/AdminEntityEditorShell";
import {
  AdminField,
  AdminFieldGroup,
  AdminInput,
  AdminStringListEditor,
  AdminTextarea,
} from "@/components/admin/collection/AdminEntityFormFields";
import { AdminMediaPicker } from "@/components/admin/collection/AdminMediaPicker";
import { useAdminWorkspace } from "@/contexts/admin-workspace-context";
import type { Locale } from "@/i18n/config";
import type { CmsNewsPayload } from "@/types/cms-entities";
import type { NewsArticleDetail } from "@/types";
import { getLocalizedPayload } from "@/utils/cms-entities";
import { cmsClient, CmsApiError } from "@/sdk/cms";

interface AdminNewsEditorPageProps {
  contentKey: string;
  slug: string;
  initialPayload: CmsNewsPayload;
  initialStatus: string;
  locale: Locale;
  backTo: string;
}

export function AdminNewsEditorPage({
  contentKey,
  slug,
  initialPayload,
  initialStatus,
  locale,
  backTo,
}: AdminNewsEditorPageProps) {
  const [payload, setPayload] = useState(initialPayload);
  const [savedPayload, setSavedPayload] = useState(initialPayload);
  const [status, setStatus] = useState(initialStatus);
  const [activeLocale, setActiveLocale] = useState<Locale>(locale);
  const [busy, setBusy] = useState<"save" | "publish" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { registerPreview } = useAdminWorkspace();

  const article = useMemo(
    () => getLocalizedPayload<NewsArticleDetail>(payload, activeLocale),
    [payload, activeLocale],
  );

  const isDirty =
    status === "static" ||
    JSON.stringify(payload) !== JSON.stringify(savedPayload);

  useEffect(() => {
    if (!article) {
      registerPreview(null);
      return;
    }

    registerPreview({
      locale: activeLocale,
      title: `${article.title || "Article"} Preview`,
      render: () => <NewsDetailView article={article} />,
    });

    return () => registerPreview(null);
  }, [activeLocale, article, registerPreview]);

  function updateArticle(updater: (current: NewsArticleDetail) => NewsArticleDetail) {
    setPayload((current) => {
      const localized = getLocalizedPayload<NewsArticleDetail>(current, activeLocale);
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
        type: "news",
        slug,
        payload,
        changeSummary,
      });
      setStatus(result.entry.status);
      setSavedPayload(payload);
    } catch (cause) {
      setError(cause instanceof CmsApiError ? cause.message : "Unable to save news article.");
    } finally {
      setBusy(null);
    }
  }

  if (!article) return null;

  return (
    <AdminEntityEditorShell
      backTo={backTo}
      title={article.title || "New Article"}
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
      <div className="space-y-5">
        <AdminFieldGroup title="Article">
          <AdminField label="Title">
            <AdminInput value={article.title} onChange={(e) => updateArticle((c) => ({ ...c, title: e.target.value, meta: { ...c.meta, title: e.target.value } }))} />
          </AdminField>
          <AdminField label="Slug">
            <AdminInput value={article.slug} onChange={(e) => updateArticle((c) => ({ ...c, slug: e.target.value }))} />
          </AdminField>
          <AdminField label="Category">
            <AdminInput value={article.category} onChange={(e) => updateArticle((c) => ({ ...c, category: e.target.value }))} />
          </AdminField>
          <AdminField label="Publish Date">
            <AdminInput value={article.publishedAt} onChange={(e) => updateArticle((c) => ({ ...c, publishedAt: e.target.value }))} />
          </AdminField>
          <AdminField label="Summary">
            <AdminTextarea rows={3} value={article.excerpt} onChange={(e) => updateArticle((c) => ({ ...c, excerpt: e.target.value, meta: { ...c.meta, description: e.target.value } }))} />
          </AdminField>
          <AdminMediaPicker label="Cover Image" value={article.image} onChange={(image) => updateArticle((c) => ({ ...c, image }))} />
        </AdminFieldGroup>
        <AdminFieldGroup title="Content">
          <AdminStringListEditor label="Paragraphs" values={article.content} onChange={(content) => updateArticle((c) => ({ ...c, content }))} addLabel="Add paragraph" />
        </AdminFieldGroup>
        <AdminFieldGroup title="SEO">
          <AdminField label="Meta Title">
            <AdminInput value={article.meta.title} onChange={(e) => updateArticle((c) => ({ ...c, meta: { ...c.meta, title: e.target.value } }))} />
          </AdminField>
          <AdminField label="Meta Description">
            <AdminTextarea rows={3} value={article.meta.description} onChange={(e) => updateArticle((c) => ({ ...c, meta: { ...c.meta, description: e.target.value } }))} />
          </AdminField>
        </AdminFieldGroup>
      </div>
    </AdminEntityEditorShell>
  );
}
