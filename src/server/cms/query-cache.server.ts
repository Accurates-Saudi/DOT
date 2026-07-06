const inflight = new Map<string, Promise<unknown>>();

/**
 * Coalesce identical in-flight read queries within the same process.
 * Safe for published/archived CMS reads that are identical across callers.
 */
export function dedupeInflight<T>(key: string, fn: () => Promise<T>): Promise<T> {
  const existing = inflight.get(key);
  if (existing) {
    return existing as Promise<T>;
  }

  const promise = fn().finally(() => {
    inflight.delete(key);
  });

  inflight.set(key, promise);
  return promise;
}
