import { Signal } from '@angular/core';
import { UserGamificationState } from '../../models/gamification.model';

export interface IGamificationRepository {
    readonly state: Signal<UserGamificationState>;
    readonly isLoading: Signal<boolean>;
    getState(): UserGamificationState;
    addXP(amount: number): void;
    recordVideoCompleted(): void;
    recordQuizCompleted(): void;
    unlockAchievements(newUnlocked: Record<string, string>, xpGained: number): void;
    markNotified(achievementIds: string[]): void;
    syncWithRemote(): Promise<void>;
}
