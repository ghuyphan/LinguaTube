import { Injectable, signal, computed, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { PocketBaseService } from './pocketbase.service';
import type { RecordModel } from 'pocketbase';

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    picture: string;
    subscriptionTier?: 'free' | 'pro' | 'premium';
    subscriptionExpires?: Date;
}

type OAuthPopup = Window | null;

/**
 * Auth Service
 * Handles authentication via PocketBase with multi-provider support
 * Supports: Google OAuth, Email/Password, and more
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private pb = inject(PocketBaseService);

    readonly user = signal<UserProfile | null>(null);
    readonly isLoggedIn = computed(() => this.user() !== null);
    readonly subscriptionTier = computed<'free' | 'pro' | 'premium'>(() => this.user()?.subscriptionTier || 'free');
    readonly isInitialized = signal(false);
    readonly isLoggingIn = signal(false);

    /** Emits when user successfully logs in */
    readonly loginEvent = new Subject<UserProfile>();

    constructor() {
        this.initializeAuth();
    }

    /**
     * Initialize auth state from PocketBase authStore
     */
    private async initializeAuth(): Promise<void> {
        // Wait for PocketBase to be ready (no polling - uses promise)
        await this.pb.waitForReady();

        const model = this.pb.model();
        if (model) {
            const profile = this.modelToProfile(model as RecordModel);
            this.user.set(profile);
        }
        this.isInitialized.set(true);
    }

    /**
     * Convert PocketBase model to UserProfile
     */
    private modelToProfile(model: RecordModel): UserProfile {
        const client = this.pb.client;
        return {
            id: model.id,
            email: model['email'] || '',
            name: model['name'] || model['email'] || '',
            picture: model['avatar'] && client
                ? client.files.getURL(model, model['avatar'])
                : '',
            subscriptionTier: model['subscription_tier'] || 'premium',
            subscriptionExpires: model['subscription_expires']
                ? new Date(model['subscription_expires'])
                : undefined
        };
    }

    /**
     * Login with Google OAuth
     * Opens a popup for Google authentication
     */
    async loginWithGoogle(preopenedPopup: OAuthPopup = null): Promise<UserProfile | null> {
        if (this.isLoggingIn()) return null;
        this.isLoggingIn.set(true);
        let oauthPopup = preopenedPopup || this.openOAuthPopup();

        try {
            const client = await this.pb.getClient();
            const authData = await client.collection('users').authWithOAuth2({
                provider: 'google',
                scopes: ['email', 'profile'],
                urlCallback: (url: string) => {
                    oauthPopup = this.openOrReuseOAuthPopup(url, oauthPopup);
                }
            });

            const profile = this.modelToProfile(authData.record);

            // If new user or free tier, upgrade to premium automatically (for now)
            if (authData.meta?.['isNew'] || profile.subscriptionTier === 'free') {
                await client.collection('users').update(authData.record.id, {
                    subscription_tier: 'premium'
                });
                profile.subscriptionTier = 'premium';
            }

            this.user.set(profile);
            this.loginEvent.next(profile);

            return profile;
        } catch (error) {
            console.error('[Auth] Google login failed:', error);
            throw error;
        } finally {
            this.isLoggingIn.set(false);
            if (oauthPopup && !oauthPopup.closed) {
                oauthPopup.close();
            }
        }
    }

    /**
     * Sign out - clears PocketBase auth store
     */
    signOut(): void {
        this.pb.clearAuth();
        this.user.set(null);
    }

    /**
     * Get user ID for API calls
     */
    getUserId(): string | null {
        return this.user()?.id ?? null;
    }

    /**
     * Check if auth is enabled (PocketBase is configured)
     */
    isAuthEnabled(): boolean {
        return this.pb.isReady();
    }

    /**
     * Get the current auth token for API calls
     * PocketBase handles refresh automatically
     */
    getToken(): string | null {
        return this.pb.getToken();
    }

    /**
     * Check if user is authenticated with a valid token
     */
    hasValidToken(): boolean {
        return this.pb.isAuthenticated();
    }

    /**
     * Get subscription tier for the current user
     */
    getSubscriptionTier(): 'free' | 'pro' | 'premium' {
        return this.subscriptionTier();
    }

    private openOrReuseOAuthPopup(url: string, popup: OAuthPopup): Window {
        const target = popup && !popup.closed ? popup : this.openOAuthPopup(url);

        if (!target) {
            throw new Error('Unable to open Google sign-in window. Please allow popups and try again.');
        }

        try {
            target.location.href = url;
        } catch {
            const fallbackPopup = this.openOAuthPopup(url);
            if (!fallbackPopup) {
                throw new Error('Unable to open Google sign-in window. Please allow popups and try again.');
            }
            fallbackPopup.focus();
            return fallbackPopup;
        }

        target.focus();
        return target;
    }

    private openOAuthPopup(url = ''): OAuthPopup {
        if (typeof window === 'undefined' || typeof window.open !== 'function') {
            return null;
        }

        let width = 1024;
        let height = 768;

        width = Math.min(width, window.innerWidth);
        height = Math.min(height, window.innerHeight);

        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        return window.open(
            url,
            'google_oauth_popup',
            `width=${width},height=${height},top=${top},left=${left},resizable,menubar=no`
        );
    }
}
