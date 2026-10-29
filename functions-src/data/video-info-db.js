/**
 * Video Info D1/KV Helpers
 * Two-tier caching for video language discovery
 * 
 * Pattern:
 * - KV: Fast cache with 24hr TTL (temporary)
 * - D1: Persistent storage (video_languages, no_transcript_cache)
 */

import { rankVideos } from '../services/recommendation.service.js';
import { detectVideoCategory } from '../services/category.service.js';

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
            SELECT available_languages, sub_languages, has_auto_captions, duration_seconds, duration_source, title, channel, channel_avatar, levels, category, category_source, metadata_source, tags
            FROM video_languages WHERE video_id = ?
        `).bind(videoId).first();

        if (!row) return null;

        let levels = {};
        try {
            if (row.levels) {
                const parsed = JSON.parse(row.levels);
                for (const [k, v] of Object.entries(parsed)) {
                    if (k.endsWith('_meta')) continue;
                    if (typeof v === 'string') {
                        const tier = labelToTier(v) || 'intermediate';
                        levels[k] = {
                            level: v,
                            tier,
                            score: tier === 'beginner' ? 1.0 : (tier === 'elementary' ? 2.0 : (tier === 'intermediate' ? 3.0 : (tier === 'upper_intermediate' ? 4.0 : 5.0))),
                            confidence: 0.8,
                            method: 'metadata',
                            updatedAt: row.updated_at || Math.floor(Date.now() / 1000)
                        };
                    } else if (typeof v === 'object' && v !== null) {
                        levels[k] = {
                            ...v,
                            tier: v.tier || labelToTier(v.level) || 'intermediate'
                        };
                    }
                }
            }
        } catch { }

        let parsedTags = [];
        try {
            if (row.tags) parsedTags = JSON.parse(row.tags);
        } catch { }
        if (!Array.isArray(parsedTags)) parsedTags = [];

        return {
            availableLanguages: JSON.parse(row.available_languages || '[]'),
            subLanguages: JSON.parse(row.sub_languages || '[]'),
            hasAutoCaptions: !!row.has_auto_captions,
            durationSeconds: row.duration_seconds,
            durationSource: row.duration_source || 'unverified',
            title: row.title,
            channel: row.channel,
            channelAvatar: row.channel_avatar || null,
            levels,
            category: row.category || 'general',
            categorySource: row.category_source || null,
            metadataSource: row.metadata_source || null,
            tags: parsedTags
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
 * @param {string} [category] - Video category (anime_drama, music, news, conversation, vlog, education, general)
 * @param {string[]} [tags] - Extracted creator tags
 */
export async function saveVideoLanguages(db, videoId, languages, duration = null, title = null, channel = null, hasAutoCaptions = false, levels = null, channelAvatar = null, subLanguages = null, category = null, tags = null) {
    if (!db || !videoId) return;

    try {
        let existingLevels = {};
        let existingSubLangs = [];
        let existingCategory = null;
        let existingTags = [];
        const existing = await getVideoLanguages(db, videoId);
        const resolvedTitle = (title && typeof title === 'string' && title.trim()) ? title.trim() : (existing?.title || null);
        const resolvedChannel = (channel && typeof channel === 'string' && channel.trim()) ? channel.trim() : (existing?.channel || null);
        const resolvedAvatar = channelAvatar || existing?.channelAvatar || null;

        // Missing public details are hydrated through the official metadata endpoint;
        // caption persistence must not trigger an unrelated oEmbed/scraping request.

        if (levels === null) {
            existingLevels = existing?.levels || {};
            if (Object.keys(existingLevels).length === 0) {
                const autoDetected = detectLevelFromMetadata(resolvedTitle || '', resolvedChannel || '');
                if (autoDetected) {
                    const tier = labelToTier(autoDetected.level) || 'intermediate';
                    existingLevels = {
                        [autoDetected.lang]: {
                            level: autoDetected.level,
                            tier,
                            score: tier === 'beginner' ? 1.0 : (tier === 'elementary' ? 2.0 : (tier === 'intermediate' ? 3.0 : (tier === 'upper_intermediate' ? 4.0 : 5.0))),
                            confidence: 0.95,
                            method: 'metadata',
                            updatedAt: Math.floor(Date.now() / 1000)
                        }
                    };
                }
            }
        } else {
            existingLevels = levels;
        }
        if (existing?.subLanguages?.length) {
            existingSubLangs = existing.subLanguages;
        }

        existingCategory = existing?.category;
        existingTags = existing?.tags || [];

        const mergedSubs = subLanguages !== null 
            ? Array.from(new Set([...existingSubLangs, ...subLanguages]))
            : existingSubLangs;

        const mergedTags = tags !== null
            ? Array.from(new Set([...existingTags, ...tags]))
            : existingTags;

        let resolvedCategory = category;
        if (!resolvedCategory || resolvedCategory === 'general') {
            if (existingCategory && existingCategory !== 'general') {
                resolvedCategory = existingCategory;
            } else {
                resolvedCategory = detectVideoCategory({
                    title: resolvedTitle || '',
                    channel: resolvedChannel || '',
                    tags: mergedTags
                });
            }
        }

        await db.prepare(`
            INSERT INTO video_languages 
            (video_id, available_languages, sub_languages, has_auto_captions, duration_seconds, title, channel, channel_avatar, levels, category, tags, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, strftime('%s', 'now'), strftime('%s', 'now'))
            ON CONFLICT(video_id) DO UPDATE SET
              available_languages = CASE WHEN excluded.available_languages = '[]' THEN video_languages.available_languages ELSE excluded.available_languages END,
              sub_languages = CASE WHEN excluded.sub_languages IS NOT NULL AND excluded.sub_languages != '[]' THEN excluded.sub_languages ELSE video_languages.sub_languages END,
              has_auto_captions = excluded.has_auto_captions,
              duration_seconds = CASE WHEN video_languages.duration_source IN ('client_player','youtube_data_api') THEN video_languages.duration_seconds ELSE COALESCE(excluded.duration_seconds, video_languages.duration_seconds) END,
              duration_source = CASE WHEN video_languages.duration_source IN ('client_player','youtube_data_api') OR excluded.duration_seconds IS NULL THEN video_languages.duration_source ELSE 'unverified' END,
              title = CASE WHEN video_languages.metadata_source='youtube_data_api' THEN video_languages.title ELSE COALESCE(excluded.title, video_languages.title) END,
              channel = CASE WHEN video_languages.metadata_source='youtube_data_api' THEN video_languages.channel ELSE COALESCE(excluded.channel, video_languages.channel) END,
              channel_avatar = COALESCE(excluded.channel_avatar, video_languages.channel_avatar),
              levels = excluded.levels,
              category = CASE WHEN video_languages.category_source IN ('manual','legacy') OR video_languages.metadata_source='youtube_data_api' THEN video_languages.category WHEN excluded.category IS NOT NULL AND excluded.category != 'general' THEN excluded.category ELSE COALESCE(video_languages.category, excluded.category, 'general') END,
              tags = CASE WHEN video_languages.metadata_source='youtube_data_api' THEN video_languages.tags WHEN excluded.tags IS NOT NULL AND excluded.tags != '[]' THEN excluded.tags ELSE COALESCE(video_languages.tags, excluded.tags, '[]') END,
              updated_at = strftime('%s', 'now')
        `).bind(
            videoId,
            JSON.stringify(languages),
            JSON.stringify(mergedSubs),
            hasAutoCaptions ? 1 : 0,
            duration,
            resolvedTitle,
            resolvedChannel,
            resolvedAvatar,
            JSON.stringify(existingLevels),
            resolvedCategory || 'general',
            JSON.stringify(mergedTags)
        ).run();
    } catch (err) {
        console.error('[VideoInfoDB] saveVideoLanguages error:', err.message);
    }
}

/**
 * Update video category explicitly in D1
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string} category
 */
export async function saveVideoCategory(db, videoId, category) {
    if (!db || !videoId || !category) return false;
    try {
        await db.prepare(`
            UPDATE video_languages
            SET category = ?, category_source='manual', updated_at = strftime('%s', 'now')
            WHERE video_id = ?
        `).bind(category, videoId).run();
        return true;
    } catch (err) {
        console.error('[VideoInfoDB] saveVideoCategory error:', err.message);
        return false;
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
 * @param {object} [details] - Diagnostic details (score, tier, grammarCount, speechRateCpm, breakdown)
 */
export async function saveVideoLevel(db, _kv, videoId, language, level, confidence = 0.8, method = 'linguistics', details = null) {
    if (!db || !videoId || !language || !level) return null;

    try {
        const row = await db.prepare(`
            SELECT levels, sub_languages, available_languages, title, channel FROM video_languages WHERE video_id = ?
        `).bind(videoId).first();

        let currentLevels = {};
        if (row?.levels) {
            try { currentLevels = JSON.parse(row.levels); } catch {}
        }

        // Prevent cross-language catalog level contamination:
        // If the video already has known sub_languages and method is client linguistics,
        // reject submissions for unrelated languages (e.g. English CEFR for a Japanese video)
        if (method === 'linguistics') {
            let subLangs = [];
            if (row?.sub_languages) {
                try { subLangs = JSON.parse(row.sub_languages); } catch {}
            }
            if (Array.isArray(subLangs) && subLangs.length > 0) {
                const normSub = subLangs.map(l => (l || '').split('-')[0].toLowerCase());
                const normIncoming = (language || '').split('-')[0].toLowerCase();
                if (!normSub.includes(normIncoming)) {
                    return currentLevels;
                }
            }
        }

        const isForceUpdate = Boolean(details?.forceUpdate);
        const cleanLang = (language || '').toLowerCase().trim().split('-')[0].split('_')[0];

        // Creator Title Ground-Truth Priority:
        // Video creators explicitly declaring target proficiency in the title (e.g. "JLPT N5 Listening Practice")
        // represents authoritative pedagogical intent (confidence 0.95).
        const titleMeta = detectLevelFromMetadata(row?.title || '', row?.channel || '');
        const hasTitleGroundTruth = titleMeta && titleMeta.lang === cleanLang;

        const existingVal = currentLevels[language];
        let existingConf = 0.0;
        let existingScore = null;
        let existingMethod = null;
        if (existingVal) {
            if (typeof existingVal === 'object' && existingVal !== null) {
                existingConf = typeof existingVal.confidence === 'number' ? existingVal.confidence : 0.8;
                existingScore = typeof existingVal.score === 'number' ? existingVal.score : null;
                existingMethod = existingVal.method || null;
            } else if (typeof existingVal === 'string') {
                existingConf = 0.8;
            }
        }

        // If title metadata is detected, anchor to creator intent unless administrative forceUpdate is provided
        if (hasTitleGroundTruth && !isForceUpdate) {
            const authoritativeTier = labelToTier(titleMeta.level) || 'intermediate';
            const authoritativeScore = levelToScore(titleMeta.level);

            const levelData = {
                level: titleMeta.level,
                tier: authoritativeTier,
                score: authoritativeScore,
                confidence: 0.95,
                method: 'metadata',
                updatedAt: Math.floor(Date.now() / 1000)
            };
            if (typeof details?.grammarCount === 'number') levelData.grammarCount = details.grammarCount;
            if (typeof details?.speechRateCpm === 'number') levelData.speechRateCpm = details.speechRateCpm;
            if (details?.breakdown && typeof details.breakdown === 'object') levelData.breakdown = details.breakdown;

            currentLevels[language] = levelData;
            delete currentLevels[`${language}_meta`];

            if (row) {
                await db.prepare(`
                    UPDATE video_languages 
                    SET levels = ?, updated_at = strftime('%s', 'now')
                    WHERE video_id = ?
                `).bind(JSON.stringify(currentLevels), videoId).run();
            }
            return currentLevels;
        }

        const tier = labelToTier(level) || 'intermediate';
        const score = normalizeLevelScore(
            typeof details?.score === 'number' && Number.isFinite(details.score)
                ? details.score : levelToScore(level), cleanLang);

        // Cap client-submitted confidence to 0.85 max to prevent permanent poisoning
        let safeConfidence = Math.min(1.0, Math.max(0.0, confidence));
        if (method === 'linguistics') {
            safeConfidence = Math.min(0.85, safeConfidence);
        }

        // Security Hardening: Client submissions must NEVER overwrite high-confidence verified records (>= 0.90)
        // unless explicit administrative forceUpdate is supplied.
        if (!isForceUpdate && existingConf >= 0.90 && safeConfidence < 0.90) {
            return currentLevels;
        }

        // For non-metadata videos, blend score using EMA (60% existing + 40% new)
        let finalScore = score;
        if (!isForceUpdate && existingScore !== null && Number.isFinite(existingScore) && existingConf >= 0.75) {
            finalScore = normalizeLevelScore(Math.round(((0.60 * normalizeLevelScore(existingScore, cleanLang)) + (0.40 * score)) * 10) / 10, cleanLang);
        }

        // Reconcile level and tier directly from finalScore instead of trusting raw incoming strings
        const resolvedLevel = isForceUpdate ? level : scoreToLevelLabel(finalScore, cleanLang);
        const resolvedTier = isForceUpdate ? tier : scoreToTier(finalScore, cleanLang);

        const levelData = {
            level: resolvedLevel,
            tier: resolvedTier,
            score: finalScore,
            confidence: isForceUpdate ? safeConfidence : Math.max(safeConfidence, existingConf > 0.8 ? existingConf : safeConfidence),
            method: isForceUpdate ? method : (existingMethod || method),
            updatedAt: Math.floor(Date.now() / 1000)
        };
        if (typeof details?.grammarCount === 'number') levelData.grammarCount = details.grammarCount;
        if (typeof details?.speechRateCpm === 'number') levelData.speechRateCpm = details.speechRateCpm;
        if (details?.breakdown && typeof details.breakdown === 'object') levelData.breakdown = details.breakdown;

        currentLevels[language] = levelData;
        delete currentLevels[`${language}_meta`];

        if (row) {
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
    if (/中上級|trung cao cấp/i.test(text)) return { lang: 'ja', level: 'JLPT N2' };
    if (/上級|cao cấp/i.test(text)) return { lang: 'ja', level: 'JLPT N1' };
    if (/中級|trung cấp/i.test(text)) return { lang: 'ja', level: 'JLPT N3' };
    if (/初級|入門|sơ cấp|nhập môn/i.test(text)) return { lang: 'ja', level: 'JLPT N5' };

    // 2. Chinese (HSK & Chinese learning keywords)
    const hskMatch = text.match(/\bHSK\s*([1-6])\b/i);
    if (hskMatch) return { lang: 'zh', level: `HSK ${hskMatch[1]}` };
    if (/中高级|中高級/i.test(text)) return { lang: 'zh', level: 'HSK 4' };
    if (/高级|高級/i.test(text)) return { lang: 'zh', level: 'HSK 5' };
    if (/中级|中級/i.test(text)) return { lang: 'zh', level: 'HSK 3' };
    if (/初级|初級/i.test(text)) return { lang: 'zh', level: 'HSK 2' };
    if (/入门|入門/i.test(text)) return { lang: 'zh', level: 'HSK 1' };

    // 3. Korean (TOPIK & Korean learning keywords)
    const topikMatch = text.match(/\bTOPIK\s*([1-6]|I{1,2})\b/i);
    if (topikMatch) return { lang: 'ko', level: `TOPIK ${topikMatch[1]}` };
    if (/고급/i.test(text)) return { lang: 'ko', level: 'TOPIK 5' };
    if (/중고급/i.test(text)) return { lang: 'ko', level: 'TOPIK 4' };
    if (/중급/i.test(text)) return { lang: 'ko', level: 'TOPIK 3' };
    if (/초급/i.test(text)) return { lang: 'ko', level: 'TOPIK 2' };
    if (/입문/i.test(text)) return { lang: 'ko', level: 'TOPIK 1' };

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
    if (!label) return null;
    if (typeof label === 'object') {
        label = label.tier || label.level || '';
    }
    if (typeof label !== 'string' || !label) return null;
    const clean = label.trim();
    const upper = clean.toUpperCase();

    // Direct tier names (including snake_case and camelCase)
    const normalizedTier = upper.replace(/[-_\s]/g, '');
    if (normalizedTier === 'UPPERINTERMEDIATE') return 'upper_intermediate';
    if (['BEGINNER', 'ELEMENTARY', 'INTERMEDIATE', 'ADVANCED'].includes(normalizedTier)) {
        return normalizedTier.toLowerCase();
    }

    // 1. Beginner
    if (
        /\b(?:JLPT\s*)?N5\b/i.test(clean) ||
        /\bHSK\s*1\b/i.test(clean) ||
        /\bTOPIK\s*(?:1|I)\b/i.test(clean) ||
        /\bCEFR\s*A1\b/i.test(clean) ||
        /\bA1\b/i.test(clean) ||
        upper.includes('BEGINNER') ||
        upper.includes('SƠ CẤP') ||
        upper.includes('NHẬP MÔN') ||
        /入門|初級|초급\s*1|입문/.test(clean)
    ) {
        return 'beginner';
    }

    // 2. Elementary
    if (
        /\b(?:JLPT\s*)?N4\b/i.test(clean) ||
        /\bHSK\s*2\b/i.test(clean) ||
        /\bTOPIK\s*2\b/i.test(clean) ||
        /\bCEFR\s*A2\b/i.test(clean) ||
        /\bA2\b/i.test(clean) ||
        upper.includes('ELEMENTARY') ||
        /초급\s*2|초급/.test(clean)
    ) {
        return 'elementary';
    }

    // 3. Upper Intermediate (Check BEFORE intermediate to prevent substring collisions)
    if (
        /\b(?:JLPT\s*)?N2\b/i.test(clean) ||
        /\bHSK\s*5\b/i.test(clean) ||
        /\bTOPIK\s*5\b/i.test(clean) ||
        /\bCEFR\s*B2\b/i.test(clean) ||
        /\bB2\b/i.test(clean) ||
        upper.includes('UPPER') ||
        upper.includes('TRUNG CAO CẤP') ||
        /中上級|中高级|中高級|중고급/.test(clean)
    ) {
        return 'upper_intermediate';
    }

    // 4. Advanced
    if (
        /\b(?:JLPT\s*)?N1\b/i.test(clean) ||
        /\bHSK\s*6\b/i.test(clean) ||
        /\bTOPIK\s*(?:6|II)\b/i.test(clean) ||
        /\bCEFR\s*C[12]\b/i.test(clean) ||
        /\bC[12]\b/i.test(clean) ||
        upper.includes('ADVANCED') ||
        upper.includes('CAO CẤP') ||
        upper.includes('FLUENT') ||
        /上級|高级|高級|고급/.test(clean)
    ) {
        return 'advanced';
    }

    // 5. Intermediate
    if (
        /\b(?:JLPT\s*)?N3\b/i.test(clean) ||
        /\bHSK\s*[34]\b/i.test(clean) ||
        /\bTOPIK\s*[34]\b/i.test(clean) ||
        /\bCEFR\s*B1\b/i.test(clean) ||
        /\bB1\b/i.test(clean) ||
        upper.includes('INTERMEDIATE') ||
        upper.includes('TRUNG CẤP') ||
        /中級|中级|중급/.test(clean)
    ) {
        return 'intermediate';
    }

    return 'intermediate';
}

/** Normalize diagnostic scores before classification, blending or storage. */
export function normalizeLevelScore(score, lang) {
    const cleanLang = (lang || '').toLowerCase().trim().split('-')[0].split('_')[0];
    return Math.min(cleanLang === 'ja' ? 5 : 6, Math.max(1, Number.isFinite(score) ? score : 1));
}

/** Representative score for an explicit level, including the six-level scales. */
export function levelToScore(level) {
    const clean = String(level || '').trim().toUpperCase();
    const jlpt = clean.match(/^(?:JLPT\s*)?N([1-5])$/);
    if (jlpt) return 6 - Number(jlpt[1]);
    const numbered = clean.match(/^(?:HSK|TOPIK)\s*([1-6])/);
    if (numbered) return Number(numbered[1]);
    if (/^TOPIK\s*II$/.test(clean)) return 6;
    if (/^TOPIK\s*I$/.test(clean)) return 1;
    const cefr = clean.replace(/^CEFR\s*/, '');
    const index = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(cefr);
    if (index >= 0) return index + 1;
    return { beginner: 1, elementary: 2, intermediate: 3, upper_intermediate: 4, advanced: 5 }[labelToTier(level)] || 3;
}

/**
 * Maps numeric score (1.0 to 5.0/6.0) to calibrated standard language level label
 * @param {number} score
 * @param {string} lang
 * @returns {string}
 */
export function scoreToLevelLabel(score, lang) {
    const clamped = normalizeLevelScore(score, lang);
    const cleanLang = (lang || '').toLowerCase().trim().split('-')[0].split('_')[0];
    if (cleanLang === 'ja') {
        if (clamped < 1.85) return 'JLPT N5';
        if (clamped < 2.75) return 'JLPT N4';
        if (clamped < 3.70) return 'JLPT N3';
        if (clamped < 4.60) return 'JLPT N2';
        return 'JLPT N1';
    }
    if (cleanLang === 'zh') {
        if (clamped < 1.85) return 'HSK 1';
        if (clamped < 2.85) return 'HSK 2';
        if (clamped < 3.85) return 'HSK 3';
        if (clamped < 4.85) return 'HSK 4';
        if (clamped < 5.85) return 'HSK 5';
        return 'HSK 6';
    }
    if (cleanLang === 'ko') {
        if (clamped < 1.85) return 'TOPIK 1';
        if (clamped < 2.85) return 'TOPIK 2';
        if (clamped < 3.85) return 'TOPIK 3';
        if (clamped < 4.85) return 'TOPIK 4';
        if (clamped < 5.85) return 'TOPIK 5';
        return 'TOPIK 6';
    }
    if (cleanLang === 'en') {
        if (clamped < 1.85) return 'CEFR A1';
        if (clamped < 2.85) return 'CEFR A2';
        if (clamped < 3.85) return 'CEFR B1';
        if (clamped < 4.85) return 'CEFR B2';
        if (clamped < 5.85) return 'CEFR C1';
        return 'CEFR C2';
    }
    return `Level ${Math.round(clamped)}`;
}

/**
 * Maps numeric score to standard tier
 * @param {number} score
 * @param {string} lang
 * @returns {'beginner' | 'elementary' | 'intermediate' | 'upper_intermediate' | 'advanced'}
 */
export function scoreToTier(score, lang) {
    return labelToTier(scoreToLevelLabel(score, lang));
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
            WHERE video_id = ? AND (language = ? OR language = '*') AND source = ?
              AND created_at >= strftime('%s', 'now') - ?
        `).bind(videoId, lang, source, NO_TRANSCRIPT_MAX_AGE_SECONDS).first();

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
            INSERT INTO no_transcript_cache (video_id, language, source)
            VALUES (?, ?, ?)
            ON CONFLICT(video_id, language, source) DO UPDATE SET created_at = strftime('%s', 'now')
        `).bind(videoId, lang, source).run();
    } catch { }
}

/**
 * Delete a negative cache entry from no_transcript_cache in D1
 * Called when a transcript is successfully fetched or forceRefresh is requested
 * @param {D1Database} db
 * @param {string} videoId
 * @param {string} [lang]
 * @param {string} [source]
 */
export async function deleteNoTranscript(db, videoId, lang = null, source = null) {
    if (!db || !videoId) return;

    try {
        if (lang && source) {
            await db.prepare(`
                DELETE FROM no_transcript_cache 
                WHERE video_id = ? AND (language = ? OR language = '*') AND source = ?
            `).bind(videoId, lang, source).run();
        } else if (lang) {
            await db.prepare(`
                DELETE FROM no_transcript_cache 
                WHERE video_id = ? AND (language = ? OR language = '*')
            `).bind(videoId, lang).run();
        } else {
            await db.prepare(`
                DELETE FROM no_transcript_cache 
                WHERE video_id = ?
            `).bind(videoId).run();
        }
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
 * Collect a fixed discovery window before ranking. Offset, page size and seed
 * never change candidate membership. Metadata scans and R2 probes are bounded.
 */
export async function getRecommendedVideosFromCloudflare(db, r2, lang, limit = 12, tier = null, _shuffle = false, offset = 0, query = null, options = {}) {
    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 50);
    const safeOffset = Math.max(parseInt(offset, 10) || 0, 0);
    const targetTier = tier ? labelToTier(tier) : null;
    const cleanQuery = typeof query === 'string' ? query.trim().slice(0, 100) : '';
    const { context = null, sessionSeed = null, category = null, includePage = false } = options || {};
    if (!db || !lang) throw new Error('Recommendation database unavailable');

    const candidates = new Map();
    const batchSize = 200;
    const maxScans = 20;
    let cursor = null;
    let exhausted = false;
    let probes = 0;
    let verificationIncomplete = false;
    const parseArray = value => {
        try { const parsed = JSON.parse(value || '[]'); return Array.isArray(parsed) ? parsed : []; }
        catch { return []; }
    };

    for (let scan = 0; scan < maxScans && candidates.size < 200; scan++) {
        // LIKE is only a coarse index filter; exact language membership is checked below.
        let sql = `SELECT video_id, title, channel, channel_avatar, duration_seconds,
            levels, available_languages, sub_languages, category, updated_at
            FROM video_languages
            WHERE (sub_languages LIKE ? OR ((sub_languages IS NULL OR sub_languages = '[]') AND available_languages LIKE ?))
            AND (duration_seconds IS NULL OR duration_seconds = 0 OR duration_seconds BETWEEN 20 AND 7200)
            AND title IS NOT NULL AND TRIM(title) != ''
            AND channel IS NOT NULL AND TRIM(channel) != ''`;
        const bindings = [`%${lang}%`, `%${lang}%`];
        if (category && category !== 'all') { sql += ' AND category = ?'; bindings.push(category); }
        if (cleanQuery) {
            const tokens = cleanQuery.split(/[\s\u3000]+/).filter(t => t.length > 0).slice(0, 3);
            if (tokens.length > 1) {
                const tokenClauses = [];
                for (const token of tokens) {
                    tokenClauses.push("(title LIKE ? ESCAPE '\\' OR channel LIKE ? ESCAPE '\\')");
                    const pattern = `%${token.replace(/[\\%_]/g, '\\$&')}%`;
                    bindings.push(pattern, pattern);
                }
                sql += ` AND (${tokenClauses.join(' AND ')})`;
            } else {
                sql += " AND (title LIKE ? ESCAPE '\\' OR channel LIKE ? ESCAPE '\\')";
                const pattern = `%${cleanQuery.replace(/[\\%_]/g, '\\$&')}%`;
                bindings.push(pattern, pattern);
            }
        }
        if (cursor) {
            sql += ' AND (COALESCE(updated_at, 0) < ? OR (COALESCE(updated_at, 0) = ? AND video_id > ?))';
            bindings.push(cursor.time, cursor.time, cursor.id);
        }
        sql += ' ORDER BY COALESCE(updated_at, 0) DESC, video_id ASC LIMIT ?';
        bindings.push(batchSize);
        const result = await db.prepare(sql).bind(...bindings).all();
        if (result.success === false || !Array.isArray(result.results)) throw new Error('Recommendation query failed');
        const rows = result.results;
        exhausted = rows.length < batchSize;
        if (!rows.length) break;
        const last = rows[rows.length - 1];
        cursor = { time: last.updated_at || 0, id: last.video_id };

        const eligible = [];
        for (const row of rows) {
            if (candidates.has(row.video_id)) continue;
            let levels = {};
            try { levels = JSON.parse(row.levels || '{}') || {}; } catch { /* Unknown level. */ }
            let level = levels[lang] || null;
            if (!level) {
                const detected = detectLevelFromMetadata(row.title, row.channel);
                if (detected?.lang === lang) level = detected.level;
            }
            const videoTier = level ? labelToTier(level) : null;
            if (targetTier && videoTier !== targetTier) continue;
            const languages = parseArray(row.sub_languages);
            eligible.push({ row, level, videoTier, languages });
        }

        // Preserve metadata order after concurrent probes, independent of I/O completion order.
        for (let i = 0; i < eligible.length && candidates.size < 200;) {
            const group = eligible.slice(i, i + Math.min(8, 200 - candidates.size));
            i += group.length;
            const verified = await Promise.all(group.map(async item => {
                if (item.languages.includes(lang)) return item;
                if (!r2 || probes >= 10) { verificationIncomplete = true; return null; }
                probes++;
                try {
                    if (!await r2.head(`transcripts/${item.row.video_id}/${lang}.json`)) return null;
                    item.languages.push(lang);
                    return item;
                } catch { throw new Error('Recommendation transcript verification unavailable'); }
            }));
            for (const item of verified) {
                if (!item || candidates.size >= 200) continue;
                const { row, level, videoTier, languages } = item;
                candidates.set(row.video_id, {
                    videoId: row.video_id, title: row.title, channel: row.channel,
                    channelAvatar: row.channel_avatar || null,
                    duration: row.duration_seconds || 0,
                    thumbnail: `https://i.ytimg.com/vi/${row.video_id}/mqdefault.jpg`,
                    languages: [...new Set(languages.filter(l => ['ja', 'zh', 'ko', 'en'].includes(l)))],
                    level: typeof level === 'string' ? level : level?.level,
                    tier: videoTier || undefined,
                    category: row.category && row.category !== 'general' ? row.category : detectVideoCategory(row),
                    updatedAt: row.updated_at || 0
                });
            }
        }
        if (exhausted) break;
    }
    if (verificationIncomplete) throw new Error('Recommendation transcript verification budget exceeded');
    if (!exhausted && candidates.size < 200) {
        if (!cleanQuery) {
            throw new Error('Recommendation scan budget exceeded');
        }
        // In search mode, do not fail on sparse candidate sets; proceed with matches found
    }
    const ranked = rankVideos([...candidates.values()], {
        language: lang,
        tier: targetTier,
        context,
        sessionSeed,
        query: cleanQuery
    });
    const videos = ranked.slice(safeOffset, safeOffset + safeLimit);
    return includePage ? { videos, hasMore: safeOffset + videos.length < ranked.length } : videos;
}

/**
 * Backward compatibility wrapper for getRecommendedVideosFromCloudflare
 */
export async function getRecommendedVideosFromD1(db, lang, limit = 12, tier = null, offset = 0) {
    if (!db || !lang) return []; // Preserve the legacy helper's empty-input contract.
    return getRecommendedVideosFromCloudflare(db, null, lang, limit, tier, false, offset);
}


