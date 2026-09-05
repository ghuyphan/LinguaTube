import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    /**
     * Get item from local storage
     */
    get<T>(key: string): T | null {
        try {
            const stored = localStorage.getItem(key);
            if (!stored) return null;
            return JSON.parse(stored) as T;
        } catch (error) {
            console.error(`[Storage] Error reading key "${key}":`, error);
            return null;
        }
    }

    /**
     * Set item to local storage
     */
    set<T>(key: string, value: T): boolean {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            if (this.isQuotaExceededError(error)) {
                console.warn(`[Storage] Quota exceeded while writing to "${key}"`);
                // We could implement cleanup logic here if needed,
                // or emit an event for the application to handle.
                this.handleQuotaExceeded();
            } else {
                console.error(`[Storage] Error writing key "${key}":`, error);
            }
            return false;
        }
    }

    /**
     * Remove item from local storage
     */
    remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`[Storage] Error removing key "${key}":`, error);
        }
    }

    /**
     * Clear all items
     */
    clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('[Storage] Error clearing storage:', error);
        }
    }

    /**
     * Check if exists
     */
    has(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }

    /**
     * Handle Quota Exceeded
     * (Placeholder for future implementation - e.g. clear generic caches)
     */
    private handleQuotaExceeded(): void {
        // In future: Inject specific services to request cleanup? 
        // Or simply clear non-critical keys?
    }

    private isQuotaExceededError(e: unknown): boolean {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
            // Firefox
            (e.code === 1014 && e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
        );
    }
}
