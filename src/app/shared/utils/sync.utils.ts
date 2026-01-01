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
 * Create a debounced function
 */
export function debounce<T extends (...args: unknown[]) => void>(
    fn: T,
    delayMs: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
            timeoutId = null;
        }, delayMs);
    };
}
