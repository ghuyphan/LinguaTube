import { Injectable, inject, signal } from '@angular/core';
import { IStreakRepository, StreakData, ActivityResult } from './streak.repository';
import { AuthService, StorageService, SupabaseService } from '../services';

const STORAGE_KEY = 'linguatube_streak';
const HISTORY_KEY = 'linguatube_activity_log';

@Injectable({
    providedIn: 'root'
})
export class OfflineStreakRepository implements IStreakRepository {
    private auth = inject(AuthService);
    private storage = inject(StorageService);
    private supabase = inject(SupabaseService);

    private _streakData = signal<StreakData>({
        currentStreak: 0,
        longestStreak: 0,
        freezesRemaining: 2,
        lastActivity: null,
        practicedToday: false
    });
    readonly streakData = this._streakData.asReadonly();

    readonly activityHistory = signal<string[]>([]);
    readonly isLoading = signal(false);

    constructor() {
        this.loadFromStorage();
        this.setupAutoSync();
    }

    getStreak(): StreakData {
        return this.streakData();
    }

    async recordActivity(): Promise<ActivityResult | null> {
        // 1. Instant Optimistic Local Recording
        const result = this.recordActivityLocally();

        // 2. Ensure local log is updated for week view
        this.addToLocalHistory(new Date());

        // 3. Background Asynchronous Server Push
        if (this.auth.isLoggedIn()) {
            this.recordActivityOnServer().catch(err => {
                console.warn('[StreakRepo] Background server record failed, saving pending sync date:', err);
                this.markPendingStreakSync();
            });
        }

        return result;
    }

    getWeekActivity(): boolean[] {
        const historySet = new Set(this.activityHistory());
        const week: boolean[] = [];
        const now = new Date();
        const practicedToday = this.streakData().practicedToday;

        for (let i = 0; i < 7; i++) {
            const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
            if (i === 0 && practicedToday) {
                week.push(true);
                continue;
            }
            const localKey = this.toLocalDateKey(date);
            const utcKey = this.toUtcDateKey(date);
            week.push(historySet.has(localKey) || historySet.has(utcKey));
        }

        return week;
    }

    async replenishFreeze(newCount: number): Promise<void> {
        const clampedCount = Math.min(2, Math.max(0, newCount));
        this.updateLocal({
            ...this.streakData(),
            freezesRemaining: clampedCount
        });
        if (this.auth.isLoggedIn()) {
            const user = this.auth.user();
            if (user) {
                try {
                    const { error: rpcErr } = await this.supabase.client.rpc('replenish_streak_freeze', {
                        p_new_count: clampedCount
                    });
                    if (rpcErr) {
                        // Fallback to direct update if RPC is not yet deployed
                        await this.supabase.client.from('streaks').update({
                            freezes_remaining: clampedCount,
                            updated_at: new Date().toISOString()
                        }).eq('user_id', user.id);
                    }
                } catch (err) {
                    console.warn('[StreakRepo] Failed to update freezes_remaining on server:', err);
                }
            }
        }
    }

    async syncWithRemote(): Promise<void> {
        if (!this.auth.isLoggedIn()) return;

        this.isLoading.set(true);
        try {
            const userId = this.auth.getUserId();
            if (!userId) return;

            const { data: serverData, error } = await this.supabase.client
                .from('streaks')
                .select('*')
                .eq('user_id', userId)
                .maybeSingle();

            if (error || !serverData) return;

            const localData = this.streakData();
            const localTime = localData.lastActivity ? new Date(localData.lastActivity).getTime() : 0;
            const serverTime = serverData.last_activity ? new Date(serverData.last_activity).getTime() : 0;

            const serverLastActivity = serverData.last_activity ? new Date(serverData.last_activity) : null;
            const serverPracticedToday = serverLastActivity ? this.isSameDay(new Date(), serverLastActivity) : false;

            const pendingDates = this.storage.get<string[]>('voca_pending_streak_dates') || [];
            const hasPendingSync = pendingDates.length > 0;

            if (localTime > serverTime || hasPendingSync) {
                // Local is ahead or has pending offline practice dates, push to server
                if ((localData.practicedToday && !serverPracticedToday) || hasPendingSync) {
                    await this.recordActivityOnServer();
                    this.storage.remove('voca_pending_streak_dates');
                }
            } else {
                // Server is ahead or equal
                this.updateLocal({
                    currentStreak: serverData.current_streak || 0,
                    longestStreak: serverData.longest_streak || 0,
                    freezesRemaining: serverData.freezes_remaining ?? 2,
                    lastActivity: serverData.last_activity,
                    practicedToday: serverPracticedToday
                });
            }

            // Always merge history log with server records so no device history is lost
            const mergedHistory = new Set(this.activityHistory());
            if (serverData.activity_log && Array.isArray(serverData.activity_log)) {
                for (const item of serverData.activity_log) {
                    if (typeof item === 'string') mergedHistory.add(item);
                }
            }
            if (serverLastActivity) {
                mergedHistory.add(this.toLocalDateKey(serverLastActivity));
                mergedHistory.add(this.toUtcDateKey(serverLastActivity));
            }
            this.saveLocalHistory(Array.from(mergedHistory));
        } catch (error) {
            console.error('[StreakRepo] Sync failed:', error);
        } finally {
            this.isLoading.set(false);
        }
    }

    // ==================== Private ====================

    private setupAutoSync() {
        if (this.auth.isLoggedIn()) {
            this.syncWithRemote();
        }
        this.auth.loginEvent.subscribe(() => this.syncWithRemote());
        this.supabase.reconnectEvent.subscribe(() => {
            if (this.auth.isLoggedIn()) {
                this.syncWithRemote();
            }
        });
        this.auth.logoutEvent.subscribe(() => {
            this._streakData.set({
                currentStreak: 0,
                longestStreak: 0,
                freezesRemaining: 2,
                lastActivity: null,
                practicedToday: false
            });
            this.activityHistory.set([]);
            this.storage.remove(STORAGE_KEY);
            this.storage.remove(HISTORY_KEY);
        });
    }

    private loadFromStorage() {
        const data = this.storage.get<StreakData>(STORAGE_KEY);
        if (data) {
            const lastActivity = data.lastActivity ? new Date(data.lastActivity) : null;
            const practicedToday = lastActivity ? this.isSameDay(new Date(), lastActivity) : false;
            this._streakData.set({ ...data, practicedToday });
        }
        this.activityHistory.set(this.storage.get<string[]>(HISTORY_KEY) || []);
    }

    private updateLocal(data: StreakData) {
        this._streakData.set(data);
        this.storage.set(STORAGE_KEY, data);
    }

    private markPendingStreakSync(): void {
        try {
            const todayStr = this.toLocalDateKey(new Date());
            const pending = new Set(this.storage.get<string[]>('voca_pending_streak_dates') || []);
            pending.add(todayStr);
            this.storage.set('voca_pending_streak_dates', Array.from(pending));
        } catch { }
    }

    private saveLocalHistory(history: string[]) {
        const trimmed = Array.from(new Set(history)).slice(-365);
        this.storage.set(HISTORY_KEY, trimmed);
        this.activityHistory.set(trimmed);
    }

    private toLocalDateKey(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private toUtcDateKey(date: Date): string {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    private addToLocalHistory(date: Date) {
        const localKey = this.toLocalDateKey(date);
        const utcKey = this.toUtcDateKey(date);
        const nextSet = new Set(this.activityHistory());
        nextSet.add(localKey);
        nextSet.add(utcKey);
        this.saveLocalHistory(Array.from(nextSet));
    }

    private recordActivityLocally(): ActivityResult | null {
        const data = this.streakData();
        const now = new Date();
        const today = this.startOfDay(now);
        const lastActivity = data.lastActivity ? new Date(data.lastActivity) : null;
        const lastDay = lastActivity ? this.startOfDay(lastActivity) : null;

        if (lastDay && today.getTime() === lastDay.getTime()) return null;

        let newStreak = data.currentStreak;
        let freezeUsed = false;

        if (!lastDay) {
            newStreak = 1;
        } else if (this.isYesterday(today, lastDay)) {
            newStreak = data.currentStreak + 1;
        } else {
            const daysMissed = this.daysBetween(today, lastDay) - 1;
            if (daysMissed === 1 && data.freezesRemaining > 0) {
                newStreak = data.currentStreak + 1;
                freezeUsed = true;
            } else {
                newStreak = 1;
            }
        }

        const isNewRecord = newStreak > data.longestStreak;
        let freezes = data.freezesRemaining;
        if (freezeUsed) freezes--;

        const milestones = [7, 30, 100];
        const currentMilestone = milestones.find(m => newStreak === m);
        if (currentMilestone && freezes < 2) freezes = Math.min(freezes + 1, 2);

        this.updateLocal({
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, data.longestStreak),
            freezesRemaining: freezes,
            lastActivity: now.toISOString(),
            practicedToday: true
        });

        return { freezeUsed, isNewRecord, milestone: currentMilestone };
    }

    private async recordActivityOnServer(): Promise<ActivityResult | null> {
        const { data, error } = await this.supabase.client.rpc('record_streak_activity');

        if (error) {
            console.error('[StreakRepo] RPC record_streak_activity error:', error);
            throw error;
        }

        if (data) {
            // Update local from server response
            this.updateLocal({
                currentStreak: data.current_streak || 0,
                longestStreak: data.longest_streak || 0,
                freezesRemaining: data.freezes_remaining ?? 2,
                lastActivity: new Date().toISOString(),
                practicedToday: true
            });

            if (data.activity_log && Array.isArray(data.activity_log)) {
                const merged = Array.from(new Set([...this.activityHistory(), ...data.activity_log]));
                this.saveLocalHistory(merged);
            }

            const milestones = [7, 30, 100, 365];
            const currentMilestone = milestones.find(m => data.current_streak === m);

            return {
                freezeUsed: data.status === 'freeze_used',
                isNewRecord: data.is_new_record || false,
                milestone: currentMilestone
            };
        }
        return null;
    }

    // Date Helpers
    private startOfDay(date: Date): Date {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d;
    }
    private isSameDay(date1: Date, date2: Date): boolean {
        return this.startOfDay(date1).getTime() === this.startOfDay(date2).getTime();
    }
    private isYesterday(today: Date, other: Date): boolean {
        const d1 = this.startOfDay(today);
        const d2 = this.startOfDay(other);
        const yesterday = new Date(d1);
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.getTime() === d2.getTime();
    }
    private daysBetween(date1: Date, date2: Date): number {
        const d1 = this.startOfDay(date1);
        const d2 = this.startOfDay(date2);
        return Math.round((d1.getTime() - d2.getTime()) / (24 * 60 * 60 * 1000));
    }
}
