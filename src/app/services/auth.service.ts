import { Injectable, signal, computed, NgZone, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

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
    private readonly TOKEN_KEY = 'linguatube_token';
    private ngZone = inject(NgZone);

    readonly user = signal<UserProfile | null>(null);
    readonly isLoggedIn = computed(() => this.user() !== null);
    readonly isInitialized = signal(false);

    /** Emits when user successfully logs in via Google credential */
    readonly loginEvent = new Subject<UserProfile>();

    private clientId = '';
    private token: string | null = null;

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
                    callback: (response: any) => {
                        console.log('[Auth] Google callback received', response);
                        this.ngZone.run(() => {
                            this.handleCredentialResponse(response);
                        });
                    },
                    auto_select: false,
                    cancel_on_tap_outside: true
                });
                console.log('[Auth] Google Identity initialized');
            } else {
                setTimeout(checkAndInit, 100);
            }
        };
        checkAndInit();
    }



    /**
     * Render Google Sign-In button
     */
    renderButton(element: HTMLElement, options: any = {}): void {
        if (typeof google === 'undefined') return;

        const defaultOptions = {
            theme: 'outline',
            size: 'large',
            type: 'standard',
            shape: 'pill'
        };

        google.accounts.id.renderButton(element, { ...defaultOptions, ...options });
    }

    /**
     * Trigger Google One Tap sign-in prompt programmatically
     * Use this with a custom button instead of the official Google button
     */
    promptSignIn(): void {
        if (typeof google === 'undefined' || !this.clientId) return;
        google.accounts.id.prompt();
    }



    /**
     * Sign out
     */
    signOut(): void {
        if (typeof google !== 'undefined') {
            google.accounts.id.disableAutoSelect();
        }
        this.user.set(null);
        this.token = null;
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
    }

    /**
     * Handle Google credential response
     */
    private handleCredentialResponse(response: any): void {
        try {
            console.log('[Auth] Handling credential response...');
            if (!response.credential) {
                console.error('[Auth] No credential in response');
                return;
            }

            const payload = this.decodeJwt(response.credential);
            console.log('[Auth] Decoded payload:', payload);

            const profile: UserProfile = {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture
            };

            console.log('[Auth] Setting user profile:', profile);
            this.user.set(profile);
            this.token = response.credential;
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profile));
            localStorage.setItem(this.TOKEN_KEY, response.credential);

            // Emit login event for sync service
            this.loginEvent.next(profile);
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
            const storedToken = localStorage.getItem(this.TOKEN_KEY);
            if (stored) {
                this.user.set(JSON.parse(stored));
            }
            if (storedToken) {
                this.token = storedToken;
            }
        } catch {
            localStorage.removeItem(this.STORAGE_KEY);
            localStorage.removeItem(this.TOKEN_KEY);
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

    /**
     * Get the current auth token for API calls
     * Returns null if token is expired or invalid
     */
    getToken(): string | null {
        if (!this.token) return null;

        // Check if token is expired
        try {
            const payload = this.decodeJwt(this.token);
            const now = Math.floor(Date.now() / 1000);

            // Token expired or will expire in next 60 seconds
            if (payload.exp && payload.exp < now + 60) {
                console.log('[Auth] Token expired, clearing');
                this.signOut();
                return null;
            }

            return this.token;
        } catch {
            // Invalid token
            this.signOut();
            return null;
        }
    }

    /**
     * Check if user is authenticated with a valid token
     */
    hasValidToken(): boolean {
        return this.getToken() !== null;
    }
}
