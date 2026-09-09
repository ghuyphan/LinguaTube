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
 * @returns {Promise<{availableLanguages: string[], subLanguages: string[], hasAutoCaptions: boolean, durationSeconds: number, title: string, channel: string, levels: Record<string, string>} | null>}
 */
export async function getVideoLanguages(db, videoId) {
    if (!db || !videoId) return null;

    try {
        const row = await db.prepare(`
            SELECT available_languages, sub_languages, has_auto_captions, duration_seconds, title, channel, channel_avatar, levels
            FROM video_languages WHERE video_id = ?
        `).bind(videoId).first();

        if (!row) return null;

        let levels = {};
        try {
            if (row.levels) {
                const parsed = JSON.parse(row.levels);
                // Normalize so levels[lang] returns string label for backward compatibility
                for (const [k, v] of Object.entries(parsed)) {
                    if (k.endsWith('_meta')) continue;
                    levels[k] = (v && typeof v === 'object' && v.level) ? v.level : v;
                }
            }
        } catch { }

        return {
            availableLanguages: JSON.parse(row.available_languages || '[]'),
            subLanguages: JSON.parse(row.sub_languages || '[]'),
            hasAutoCaptions: !!row.has_auto_captions,
            durationSeconds: row.duration_seconds,
            title: row.title,
            channel: row.channel,
            channelAvatar: row.channel_avatar || null,
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
 * @param {string[]} languages - Available language codes (from YouTube)
 * @param {number} [duration] - Duration in seconds
 * @param {string} [title] - Video title
 * @param {string} [channel] - Channel name
 * @param {boolean} [hasAutoCaptions] - Whether video has auto-captions
 * @param {Record<string, string>} [levels] - Difficulty levels by language
 * @param {string} [channelAvatar] - Channel avatar URL
 * @param {string[]} [subLanguages] - Verified subtitle languages actually saved on our server
 */
export async function saveVideoLanguages(db, videoId, languages, duration = null, title = null, channel = null, hasAutoCaptions = false, levels = null, channelAvatar = null, subLanguages = null) {
    if (!db || !videoId) return;

    try {
        let existingLevels = {};
        let existingSubLangs = [];
        const existing = await getVideoLanguages(db, videoId);
        if (levels === null) {
            existingLevels = existing?.levels || {};
        } else {
            existingLevels = levels;
        }
        if (existing?.subLanguages?.length) {
            existingSubLangs = existing.subLanguages;
        }

        const mergedSubs = subLanguages !== null 
            ? Array.from(new Set([...existingSubLangs, ...subLanguages]))
            : existingSubLangs;

        await db.prepare(`
            INSERT INTO video_languages 
            (video_id, available_languages, sub_languages, has_auto_captions, duration_seconds, title, channel, channel_avatar, levels, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, strftime('%s', 'now'), strftime('%s', 'now'))
            ON CONFLICT(video_id) DO UPDATE SET
              available_languages = excluded.available_languages,
              sub_languages = CASE WHEN excluded.sub_languages IS NOT NULL AND excluded.sub_languages != '[]' THEN excluded.sub_languages ELSE video_languages.sub_languages END,
              has_auto_captions = excluded.has_auto_captions,
              duration_seconds = COALESCE(excluded.duration_seconds, video_languages.duration_seconds),
              title = COALESCE(excluded.title, video_languages.title),
              channel = COALESCE(excluded.channel, video_languages.channel),
              channel_avatar = COALESCE(excluded.channel_avatar, video_languages.channel_avatar),
              levels = excluded.levels,
              updated_at = strftime('%s', 'now')
        `).bind(
            videoId,
            JSON.stringify(languages),
            JSON.stringify(mergedSubs),
            hasAutoCaptions ? 1 : 0,
            duration,
            title,
            channel,
            channelAvatar,
            JSON.stringify(existingLevels)
        ).run();
    } catch (err) {
        console.error('[VideoInfoDB] saveVideoLanguages error:', err.message);
    }
}

/**
 * Add a verified transcript language to sub_languages in D1 (merges & deduplicates)
 * Supports multiple languages (e.g. ["en", "ja"])
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string} lang
 */
export async function addSubLanguage(db, videoId, lang) {
    if (!db || !videoId || !lang) return;
    const cleanLang = lang.toLowerCase().trim().split('-')[0].split('_')[0];
    if (!cleanLang) return;

    try {
        const row = await db.prepare(`
            SELECT sub_languages FROM video_languages WHERE video_id = ?
        `).bind(videoId).first();

        let currentSubs = [];
        if (row && row.sub_languages) {
            try { currentSubs = JSON.parse(row.sub_languages); } catch { }
        }
        if (!Array.isArray(currentSubs)) currentSubs = [];

        if (!currentSubs.includes(cleanLang)) {
            currentSubs.push(cleanLang);
            await db.prepare(`
                UPDATE video_languages
                SET sub_languages = ?, updated_at = strftime('%s', 'now')
                WHERE video_id = ?
            `).bind(JSON.stringify(currentSubs), videoId).run();
        }
    } catch (err) {
        console.error('[VideoInfoDB] addSubLanguage error:', err.message);
    }
}

/**
 * Save or update a single language level in D1 (Zero KV writes - Rule 2)
 * @param {D1Database} db
 * @param {KVNamespace|null} [_kv] - Unused; preserved for signature compatibility
 * @param {string} videoId
 * @param {string} language
 * @param {string} level - e.g. "JLPT N4", "HSK 2"
 * @param {number} [confidence] - Assessment confidence (0.0 to 1.0)
 * @param {string} [method] - Assessment method ('metadata' | 'linguistics')
 */
export async function saveVideoLevel(db, _kv, videoId, language, level, confidence = 0.8, method = 'linguistics') {
    if (!db || !videoId || !language || !level) return null;

    try {
        const existing = await getVideoLanguages(db, videoId);
        const currentLevels = existing?.levels || {};

        // Security / Integrity check: prevent lower-confidence client payloads from downgrading verified levels
        const existingVal = currentLevels[language];
        const existingMeta = currentLevels[`${language}_meta`];
        if (existingVal && existingMeta && typeof existingMeta === 'object') {
            const existingConf = typeof existingMeta.confidence === 'number' ? existingMeta.confidence : 0.8;
            if (confidence < existingConf) {
                return currentLevels;
            }
        }

        currentLevels[language] = level;
        currentLevels[`${language}_meta`] = {
            confidence: Math.min(1.0, Math.max(0.0, confidence)),
            method,
            updatedAt: Math.floor(Date.now() / 1000)
        };

        if (existing) {
            await db.prepare(`
                UPDATE video_languages 
                SET levels = ?, updated_at = strftime('%s', 'now')
                WHERE video_id = ?
            `).bind(JSON.stringify(currentLevels), videoId).run();
        } else {
            await saveVideoLanguages(db, videoId, [language], null, null, null, false, currentLevels);
        }

        // Return clean string map
        const cleanLevels = {};
        for (const [k, v] of Object.entries(currentLevels)) {
            if (!k.endsWith('_meta')) {
                cleanLevels[k] = (v && typeof v === 'object' && v.level) ? v.level : v;
            }
        }
        return cleanLevels;
    } catch (err) {
        console.error('[VideoInfoDB] saveVideoLevel error:', err.message);
        return null;
    }
}

/**
 * Fast-path metadata regex level detection with expanded multilingual keyword support
 * @param {string} title
 * @param {string} channel
 * @returns {{lang: string, level: string} | null}
 */
export function detectLevelFromMetadata(title = '', channel = '') {
    const text = `${title} ${channel}`;

    // 1. Japanese (JLPT, Kanji & Japanese learning keywords)
    const jlptMatch = text.match(/\b(?:JLPT\s*)?N([1-5])\b/i) || text.match(/(?:JLPT|日本語能力試験)?\s*([NＮ][1-5１-５])/i);
    if (jlptMatch) {
        const num = jlptMatch[1].replace('Ｎ', 'N').replace(/[１-５]/, m => String.fromCharCode(m.charCodeAt(0) - 0xFEE0)).replace('N', '');
        return { lang: 'ja', level: `JLPT N${num}` };
    }
    if (/中上級/.test(text)) return { lang: 'ja', level: 'JLPT N2' };
    if (/上級/.test(text)) return { lang: 'ja', level: 'JLPT N1' };
    if (/中級/.test(text)) return { lang: 'ja', level: 'JLPT N3' };
    if (/初級|入門/.test(text)) return { lang: 'ja', level: 'JLPT N5' };

    // 2. Chinese (HSK & Chinese learning keywords)
    const hskMatch = text.match(/\bHSK\s*([1-6])\b/i);
    if (hskMatch) return { lang: 'zh', level: `HSK ${hskMatch[1]}` };
    if (/中高级|中高級/.test(text)) return { lang: 'zh', level: 'HSK 4' };
    if (/高级|高級/.test(text)) return { lang: 'zh', level: 'HSK 5' };
    if (/中级|中級/.test(text)) return { lang: 'zh', level: 'HSK 3' };
    if (/初级|初級/.test(text)) return { lang: 'zh', level: 'HSK 2' };
    if (/入门|入門/.test(text)) return { lang: 'zh', level: 'HSK 1' };

    // 3. Korean (TOPIK & Korean learning keywords)
    const topikMatch = text.match(/\bTOPIK\s*([1-6]|I{1,2})\b/i);
    if (topikMatch) return { lang: 'ko', level: `TOPIK ${topikMatch[1]}` };
    if (/고급/.test(text)) return { lang: 'ko', level: 'TOPIK 5' };
    if (/중급/.test(text)) return { lang: 'ko', level: 'TOPIK 3' };
    if (/초급/.test(text)) return { lang: 'ko', level: 'TOPIK 2' };
    if (/입문/.test(text)) return { lang: 'ko', level: 'TOPIK 1' };

    // 4. English / European (CEFR & English keywords)
    const cefrMatch = text.match(/\b(?:CEFR\s*([A-C][1-2])|([A-C][1-2])\s*level)\b/i);
    if (cefrMatch) return { lang: 'en', level: `CEFR ${(cefrMatch[1] || cefrMatch[2]).toUpperCase()}` };
    if (/\bupper[\s-]intermediate\b/i.test(text)) return { lang: 'en', level: 'CEFR B2' };
    if (/\b(?:for\s+)?intermediate\b/i.test(text)) return { lang: 'en', level: 'CEFR B1' };
    if (/\b(?:for\s+)?elementary\b/i.test(text)) return { lang: 'en', level: 'CEFR A2' };
    if (/\b(?:for\s+)?beginners?\b/i.test(text)) return { lang: 'en', level: 'CEFR A1' };
    if (/\b(?:advanced|fluent)\b/i.test(text)) return { lang: 'en', level: 'CEFR C1' };

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

export async function getRecommendedVideosFromCloudflare(db, r2, lang, limit = 12, tier = null, shuffle = false, offset = 0) {
    if (!lang) return [];

    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 50);
    const safeOffset = Math.max(parseInt(offset, 10) || 0, 0);
    const targetTier = tier && typeof tier === 'string' ? tier.toLowerCase().trim() : null;
    const candidateLimit = Math.max((safeOffset + safeLimit) * (shuffle ? 4 : (targetTier ? 5 : 2)), 60);
    const videoMap = new Map();

    // 1. Query D1 video_languages table (primary metadata index)
    if (db) {
        try {
            const searchPattern1 = `%"${lang}"%`;
            const searchPattern2 = `%${lang}%`;
            const { results } = await db.prepare(`
                SELECT video_id, title, channel, channel_avatar, duration_seconds, levels, available_languages, sub_languages, updated_at
                FROM video_languages
                WHERE (
                    (sub_languages IS NOT NULL AND sub_languages != '[]' AND (sub_languages LIKE ? OR sub_languages LIKE ?))
                    OR (
                        (sub_languages IS NULL OR sub_languages = '[]')
                        AND (available_languages LIKE ? OR available_languages LIKE ?)
                    )
                )
                  AND (duration_seconds IS NULL OR duration_seconds = 0 OR duration_seconds BETWEEN 20 AND 7200)
                ORDER BY updated_at DESC
                LIMIT ?
            `).bind(searchPattern1, searchPattern2, searchPattern1, searchPattern2, candidateLimit).all();

            if (results && Array.isArray(results)) {
                // When refresh is requested, randomize catalog candidates for variety and discovery,
                // BUT pin the top 3 newest/recently updated additions at the front so newly transcribed videos are never buried
                let rows = results;
                if (shuffle && results.length > 3) {
                    const pinnedCount = Math.min(3, results.length);
                    const pinned = results.slice(0, pinnedCount);
                    const shufflable = results.slice(pinnedCount);
                    rows = [...pinned, ...shuffleArray(shufflable)];
                }

                for (const row of rows) {
                    if (videoMap.has(row.video_id)) continue;

                    let subLangs = [];
                    try {
                        if (row.sub_languages) {
                            subLangs = JSON.parse(row.sub_languages);
                        } else if (row.available_languages) {
                            subLangs = JSON.parse(row.available_languages);
                        }
                    } catch { }
                    if (!Array.isArray(subLangs)) subLangs = [];

                    // Verification: If sub_languages doesn't explicitly have lang, verify against R2
                    if (!subLangs.includes(lang)) {
                        if (r2) {
                            try {
                                const key = `transcripts/${row.video_id}/${lang}.json`;
                                const head = await r2.head(key);
                                if (!head) {
                                    // Transcript file not on server for this language -> do not recommend
                                    continue;
                                }
                                // Found in R2! Self-heal: add to sub_languages in D1
                                subLangs.push(lang);
                                addSubLanguage(db, row.video_id, lang).catch(() => {});
                            } catch {
                                continue;
                            }
                        } else if (subLangs.length > 0) {
                            // r2 not provided and sub_languages exists but does not include target lang
                            continue;
                        }
                    }

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

                    // Clean and deduplicate verified server languages strictly to supported learning languages (ja, zh, ko, en)
                    const target = (lang || '').toLowerCase().trim();
                    const SUPPORTED_CODES = new Set(['ja', 'zh', 'ko', 'en']);
                    const verifiedLangs = Array.from(new Set(
                        subLangs
                            .map(l => (typeof l === 'string' ? l.toLowerCase().trim().split('-')[0].split('_')[0] : ''))
                            .filter(l => SUPPORTED_CODES.has(l))
                    ));
                    if (target && verifiedLangs.length > 1) {
                        verifiedLangs.sort((a, b) => (a === target ? -1 : (b === target ? 1 : 0)));
                    }

                    videoMap.set(row.video_id, {
                        videoId: row.video_id,
                        title: row.title || null,
                        channel: row.channel || '',
                        channelAvatar: row.channel_avatar || null,
                        duration: row.duration_seconds || 0,
                        thumbnail: `https://i.ytimg.com/vi/${row.video_id}/mqdefault.jpg`,
                        languages: verifiedLangs.length > 0 ? verifiedLangs : [lang],
                        level: level || undefined,
                        tier: videoTier || undefined,
                        updatedAt: row.updated_at
                    });

                    if (videoMap.size >= safeOffset + safeLimit) {
                        break;
                    }
                }
            }
        } catch (err) {
            console.error('[VideoInfoDB] D1 video_languages query error:', err.message);
        }
    }

    const allMatched = Array.from(videoMap.values());
    return allMatched.slice(safeOffset, safeOffset + safeLimit);
}

/**
 * Backward compatibility wrapper for getRecommendedVideosFromCloudflare
 */
export async function getRecommendedVideosFromD1(db, lang, limit = 12, tier = null, offset = 0) {
    return getRecommendedVideosFromCloudflare(db, null, lang, limit, tier, false, offset);
}


