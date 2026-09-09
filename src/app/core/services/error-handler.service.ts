import { ErrorHandler, Injectable, inject, Injector, NgZone } from '@angular/core';
import { ToastService } from './toast.service';
import { I18nService } from './i18n.service';

/**
 * Global Error Handler
 * 
 * Catches all uncaught exceptions in the application and handles them gracefully.
 * - Logs errors to console in development
 * - Handles specific error types (ChunkLoadError for lazy loading failures)
 * - Could be extended to send errors to a monitoring service
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    private ngZone = inject(NgZone);
    private toast = inject(ToastService);
    private injector = inject(Injector);

    private get i18n(): I18nService {
        return this.injector.get(I18nService);
    }

    handleError(error: unknown): void {
        // Always log to console for debugging
        console.error('Unhandled error:', error);

        // Extract error message
        const message = this.extractMessage(error);

        // Handle specific error types
        this.ngZone.run(() => {
            // Handle lazy loading / chunk load failures safely
            if (message.includes('ChunkLoadError') || message.includes('Loading chunk')) {
                console.warn('Chunk load error detected, attempting safe recovery...');
                const reloadKey = 'voca_chunk_reload_ts';
                const now = Date.now();
                const lastAttempt = parseInt(sessionStorage.getItem(reloadKey) || '0', 10);

                // Guard against infinite reload loop (only reload if previous attempt > 15s ago)
                if (now - lastAttempt > 15000) {
                    sessionStorage.setItem(reloadKey, String(now));
                    if (typeof window === 'undefined') {
                        return;
                    }
                    if (typeof caches !== 'undefined' && caches?.keys) {
                        caches.keys()
                            .then(names => Promise.all(names.map(name => caches.delete(name))))
                            .catch(err => console.warn('Cache clear error:', err))
                            .finally(() => {
                                location.reload();
                            });
                    } else {
                        location.reload();
                    }
                    return;
                }

                console.error('Repeated chunk load errors detected. Aborting reload loop to prevent lockup.');
                this.toast.error(this.i18n.t('common.chunkLoadError'));
                return;
            }

            // Handle network errors
            if (message.includes('NetworkError') || message.includes('Failed to fetch')) {
                console.warn('Network error detected');
                this.toast.error(this.i18n.t('subtitle.networkErrorTitle'));
                return;
            }

            // Handle HTTP errors that weren't caught by interceptors
            if (message.includes('Http failure')) {
                console.warn('HTTP error not caught by interceptor');
                return;
            }
        });
    }

    private extractMessage(error: unknown): string {
        if (error instanceof Error) {
            return error.message;
        }
        if (typeof error === 'string') {
            return error;
        }
        if (error && typeof error === 'object' && 'message' in error) {
            return String((error as { message: unknown }).message);
        }
        return String(error);
    }
}
