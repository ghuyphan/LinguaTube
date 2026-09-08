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

const INSTANCE_TIMEOUT_MS = 2000;

// In-memory health tracking for instances (per worker instance)
const instanceHealth = new Map();
const HEALTH_RESET_TIME = 5 * 60 * 1000;    // Reset health after 5 minutes
const RATE_LIMIT_COOLDOWN = 60 * 1000;       // 60s cooldown after a 429

/**
 * Fast direct Google Translate GTX translator (~100-250ms)
 */
async function translateWithGtx(text, source, target) {
    if (!text?.trim()) return '';
    if (source === target) return text;

    try {
        const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${source}&tl=${target}&dt=t&q=${encodeURIComponent(text)}`;
        const gtxRes = await fetch(gtxUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            },
            signal: AbortSignal.timeout(3500)
        });
        if (gtxRes.ok) {
            const data = await gtxRes.json();
            if (Array.isArray(data?.[0])) {
                const translated = data[0].map(item => item?.[0] || '').join('');
                if (translated) return translated;
            }
        }
    } catch (e) {
        console.warn('[Translate] Google GTX primary failed:', e?.message || e);
    }
    return null;
}

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
 * Translate a single text using Google GTX with Lingva fallback
 */
export async function translateText(text, source, target) {
    if (!text?.trim()) return '';
    if (source === target) return text;

    // 1. Primary: Ultra-fast Google Translate GTX (~100-250ms)
    const gtxResult = await translateWithGtx(text, source, target);
    if (gtxResult) return gtxResult;

    // 2. Secondary fallback: Available Lingva instances
    const availableInstances = getSortedInstances();

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
 * Encode an array of texts with XML index tags to preserve segment boundaries
 */
export function encodeTaggedTexts(texts) {
    return texts.map((text, idx) => {
        const clean = (text || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return `<t id="${idx}">${clean}</t>`;
    }).join('\n');
}

/**
 * Decode tagged translation response with forgiving regex
 */
export function decodeTaggedTranslations(translatedText, expectedCount) {
    const map = new Map();
    if (!translatedText) return map;

    const regex = /<[\s]*t[\s]+id[\s]*=[\s]*["']?(\d+)["']?[\s]*>([\s\S]*?)<\/[\s]*t[\s]*>/gi;
    let match;
    while ((match = regex.exec(translatedText)) !== null) {
        const id = parseInt(match[1], 10);
        if (!isNaN(id) && id >= 0 && id < expectedCount) {
            let content = match[2].trim();
            content = content
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&amp;/g, '&');
            map.set(id, content);
        }
    }
    return map;
}

/**
 * Translate multiple texts in parallel with concurrency limiting,
 * tagged XML boundary protection, and targeted recovery.
 * 
 * @param {string[]} texts
 * @param {string} source
 * @param {string} target
 * @returns {Promise<string[]>}
 */
export async function translateBatch(texts, source, target) {
    if (!texts || texts.length === 0) return [];

    const MAX_CHUNK_LENGTH = 1500;

    // 1. Group texts into length-safe chunks to drastically minimize API calls
    const chunksData = [];
    let currTexts = [];
    let currIndices = [];
    let currLen = 0;

    for (let i = 0; i < texts.length; i++) {
        const text = texts[i];
        if (!text || !text.trim()) continue;

        const trimmedText = text.trim();
        const tagOverhead = 20; // approximate <t id="NN">...</t>\n
        if (currLen + trimmedText.length + tagOverhead > MAX_CHUNK_LENGTH && currTexts.length > 0) {
            chunksData.push({ texts: currTexts, indices: currIndices });
            currTexts = [];
            currIndices = [];
            currLen = 0;
        }

        currTexts.push(trimmedText);
        currIndices.push(i);
        currLen += trimmedText.length + tagOverhead;
    }

    if (currTexts.length > 0) {
        chunksData.push({ texts: currTexts, indices: currIndices });
    }

    const CONCURRENCY_LIMIT = 3;
    const STAGGER_DELAY_MS = 150;
    const results = new Array(texts.length).fill(null);

    // Pre-fill empty slots with original text
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
                // Encode chunk with tags
                const taggedInput = encodeTaggedTexts(chunk.texts);
                const translated = await translateText(taggedInput, source, target);

                if (translated) {
                    const tagMap = decodeTaggedTranslations(translated, chunk.texts.length);

                    // Check if all items in the chunk were successfully extracted
                    for (let j = 0; j < chunk.texts.length; j++) {
                        if (tagMap.has(j)) {
                            results[chunk.indices[j]] = tagMap.get(j);
                        }
                    }

                    // For any missing items (rare tag corruption), only recover the missing ones
                    const missingIndices = [];
                    for (let j = 0; j < chunk.texts.length; j++) {
                        if (!tagMap.has(j)) {
                            missingIndices.push(j);
                        }
                    }

                    if (missingIndices.length > 0) {
                        // Attempt fallback split by newlines if all tags were stripped
                        const lines = translated.split(/\n+/).map(l => l.trim()).filter(Boolean);
                        if (lines.length === chunk.texts.length) {
                            for (let j = 0; j < chunk.texts.length; j++) {
                                if (!results[chunk.indices[j]]) {
                                    results[chunk.indices[j]] = lines[j];
                                }
                            }
                        } else {
                            // Targeted fallback: only request the missing items
                            for (const missingIdx of missingIndices) {
                                try {
                                    const singleRes = await translateText(
                                        chunk.texts[missingIdx],
                                        source,
                                        target
                                    );
                                    results[chunk.indices[missingIdx]] = singleRes || (source === target ? chunk.texts[missingIdx] : null);
                                } catch {
                                    results[chunk.indices[missingIdx]] = source === target ? chunk.texts[missingIdx] : null;
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.warn(`[Lingva] Tagged batch chunk failed: ${error.message}`);
                // Fallback: recover individual items for this failed chunk
                for (let j = 0; j < chunk.texts.length; j++) {
                    try {
                        const singleRes = await translateText(chunk.texts[j], source, target);
                        results[chunk.indices[j]] = singleRes || (source === target ? chunk.texts[j] : null);
                    } catch {
                        results[chunk.indices[j]] = source === target ? chunk.texts[j] : null;
                    }
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
