const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

interface RateLimitEntry {
  count: number;
  windowStartedAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function pruneExpiredEntries(now: number) {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now - entry.windowStartedAt >= RATE_LIMIT_WINDOW_MS) {
      rateLimitStore.delete(key);
    }
  }
}

export function assertFormRateLimit(
  scope: string,
  ipAddress?: string,
  message = "Too many form submissions. Please try again later.",
): void {
  const key = `${scope}:${ipAddress?.trim() || "unknown"}`;
  const now = Date.now();

  pruneExpiredEntries(now);

  const current = rateLimitStore.get(key);

  if (!current || now - current.windowStartedAt >= RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, windowStartedAt: now });
    return;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    throw new ContactRateLimitError(message);
  }

  current.count += 1;
  rateLimitStore.set(key, current);
}

export function assertContactRateLimit(ipAddress?: string): void {
  assertFormRateLimit(
    "contact",
    ipAddress,
    "Too many contact form submissions. Please try again later.",
  );
}

export function assertFeedbackRateLimit(ipAddress?: string): void {
  assertFormRateLimit(
    "feedback",
    ipAddress,
    "Too many feedback submissions. Please try again later.",
  );
}

export class ContactRateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactRateLimitError";
  }
}
