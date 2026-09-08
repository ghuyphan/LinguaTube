import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { PocketBaseService } from '../core/services/pocketbase.service';
import { AuthService } from '../core/services/auth.service';

/**
 * HTTP Auth Interceptor
 * Automatically attaches PocketBase Bearer token to internal /api/ requests
 * and handles 401 Unauthorized responses gracefully.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const pb = inject(PocketBaseService);
    const auth = inject(AuthService);

    let authReq = req;

    // Only attach auth token to internal /api/ endpoints if not already set
    if (req.url.startsWith('/api/') && !req.headers.has('Authorization')) {
        try {
            const token = pb.getToken();
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
                console.warn('[AuthInterceptor] 401 Unauthorized received for', req.url, '- signing out');
                auth.signOut();
            }
            return throwError(() => error);
        })
    );
};
