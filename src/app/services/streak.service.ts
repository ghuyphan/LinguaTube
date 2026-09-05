import { Injectable, inject, computed, signal } from '@angular/core';
import { OfflineStreakRepository } from '../core/repositories';

@Injectable({
    providedIn: 'root'
})
export class StreakService {
    private repo = inject(OfflineStreakRepository);

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

    constructor() {
        // Init handled by repo
    }

    /**
     * Load streak data
     */
    async loadStreak(): Promise<void> {
        await this.repo.syncWithRemote();
    }

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
     * Sync with server manually
     */
    async syncWithServer(): Promise<void> {
        await this.repo.syncWithRemote();
    }

    /**
     * Clear celebration result
     */
    clearActivityResult(): void {
        this.lastActivityResult.set(null);
    }

    /**
     * Get activity status for the last 7 days (including today)
     */
    getWeekActivity(): boolean[] {
        return this.repo.getWeekActivity();
    }
}
