import type { CmsCacheAdapter, CmsCacheEntry } from "./types";

interface TaggedCacheEntry<T> extends CmsCacheEntry<T> {
  tags: readonly string[];
}

function isExpired(entry: CmsCacheEntry<unknown>): boolean {
  return typeof entry.expiresAt === "number" && entry.expiresAt <= Date.now();
}

export class CmsMemoryCache implements CmsCacheAdapter {
  private readonly entries = new Map<string, TaggedCacheEntry<unknown>>();

  private readonly tagIndex = new Map<string, Set<string>>();

  async get<T>(key: string): Promise<CmsCacheEntry<T> | null> {
    const entry = this.entries.get(key);
    if (!entry) return null;

    if (isExpired(entry)) {
      await this.delete(key);
      return null;
    }

    return entry as CmsCacheEntry<T>;
  }

  async set<T>(key: string, entry: CmsCacheEntry<T>): Promise<void> {
    const taggedEntry: TaggedCacheEntry<T> = {
      ...entry,
      tags: entry.tags ?? [],
    };

    this.entries.set(key, taggedEntry);

    for (const tag of taggedEntry.tags) {
      const keys = this.tagIndex.get(tag) ?? new Set<string>();
      keys.add(key);
      this.tagIndex.set(tag, keys);
    }
  }

  async delete(key: string): Promise<void> {
    const entry = this.entries.get(key);
    if (!entry) return;

    this.entries.delete(key);
    for (const tag of entry.tags) {
      const keys = this.tagIndex.get(tag);
      if (!keys) continue;

      keys.delete(key);
      if (keys.size === 0) {
        this.tagIndex.delete(tag);
      }
    }
  }

  async invalidateTags(tags: readonly string[]): Promise<void> {
    const keysToDelete = new Set<string>();

    for (const tag of tags) {
      const keys = this.tagIndex.get(tag);
      if (!keys) continue;

      for (const key of keys) {
        keysToDelete.add(key);
      }
    }

    await Promise.all([...keysToDelete].map((key) => this.delete(key)));
  }

  async clear(): Promise<void> {
    this.entries.clear();
    this.tagIndex.clear();
  }
}

export function createCmsCacheKey(method: string, url: string): string {
  return `${method.toUpperCase()}:${url}`;
}
