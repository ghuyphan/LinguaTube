import { IconName } from '../shared/components/icon/icon.component';

export type AchievementCategory = 'immersion' | 'vocabulary' | 'streak' | 'srs' | 'quiz';
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'diamond';

export interface Achievement {
    id: string;
    titleKey: string;
    descriptionKey: string;
    category: AchievementCategory;
    tier: AchievementTier;
    icon: IconName;
    target: number;
    progress: number;
    unlocked: boolean;
    unlockedAt?: string;
    xpReward: number;
}

export type MissionType = 'watch_video' | 'save_word' | 'srs_review' | 'complete_quiz' | 'look_up_dict';

export interface Mission {
    id: string;
    type: MissionType;
    titleKey: string;
    descriptionKey: string;
    icon: IconName;
    target: number;
    progress: number;
    completed: boolean;
    claimed: boolean;
    xpReward: number;
}

export interface DailyMissionsState {
    date: string; // YYYY-MM-DD
    missions: Mission[];
    allCompletedBonusClaimed: boolean;
    bonusXp: number;
}

export interface UserGamificationState {
    xp: number;
    level: number;
    weeklyXp: number;
    currentWeekKey: string; // e.g. "2026-W37"
    unlockedAchievements: Record<string, string>; // id -> unlockedAt ISO string
    notifiedAchievements: string[];               // IDs already toasted/celebrated
    totalVideosWatched: number;
    totalQuizzesCompleted: number;
    dailyMissions?: DailyMissionsState;
    updatedAt?: string;
}

export interface PocketBaseGamificationRecord {
    id: string;
    user: string;
    xp: number;
    level: number;
    weekly_xp?: number;
    current_week_key?: string;
    total_videos_watched: number;
    total_quizzes_completed: number;
    unlocked_achievements: Record<string, string>;
    notified_achievements: string[];
    created?: string;
    updated?: string;
}

export interface LeaderboardEntry {
    rank: number;
    userId: string;
    name: string;
    avatar: string;
    xp: number;
    weeklyXp?: number;
    level: number;
    streak: number;
    badgesCount: number;
    targetLang: string;
    country: string;
}

