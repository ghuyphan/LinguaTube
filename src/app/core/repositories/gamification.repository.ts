import { Signal } from '@angular/core';
import { UserGamificationState, MissionType, Mission } from '../../models/gamification.model';

export interface IGamificationRepository {
    readonly state: Signal<UserGamificationState>;
    readonly isLoading: Signal<boolean>;
    readonly pendingRolloverXp: Signal<number>;
    getState(): UserGamificationState;
    addXP(amount: number): void;
    deductXP(amount: number): boolean;
    recordVideoCompleted(): Mission[];
    recordQuizCompleted(): Mission[];
    trackMissionProgress(type: MissionType, amount?: number): Mission[];
    claimMissionReward(missionId: string): number;
    claimDailyBonus(): number;
    unlockAchievements(newUnlocked: Record<string, string>, xpGained: number): void;
    markNotified(achievementIds: string[]): void;
    syncWithRemote(): Promise<void>;
}
