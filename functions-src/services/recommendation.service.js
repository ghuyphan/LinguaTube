/**
 * Recommendation & Ranking Engine for Voca
 * Evaluates candidates using multi-factor pedagogical scoring, Krashen i+1 leveling,
 * active vocabulary notebook overlap, creator affinity, and YouTube-style channel de-clustering.
 */

import { detectVideoCategory, VALID_CATEGORIES } from './category.service.js';
import { normalizeLanguageCode } from '../utils/transcript-utils.js';
import { jsonResponse, SUPPORTED_LEARNING_LANGUAGE_SET } from '../utils/utils.js';

const WEIGHTS = { completed: -70, searchCompleted: -30, resume: 10, started: 5, unseen: 40, favorite: 20,
    channel: 30, vocabulary: 25, vocabularyWord: 5, vocabularyCap: 20,
    shortLesson: 20, longLesson: 10, extremeDuration: -10,
    currentTier: 20, nextTier: 12, prevTier: 6, tooEasy: -10, tooHard: -20,
    ungraded: -8, jitter: 12 };

const TIERS_ORDER = ['beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced'];
const VALID_TIERS = new Set(TIERS_ORDER);
const SPOKEN_CATEGORIES = new Set(['conversation', 'vlog', 'education']);
const NOISE_BRACKET_RE = /[[(（【][^\])）】]*?(?:official|music|video|mv|hd|4k|1080p|audio|lyrics|vietsub|engsub|sub|español|live|ver|version|full|album|remix|the first take|tft|ft|feat)[^\])）】]*?[\])）】]/gi;
const ALL_BRACKET_RE = /\[.*?\]|\(.*?\)|【.*?】|（.*?）/g;
const QUOTE_TITLE_RE = /[《「『"“](.*?)[》」』"”]/;
const BUZZWORDS_RE = /\b(?:official|music|video|mv|hd|4k|1080p|audio|lyrics|vietsub|engsub|sub|español|live|ver|version|full|album|cover|remix|feat|ft|prod|ep)\b/gi;
const PUNCT_SPLIT_RE = /[\s\u3000/\\|#_~*•–—\-!！?？、。・～~:：;；,，.]+/;

export function normalizeMatchKey(value) {
    return typeof value === 'string' ? value.normalize('NFKC').trim().toLowerCase() : '';
}

function normalizeTierValue(value) {
    const clean = normalizeMatchKey(value);
    if (!clean) return null;
    const slug = clean.replace(/[\s-]+/g, '_');
    if (TIERS_ORDER.includes(slug)) return slug;
    if (/\b(?:jlpt\s*)?n5\b|\bhsk\s*1\b|\btopik\s*(?:1|i)\b|\b(?:cefr\s*)?a1\b/.test(clean)) return 'beginner';
    if (/\b(?:jlpt\s*)?n4\b|\bhsk\s*2\b|\btopik\s*2\b|\b(?:cefr\s*)?a2\b/.test(clean)) return 'elementary';
    if (/\b(?:jlpt\s*)?n3\b|\bhsk\s*[34]\b|\btopik\s*[34]\b|\b(?:cefr\s*)?b1\b/.test(clean)) return 'intermediate';
    if (/\b(?:jlpt\s*)?n2\b|\bhsk\s*5\b|\btopik\s*5\b|\b(?:cefr\s*)?b2\b/.test(clean)) return 'upper_intermediate';
    if (/\b(?:jlpt\s*)?n1\b|\bhsk\s*6\b|\btopik\s*(?:6|ii)\b|\b(?:cefr\s*)?c[12]\b/.test(clean)) return 'advanced';
    return null;
}

/**
 * 32-bit integer string hash
 */
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
    }
    return hash;
}

function mixSeed(seed) {
    if (typeof seed === 'number' && Number.isFinite(seed)) return Math.trunc(seed) | 0;
    if (typeof seed === 'string' && seed.trim().length > 0) return hashString(seed.trim());
    return 12345;
}

function splitmix32(x) {
    let z = (x + 0x9e3779b9) | 0;
    z = Math.imul(z ^ (z >>> 16), 0x85ebca6b);
    z = Math.imul(z ^ (z >>> 13), 0xc2b2ae35);
    return (z ^ (z >>> 16)) >>> 0;
}

/**
 * Deterministic pseudo-random serendipity jitter.
 * Defaults to [-4.0, +4.0], configurable via amplitude parameter.
 * Uses SplitMix32 bit mixing so adjacent small seeds and string seeds disperse evenly.
 * Consistent across pagination offsets for the same session seed and video ID.
 */
export function getDeterministicJitter(videoId, seed = 12345, amplitude = 4) {
    const cleanSeed = mixSeed(seed);
    const cleanAmp = (typeof amplitude === 'number' && Number.isFinite(amplitude) && amplitude > 0) ? amplitude : 4;
    const mixed = splitmix32(hashString(String(videoId || '')) ^ splitmix32(cleanSeed));
    return (mixed / 0x100000000) * (2 * cleanAmp) - cleanAmp;
}

/**
 * Space comparable candidates across creators (and optionally dominant categories)
 * without overriding learner priority.
 */
export function declusterChannels(videos, options = {}) {
    if (!Array.isArray(videos) || videos.length <= 2) {
        return videos || [];
    }

    const declusterCategory = options?.declusterCategory === true;
    const isComparable = (first, v) =>
        Boolean(v.isCompleted) === Boolean(first.isCompleted)
        && (v.difficultyGap >= 2) === (first.difficultyGap >= 2)
        && (!Number.isFinite(first.recommendationScore) || !Number.isFinite(v.recommendationScore)
            || first.recommendationScore - v.recommendationScore <= 12);

    const result = [];
    const pool = [...videos];
    const channelCounts = new Map();
    for (const v of pool) {
        const ch = normalizeMatchKey(v.channel);
        if (ch) channelCounts.set(ch, (channelCounts.get(ch) || 0) + 1);
    }
    while (pool.length) {
        const prev1 = normalizeMatchKey(result.at(-1)?.channel);
        const prev2 = normalizeMatchKey(result.at(-2)?.channel);
        const prev1Cat = declusterCategory ? (result.at(-1)?.category || null) : null;
        const prev2Cat = declusterCategory ? (result.at(-2)?.category || null) : null;
        const first = pool[0];
        let pick = -1;
        const checkPrev2 = Boolean(prev1 && prev2 && (channelCounts.get(prev2) || 0) * 2 <= pool.length);
        const allowsCategory = v => {
            if (!declusterCategory || !prev1Cat) return true;
            const cat = v.category || null;
            if (!cat) return true;
            if (prev1Cat === 'music') return cat !== 'music';
            if (prev2Cat && prev1Cat === prev2Cat) return cat !== prev1Cat;
            return true;
        };
        if (prev1 || (declusterCategory && prev1Cat)) {
            const predicates = [];
            if (declusterCategory && prev1Cat) {
                if (prev1 && checkPrev2) {
                    predicates.push(v => {
                        const ch = normalizeMatchKey(v.channel);
                        return ch !== prev1 && ch !== prev2 && allowsCategory(v) && isComparable(first, v);
                    });
                }
                if (prev1) {
                    predicates.push(v =>
                        normalizeMatchKey(v.channel) !== prev1 && allowsCategory(v) && isComparable(first, v));
                } else {
                    predicates.push(v => allowsCategory(v) && isComparable(first, v));
                }
            }
            if (prev1 && checkPrev2) {
                predicates.push(v => {
                    const ch = normalizeMatchKey(v.channel);
                    return ch !== prev1 && ch !== prev2 && isComparable(first, v);
                });
            }
            if (prev1) {
                predicates.push(v =>
                    normalizeMatchKey(v.channel) !== prev1 && isComparable(first, v));
            }
            for (const predicate of predicates) {
                pick = pool.findIndex(predicate);
                if (pick >= 0) break;
            }
        }
        const picked = pool.splice(pick < 0 ? 0 : pick, 1)[0];
        const pickedCh = normalizeMatchKey(picked.channel);
        if (pickedCh) channelCounts.set(pickedCh, (channelCounts.get(pickedCh) || 1) - 1);
        result.push(picked);
    }

    return result;
}

/** Normalize only ranking signals, with bounded collections and no identity data. */
export function normalizeRecommendationContext(value) {
    const input = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    const strings = (items, max, length) => [...new Set((Array.isArray(items) ? items.slice(0, max) : [])
        .filter(v => typeof v === 'string').map(v => v.normalize('NFKC').trim().slice(0, length)).filter(Boolean))];
    const inProgress = {};
    if (input.inProgress && typeof input.inProgress === 'object' && !Array.isArray(input.inProgress)) {
        for (const id of Object.keys(input.inProgress).slice(0, 200)) {
            const progress = input.inProgress[id];
            if (id.length <= 100 && typeof progress === 'number' && Number.isFinite(progress) && progress > 0) {
                Object.defineProperty(inProgress, id, { value: Math.min(progress, 100), enumerable: true });
            }
        }
    }
    const dominantTier = normalizeTierValue(input.dominantTier);
    return { watched: strings(input.watched, 200, 100), inProgress,
        excludeIds: strings(input.excludeIds, 200, 100),
        favorites: strings(input.favorites, 200, 100), topChannels: strings(input.topChannels, 10, 200),
        vocabWords: [...new Set(strings(input.vocabWords, 50, 100).map(w => w.toLowerCase()))], dominantTier };
}

/**
 * Parse and validate shared GET/POST recommendation request parameters.
 * Returns either `{ params }` or `{ errorResponse }`.
 */
export async function parseRecommendationRequest(context, method, { defaultLimit = 12 } = {}) {
    const { request } = context;
    const url = new URL(request.url);

    let body = {};
    if (method === 'POST') {
        try {
            if (context?.data?.parsedBody !== undefined) {
                body = context.data.parsedBody;
                if (JSON.stringify(body).length > 65536) {
                    return { errorResponse: jsonResponse({ success: false, error: 'Recommendation context too large' }, 413) };
                }
            } else {
                const text = await request.text();
                if (text.length > 65536) {
                    return { errorResponse: jsonResponse({ success: false, error: 'Recommendation context too large' }, 413) };
                }
                body = JSON.parse(text);
            }
            if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid body');
        } catch {
            return { errorResponse: jsonResponse({ success: false, error: 'Invalid JSON object' }, 400) };
        }
    }
    for (const key of ['lang', 'tier', 'category', 'q', 'query', 'level']) {
        if (body[key] != null && typeof body[key] !== 'string') {
            return { errorResponse: jsonResponse({ success: false, error: `Invalid ${key}` }, 400) };
        }
    }

    const rawLang = normalizeLanguageCode(body.lang || url.searchParams.get('lang') || 'ja');
    const lang = SUPPORTED_LEARNING_LANGUAGE_SET.has(rawLang) ? rawLang : 'ja';

    const rawTier = (body.tier || url.searchParams.get('tier') || '').toLowerCase().trim().replace(/[\s-]+/g, '_');
    const tier = VALID_TIERS.has(rawTier) ? rawTier : null;

    const rawCategory = (body.category || url.searchParams.get('category') || '').toLowerCase().trim();
    const category = VALID_CATEGORIES.has(rawCategory) ? rawCategory : null;

    const limitParam = parseInt(body.limit ?? url.searchParams.get('limit'), 10);
    const limit = Math.min(Math.max(isNaN(limitParam) ? defaultLimit : limitParam, 1), 50);

    const offsetParam = parseInt(body.offset ?? url.searchParams.get('offset'), 10);
    const offset = Math.max(isNaN(offsetParam) ? 0 : offsetParam, 0);

    const firstNonEmpty = (...values) => {
        for (const value of values) {
            if (typeof value === 'string' && value.trim().length > 0) return value.trim();
        }
        return '';
    };
    const rawQuery = firstNonEmpty(body.q, body.query, url.searchParams.get('q'), url.searchParams.get('query'))
        .replace(/[\x00-\x1F\x7F]/g, '');
    const query = rawQuery.length > 0 ? rawQuery.slice(0, 100) : null;
    const level = firstNonEmpty(body.level, url.searchParams.get('level')).slice(0, 40) || null;

    const isRefresh = body.refresh === true || body.force === true
        || url.searchParams.get('refresh') === 'true' || url.searchParams.get('force') === 'true';

    const rawSeed = body.sessionSeed ?? body.seed ?? url.searchParams.get('seed');
    let sessionSeed;
    if (typeof rawSeed === 'number' && Number.isFinite(rawSeed)) {
        sessionSeed = Math.trunc(rawSeed);
    } else if (typeof rawSeed === 'string' && rawSeed.trim().length > 0) {
        const trimmedSeed = rawSeed.trim();
        if (/^-?\d+$/.test(trimmedSeed)) {
            sessionSeed = parseInt(trimmedSeed, 10);
        } else {
            sessionSeed = hashString(trimmedSeed) >>> 0;
        }
    } else {
        sessionSeed = isRefresh ? Math.floor(Math.random() * 1000000) : 12345;
    }

    const userContext = normalizeRecommendationContext(body.context);
    const excludeIds = [...new Set([
        ...userContext.excludeIds,
        ...(Array.isArray(body.excludeIds) ? body.excludeIds : [])
            .filter(v => typeof v === 'string')
            .map(v => v.normalize('NFKC').trim().slice(0, 100))
            .filter(Boolean)
    ])].slice(0, 200);

    const isPersonalized = Boolean(userContext.watched.length || Object.keys(userContext.inProgress).length
        || userContext.vocabWords.length || userContext.topChannels.length
        || userContext.favorites.length || userContext.dominantTier || excludeIds.length);

    return {
        params: {
            body, url, lang, tier, category, limit, offset, query, level,
            isRefresh, sessionSeed, userContext, excludeIds, isPersonalized
        }
    };
}

export function recommendationResponseHeaders(metrics, { isPersonalized = false, isRefresh = false } = {}) {
    return {
        'X-Cache': isPersonalized
            ? 'BYPASS-PERSONALIZED'
            : (isRefresh ? 'BYPASS' : (metrics?.candidateCache === 'HIT' ? 'HIT-CANDIDATES' : 'MISS')),
        'X-Candidate-Cache': metrics?.candidateCache || 'NOT-QUERIED',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
    };
}

function vocabularyPattern(word) {
    if (/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(word)) return null;
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(?:^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, 'u');
}

function unpackLearnerContext(context, extraExcludeIds = []) {
    const safeContext = normalizeRecommendationContext(context);
    const watchedSet = new Set(safeContext.watched);
    const excludeSet = new Set([...safeContext.excludeIds, ...extraExcludeIds].filter(Boolean));
    const inProgressMap = new Map();
    for (const [id, prog] of Object.entries(safeContext.inProgress)) {
        const num = Number(prog);
        if (!isNaN(num) && num > 0) inProgressMap.set(id, num);
    }
    const favoritesSet = new Set(safeContext.favorites);
    const channelAffinityMap = new Map();
    safeContext.topChannels.forEach((ch, idx) => {
        const normCh = normalizeMatchKey(ch);
        if (normCh) channelAffinityMap.set(normCh, Math.max(WEIGHTS.channel - idx * 5, 10));
    });
    const vocabWords = safeContext.vocabWords.map(w => normalizeMatchKey(w)).filter(Boolean).slice(0, 50);
    const vocabulary = new Map(vocabWords.map(word => [word, vocabularyPattern(word)]));
    return {
        watchedSet,
        excludeSet,
        inProgressMap,
        favoritesSet,
        channelAffinityMap,
        vocabWords,
        vocabulary,
        dominantTier: normalizeTierValue(safeContext.dominantTier)
    };
}

function scoreLearnerCommon(v, unpacked, { includeTier = true, isSearchMode = false } = {}) {
    let score = 0;
    const vid = v.videoId;
    if (unpacked.favoritesSet.has(vid)) score += WEIGHTS.favorite;

    const normChan = normalizeMatchKey(v.channel);
    if (normChan && unpacked.channelAffinityMap.has(normChan)) {
        score += unpacked.channelAffinityMap.get(normChan);
    }

    const tagsLower = Array.isArray(v.tags)
        ? v.tags.filter(t => typeof t === 'string').map(t => normalizeMatchKey(t)).filter(Boolean).join(' ')
        : '';

    if (unpacked.vocabWords.length > 0 && (v.title || tagsLower)) {
        const titleLower = normalizeMatchKey(v.title);
        const matched = [];
        for (const [word, pattern] of unpacked.vocabulary) {
            const hit = pattern
                ? ((titleLower && pattern.test(titleLower)) || (tagsLower && pattern.test(tagsLower)))
                : ((titleLower && titleLower.includes(word)) || (tagsLower && tagsLower.includes(word)));
            if (hit) {
                matched.push(word);
                if (matched.length >= 5) break;
            }
        }
        if (matched.length > 0) {
            v.matchedWords = matched;
            score += WEIGHTS.vocabulary + Math.min(matched.length * WEIGHTS.vocabularyWord, WEIGHTS.vocabularyCap);
        }
    }

    const d = v.duration || 0;
    if (d >= 180 && d <= 720) score += WEIGHTS.shortLesson;
    else if (d > 720 && d <= 1200) score += WEIGHTS.longLesson;
    else if (d > 0 && (d < 90 || d > 2400)) score += WEIGHTS.extremeDuration;

    const { dominantTier } = unpacked;
    const learnerIndex = TIERS_ORDER.indexOf(dominantTier);
    const videoIndex = TIERS_ORDER.indexOf(v.tier);
    v.difficultyGap = learnerIndex >= 0 && videoIndex >= 0 ? videoIndex - learnerIndex : 0;

    if (includeTier) {
        if (dominantTier && v.tier) {
            if (v.tier === dominantTier) score += WEIGHTS.currentTier;
            else if (learnerIndex !== -1 && videoIndex === learnerIndex + 1) score += WEIGHTS.nextTier;
            else if (learnerIndex !== -1 && videoIndex === learnerIndex - 1) score += WEIGHTS.prevTier;
            else if (learnerIndex !== -1 && videoIndex <= learnerIndex - 2) score += WEIGHTS.tooEasy;
            else if (learnerIndex !== -1 && videoIndex >= learnerIndex + 2) score += WEIGHTS.tooHard;
        } else if (dominantTier && !v.tier && !isSearchMode) {
            score += WEIGHTS.ungraded;
        }
    }

    return { score, normChan, tagsLower };
}

function cleanChannelName(channel) {
    if (typeof channel !== 'string') return '';
    const trimmed = channel.trim();
    const lower = trimmed.toLowerCase();
    if (!trimmed || lower === 'youtube' || lower === 'youtube creator' || lower === 'vevo') return '';
    return trimmed.replace(/\s*-\s*Topic$/i, '').replace(/\s+Official$/i, '').replace(/\s+VEVO$/i, '').trim();
}

function extractRelatedSignals(currentVideo) {
    const title = typeof currentVideo?.title === 'string' ? currentVideo.title.trim() : '';
    const channel = typeof currentVideo?.channel === 'string' ? currentVideo.channel.trim() : '';
    const cleanChan = cleanChannelName(channel);
    const quoteMatch = title ? QUOTE_TITLE_RE.exec(title) : null;
    const stripped = title.replace(NOISE_BRACKET_RE, ' ').replace(ALL_BRACKET_RE, ' ').replace(BUZZWORDS_RE, ' ');
    const rawKeywords = quoteMatch?.[1]
        ? [quoteMatch[1], ...stripped.split(PUNCT_SPLIT_RE)]
        : stripped.split(PUNCT_SPLIT_RE);
    const keywordTokens = [...new Set(
        rawKeywords
            .map(t => normalizeMatchKey(t))
            .filter(t => t.length >= 2 && t !== normalizeMatchKey(cleanChan))
    )].slice(0, 6);
    const keywordMatchers = keywordTokens.map(token => [token, vocabularyPattern(token)]);
    const category = currentVideo?.category && currentVideo.category !== 'general'
        ? String(currentVideo.category).trim().toLowerCase()
        : detectVideoCategory({ title, channel, tags: currentVideo?.tags });
    const tags = new Set(
        (Array.isArray(currentVideo?.tags) ? currentVideo.tags : [])
            .filter(t => typeof t === 'string')
            .map(t => normalizeMatchKey(t))
            .filter(Boolean)
    );
    const refTier = normalizeTierValue(currentVideo?.tier);
    return {
        cleanChanLower: normalizeMatchKey(cleanChan),
        keywordMatchers,
        category,
        tags,
        refTier
    };
}

function categoryMatchScore(curCat, candCat) {
    const a = curCat && curCat !== 'general' ? curCat : null;
    const b = candCat && candCat !== 'general' ? candCat : null;
    if (!a || !b) return 0;
    if (a === b) return 45;
    if (SPOKEN_CATEGORIES.has(a) && SPOKEN_CATEGORIES.has(b)) return 15;
    return (a === 'music' || b === 'music') ? -25 : 0;
}

/**
 * Score and rank candidate videos using learner signals (Home / Explore).
 *
 * @param {Array<Object>} videos Candidate video objects
 * @param {Object} options Ranking configuration
 * @param {string} [options.language] Active learning language ('ja', 'ko', 'zh', 'en')
 * @param {string|null} [options.tier] Optional requested difficulty tier
 * @param {Object|null} [options.context] Learner context (history, vocab, channels)
 * @param {number} [options.sessionSeed] Session seed for deterministic serendipity
 * @param {string|null} [options.query] Optional search query for text relevance scoring
 * @returns {Array<Object>} Ranked and anti-clustered video objects
 */
export function rankVideos(videos, options = {}) {
    if (!Array.isArray(videos) || videos.length === 0) {
        return [];
    }

    const {
        tier: requestedTier = null,
        context = {},
        sessionSeed = null,
        query = null,
        category = null,
        excludeIds = []
    } = options;

    const cleanSearchQuery = normalizeMatchKey(query);
    const isSearchMode = Boolean(cleanSearchQuery);
    const searchTokens = isSearchMode
        ? cleanSearchQuery.split(/[\s\u3000]+/).filter(t => t.length > 0)
        : [];

    const unpacked = unpackLearnerContext(context, Array.isArray(excludeIds) ? excludeIds : []);
    const filtered = unpacked.excludeSet.size > 0
        ? videos.filter(v => v?.videoId && !unpacked.excludeSet.has(v.videoId))
        : videos;

    const scored = filtered.map(video => {
        const v = { ...video };
        const vid = v.videoId;
        const { score: baseScore, normChan, tagsLower } = scoreLearnerCommon(v, unpacked, {
            includeTier: !requestedTier || requestedTier === 'all',
            isSearchMode
        });
        let score = baseScore;

        // Factor A: History & Completion State (Home keeps inProgress resumable, demotes >=85%)
        const progress = unpacked.inProgressMap.get(vid);
        const isCompleted = unpacked.watchedSet.has(vid) || (progress || 0) >= 85;
        if (isCompleted) {
            score += isSearchMode ? WEIGHTS.searchCompleted : WEIGHTS.completed;
        } else if (progress !== undefined) {
            if (progress >= 10) {
                score += WEIGHTS.resume;
                v.resumeProgress = Math.round(progress);
            } else {
                score += WEIGHTS.started;
            }
        } else {
            score += WEIGHTS.unseen;
        }

        // Factor S: Text Search Relevance Scoring
        if (isSearchMode) {
            const titleNorm = normalizeMatchKey(v.title);
            if (titleNorm === cleanSearchQuery) score += 180;
            else if (titleNorm.startsWith(cleanSearchQuery)) score += 120;
            else if (titleNorm.includes(cleanSearchQuery)) score += 80;

            let tokenHits = 0;
            let tagHits = 0;
            let channelTokenHits = 0;
            for (const token of searchTokens) {
                if (titleNorm.includes(token)) tokenHits++;
                if (tagsLower && tagsLower.includes(token)) tagHits++;
                if (normChan && normChan.includes(token)) channelTokenHits++;
            }
            if (tokenHits > 0) score += tokenHits * 25;
            if (tagHits > 0) score += tagHits * 20;
            if (channelTokenHits > 0) score += Math.min(channelTokenHits * 8, 24);

            if (normChan === cleanSearchQuery) score += 50;
            else if (normChan && normChan.includes(cleanSearchQuery)) score += 30;
        }

        // Factor F: Deterministic Serendipity Jitter (disabled in search mode)
        if (!isSearchMode && sessionSeed !== null && sessionSeed !== undefined) {
            score += getDeterministicJitter(vid || '', sessionSeed, WEIGHTS.jitter);
        }

        v.recommendationScore = score;
        v.isCompleted = isCompleted;
        return { video: v, score };
    });

    scored.sort((a, b) => {
        if (!isSearchMode) {
            const completed = Number(a.video.isCompleted) - Number(b.video.isCompleted);
            if (completed) return completed;
            if (!requestedTier) {
                const tooHard = Number(a.video.difficultyGap >= 2) - Number(b.video.difficultyGap >= 2);
                if (tooHard) return tooHard;
            }
        }
        if (b.score !== a.score) return b.score - a.score;
        return (b.video.updatedAt || 0) - (a.video.updatedAt || 0)
            || String(a.video.videoId).localeCompare(String(b.video.videoId));
    });
    const sortedVideos = scored.map(s => s.video);

    return isSearchMode
        ? sortedVideos
        : declusterChannels(sortedVideos, { declusterCategory: !category || category === 'all' });
}

/**
 * Score and rank candidate videos for the player's "More Videos" feed.
 * Strictly excludes current, session-excluded, and >=85% watched videos,
 * demotes older in-progress items behind fresh unseen videos, and scores content similarity.
 */
export function rankRelatedVideos(videos, options = {}) {
    if (!Array.isArray(videos) || videos.length === 0) return [];

    const {
        currentVideo = {},
        excludeIds = [],
        context = {},
        sessionSeed = null
    } = options;

    const currentVideoId = typeof currentVideo?.videoId === 'string' ? currentVideo.videoId.trim() : '';
    const unpacked = unpackLearnerContext(context, [currentVideoId, ...(Array.isArray(excludeIds) ? excludeIds : [])]);
    const signals = extractRelatedSignals(currentVideo);
    const effectiveRefTier = signals.refTier || unpacked.dominantTier;
    const refTierIdx = TIERS_ORDER.indexOf(effectiveRefTier);

    const eligible = videos.filter(v => {
        const vid = v?.videoId;
        if (!vid || unpacked.excludeSet.has(vid) || unpacked.watchedSet.has(vid)) return false;
        const progress = unpacked.inProgressMap.get(vid);
        return progress === undefined || progress < 85;
    });

    const scored = eligible.map(video => {
        const v = { ...video };
        const vid = v.videoId;
        const { score: baseScore } = scoreLearnerCommon(v, unpacked, { includeTier: false });
        let score = baseScore;

        // Older in-progress videos are demoted behind fresh unseen recommendations.
        const progress = unpacked.inProgressMap.get(vid);
        const isStarted = progress !== undefined;
        if (isStarted) {
            score -= 25;
            if (progress >= 10) v.resumeProgress = Math.round(progress);
        } else {
            score += 10;
        }

        // Content similarity: channel/artist, category, tags, title keywords, soft tier proximity.
        const candChan = normalizeMatchKey(cleanChannelName(v.channel));
        if (signals.cleanChanLower && candChan &&
            (candChan.includes(signals.cleanChanLower) || signals.cleanChanLower.includes(candChan))) {
            score += 65;
        }

        const candCat = v.category && v.category !== 'general'
            ? String(v.category).trim().toLowerCase()
            : detectVideoCategory({ title: v.title, channel: v.channel, tags: v.tags });
        score += categoryMatchScore(signals.category, candCat);

        if (signals.tags.size > 0 && Array.isArray(v.tags)) {
            let shared = 0;
            for (const tag of v.tags) {
                if (typeof tag === 'string' && signals.tags.has(normalizeMatchKey(tag))) {
                    shared++;
                    if (shared >= 2) break;
                }
            }
            score += shared * 10;
        }

        if (signals.keywordMatchers.length > 0 && v.title) {
            const titleLower = normalizeMatchKey(v.title);
            let hits = 0;
            for (const [token, pattern] of signals.keywordMatchers) {
                const matched = pattern ? pattern.test(titleLower) : titleLower.includes(token);
                if (matched) {
                    hits++;
                    if (hits >= 2) break;
                }
            }
            score += hits * 20;
        }

        const candTierIdx = TIERS_ORDER.indexOf(normalizeTierValue(v.tier));
        if (refTierIdx >= 0 && candTierIdx >= 0) {
            const diff = Math.abs(candTierIdx - refTierIdx);
            if (diff === 0) score += 15;
            else if (diff === 1) score += 8;
        }

        if (sessionSeed !== null && sessionSeed !== undefined) {
            score += getDeterministicJitter(vid, sessionSeed, 4);
        }

        v.recommendationScore = score;
        v.isCompleted = false;
        return { video: v, score, isStarted };
    });

    scored.sort((a, b) => {
        const tooHard = Number(a.video.difficultyGap >= 2) - Number(b.video.difficultyGap >= 2);
        if (tooHard) return tooHard;
        const started = Number(a.isStarted) - Number(b.isStarted);
        if (started) return started;
        if (b.score !== a.score) return b.score - a.score;
        return (b.video.updatedAt || 0) - (a.video.updatedAt || 0)
            || String(a.video.videoId).localeCompare(String(b.video.videoId));
    });

    return declusterChannels(scored.map(s => s.video), { declusterCategory: false });
}
