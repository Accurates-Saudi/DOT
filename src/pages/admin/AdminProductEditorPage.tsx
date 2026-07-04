import { useMemo, useState } from "react";

import { ProductDetailView } from "@/components/products/ProductDetailView";
import {
  AdminEntityEditorShell,
} from "@/components/admin/collection/AdminEntityEditorShell";
import {
  AdminField,
  AdminFieldGroup,
  AdminInput,
  AdminStringListEditor,
  AdminTextarea,
} from "@/components/admin/collection/AdminEntityFormFields";
import { AdminMediaPicker } from "@/components/admin/collection/AdminMediaPicker";
import { AdminPreviewPanel } from "@/components/admin/collection/AdminPreviewPanel";
import type { Locale } from "@/i18n/config";
import type { CmsProductPayload } from "@/types/cms-entities";
import type { ProductDetailContent } from "@/types";
import { getLocalizedPayload } from "@/utils/cms-entities";
import { cmsClient, CmsApiError } from "@/sdk/cms";

interface AdminProductEditorPageProps {
  contentKey: string;
  slug: string;
  initialPayload: CmsProductPayload;
  initialStatus: string;
  locale: Locale;
  backTo: string;
}

export function AdminProductEditorPage({
  contentKey,
  slug,
  initialPayload,
  initialStatus,
  locale,
  backTo,
}: AdminProductEditorPageProps) {
  const [payload, setPayload] = useState(initialPayload);
  const [status, setStatus] = useState(initialStatus);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [activeLocale, setActiveLocale] = useState<Locale>(locale);
  const [busy, setBusy] = useState<"save" | "publish" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const product = useMemo(
    () => getLocalizedPayload<ProductDetailContent>(payload, activeLocale),
    [payload, activeLocale],
  );

  function updateLocaleProduct(updater: (current: ProductDetailContent) => ProductDetailContent) {
    setPayload((current) => {
      const localized = getLocalizedPayload<ProductDetailContent>(current, activeLocale);
      if (!localized) return current;

      return {
        ...current,
        locales: {
          ...current.locales,
          [activeLocale]: updater(localized),
        },
      };
    });
  }

  async function persist(publish: boolean) {
    try {
      setBusy(publish ? "publish" : "save");
      setError(null);

      const action = publish ? cmsClient.content.publish : cmsClient.content.saveDraft;
      const result = await action({
        key: contentKey,
        type: "product",
        slug,
        payload,
        changeSummary: publish ? "Published product changes" : "Saved product draft",
      });

      setStatus(result.entry.status);
    } catch (cause) {
      setError(
        cause instanceof CmsApiError ? cause.message : "Unable to save product changes.",
      );
    } finally {
      setBusy(null);
    }
  }

  if (!product) {
    return <p className="text-sm text-red-600">Unable to load product editor content.</p>;
  }

  return (
    <>
      <AdminEntityEditorShell
        backTo={backTo}
        title={product.hero.name || "New Product"}
        statusLabel={status}
        previewOpen={previewOpen}
        onPreviewToggle={() => setPreviewOpen((current) => !current)}
        isSaving={busy === "save"}
        isPublishing={busy === "publish"}
        onSaveDraft={() => void persist(false)}
        onPublish={() => void persist(true)}
        previewPanel={
          <AdminPreviewPanel
            open={previewOpen}
            onClose={() => setPreviewOpen(false)}
            locale={activeLocale}
            title="Product Preview"
          >
            <ProductDetailView product={product} />
          </AdminPreviewPanel>
        }
      >
        {error ? (
          <p className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}

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
          <AdminFieldGroup title="Basics">
            <div className="grid gap-4 lg:grid-cols-2">
              <AdminField label="Slug">
                <AdminInput
                  value={product.slug}
                  onChange={(event) =>
                    updateLocaleProduct((current) => ({
                      ...current,
                      slug: event.target.value,
                    }))
                  }
                />
              </AdminField>
              <AdminField label="Category">
                <AdminInput
                  value={product.category}
                  onChange={(event) =>
                    updateLocaleProduct((current) => ({
                      ...current,
                      category: event.target.value,
                      hero: { ...current.hero, category: event.target.value },
                    }))
                  }
                />
              </AdminField>
            </div>
          </AdminFieldGroup>

          <AdminFieldGroup title="Hero">
            <AdminField label="Title">
              <AdminInput
                value={product.hero.name}
                onChange={(event) =>
                  updateLocaleProduct((current) => ({
                    ...current,
                    hero: { ...current.hero, name: event.target.value },
                    meta: { ...current.meta, title: event.target.value },
                  }))
                }
              />
            </AdminField>
            <AdminField label="Introduction">
              <AdminTextarea
                rows={4}
                value={product.hero.introduction}
                onChange={(event) =>
                  updateLocaleProduct((current) => ({
                    ...current,
                    hero: { ...current.hero, introduction: event.target.value },
                    meta: { ...current.meta, description: event.target.value },
                  }))
                }
              />
            </AdminField>
            <AdminMediaPicker
              label="Cover Image"
              value={product.hero.image}
              onChange={(image) =>
                updateLocaleProduct((current) => ({
                  ...current,
                  hero: { ...current.hero, image },
                }))
              }
            />
          </AdminFieldGroup>

          <AdminFieldGroup title="Overview" description="Leave empty to hide on the website.">
            <AdminField label="Heading">
              <AdminInput
                value={product.overview.heading}
                onChange={(event) =>
                  updateLocaleProduct((current) => ({
                    ...current,
                    overview: { ...current.overview, heading: event.target.value },
                  }))
                }
              />
            </AdminField>
            <AdminStringListEditor
              label="Paragraphs"
              values={product.overview.paragraphs}
              onChange={(paragraphs) =>
                updateLocaleProduct((current) => ({
                  ...current,
                  overview: { ...current.overview, paragraphs },
                }))
              }
              addLabel="Add paragraph"
            />
          </AdminFieldGroup>

          <AdminFieldGroup title="Applications">
            <AdminStringListEditor
              label="Items"
              values={product.info.applications.items}
              onChange={(items) =>
                updateLocaleProduct((current) => ({
                  ...current,
                  info: {
                    ...current.info,
                    applications: { ...current.info.applications, items },
                  },
                }))
              }
            />
          </AdminFieldGroup>

          <AdminFieldGroup title="Features">
            <AdminStringListEditor
              label="Items"
              values={product.info.features.items}
              onChange={(items) =>
                updateLocaleProduct((current) => ({
                  ...current,
                  info: {
                    ...current.info,
                    features: { ...current.info.features, items },
                  },
                }))
              }
            />
          </AdminFieldGroup>

          <AdminFieldGroup title="Benefits">
            <AdminStringListEditor
              label="Items"
              values={product.info.benefits.items}
              onChange={(items) =>
                updateLocaleProduct((current) => ({
                  ...current,
                  info: {
                    ...current.info,
                    benefits: { ...current.info.benefits, items },
                  },
                }))
              }
            />
          </AdminFieldGroup>

          <AdminFieldGroup title="Technical Data">
            <AdminField label="Heading">
              <AdminInput
                value={product.specifications?.heading ?? ""}
                onChange={(event) =>
                  updateLocaleProduct((current) => ({
                    ...current,
                    specifications: {
                      heading: event.target.value,
                      rows: current.specifications?.rows ?? [],
                      ...(current.specifications?.image
                        ? { image: current.specifications.image }
                        : {}),
                    },
                  }))
                }
              />
            </AdminField>
            <AdminMediaPicker
              label="Technical Data Image"
              value={product.specifications?.image}
              onChange={(image) =>
                updateLocaleProduct((current) => ({
                  ...current,
                  specifications: {
                    heading: current.specifications?.heading ?? "Technical Data",
                    rows: current.specifications?.rows ?? [],
                    image,
                  },
                }))
              }
            />
          </AdminFieldGroup>

          <AdminFieldGroup title="SEO">
            <AdminField label="Meta Title">
              <AdminInput
                value={product.meta.title}
                onChange={(event) =>
                  updateLocaleProduct((current) => ({
                    ...current,
                    meta: { ...current.meta, title: event.target.value },
                  }))
                }
              />
            </AdminField>
            <AdminField label="Meta Description">
              <AdminTextarea
                rows={3}
                value={product.meta.description}
                onChange={(event) =>
                  updateLocaleProduct((current) => ({
                    ...current,
                    meta: { ...current.meta, description: event.target.value },
                  }))
                }
              />
            </AdminField>
          </AdminFieldGroup>
        </div>
      </AdminEntityEditorShell>
    </>
  );
}
