import { Injectable, signal } from '@angular/core';
import type PocketBase from 'pocketbase';
import type { AuthModel } from 'pocketbase';
import { environment } from '../../../environments/environment';

// PocketBase uses this key by default for localStorage
const PB_AUTH_KEY = 'pocketbase_auth';

/**
 * PocketBase Service
 * Singleton service managing PocketBase client connection
 * Lazy loads the PocketBase SDK to reduce initial bundle size
 */
@Injectable({
    providedIn: 'root'
})
export class PocketBaseService {
    private pb: PocketBase | null = null;
    private pbPromise: Promise<PocketBase> | null = null;
    private initPromise: Promise<void> | null = null;
    private refreshTimer: ReturnType<typeof setInterval> | null = null;

    /** Current authenticated user model */
    readonly model = signal<AuthModel | null>(null);

    /** Whether PocketBase is initialized and ready */
    readonly isReady = signal(false);

    /** Whether we have network connectivity */
    readonly isOnline = signal(true);

    constructor() {
        // Start initialization
        this.initPromise = this.initialize();
        // Start token refresh scheduler
        this.startTokenRefreshScheduler();
        // Listen for online/offline events
        this.setupNetworkListeners();
    }

    /**
     * Schedule proactive token refresh every 10 minutes
     */
    private startTokenRefreshScheduler(): void {
        // Check and refresh token every 10 minutes
        this.refreshTimer = setInterval(() => {
            this.refreshAuthIfNeeded();
        }, 10 * 60 * 1000); // 10 minutes
    }

    /**
     * Refresh auth token if it's valid but approaching expiration
     */
    private async refreshAuthIfNeeded(): Promise<void> {
        if (!this.pb || !this.pb.authStore.isValid) {
            return;
        }

        try {
            await this.pb.collection('users').authRefresh();
            console.log('[PocketBase] Token refreshed proactively');
        } catch (error) {
            console.warn('[PocketBase] Proactive token refresh failed:', error);
            // Don't clear auth here - let the user continue until actual failure
        }
    }

    /**
     * Setup network connectivity listeners
     */
    private setupNetworkListeners(): void {
        if (typeof window !== 'undefined') {
            window.addEventListener('online', () => {
                this.isOnline.set(true);
                console.log('[PocketBase] Network: online');
                // Try to refresh auth when coming back online
                this.refreshAuthIfNeeded();
            });
            window.addEventListener('offline', () => {
                this.isOnline.set(false);
                console.log('[PocketBase] Network: offline');
            });
        }
    }

    /**
     * Initialize - check for stored auth and load PB if needed
     */
    private async initialize(): Promise<void> {
        // Check if there's a stored PocketBase auth token
        // PocketBase SDK stores auth in localStorage with key 'pocketbase_auth'
        const storedAuth = localStorage.getItem(PB_AUTH_KEY);
        if (storedAuth) {
            // There's stored auth, so initialize PocketBase to restore session
            try {
                await this.getClient();
            } catch (e) {
                console.error('[PocketBase] Failed to restore auth:', e);
            }
        }
        this.isReady.set(true);
    }

    /**
     * Wait for initialization to complete
     */
    async waitForReady(): Promise<void> {
        if (this.initPromise) {
            await this.initPromise;
        }
    }

    /**
     * Lazy load and get the PocketBase client instance
     */
    async getClient(): Promise<PocketBase> {
        if (this.pb) {
            return this.pb;
        }

        if (this.pbPromise) {
            return this.pbPromise;
        }

        this.pbPromise = this.initClient();
        return this.pbPromise;
    }

    /**
     * Initialize the PocketBase client
     */
    private async initClient(): Promise<PocketBase> {
        // Dynamic import to lazy load PocketBase
        const PocketBaseModule = await import('pocketbase');
        const PocketBase = PocketBaseModule.default;

        this.pb = new PocketBase(environment.pocketbaseUrl || 'https://voca.pockethost.io');

        // PocketBase automatically restores auth from localStorage
        // Sync our signal with the current state
        this.model.set(this.pb.authStore.model);

        // Listen for auth state changes
        this.pb.authStore.onChange((token, model) => {
            this.model.set(model);
        });

        return this.pb;
    }

    /**
     * Get the synchronous client (may be null if not initialized)
     */
    get client(): PocketBase | null {
        return this.pb;
    }

    /**
     * Get current auth token
     * Returns null if not authenticated or token is invalid
     */
    getToken(): string | null {
        if (!this.pb) {
            // PocketBase not initialized yet, try to get from localStorage directly
            const storedAuth = localStorage.getItem(PB_AUTH_KEY);
            if (storedAuth) {
                try {
                    const parsed = JSON.parse(storedAuth);
                    return parsed.token || null;
                } catch {
                    return null;
                }
            }
            return null;
        }

        if (!this.pb.authStore.isValid) {
            return null;
        }
        return this.pb.authStore.token;
    }

    /**
     * Check if user is authenticated with valid token
     */
    isAuthenticated(): boolean {
        if (!this.pb) {
            // Check localStorage fallback
            const storedAuth = localStorage.getItem(PB_AUTH_KEY);
            return !!storedAuth;
        }
        return this.pb.authStore.isValid;
    }

    /**
     * Refresh auth token
     * PocketBase SDK normally handles this automatically,
     * but this can be called manually if needed
     */
    async refreshAuth(): Promise<boolean> {
        try {
            const client = await this.getClient();
            if (!client.authStore.isValid) {
                return false;
            }
            await client.collection('users').authRefresh();
            return true;
        } catch (error) {
            console.error('[PocketBase] Auth refresh failed:', error);
            this.pb?.authStore.clear();
            return false;
        }
    }

    /**
     * Clear auth state (logout)
     */
    clearAuth(): void {
        // Stop refresh timer
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
            this.refreshTimer = null;
        }
        this.pb?.authStore.clear();
        this.model.set(null);
        // Also clear from localStorage in case PB didn't
        localStorage.removeItem(PB_AUTH_KEY);
    }
}
