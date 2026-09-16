import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Subject } from 'rxjs';
import { SupabaseService } from './supabase.service';
import type { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    picture: string;
    subscriptionTier?: 'free' | 'pro' | 'premium';
    subscriptionExpires?: Date;
    diamonds?: number;
}

type OAuthPopup = Window | null;

const PROFILE_CACHE_KEY = 'voca_user_profile';

/**
 * Auth Service
 * Handles authentication via Supabase Auth with Google OAuth
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private supabase = inject(SupabaseService);

    private initialProfile = this.getInitialProfile();

    readonly user = signal<UserProfile | null>(this.initialProfile);
    readonly isLoggedIn = computed(() => this.user() !== null);
    readonly subscriptionTier = computed<'free' | 'pro' | 'premium'>(() => {
        const u = this.user();
        if (!u) return 'free';
        if (u.subscriptionExpires && new Date(u.subscriptionExpires).getTime() < Date.now()) {
            return 'free';
        }
        return u.subscriptionTier || 'free';
    });
    readonly isInitialized = signal(this.initialProfile !== null || !this.supabase.hasStoredSession());
    readonly isLoggingIn = signal(false);
    readonly isLoggingOut = signal(false);
    readonly authError = signal<string | null>(null);
    private activeUserId: string | null = this.initialProfile?.id ?? null;

    /** Emits when user successfully logs in */
    readonly loginEvent = new Subject<UserProfile>();
    /** Emits when user logs out to trigger session cleanup */
    readonly logoutEvent = new Subject<void>();

    constructor() {
        this.initializeAuth();

        // Reactively sync user when Supabase session changes
        effect(() => {
            const session = this.supabase.session();
            const newUserId = session?.user?.id ?? null;

            if (newUserId && this.activeUserId && this.activeUserId !== newUserId) {
                // Different account detected without explicit logout: force cleanup of previous user data
                this.clearStoredProfile();
                this.logoutEvent.next();
            }

            if (session?.user) {
                const isNewLogin = !this.activeUserId;
                this.activeUserId = newUserId;
                const shouldEmitLogin = isNewLogin && !this.initialProfile;
                void this.syncProfileFromSession(session, shouldEmitLogin);
            } else if (this.isInitialized()) {
                this.activeUserId = null;
                this.clearStoredProfile();
                this.user.set(null);
                // NOTE: Do NOT emit logoutEvent here on session expiration/network drop.
                // logoutEvent purges all local offline repositories. It must only fire on explicit
                // user-initiated signOut() or when switching to a different account.
            }
        });
    }

    /**
     * Synchronously load initial user profile from localStorage or Supabase session
     */
    private getInitialProfile(): UserProfile | null {
        if (typeof window === 'undefined' || !window.localStorage) return null;
        try {
            const raw = localStorage.getItem(PROFILE_CACHE_KEY);
            if (raw) {
                const cached = JSON.parse(raw) as UserProfile;
                const sessionUserId = this.supabase.userId;
                if (!sessionUserId || cached.id === sessionUserId) {
                    if (cached.subscriptionExpires) {
                        cached.subscriptionExpires = new Date(cached.subscriptionExpires);
                    }
                    return cached;
                }
            }
        } catch {
            // Ignore parse errors
        }

        // Fallback: construct baseline profile from synchronous Supabase user if session exists
        const user = this.supabase.user();
        if (user) {
            const meta = user.user_metadata || {};
            return {
                id: user.id,
                email: user.email || '',
                name: (meta['full_name'] as string) || (meta['name'] as string) || user.email || 'User',
                picture: (meta['avatar_url'] as string) || (meta['picture'] as string) || '',
                subscriptionTier: 'free',
                diamonds: 5
            };
        }

        return null;
    }

    private saveStoredProfile(profile: UserProfile): void {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile));
            }
        } catch {
            // Ignore storage write issues
        }
    }

    private clearStoredProfile(): void {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                localStorage.removeItem(PROFILE_CACHE_KEY);
            }
        } catch {
            // Ignore storage issues
        }
    }

    /**
     * Initialize auth state from Supabase session
     */
    private async initializeAuth(): Promise<void> {
        try {
            await this.supabase.waitForReady();
            const session = this.supabase.session();
            if (session?.user) {
                await this.syncProfileFromSession(session, false);
            }
        } catch (err) {
            console.error('[AuthService] Initialization error:', err);
        } finally {
            this.isInitialized.set(true);
        }
    }

    /**
     * Sync and load profile from Supabase profiles table
     */
    private async syncProfileFromSession(session: Session, emitLoginEvent = false): Promise<UserProfile> {
        const user = session.user;
        const profile = await this.fetchProfile(user);
        this.user.set(profile);
        this.saveStoredProfile(profile);

        if (emitLoginEvent) {
            this.loginEvent.next(profile);
        }
        return profile;
    }

    /**
     * Fetch profile record from public.profiles table or fallback to auth metadata
     */
    private async fetchProfile(user: User): Promise<UserProfile> {
        try {
            const { data, error } = await this.supabase.client
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .maybeSingle();

            if (data && !error) {
                return {
                    id: data.id,
                    email: data.email || user.email || '',
                    name: data.name || user.user_metadata?.['full_name'] || user.user_metadata?.['name'] || data.email || 'User',
                    picture: data.avatar_url || user.user_metadata?.['avatar_url'] || user.user_metadata?.['picture'] || '',
                    subscriptionTier: (data.subscription_tier as 'free' | 'pro' | 'premium') || 'free',
                    subscriptionExpires: data.subscription_expires ? new Date(data.subscription_expires) : undefined,
                    diamonds: data.diamonds ?? 5
                };
            }
        } catch (err) {
            console.warn('[AuthService] Error fetching profile row from Supabase:', err);
        }

        // Fallback to session user metadata if profiles table row isn't readable yet
        const meta = user.user_metadata || {};
        return {
            id: user.id,
            email: user.email || '',
            name: (meta['full_name'] as string) || (meta['name'] as string) || user.email || 'User',
            picture: (meta['avatar_url'] as string) || (meta['picture'] as string) || '',
            subscriptionTier: 'free',
            diamonds: 5
        };
    }

    /**
     * Open a centered OAuth popup window synchronously in the user click event
     */
    private openOAuthPopup(url = 'about:blank'): OAuthPopup {
        if (typeof window === 'undefined' || typeof window.open !== 'function') {
            return null;
        }

        const width = Math.min(520, window.innerWidth || 520);
        const height = Math.min(640, window.innerHeight || 640);

        const screenLeft = window.screenLeft ?? window.screenX ?? 0;
        const screenTop = window.screenTop ?? window.screenY ?? 0;
        const screenWidth = window.innerWidth || document.documentElement?.clientWidth || screen.width;
        const screenHeight = window.innerHeight || document.documentElement?.clientHeight || screen.height;

        const left = screenLeft + Math.max(0, (screenWidth - width) / 2);
        const top = screenTop + Math.max(0, (screenHeight - height) / 2);

        const popup = window.open(
            url,
            'google_oauth_popup',
            `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=no,menubar=no`
        );

        if (popup && url === 'about:blank') {
            try {
                const doc = popup.document;
                if (doc) {
                    doc.title = 'Connecting to Google...';
                    const style = doc.createElement('style');
                    style.textContent = `
                        * { box-sizing: border-box; margin: 0; padding: 0; }
                        body {
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                            display: flex; flex-direction: column; align-items: center; justify-content: center;
                            min-height: 100vh; background: #0f172a; color: #f8fafc; text-align: center; padding: 24px;
                        }
                        .spinner {
                            width: 36px; height: 36px; border: 3px solid rgba(255, 255, 255, 0.12);
                            border-top-color: #3b82f6; border-radius: 50%;
                            animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; margin-bottom: 16px;
                        }
                        .title { font-size: 15px; font-weight: 600; margin-bottom: 4px; }
                        .subtitle { font-size: 13px; color: #94a3b8; }
                        @keyframes spin { to { transform: rotate(360deg); } }
                    `;
                    doc.head?.appendChild(style);

                    const spinner = doc.createElement('div');
                    spinner.className = 'spinner';
                    const title = doc.createElement('div');
                    title.className = 'title';
                    title.textContent = 'Connecting to Google...';
                    const subtitle = doc.createElement('div');
                    subtitle.className = 'subtitle';
                    subtitle.textContent = 'Please choose your Google account in the popup window.';

                    doc.body?.appendChild(spinner);
                    doc.body?.appendChild(title);
                    doc.body?.appendChild(subtitle);
                }
            } catch {
                // Ignore cross-origin / security restriction if document cannot be modified
            }
        }

        return popup;
    }

    /**
     * Wait for authentication completion in the popup window via postMessage, storage, or close detection
     */
    private waitForPopupAuth(popup: Window): Promise<Session | null> {
        return new Promise((resolve, reject) => {
            let pollTimer: ReturnType<typeof setInterval> | null = null;
            let isDone = false;

            const cleanup = () => {
                if (isDone) return;
                isDone = true;
                if (typeof window !== 'undefined') {
                    window.removeEventListener('message', onMessage);
                    window.removeEventListener('storage', onStorage);
                }
                if (pollTimer) clearInterval(pollTimer);
            };

            const onMessage = async (event: MessageEvent) => {
                if (event.origin !== window.location.origin) return;
                if (event.data?.type !== 'SUPABASE_AUTH_CALLBACK') return;

                cleanup();

                try {
                    const { hash, search } = event.data;
                    if ((search && search.includes('error=')) || (hash && hash.includes('error='))) {
                        reject(new Error('Google sign-in was cancelled or denied'));
                        return;
                    }

                    // Handle PKCE code flow (?code=...)
                    if (search && search.includes('code=')) {
                        const params = new URLSearchParams(search);
                        const code = params.get('code');
                        if (code) {
                            const { data, error } = await this.supabase.client.auth.exchangeCodeForSession(code);
                            if (error) throw error;
                            resolve(data.session);
                            return;
                        }
                    }

                    // Handle Implicit token flow (#access_token=...&refresh_token=...)
                    if (hash && hash.includes('access_token=')) {
                        const cleanHash = hash.startsWith('#') ? hash.slice(1) : hash;
                        const params = new URLSearchParams(cleanHash);
                        const accessToken = params.get('access_token');
                        const refreshToken = params.get('refresh_token');
                        if (accessToken && refreshToken) {
                            const { data, error } = await this.supabase.client.auth.setSession({
                                access_token: accessToken,
                                refresh_token: refreshToken
                            });
                            if (error) throw error;
                            resolve(data.session);
                            return;
                        }
                    }

                    // Fallback to active session
                    const { data } = await this.supabase.client.auth.getSession();
                    resolve(data.session);
                } catch (err) {
                    reject(err);
                }
            };

            const onStorage = async (event: StorageEvent) => {
                if (event.key && event.key.startsWith('sb-') && event.key.endsWith('-auth-token')) {
                    const { data } = await this.supabase.client.auth.getSession();
                    if (data?.session) {
                        cleanup();
                        resolve(data.session);
                    }
                }
            };

            if (typeof window !== 'undefined') {
                window.addEventListener('message', onMessage);
                window.addEventListener('storage', onStorage);
            }

            pollTimer = setInterval(() => {
                if (popup.closed) {
                    cleanup();
                    // Short grace period in case storage or session just synced
                    setTimeout(async () => {
                        const { data } = await this.supabase.client.auth.getSession();
                        resolve(data?.session ?? null);
                    }, 300);
                }
            }, 500);
        });
    }

    /**
     * Login with Google OAuth via Supabase using a centered popup window
     */
    async loginWithGoogle(preopenedPopup: OAuthPopup = null): Promise<UserProfile | null> {
        if (this.isLoggingIn()) return null;
        this.isLoggingIn.set(true);
        this.authError.set(null);

        // Open popup synchronously in the user gesture context to avoid popup blockers
        const popup = preopenedPopup || this.openOAuthPopup();
        if (!popup) {
            this.isLoggingIn.set(false);
            this.authError.set('Popup was blocked by your browser. Please allow popups for this site.');
            throw new Error('Popup blocked');
        }

        try {
            const { data, error } = await this.supabase.client.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.href,
                    skipBrowserRedirect: true,
                    queryParams: {
                        prompt: 'select_account'
                    }
                }
            });

            if (error || !data?.url) {
                try { popup.close(); } catch { /* ignore */ }
                throw error || new Error('Failed to obtain Google sign-in URL');
            }

            // Redirect popup to Google's sign-in page
            popup.location.href = data.url;

            // Wait for authentication in popup window
            const session = await this.waitForPopupAuth(popup);
            if (session) {
                return await this.syncProfileFromSession(session, true);
            }
            return null;
        } catch (error: unknown) {
            const err = error as Error;
            if (err?.message?.includes('closed') || err?.message?.includes('cancelled')) {
                console.log('[Auth] Google login window closed or cancelled');
                return null;
            }

            console.error('[Auth] Google login failed:', error);
            this.authError.set(err?.message || 'Login failed. Please try again.');
            throw error;
        } finally {
            this.isLoggingIn.set(false);
            if (popup && !popup.closed) {
                try { popup.close(); } catch { /* ignore */ }
            }
        }
    }

    /**
     * Sign out - clears Supabase auth session and emits logoutEvent
     */
    async signOut(): Promise<void> {
        if (this.isLoggingOut()) return;
        this.isLoggingOut.set(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 200));
            this.clearStoredProfile();
            await this.supabase.clearAuth();
            this.user.set(null);
            this.logoutEvent.next();
        } finally {
            this.isLoggingOut.set(false);
        }
    }

    /**
     * Get user ID for API calls
     */
    getUserId(): string | null {
        return this.user()?.id ?? this.supabase.userId;
    }

    /**
     * Check if auth is enabled
     */
    isAuthEnabled(): boolean {
        return this.supabase.isReady();
    }

    /**
     * Get the current auth token for API calls
     */
    getToken(): string | null {
        return this.supabase.getToken();
    }

    /**
     * Check if user is authenticated with a valid token
     */
    hasValidToken(): boolean {
        return this.supabase.isAuthenticated();
    }

    /**
     * Get subscription tier for the current user
     */
    getSubscriptionTier(): 'free' | 'pro' | 'premium' {
        return this.subscriptionTier();
    }

    /**
     * Refresh user profile and subscription tier from Supabase
     */
    async refreshUser(): Promise<void> {
        const user = this.supabase.user();
        if (!user) return;

        try {
            const profile = await this.fetchProfile(user);
            this.user.set(profile);
            this.saveStoredProfile(profile);
        } catch (e) {
            console.warn('[AuthService] Failed to refresh user profile:', e);
        }
    }
}
