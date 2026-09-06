import { Injectable, inject, signal } from '@angular/core';
import { IStreakRepository, StreakData, ActivityResult } from './streak.repository';
import { AuthService, StorageService, PocketBaseService } from '../services';

const STORAGE_KEY = 'linguatube_streak';
const HISTORY_KEY = 'linguatube_activity_log';

@Injectable({
    providedIn: 'root'
})
export class OfflineStreakRepository implements IStreakRepository {
    private auth = inject(AuthService);
    private storage = inject(StorageService);
    private pb = inject(PocketBaseService);

    readonly streakData = signal<StreakData>({
        currentStreak: 0,
        longestStreak: 0,
        freezesRemaining: 2,
        lastActivity: null,
        practicedToday: false
    });

    readonly isLoading = signal(false);

    constructor() {
        this.loadFromStorage();
        this.setupAutoSync();
    }

    getStreak(): StreakData {
        return this.streakData();
    }

    async recordActivity(): Promise<ActivityResult | null> {
        let result: ActivityResult | null = null;

        // 1. Optimistic Update Local (fallback to local if offline or network drops)
        if (this.auth.isLoggedIn()) {
            try {
                result = await this.recordActivityOnServer();
            } catch (err) {
                console.warn('[StreakRepo] Network error while recording on server, falling back to local recording:', err);
                result = this.recordActivityLocally();
            }
        } else {
            result = this.recordActivityLocally();
        }

        // 2. Also ensure local log is updated for week view
        this.addToLocalHistory(new Date());

        return result;
    }

    getWeekActivity(): boolean[] {
        const history = this.storage.get<string[]>(HISTORY_KEY) || [];
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

    async syncWithRemote(): Promise<void> {
        if (!this.auth.isLoggedIn()) return;

        this.isLoading.set(true);
        try {
            const client = await this.pb.getClient();
            const response = await fetch(`${client.baseURL}/api/streaks/me`, {
                headers: { 'Authorization': `Bearer ${this.pb.getToken()}` }
            });

            if (!response.ok) return;

            const serverData = await response.json();
            const localData = this.streakData();

            const localTime = localData.lastActivity ? new Date(localData.lastActivity).getTime() : 0;
            const serverTime = serverData.last_activity ? new Date(serverData.last_activity).getTime() : 0;

            if (localTime > serverTime) {
                // Local is ahead, push if practiced today
                if (localData.practicedToday && !serverData.practiced_today) {
                    await this.recordActivityOnServer();
                }
            } else {
                // Server is ahead or equal
                this.updateLocal({
                    currentStreak: serverData.current_streak || 0,
                    longestStreak: serverData.longest_streak || 0,
                    freezesRemaining: serverData.freezes_remaining ?? 2,
                    lastActivity: serverData.last_activity,
                    practicedToday: serverData.practiced_today || false
                });

                // Sync history log
                if (serverData.activity_log && Array.isArray(serverData.activity_log)) {
                    this.saveLocalHistory(serverData.activity_log);
                }
            }
        } catch (error) {
            console.error('[StreakRepo] Sync failed:', error);
        } finally {
            this.isLoading.set(false);
        }
    }

    // ==================== Private ====================

    private setupAutoSync() {
        this.auth.loginEvent.subscribe(() => this.syncWithRemote());
    }

    private loadFromStorage() {
        const data = this.storage.get<StreakData>(STORAGE_KEY);
        if (data) {
            const lastActivity = data.lastActivity ? new Date(data.lastActivity) : null;
            const practicedToday = lastActivity ? this.isSameDay(new Date(), lastActivity) : false;
            this.streakData.set({ ...data, practicedToday });
        }
    }

    private updateLocal(data: StreakData) {
        this.streakData.set(data);
        this.storage.set(STORAGE_KEY, data);
    }

    private saveLocalHistory(history: string[]) {
        const trimmed = history.slice(-365);
        this.storage.set(HISTORY_KEY, trimmed);
    }

    private addToLocalHistory(date: Date) {
        const dateStr = this.startOfDay(date).toISOString().split('T')[0];
        const history = this.storage.get<string[]>(HISTORY_KEY) || [];
        if (!history.includes(dateStr)) {
            history.push(dateStr);
            this.saveLocalHistory(history);
        }
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

            // Update local from server response
            this.updateLocal({
                currentStreak: data.current_streak || 0,
                longestStreak: data.longest_streak || 0,
                freezesRemaining: data.freezes_remaining ?? 2,
                lastActivity: new Date().toISOString(),
                practicedToday: true
            });

            if (data.activity_log) this.saveLocalHistory(data.activity_log);

            const milestones = [7, 30, 100, 365];
            const currentMilestone = milestones.find(m => data.current_streak === m);

            return {
                freezeUsed: data.freeze_used || false,
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
