import type { Locale } from "./config";
import type { TranslationMessages } from "./types";

const messageLoaders: Record<
  Locale,
  () => Promise<{ default: TranslationMessages }>
> = {
  en: () => import("./locales/en.json"),
  ar: () => import("./locales/ar.json"),
};

const messageCache = new Map<Locale, TranslationMessages>();

export async function loadMessages(locale: Locale): Promise<TranslationMessages> {
  const cached = messageCache.get(locale);
  if (cached) return cached;

  const module = await messageLoaders[locale]();
  const messages = module.default;
  messageCache.set(locale, messages);
  return messages;
}

export function preloadMessages(locale: Locale): void {
  void loadMessages(locale);
}
