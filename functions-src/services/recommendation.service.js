/**
 * Recommendation & Ranking Engine for Voca
 * Evaluates candidates using multi-factor pedagogical scoring, Krashen i+1 leveling,
 * active vocabulary notebook overlap, creator affinity, and YouTube-style channel de-clustering.
 */

const WEIGHTS = { completed: -70, resume: 35, started: 15, unseen: 40, favorite: 20,
    channel: 30, vocabulary: 25, vocabularyWord: 5, vocabularyCap: 20,
    shortLesson: 20, longLesson: 10, extremeDuration: -10, currentTier: 20, nextTier: 12, tooHard: -20, jitter: 12 };

const TIERS_ORDER = ['beginner', 'elementary', 'intermediate', 'upper_intermediate', 'advanced'];

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

/**
 * Deterministic pseudo-random serendipity jitter.
 * Defaults to [-4.0, +4.0], configurable via amplitude parameter.
 * Consistent across pagination offsets for the same session seed and video ID.
 */
export function getDeterministicJitter(videoId, seed = 12345, amplitude = 4) {
    const cleanSeed = typeof seed === 'number' ? seed : 12345;
    const cleanAmp = (typeof amplitude === 'number' && amplitude > 0) ? amplitude : 4;
    const h = Math.abs(hashString(String(videoId || '')) ^ cleanSeed);
    const mod = Math.round(cleanAmp * 2000);
    return ((h % mod) / 1000) - cleanAmp;
}

/**
 * YouTube-style channel spacing: ensures consecutive video cards are from different creators
 */
export function declusterChannels(videos) {
    if (!Array.isArray(videos) || videos.length <= 2) {
        return videos || [];
    }

    const result = [];
    const pool = [...videos];
    while (pool.length) {
        const previous = result.at(-1)?.channel?.trim().toLowerCase();
        const different = previous ? pool.findIndex(v => v.channel?.trim().toLowerCase() !== previous) : 0;
        result.push(pool.splice(different < 0 ? 0 : different, 1)[0]);
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
    const dominantTier = typeof input.dominantTier === 'string' && TIERS_ORDER.includes(input.dominantTier.trim().toLowerCase())
        ? input.dominantTier.trim().toLowerCase() : null;
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
 * @param {string} options.language Active learning language ('ja', 'ko', 'zh', 'en')
 * @param {string|null} options.tier Optional requested difficulty tier
 * @param {Object|null} options.context Learner context (history, vocab, channels)
 * @param {number} options.sessionSeed Session seed for deterministic serendipity
 * @returns {Array<Object>} Ranked and anti-clustered video objects
 */
export function rankVideos(videos, options = {}) {
    if (!Array.isArray(videos) || videos.length === 0) {
        return [];
    }

    const {
        tier: requestedTier = null,
        context = {},
        sessionSeed = null
    } = options;

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
            if (typeof ch === 'string' && ch.trim()) {
                const weight = Math.max(WEIGHTS.channel - idx * 5, 10);
                channelAffinityMap.set(ch.trim().toLowerCase(), weight);
            }
        });
    }

    // Active SRS Flashcard Vocabulary Words
    const vocabWords = (Array.isArray(safeContext.vocabWords) ? safeContext.vocabWords : [])
        .map(w => (typeof w === 'string' ? w.trim().toLowerCase() : ''))
        .filter(w => w.length > 0)
        .slice(0, 50);

    const vocabulary = new Map(vocabWords.map(word => [word, vocabularyPattern(word)]));

    const dominantTier = (safeContext.dominantTier && typeof safeContext.dominantTier === 'string')
        ? safeContext.dominantTier.toLowerCase().trim()
        : null;

    // 2. Multi-factor scoring pass
    const scored = videos.map(video => {
        let score = 0;
        const v = { ...video };
        const vid = v.videoId;

        // Factor A: History & Completion State
        if (inProgressMap.has(vid)) {
            const prog = inProgressMap.get(vid);
            if (prog >= 85) {
                score += WEIGHTS.completed; // Completed -> heavily demote
            } else if (prog >= 10) {
                score += WEIGHTS.resume; // Resume learning boost
                v.resumeProgress = Math.round(prog);
            } else {
                score += WEIGHTS.started;
            }
        } else if (watchedSet.has(vid)) {
            score += WEIGHTS.completed; // Watched to completion -> demote
        } else {
            score += WEIGHTS.unseen; // Completely new / unwatched exploration bonus
        }

        if (favoritesSet.has(vid)) {
            score += WEIGHTS.favorite;
        }

        // Factor B: Creator / Channel Affinity
        if (v.channel) {
            const normChan = v.channel.trim().toLowerCase();
            if (channelAffinityMap.has(normChan)) {
                score += channelAffinityMap.get(normChan);
            }
        }

        // Factor C: Active Vocabulary Overlap
        if (vocabWords.length > 0 && v.title) {
            const titleLower = v.title.normalize('NFKC').toLowerCase();
            const matched = [];
            for (const [word, pattern] of vocabulary) {
                if (pattern ? pattern.test(titleLower) : titleLower.includes(word)) {
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

        // Factor E: Krashen i+1 Level Balancing
        if (!requestedTier || requestedTier === 'all') {
            if (dominantTier && v.tier) {
                if (v.tier === dominantTier) {
                    score += WEIGHTS.currentTier; // comfort zone
                } else {
                    const domIdx = TIERS_ORDER.indexOf(dominantTier);
                    const vidIdx = TIERS_ORDER.indexOf(v.tier);
                    if (domIdx !== -1 && vidIdx === domIdx + 1) {
                        score += WEIGHTS.nextTier; // stretch Krashen i+1 goal
                    } else if (domIdx !== -1 && vidIdx >= domIdx + 2) {
                        score += WEIGHTS.tooHard;
                    }
                }
            }
        }

        // Factor F: Deterministic Serendipity Jitter when sessionSeed is provided
        // Calibrated to +/- 12 pts so refresh seed rotations naturally swap video order across duration tiers
        // while strictly preserving learner completion demotion (-70 pts) and vocab notebook boosts (+25-45 pts).
        if (sessionSeed !== null && sessionSeed !== undefined) {
            score += getDeterministicJitter(vid || '', sessionSeed, WEIGHTS.jitter);
        }

        return { video: v, score };
    });

    // 3. Sort primarily by score descending, breaking ties by updatedAt DESC
    scored.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return (b.video.updatedAt || 0) - (a.video.updatedAt || 0)
            || String(a.video.videoId).localeCompare(String(b.video.videoId));
    });
    const sortedVideos = scored.map(s => s.video);

    // 4. Channel Anti-Clustering Pass
    return declusterChannels(sortedVideos);
}
