import { HttpInterceptorFn } from '@angular/common/http';
import { timeout, catchError, throwError } from 'rxjs';

/**
 * HTTP Timeout Interceptor
 * Prevents requests from hanging indefinitely
 */

// Default timeout for most API calls
const DEFAULT_TIMEOUT_MS = 30000; // 30 seconds

// Longer timeout for AI transcription (Gladia can take up to 2 minutes)
const WHISPER_TIMEOUT_MS = 120000; // 2 minutes

export const timeoutInterceptor: HttpInterceptorFn = (req, next) => {
    // Determine timeout based on endpoint
    const timeoutMs = req.url.includes('/api/whisper')
        ? WHISPER_TIMEOUT_MS
        : DEFAULT_TIMEOUT_MS;

    return next(req).pipe(
        timeout(timeoutMs),
        catchError(err => {
            if (err.name === 'TimeoutError') {
                console.error(`[HTTP] Request timeout after ${timeoutMs}ms:`, req.url);
                return throwError(() => new Error(`Request timeout: ${req.url}`));
            }
            return throwError(() => err);
        })
    );
};
