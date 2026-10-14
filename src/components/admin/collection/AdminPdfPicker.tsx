import { useRef, useState } from "react";

import { AdminField, AdminInput } from "./AdminEntityFormFields";

/** Keep in sync with the proxy's max request body size (nginx client_max_body_size). */
const MAX_PDF_BYTES = 25 * 1024 * 1024;

interface AdminPdfPickerProps {
  label: string;
  value?: { href: string; fileName?: string };
  onChange: (value: { href: string; fileName?: string }) => void;
  /**
   * Stable key used for the stored media asset so re-uploading replaces the
   * same asset (keeps version history) instead of creating orphans. Falls back
   * to the uploaded file's base name when omitted.
   */
  keyHint?: string;
}

export function AdminPdfPicker({
  label,
  value,
  onChange,
  keyHint,
}: AdminPdfPickerProps) {
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "uploading">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(file: File) {
    if (file.size > MAX_PDF_BYTES) {
      setError(
        `This PDF is ${(file.size / 1024 / 1024).toFixed(1)} MB. The maximum is ${
          MAX_PDF_BYTES / 1024 / 1024
        } MB — please compress it and try again.`,
      );
      return;
    }

    setStatus("uploading");
    setError(null);

    try {
      const baseName = file.name.replace(/\.[^.]+$/, "");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("kind", "document");
      formData.append("key", keyHint ? `${keyHint}-pdf` : baseName);

      const response = await fetch("/api/cms/media", {
        method: "POST",
        body: formData,
      });

      const body = await response.json().catch(() => null);

      if (!response.ok) {
        if (body?.error?.message) {
          setError(body.error.message);
        } else if (response.status === 413) {
          setError(
            "The server rejected this PDF because it is too large (413). Please compress it or ask your administrator to raise the upload limit.",
          );
        } else {
          setError(
            `Unable to upload PDF (HTTP ${response.status} ${response.statusText}).`,
          );
        }
        return;
      }

      const uploaded = body?.data;
      const url = uploaded?.url ?? uploaded?.currentVersion?.url;
      if (!url) {
        setError("Upload succeeded but no file URL was returned.");
        return;
      }

      onChange({ href: url, fileName: value?.fileName || file.name });
    } catch (cause) {
      setError(
        `Unable to upload PDF — the request did not complete${
          cause instanceof Error && cause.message ? `: ${cause.message}` : "."
        }`,
      );
    } finally {
      setStatus("idle");
    }
  }

  const fileNameFromHref = value?.href
    ? decodeURIComponent(value.href.split("?")[0]?.split("/").at(-1) ?? "")
    : "";

  return (
    <div className="space-y-3">
      <AdminField
        label={label}
        hint="Paste a link to the PDF, or upload the file directly (stored on S3)."
      >
        <AdminInput
          value={value?.href ?? ""}
          onChange={(event) =>
            onChange({ href: event.target.value, fileName: value?.fileName ?? "" })
          }
          placeholder="https://… or upload a PDF"
        />
      </AdminField>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={status === "uploading"}
          className="rounded-md border border-[#e5e5e5] px-3 py-2 text-sm text-[#333] transition hover:border-[#d4d4d4] disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => uploadInputRef.current?.click()}
        >
          {status === "uploading" ? "Uploading…" : "Upload PDF"}
        </button>
        {value?.href ? (
          <a
            href={value.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--dot-orange)] underline"
          >
            {fileNameFromHref || "View current PDF"}
          </a>
        ) : (
          <span className="text-sm text-[#888]">No PDF uploaded yet.</span>
        )}
        <input
          ref={uploadInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            if (file) void handleUpload(file);
            event.currentTarget.value = "";
          }}
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <AdminField
        label="Download File Name"
        hint="Name the browser uses when the visitor downloads the PDF."
      >
        <AdminInput
          value={value?.fileName ?? ""}
          onChange={(event) =>
            onChange({ href: value?.href ?? "", fileName: event.target.value })
          }
          placeholder="Corporate Profile.pdf"
        />
      </AdminField>
    </div>
  );
}
