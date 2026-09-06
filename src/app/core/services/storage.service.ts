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
                this.handleQuotaExceeded();
                // Retry once after eviction
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch (retryError) {
                    console.error(`[Storage] Write failed after quota eviction for "${key}":`, retryError);
                }
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
        try {
            return localStorage.getItem(key) !== null;
        } catch {
            return false;
        }
    }

    /**
     * Handle Quota Exceeded by purging non-critical transient caches
     */
    private handleQuotaExceeded(): void {
        try {
            const nonCriticalKeys = [
                'linguatube_dict_cache',
                'linguatube_tokens',
                'lingvatranslate_cache',
                'linguatube_translations'
            ];
            for (const k of nonCriticalKeys) {
                localStorage.removeItem(k);
            }
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const k = localStorage.key(i);
                if (k && (k.startsWith('linguatube-recent-searches') || k.includes('_cache'))) {
                    localStorage.removeItem(k);
                }
            }
            console.warn('[Storage] Non-critical caches evicted to free localStorage space');
        } catch (err) {
            console.error('[Storage] Failed to evict caches on quota exceeded:', err);
        }
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
