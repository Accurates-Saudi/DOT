import type { CookieCategory, CookieConsentChoices } from "@/types/cookie-consent";

import { hasConsent } from "./consent";

export type CookieScriptLoader = () => void | (() => void);

type RegisteredScript = {
  id: string;
  category: Exclude<CookieCategory, "necessary">;
  loader: CookieScriptLoader;
  cleanup?: () => void;
};

const registry = new Map<string, RegisteredScript>();

export function registerCookieScript(
  id: string,
  category: Exclude<CookieCategory, "necessary">,
  loader: CookieScriptLoader,
): () => void {
  registry.set(id, { id, category, loader });

  return () => {
    const entry = registry.get(id);
    entry?.cleanup?.();
    registry.delete(id);
  };
}

export function applyConsentToScripts(consent: CookieConsentChoices): void {
  for (const entry of registry.values()) {
    const allowed = hasConsent(entry.category, consent);

    if (allowed) {
      if (!entry.cleanup) {
        const cleanup = entry.loader();
        if (typeof cleanup === "function") {
          entry.cleanup = cleanup;
        }
      }
      continue;
    }

    entry.cleanup?.();
    entry.cleanup = undefined;
  }
}

export function resetManagedScripts(): void {
  for (const entry of registry.values()) {
    entry.cleanup?.();
    entry.cleanup = undefined;
  }
}
