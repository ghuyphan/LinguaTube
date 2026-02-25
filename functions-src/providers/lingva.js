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
    const CONCURRENCY_LIMIT = 3; // Reduced from 5 to lower 429 pressure
    const STAGGER_DELAY_MS = 150; // Small delay between requests within a worker
    const results = new Array(texts.length);
    const queue = texts.map((text, index) => ({ text, index }));

    const worker = async (workerId) => {
        while (queue.length > 0) {
            const item = queue.shift();
            if (!item || item.index === undefined) break;

            try {
                results[item.index] = await translateText(item.text, source, target);
            } catch (error) {
                console.warn(`[Lingva] Batch item ${item.index} failed: ${error.message}`);
                results[item.index] = null;
            }

            // Small stagger delay to avoid burst requests
            if (queue.length > 0) {
                await new Promise(r => setTimeout(r, STAGGER_DELAY_MS));
            }
        }
    };

    const activeWorkers = Array.from(
        { length: Math.min(CONCURRENCY_LIMIT, texts.length) },
        (_, i) => worker(i)
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
