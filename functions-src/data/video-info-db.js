/**
 * Video Info D1/KV Helpers
 * Two-tier caching for video language discovery
 * 
 * Pattern:
 * - KV: Fast cache with 24hr TTL (temporary)
 * - D1: Persistent storage (video_languages, no_transcript_cache)
 */

import { getVideoMetadata } from '../middlewares/video-validator.js';

// KV cache TTLs
const VIDEO_INFO_KV_TTL = 60 * 60 * 24; // 24 hours

// D1 cleanup threshold (7 days)
const NO_TRANSCRIPT_MAX_AGE_SECONDS = 7 * 24 * 60 * 60;

// ============================================================================
// Video Languages (D1)
// ============================================================================

/**
 * Get video language info from D1
 * @param {D1Database} db
 * @param {string} videoId
 * @returns {Promise<{availableLanguages: string[], hasAutoCaptions: boolean, durationSeconds: number, title: string, channel: string, levels: Record<string, string>} | null>}
 */
export async function getVideoLanguages(db, videoId) {
    if (!db || !videoId) return null;

    try {
        const row = await db.prepare(`
            SELECT available_languages, has_auto_captions, duration_seconds, title, channel, levels
            FROM video_languages WHERE video_id = ?
        `).bind(videoId).first();

        if (!row) return null;

        let levels = {};
        try {
            if (row.levels) levels = JSON.parse(row.levels);
        } catch { }

        return {
            availableLanguages: JSON.parse(row.available_languages || '[]'),
            hasAutoCaptions: !!row.has_auto_captions,
            durationSeconds: row.duration_seconds,
            title: row.title,
            channel: row.channel,
            levels
        };
    } catch (err) {
        console.error('[VideoInfoDB] getVideoLanguages error:', err.message);
        return null;
    }
}

/**
 * Save video language info to D1
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string[]} languages - Available language codes
 * @param {number} [duration] - Duration in seconds
 * @param {string} [title] - Video title
 * @param {string} [channel] - Channel name
 * @param {boolean} [hasAutoCaptions] - Whether video has auto-captions
 * @param {Record<string, string>} [levels] - Difficulty levels by language
 */
export async function saveVideoLanguages(db, videoId, languages, duration = null, title = null, channel = null, hasAutoCaptions = false, levels = null) {
    if (!db || !videoId) return;

    try {
        let existingLevels = {};
        if (levels === null) {
            const existing = await getVideoLanguages(db, videoId);
            existingLevels = existing?.levels || {};
        } else {
            existingLevels = levels;
        }

        await db.prepare(`
            INSERT OR REPLACE INTO video_languages 
            (video_id, available_languages, has_auto_captions, duration_seconds, title, channel, levels, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, strftime('%s', 'now'))
        `).bind(
            videoId,
            JSON.stringify(languages),
            hasAutoCaptions ? 1 : 0,
            duration,
            title,
            channel,
            JSON.stringify(existingLevels)
        ).run();
    } catch (err) {
        console.error('[VideoInfoDB] saveVideoLanguages error:', err.message);
    }
}

/**
 * Save or update a single language level in D1 & KV
 * @param {D1Database} db
 * @param {KVNamespace} [kv]
 * @param {string} videoId
 * @param {string} language
 * @param {string} level - e.g. "JLPT N4", "HSK 2"
 */
export async function saveVideoLevel(db, kv, videoId, language, level) {
    if (!db || !videoId || !language || !level) return null;

    try {
        const existing = await getVideoLanguages(db, videoId);
        const currentLevels = existing?.levels || {};
        currentLevels[language] = level;

        if (existing) {
            await db.prepare(`
                UPDATE video_languages 
                SET levels = ?, updated_at = strftime('%s', 'now')
                WHERE video_id = ?
            `).bind(JSON.stringify(currentLevels), videoId).run();
        } else {
            await saveVideoLanguages(db, videoId, [language], null, null, null, false, currentLevels);
        }

        // Update KV cache if available
        if (kv) {
            const cachedInfo = await getVideoInfoFromKV(kv, videoId);
            if (cachedInfo) {
                cachedInfo.levels = currentLevels;
                await saveVideoInfoToKV(kv, videoId, cachedInfo);
            }
        }

        return currentLevels;
    } catch (err) {
        console.error('[VideoInfoDB] saveVideoLevel error:', err.message);
        return null;
    }
}

/**
 * Fast-path metadata regex level detection
 * @param {string} title
 * @param {string} channel
 * @returns {{lang: string, level: string} | null}
 */
export function detectLevelFromMetadata(title = '', channel = '') {
    const text = `${title} ${channel}`;
    const jlptMatch = text.match(/\b(?:JLPT\s*)?N([1-5])\b/i);
    if (jlptMatch) return { lang: 'ja', level: `JLPT N${jlptMatch[1]}` };

    const hskMatch = text.match(/\bHSK\s*([1-6])\b/i);
    if (hskMatch) return { lang: 'zh', level: `HSK ${hskMatch[1]}` };

    const topikMatch = text.match(/\bTOPIK\s*([1-6]|I{1,2})\b/i);
    if (topikMatch) return { lang: 'ko', level: `TOPIK ${topikMatch[1]}` };

    const cefrMatch = text.match(/\bCEFR\s*([A-C][1-2])\b/i) || text.match(/\b([A-C][1-2])\s*level\b/i);
    if (cefrMatch) return { lang: 'en', level: `CEFR ${cefrMatch[1].toUpperCase()}` };

    return null;
}

/**
 * Maps a proficiency level label to a standardized tier
 * @param {string} label - e.g. "JLPT N4", "HSK 2", "CEFR B1"
 * @returns {'beginner' | 'elementary' | 'intermediate' | 'upper_intermediate' | 'advanced' | null}
 */
export function labelToTier(label = '') {
    if (!label || typeof label !== 'string') return null;
    const upper = label.toUpperCase();
    if (upper.includes('N5') || upper.includes('HSK 1') || upper.includes('A1') || upper.includes('BEGINNER')) {
        return 'beginner';
    }
    if (upper.includes('N4') || upper.includes('HSK 2') || upper.includes('A2') || upper.includes('ELEMENTARY')) {
        return 'elementary';
    }
    if (upper.includes('UPPER') || upper.includes('N2') || upper.includes('HSK 5') || upper.includes('B2') || upper.includes('TRUNG CAO CẤP')) {
        return 'upper_intermediate';
    }
    if (upper.includes('N3') || upper.includes('HSK 3') || upper.includes('HSK 4') || upper.includes('B1') || upper.includes('INTERMEDIATE') || upper.includes('TRUNG CẤP')) {
        return 'intermediate';
    }
    if (upper.includes('N1') || upper.includes('HSK 6') || upper.includes('C1') || upper.includes('C2') || upper.includes('ADVANCED') || upper.includes('CAO CẤP')) {
        return 'advanced';
    }
    return 'intermediate';
}

/**
 * Add a single language to available languages (incremental)
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string} lang
 */
export async function addVideoLanguage(db, videoId, lang) {
    return addVideoLanguages(db, videoId, [lang]);
}

/**
 * Add multiple languages to available languages (merge)
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string[]} languages
 */
export async function addVideoLanguages(db, videoId, languages) {
    if (!db || !videoId || !languages?.length) return;

    try {
        const existing = await getVideoLanguages(db, videoId);
        const existingLangs = existing?.availableLanguages || [];

        // Merge and deduplicate
        const merged = [...new Set([...existingLangs, ...languages])];

        // Only save if we actually added something
        if (merged.length > existingLangs.length) {
            await saveVideoLanguages(
                db,
                videoId,
                merged,
                existing?.durationSeconds,
                existing?.title,
                existing?.channel,
                existing?.hasAutoCaptions
            );
        }
    } catch (err) {
        console.error('[VideoInfoDB] addVideoLanguages error:', err.message);
    }
}

/**
 * Get video duration from D1 (for server-side validation)
 * @param {D1Database} db
 * @param {string} videoId
 * @returns {Promise<number | null>} Duration in seconds or null
 */
export async function getVideoDuration(db, videoId) {
    if (!db || !videoId) return null;

    try {
        const row = await db.prepare(`
            SELECT duration_seconds FROM video_languages WHERE video_id = ?
        `).bind(videoId).first();

        return row?.duration_seconds || null;
    } catch {
        return null;
    }
}

// ============================================================================
// No Transcript Cache (D1 + KV)
// ============================================================================

/**
 * Check if we know a video has no transcript for given language/source
 * @param {D1Database} db
 * @param {KVNamespace} kv
 * @param {string} videoId
 * @param {string} lang
 * @param {string} source - 'youtube' or 'ai'
 * @returns {Promise<boolean>}
 */
export async function isNoTranscript(db, kv, videoId, lang, source) {
    // Quick KV check first (fast path)
    if (kv) {
        try {
            const kvKey = `no-transcript:${videoId}:${lang}:${source}`;
            if (await kv.get(kvKey)) return true;
        } catch { }
    }

    // D1 fallback (persistent, 100,000 writes/day free tier)
    if (db) {
        try {
            const row = await db.prepare(`
                SELECT 1 FROM no_transcript_cache
                WHERE video_id = ? AND language = ? AND source = ?
            `).bind(videoId, lang, source).first();

            if (row) {
                return true;
            }
        } catch { }
    }

    return false;
}

/**
 * Mark a video as having no transcript for given language/source
 * Saves to D1 to preserve the 1,000 writes/day KV limit
 * @param {D1Database} db
 * @param {KVNamespace} kv
 * @param {string} videoId
 * @param {string} lang
 * @param {string} source - 'youtube' or 'ai'
 */
export async function markNoTranscript(db, kv, videoId, lang, source) {
    if (!db) return;

    try {
        await db.prepare(`
            INSERT OR IGNORE INTO no_transcript_cache (video_id, language, source)
            VALUES (?, ?, ?)
        `).bind(videoId, lang, source).run();
    } catch { }
}

/**
 * Cleanup old no_transcript_cache entries (older than 7 days)
 * Call opportunistically, not via cron
 * @param {D1Database} db
 */
export async function cleanupOldNoTranscriptEntries(db) {
    if (!db) return;

    try {
        await db.prepare(`
            DELETE FROM no_transcript_cache 
            WHERE created_at < strftime('%s', 'now') - ?
        `).bind(NO_TRANSCRIPT_MAX_AGE_SECONDS).run();
    } catch {
        // Non-blocking
    }
}

// ============================================================================
// KV Cache Helpers (for video-info endpoint)
// ============================================================================

/**
 * Get video info from KV cache
 * @param {KVNamespace} kv
 * @param {string} videoId
 * @returns {Promise<Object | null>}
 */
export async function getVideoInfoFromKV(kv, videoId) {
    if (!kv || !videoId) return null;

    try {
        return await kv.get(`video-info:${videoId}`, 'json');
    } catch {
        return null;
    }
}

/**
 * Save video info to KV cache
 * @param {KVNamespace} kv
 * @param {string} videoId
 * @param {Object} info
 */
export async function saveVideoInfoToKV(kv, videoId, info) {
    if (!kv || !videoId) return;

    try {
        await kv.put(`video-info:${videoId}`, JSON.stringify(info), {
            expirationTtl: VIDEO_INFO_KV_TTL
        });
    } catch { }
}

// ============================================================================
// Recommended Videos Discovery (Cloudflare D1 + R2)
// ============================================================================

/**
 * Query recommended transcribed videos from Cloudflare (D1 tables + R2 bucket)
 * Checks:
 * 1. D1 video_languages (primary metadata table)
 * 2. D1 transcripts table (completed transcripts)
 * 3. D1 video_meta table
 * 4. Cloudflare R2 bucket (transcripts/{videoId}/{lang}.json)
 * Automatically enriches missing metadata via YouTube oEmbed and caches in D1.
 * 
 * @param {D1Database} db - D1 Database binding
 * @param {R2Bucket} [r2] - R2 Bucket binding
 * @param {string} lang - Target language ('ja', 'zh', 'ko', 'en')
 * @param {number} [limit=12] - Maximum items to return (clamped 1-50)
 * @param {string} [tier=null] - Target proficiency tier ('beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced')
 * @returns {Promise<Array>}
 */
export async function getRecommendedVideosFromCloudflare(db, r2, lang, limit = 12, tier = null) {
    if (!lang) return [];

    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 50);
    const targetTier = tier && typeof tier === 'string' ? tier.toLowerCase().trim() : null;
    const candidateLimit = targetTier ? Math.max(safeLimit * 5, 60) : safeLimit;
    const videoMap = new Map();

    // 1. Query D1 video_languages table (primary metadata index)
    if (db) {
        try {
            const searchPattern1 = `%"${lang}"%`;
            const searchPattern2 = `%${lang}%`;
            const { results } = await db.prepare(`
                SELECT video_id, title, channel, duration_seconds, levels, available_languages, updated_at
                FROM video_languages
                WHERE (available_languages LIKE ? OR available_languages LIKE ?)
                  AND (duration_seconds IS NULL OR duration_seconds = 0 OR duration_seconds BETWEEN 20 AND 7200)
                ORDER BY updated_at DESC
                LIMIT ?
            `).bind(searchPattern1, searchPattern2, candidateLimit).all();

            if (results && Array.isArray(results)) {
                for (const row of results) {
                    let levels = {};
                    try {
                        if (row.levels) levels = JSON.parse(row.levels);
                    } catch { }

                    let level = levels[lang] || null;
                    if (!level) {
                        const detected = detectLevelFromMetadata(row.title || '', row.channel || '');
                        if (detected && detected.lang === lang) {
                            level = detected.level;
                        }
                    }

                    const videoTier = level ? labelToTier(level) : null;
                    if (targetTier && videoTier !== targetTier) {
                        continue;
                    }

                    let availableLangs = [];
                    try {
                        if (row.available_languages) availableLangs = JSON.parse(row.available_languages);
                    } catch { }

                    videoMap.set(row.video_id, {
                        videoId: row.video_id,
                        title: row.title || null,
                        channel: row.channel || '',
                        duration: row.duration_seconds || 0,
                        thumbnail: `https://i.ytimg.com/vi/${row.video_id}/mqdefault.jpg`,
                        languages: availableLangs.length > 0 ? availableLangs : [lang],
                        level: level || undefined,
                        tier: videoTier || undefined,
                        updatedAt: row.updated_at
                    });

                    if (videoMap.size >= safeLimit) {
                        break;
                    }
                }
            }
        } catch (err) {
            console.error('[VideoInfoDB] D1 video_languages query error:', err.message);
        }

        // 2. Query D1 transcripts table if we still have capacity
        if (videoMap.size < safeLimit) {
            try {
                const remaining = safeLimit - videoMap.size;
                const transcriptFetchLimit = targetTier ? Math.max(remaining * 5, 40) : remaining * 2;
                const { results: transcriptRows } = await db.prepare(`
                    SELECT t.video_id, t.created_at, vl.title, vl.channel, vl.duration_seconds, vl.levels, vl.available_languages
                    FROM transcripts t
                    LEFT JOIN video_languages vl ON t.video_id = vl.video_id
                    WHERE (t.language = ? OR t.language LIKE ?) AND (t.status IS NULL OR t.status = 'complete')
                    ORDER BY t.created_at DESC
                    LIMIT ?
                `).bind(lang, `${lang}-%`, transcriptFetchLimit).all();

                if (transcriptRows && Array.isArray(transcriptRows)) {
                    for (const row of transcriptRows) {
                        if (!videoMap.has(row.video_id) && videoMap.size < safeLimit) {
                            let levels = {};
                            try { if (row.levels) levels = JSON.parse(row.levels); } catch { }
                            let level = levels[lang] || null;
                            if (!level && row.title) {
                                const detected = detectLevelFromMetadata(row.title, row.channel || '');
                                if (detected && detected.lang === lang) level = detected.level;
                            }

                            const videoTier = level ? labelToTier(level) : null;
                            if (targetTier && videoTier !== targetTier) {
                                continue;
                            }

                            videoMap.set(row.video_id, {
                                videoId: row.video_id,
                                title: row.title || null,
                                channel: row.channel || '',
                                duration: row.duration_seconds || 0,
                                thumbnail: `https://i.ytimg.com/vi/${row.video_id}/mqdefault.jpg`,
                                languages: [lang],
                                level: level || undefined,
                                tier: videoTier || undefined,
                                updatedAt: row.created_at
                            });
                        }
                    }
                }
            } catch (err) {
                console.error('[VideoInfoDB] D1 transcripts query error:', err.message);
            }
        }

        // 3. Query D1 video_meta table if we still have capacity (only when tier is not specified or fallback)
        if (videoMap.size < safeLimit && !targetTier) {
            try {
                const remaining = safeLimit - videoMap.size;
                const { results: metaRows } = await db.prepare(`
                    SELECT vm.video_id, vm.created_at, vl.title, vl.channel, vl.duration_seconds, vl.levels
                    FROM video_meta vm
                    LEFT JOIN video_languages vl ON vm.video_id = vl.video_id
                    WHERE vm.language = ? OR vm.language LIKE ?
                    ORDER BY vm.created_at DESC
                    LIMIT ?
                `).bind(lang, `${lang}-%`, remaining * 2).all();

                if (metaRows && Array.isArray(metaRows)) {
                    for (const row of metaRows) {
                        if (!videoMap.has(row.video_id) && videoMap.size < safeLimit) {
                            videoMap.set(row.video_id, {
                                videoId: row.video_id,
                                title: row.title || null,
                                channel: row.channel || '',
                                duration: row.duration_seconds || 0,
                                thumbnail: `https://i.ytimg.com/vi/${row.video_id}/mqdefault.jpg`,
                                languages: [lang],
                                level: undefined,
                                tier: undefined,
                                updatedAt: row.created_at
                            });
                        }
                    }
                }
            } catch { }
        }
    }

    // 4. Query Cloudflare R2 transcripts bucket if capacity remains
    if (r2 && videoMap.size < safeLimit && !targetTier) {
        try {
            const listRes = await r2.list({ prefix: 'transcripts/', limit: 100 });
            if (listRes?.objects?.length) {
                const targetSuffix = `/${lang}.json`;
                const subtagPrefix = `/${lang}-`;
                for (const obj of listRes.objects) {
                    if (videoMap.size >= safeLimit) break;
                    // Format: transcripts/{videoId}/{lang}.json or transcripts/{videoId}/{lang-country}.json
                    if (obj.key.endsWith(targetSuffix) || obj.key.includes(subtagPrefix)) {
                        const parts = obj.key.split('/');
                        const videoId = parts[1];
                        if (videoId && !videoMap.has(videoId)) {
                            videoMap.set(videoId, {
                                videoId,
                                title: null,
                                channel: '',
                                duration: 0,
                                thumbnail: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
                                languages: [lang],
                                level: undefined,
                                tier: undefined,
                                updatedAt: obj.uploaded ? Math.floor(new Date(obj.uploaded).getTime() / 1000) : Math.floor(Date.now() / 1000)
                            });
                        }
                    }
                }
            }
        } catch (err) {
            console.error('[VideoInfoDB] R2 listing error:', err.message);
        }
    }

    // 5. Enrich any items with missing titles via YouTube oEmbed and cache in D1
    const enrichPromises = [];
    for (const [videoId, item] of videoMap.entries()) {
        if (!item.title) {
            enrichPromises.push((async () => {
                try {
                    const meta = await getVideoMetadata(videoId);
                    if (meta?.title) {
                        item.title = meta.title;
                        item.channel = meta.author_name || item.channel;
                        const detected = detectLevelFromMetadata(meta.title, meta.author_name || '');
                        if (detected && detected.lang === lang) {
                            item.level = detected.level;
                            item.tier = labelToTier(detected.level);
                        }
                        if (targetTier && item.tier !== targetTier) {
                            videoMap.delete(videoId);
                        }
                        if (db) {
                            const lvls = item.level ? { [lang]: item.level } : null;
                            await saveVideoLanguages(db, videoId, [lang], item.duration || null, meta.title, meta.author_name, false, lvls);
                        }
                    } else {
                        item.title = `Video ${videoId}`;
                    }
                } catch {
                    item.title = `Video ${videoId}`;
                }
            })());
        }
    }

    if (enrichPromises.length > 0) {
        await Promise.allSettled(enrichPromises);
    }

    return Array.from(videoMap.values());
}

/**
 * Backward compatibility wrapper for getRecommendedVideosFromCloudflare
 */
export async function getRecommendedVideosFromD1(db, lang, limit = 12, tier = null) {
    return getRecommendedVideosFromCloudflare(db, null, lang, limit, tier);
}


