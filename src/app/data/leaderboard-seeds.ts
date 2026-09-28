import { LeaderboardEntry } from '../models/gamification.model';

export interface SeedLeaderboardEntry {
    user_id: string;
    name: string;
    avatar: string;
    xp: number;
    weekly_xp: number;
    level: number;
    streak: number;
    badges_count: number;
    target_lang: 'ja' | 'ko' | 'zh' | 'en';
    country: string;
}

export const SEED_LEADERBOARD: SeedLeaderboardEntry[] = [
    // --- Japanese (JA) Learners ---
    { user_id: 'seed_ja_1', name: 'Kenji Sato', avatar: '', xp: 14250, weekly_xp: 850, level: 12, streak: 42, badges_count: 14, target_lang: 'ja', country: '🇯🇵' },
    { user_id: 'seed_ja_2', name: 'Wei Zhang', avatar: '', xp: 8720, weekly_xp: 620, level: 8, streak: 19, badges_count: 8, target_lang: 'ja', country: '🇯🇵' },
    { user_id: 'seed_ja_3', name: 'Mateo Rossi', avatar: '', xp: 5120, weekly_xp: 490, level: 5, streak: 10, badges_count: 5, target_lang: 'ja', country: '🇯🇵' },
    { user_id: 'seed_ja_4', name: 'Aoi Takahashi', avatar: '', xp: 3450, weekly_xp: 380, level: 4, streak: 15, badges_count: 6, target_lang: 'ja', country: '🇯🇵' },
    { user_id: 'seed_ja_5', name: 'Lucas Meyer', avatar: '', xp: 2180, weekly_xp: 260, level: 3, streak: 8, badges_count: 4, target_lang: 'ja', country: '🇩🇪' },
    { user_id: 'seed_ja_6', name: 'Sakura Ito', avatar: '', xp: 1420, weekly_xp: 180, level: 2, streak: 5, badges_count: 3, target_lang: 'ja', country: '🇯🇵' },
    { user_id: 'seed_ja_7', name: 'Daiki Watanabe', avatar: '', xp: 850, weekly_xp: 110, level: 2, streak: 3, badges_count: 2, target_lang: 'ja', country: '🇯🇵' },

    // --- Korean (KO) Learners ---
    { user_id: 'seed_ko_1', name: 'Elena Rostova', avatar: '', xp: 12890, weekly_xp: 790, level: 11, streak: 35, badges_count: 12, target_lang: 'ko', country: '🇰🇷' },
    { user_id: 'seed_ko_2', name: 'Sophia Chen', avatar: '', xp: 7640, weekly_xp: 580, level: 7, streak: 16, badges_count: 7, target_lang: 'ko', country: '🇰🇷' },
    { user_id: 'seed_ko_3', name: 'Hyun-woo Lee', avatar: '', xp: 4120, weekly_xp: 410, level: 5, streak: 8, badges_count: 4, target_lang: 'ko', country: '🇰🇷' },
    { user_id: 'seed_ko_4', name: 'Min-seo Jung', avatar: '', xp: 3100, weekly_xp: 320, level: 4, streak: 11, badges_count: 5, target_lang: 'ko', country: '🇰🇷' },
    { user_id: 'seed_ko_5', name: 'David Miller', avatar: '', xp: 1950, weekly_xp: 220, level: 3, streak: 6, badges_count: 3, target_lang: 'ko', country: '🇺🇸' },
    { user_id: 'seed_ko_6', name: 'Seo-yeon Park', avatar: '', xp: 1280, weekly_xp: 160, level: 2, streak: 4, badges_count: 3, target_lang: 'ko', country: '🇰🇷' },
    { user_id: 'seed_ko_7', name: 'Ji-hoon Choi', avatar: '', xp: 790, weekly_xp: 90, level: 2, streak: 2, badges_count: 2, target_lang: 'ko', country: '🇰🇷' },

    // --- Chinese (ZH) Learners ---
    { user_id: 'seed_zh_1', name: 'Alexandre Dubois', avatar: '', xp: 11400, weekly_xp: 740, level: 10, streak: 28, badges_count: 11, target_lang: 'zh', country: '🇨🇳' },
    { user_id: 'seed_zh_2', name: 'Liam Wilson', avatar: '', xp: 6890, weekly_xp: 530, level: 7, streak: 14, badges_count: 6, target_lang: 'zh', country: '🇬🇧' },
    { user_id: 'seed_zh_3', name: 'Ji-won Kim', avatar: '', xp: 4480, weekly_xp: 390, level: 5, streak: 9, badges_count: 5, target_lang: 'zh', country: '🇨🇳' },
    { user_id: 'seed_zh_4', name: 'Mei-ling Zhao', avatar: '', xp: 2890, weekly_xp: 290, level: 4, streak: 12, badges_count: 5, target_lang: 'zh', country: '🇨🇳' },
    { user_id: 'seed_zh_5', name: 'Carlos Santos', avatar: '', xp: 1840, weekly_xp: 210, level: 3, streak: 7, badges_count: 3, target_lang: 'zh', country: '🇧🇷' },
    { user_id: 'seed_zh_6', name: 'Xiao-wei Lin', avatar: '', xp: 1190, weekly_xp: 150, level: 2, streak: 4, badges_count: 2, target_lang: 'zh', country: '🇨🇳' },
    { user_id: 'seed_zh_7', name: 'Bowen Wang', avatar: '', xp: 650, weekly_xp: 80, level: 1, streak: 2, badges_count: 1, target_lang: 'zh', country: '🇨🇳' },

    // --- English (EN) Learners ---
    { user_id: 'seed_en_1', name: 'Min-ho Park', avatar: '', xp: 9850, weekly_xp: 680, level: 9, streak: 21, badges_count: 9, target_lang: 'en', country: '🇬🇧' },
    { user_id: 'seed_en_2', name: 'Hana Tanaka', avatar: '', xp: 5930, weekly_xp: 470, level: 6, streak: 12, badges_count: 6, target_lang: 'en', country: '🇺🇸' },
    { user_id: 'seed_en_3', name: 'Chloe Martin', avatar: '', xp: 3890, weekly_xp: 350, level: 4, streak: 7, badges_count: 4, target_lang: 'en', country: '🇬🇧' },
    { user_id: 'seed_en_4', name: 'Oliver Smith', avatar: '', xp: 2650, weekly_xp: 260, level: 4, streak: 10, badges_count: 4, target_lang: 'en', country: '🇦🇺' },
    { user_id: 'seed_en_5', name: 'Yuto Nakamura', avatar: '', xp: 1650, weekly_xp: 190, level: 3, streak: 6, badges_count: 3, target_lang: 'en', country: '🇯🇵' },
    { user_id: 'seed_en_6', name: 'Emma Johnson', avatar: '', xp: 1050, weekly_xp: 140, level: 2, streak: 3, badges_count: 2, target_lang: 'en', country: '🇨🇦' },
    { user_id: 'seed_en_7', name: 'Noah Brown', avatar: '', xp: 520, weekly_xp: 70, level: 1, streak: 1, badges_count: 1, target_lang: 'en', country: '🇺🇸' }
];

/**
 * Merge real learners with baseline community seeds so the leaderboard
 * always remains populated, vibrant, and competitive across all target languages.
 * Real users always take absolute precedence.
 */
export function mergeWithSeedLeaderboard(
    realUsers: LeaderboardEntry[] = [],
    lang: string | null = null,
    limit: number = 50,
    period: 'weekly' | 'all_time' = 'all_time'
): LeaderboardEntry[] {
    const isLangSpecific = !!lang && ['ja', 'ko', 'zh', 'en'].includes(lang);

    // Filter seeds by language if requested
    const filteredSeeds = isLangSpecific
        ? SEED_LEADERBOARD.filter(item => item.target_lang === lang)
        : SEED_LEADERBOARD;

    // Normalize real users
    const normalizedReal: LeaderboardEntry[] = (Array.isArray(realUsers) ? realUsers : [])
        .filter(u => !isLangSpecific || u.targetLang === lang || u.targetLang === 'all' || !u.targetLang)
        .map(u => ({
            rank: 0,
            userId: u.userId,
            name: u.name || 'Learner',
            avatar: u.avatar || '',
            xp: Math.max(0, u.xp || 0),
            weeklyXp: Math.max(0, u.weeklyXp || 0),
            level: Math.max(1, u.level || Math.floor(Math.sqrt((u.xp || 0) / 100)) + 1),
            streak: Math.max(0, u.streak || 0),
            badgesCount: Math.max(0, u.badgesCount || 0),
            targetLang: u.targetLang || (isLangSpecific ? lang : 'ja'),
            country: u.country || ''
        }));

    const realUserIds = new Set(normalizedReal.map(u => u.userId));

    // Convert seeds and exclude any collisions with real user IDs
    const seedFormatted: LeaderboardEntry[] = filteredSeeds
        .filter(s => !realUserIds.has(s.user_id))
        .map(s => ({
            rank: 0,
            userId: s.user_id,
            name: s.name,
            avatar: s.avatar || '',
            xp: s.xp,
            weeklyXp: s.weekly_xp || Math.round(s.xp * 0.08),
            level: s.level,
            streak: s.streak,
            badgesCount: s.badges_count,
            targetLang: s.target_lang,
            country: s.country || ''
        }));

    // Combine and sort
    const combined = [...normalizedReal, ...seedFormatted];
    if (period === 'weekly') {
        combined.sort((a, b) => (b.weeklyXp ?? 0) - (a.weeklyXp ?? 0) || b.xp - a.xp || b.streak - a.streak);
    } else {
        combined.sort((a, b) => b.xp - a.xp || b.streak - a.streak);
    }

    // Assign sequential ranks
    return combined.slice(0, limit).map((row, index) => ({
        ...row,
        rank: index + 1
    }));
}
