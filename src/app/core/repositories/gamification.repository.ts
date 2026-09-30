import { Signal } from '@angular/core';
import { UserGamificationState, MissionType, Mission } from '../../models/gamification.model';

export interface IGamificationRepository {
    readonly state: Signal<UserGamificationState>;
    readonly isLoading: Signal<boolean>;
    readonly pendingRolloverXp: Signal<number>;
    getState(): UserGamificationState;
    addXP(amount: number, activityType?: string, referenceId?: string): void;
    deductXP(amount: number, purpose?: string, itemId?: string): boolean;
    recordVideoCompleted(videoId?: string): Mission[];
    recordQuizCompleted(quizId?: string): Mission[];
    trackMissionProgress(type: MissionType, amount?: number): Mission[];
    claimMissionReward(missionId: string): number;
    claimDailyBonus(): number;
    unlockAchievements(newUnlocked: Record<string, string>, xpGained: number): void;
    markNotified(achievementIds: string[]): void;
    syncWithRemote(): Promise<void>;
}
