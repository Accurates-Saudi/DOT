import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import type { Locale } from "@/i18n/config";

import { AdminPreviewFrame } from "./AdminPreviewFrame";

interface AdminPreviewPanelProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  title?: string;
  children: ReactNode;
}

function PreviewPanelContent({
  onClose,
  title,
  locale,
  children,
  className,
}: {
  onClose: () => void;
  title: string;
  locale: Locale;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={
        className ??
        "flex min-h-0 flex-col overflow-hidden rounded-md border border-[#e5e5e5] bg-white shadow-sm"
      }
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-[#e5e5e5] px-4">
        <div>
          <p className="text-sm font-semibold text-[#111]">{title}</p>
          <p className="text-xs text-[#888]">
            Live draft preview. Publish to update the website.
          </p>
        </div>
        <button
          type="button"
          className="rounded-md border border-[#e5e5e5] p-2 text-[#666] hover:border-[#d4d4d4]"
          onClick={onClose}
          aria-label="Close preview"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto bg-[#f8f8f8]">
        <AdminPreviewFrame locale={locale}>{children}</AdminPreviewFrame>
      </div>
    </aside>
  );
}

export function AdminPreviewPanel({
  open,
  onClose,
  locale,
  title = "Preview",
  children,
}: AdminPreviewPanelProps) {
  useEffect(() => {
    if (!open || typeof window === "undefined") return;

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (!isMobile) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const desktopPanel = (
    <PreviewPanelContent
      onClose={onClose}
      title={title}
      locale={locale}
      className="sticky top-20 hidden max-h-[calc(100vh-7rem)] min-h-[24rem] flex-col overflow-hidden rounded-md border border-[#e5e5e5] bg-white shadow-sm lg:flex"
    >
      {children}
    </PreviewPanelContent>
  );

  const mobilePanel =
    typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[120] flex lg:hidden">
            <button
              type="button"
              aria-label="Close preview"
              className="absolute inset-0 bg-[#111]/40"
              onClick={onClose}
            />
            <PreviewPanelContent
              onClose={onClose}
              title={title}
              locale={locale}
              className="relative ml-auto flex h-full w-full max-w-3xl flex-col border-l border-[#e5e5e5] bg-white shadow-xl"
            >
              {children}
            </PreviewPanelContent>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {desktopPanel}
      {mobilePanel}
    </>
  );
}
