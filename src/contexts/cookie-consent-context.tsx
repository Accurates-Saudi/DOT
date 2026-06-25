import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  applyConsentToScripts,
  createAcceptAllConsent,
  createDefaultConsent,
  createRejectNonEssentialConsent,
  hasConsent as checkConsent,
  mergeConsent,
  readStoredConsent,
  resetConsent as resetStoredConsent,
  writeStoredConsent,
} from "@/lib/cookie-consent";
import type {
  CookieCategory,
  CookieConsentChoices,
  OptionalCookieCategory,
} from "@/types/cookie-consent";

interface CookieConsentContextValue {
  consent: CookieConsentChoices | null;
  isReady: boolean;
  showBanner: boolean;
  isPreferencesOpen: boolean;
  hasConsent: (category: CookieCategory) => boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  updateConsent: (
    updates: Partial<Pick<CookieConsentChoices, OptionalCookieCategory>>,
  ) => void;
  resetConsent: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextValue | null>(
  null,
);

function persistConsent(consent: CookieConsentChoices) {
  writeStoredConsent(consent);
  applyConsentToScripts(consent);
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsentChoices | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setConsent(stored.consent);
      applyConsentToScripts(stored.consent);
    }
    setIsReady(true);
  }, []);

  const commitConsent = useCallback((next: CookieConsentChoices) => {
    setConsent(next);
    persistConsent(next);
    setIsPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    commitConsent(createAcceptAllConsent());
  }, [commitConsent]);

  const rejectNonEssential = useCallback(() => {
    commitConsent(createRejectNonEssentialConsent());
  }, [commitConsent]);

  const updateConsent = useCallback(
    (updates: Partial<Pick<CookieConsentChoices, OptionalCookieCategory>>) => {
      const base = consent ?? createDefaultConsent();
      commitConsent(mergeConsent(base, updates));
    },
    [commitConsent, consent],
  );

  const resetConsent = useCallback(() => {
    resetStoredConsent();
    setConsent(null);
    setIsPreferencesOpen(false);
  }, []);

  const openPreferences = useCallback(() => {
    setIsPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  const hasConsentFor = useCallback(
    (category: CookieCategory) => checkConsent(category, consent),
    [consent],
  );

  const showBanner = isReady && consent === null && !isPreferencesOpen;

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      isReady,
      showBanner,
      isPreferencesOpen,
      hasConsent: hasConsentFor,
      acceptAll,
      rejectNonEssential,
      updateConsent,
      resetConsent,
      openPreferences,
      closePreferences,
    }),
    [
      acceptAll,
      closePreferences,
      consent,
      hasConsentFor,
      isPreferencesOpen,
      isReady,
      openPreferences,
      rejectNonEssential,
      resetConsent,
      showBanner,
      updateConsent,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsentContext() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error(
      "useCookieConsentContext must be used within CookieConsentProvider",
    );
  }

  return context;
}
