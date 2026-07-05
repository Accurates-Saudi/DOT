import { X } from "lucide-react";
import {
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import { useCmsExperience } from "@/contexts/cms-experience-context";
import { cn } from "@/lib/utils";
import { cmsClient, CmsApiError } from "@/sdk/cms";
import type { CMSContentType } from "@/types";

import { CmsPanelImageField } from "./CmsImageFieldEditor";

export { CmsPanelImageField } from "./CmsImageFieldEditor";
export {
  CmsPanelCard,
  CmsPanelField,
  CmsPanelStringList,
  CmsPanelTextarea,
} from "./CmsPanelPrimitives";

type PathSegment = string | number;

export interface CmsVisualSectionDefinition<TPage> {
  id: string;
  title: string;
  description?: string;
  renderPanel: (context: CmsVisualSectionRenderContext<TPage>) => ReactNode;
}

export interface CmsVisualSectionRenderContext<TPage> {
  page: TPage;
  setValueAtPath: (path: PathSegment[], value: unknown) => void;
  updatePage: (updater: (current: TPage) => TPage) => void;
}

function cloneValue<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => cloneValue(item)) as T;
  }

  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, cloneValue(entry)]),
    ) as T;
  }

  return value;
}

function setValueAtPath<T>(
  value: T,
  path: PathSegment[],
  nextValue: unknown,
): T {
  if (path.length === 0) {
    return nextValue as T;
  }

  const [head, ...rest] = path;

  if (Array.isArray(value)) {
    const next = [...value];
    const index = Number(head);
    next[index] = rest.length
      ? setValueAtPath(next[index], rest, nextValue)
      : (nextValue as never);
    return next as T;
  }

  if (typeof value === "object" && value !== null) {
    return {
      ...(value as Record<string, unknown>),
      [head]: rest.length
        ? setValueAtPath(
            (value as Record<string, unknown>)[String(head)],
            rest,
            nextValue,
          )
        : nextValue,
    } as T;
  }

  return value;
}

export function useCmsVisualPageEditor<TPage>({
  initialContent,
  contentKey,
  contentType,
  sections,
}: {
  initialContent: TPage;
  contentKey: string;
  contentType: CMSContentType;
  sections: CmsVisualSectionDefinition<TPage>[];
}) {
  const { canEditWebsite, isEditMode, session } = useCmsExperience();
  const [publishedPage, setPublishedPage] = useState<TPage>(() =>
    cloneValue(initialContent),
  );
  const [page, setPage] = useState<TPage>(() => cloneValue(initialContent));
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [status, setStatus] = useState<{
    state: "idle" | "loading-draft" | "saving" | "publishing" | "saved" | "error";
    message?: string;
  }>({ state: "idle" });
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const nextPublished = cloneValue(initialContent);
    setPublishedPage(nextPublished);
    setPage(cloneValue(initialContent));
  }, [contentKey, initialContent]);

  useEffect(() => {
    if (!isEditMode) {
      setSelectedSectionId(null);
      setPage(cloneValue(publishedPage));
      setStatus({ state: "idle" });
    }
  }, [isEditMode, publishedPage]);

  useEffect(() => {
    const userId = session?.user.id;

    if (!canEditWebsite || !isEditMode || !userId) {
      return;
    }

    let cancelled = false;

    async function loadDraftPreview() {
      try {
        setStatus({ state: "loading-draft" });
        const detail = await cmsClient.content.get(contentKey, {
          cache: { bypass: true },
        });
        const ownDraft = detail.versions.find(
          (version) => !version.isPublished && version.createdBy?.id === userId,
        );

        if (cancelled) return;

        if (ownDraft?.payload) {
          setPage(cloneValue(ownDraft.payload as TPage));
        } else if (detail.publishedVersion?.payload) {
          setPage(cloneValue(detail.publishedVersion.payload as TPage));
        } else {
          setPage(cloneValue(publishedPage));
        }

        setStatus({ state: "idle" });
      } catch {
        if (cancelled) return;
        setPage(cloneValue(publishedPage));
        setStatus({ state: "idle" });
      }
    }

    void loadDraftPreview();

    return () => {
      cancelled = true;
    };
  }, [canEditWebsite, contentKey, isEditMode, publishedPage, session?.user.id]);

  useEffect(() => {
    if (!selectedSectionId) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedSectionId(null);
      }
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      if (target.closest("[data-cms-editor-panel]")) return;
      if (target.closest("[data-cms-editor-section]")) return;

      setSelectedSectionId(null);
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handlePointerDown);
    };
  }, [selectedSectionId]);

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === selectedSectionId) ?? null,
    [sections, selectedSectionId],
  );

  async function persist(publish: boolean) {
    try {
      setStatus({
        state: publish ? "publishing" : "saving",
        message: undefined,
      });

      const action = publish ? cmsClient.content.publish : cmsClient.content.saveDraft;
      await action({
        key: contentKey,
        type: contentType,
        payload: page,
        changeSummary: selectedSection
          ? `${publish ? "Published" : "Saved"} ${selectedSection.title}`
          : publish
            ? "Published page changes"
            : "Saved page changes",
      });

      setStatus({
        state: "saved",
        message: publish ? "Published to the CMS." : "Draft saved to the CMS.",
      });

      if (publish) {
        setPublishedPage(cloneValue(page));
      }
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof CmsApiError
            ? error.message
            : "Unable to save this section right now.",
      });
    }
  }

  return {
    page,
    publishedPage,
    isInteractive: canEditWebsite && isEditMode,
    selectedSection,
    selectedSectionId,
    setSelectedSectionId,
    closePanel: () => setSelectedSectionId(null),
    panelRef,
    status,
    setPage,
    updatePage: (updater: (current: TPage) => TPage) => {
      setPage((current) => updater(cloneValue(current)));
      setStatus({ state: "idle" });
    },
    setValueAtPath: (path: PathSegment[], value: unknown) => {
      setPage((current) => setValueAtPath(cloneValue(current), path, value));
      setStatus({ state: "idle" });
    },
    saveDraft: () => persist(false),
    publish: () => persist(true),
  };
}

export function CmsEditableSection({
  title,
  sectionId,
  isSelected,
  onSelect,
  children,
}: {
  title: string;
  sectionId: string;
  isSelected: boolean;
  onSelect: (sectionId: string) => void;
  children: ReactNode;
}) {
  const { canEditWebsite, isEditMode } = useCmsExperience();

  if (!canEditWebsite || !isEditMode) {
    return <>{children}</>;
  }

  return (
    <div className="group/visual-editor relative" data-cms-editor-section={sectionId}>
      {children}
      <button
        type="button"
        onClick={() => onSelect(sectionId)}
        className="absolute inset-0 z-30 rounded-[1.5rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color:rgba(246,142,5,0.18)]"
        aria-label={`Edit ${title}`}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-3 z-20 rounded-[1.5rem] border border-[rgba(246,142,5,0.14)] bg-white/10 opacity-0 transition duration-200",
          "group-hover/visual-editor:opacity-100",
          isSelected && "border-[rgba(246,142,5,0.42)] bg-white/22 opacity-100",
        )}
      >
        <div className="absolute top-4 left-4 rounded-full border border-[rgba(246,142,5,0.22)] bg-white/92 px-3 py-1.5 text-[0.72rem] font-medium text-[#0c1524] shadow-[0_14px_32px_-24px_rgba(12,21,36,0.35)] backdrop-blur-sm">
          <span className="text-[#0c1524]/65">{title}</span>
          <span className="mx-2 text-[#0c1524]/22">|</span>
          <span className="text-[var(--dot-orange)]">Edit Section</span>
        </div>
      </div>
    </div>
  );
}

export function CmsSectionEditorPanel<TPage>({
  editor,
}: {
  editor: ReturnType<typeof useCmsVisualPageEditor<TPage>>;
}) {
  const section = editor.selectedSection;

  if (!editor.isInteractive || !section) {
    return null;
  }

  const renderContext: CmsVisualSectionRenderContext<TPage> = {
    page: editor.page,
    setValueAtPath: editor.setValueAtPath,
    updatePage: editor.updatePage,
  };

  return (
    <aside
      ref={editor.panelRef}
      data-cms-editor-panel
      className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-[28rem] flex-col border-l border-[#0c1524]/8 bg-white shadow-[-24px_0_80px_-48px_rgba(12,21,36,0.28)]"
    >
      <header className="border-b border-[#0c1524]/6 px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.22em] text-[var(--dot-orange)] uppercase">
              {section.title}
            </p>
            {section.description ? (
              <p className="mt-2 text-sm leading-6 text-[#0c1524]/56">
                {section.description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={editor.closePanel}
            className="inline-flex size-9 items-center justify-center rounded-full border border-[#0c1524]/8 text-[#0c1524]/60 transition hover:bg-[#f5f6f8] hover:text-[#0c1524]"
            aria-label="Close section editor"
          >
            <X className="size-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="space-y-5">{section.renderPanel(renderContext)}</div>
      </div>

      <footer className="border-t border-[#0c1524]/6 bg-white px-5 py-4">
        {editor.status.message ? (
          <p
            className={cn(
              "mb-3 text-sm",
              editor.status.state === "error"
                ? "text-red-600"
                : "text-[#0c1524]/58",
            )}
          >
            {editor.status.message}
          </p>
        ) : null}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="h-11 flex-1 rounded-2xl"
            onClick={editor.saveDraft}
            disabled={
              editor.status.state === "saving" ||
              editor.status.state === "publishing"
            }
          >
            {editor.status.state === "saving" ? "Saving..." : "Save Draft"}
          </Button>
          <Button
            type="button"
            variant="accent"
            className="h-11 flex-1 rounded-2xl"
            onClick={editor.publish}
            disabled={
              editor.status.state === "saving" ||
              editor.status.state === "publishing"
            }
          >
            {editor.status.state === "publishing" ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </footer>
    </aside>
  );
}
