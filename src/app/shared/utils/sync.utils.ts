/**
 * Sync Utilities
 * 
 * Generic merge and batch operations for syncing data with PocketBase
 * Eliminates duplicate code in sync.service.ts for vocabulary and history
 */

/**
 * Generic merge function for timestamp-based sync
 * Works with any entity that has a unique key
 */
export function mergeByTimestamp<T>(
    local: T[],
    remote: T[],
    getKey: (item: T) => string,
    getTimestamp: (item: T) => number
): T[] {
    const merged = new Map<string, T>();

    // Add all local items first
    for (const item of local) {
        merged.set(getKey(item), item);
    }

    // Merge remote items, preferring newer versions
    for (const item of remote) {
        const key = getKey(item);
        const existing = merged.get(key);

        if (!existing) {
            // Remote item doesn't exist locally - add it
            merged.set(key, item);
        } else {
            // Both exist - compare timestamps
            const remoteTime = getTimestamp(item);
            const localTime = getTimestamp(existing);

            if (remoteTime > localTime) {
                merged.set(key, item);
            }
        }
    }

    return Array.from(merged.values());
}

/**
 * Calculate a simple hash for change detection
 */
export function calculateHash<T>(
    items: T[],
    getFields: (item: T) => string
): string {
    return items.map(getFields).join('|');
}

/**
 * Async batch processor with configurable parallelism
 */
export async function processBatch<T, R>(
    items: T[],
    processor: (item: T) => Promise<R>,
    batchSize: number = 10
): Promise<R[]> {
    const results: R[] = [];

    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        const batchResults = await Promise.all(batch.map(processor));
        results.push(...batchResults);
    }

    return results;
}

/**
 * Retry with exponential backoff
 */
export async function withRetry<T>(
    operation: () => Promise<T>,
    options: {
        maxRetries?: number;
        baseDelayMs?: number;
        shouldRetry?: (error: unknown) => boolean;
    } = {}
): Promise<T> {
    const {
        maxRetries = 3,
        baseDelayMs = 1000,
        shouldRetry = isNetworkError
    } = options;

    let lastError: unknown;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await operation();
        } catch (error) {
            lastError = error;

            const isLast = attempt === maxRetries - 1;
            if (isLast || !shouldRetry(error)) {
                throw error;
            }

            // Exponential backoff: 1s, 2s, 4s
            const delay = Math.pow(2, attempt) * baseDelayMs;
            await sleep(delay);
        }
    }

    throw lastError;
}

/**
 * Check if error is a network error (retryable)
 */
function isNetworkError(error: unknown): boolean {
    if (error instanceof Error) {
        return error.message.includes('fetch') ||
            error.message.includes('network') ||
            error.message.includes('Failed to fetch');
    }
    if (typeof error === 'object' && error !== null && 'status' in error) {
        return (error as { status: number }).status === 0;
    }
    return false;
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Sanitize values for PocketBase filter strings to prevent injection
 */
export function sanitizeFilterValue(value: string): string {
    return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/**
 * Generates a deterministic 15-character lowercase alphanumeric ID conforming to PocketBase requirements (^[a-z0-9]{15}$)
 * Uses cyrb53 hash mixing to generate high-entropy base36 IDs from arbitrary inputs.
 */
export function generateDeterministicRecordId(...keys: string[]): string {
    const raw = keys.map(k => (k || '').trim()).join('|');
    let h1 = 0xdeadbeef;
    let h2 = 0x41c64e6d;
    for (let i = 0; i < raw.length; i++) {
        const ch = raw.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    const h3 = Math.imul(h1 ^ h2, 2166136261);

    const p1 = (h1 >>> 0).toString(36).padStart(7, '0');
    const p2 = (h2 >>> 0).toString(36).padStart(7, '0');
    const p3 = (h3 >>> 0).toString(36).padStart(7, '0');
    return (p1 + p2 + p3).slice(0, 15);
}
