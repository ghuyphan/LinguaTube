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

export interface UserGamificationState {
    xp: number;
    level: number;
    unlockedAchievements: Record<string, string>; // id -> unlockedAt ISO string
    notifiedAchievements: string[];               // IDs already toasted/celebrated
    totalVideosWatched: number;
    totalQuizzesCompleted: number;
}

export interface LeaderboardEntry {
    rank: number;
    userId: string;
    name: string;
    avatar: string;
    xp: number;
    level: number;
    streak: number;
    badgesCount: number;
    targetLang: string;
    country: string;
}

