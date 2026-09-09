/**
 * Global Leaderboard API (Cloudflare Function)
 * Provides global learner rankings and XP synchronization.
 */

import { validateAuthToken } from '../middlewares/auth.js';
import { consumeRateLimit, getClientIdentifier } from '../middlewares/rate-limiter.js';
import { jsonResponse, handleOptions } from '../utils/utils.js';

export const SEED_LEADERBOARD = [
    // --- Japanese (JA) Learners ---
    { user_id: 'seed_ja_1', name: 'Kenji Sato', avatar: '', xp: 14250, level: 12, streak: 42, badges_count: 14, target_lang: 'ja', country: '🇯🇵' },
    { user_id: 'seed_ja_2', name: 'Wei Zhang', avatar: '', xp: 8720, level: 8, streak: 19, badges_count: 8, target_lang: 'ja', country: '🇯🇵' },
    { user_id: 'seed_ja_3', name: 'Mateo Rossi', avatar: '', xp: 5120, level: 5, streak: 10, badges_count: 5, target_lang: 'ja', country: '🇯🇵' },
    { user_id: 'seed_ja_4', name: 'Aoi Takahashi', avatar: '', xp: 3450, level: 4, streak: 15, badges_count: 6, target_lang: 'ja', country: '🇯🇵' },
    { user_id: 'seed_ja_5', name: 'Lucas Meyer', avatar: '', xp: 2180, level: 3, streak: 8, badges_count: 4, target_lang: 'ja', country: '🇩🇪' },
    { user_id: 'seed_ja_6', name: 'Sakura Ito', avatar: '', xp: 1420, level: 2, streak: 5, badges_count: 3, target_lang: 'ja', country: '🇯🇵' },
    { user_id: 'seed_ja_7', name: 'Daiki Watanabe', avatar: '', xp: 850, level: 2, streak: 3, badges_count: 2, target_lang: 'ja', country: '🇯🇵' },

    // --- Korean (KO) Learners ---
    { user_id: 'seed_ko_1', name: 'Elena Rostova', avatar: '', xp: 12890, level: 11, streak: 35, badges_count: 12, target_lang: 'ko', country: '🇰🇷' },
    { user_id: 'seed_ko_2', name: 'Sophia Chen', avatar: '', xp: 7640, level: 7, streak: 16, badges_count: 7, target_lang: 'ko', country: '🇰🇷' },
    { user_id: 'seed_ko_3', name: 'Hyun-woo Lee', avatar: '', xp: 4120, level: 5, streak: 8, badges_count: 4, target_lang: 'ko', country: '🇰🇷' },
    { user_id: 'seed_ko_4', name: 'Min-seo Jung', avatar: '', xp: 3100, level: 4, streak: 11, badges_count: 5, target_lang: 'ko', country: '🇰🇷' },
    { user_id: 'seed_ko_5', name: 'David Miller', avatar: '', xp: 1950, level: 3, streak: 6, badges_count: 3, target_lang: 'ko', country: '🇺🇸' },
    { user_id: 'seed_ko_6', name: 'Seo-yeon Park', avatar: '', xp: 1280, level: 2, streak: 4, badges_count: 3, target_lang: 'ko', country: '🇰🇷' },
    { user_id: 'seed_ko_7', name: 'Ji-hoon Choi', avatar: '', xp: 790, level: 2, streak: 2, badges_count: 2, target_lang: 'ko', country: '🇰🇷' },

    // --- Chinese (ZH) Learners ---
    { user_id: 'seed_zh_1', name: 'Alexandre Dubois', avatar: '', xp: 11400, level: 10, streak: 28, badges_count: 11, target_lang: 'zh', country: '🇨🇳' },
    { user_id: 'seed_zh_2', name: 'Liam Wilson', avatar: '', xp: 6890, level: 7, streak: 14, badges_count: 6, target_lang: 'zh', country: '🇬🇧' },
    { user_id: 'seed_zh_3', name: 'Ji-won Kim', avatar: '', xp: 4480, level: 5, streak: 9, badges_count: 5, target_lang: 'zh', country: '🇨🇳' },
    { user_id: 'seed_zh_4', name: 'Mei-ling Zhao', avatar: '', xp: 2890, level: 4, streak: 12, badges_count: 5, target_lang: 'zh', country: '🇨🇳' },
    { user_id: 'seed_zh_5', name: 'Carlos Santos', avatar: '', xp: 1840, level: 3, streak: 7, badges_count: 3, target_lang: 'zh', country: '🇧🇷' },
    { user_id: 'seed_zh_6', name: 'Xiao-wei Lin', avatar: '', xp: 1190, level: 2, streak: 4, badges_count: 2, target_lang: 'zh', country: '🇨🇳' },
    { user_id: 'seed_zh_7', name: 'Bowen Wang', avatar: '', xp: 650, level: 1, streak: 2, badges_count: 1, target_lang: 'zh', country: '🇨🇳' },

    // --- English (EN) Learners ---
    { user_id: 'seed_en_1', name: 'Min-ho Park', avatar: '', xp: 9850, level: 9, streak: 21, badges_count: 9, target_lang: 'en', country: '🇬🇧' },
    { user_id: 'seed_en_2', name: 'Hana Tanaka', avatar: '', xp: 5930, level: 6, streak: 12, badges_count: 6, target_lang: 'en', country: '🇺🇸' },
    { user_id: 'seed_en_3', name: 'Chloe Martin', avatar: '', xp: 3890, level: 4, streak: 7, badges_count: 4, target_lang: 'en', country: '🇬🇧' },
    { user_id: 'seed_en_4', name: 'Oliver Smith', avatar: '', xp: 2650, level: 4, streak: 10, badges_count: 4, target_lang: 'en', country: '🇦🇺' },
    { user_id: 'seed_en_5', name: 'Yuto Nakamura', avatar: '', xp: 1650, level: 3, streak: 6, badges_count: 3, target_lang: 'en', country: '🇯🇵' },
    { user_id: 'seed_en_6', name: 'Emma Johnson', avatar: '', xp: 1050, level: 2, streak: 3, badges_count: 2, target_lang: 'en', country: '🇨🇦' },
    { user_id: 'seed_en_7', name: 'Noah Brown', avatar: '', xp: 520, level: 1, streak: 1, badges_count: 1, target_lang: 'en', country: '🇺🇸' }
];

export async function onRequestOptions() {
    return handleOptions(['GET', 'POST', 'OPTIONS']);
}

const memLeaderboardCache = new Map();
const MEM_LEADERBOARD_TTL_MS = 60 * 1000;

/**
 * Merge real learners with baseline community seeds so the leaderboard
 * always remains populated, vibrant, and competitive across all target languages.
 * Real users always take absolute precedence.
 * 
 * @param {Array} realUsers - Real users fetched from D1 or PocketBase
 * @param {string|null} lang - Target language filter ('ja', 'ko', 'zh', 'en', or null/all)
 * @param {number} limit - Maximum number of top learners to return (default 50)
 * @returns {Array} Sorted and ranked list of learners
 */
export function mergeWithSeedLeaderboard(realUsers = [], lang = null, limit = 50) {
    const isLangSpecific = lang && ['ja', 'ko', 'zh', 'en'].includes(lang);

    // Filter seeds by language if requested
    const filteredSeeds = isLangSpecific
        ? SEED_LEADERBOARD.filter(item => item.target_lang === lang)
        : SEED_LEADERBOARD;

    // Normalize real users
    const normalizedReal = (Array.isArray(realUsers) ? realUsers : [])
        .filter(u => !isLangSpecific || (u.targetLang || u.target_lang) === lang)
        .map(u => ({
            userId: u.userId || u.user_id,
            name: u.name || 'Learner',
            avatar: u.avatar || '',
            xp: Math.max(0, parseInt(u.xp, 10) || 0),
            level: Math.max(1, parseInt(u.level, 10) || Math.floor(Math.sqrt((parseInt(u.xp, 10) || 0) / 100)) + 1),
            streak: Math.max(0, parseInt(u.streak, 10) || 0),
            badgesCount: Math.max(0, parseInt(u.badgesCount ?? u.badges_count, 10) || 0),
            targetLang: u.targetLang || u.target_lang || (isLangSpecific ? lang : 'ja'),
            country: u.country || ''
        }));

    const realUserIds = new Set(normalizedReal.map(u => u.userId));

    // Convert seeds and exclude any collisions with real user IDs
    const seedFormatted = filteredSeeds
        .filter(s => !realUserIds.has(s.user_id))
        .map(s => ({
            userId: s.user_id,
            name: s.name,
            avatar: s.avatar || '',
            xp: s.xp,
            level: s.level,
            streak: s.streak,
            badgesCount: s.badges_count,
            targetLang: s.target_lang,
            country: s.country || ''
        }));

    // Combine and sort by XP descending (tie-break by streak descending)
    const combined = [...normalizedReal, ...seedFormatted];
    combined.sort((a, b) => b.xp - a.xp || b.streak - a.streak);

    // Assign sequential ranks
    return combined.slice(0, limit).map((row, index) => ({
        ...row,
        rank: index + 1
    }));
}

export async function onRequestGet(context) {
    const { request, env } = context;
    const db = env.VOCAB_DB || env.DB;

    try {
        const url = new URL(request.url);
        const lang = url.searchParams.get('lang');
        const userId = url.searchParams.get('userId');
        const limitParam = parseInt(url.searchParams.get('limit') || '50', 10);
        const limit = Math.max(1, Math.min(100, isNaN(limitParam) ? 50 : limitParam));
        const isRefresh = url.searchParams.get('refresh') === 'true' || url.searchParams.get('force') === 'true' || url.searchParams.has('_t');

        let rawRealUsers = null;
        const cacheKey = `${lang || 'all'}_${limit}`;

        if (!isRefresh) {
            const cached = memLeaderboardCache.get(cacheKey);
            if (cached && Date.now() < cached.expiresAt) {
                rawRealUsers = cached.data;
            }
        }

        if (rawRealUsers === null) {
            rawRealUsers = [];
            if (db) {
                try {
                    let query = `
                        SELECT user_id, name, avatar, xp, level, streak, badges_count, target_lang, country, updated_at
                        FROM leaderboard
                    `;
                    const params = [];

                    if (lang && ['ja', 'ko', 'zh', 'en'].includes(lang)) {
                        query += ` WHERE target_lang = ?`;
                        params.push(lang);
                    }

                    query += ` ORDER BY xp DESC LIMIT ?`;
                    params.push(limit);

                    const result = await db.prepare(query).bind(...params).all();
                    if (result && Array.isArray(result.results)) {
                        rawRealUsers = result.results.map(row => ({
                            userId: row.user_id,
                            name: row.name,
                            avatar: row.avatar || '',
                            xp: row.xp,
                            level: row.level,
                            streak: row.streak,
                            badgesCount: row.badges_count,
                            targetLang: row.target_lang,
                            country: row.country || ''
                        }));
                        memLeaderboardCache.set(cacheKey, { data: rawRealUsers, expiresAt: Date.now() + MEM_LEADERBOARD_TTL_MS });
                    }
                } catch (d1Err) {
                    console.warn('[Leaderboard API] D1 query failed:', d1Err.message);
                }
            }

            // If D1 returned no rows, query PocketHost gamification collection
            if (rawRealUsers.length === 0) {
                const pocketbaseUrl = env.POCKETHOST_URL || env.PB_URL || 'https://voca.pockethost.io';
                try {
                    const authHeader = request.headers.get('Authorization');
                    const reqHeaders = { 'Accept': 'application/json' };
                    if (authHeader) reqHeaders['Authorization'] = authHeader;

                    const pbRes = await fetch(`${pocketbaseUrl}/api/collections/gamification/records?sort=-xp&perPage=${limit}&expand=user`, {
                        headers: reqHeaders,
                        signal: AbortSignal.timeout(4000)
                    });

                    if (pbRes.ok) {
                        const pbData = await pbRes.json();
                        if (Array.isArray(pbData.items) && pbData.items.length > 0) {
                            rawRealUsers = pbData.items.map(row => {
                                const u = row.expand?.user || {};
                                const name = u.name || u.username || 'Learner';
                                const avatar = u.avatar ? `${pocketbaseUrl}/api/files/_pb_users_auth_/${u.id}/${u.avatar}` : (u.picture || '');
                                const badgesCount = row.unlocked_achievements ? Object.keys(row.unlocked_achievements).length : 0;
                                return {
                                    userId: row.user || row.id,
                                    name,
                                    avatar,
                                    xp: row.xp || 0,
                                    level: row.level || Math.max(1, Math.floor(Math.sqrt((row.xp || 0) / 100)) + 1),
                                    streak: 0,
                                    badgesCount,
                                    targetLang: lang && ['ja', 'ko', 'zh', 'en'].includes(lang) ? lang : 'ja',
                                    country: ''
                                };
                            });
                            memLeaderboardCache.set(cacheKey, { data: rawRealUsers, expiresAt: Date.now() + MEM_LEADERBOARD_TTL_MS });
                        }
                    }
                } catch (pbErr) {
                    console.warn('[Leaderboard API] PocketHost query failed:', pbErr.message);
                }
            }
        }

        // Merge real users with baseline community seed learners
        const topLearners = mergeWithSeedLeaderboard(rawRealUsers, lang, limit);

        // Calculate specific user rank if requested
        let userRank = null;
        if (userId) {
            const foundIndex = topLearners.findIndex(u => u.userId === userId);
            if (foundIndex !== -1) {
                userRank = topLearners[foundIndex];
            } else {
                // User is not in top limit list. Retrieve user info from D1 or raw real users
                let userEntry = rawRealUsers.find(u => u.userId === userId);
                if (!userEntry && db) {
                    try {
                        const userRow = await db.prepare(`
                            SELECT user_id, name, avatar, xp, level, streak, badges_count, target_lang, country
                            FROM leaderboard WHERE user_id = ?
                        `).bind(userId).first();

                        if (userRow) {
                            userEntry = {
                                userId: userRow.user_id,
                                name: userRow.name,
                                avatar: userRow.avatar || '',
                                xp: userRow.xp,
                                level: userRow.level,
                                streak: userRow.streak,
                                badgesCount: userRow.badges_count,
                                targetLang: userRow.target_lang,
                                country: userRow.country || ''
                            };
                        }
                    } catch { }
                }

                if (userEntry) {
                    // Count how many learners in the complete pool have higher XP
                    const isLangSpecific = lang && ['ja', 'ko', 'zh', 'en'].includes(lang);
                    const poolSeeds = isLangSpecific
                        ? SEED_LEADERBOARD.filter(s => s.target_lang === lang)
                        : SEED_LEADERBOARD;

                    let higherCount = poolSeeds.filter(s => s.xp > userEntry.xp).length;

                    if (db) {
                        try {
                            let countQuery = `SELECT COUNT(*) as cnt FROM leaderboard WHERE xp > ?`;
                            const countParams = [userEntry.xp];
                            if (isLangSpecific) {
                                countQuery += ` AND target_lang = ?`;
                                countParams.push(lang);
                            }
                            const higherDbRow = await db.prepare(countQuery).bind(...countParams).first();
                            if (higherDbRow && typeof higherDbRow.cnt === 'number') {
                                higherCount += higherDbRow.cnt;
                            }
                        } catch {
                            higherCount += rawRealUsers.filter(u => u.xp > userEntry.xp).length;
                        }
                    } else {
                        higherCount += rawRealUsers.filter(u => u.xp > userEntry.xp).length;
                    }

                    userRank = {
                        rank: higherCount + 1,
                        userId: userEntry.userId,
                        name: userEntry.name,
                        avatar: userEntry.avatar || '',
                        xp: userEntry.xp,
                        level: userEntry.level,
                        streak: userEntry.streak,
                        badgesCount: userEntry.badgesCount,
                        targetLang: userEntry.targetLang,
                        country: userEntry.country || ''
                    };
                }
            }
        }

        return jsonResponse({
            success: true,
            topLearners,
            userRank
        }, 200, {
            'Cache-Control': 'private, no-cache, no-store, must-revalidate',
            'Vary': 'Accept, Authorization'
        });
    } catch (err) {
        console.error('[Leaderboard API] GET error:', err.message);
        return jsonResponse({
            success: false,
            error: 'Failed to retrieve leaderboard'
        }, 500);
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const authResult = await validateAuthToken(request, env);
        const clientId = getClientIdentifier(request, authResult);

        // Rate limit submissions: 15 per 10 minutes
        const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientId, {
            max: 15,
            windowSeconds: 600,
            keyPrefix: 'rate_leaderboard'
        });

        if (!rateCheck.allowed) {
            return jsonResponse({
                success: false,
                error: 'Rate limit exceeded for score updates. Please try again later.'
            }, 429);
        }

        const body = await request.json().catch(() => ({}));

        // Guests compute rank locally; do not allow anonymous writes to the global competitive leaderboard
        if (!authResult.valid || !authResult.userId) {
            return jsonResponse({
                success: true,
                guest: true,
                message: 'Sign in to join the global leaderboard'
            }, 200);
        }

        const userId = authResult.userId;
        const rawName = (authResult.user?.name || authResult.user?.username) || body.name || 'Learner';
        const name = String(rawName).replace(/[<>]/g, '').trim().slice(0, 30) || 'Learner';

        const xp = Math.max(0, Math.min(1000000, parseInt(body.xp, 10) || 0));
        // Canonical level derived from XP: level = floor(sqrt(xp / 100)) + 1
        const level = Math.max(1, Math.min(100, Math.floor(Math.sqrt(xp / 100)) + 1));
        const streak = Math.max(0, Math.min(10000, parseInt(body.streak, 10) || 0));
        const badgesCount = Math.max(0, Math.min(100, parseInt(body.badges_count, 10) || 0));
        const targetLang = ['ja', 'ko', 'zh', 'en'].includes(body.target_lang) ? body.target_lang : 'ja';
        const country = typeof body.country === 'string' ? body.country.slice(0, 8) : '';
        const avatar = typeof body.avatar === 'string' && body.avatar.startsWith('http') ? body.avatar.slice(0, 250) : '';

        const db = env.VOCAB_DB || env.DB;
        if (db) {
            try {
                // Guard against massive unverified XP jumps in a single call
                const existing = await db.prepare('SELECT xp FROM leaderboard WHERE user_id = ?').bind(userId).first();
                if (existing && xp > existing.xp + 10000) {
                    return jsonResponse({
                        success: false,
                        error: 'XP increment exceeds single update threshold'
                    }, 400);
                }

                await db.prepare(`
                    INSERT INTO leaderboard (user_id, name, avatar, xp, level, streak, badges_count, target_lang, country, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, strftime('%s', 'now'))
                    ON CONFLICT(user_id) DO UPDATE SET
                      name = excluded.name,
                      avatar = COALESCE(NULLIF(excluded.avatar, ''), leaderboard.avatar),
                      xp = MAX(leaderboard.xp, excluded.xp),
                      level = MAX(leaderboard.level, excluded.level),
                      streak = MAX(leaderboard.streak, excluded.streak),
                      badges_count = MAX(leaderboard.badges_count, excluded.badges_count),
                      target_lang = COALESCE(excluded.target_lang, leaderboard.target_lang),
                      country = COALESCE(NULLIF(excluded.country, ''), leaderboard.country),
                      updated_at = strftime('%s', 'now')
                `).bind(userId, name, avatar, xp, level, streak, badgesCount, targetLang, country).run();
                memLeaderboardCache.clear();
            } catch (dbErr) {
                console.warn('[Leaderboard API] D1 upsert skipped (table may not exist):', dbErr.message);
            }
        }

        return jsonResponse({
            success: true,
            updated: true,
            userId,
            xp,
            level
        }, 200);
    } catch (err) {
        console.error('[Leaderboard API] POST error:', err.message);
        return jsonResponse({
            success: false,
            error: 'Failed to update score on leaderboard'
        }, 500);
    }
}
