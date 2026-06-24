/**
 * Content loading abstraction.
 * Static loaders today; swap for CMS API loaders when admin backend is added.
 */

export type ContentLoader<T> = () => T | Promise<T>;

export function createStaticLoader<T>(data: T): ContentLoader<T> {
  return () => data;
}

export async function resolveContent<T>(loader: ContentLoader<T>): Promise<T> {
  return loader();
}

/** Future: createCMSLoader<T>(endpoint, options) => fetch from admin API */
