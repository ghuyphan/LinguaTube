import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PocketBaseService } from '../core/services/pocketbase.service';

/**
 * HTTP Auth Interceptor
 * Automatically attaches PocketBase Bearer token to internal /api/ requests
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // Only attach auth token to internal /api/ endpoints if not already set
    if (req.url.startsWith('/api/') && !req.headers.has('Authorization')) {
        try {
            const pb = inject(PocketBaseService);
            const token = pb.getToken();
            if (token) {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        } catch {
            // Service not available or injection context missing
        }
    }

    return next(req);
};
