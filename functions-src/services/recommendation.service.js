/**
 * Recommendation & Ranking Engine for Voca
 * Evaluates candidates using multi-factor pedagogical scoring, Krashen i+1 leveling,
 * active vocabulary notebook overlap, creator affinity, and YouTube-style channel de-clustering.
 */

const WEIGHTS = { completed: -70, searchCompleted: -30, resume: 10, started: 5, unseen: 40, favorite: 20,
    channel: 30, vocabulary: 25, vocabularyWord: 5, vocabularyCap: 20,
    shortLesson: 20, longLesson: 10, extremeDuration: -10,
    currentTier: 20, nextTier: 12, prevTier: 6, tooEasy: -10, tooHard: -20,
    ungraded: -8, jitter: 12 };

const TIERS_ORDER = ['beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced'];

function normalizeMatchKey(value) {
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
        favorites: strings(input.favorites, 200, 100), topChannels: strings(input.topChannels, 10, 200),
        vocabWords: [...new Set(strings(input.vocabWords, 50, 100).map(w => w.toLowerCase()))], dominantTier };
}

function vocabularyPattern(word) {
    if (/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(word)) return null;
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(?:^|[^\\p{L}\\p{N}])${escaped}(?=$|[^\\p{L}\\p{N}])`, 'u');
}

/**
 * Score and rank candidate videos using learner signals
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
        category = null
    } = options;

    const cleanSearchQuery = (typeof query === 'string' && query.trim())
        ? query.trim().normalize('NFKC').toLowerCase()
        : null;
    const isSearchMode = Boolean(cleanSearchQuery);
    const searchTokens = isSearchMode
        ? cleanSearchQuery.split(/[\s\u3000]+/).filter(t => t.length > 0)
        : [];

    const safeContext = normalizeRecommendationContext(context);

    // 1. Unpack learner state
    const watchedSet = new Set(Array.isArray(safeContext.watched) ? safeContext.watched : []);
    const inProgressMap = new Map();
    if (safeContext.inProgress && typeof safeContext.inProgress === 'object') {
        for (const [id, prog] of Object.entries(safeContext.inProgress)) {
            const num = Number(prog);
            if (!isNaN(num) && num > 0) inProgressMap.set(id, num);
        }
    }
    const favoritesSet = new Set(Array.isArray(safeContext.favorites) ? safeContext.favorites : []);

    // Creator / Channel Affinity weights
    const channelAffinityMap = new Map();
    if (Array.isArray(safeContext.topChannels)) {
        safeContext.topChannels.forEach((ch, idx) => {
            const normCh = normalizeMatchKey(ch);
            if (normCh) {
                const weight = Math.max(WEIGHTS.channel - idx * 5, 10);
                channelAffinityMap.set(normCh, weight);
            }
        });
    }

    // Active SRS Flashcard Vocabulary Words
    const vocabWords = (Array.isArray(safeContext.vocabWords) ? safeContext.vocabWords : [])
        .map(w => normalizeMatchKey(w))
        .filter(w => w.length > 0)
        .slice(0, 50);

    const vocabulary = new Map(vocabWords.map(word => [word, vocabularyPattern(word)]));

    const dominantTier = normalizeTierValue(safeContext.dominantTier);

    // 2. Multi-factor scoring pass
    const scored = videos.map(video => {
        let score = 0;
        const v = { ...video };
        const vid = v.videoId;

        // Factor A: History & Completion State
        const progress = inProgressMap.get(vid);
        const isCompleted = watchedSet.has(vid) || (progress || 0) >= 85;
        if (isCompleted) {
            score += isSearchMode ? WEIGHTS.searchCompleted : WEIGHTS.completed; // Demote completed (less harshly in explicit search)
        } else if (progress !== undefined) {
            if (progress >= 10) {
                score += WEIGHTS.resume; // Resume learning boost
                v.resumeProgress = Math.round(progress);
            } else {
                score += WEIGHTS.started;
            }
        } else {
            score += WEIGHTS.unseen; // Completely new / unwatched exploration bonus
        }

        if (favoritesSet.has(vid)) {
            score += WEIGHTS.favorite;
        }

        // Factor B: Creator / Channel Affinity
        const normChan = normalizeMatchKey(v.channel);
        if (normChan && channelAffinityMap.has(normChan)) {
            score += channelAffinityMap.get(normChan);
        }

        const tagsLower = Array.isArray(v.tags)
            ? v.tags.filter(t => typeof t === 'string').map(t => normalizeMatchKey(t)).filter(Boolean).join(' ')
            : '';

        // Factor C: Active Vocabulary Overlap (across title + creator tags)
        if (vocabWords.length > 0 && (v.title || tagsLower)) {
            const titleLower = normalizeMatchKey(v.title);
            const matched = [];
            for (const [word, pattern] of vocabulary) {
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
                score += WEIGHTS.vocabulary + Math.min(matched.length * WEIGHTS.vocabularyWord, WEIGHTS.vocabularyCap); // up to +45 pts
            }
        }

        // Factor D: Pedagogical Duration Sweet Spot (3 to 12 minutes favored)
        const d = v.duration || 0;
        if (d >= 180 && d <= 720) {
            score += WEIGHTS.shortLesson; // 3 to 12 mins (optimal micro-learning retention)
        } else if (d > 720 && d <= 1200) {
            score += WEIGHTS.longLesson; // 12 to 20 mins
        } else if (d > 0 && (d < 90 || d > 2400)) {
            score += WEIGHTS.extremeDuration; // <1.5 min or >40 min
        }

        // Factor E: Full 5-Tier Krashen Level Balancing (i-2 .. i+2)
        if (!requestedTier || requestedTier === 'all') {
            if (dominantTier && v.tier) {
                const domIdx = TIERS_ORDER.indexOf(dominantTier);
                const vidIdx = TIERS_ORDER.indexOf(v.tier);
                if (v.tier === dominantTier) {
                    score += WEIGHTS.currentTier; // comfort zone
                } else if (domIdx !== -1 && vidIdx === domIdx + 1) {
                    score += WEIGHTS.nextTier; // stretch Krashen i+1 goal
                } else if (domIdx !== -1 && vidIdx === domIdx - 1) {
                    score += WEIGHTS.prevTier; // i-1 review consolidation
                } else if (domIdx !== -1 && vidIdx <= domIdx - 2) {
                    score += WEIGHTS.tooEasy; // <= i-2 too basic
                } else if (domIdx !== -1 && vidIdx >= domIdx + 2) {
                    score += WEIGHTS.tooHard; // >= i+2 too hard
                }
            } else if (dominantTier && !v.tier && !isSearchMode) {
                score += WEIGHTS.ungraded;
            }
        }

        // Factor S: Text Search Relevance Scoring
        if (isSearchMode) {
            const titleNorm = normalizeMatchKey(v.title);

            // Exact title match, prefix, or full substring phrase match
            if (titleNorm === cleanSearchQuery) {
                score += 180;
            } else if (titleNorm.startsWith(cleanSearchQuery)) {
                score += 120;
            } else if (titleNorm.includes(cleanSearchQuery)) {
                score += 80;
            }

            // Token matches across title, creator tags, and channel
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

            // Channel name phrase match
            if (normChan === cleanSearchQuery) {
                score += 50;
            } else if (normChan && normChan.includes(cleanSearchQuery)) {
                score += 30;
            }
        }

        // Factor F: Deterministic Serendipity Jitter when sessionSeed is provided
        // Calibrated to +/- 12 pts so refresh seed rotations naturally swap video order across duration tiers
        // while strictly preserving learner completion demotion (-70 pts) and vocab notebook boosts (+25-45 pts).
        // Jitter is disabled in search mode so relevance takes absolute priority.
        if (!isSearchMode && sessionSeed !== null && sessionSeed !== undefined) {
            score += getDeterministicJitter(vid || '', sessionSeed, WEIGHTS.jitter);
        }

        v.recommendationScore = score;
        v.isCompleted = isCompleted;
        const learnerIndex = TIERS_ORDER.indexOf(dominantTier);
        const videoIndex = TIERS_ORDER.indexOf(v.tier);
        v.difficultyGap = learnerIndex >= 0 && videoIndex >= 0 ? videoIndex - learnerIndex : 0;
        return { video: v, score };
    });

    // 3. Browse learner priority, then weighted relevance and deterministic ties.
    scored.sort((a, b) => {
        if (!isSearchMode) {
            const completed = Number(a.video.isCompleted) - Number(b.video.isCompleted);
            if (completed) return completed;
            if (!requestedTier) {
                const tooHard = Number(a.video.difficultyGap >= 2) - Number(b.video.difficultyGap >= 2);
                if (tooHard) return tooHard;
            }
        }
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return (b.video.updatedAt || 0) - (a.video.updatedAt || 0)
            || String(a.video.videoId).localeCompare(String(b.video.videoId));
    });
    const sortedVideos = scored.map(s => s.video);

    // 4. Channel & Category Anti-Clustering Pass (bypassed in search mode to preserve relevance ordering)
    return isSearchMode
        ? sortedVideos
        : declusterChannels(sortedVideos, { declusterCategory: !category || category === 'all' });
}
