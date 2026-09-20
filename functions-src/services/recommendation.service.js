/**
 * Recommendation & Ranking Engine for Voca
 * Evaluates candidates using multi-factor pedagogical scoring, Krashen i+1 leveling,
 * active vocabulary notebook overlap, creator affinity, and YouTube-style channel de-clustering.
 */

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
 * Deterministic pseudo-random serendipity jitter between -4.0 and +4.0
 * Consistent across pagination offsets for the same session seed and video ID.
 */
export function getDeterministicJitter(videoId, seed = 12345) {
    const cleanSeed = typeof seed === 'number' ? seed : 12345;
    const h = Math.abs(hashString(String(videoId || '')) ^ cleanSeed);
    return ((h % 8000) / 1000) - 4;
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

    while (pool.length > 0) {
        const current = pool.shift();
        result.push(current);

        if (pool.length === 0) break;

        const prevChannel = current.channel?.toLowerCase().trim();
        if (!prevChannel) continue;

        // If the next video is from the same channel, find the next candidate from a different channel
        if (pool[0].channel?.toLowerCase().trim() === prevChannel) {
            const diffIdx = pool.findIndex(v => v.channel?.toLowerCase().trim() !== prevChannel);
            if (diffIdx > 0) {
                const [diffVideo] = pool.splice(diffIdx, 1);
                result.push(diffVideo);
            }
        }
    }

    return result;
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

    const safeContext = context && typeof context === 'object' ? context : {};

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
                const weight = Math.max(30 - idx * 5, 10);
                channelAffinityMap.set(ch.trim().toLowerCase(), weight);
            }
        });
    }

    // Active SRS Flashcard Vocabulary Words
    const vocabWords = (Array.isArray(safeContext.vocabWords) ? safeContext.vocabWords : [])
        .map(w => (typeof w === 'string' ? w.trim().toLowerCase() : ''))
        .filter(w => w.length >= 2)
        .slice(0, 50);

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
                score -= 70; // Completed -> heavily demote
            } else if (prog >= 10) {
                score += 35; // Resume learning boost
                v.resumeProgress = Math.round(prog);
            } else {
                score += 15;
            }
        } else if (watchedSet.has(vid)) {
            score -= 70; // Watched to completion -> demote
        } else {
            score += 40; // Completely new / unwatched exploration bonus
        }

        if (favoritesSet.has(vid)) {
            score += 20;
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
            const titleLower = v.title.toLowerCase();
            const matched = [];
            for (const word of vocabWords) {
                if (titleLower.includes(word)) {
                    matched.push(word);
                    if (matched.length >= 5) break;
                }
            }
            if (matched.length > 0) {
                v.matchedWords = matched;
                score += 25 + Math.min(matched.length * 5, 20); // up to +45 pts
            }
        }

        // Factor D: Pedagogical Duration Sweet Spot (3 to 12 minutes favored)
        const d = v.duration || 0;
        if (d >= 180 && d <= 720) {
            score += 20; // 3 to 12 mins (optimal micro-learning retention)
        } else if (d > 720 && d <= 1200) {
            score += 10; // 12 to 20 mins
        } else if (d > 0 && (d < 90 || d > 2400)) {
            score -= 10; // <1.5 min or >40 min
        }

        // Factor E: Krashen i+1 Level Balancing
        if (!requestedTier || requestedTier === 'all') {
            if (dominantTier && v.tier) {
                if (v.tier === dominantTier) {
                    score += 20; // comfort zone
                } else {
                    const domIdx = TIERS_ORDER.indexOf(dominantTier);
                    const vidIdx = TIERS_ORDER.indexOf(v.tier);
                    if (domIdx !== -1 && vidIdx === domIdx + 1) {
                        score += 12; // stretch Krashen i+1 goal
                    }
                }
            }
        }

        // Factor F: Deterministic Serendipity Jitter (+/- 4 pts) when sessionSeed is provided
        if (sessionSeed !== null && sessionSeed !== undefined) {
            score += getDeterministicJitter(vid || '', sessionSeed);
        }

        return { video: v, score };
    });

    // 3. Sort primarily by score descending, breaking ties by updatedAt DESC
    scored.sort((a, b) => {
        if (Math.abs(b.score - a.score) > 0.001) {
            return b.score - a.score;
        }
        return (b.video.updatedAt || 0) - (a.video.updatedAt || 0);
    });
    const sortedVideos = scored.map(s => s.video);

    // 4. Channel Anti-Clustering Pass
    return declusterChannels(sortedVideos);
}
