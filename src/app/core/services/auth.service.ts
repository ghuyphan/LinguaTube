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

/**
 * Auth Service
 * Handles authentication via PocketBase with multi-provider support
 * Supports: Google OAuth, Email/Password, and more
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly STORAGE_KEY = 'linguatube_user';
    private pb = inject(PocketBaseService);

    readonly user = signal<UserProfile | null>(null);
    readonly isLoggedIn = computed(() => this.user() !== null);
    readonly isInitialized = signal(false);

    /** Emits when user successfully logs in */
    readonly loginEvent = new Subject<UserProfile>();

    constructor() {
        this.initializeAuth();
    }

    /**
     * Initialize auth state from PocketBase authStore
     */
    private async initializeAuth(): Promise<void> {
        // Wait for PocketBase to be ready
        // If there's stored auth, PocketBase will initialize and restore it
        const checkReady = () => {
            if (this.pb.isReady()) {
                const model = this.pb.model();
                if (model) {
                    const profile = this.modelToProfile(model as RecordModel);
                    this.user.set(profile);
                }
                this.isInitialized.set(true);
            } else {
                setTimeout(checkReady, 50);
            }
        };
        checkReady();
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
    async loginWithGoogle(): Promise<UserProfile> {
        try {
            const client = await this.pb.getClient();
            const authData = await client.collection('users').authWithOAuth2({
                provider: 'google',
                scopes: ['email', 'profile']
            });

            const profile = this.modelToProfile(authData.record);
            this.user.set(profile);
            this.loginEvent.next(profile);

            return profile;
        } catch (error) {
            console.error('[Auth] Google login failed:', error);
            throw error;
        }
    }

    /**
     * Login with Email and Password
     */
    async loginWithEmail(email: string, password: string): Promise<UserProfile> {
        try {
            const client = await this.pb.getClient();
            const authData = await client.collection('users').authWithPassword(
                email,
                password
            );

            const profile = this.modelToProfile(authData.record);
            this.user.set(profile);
            this.loginEvent.next(profile);

            return profile;
        } catch (error) {
            console.error('[Auth] Email login failed:', error);
            throw error;
        }
    }

    /**
     * Register a new user with Email and Password
     */
    async register(email: string, password: string, name?: string): Promise<UserProfile> {
        try {
            const client = await this.pb.getClient();
            // Create the user with premium subscription tier by default
            await client.collection('users').create({
                email,
                password,
                passwordConfirm: password,
                name: name || email.split('@')[0],
                subscription_tier: 'premium' // Default all new users to premium
            });

            // Auto-login after registration
            return await this.loginWithEmail(email, password);
        } catch (error) {
            console.error('[Auth] Registration failed:', error);
            throw error;
        }
    }

    /**
     * Request password reset email
     */
    async requestPasswordReset(email: string): Promise<void> {
        try {
            const client = await this.pb.getClient();
            await client.collection('users').requestPasswordReset(email);
        } catch (error) {
            console.error('[Auth] Password reset request failed:', error);
            throw error;
        }
    }

    /**
     * Sign out - clears PocketBase auth store
     */
    signOut(): void {
        this.pb.clearAuth();
        this.user.set(null);
        localStorage.removeItem(this.STORAGE_KEY);
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
     * Manually refresh auth token
     * Usually not needed - PocketBase auto-refreshes
     */
    async refreshToken(): Promise<boolean> {
        return this.pb.refreshAuth();
    }

    /**
     * Get subscription tier for the current user
     */
    getSubscriptionTier(): 'free' | 'pro' | 'premium' {
        return this.user()?.subscriptionTier || 'free';
    }

    /**
     * Check if user has an active premium subscription
     */
    hasPremiumAccess(): boolean {
        const user = this.user();
        if (!user) return false;

        const tier = user.subscriptionTier;
        if (tier === 'free') return false;

        // Check if subscription is expired
        if (user.subscriptionExpires && user.subscriptionExpires < new Date()) {
            return false;
        }

        return true;
    }
}
