export interface RegisteredMedia {
  id: string;
  src: string;
}

const mediaRegistry = new Map<string, RegisteredMedia>();

export function registerMedia(id: string, src: string): void {
  const existing = mediaRegistry.get(id);

  if (existing) {
    if (existing.src !== src) {
      throw new Error(
        `[media] Duplicate media id "${id}" registered for different assets.`,
      );
    }

    return;
  }

  mediaRegistry.set(id, { id, src });
}

export function resolveMedia(id: string): string {
  const entry = mediaRegistry.get(id);

  if (!entry) {
    throw new Error(`[media] Missing media registry entry for "${id}".`);
  }

  return entry.src;
}

export function getMediaRegistry(): Record<string, string> {
  return Object.fromEntries(
    [...mediaRegistry.values()].map((entry) => [entry.id, entry.src]),
  );
}
