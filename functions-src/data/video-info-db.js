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
            INSERT INTO video_languages 
            (video_id, available_languages, has_auto_captions, duration_seconds, title, channel, levels, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, strftime('%s', 'now'), strftime('%s', 'now'))
            ON CONFLICT(video_id) DO UPDATE SET
              available_languages = excluded.available_languages,
              has_auto_captions = excluded.has_auto_captions,
              duration_seconds = COALESCE(excluded.duration_seconds, video_languages.duration_seconds),
              title = COALESCE(excluded.title, video_languages.title),
              channel = COALESCE(excluded.channel, video_languages.channel),
              levels = excluded.levels,
              updated_at = strftime('%s', 'now')
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
const JLPT_REGEX = /\b(?:JLPT\s*)?N([1-5])\b/i;
const HSK_REGEX = /\bHSK\s*([1-6])\b/i;
const TOPIK_REGEX = /\bTOPIK\s*([1-6]|I{1,2})\b/i;
const CEFR_REGEX = /\b(?:CEFR\s*([A-C][1-2])|([A-C][1-2])\s*level)\b/i;

export function detectLevelFromMetadata(title = '', channel = '') {
    const text = `${title} ${channel}`;
    const jlptMatch = text.match(JLPT_REGEX);
    if (jlptMatch) return { lang: 'ja', level: `JLPT N${jlptMatch[1]}` };

    const hskMatch = text.match(HSK_REGEX);
    if (hskMatch) return { lang: 'zh', level: `HSK ${hskMatch[1]}` };

    const topikMatch = text.match(TOPIK_REGEX);
    if (topikMatch) return { lang: 'ko', level: `TOPIK ${topikMatch[1]}` };

    const cefrMatch = text.match(CEFR_REGEX);
    if (cefrMatch) return { lang: 'en', level: `CEFR ${(cefrMatch[1] || cefrMatch[2]).toUpperCase()}` };

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
 * Saves to D1 to preserve the 1,000 writes/day KV limit
 * @param {D1Database} db
 * @param {KVNamespace} [kv] - Unused, kept for backwards compatibility
 * @param {string} videoId
 * @param {string} lang
 * @param {string} source - 'youtube' or 'ai'
 * @returns {Promise<boolean>}
 */
export async function isNoTranscript(db, kv, videoId, lang, source) {
    if (!db) return false;

    try {
        const row = await db.prepare(`
            SELECT 1 FROM no_transcript_cache
            WHERE video_id = ? AND language = ? AND source = ?
        `).bind(videoId, lang, source).first();

        return Boolean(row);
    } catch {
        return false;
    }
}

/**
 * Mark a video as having no transcript for given language/source
 * Saves to D1 to preserve the 1,000 writes/day KV limit
 * @param {D1Database} db
 * @param {KVNamespace} [kv] - Unused, kept for backwards compatibility
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
/**
 * Fisher-Yates array shuffle for uniform candidate randomization
 */
function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export async function getRecommendedVideosFromCloudflare(db, r2, lang, limit = 12, tier = null, shuffle = false) {
    if (!lang) return [];

    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 50);
    const targetTier = tier && typeof tier === 'string' ? tier.toLowerCase().trim() : null;
    const candidateLimit = Math.max(safeLimit * (shuffle ? 4 : (targetTier ? 5 : 2)), 60);
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
                // If shuffle is requested on refresh, randomize candidates uniformly so user discovers fresh videos
                const rows = shuffle ? shuffleArray(results) : results;

                for (const row of rows) {
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
    }

    return Array.from(videoMap.values());
}

/**
 * Backward compatibility wrapper for getRecommendedVideosFromCloudflare
 */
export async function getRecommendedVideosFromD1(db, lang, limit = 12, tier = null) {
    return getRecommendedVideosFromCloudflare(db, null, lang, limit, tier);
}


