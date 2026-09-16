import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SupabaseService } from '../core/services/supabase.service';

/**
 * HTTP Auth Interceptor
 * Automatically attaches Supabase Bearer access token to internal /api/ requests
 * and handles 401 Unauthorized responses gracefully.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const supabase = inject(SupabaseService);

    let authReq = req;

    // Attach auth token to internal /api/ endpoints that require or benefit from user identity
    const requiresAuth = req.url.startsWith('/api/transcript') ||
        req.url.startsWith('/api/diamonds') ||
        req.url.startsWith('/api/leaderboard') ||
        req.url.startsWith('/api/payment/') ||
        req.url.startsWith('/api/dual-subtitles') ||
        req.url.startsWith('/api/tokenize') ||
        req.url.startsWith('/api/translate');

    if (requiresAuth && !req.headers.has('Authorization')) {
        try {
            const token = supabase.getToken();
            if (token) {
                authReq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        } catch {
            // Service not available or injection context missing
        }
    }

    return next(authReq).pipe(
        catchError((error: unknown) => {
            if (error instanceof HttpErrorResponse && error.status === 401 && authReq.headers.has('Authorization')) {
                console.warn('[AuthInterceptor] 401 Unauthorized received for', req.url);
                // Proactively attempt session refresh if online; NEVER force destructive signOut when offline
                if (typeof navigator === 'undefined' || navigator.onLine) {
                    supabase.refreshAuth().catch(err => {
                        console.warn('[AuthInterceptor] Session refresh failed, keeping local offline state intact:', err);
                    });
                }
            }
            return throwError(() => error);
        })
    );
};
