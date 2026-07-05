import { useCallback, useMemo } from "react";

import {
  CmsEditableSection,
  CmsEditorPreviewBridge,
  CmsSectionEditorPanel,
  useCmsVisualPageEditor,
} from "@/components/cms/CmsVisualEditor";
import { createNotFoundPageSectionEditors } from "@/components/cms/website-section-editors";
import { NotFoundSection } from "@/components/not-found";
import { useCmsExperience } from "@/contexts/cms-experience-context";
import { buildNotFoundContent } from "@/i18n/content";
import { useNotFoundPageContent } from "@/i18n/content/hooks";
import { useI18n, useLocale } from "@/i18n/hooks";
import type { Locale } from "@/i18n/config";
import type { NotFoundPageContent } from "@/types";

export function NotFoundPage() {
  const notFoundPageContent = useNotFoundPageContent();
  const { getContentOverride } = useCmsExperience();
  const { messages } = useI18n();
  const locale = useLocale();
  const sections = useMemo(() => createNotFoundPageSectionEditors(), []);

  const getInitialContent = useCallback(
    (editingLocale: Locale) =>
      getContentOverride<NotFoundPageContent>(`not-found.${editingLocale}`) ??
      buildNotFoundContent(messages, editingLocale),
    [getContentOverride, messages],
  );

  const editor = useCmsVisualPageEditor({
    getInitialContent,
    contentKeyPrefix: "not-found",
    siteLocale: locale,
    contentType: "page",
    sections,
  });

  const displayContent = editor.isInteractive ? editor.page : notFoundPageContent;

  return (
    <>
      <CmsSectionEditorPanel editor={editor} />
      <CmsEditorPreviewBridge editor={editor}>
      <CmsEditableSection
        sectionId="not-found"
        title="Not Found Page"
        isSelected={editor.selectedSectionId === "not-found"}
        onSelect={editor.setSelectedSectionId}
      >
        <NotFoundSection content={displayContent} />
      </CmsEditableSection>
      </CmsEditorPreviewBridge>
    </>
  );
}
