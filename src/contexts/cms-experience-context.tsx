import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { CMSAuthSession } from "@/types";

const CMS_EDIT_MODE_STORAGE_KEY = "dot-cms-edit-mode";

interface CmsExperienceContextValue {
  session: CMSAuthSession | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  canEditWebsite: boolean;
  isEditMode: boolean;
  contentOverrides: Record<string, unknown>;
  getContentOverride: <T>(key: string) => T | null;
  setEditMode: (next: boolean) => void;
  toggleEditMode: () => void;
}

const CmsExperienceContext = createContext<CmsExperienceContextValue | null>(null);

export function CmsExperienceProvider({
  children,
  session,
  contentOverrides = {},
}: {
  children: ReactNode;
  session: CMSAuthSession | null;
  contentOverrides?: Record<string, unknown>;
}) {
  const isAdmin = session?.user.role === "admin";
  const canEditWebsite = Boolean(session);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!canEditWebsite) {
      window.localStorage.removeItem(CMS_EDIT_MODE_STORAGE_KEY);
      setIsEditMode(false);
      return;
    }

    const stored = window.localStorage.getItem(CMS_EDIT_MODE_STORAGE_KEY);
    setIsEditMode(stored === "true");
  }, [canEditWebsite]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (canEditWebsite && isEditMode) {
      document.documentElement.dataset.cmsEditMode = "true";
      return;
    }

    delete document.documentElement.dataset.cmsEditMode;
  }, [canEditWebsite, isEditMode]);

  const value = useMemo<CmsExperienceContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      isAdmin,
      canEditWebsite,
      isEditMode: canEditWebsite && isEditMode,
      contentOverrides,
      getContentOverride: <T,>(key: string) =>
        (contentOverrides[key] as T | undefined) ?? null,
      setEditMode: (next) => {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(CMS_EDIT_MODE_STORAGE_KEY, String(next));
        }
        setIsEditMode(next);
      },
      toggleEditMode: () => {
        setIsEditMode((current) => {
          const next = !current;
          if (typeof window !== "undefined") {
            window.localStorage.setItem(CMS_EDIT_MODE_STORAGE_KEY, String(next));
          }
          return next;
        });
      },
    }),
    [canEditWebsite, contentOverrides, isAdmin, isEditMode, session],
  );

  return (
    <CmsExperienceContext.Provider value={value}>
      {children}
    </CmsExperienceContext.Provider>
  );
}

export function useCmsExperience() {
  const context = useContext(CmsExperienceContext);

  if (!context) {
    throw new Error(
      "useCmsExperience must be used within CmsExperienceProvider",
    );
  }

  return context;
}
