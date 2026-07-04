export type CmsOptimisticUpdater<T> = T | ((current: T) => T);

export interface CmsOptimisticState<T> {
  committed: T;
  optimistic: T;
  pendingMutationIds: string[];
}

function resolveUpdater<T>(current: T, updater: CmsOptimisticUpdater<T>): T {
  return typeof updater === "function"
    ? (updater as (value: T) => T)(current)
    : updater;
}

export function createCmsOptimisticState<T>(value: T): CmsOptimisticState<T> {
  return {
    committed: value,
    optimistic: value,
    pendingMutationIds: [],
  };
}

export function beginCmsOptimisticUpdate<T>(
  state: CmsOptimisticState<T>,
  updater: CmsOptimisticUpdater<T>,
  mutationId = crypto.randomUUID(),
): CmsOptimisticState<T> {
  return {
    ...state,
    optimistic: resolveUpdater(state.optimistic, updater),
    pendingMutationIds: [...state.pendingMutationIds, mutationId],
  };
}

export function commitCmsOptimisticUpdate<T>(
  state: CmsOptimisticState<T>,
  value: T,
  mutationId: string,
): CmsOptimisticState<T> {
  return {
    committed: value,
    optimistic: value,
    pendingMutationIds: state.pendingMutationIds.filter((id) => id !== mutationId),
  };
}

export function rollbackCmsOptimisticUpdate<T>(
  state: CmsOptimisticState<T>,
  mutationId: string,
): CmsOptimisticState<T> {
  return {
    committed: state.committed,
    optimistic: state.committed,
    pendingMutationIds: state.pendingMutationIds.filter((id) => id !== mutationId),
  };
}
