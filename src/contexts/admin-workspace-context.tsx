import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Locale } from "@/i18n/config";

export interface AdminPreviewRegistration {
  locale: Locale;
  title: string;
  render: () => ReactNode;
}

interface AdminWorkspaceContextValue {
  preview: AdminPreviewRegistration | null;
  previewOpen: boolean;
  registerPreview: (preview: AdminPreviewRegistration | null) => void;
  openPreview: () => void;
  closePreview: () => void;
  togglePreview: () => void;
}

const AdminWorkspaceContext = createContext<AdminWorkspaceContextValue | null>(null);

export function AdminWorkspaceProvider({ children }: { children: ReactNode }) {
  const [preview, setPreview] = useState<AdminPreviewRegistration | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const registerPreview = useCallback((next: AdminPreviewRegistration | null) => {
    setPreview(next);
    if (!next) {
      setPreviewOpen(false);
    }
  }, []);

  const openPreview = useCallback(() => {
    setPreviewOpen(true);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewOpen(false);
  }, []);

  const togglePreview = useCallback(() => {
    setPreviewOpen((current) => !current);
  }, []);

  const value = useMemo(
    () => ({
      preview,
      previewOpen,
      registerPreview,
      openPreview,
      closePreview,
      togglePreview,
    }),
    [preview, previewOpen, registerPreview, openPreview, closePreview, togglePreview],
  );

  return (
    <AdminWorkspaceContext.Provider value={value}>{children}</AdminWorkspaceContext.Provider>
  );
}

export function useAdminWorkspace() {
  const context = useContext(AdminWorkspaceContext);

  if (!context) {
    throw new Error("useAdminWorkspace must be used within AdminWorkspaceProvider");
  }

  return context;
}
