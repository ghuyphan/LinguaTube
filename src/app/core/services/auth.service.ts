import { Injectable, signal, computed, inject, effect } from '@angular/core';
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
 * Handles authentication via PocketBase with Google OAuth
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
    readonly isLoggingOut = signal(false);
    readonly authError = signal<string | null>(null);

    /** Emits when user successfully logs in */
    readonly loginEvent = new Subject<UserProfile>();
    /** Emits when user logs out to trigger session cleanup */
    readonly logoutEvent = new Subject<void>();

    constructor() {
        this.initializeAuth();

        // Reactively sync user when PocketBase model changes
        effect(() => {
            const model = this.pb.model();
            if (model) {
                this.user.set(this.modelToProfile(model as RecordModel));
            } else if (this.isInitialized()) {
                this.user.set(null);
            }
        });
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
            subscriptionTier: model['subscription_tier'] || 'free',
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
        this.authError.set(null);
        let oauthPopup = preopenedPopup || this.openOAuthPopup();

        try {
            const client = await this.pb.getClient();
            const authData = await client.collection('users').authWithOAuth2({
                provider: 'google',
                scopes: ['email', 'profile'],
                urlCallback: (url: string) => {
                    let targetUrl = url;
                    try {
                        const parsed = new URL(url);
                        // Force Google to display the Account Chooser screen so user can choose their account
                        parsed.searchParams.set('prompt', 'select_account');
                        targetUrl = parsed.toString();
                    } catch {
                        targetUrl = url.includes('?') ? `${url}&prompt=select_account` : `${url}?prompt=select_account`;
                    }
                    oauthPopup = this.openOrReuseOAuthPopup(targetUrl, oauthPopup);
                }
            });

            const profile = this.modelToProfile(authData.record);
            this.user.set(profile);
            this.loginEvent.next(profile);

            return profile;
        } catch (error: unknown) {
            const err = error as Error;
            // Check if user dismissed the popup or aborted
            if (err?.name === 'ClientResponseError' && (err as { isAbort?: boolean }).isAbort) {
                console.log('[Auth] Google login cancelled by user');
                return null;
            }
            if (err?.message?.includes('closed') || err?.message?.includes('cancelled')) {
                console.log('[Auth] Google login window closed');
                return null;
            }

            console.error('[Auth] Google login failed:', error);
            this.authError.set(err?.message || 'Login failed. Please try again.');
            throw error;
        } finally {
            this.isLoggingIn.set(false);
            if (oauthPopup && !oauthPopup.closed) {
                oauthPopup.close();
            }
        }
    }

    /**
     * Sign out - clears PocketBase auth store and emits logoutEvent with loading state
     */
    async signOut(): Promise<void> {
        if (this.isLoggingOut()) return;
        this.isLoggingOut.set(true);
        try {
            // Smooth delay (250ms) with spinner active before session wipe
            await new Promise(resolve => setTimeout(resolve, 250));
            this.pb.clearAuth();
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

    /**
     * Refresh user profile and subscription tier from PocketBase
     */
    async refreshUser(): Promise<void> {
        try {
            await this.pb.refreshAuth();
            const model = this.pb.model();
            if (model) {
                this.user.set(this.modelToProfile(model as RecordModel));
            }
        } catch (e) {
            console.warn('[AuthService] Failed to refresh user profile:', e);
        }
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

        if (popup && !url) {
            try {
                popup.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Connecting to Google...</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #0b0f19;
      color: #f1f5f9;
      text-align: center;
      padding: 24px;
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 320px;
    }
    .spinner-ring {
      width: 44px;
      height: 44px;
      border: 3px solid rgba(255, 255, 255, 0.12);
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
      margin-bottom: 20px;
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -0.01em;
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 13px;
      color: #94a3b8;
      line-height: 1.4;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="spinner-ring"></div>
    <div class="title">Connecting to Google...</div>
    <div class="subtitle">Please choose your account in the window.</div>
  </div>
</body>
</html>`);
                popup.document.close();
            } catch {
                // Ignore if security restrictions prevent document.write
            }
        }

        return popup;
    }
}
