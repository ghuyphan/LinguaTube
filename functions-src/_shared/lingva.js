/**
 * Shared Lingva Translate Utilities
 * Manages Lingva instances and provides translation functions
 */

const LINGVA_INSTANCES = [
    'https://lingva.ml',
    'https://lingva.lunar.icu',
    'https://translate.plausibility.cloud'
];

const INSTANCE_TIMEOUT_MS = 5000;

// In-memory health tracking for instances (per worker instance)
// Tracks failure count - higher count = less preferred
const instanceHealth = new Map();
const HEALTH_RESET_TIME = 5 * 60 * 1000; // Reset health after 5 minutes

/**
 * Get instances sorted by health (healthy first)
 */
function getSortedInstances() {
    const now = Date.now();

    return [...LINGVA_INSTANCES].sort((a, b) => {
        const healthA = instanceHealth.get(a) || { failures: 0, lastFailure: 0 };
        const healthB = instanceHealth.get(b) || { failures: 0, lastFailure: 0 };

        // Reset health if enough time has passed
        const failuresA = (now - healthA.lastFailure > HEALTH_RESET_TIME) ? 0 : healthA.failures;
        const failuresB = (now - healthB.lastFailure > HEALTH_RESET_TIME) ? 0 : healthB.failures;

        return failuresA - failuresB;
    });
}

/**
 * Record instance failure
 */
function recordFailure(instance) {
    const current = instanceHealth.get(instance) || { failures: 0, lastFailure: 0 };
    instanceHealth.set(instance, {
        failures: current.failures + 1,
        lastFailure: Date.now()
    });
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
 * 
 * @param {string} text - Text to translate
 * @param {string} source - Source language code
 * @param {string} target - Target language code
 * @returns {Promise<string|null>} - Translated text or null if all instances fail
 */
export async function translateText(text, source, target) {
    if (!text?.trim()) return '';
    if (source === target) return text;

    // Try instances in health order
    for (const instance of getSortedInstances()) {
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
                // consume body to avoid deadlock/socket starvation
                try { await response.text(); } catch { }
                recordFailure(instance);
            }
        } catch {
            recordFailure(instance);
            // Try next instance
        }
    }

    return null; // All instances failed
}

/**
 * Translate multiple texts in parallel
 * @param {string[]} texts - Array of texts to translate
 * @param {string} source - Source language
 * @param {string} target - Target language
 * @returns {Promise<string[]>} - Array of translations
 */
export async function translateBatch(texts, source, target) {
    return Promise.all(
        texts.map(text => translateText(text, source, target))
    );
}
