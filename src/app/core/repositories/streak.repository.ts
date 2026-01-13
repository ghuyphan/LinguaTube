export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    freezesRemaining: number;
    lastActivity: string | null;
    practicedToday: boolean;
}

export interface ActivityResult {
    freezeUsed: boolean;
    isNewRecord: boolean;
    milestone?: number;
}

export interface IStreakRepository {
    getStreak(): StreakData;
    recordActivity(): Promise<ActivityResult | null>;
    getWeekActivity(): boolean[];
    syncWithRemote(): Promise<void>;
}
