import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, of, throwError, timer } from 'rxjs';
import { shareReplay, tap, timeout, retryWhen, mergeMap, finalize } from 'rxjs/operators';

/**
 * HTTP Caching & Retry Interceptor
 * - Caches GET requests for dictionary/transcript APIs
 * - Adds retry with exponential backoff for failed requests
 * - Adds request timeout (10s)
 */

// Cache configuration
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const REQUEST_TIMEOUT_MS = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

// Patterns to cache
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

// Cache cleanup (every 5 minutes, remove expired entries)
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
        if (now - entry.timestamp > CACHE_TTL_MS) {
            cache.delete(key);
        }
    }
}, CACHE_TTL_MS);

function isCacheable(url: string): boolean {
    return CACHEABLE_PATTERNS.some(pattern => url.includes(pattern));
}

function getCacheKey(req: HttpRequest<unknown>): string {
    return `${req.method}:${req.urlWithParams}`;
}

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
    // Only cache GET requests to specific endpoints
    if (req.method !== 'GET' || !isCacheable(req.url)) {
        return next(req).pipe(
            timeout(REQUEST_TIMEOUT_MS),
            retryWhen(errors =>
                errors.pipe(
                    mergeMap((error, i) => {
                        const retryAttempt = i + 1;
                        if (retryAttempt > MAX_RETRIES) {
                            return throwError(() => error);
                        }
                        const delay = RETRY_DELAY_MS * Math.pow(2, i);
                        console.log(`[HTTP] Retry attempt ${retryAttempt} after ${delay}ms`);
                        return timer(delay);
                    })
                )
            )
        );
    }

    const cacheKey = getCacheKey(req);

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
        timeout(REQUEST_TIMEOUT_MS),
        retryWhen(errors =>
            errors.pipe(
                mergeMap((error, i) => {
                    const retryAttempt = i + 1;
                    if (retryAttempt > MAX_RETRIES) {
                        return throwError(() => error);
                    }
                    const delay = RETRY_DELAY_MS * Math.pow(2, i);
                    return timer(delay);
                })
            )
        ),
        tap(event => {
            if (event instanceof HttpResponse) {
                cache.set(cacheKey, {
                    response: event.clone(),
                    timestamp: Date.now()
                });
            }
        }),
        shareReplay(1),
        finalize(() => pendingRequests.delete(cacheKey))
    );

    pendingRequests.set(cacheKey, request$);

    return request$;
};
