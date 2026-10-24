import { matchesSecret } from '../utils/secret-auth.js';
/**
 * Heal Video Levels API (Cloudflare Function)
 * Maintenance endpoint to audit and re-grade cached videos using the calibrated 4-language level estimator.
 * 
 * Route: POST or GET /api/heal-levels
 * Auth: Admin Supabase token or x-admin-secret header
 * Body/Query: { videoId?: string, limit?: number, offset?: number, forceAll?: boolean }
 */

import { jsonResponse, handleOptions, sanitizeVideoId } from '../utils/utils.js';
import { saveVideoLevel } from '../data/video-info-db.js';
import { getTranscriptFromR2 } from '../data/transcript-r2.js';
import { estimateTranscriptLevel } from '../utils/level-estimator.js';
import { validateAuthToken } from '../middlewares/auth.js';


export async function onRequestOptions() {
    return handleOptions(['GET', 'POST', 'OPTIONS']);
}

export async function onRequest(context) {
    const { request, env } = context;
    if (request.method === 'OPTIONS') {
        return handleOptions(['GET', 'POST', 'OPTIONS']);
    }

    // 1. Authorize admin
    const authHeader = request.headers.get('Authorization') || '';
    const adminSecret = request.headers.get('x-admin-secret') || '';
    let isAuthorized = false;
    if (env.HEAL_ADMIN_SECRET && adminSecret) isAuthorized = await matchesSecret(adminSecret, env.HEAL_ADMIN_SECRET);

    if (!isAuthorized && authHeader) {
        const authResult = await validateAuthToken(request, env);
        const adminIds = (env.ADMIN_USER_IDS || '').split(',').map(id => id.trim()).filter(Boolean);
        if (authResult.valid && adminIds.includes(authResult.user?.id)) {
            isAuthorized = true;
        }
    }

    if (!isAuthorized) {
        return jsonResponse({ error: 'Unauthorized. Admin credentials or valid secret required.' }, 401);
    }

    const url = new URL(request.url);
    let params = {};
    if (request.method === 'POST') {
        try {
            params = await request.json();
        } catch {
            params = {};
        }
    }
    const targetVideoId = sanitizeVideoId(params.videoId || url.searchParams.get('videoId'));
    const limit = Math.min(200, Math.max(1, parseInt(params.limit || url.searchParams.get('limit') || '50', 10)));
    const offset = Math.max(0, parseInt(params.offset || url.searchParams.get('offset') || '0', 10));
    const forceAll = Boolean(params.forceAll || url.searchParams.get('forceAll') === 'true');

    const db = env.VOCAB_DB;
    const r2 = env.TRANSCRIPT_STORAGE;

    if (!db) {
        return jsonResponse({ error: 'Database VOCAB_DB binding missing' }, 500);
    }

    try {
        let query = 'SELECT video_id, sub_languages, levels, title, channel FROM video_languages';
        const bindings = [];

        if (targetVideoId) {
            query += ' WHERE video_id = ?';
            bindings.push(targetVideoId);
        } else {
            query += ' ORDER BY updated_at DESC LIMIT ? OFFSET ?';
            bindings.push(limit, offset);
        }

        const stmt = db.prepare(query);
        const { results } = await (bindings.length > 0 ? stmt.bind(...bindings).all() : stmt.all());

        const healed = [];
        let totalExamined = 0;

        for (const row of (results || [])) {
            totalExamined++;
            const vId = row.video_id;
            let currentLevels = {};
            try {
                currentLevels = typeof row.levels === 'string' ? JSON.parse(row.levels) : (row.levels || {});
            } catch {
                currentLevels = {};
            }

            let subLangs = [];
            try {
                subLangs = typeof row.sub_languages === 'string' ? JSON.parse(row.sub_languages) : (row.sub_languages || []);
            } catch {
                subLangs = [];
            }
            if (!Array.isArray(subLangs) || subLangs.length === 0) {
                subLangs = ['ja', 'zh', 'ko', 'en'];
            }

            for (const lang of subLangs) {
                const normLang = (lang || '').split('-')[0].toLowerCase();
                if (!['ja', 'zh', 'ko', 'en'].includes(normLang)) continue;

                const existing = currentLevels[normLang];
                const needsHeal = forceAll || !existing || existing.method === 'server_heuristic' || existing.method === 'metadata';

                if (!needsHeal) continue;

                // Check R2 for cached transcript
                let cached = null;
                if (r2) {
                    cached = await getTranscriptFromR2(r2, vId, lang);
                    if (!cached?.segments?.length && normLang !== lang) {
                        cached = await getTranscriptFromR2(r2, vId, normLang);
                    }
                }

                if (cached?.segments?.length > 0) {
                    const newEst = estimateTranscriptLevel(cached.segments, normLang, {
                        title: row.title,
                        channel: row.channel
                    });

                    if (newEst) {
                        const oldLevel = existing?.level || 'None';
                        const oldScore = existing?.score ?? null;

                        await saveVideoLevel(
                            db,
                            null,
                            vId,
                            normLang,
                            newEst.level,
                            newEst.confidence,
                            newEst.method,
                            { ...newEst, forceUpdate: true }
                        );

                        healed.push({
                            videoId: vId,
                            language: normLang,
                            oldLevel,
                            oldScore,
                            newLevel: newEst.level,
                            newScore: newEst.score,
                            tier: newEst.tier,
                            method: newEst.method
                        });
                    }
                }
            }
        }

        return jsonResponse({
            success: true,
            totalExamined,
            totalHealed: healed.length,
            healed,
            nextOffset: targetVideoId ? null : (offset + limit)
        }, 200);

    } catch (err) {
        console.error('[HealLevels] Execution error:', err);
        return jsonResponse({ error: 'Healing failed', details: err.message }, 500);
    }
}
