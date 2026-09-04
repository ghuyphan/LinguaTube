/**
 * Shared Lingva Translate Utilities
 * Manages Lingva instances and provides translation functions
 * 
 * Improvements over original:
 * - Exponential backoff on 429 responses
 * - Per-instance cooldown tracking (avoids hammering rate-limited instances)
 * - Staggered delays between requests to reduce burst pressure
 */

const LINGVA_INSTANCES = [
    'https://lingva.ml',
    'https://lingva.lunar.icu',
    'https://translate.plausibility.cloud'
];

const INSTANCE_TIMEOUT_MS = 5000;

// In-memory health tracking for instances (per worker instance)
const instanceHealth = new Map();
const HEALTH_RESET_TIME = 5 * 60 * 1000;    // Reset health after 5 minutes
const RATE_LIMIT_COOLDOWN = 60 * 1000;       // 60s cooldown after a 429

/**
 * Get instances sorted by health (healthy first), excluding rate-limited ones
 */
function getSortedInstances() {
    const now = Date.now();

    return [...LINGVA_INSTANCES]
        .filter(instance => {
            const health = instanceHealth.get(instance);
            // Skip instances in rate-limit cooldown
            if (health?.rateLimitedUntil && now < health.rateLimitedUntil) {
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            const healthA = instanceHealth.get(a) || { failures: 0, lastFailure: 0 };
            const healthB = instanceHealth.get(b) || { failures: 0, lastFailure: 0 };

            const failuresA = (now - healthA.lastFailure > HEALTH_RESET_TIME) ? 0 : healthA.failures;
            const failuresB = (now - healthB.lastFailure > HEALTH_RESET_TIME) ? 0 : healthB.failures;

            return failuresA - failuresB;
        });
}

/**
 * Record instance failure
 */
function recordFailure(instance, statusCode) {
    const current = instanceHealth.get(instance) || { failures: 0, lastFailure: 0 };
    const update = {
        failures: current.failures + 1,
        lastFailure: Date.now()
    };

    // If 429, apply a cooldown so we stop hitting this instance for a while
    if (statusCode === 429) {
        // Exponential cooldown: 60s, 120s, 240s... capped at 5 min
        const backoffMultiplier = Math.min(Math.pow(2, current.failures), 5);
        update.rateLimitedUntil = Date.now() + (RATE_LIMIT_COOLDOWN * backoffMultiplier);
    }

    instanceHealth.set(instance, update);
}

/**
 * Record instance success (reset health)
 */
function recordSuccess(instance) {
    instanceHealth.delete(instance);
}

/**
 * Translate a single text using Lingva
 * Tries multiple instances if necessary
 */
export async function translateText(text, source, target) {
    if (!text?.trim()) return '';
    if (source === target) return text;

    const availableInstances = getSortedInstances();

    // If ALL instances are rate-limited, wait for the soonest one to become available
    if (availableInstances.length === 0) {
        const now = Date.now();
        let soonest = Infinity;
        let soonestInstance = LINGVA_INSTANCES[0];

        for (const inst of LINGVA_INSTANCES) {
            const health = instanceHealth.get(inst);
            if (health?.rateLimitedUntil && health.rateLimitedUntil < soonest) {
                soonest = health.rateLimitedUntil;
                soonestInstance = inst;
            }
        }

        const waitMs = Math.max(0, soonest - now);
        if (waitMs > 0 && waitMs < 10000) {
            // Wait a bit and retry with the soonest instance
            await new Promise(r => setTimeout(r, waitMs));
            availableInstances.push(soonestInstance);
        } else {
            return null; // All instances are down for too long
        }
    }

    for (const instance of availableInstances) {
        const url = `${instance}/api/v1/${source}/${target}/${encodeURIComponent(text)}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
                },
                signal: AbortSignal.timeout(INSTANCE_TIMEOUT_MS)
            });

            if (response.ok) {
                const data = await response.json();
                recordSuccess(instance);
                return data.translation || '';
            } else {
                try { await response.text(); } catch { }
                recordFailure(instance, response.status);
            }
        } catch {
            recordFailure(instance, 0);
        }
    }

    // High-reliability fallback: Google Translate web GTX endpoint
    try {
        const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
        const gtxRes = await fetch(gtxUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            },
            signal: AbortSignal.timeout(INSTANCE_TIMEOUT_MS)
        });
        if (gtxRes.ok) {
            const data = await gtxRes.json();
            if (Array.isArray(data?.[0])) {
                const translated = data[0].map(item => item?.[0] || '').join('');
                if (translated) return translated;
            }
        }
    } catch (e) {
        console.warn('[Translate] Google GTX fallback failed:', e?.message || e);
    }

    return null;
}

/**
 * Translate multiple texts in parallel with concurrency limiting
 * and staggered delays to reduce 429 pressure
 * 
 * @param {string[]} texts
 * @param {string} source
 * @param {string} target
 * @returns {Promise<string[]>}
 */
export async function translateBatch(texts, source, target) {
    if (!texts || texts.length === 0) return [];

    const MAX_CHUNK_LENGTH = 1000;
    const DELIMITER = '\n\n';

    // 1. Group texts into length-safe chunks to drastically minimize API calls
    const chunksData = [];
    let currTexts = [];
    let currIndices = [];
    let currLen = 0;

    for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        if (!text || !text.trim()) continue;

        const trimmedText = text.trim();
        if (currLen + trimmedText.length > MAX_CHUNK_LENGTH && currTexts.length > 0) {
            chunksData.push({ texts: currTexts, indices: currIndices });
            currTexts = [];
            currIndices = [];
            currLen = 0;
        }

        currTexts.push(trimmedText);
        currIndices.push(i);
        currLen += trimmedText.length + DELIMITER.length;
    }

    if (currTexts.length > 0) {
        chunksData.push({ texts: currTexts, indices: currIndices });
    }

    const CONCURRENCY_LIMIT = 3;
    const STAGGER_DELAY_MS = 200;
    const results = new Array(texts.length).fill(null);

    // Pre-fill empty slots
    texts.forEach((text, i) => {
        if (!text || !text.trim()) {
            results[i] = text;
        }
    });

    const worker = async () => {
        while (chunksData.length > 0) {
            const chunk = chunksData.shift();
            if (!chunk) break;

            try {
                const joinedText = chunk.texts.join(DELIMITER);
                const translated = await translateText(joinedText, source, target);

                if (translated) {
                    // Split back by 2+ newlines (allowing some whitespace in between)
                    const splitTranslations = translated.split(/\n[\s]*\n/);

                    if (splitTranslations.length === chunk.texts.length) {
                        for (let j = 0; j < chunk.texts.length; j++) {
                            results[chunk.indices[j]] = splitTranslations[j].trim();
                        }
                    } else {
                        console.warn(`[Lingva] Chunk split mismatch: expected ${chunk.texts.length}, got ${splitTranslations.length}. Falling back to individual requests.`);
                        // Fallback to individual
                        for (let j = 0; j < chunk.texts.length; j++) {
                            try {
                                results[chunk.indices[j]] = await translateText(chunk.texts[j], source, target);
                            } catch (e) { }
                        }
                    }
                }
            } catch (error) {
                console.warn(`[Lingva] Batch chunk failed: ${error.message}`);
                // Fallback
                for (let j = 0; j < chunk.texts.length; j++) {
                    try {
                        results[chunk.indices[j]] = await translateText(chunk.texts[j], source, target);
                    } catch (e) { }
                }
            }

            if (chunksData.length > 0) {
                await new Promise(r => setTimeout(r, STAGGER_DELAY_MS));
            }
        }
    };

    const activeWorkers = Array.from(
        { length: Math.min(CONCURRENCY_LIMIT, chunksData.length) },
        () => worker()
    );

    await Promise.all(activeWorkers);
    return results;
}

// ============================================================================
// TranslationProvider Class (used by DictionaryService)
// ============================================================================

const TRANSLATION_TIMEOUT_MS = 4000;

export class TranslationProvider {
    /**
     * Translate dictionary entries to target language
     * Uses the shared translateText function with instance health tracking
     */
    async translateEntries(entries, targetLang) {
        if (!entries?.length) return [];

        const limitedEntries = entries.slice(0, 2);
        const translationTasks = [];

        limitedEntries.forEach((entry, entryIdx) => {
            entry.definitions.slice(0, 2).forEach((def, defIdx) => {
                translationTasks.push({ entryIdx, defIdx, text: def });
            });
        });

        if (translationTasks.length === 0) return [];

        // Use the shared translateText which has instance health tracking
        const translationPromises = translationTasks.map(task =>
            translateText(task.text, 'en', targetLang).catch(() => null)
        );

        const translations = await Promise.race([
            Promise.all(translationPromises),
            new Promise(resolve => setTimeout(() => resolve(translationTasks.map(() => null)), TRANSLATION_TIMEOUT_MS))
        ]);

        const result = limitedEntries.map(entry => ({
            ...entry,
            definitions: []
        }));

        translationTasks.forEach((task, i) => {
            const translated = translations[i];
            if (translated) {
                result[task.entryIdx].definitions.push(translated);
            }
        });

        return result.filter(e => e.definitions.length > 0);
    }
}
