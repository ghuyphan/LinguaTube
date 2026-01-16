import { ErrorHandler, Injectable, inject, NgZone } from '@angular/core';

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

    handleError(error: unknown): void {
        // Always log to console for debugging
        console.error('Unhandled error:', error);

        // Extract error message
        const message = this.extractMessage(error);

        // Handle specific error types
        this.ngZone.run(() => {
            // Handle lazy loading / chunk load failures
            if (message.includes('ChunkLoadError') || message.includes('Loading chunk')) {
                console.warn('Chunk load error detected, reloading app...');
                // Clear service worker cache and reload
                if ('caches' in window) {
                    caches.keys().then(names => {
                        names.forEach(name => caches.delete(name));
                    });
                }
                window.location.reload();
                return;
            }

            // Handle network errors
            if (message.includes('NetworkError') || message.includes('Failed to fetch')) {
                console.warn('Network error detected');
                // Could show a toast notification here
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
