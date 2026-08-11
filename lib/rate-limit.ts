// Dependency-free in-memory sliding-window rate limiter.
//
// Deliberately not Upstash/Redis: nothing in this project provisions one, and a
// marketing contact form does not justify a new hosted dependency. The trade-off
// is that counters live per serverless instance — Vercel runs several
// concurrently and recycles them on cold start, so the real-world ceiling is
// roughly (limit x live instances) rather than an exact global number. That
// still turns "unbounded" into "bounded", which is the point. If the form ever
// needs an exact ceiling, swap the internals here for @upstash/ratelimit; the
// call sites don't change.

export type RateLimitVerdict = {
  allowed: boolean;
  /** Milliseconds until the caller may retry. Zero when allowed. */
  retryAfterMs: number;
};

export type RateLimiter = (key: string) => RateLimitVerdict;

// Bounds memory if we are ever hit with a flood of distinct keys.
const MAX_TRACKED_KEYS = 5000;

export function createRateLimiter(limit: number, windowMs: number): RateLimiter {
  const hitsByKey = new Map<string, number[]>();

  function sweep(now: number) {
    const cutoff = now - windowMs;
    for (const [key, hits] of hitsByKey) {
      const live = hits.filter((at) => at > cutoff);
      if (live.length === 0) hitsByKey.delete(key);
      else hitsByKey.set(key, live);
    }
    // Hard ceiling in case a flood of distinct keys survives the sweep. Map
    // iterates in insertion order, so this evicts the longest-lived entries.
    while (hitsByKey.size > MAX_TRACKED_KEYS) {
      const oldest = hitsByKey.keys().next();
      if (oldest.done) break;
      hitsByKey.delete(oldest.value);
    }
  }

  return function check(key: string): RateLimitVerdict {
    const now = Date.now();
    if (hitsByKey.size >= MAX_TRACKED_KEYS) sweep(now);

    const cutoff = now - windowMs;
    const hits = (hitsByKey.get(key) ?? []).filter((at) => at > cutoff);

    if (hits.length >= limit) {
      hitsByKey.set(key, hits);
      // The window frees a slot once the oldest hit ages out.
      return { allowed: false, retryAfterMs: Math.max(0, hits[0] + windowMs - now) };
    }

    hits.push(now);
    hitsByKey.set(key, hits);
    return { allowed: true, retryAfterMs: 0 };
  };
}
