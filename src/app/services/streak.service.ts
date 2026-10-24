import { Injectable, inject, computed, signal } from '@angular/core';
import { OfflineStreakRepository } from '../core/repositories';
import { AuthService } from '../core/services/auth.service';
import { GamificationService } from '../core/services/gamification.service';

@Injectable({
    providedIn: 'root'
})
export class StreakService {
    private repo = inject(OfflineStreakRepository);
    private gamification = inject(GamificationService);
    private auth = inject(AuthService);

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
    async replenishFreeze(): Promise<{ success: boolean; reason?: string }> {
        const session = this.auth.captureSession();
        if (!session.userId && this.freezesRemaining() >= 2) return { success: false, reason: 'max_reached' };
        const result = await this.gamification.purchaseFreeze();
        if (!this.auth.isCurrentSession(session)) return { success: false, reason: 'unavailable' };
        if (result.success) this.repo.applyPurchasedFreeze(result.freezes_remaining);
        return result;
    }

    /**
     * Grant a bonus streak freeze (e.g. Guardian Knight starter perk)
     */
    grantBonusFreeze(count: number = 1): void {
        const current = this.freezesRemaining();
        const next = Math.min(2, current + count);
        void this.repo.replenishFreeze(next);
    }
}
