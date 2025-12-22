import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare const google: any;

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    picture: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly STORAGE_KEY = 'linguatube_user';

    readonly user = signal<UserProfile | null>(null);
    readonly isLoggedIn = computed(() => this.user() !== null);
    readonly isInitialized = signal(false);

    private clientId = '';

    constructor(private http: HttpClient) {
        this.loadStoredUser();
        this.fetchConfig();
    }

    /**
     * Fetch auth config from API
     */
    private fetchConfig(): void {
        this.http.get<{ clientId: string; enabled: boolean }>('/api/auth-config').subscribe({
            next: (config) => {
                if (config.enabled && config.clientId) {
                    this.clientId = config.clientId;
                    this.initializeGoogleAuth();
                }
                this.isInitialized.set(true);
            },
            error: () => {
                this.isInitialized.set(true);
            }
        });
    }

    /**
     * Initialize Google Identity Services
     */
    private initializeGoogleAuth(): void {
        const checkAndInit = () => {
            if (typeof google !== 'undefined' && google.accounts) {
                google.accounts.id.initialize({
                    client_id: this.clientId,
                    callback: (response: any) => this.handleCredentialResponse(response),
                    auto_select: true,
                    cancel_on_tap_outside: false
                });
            } else {
                setTimeout(checkAndInit, 100);
            }
        };
        checkAndInit();
    }

    /**
     * Render Google Sign-In button
     */
    renderButton(element: HTMLElement): void {
        if (typeof google === 'undefined') return;

        google.accounts.id.renderButton(element, {
            theme: 'outline',
            size: 'large',
            type: 'icon',
            shape: 'circle'
        });
    }

    /**
     * Prompt one-tap sign-in
     */
    promptSignIn(): void {
        if (!this.clientId || typeof google === 'undefined') return;
        google.accounts.id.prompt();
    }

    /**
     * Trigger sign-in flow (for custom button)
     * Shows Google One-Tap prompt with user interaction
     */
    signIn(): void {
        if (!this.clientId || typeof google === 'undefined') return;

        // Show the Google One-Tap prompt with explicit user_select to show account chooser
        google.accounts.id.prompt((notification: any) => {
            // If the user dismissed or skipped, the notification will have a reason
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                console.log('[Auth] One-Tap not displayed, reason:', notification.getNotDisplayedReason?.() || notification.getSkippedReason?.());
            }
        });
    }

    /**
     * Sign out
     */
    signOut(): void {
        if (typeof google !== 'undefined') {
            google.accounts.id.disableAutoSelect();
        }
        this.user.set(null);
        localStorage.removeItem(this.STORAGE_KEY);
    }

    /**
     * Handle Google credential response
     */
    private handleCredentialResponse(response: any): void {
        try {
            const payload = this.decodeJwt(response.credential);

            const profile: UserProfile = {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture
            };

            this.user.set(profile);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
        } catch (error) {
            console.error('[Auth] Failed to decode credential:', error);
        }
    }

    /**
     * Decode JWT payload
     */
    private decodeJwt(token: string): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    }

    /**
     * Load user from localStorage
     */
    private loadStoredUser(): void {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                this.user.set(JSON.parse(stored));
            }
        } catch {
            localStorage.removeItem(this.STORAGE_KEY);
        }
    }

    /**
     * Get user ID for API calls
     */
    getUserId(): string | null {
        return this.user()?.id ?? null;
    }

    /**
     * Check if auth is enabled
     */
    isAuthEnabled(): boolean {
        return !!this.clientId;
    }
}
