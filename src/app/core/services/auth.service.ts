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
    private async syncProfileFromSession(session: Session, emitLoginEvent = false): Promise<void> {
        const user = session.user;
        const profile = await this.fetchProfile(user);
        this.user.set(profile);
        this.saveStoredProfile(profile);

        if (emitLoginEvent) {
            this.loginEvent.next(profile);
        }
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
     * Login with Google OAuth via Supabase
     */
    async loginWithGoogle(_preopenedPopup: OAuthPopup = null): Promise<UserProfile | null> {
        if (this.isLoggingIn()) return null;
        this.isLoggingIn.set(true);
        this.authError.set(null);

        try {
            const { error } = await this.supabase.client.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.href,
                    queryParams: {
                        prompt: 'select_account'
                    }
                }
            });

            if (error) {
                throw error;
            }

            return null; // Will redirect to Google
        } catch (error: unknown) {
            const err = error as Error;
            if (err?.message?.includes('closed') || err?.message?.includes('cancelled')) {
                console.log('[Auth] Google login cancelled');
                return null;
            }

            console.error('[Auth] Google login failed:', error);
            this.authError.set(err?.message || 'Login failed. Please try again.');
            throw error;
        } finally {
            this.isLoggingIn.set(false);
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
