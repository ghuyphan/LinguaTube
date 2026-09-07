/**
 * Global Leaderboard API (Cloudflare Function)
 * Provides global learner rankings and XP synchronization.
 */

import { validateAuthToken } from '../middlewares/auth.js';
import { consumeRateLimit, getClientIdentifier } from '../middlewares/rate-limiter.js';
import { jsonResponse, handleOptions } from '../utils/utils.js';

export const SEED_LEADERBOARD = [
    { user_id: 'seed_1', name: 'Kenji Sato', avatar: '', xp: 14250, level: 12, streak: 42, badges_count: 14, target_lang: 'ja', country: '🇯🇵' },
    { user_id: 'seed_2', name: 'Elena Rostova', avatar: '', xp: 12890, level: 11, streak: 35, badges_count: 12, target_lang: 'ko', country: '🇰🇷' },
    { user_id: 'seed_3', name: 'Alexandre Dubois', avatar: '', xp: 11400, level: 10, streak: 28, badges_count: 11, target_lang: 'zh', country: '🇨🇳' },
    { user_id: 'seed_4', name: 'Min-ho Park', avatar: '', xp: 9850, level: 9, streak: 21, badges_count: 9, target_lang: 'en', country: '🇬🇧' },
    { user_id: 'seed_5', name: 'Wei Zhang', avatar: '', xp: 8720, level: 8, streak: 19, badges_count: 8, target_lang: 'ja', country: '🇯🇵' },
    { user_id: 'seed_6', name: 'Sophia Chen', avatar: '', xp: 7640, level: 7, streak: 16, badges_count: 7, target_lang: 'ko', country: '🇰🇷' },
    { user_id: 'seed_7', name: 'Liam Wilson', avatar: '', xp: 6890, level: 7, streak: 14, badges_count: 6, target_lang: 'zh', country: '🇨🇳' },
    { user_id: 'seed_8', name: 'Hana Tanaka', avatar: '', xp: 5930, level: 6, streak: 12, badges_count: 6, target_lang: 'en', country: '🇺🇸' },
    { user_id: 'seed_9', name: 'Mateo Rossi', avatar: '', xp: 5120, level: 5, streak: 10, badges_count: 5, target_lang: 'ja', country: '🇯🇵' },
    { user_id: 'seed_10', name: 'Ji-won Kim', avatar: '', xp: 4480, level: 5, streak: 9, badges_count: 5, target_lang: 'zh', country: '🇨🇳' }
];

export async function onRequestOptions() {
    return handleOptions(['GET', 'POST', 'OPTIONS']);
}

const memLeaderboardCache = new Map();
const MEM_LEADERBOARD_TTL_MS = 60 * 1000;

export async function onRequestGet(context) {
    const { request, env } = context;

    try {
        const url = new URL(request.url);
        const lang = url.searchParams.get('lang');
        const userId = url.searchParams.get('userId');
        const limitParam = parseInt(url.searchParams.get('limit') || '50', 10);
        const limit = Math.max(1, Math.min(100, isNaN(limitParam) ? 50 : limitParam));

        let topLearners = [];
        const cacheKey = `${lang || 'all'}_${limit}`;
        const cached = memLeaderboardCache.get(cacheKey);
        if (cached && Date.now() < cached.expiresAt) {
            topLearners = cached.data;
        } else {
            const db = env.VOCAB_DB || env.DB;
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
                    if (result && result.results && result.results.length > 0) {
                        topLearners = result.results.map((row, index) => ({
                            rank: index + 1,
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
                        memLeaderboardCache.set(cacheKey, { data: topLearners, expiresAt: Date.now() + MEM_LEADERBOARD_TTL_MS });
                    }
                } catch (d1Err) {
                    console.warn('[Leaderboard API] D1 query failed, falling back to seed:', d1Err.message);
                }
            }
        }

        // Fallback to seed data if D1 is empty or unavailable
        if (topLearners.length === 0) {
            let filtered = SEED_LEADERBOARD;
            if (lang && ['ja', 'ko', 'zh', 'en'].includes(lang)) {
                filtered = SEED_LEADERBOARD.filter(item => item.target_lang === lang);
                if (filtered.length === 0) filtered = SEED_LEADERBOARD;
            }
            topLearners = filtered.slice(0, limit).map((row, index) => ({
                rank: index + 1,
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
        }

        // Calculate specific user rank if requested
        let userRank = null;
        if (userId) {
            const foundIndex = topLearners.findIndex(u => u.userId === userId);
            if (foundIndex !== -1) {
                userRank = topLearners[foundIndex];
            } else if (db) {
                try {
                    const userRow = await db.prepare(`
                        SELECT user_id, name, avatar, xp, level, streak, badges_count, target_lang, country
                        FROM leaderboard WHERE user_id = ?
                    `).bind(userId).first();

                    if (userRow) {
                        const rankRow = await db.prepare(`
                            SELECT COUNT(*) + 1 as rank FROM leaderboard WHERE xp > ?
                        `).bind(userRow.xp).first();

                        userRank = {
                            rank: rankRow?.rank || 999,
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
        }

        return jsonResponse({
            success: true,
            topLearners,
            userRank
        }, 200, {
            'Cache-Control': 'public, max-age=30, s-maxage=60'
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
        let userId = '';

        if (authResult.valid && authResult.userId) {
            userId = authResult.userId;
        } else if (typeof body.guest_id === 'string' && body.guest_id.startsWith('guest_') && body.guest_id.length <= 40) {
            userId = body.guest_id;
        } else {
            return jsonResponse({
                success: false,
                error: 'Missing or invalid user identifier'
            }, 400);
        }

        const rawName = (authResult.valid && (authResult.user?.name || authResult.user?.username))
            ? (authResult.user.name || authResult.user.username)
            : (body.name || 'Learner');
        const name = String(rawName).replace(/[<>]/g, '').trim().slice(0, 30) || 'Learner';

        const xp = Math.max(0, Math.min(1000000, parseInt(body.xp, 10) || 0));
        const level = Math.max(1, Math.min(100, parseInt(body.level, 10) || 1));
        const streak = Math.max(0, Math.min(10000, parseInt(body.streak, 10) || 0));
        const badgesCount = Math.max(0, Math.min(100, parseInt(body.badges_count, 10) || 0));
        const targetLang = ['ja', 'ko', 'zh', 'en'].includes(body.target_lang) ? body.target_lang : 'ja';
        const country = typeof body.country === 'string' ? body.country.slice(0, 8) : '';
        const avatar = typeof body.avatar === 'string' && body.avatar.startsWith('http') ? body.avatar.slice(0, 250) : '';

        const db = env.VOCAB_DB || env.DB;
        if (db) {
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
