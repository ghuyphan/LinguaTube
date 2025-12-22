import { HttpInterceptorFn, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, shareReplay, finalize } from 'rxjs/operators';

/**
 * HTTP Caching Interceptor
 * - Caches GET requests for dictionary APIs only
 * - Request deduplication for concurrent identical requests
 * 
 * Note: Retry logic is handled by individual services (TranscriptService, etc.)
 */

// Cache configuration
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Patterns to cache (dictionary lookups only - these are safe to cache)
const CACHEABLE_PATTERNS = [
    '/api/mdbg',
    '/api/krdict',
    '/proxy/jotoba'
];

// Cache storage
interface CacheEntry {
    response: HttpResponse<unknown>;
    timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const pendingRequests = new Map<string, Observable<HttpEvent<unknown>>>();

function isCacheable(url: string): boolean {
    return CACHEABLE_PATTERNS.some(pattern => url.includes(pattern));
}

function getCacheKey(url: string): string {
    return url;
}

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
    // Only cache GET requests to specific dictionary endpoints
    if (req.method !== 'GET' || !isCacheable(req.url)) {
        // Pass through all other requests without modification
        return next(req);
    }

    const cacheKey = getCacheKey(req.urlWithParams);

    // Check cache first
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return of(cached.response.clone());
    }

    // Check if there's already a pending request for this URL (deduplication)
    if (pendingRequests.has(cacheKey)) {
        return pendingRequests.get(cacheKey)!;
    }

    // Make the request
    const request$ = next(req).pipe(
        tap(event => {
            if (event instanceof HttpResponse) {
                // Only cache successful responses
                if (event.status >= 200 && event.status < 300) {
                    cache.set(cacheKey, {
                        response: event.clone(),
                        timestamp: Date.now()
                    });
                }
            }
        }),
        shareReplay(1),
        finalize(() => pendingRequests.delete(cacheKey))
    );

    pendingRequests.set(cacheKey, request$);

    return request$;
};
