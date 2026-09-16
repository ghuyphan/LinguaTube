import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

/**
 * Supabase Service
 * Singleton service managing Supabase client connection, authentication session,
 * and offline/online status tracking.
 */
@Injectable({
    providedIn: 'root'
})
export class SupabaseService {
    private static getStorageKey(): string {
        try {
            if (environment.supabaseUrl) {
                const host = new URL(environment.supabaseUrl).hostname;
                const ref = host.split('.')[0];
                return `sb-${ref}-auth-token`;
            }
        } catch {
            // Ignore URL parse error
        }
        return 'sb-edbkvzviqeulwzcnrrlb-auth-token';
    }

    private static getStoredSession(): Session | null {
        if (typeof window === 'undefined' || !window.localStorage) return null;
        try {
            const key = SupabaseService.getStorageKey();
            let raw = localStorage.getItem(key);
            if (!raw) {
                // Fallback: scan for any Supabase auth token
                for (let i = 0; i < localStorage.length; i++) {
                    const k = localStorage.key(i);
                    if (k && k.startsWith('sb-') && k.endsWith('-auth-token')) {
                        raw = localStorage.getItem(k);
                        break;
                    }
                }
            }
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed?.access_token && parsed?.user) {
                    return parsed as Session;
                }
            }
        } catch {
            return null;
        }
        return null;
    }

    private initialSession = SupabaseService.getStoredSession();

    /** Current authenticated Supabase session */
    readonly session = signal<Session | null>(this.initialSession);

    /** Current authenticated Supabase user */
    readonly user = signal<User | null>(this.initialSession?.user ?? null);

    /** Whether Supabase is initialized and ready */
    readonly isReady = signal(true);

    /** Whether we have network connectivity */
    readonly isOnline = signal(typeof navigator !== 'undefined' ? navigator.onLine : true);

    /** Emits when network connection is restored after being offline */
    readonly reconnectEvent = new Subject<void>();

    private supabaseClient: SupabaseClient;

    constructor() {
        const storageKey = SupabaseService.getStorageKey();
        this.supabaseClient = createClient(
            environment.supabaseUrl,
            environment.supabaseAnonKey,
            {
                auth: {
                    persistSession: true,
                    autoRefreshToken: true,
                    detectSessionInUrl: true,
                    storageKey,
                    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
                }
            }
        );

        this.setupAuthListener();
        this.setupNetworkListeners();
    }

    /**
     * SupabaseClient instance
     */
    get client(): SupabaseClient {
        return this.supabaseClient;
    }

    /**
     * Current user ID if authenticated
     */
    get userId(): string | null {
        return this.user()?.id ?? null;
    }

    /**
     * Get current JWT access token for API calls
     */
    getToken(): string | null {
        const sess = this.session();
        if (!sess?.access_token) return null;
        // If session is expired, trigger background refresh and return null
        if (sess.expires_at && sess.expires_at * 1000 < Date.now()) {
            void this.refreshAuth();
            return null;
        }
        return sess.access_token;
    }

    /**
     * Check if user is authenticated with a valid session
     */
    isAuthenticated(): boolean {
        return this.session() !== null;
    }

    /**
     * Wait for initialization (ready immediately with synchronous client)
     */
    async waitForReady(): Promise<void> {
        // Supabase client initializes synchronously, but we can verify session
        if (!this.session()) {
            const { data } = await this.supabaseClient.auth.getSession();
            if (data?.session) {
                this.session.set(data.session);
                this.user.set(data.session.user);
            }
        }
    }

    private refreshPromise: Promise<boolean> | null = null;

    /**
     * Refresh auth session with mutex deduplication to prevent GoTrue token reuse revocation
     */
    async refreshAuth(): Promise<boolean> {
        if (this.refreshPromise) {
            return this.refreshPromise;
        }
        this.refreshPromise = (async () => {
            try {
                const { data, error } = await this.supabaseClient.auth.refreshSession();
                if (error || !data.session) {
                    return false;
                }
                this.session.set(data.session);
                this.user.set(data.session.user);
                return true;
            } catch (err) {
                console.warn('[SupabaseService] Session refresh failed:', err);
                return false;
            } finally {
                this.refreshPromise = null;
            }
        })();
        return this.refreshPromise;
    }

    /**
     * Check if a stored session exists in localStorage
     */
    hasStoredSession(): boolean {
        return SupabaseService.getStoredSession() !== null;
    }

    /**
     * Clear auth session (sign out)
     */
    async clearAuth(): Promise<void> {
        try {
            await this.supabaseClient.auth.signOut();
        } catch (err) {
            console.warn('[SupabaseService] Sign out error:', err);
        } finally {
            this.session.set(null);
            this.user.set(null);
            try {
                if (typeof window !== 'undefined' && window.localStorage) {
                    localStorage.removeItem(SupabaseService.getStorageKey());
                }
            } catch {
                // Ignore storage access issues
            }
        }
    }

    /**
     * Setup reactive auth state listener
     */
    private setupAuthListener(): void {
        // Initial session check
        this.supabaseClient.auth.getSession().then(({ data }) => {
            if (data?.session) {
                this.session.set(data.session);
                this.user.set(data.session.user);
            }
        }).catch(err => {
            console.warn('[SupabaseService] Error checking initial session:', err);
        });

        // Listen for real-time auth changes
        this.supabaseClient.auth.onAuthStateChange((event, session) => {
            this.session.set(session);
            this.user.set(session?.user || null);

            if (event === 'SIGNED_OUT') {
                this.session.set(null);
                this.user.set(null);
            }
        });
    }

    /**
     * Setup network connectivity listeners
     */
    private setupNetworkListeners(): void {
        if (typeof window !== 'undefined') {
            window.addEventListener('online', () => {
                this.isOnline.set(true);
                this.refreshAuth();
                this.reconnectEvent.next();
            });
            window.addEventListener('offline', () => {
                this.isOnline.set(false);
            });
        }
    }
}
