import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { SupabaseService } from '../core/services/supabase.service';

/**
 * HTTP Auth Interceptor
 * Automatically attaches Supabase Bearer access token to internal /api/ requests
 * and handles 401 Unauthorized responses with proactive token refresh and retry.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const supabase = inject(SupabaseService);

    // Attach auth token to internal /api/ endpoints that require or benefit from user identity
    const requiresAuth = req.url.startsWith('/api/transcript') ||
        req.url.startsWith('/api/diamonds') ||
        req.url.startsWith('/api/leaderboard') ||
        req.url.startsWith('/api/payment/') ||
        req.url.startsWith('/api/dual-subtitles') ||
        req.url.startsWith('/api/tokenize') ||
        req.url.startsWith('/api/translate');

    if (!requiresAuth || req.headers.has('Authorization')) {
        return next(req);
    }

    const attachToken = (token: string | null) => {
        return token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
    };

    const sendWithRetry = (initialToken: string | null) => {
        const authReq = attachToken(initialToken);
        return next(authReq).pipe(
            catchError((error: unknown) => {
                if (error instanceof HttpErrorResponse && error.status === 401 && (typeof navigator === 'undefined' || navigator.onLine)) {
                    console.warn('[AuthInterceptor] 401 Unauthorized received for', req.url, '- attempting token refresh and retry');
                    return from(supabase.refreshAuth()).pipe(
                        switchMap((refreshed) => {
                            if (refreshed) {
                                const newToken = supabase.getToken();
                                return next(attachToken(newToken));
                            }
                            return throwError(() => error);
                        })
                    );
                }
                return throwError(() => error);
            })
        );
    };

    // If session exists but is expired or near expiry (<30s), await refresh before dispatching
    const sess = supabase.session();
    if (sess?.access_token && sess.expires_at && (sess.expires_at * 1000 - Date.now() < 30000)) {
        return from(supabase.refreshAuth()).pipe(
            switchMap(() => sendWithRetry(supabase.getToken()))
        );
    }

    return sendWithRetry(supabase.getToken());
};
