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

// Rate limit by texts translated. Generous limits with Workers Paid CPU headroom.
// Average video = 200-500 lines.
// Anonymous: ~1-2 short videos
// Free: ~5-8 videos
// Pro / Premium: Heavy study usage
const RATE_LIMIT_CONFIG = {
    max: { anonymous: 3000, free: 8000, pro: 35000, premium: 100000 },
    windowSeconds: 3600,
    keyPrefix: 'translate-texts'
};

// In-memory LRU cache for hot phrases across warm Worker isolates (Rule 2: In-Memory First)
const memPhraseCache = new Map();
const MAX_MEM_CACHE_SIZE = 1000;

function getFromMemCache(source, target, text) {
    const key = `${source}:${target}:${text}`;
    return memPhraseCache.get(key) || null;
}

function setInMemCache(source, target, text, translation) {
    if (!text || !translation) return;
    const key = `${source}:${target}:${text}`;
    if (memPhraseCache.size >= MAX_MEM_CACHE_SIZE) {
        const firstKey = memPhraseCache.keys().next().value;
        if (firstKey) memPhraseCache.delete(firstKey);
    }
    memPhraseCache.set(key, translation);
}

// In-memory batch cache across warm Worker isolates
const memBatchCache = new Map();
const MAX_MEM_BATCHES = 200;

// Cache configuration (7 days)
const CACHE_TTL = 7 * 24 * 60 * 60;

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;
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
        const source = sanitizeLanguage(body.source, ['ja', 'zh', 'ko', 'en', 'vi']);
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

        // Extract unique non-empty texts to translate (deduplication)
        const uniqueTexts = Array.from(new Set(texts.map(t => t.trim()).filter(Boolean)));
        const consumeAmount = Math.max(1, uniqueTexts.length || 1);

        // Rate limit by number of unique texts
        const authResult = await validateAuthToken(request, env);
        const tier = authResult.valid ? getUserTier(authResult.user) : 'anonymous';
        const rateLimitConfig = getTieredConfig(RATE_LIMIT_CONFIG, tier);
        const clientId = getClientIdentifier(request, authResult);

        const rateCheck = await consumeRateLimitUnits(env.TRANSCRIPT_CACHE, clientId, rateLimitConfig, consumeAmount);
        if (!rateCheck.allowed) {
            return rateLimitResponse(rateCheck.resetAt);
        }

        // 1. Check Batch-Level Cache (In-Memory first, then KV read fallback)
        let translations = new Array(texts.length).fill(null);
        let batchKey = null;

        if (texts.length > 0) {
            try {
                const batchSignature = texts.join('\u001F');
                const batchHash = await sha256(batchSignature);
                batchKey = `trbatch:v1:${source}:${target}:${batchHash}`;

                // Check warm memory cache (0 KV ops, < 0.1ms)
                const memHit = memBatchCache.get(batchKey);
                if (memHit && Array.isArray(memHit) && memHit.length === texts.length) {
                    return jsonResponse({ translations: memHit }, 200, {
                        'X-Cache': 'HIT-MEM',
                        ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
                    });
                }

                // Check KV read fallback for existing entries
                if (env.TRANSCRIPT_CACHE) {
                    const cachedBatch = await env.TRANSCRIPT_CACHE.get(batchKey, 'json');
                    if (cachedBatch && Array.isArray(cachedBatch.translations) && cachedBatch.translations.length === texts.length) {
                        memBatchCache.set(batchKey, cachedBatch.translations);
                        return jsonResponse({ translations: cachedBatch.translations }, 200, {
                            'X-Cache': 'HIT',
                            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
                        });
                    }
                }
            } catch (err) {
                console.warn('[Translate Batch] Batch cache read failed:', err?.message || err);
            }
        }

        // 2. Resolve phrases from in-memory cache first
        const translationMap = new Map();
        const uncachedTexts = [];

        uniqueTexts.forEach((text) => {
            const memCached = getFromMemCache(source, target, text);
            if (memCached) {
                translationMap.set(text, memCached);
            } else {
                uncachedTexts.push(text);
            }
        });

        // 3. Translate only uncached items
        let isFreshTranslation = false;
        if (uncachedTexts.length > 0) {
            isFreshTranslation = true;
            const batchResults = await translateBatch(uncachedTexts, source, target);

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
            if (memBatchCache.size >= MAX_MEM_BATCHES) {
                const oldest = memBatchCache.keys().next().value;
                if (oldest) memBatchCache.delete(oldest);
            }
            memBatchCache.set(batchKey, translations);
        }

        return jsonResponse({ translations }, 200, {
            'X-Cache': isFreshTranslation ? 'MISS' : 'HIT-MEM',
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
        });

    } catch (error) {
        console.error('[Translate Batch] Error:', error);
        return errorResponse(error.message);
    }
}


