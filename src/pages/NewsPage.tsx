import { useCallback, useMemo } from "react";
import { useLoaderData } from "react-router";

import {
  CmsEditableSection,
  CmsEditorPreviewBridge,
  CmsSectionEditorPanel,
  useCmsVisualPageEditor,
} from "@/components/cms/CmsVisualEditor";
import { createNewsPageSectionEditors } from "@/components/cms/website-section-editors";
import {
  FeaturedNews,
  NewsGridSection,
  NewsHeroSection,
} from "@/components/news";
import { useCmsExperience } from "@/contexts/cms-experience-context";
import { buildNewsContent } from "@/i18n/content";
import { useNewsPageContent } from "@/i18n/content/hooks";
import { useI18n, useLocale } from "@/i18n/hooks";
import type { Locale } from "@/i18n/config";
import type { NewsArticlePreview, NewsPageContent } from "@/types";

interface NewsPageLoaderData {
  featuredArticle?: NewsArticlePreview;
  gridArticles: NewsArticlePreview[];
}

export function NewsPage() {
  const loaderData = useLoaderData<NewsPageLoaderData | undefined>();
  const newsPageContent = useNewsPageContent();
  const { getContentOverride } = useCmsExperience();
  const { locale, messages } = useI18n();
  const sections = useMemo(() => createNewsPageSectionEditors(), []);

  const featuredArticle = loaderData?.featuredArticle;
  const articles = loaderData?.gridArticles ?? [];

  const getInitialContent = useCallback(
    (editingLocale: Locale) =>
      getContentOverride<NewsPageContent>(`news.${editingLocale}`) ??
      buildNewsContent(messages, editingLocale),
    [getContentOverride, messages],
  );

  const editor = useCmsVisualPageEditor({
    getInitialContent,
    contentKeyPrefix: "news",
    siteLocale: locale,
    contentType: "page",
    sections,
  });

  const displayContent = editor.isInteractive ? editor.page : newsPageContent;

  return (
    <>
      <CmsSectionEditorPanel editor={editor} />

      <CmsEditorPreviewBridge editor={editor}>
      <CmsEditableSection
        sectionId="news-hero"
        title="News Hero"
        isSelected={editor.selectedSectionId === "news-hero"}
        onSelect={editor.setSelectedSectionId}
      >
        <NewsHeroSection content={displayContent.hero} />
      </CmsEditableSection>

      {featuredArticle ? (
        <CmsEditableSection
          sectionId="news-featured"
          title="Featured News"
          isSelected={editor.selectedSectionId === "news-featured"}
          onSelect={editor.setSelectedSectionId}
        >
          <FeaturedNews
            article={featuredArticle}
            content={displayContent.featured}
          />
        </CmsEditableSection>
      ) : null}

      <CmsEditableSection
        sectionId="news-grid"
        title="News Grid"
        isSelected={editor.selectedSectionId === "news-grid"}
        onSelect={editor.setSelectedSectionId}
      >
        <NewsGridSection content={displayContent.grid} articles={articles} />
      </CmsEditableSection>
      </CmsEditorPreviewBridge>
    </>
  );
}
