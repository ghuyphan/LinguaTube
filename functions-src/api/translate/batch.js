import { SimpleLRUCache } from '../../utils/cache-manager.js';
import { TRANSLATION_RATE_LIMIT } from '../../middlewares/rate-limiter.js';
/**
 * Batch Translation API (Cloudflare Function)
 * Translates multiple texts at once for efficiency
 * Route: POST /api/translate/batch
 */

import { jsonResponse, handleOptions, errorResponse, validateBody, sha256, sanitizeLanguage, validateBatchSize } from '../../utils/utils.js';
import {
    consumeRateLimitUnits,
    getClientIdentifier,
    rateLimitResponse,
    getRateLimitHeaders,
    getTieredConfig
} from '../../middlewares/rate-limiter.js';
import { translateBatch } from '../../providers/lingva.js';
import { validateAuthToken, getUserTier } from '../../middlewares/auth.js';

const MAX_BATCH_SIZE = 80;

// In-memory LRU cache for hot phrases across warm Worker isolates (Rule 2: In-Memory First)
const memPhraseCache = new SimpleLRUCache(1000);

function getFromMemCache(source, target, text) {
    const key = `${source}:${target}:${text}`;
    return memPhraseCache.get(key) || null;
}

function setInMemCache(source, target, text, translation) {
    if (!text || !translation) return;
    const key = `${source}:${target}:${text}`;
    memPhraseCache.set(key, translation);
}

// In-memory batch cache across warm Worker isolates
const memBatchCache = new SimpleLRUCache(200);
const inFlightBatches = new Map();

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const deadline = Date.now() + 20000;
    try {
        const body = await request.json();

        // Schema-based validation for security
        const validation = validateBody(body, {
            texts: { type: 'array', required: true, maxLength: MAX_BATCH_SIZE },
            source: { type: 'string', required: true, maxLength: 5 },
            target: { type: 'string', required: true, maxLength: 5 }
        });
        if (!validation.valid) {
            return jsonResponse({ error: 'Invalid request', details: validation.errors }, 400);
        }

        const texts = body.texts;
        const source = sanitizeLanguage(body.source, ['ja', 'zh', 'ko', 'en', 'vi', 'auto']);
        const target = sanitizeLanguage(body.target, ['ja', 'zh', 'ko', 'en', 'vi']);

        if (!source || !target) {
            return jsonResponse({ error: 'Invalid source or target language' }, 400);
        }

        // Validate batch size
        const batchValidation = validateBatchSize(texts, MAX_BATCH_SIZE);
        if (!batchValidation.valid) {
            return jsonResponse({ error: batchValidation.error }, 400);
        }

        // Validate individual string items to prevent memory exhaustion & upstream 414s
        for (let i = 0; i < texts.length; i++) {
            const t = texts[i];
            if (typeof t !== 'string') {
                return jsonResponse({ error: `Text at index ${i} must be a string` }, 400);
            }
            if (t.length > 1500) {
                return jsonResponse({ error: `Text at index ${i} exceeds maximum length of 1500 characters` }, 400);
            }
        }

        if (source === target || texts.every(text => !text.trim())) return jsonResponse({ translations: texts });

        // 1. Check Batch-Level Cache (In-Memory first, then KV read fallback)
        // Cache hits incur ZERO rate limit quota deduction!
        let translations = new Array(texts.length).fill(null);
        let batchKey = null;

        if (texts.length > 0) {
            try {
                const batchSignature = JSON.stringify(texts);
                const batchHash = await sha256(batchSignature);
                batchKey = `trbatch:v2:${source}:${target}:${batchHash}`;

                // Check warm memory cache (0 KV ops, < 0.1ms)
                const memHit = memBatchCache.get(batchKey);
                if (memHit && Array.isArray(memHit) && memHit.length === texts.length) {
                    return jsonResponse({ translations: memHit }, 200, {
                        'X-Cache': 'HIT-MEM'
                    });
                }

                // Check KV read fallback for existing entries
                if (env.TRANSCRIPT_CACHE) {
                    const cachedBatch = await env.TRANSCRIPT_CACHE.get(batchKey, 'json');
                    if (cachedBatch && Array.isArray(cachedBatch.translations) && cachedBatch.translations.length === texts.length) {
                        memBatchCache.set(batchKey, cachedBatch.translations);
                        return jsonResponse({ translations: cachedBatch.translations }, 200, {
                            'X-Cache': 'HIT'
                        });
                    }
                }
            } catch (err) {
                console.warn('[Translate Batch] Batch cache read failed:', err?.message || err);
            }
        }

        const existing = batchKey && inFlightBatches.get(batchKey);
        if (existing) {
            const shared = await existing;
            if (shared.ok) return jsonResponse(await shared.clone().json(), 200, { 'X-Cache': 'HIT-INFLIGHT' });
        }
        const run = async () => {
            // Cache misses consume approximate quota for uncached phrases only
            // Extract unique non-empty texts to translate (deduplication)
            const uniqueTexts = Array.from(new Set(texts.map(t => t.trim()).filter(Boolean)));
            const translationMap = new Map();
            const uncachedTexts = [];
            for (const text of uniqueTexts) {
                const cached = getFromMemCache(source, target, text);
                if (cached) translationMap.set(text, cached);
                else uncachedTexts.push(text);
            }
            const consumeAmount = uncachedTexts.length;

            // Rate limit by number of unique texts
            const authResult = consumeAmount ? await validateAuthToken(request, env) : { valid: false };
            const tier = authResult.valid ? getUserTier(authResult.user) : 'anonymous';
            const rateLimitConfig = getTieredConfig(TRANSLATION_RATE_LIMIT, tier);
            const clientId = getClientIdentifier(request, authResult);

            const rateCheck = await consumeRateLimitUnits(env.TRANSCRIPT_CACHE, clientId, rateLimitConfig, consumeAmount, context);
            if (!rateCheck.allowed) {
                return rateLimitResponse(rateCheck.resetAt);
            }

            // 3. Translate only uncached items
            let isFreshTranslation = false;
            if (uncachedTexts.length > 0) {
                isFreshTranslation = true;
                const batchResults = await translateBatch(uncachedTexts, source, target, { deadline });

                uncachedTexts.forEach((text, i) => {
                    const result = batchResults[i];
                    if (result) {
                        translationMap.set(text, result);
                        setInMemCache(source, target, text, result);
                    }
                });
            }

            // Map results back to original text sequence
            translations = texts.map(text => {
                if (!text || !text.trim()) return text;
                return translationMap.get(text.trim()) || (source === target ? text : null);
            });

            // 4. Save batch to in-memory cache (Rule 2: Preserves 1,000 writes/day KV quota)
            // Note: Permanent full-transcript caching is handled by Cloudflare R2 via SubtitleService / dual-subtitles.js
            const allSucceeded = translations.every(t => typeof t === 'string' && t.length > 0);
            if (batchKey && allSucceeded) {
                memBatchCache.set(batchKey, translations);
            }

            return jsonResponse({ translations }, 200, {
                'X-Cache': isFreshTranslation ? 'MISS' : 'HIT-MEM',
                ...(consumeAmount ? getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt) : {})
            });
        };
        const pending = run();
        if (batchKey && inFlightBatches.size < 100) {
            inFlightBatches.set(batchKey, pending);
            try { return (await pending).clone(); }
            finally { if (inFlightBatches.get(batchKey) === pending) inFlightBatches.delete(batchKey); }
        }
        return await pending;

    } catch (error) {
        console.error('[Translate Batch] Error:', error);
        return errorResponse(error.message);
    }
}


