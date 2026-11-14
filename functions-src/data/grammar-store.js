/**
 * Shared Grammar Pack Store (Cloudflare R2 -> Static ASSETS -> Local Node FS).
 * Zero KV writes. Warm-isolate memory cache + in-flight stampede deduplication.
 */

import { SUPPORTED_LEARNING_LANGUAGE_SET } from '../utils/utils.js';

export const GRAMMAR_UI_LANGUAGES = new Set(['en', 'vi', 'ja', 'ko', 'zh']);
const SAFE_SEGMENT_RE = /^[a-z0-9_-]{1,32}$/i;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_CACHE_ENTRIES = 32;

const memArtifacts = new Map();
const inFlightLoads = new Map();

function setMemCache(key, data) {
    if (memArtifacts.size >= MAX_CACHE_ENTRIES) {
        const oldest = memArtifacts.keys().next().value;
        if (oldest !== undefined) memArtifacts.delete(oldest);
    }
    memArtifacts.set(key, { data, timestamp: Date.now() });
}

export function clearGrammarStoreCache() {
    memArtifacts.clear();
    inFlightLoads.clear();
}

async function readLocalJsonInNode(relativePath) {
    try {
        const fs = globalThis.process?.getBuiltinModule?.('node:fs/promises');
        const path = globalThis.process?.getBuiltinModule?.('node:path');
        if (!fs || !path || typeof globalThis.process?.cwd !== 'function') return null;

        const segments = relativePath.split('/');
        const candidates = [
            path.join(globalThis.process.cwd(), 'public', 'data', 'grammar', ...segments),
            path.join(globalThis.process.cwd(), 'dist', 'lingua-tube', 'browser', 'data', 'grammar', ...segments)
        ];
        for (const candidate of candidates) {
            try {
                const raw = await fs.readFile(candidate, 'utf8');
                if (raw) return JSON.parse(raw);
            } catch { /* try next candidate */ }
        }
    } catch { /* not running under Node with fs */ }
    return null;
}

async function fetchGrammarArtifactFromSources(env, relativePath, requestUrl) {
    // 1. Prefer Cloudflare R2 so live grammar hotfixes can override static assets without redeploying
    const bucket = env?.TRANSCRIPT_STORAGE;
    if (bucket && typeof bucket.get === 'function') {
        try {
            const obj = await bucket.get(`grammar/${relativePath}`);
            if (obj) {
                return await obj.json();
            }
        } catch (err) {
            console.warn(`[GrammarStore] R2 read error for grammar/${relativePath}:`, err?.message || err);
        }
    }

    // 2. Cloudflare Pages static assets binding (/data/grammar/...)
    if (env?.ASSETS && typeof env.ASSETS.fetch === 'function') {
        try {
            const res = await env.ASSETS.fetch(new Request(`https://assets.local/data/grammar/${relativePath}`));
            if (res.ok) {
                return await res.json();
            }
        } catch { /* fallback below */ }
    }

    // 3. Same-origin static asset fetch fallback (if runtime provides URL without ASSETS binding)
    if (requestUrl && /^https?:\/\//i.test(requestUrl) && typeof globalThis.fetch === 'function') {
        try {
            const assetUrl = new URL(`/data/grammar/${relativePath}`, requestUrl);
            if (!assetUrl.pathname.endsWith('/api/grammar')) {
                const res = await globalThis.fetch(assetUrl.toString());
                if (res.ok) {
                    return await res.json();
                }
            }
        } catch { /* fallback below */ }
    }

    // 4. Local Node filesystem fallback (dev server & test runner)
    return readLocalJsonInNode(relativePath);
}

/**
 * Load a JSON artifact cleanly with warm-isolate memory cache + in-flight deduplication.
 * @returns {Promise<{ data: unknown, cacheHit: boolean } | null>}
 */
async function loadArtifact(env, relativePath, requestUrl) {
    const cached = memArtifacts.get(relativePath);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
        return { data: cached.data, cacheHit: true };
    }

    if (inFlightLoads.has(relativePath)) {
        const data = await inFlightLoads.get(relativePath);
        return data ? { data, cacheHit: false } : null;
    }

    const promise = (async () => {
        const data = await fetchGrammarArtifactFromSources(env, relativePath, requestUrl);
        if (data !== null && data !== undefined) {
            setMemCache(relativePath, data);
        }
        return data;
    })();

    inFlightLoads.set(relativePath, promise);
    try {
        const data = await promise;
        return data ? { data, cacheHit: false } : null;
    } finally {
        inFlightLoads.delete(relativePath);
    }
}

export async function loadGrammarManifest(env, requestUrl) {
    return loadArtifact(env, 'manifest.json', requestUrl);
}

export async function loadGrammarPatterns(env, lang, requestUrl) {
    if (!SUPPORTED_LEARNING_LANGUAGE_SET.has(lang) || !SAFE_SEGMENT_RE.test(lang)) {
        return null;
    }
    return loadArtifact(env, `patterns/${lang}.json`, requestUrl);
}

export async function loadGrammarTranslations(env, lang, ui, requestUrl) {
    if (!SUPPORTED_LEARNING_LANGUAGE_SET.has(lang) || !GRAMMAR_UI_LANGUAGES.has(ui)) {
        return null;
    }
    if (ui === 'en') {
        return { data: {}, cacheHit: true };
    }
    if (!SAFE_SEGMENT_RE.test(lang) || !SAFE_SEGMENT_RE.test(ui)) {
        return null;
    }
    return loadArtifact(env, `translations/${lang}/${ui}.json`, requestUrl);
}

export function mergePatternWithTranslation(pattern, translation) {
    if (!pattern || !translation) return pattern;
    return {
        ...pattern,
        title: translation.title || pattern.title,
        shortExplanation: translation.shortExplanation || pattern.shortExplanation,
        longExplanation: translation.longExplanation || pattern.longExplanation,
        formation: translation.formation || pattern.formation,
        examples: Array.isArray(pattern.examples)
            ? pattern.examples.map((ex, i) => ({
                sentence: ex.sentence,
                translation: translation.examples?.[i]?.translation || ex.translation
            }))
            : []
    };
}
