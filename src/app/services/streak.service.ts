import { Injectable, inject, computed, signal } from '@angular/core';
import { OfflineStreakRepository } from '../core/repositories';
import { GamificationService } from '../core/services/gamification.service';

@Injectable({
    providedIn: 'root'
})
export class StreakService {
    private repo = inject(OfflineStreakRepository);
    private gamification = inject(GamificationService);

    /** Current streak data */
    readonly streakData = this.repo.streakData;

    /** Current streak count */
    readonly currentStreak = computed(() => this.streakData().currentStreak);

    /** Longest streak ever */
    readonly longestStreak = computed(() => this.streakData().longestStreak);

    /** Available streak freezes */
    readonly freezesRemaining = computed(() => this.streakData().freezesRemaining);

    /** Whether user practiced today */
    readonly practicedToday = computed(() => this.streakData().practicedToday);

    /** Loading state */
    readonly isLoading = this.repo.isLoading;

    /** Last activity result for celebration */
    readonly lastActivityResult = signal<{
        freezeUsed: boolean;
        isNewRecord: boolean;
        milestone?: number;
    } | null>(null);

    /**
     * Record activity - called when user completes a study session
     */
    async recordActivity(): Promise<void> {
        const result = await this.repo.recordActivity();
        if (result) {
            this.lastActivityResult.set(result);
        }
    }

    /**
     * Clear celebration result
     */
    clearActivityResult(): void {
        this.lastActivityResult.set(null);
    }

    /** Activity history date strings */
    readonly activityHistory = this.repo.activityHistory;

    /**
     * Get activity status for the last 7 days (including today)
     */
    getWeekActivity(): boolean[] {
        return this.repo.getWeekActivity();
    }

    /**
     * Trigger a background sync with Supabase
     */
    async syncWithRemote(): Promise<void> {
        return this.repo.syncWithRemote();
    }

    /**
     * Replenish one consumed streak freeze for 150 XP
     */
    replenishFreeze(): { success: boolean; reason?: 'max_reached' | 'insufficient_xp' } {
        const current = this.freezesRemaining();
        if (current >= 2) {
            return { success: false, reason: 'max_reached' };
        }
        const COST = 150;
        if (this.gamification.totalXP() < COST) {
            return { success: false, reason: 'insufficient_xp' };
        }

        const success = this.gamification.deductXP(COST);
        if (success) {
            void this.repo.replenishFreeze(current + 1);
            return { success: true };
        }
        return { success: false, reason: 'insufficient_xp' };
    }
}
