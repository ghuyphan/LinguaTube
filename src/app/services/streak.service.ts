import { Injectable, inject, signal, computed } from '@angular/core';
import { PocketBaseService, AuthService, StorageService } from '../core/services';

const STORAGE_KEY = 'linguatube_streak';

export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    freezesRemaining: number;
    lastActivity: string | null;
    practicedToday: boolean;
}

/**
 * Streak Service
 * Manages user streaks with PocketBase sync for logged-in users
 * and localStorage fallback for guests
 */
@Injectable({
    providedIn: 'root'
})
export class StreakService {
    private pb = inject(PocketBaseService);
    private auth = inject(AuthService);
    private storage = inject(StorageService);

    /** Current streak data */
    readonly streakData = signal<StreakData>({
        currentStreak: 0,
        longestStreak: 0,
        freezesRemaining: 2,
        lastActivity: null,
        practicedToday: false
    });

    /** Current streak count */
    readonly currentStreak = computed(() => this.streakData().currentStreak);

    /** Longest streak ever */
    readonly longestStreak = computed(() => this.streakData().longestStreak);

    /** Available streak freezes */
    readonly freezesRemaining = computed(() => this.streakData().freezesRemaining);

    /** Whether user practiced today */
    readonly practicedToday = computed(() => this.streakData().practicedToday);

    /** Loading state */
    readonly isLoading = signal(false);

    /** Last activity result for celebration */
    readonly lastActivityResult = signal<{
        freezeUsed: boolean;
        isNewRecord: boolean;
        milestone?: number;
    } | null>(null);

    constructor() {
        // Load streak data on init
        this.loadStreak();
    }

    /**
     * Load streak data from PocketBase (if logged in) or localStorage
     */
    async loadStreak(): Promise<void> {
        if (this.auth.isLoggedIn()) {
            await this.syncWithServer();
        } else {
            this.loadFromStorage();
        }
    }

    /**
     * Record activity - called when user completes a study session
     */
    async recordActivity(): Promise<void> {
        if (this.auth.isLoggedIn()) {
            await this.recordActivityOnServer();
        } else {
            this.recordActivityLocally();
        }
    }

    /**
     * Fetch streak from PocketBase server
     */
    private async fetchFromServer(): Promise<void> {
        this.isLoading.set(true);
        try {
            const client = await this.pb.getClient();
            const response = await fetch(`${client.baseURL}/api/streaks/me`, {
                headers: {
                    'Authorization': `Bearer ${this.pb.getToken()}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                this.streakData.set({
                    currentStreak: data.current_streak || 0,
                    longestStreak: data.longest_streak || 0,
                    freezesRemaining: data.freezes_remaining ?? 2,
                    lastActivity: data.last_activity,
                    practicedToday: data.practiced_today || false
                });
                // Also cache locally
                this.saveToStorage(this.streakData());

                // Sync local history if practiced today
                if (data.activity_log && Array.isArray(data.activity_log)) {
                    this.saveHistory(data.activity_log);
                } else if (data.practiced_today) {
                    // Fallback if server doesn't return log yet
                    this.addToHistory(new Date());
                }
            } else {
                console.warn('[Streak] Failed to fetch from server:', response.status);
                this.loadFromStorage();
            }
        } catch (error) {
            console.error('[Streak] Error fetching from server:', error);
            this.loadFromStorage();
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Sync with server (Reconciliation)
     * Compares local and server state and updates the outdated one
     */
    async syncWithServer(): Promise<void> {
        if (!this.auth.isLoggedIn()) return;

        this.isLoading.set(true);
        try {
            // 1. Get Server State
            const client = await this.pb.getClient();
            const response = await fetch(`${client.baseURL}/api/streaks/me`, {
                headers: {
                    'Authorization': `Bearer ${this.pb.getToken()}`
                }
            });

            if (!response.ok) {
                console.warn('[Streak] Failed to fetch server state:', response.status);
                return;
            }

            const serverData = await response.json();
            const localData = this.streakData();

            // 2. Compare Timestamps
            const localTime = localData.lastActivity ? new Date(localData.lastActivity).getTime() : 0;
            const serverTime = serverData.last_activity ? new Date(serverData.last_activity).getTime() : 0;

            // 3. Reconcile
            if (localTime > serverTime) {
                // Local is ahead (e.g. practiced offline)
                // We should push local state to server if possible or at least record activity
                console.log('[Streak] Local is ahead, attempting to push...');

                // If practiced today locally but not on server, record it
                // Note: This API might only support "record now", so it works best for "today"
                if (localData.practicedToday && !serverData.practiced_today) {
                    await this.recordActivityOnServer();
                } else {
                    // Fallback: Just update local with merged data if needed, 
                    // but since local is newer, we generally trust local for display
                    // untill next server sync confirms.
                    console.log('[Streak] keeping local state pending server sync');
                }
            } else {
                // Server is ahead or equal -> Update local
                console.log('[Streak] Server is ahead, updating local');
                this.streakData.set({
                    currentStreak: serverData.current_streak || 0,
                    longestStreak: serverData.longest_streak || 0,
                    freezesRemaining: serverData.freezes_remaining ?? 2,
                    lastActivity: serverData.last_activity,
                    practicedToday: serverData.practiced_today || false
                });

                this.saveToStorage(this.streakData());

                // Sync history log if available
                if (serverData.activity_log && Array.isArray(serverData.activity_log)) {
                    this.saveHistory(serverData.activity_log);
                }
            }
        } catch (error) {
            console.error('[Streak] Sync failed:', error);
            // Fallback to local
            this.loadFromStorage();
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Record activity on PocketBase server
     */
    private async recordActivityOnServer(): Promise<void> {
        this.isLoading.set(true);
        try {
            const client = await this.pb.getClient();
            const response = await fetch(`${client.baseURL}/api/streaks/record-activity`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.pb.getToken()}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();

                // Check for milestone
                const milestones = [7, 30, 100, 365];
                const currentMilestone = milestones.find(m => data.current_streak === m);

                this.lastActivityResult.set({
                    freezeUsed: data.freeze_used || false,
                    isNewRecord: data.is_new_record || false,
                    milestone: currentMilestone
                });

                this.streakData.set({
                    currentStreak: data.current_streak || 0,
                    longestStreak: data.longest_streak || 0,
                    freezesRemaining: data.freezes_remaining ?? 2,
                    lastActivity: new Date().toISOString(),
                    practicedToday: true
                });

                // Cache locally
                this.saveToStorage(this.streakData());

                // Sync history from server response
                if (data.activity_log && Array.isArray(data.activity_log)) {
                    this.saveHistory(data.activity_log);
                } else {
                    this.addToHistory(new Date());
                }

                console.log('[Streak] Activity recorded:', data);
            } else {
                console.error('[Streak] Failed to record activity:', response.status);
            }
        } catch (error) {
            console.error('[Streak] Error recording activity:', error);
        } finally {
            this.isLoading.set(false);
        }
    }

    /**
     * Record activity locally for guest users
     */
    private recordActivityLocally(): void {
        const data = this.streakData();
        const now = new Date();
        const today = this.startOfDay(now);
        const lastActivity = data.lastActivity ? new Date(data.lastActivity) : null;
        const lastDay = lastActivity ? this.startOfDay(lastActivity) : null;

        // Already practiced today
        if (lastDay && today.getTime() === lastDay.getTime()) {
            return;
        }

        let newStreak = data.currentStreak;
        let freezeUsed = false;

        if (!lastDay) {
            // First ever activity
            newStreak = 1;
        } else if (this.isYesterday(today, lastDay)) {
            // Consecutive day
            newStreak = data.currentStreak + 1;
        } else {
            // Missed day(s)
            const daysMissed = this.daysBetween(today, lastDay) - 1;
            if (daysMissed === 1 && data.freezesRemaining > 0) {
                // Use freeze
                newStreak = data.currentStreak + 1;
                freezeUsed = true;
            } else {
                // Reset
                newStreak = 1;
            }
        }

        const isNewRecord = newStreak > data.longestStreak;
        let freezes = data.freezesRemaining;
        if (freezeUsed) freezes--;

        // Award freeze at milestones
        const milestones = [7, 30, 100];
        const currentMilestone = milestones.find(m => newStreak === m);
        if (currentMilestone && freezes < 2) {
            freezes = Math.min(freezes + 1, 2);
        }

        this.lastActivityResult.set({
            freezeUsed,
            isNewRecord,
            milestone: currentMilestone
        });

        this.streakData.set({
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, data.longestStreak),
            freezesRemaining: freezes,
            lastActivity: now.toISOString(),
            practicedToday: true
        });

        this.saveToStorage(this.streakData());
        this.addToHistory(now);
    }

    /**
     * Clear celebration result
     */
    clearActivityResult(): void {
        this.lastActivityResult.set(null);
    }

    // ==================== History Tracking ====================

    /**
     * Get activity status for the last 7 days (including today)
     * Returns array of booleans where true means practiced
     * Index 0 = Today, Index 1 = Yesterday, etc.
     */
    getWeekActivity(): boolean[] {
        const history = this.loadHistory();
        const week: boolean[] = [];
        const today = this.startOfDay(new Date());

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            week.push(history.includes(dateStr));
        }

        return week;
    }

    private loadHistory(): string[] {
        return this.storage.get<string[]>('linguatube_activity_log') || [];
    }

    private saveHistory(history: string[]): void {
        const trimmed = history.slice(-365);
        this.storage.set('linguatube_activity_log', trimmed);
    }

    addToHistory(date: Date): void {
        const dateStr = this.startOfDay(date).toISOString().split('T')[0]; // YYYY-MM-DD
        const history = this.loadHistory();

        if (!history.includes(dateStr)) {
            history.push(dateStr);
            this.saveHistory(history);
        }
    }

    // ==================== Storage ====================

    private loadFromStorage(): void {
        const data = this.storage.get<StreakData>(STORAGE_KEY);
        if (data) {
            // Check if practiced today based on stored lastActivity
            const lastActivity = data.lastActivity ? new Date(data.lastActivity) : null;
            const practicedToday = lastActivity ? this.isSameDay(new Date(), lastActivity) : false;

            this.streakData.set({
                currentStreak: data.currentStreak || 0,
                longestStreak: data.longestStreak || 0,
                freezesRemaining: data.freezesRemaining ?? 2,
                lastActivity: data.lastActivity,
                practicedToday
            });
        }
    }

    private saveToStorage(data: StreakData): void {
        this.storage.set(STORAGE_KEY, data);
    }

    // ==================== Date Helpers ====================

    private startOfDay(date: Date): Date {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    }

    private isSameDay(date1: Date, date2: Date): boolean {
        return this.startOfDay(date1).getTime() === this.startOfDay(date2).getTime();
    }

    private isYesterday(today: Date, other: Date): boolean {
        const oneDay = 24 * 60 * 60 * 1000;
        return today.getTime() - other.getTime() === oneDay;
    }

    private daysBetween(date1: Date, date2: Date): number {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.floor((date1.getTime() - date2.getTime()) / oneDay);
    }
}
