/**
 * YouTube Transcript Proxy (Cloudflare Function) - Simplified Version
 * 
 * Simple sequential fallback for easy debugging:
 *   1. Cache (KV/D1)
 *   2. youtube-caption-extractor
 *   3. Piped (multiple instances with dynamic selection + fallback)
 *   4. Invidious (multiple instances with fallback)
 *
 * @version 12.0.0 - Multi-Piped with dynamic instances + Invidious fallback
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
import { getTranscript, saveTranscript } from '../_shared/transcript-db.js';
import { getSubtitles } from 'youtube-caption-extractor';
// Commented out to save resources - using Piped instances instead
// import { Innertube as YoutubeiJS } from 'youtubei.js';

// ============================================================================
// Configuration
// ============================================================================

const DEBUG = true;
const CACHE_TTL = 60 * 60 * 24 * 30; // 30 days
const DEFAULT_LANGS = ['ja', 'zh', 'ko', 'en'];

// Static fallback Piped instances (used if dynamic fetch fails)
const PIPED_INSTANCES_FALLBACK = [
    'https://pipedapi.kavin.rocks',           // Official - most maintained
    'https://api.piped.private.coffee',       // ~96-99% uptime
    'https://pipedapi.adminforge.de',         // Usually reliable
    'https://pipedapi.darkness.services',     // Backup
];

// Invidious instances for additional fallback
const INVIDIOUS_INSTANCES = [
    'https://invidious.snopyta.org',
    'https://yewtu.be',
    'https://inv.nadeko.net',
    'https://invidious.nerdvpn.de',
    'https://inv.tux.pizza',
];

const STRATEGY_TIMEOUT = 8000; // 8s per strategy
const STAGGER_DELAY = 500;     // 500ms between strategy starts (reduced for faster fallback)
const INSTANCE_TIMEOUT = 5000; // 5s timeout per instance

const log = (...args) => DEBUG && console.log('[Innertube]', ...args);
const timer = () => { const s = Date.now(); return () => Date.now() - s; };

// Cache for dynamic Piped instances (in-memory, refreshed periodically)
let cachedPipedInstances = null;
let pipedInstancesCacheTime = 0;
const PIPED_INSTANCES_CACHE_TTL = 60 * 60 * 1000; // 1 hour

// ============================================================================
// Request Handlers
// ============================================================================

export const onRequestOptions = () => handleOptions(['GET', 'POST', 'OPTIONS']);

/**
 * Health check endpoint - GET /api/innertube
 */
export async function onRequestGet(context) {
    const pipedInstances = await getHealthyPipedInstances();
    return jsonResponse({
        status: 'ok',
        strategies: ['cache', 'caption-extractor', 'piped-multi', 'invidious'],
        pipedInstances,
        invidiousInstances: INVIDIOUS_INSTANCES,
        timestamp: new Date().toISOString()
    });
}

/**
 * Main transcript endpoint - POST /api/innertube
 */
export async function onRequestPost(context) {
    const { request, env } = context;
    const elapsed = timer();

    try {
        const body = await request.json();
        const { videoId, forceRefresh = false, targetLanguages = DEFAULT_LANGS } = body;

        if (!validateVideoId(videoId)) {
            return jsonResponse({ error: 'Invalid videoId' }, 400);
        }

        const cache = env.TRANSCRIPT_CACHE;
        const db = env.VOCAB_DB;
        const primaryLang = targetLanguages[0];

        log(`Request: ${videoId}, langs: ${targetLanguages.join(',')}`);

        // =====================================================================
        // Step 1: Check Cache
        // =====================================================================
        if (!forceRefresh) {
            const cached = await checkCache(cache, db, videoId, primaryLang);
            if (cached) {
                log(`Cache hit (${elapsed()}ms)`);
                return jsonResponse({ ...cached, timing: elapsed() });
            }
        }

        // =====================================================================
        // Step 2: Race strategies with staggered starts
        // =====================================================================
        log('Starting parallel strategy race...');

        try {
            const result = await raceStrategies(videoId, targetLanguages);
            if (result) {
                log(`Strategy "${result.source}" won race (${elapsed()}ms)`);
                await saveToCache(cache, db, videoId, primaryLang, result.data, result.source);
                return jsonResponse({ ...result.data, source: result.source, timing: elapsed() });
            }
        } catch (e) {
            log(`All strategies failed: ${e.message}`);
        }

        // =====================================================================
        // All strategies failed
        // =====================================================================
        log(`All strategies failed (${elapsed()}ms)`);
        return jsonResponse({
            videoDetails: { videoId },
            captions: { playerCaptionsTracklistRenderer: { captionTracks: [] } },
            source: 'none',
            warning: 'No captions available - all strategies failed',
            timing: elapsed()
        });

    } catch (error) {
        console.error('[Innertube] Fatal:', error);
        return errorResponse(error.message);
    }
}

// ============================================================================
// Timeout Helper
// ============================================================================

function withTimeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
    ]);
}

// ============================================================================
// Dynamic Piped Instance Selection
// ============================================================================

/**
 * Fetch healthy Piped instances from the official API
 * ALWAYS merges with static fallback to ensure we have enough instances
 */
async function getHealthyPipedInstances() {
    const now = Date.now();

    // Return cached instances if still valid
    if (cachedPipedInstances && (now - pipedInstancesCacheTime) < PIPED_INSTANCES_CACHE_TTL) {
        return cachedPipedInstances;
    }

    // Start with the official instance (not included in the dynamic list)
    const allInstances = new Set(['https://pipedapi.kavin.rocks']);

    // Add static fallbacks first
    PIPED_INSTANCES_FALLBACK.forEach(i => allInstances.add(i));

    try {
        const res = await fetch('https://piped-instances.kavin.rocks/', {
            headers: { 'Accept': 'application/json' },
            signal: AbortSignal.timeout(3000)
        });

        if (res.ok) {
            const instances = await res.json();

            // Add healthy dynamic instances (>80% uptime)
            instances
                .filter(i => i.uptime_30d > 80 && i.up_to_date !== false && i.api_url)
                .sort((a, b) => (b.uptime_30d || 0) - (a.uptime_30d || 0))
                .slice(0, 5)
                .forEach(i => allInstances.add(i.api_url));
        }
    } catch (e) {
        log(`Failed to fetch dynamic Piped instances: ${e.message}`);
    }

    const result = Array.from(allInstances).slice(0, 8);
    cachedPipedInstances = result;
    pipedInstancesCacheTime = now;
    log(`Piped instances: ${result.length} total`);
    return result;
}

// ============================================================================
// Parallel Strategy Racing
// ============================================================================

/**
 * Race strategies with staggered starts
 * Starts the fastest strategy first, then adds others after STAGGER_DELAY
 * First successful result wins, others are abandoned
 */
async function raceStrategies(videoId, targetLanguages) {
    // Piped first for better language accuracy, caption-extractor can fall back to wrong language
    const strategies = [
        { name: 'piped', fn: () => tryPiped(videoId, targetLanguages), delay: 0 },
        { name: 'caption-extractor', fn: () => tryCaptionExtractor(videoId, targetLanguages), delay: STAGGER_DELAY },
        // Uncomment to enable youtubei.js:
        // { name: 'youtubei.js', fn: () => tryYoutubeiJS(videoId, targetLanguages), delay: STAGGER_DELAY * 2 },
        { name: 'invidious', fn: () => tryInvidious(videoId, targetLanguages), delay: STAGGER_DELAY * 2 }
    ];

    return new Promise((resolve, reject) => {
        let resolved = false;
        let completed = 0;
        const errors = [];

        strategies.forEach(({ name, fn, delay }) => {
            setTimeout(async () => {
                if (resolved) return; // Race already won

                try {
                    log(`Starting: ${name}...`);
                    const result = await withTimeout(fn(), STRATEGY_TIMEOUT);

                    if (result && !resolved) {
                        resolved = true;
                        log(`${name} succeeded`);
                        resolve({ ...result, source: name });
                    } else {
                        throw new Error('No result');
                    }
                } catch (e) {
                    log(`${name} failed: ${e.message}`);
                    errors.push({ name, error: e.message });
                } finally {
                    completed++;
                    // All strategies done and none succeeded
                    if (completed === strategies.length && !resolved) {
                        reject(new Error(`All strategies failed: ${errors.map(e => `${e.name}:${e.error}`).join(', ')}`));
                    }
                }
            }, delay);
        });
    });
}

// ============================================================================
// Cache
// ============================================================================

async function checkCache(cache, db, videoId, lang) {
    // KV cache key now includes language for proper separation
    const cacheKey = `captions:v9:${videoId}:${lang}`;

    // Check KV cache
    if (cache) {
        try {
            const cached = await cache.get(cacheKey, 'json');
            if (cached?.captions?.playerCaptionsTracklistRenderer?.captionTracks?.some(t => t.content?.length)) {
                return { ...cached, source: 'cache:kv' };
            }
        } catch { /* ignore */ }
    }

    // Check D1 database
    if (db) {
        try {
            const d1 = await getTranscript(db, videoId, lang);
            if (d1?.segments?.length) {
                return {
                    captions: {
                        playerCaptionsTracklistRenderer: {
                            captionTracks: [{ languageCode: d1.language, content: d1.segments }]
                        }
                    },
                    source: `cache:d1:${d1.source}`
                };
            }
        } catch { /* ignore */ }
    }

    return null;
}

async function saveToCache(cache, db, videoId, lang, data, source) {
    // KV cache key now includes language for proper separation
    const cacheKey = `captions:v9:${videoId}:${lang}`;

    // Save to KV (non-blocking)
    cache?.put(cacheKey, JSON.stringify(data), { expirationTtl: CACHE_TTL }).catch(() => { });

    // Save to D1 - MUST await to ensure completion before Worker terminates
    const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    const track = tracks?.find(t => t.languageCode === lang) || tracks?.[0];

    log(`saveToCache: db=${!!db}, tracks=${tracks?.length}, track=${!!track}, content=${track?.content?.length}`);

    if (track?.content?.length && db) {
        try {
            await saveTranscript(db, videoId, track.languageCode, track.content, source);
            log(`D1 save success: ${videoId} ${track.languageCode}`);
        } catch (err) {
            console.error(`D1 save error: ${err.message}`);
        }
    } else {
        log(`D1 save skipped: db=${!!db}, content=${track?.content?.length || 0}`);
    }
}

// ============================================================================
// Strategy 1: youtube-caption-extractor
// ============================================================================

async function tryCaptionExtractor(videoId, langs) {
    for (const lang of langs) {
        try {
            const subs = await getSubtitles({ videoID: videoId, lang });
            if (subs?.length) {
                const cues = subs.map((s, i) => ({
                    id: i,
                    start: parseFloat(s.start),
                    duration: parseFloat(s.dur),
                    text: s.text.trim()
                })).filter(c => c.text);

                if (cues.length) {
                    log(`caption-extractor: Got ${cues.length} cues in ${lang}`);
                    return { data: buildResponse(videoId, lang, cleanTranscriptSegments(cues)) };
                }
            }
        } catch (e) {
            log(`caption-extractor [${lang}]: ${e.message}`);
        }
    }
    return null;
}

// ============================================================================
// Strategy 2: youtubei.js (Commented out - uncomment to enable)
// ============================================================================

/*
async function tryYoutubeiJS(videoId, langs) {
    try {
        // Try Desktop client first (default)
        return await tryYoutubeiClient(videoId, langs, {
            retrieve_player: false,
            lang: langs[0] || 'en',
            device_category: 'desktop',
            fetch: (input, init) => fetch(input, init)
        });
    } catch (e) {
        log(`youtubei.js (desktop) failed: ${e.message}, retrying with Android...`);

        // Fallback to Android client
        return await tryYoutubeiClient(videoId, langs, {
            retrieve_player: false,
            lang: langs[0] || 'en',
            client_type: 'ANDROID',
            fetch: (input, init) => fetch(input, init)
        });
    }
}

async function tryYoutubeiClient(videoId, langs, config) {
    // Create Innertube instance
    const yt = await YoutubeiJS.create(config);

    // Get video info
    const info = await yt.getInfo(videoId);
    if (!info) {
        throw new Error('No video info');
    }

    const captionTracks = info.captions?.caption_tracks;
    if (!captionTracks?.length) {
        throw new Error('No caption tracks found');
    }

    log(`youtubei.js: Found ${captionTracks.length} tracks`);

    // Find matching language
    // 1. Exact match or starts with (e.g. 'en-US' matches 'en')
    let track = captionTracks.find(t =>
        langs.some(l => t.language_code.toLowerCase() === l.toLowerCase() || t.language_code.toLowerCase().startsWith(l.toLowerCase() + '-'))
    );

    // 2. If no match, try to find any track that *contains* the language code (looser check)
    if (!track) {
        track = captionTracks.find(t =>
            langs.some(l => t.language_code.toLowerCase().includes(l.toLowerCase()))
        );
    }

    if (!track) {
        const available = captionTracks.map(t => t.language_code).join(', ');
        throw new Error(`No matching track for [${langs.join(', ')}]. Available: [${available}]`);
    }

    log(`youtubei.js: Selected track "${track.language_code}" (${track.name?.text})`);

    // Fetch VTT
    const vttUrl = `${track.base_url}&fmt=vtt`;
    const response = await fetch(vttUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch VTT: ${response.status}`);
    }

    const vttText = await response.text();
    const cues = parseVtt(vttText);

    if (!cues?.length) {
        throw new Error('Failed to parse VTT');
    }

    log(`youtubei.js: Parsed ${cues.length} cues`);
    return { data: buildResponse(videoId, track.language_code, cleanTranscriptSegments(cues)) };
}
*/

// ============================================================================
// Strategy 3: Piped (multiple instances with dynamic selection + fallback)
// ============================================================================

async function tryPiped(videoId, langs) {
    const instances = await getHealthyPipedInstances();
    const errors = [];

    for (const instance of instances) {
        try {
            log(`Trying Piped instance: ${instance}`);

            const res = await fetch(`${instance}/streams/${videoId}`, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                },
                signal: AbortSignal.timeout(INSTANCE_TIMEOUT)
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const data = await res.json();

            if (!data.subtitles?.length) {
                throw new Error('No subtitles');
            }

            // Find matching language
            const subtitle = data.subtitles.find(s =>
                langs.some(l => s.code?.toLowerCase().startsWith(l))
            ) || data.subtitles[0];

            if (!subtitle?.url) {
                throw new Error('No subtitle URL');
            }

            // Fetch subtitle content
            const subRes = await fetch(subtitle.url, {
                signal: AbortSignal.timeout(INSTANCE_TIMEOUT)
            });
            if (!subRes.ok) {
                throw new Error(`Subtitle fetch failed: ${subRes.status}`);
            }

            const text = await subRes.text();
            const cues = parseSubtitle(text);

            if (!cues?.length) {
                throw new Error('Failed to parse subtitle');
            }

            log(`piped (${instance}): Got ${cues.length} cues in ${subtitle.code}`);
            return {
                data: {
                    videoDetails: { videoId, title: data.title, author: data.uploader },
                    captions: {
                        playerCaptionsTracklistRenderer: {
                            captionTracks: [{
                                languageCode: subtitle.code,
                                content: cleanTranscriptSegments(cues)
                            }]
                        }
                    }
                }
            };
        } catch (e) {
            log(`Piped ${instance} failed: ${e.message}`);
            errors.push(`${instance}: ${e.message}`);
            continue; // Try next instance
        }
    }

    // All instances failed
    throw new Error(`All Piped instances failed: ${errors.join(', ')}`);
}

// ============================================================================
// Strategy 4: Invidious (multiple instances with fallback)
// ============================================================================

async function tryInvidious(videoId, langs) {
    const errors = [];

    for (const instance of INVIDIOUS_INSTANCES) {
        try {
            log(`Trying Invidious instance: ${instance}`);

            // First, get available captions
            const captionsRes = await fetch(`${instance}/api/v1/captions/${videoId}`, {
                headers: { 'Accept': 'application/json' },
                signal: AbortSignal.timeout(INSTANCE_TIMEOUT)
            });

            if (!captionsRes.ok) {
                throw new Error(`HTTP ${captionsRes.status}`);
            }

            const captionsData = await captionsRes.json();
            const captions = captionsData.captions || captionsData;

            if (!captions?.length) {
                throw new Error('No captions available');
            }

            // Find matching language
            const caption = captions.find(c =>
                langs.some(l =>
                    c.language_code?.toLowerCase().startsWith(l) ||
                    c.label?.toLowerCase().includes(l)
                )
            ) || captions[0];

            if (!caption) {
                throw new Error('No matching caption track');
            }

            // Fetch the caption content (VTT format)
            const langParam = caption.language_code || caption.label;
            const vttRes = await fetch(`${instance}/api/v1/captions/${videoId}?label=${encodeURIComponent(caption.label || langParam)}`, {
                headers: { 'Accept': 'text/vtt' },
                signal: AbortSignal.timeout(INSTANCE_TIMEOUT)
            });

            if (!vttRes.ok) {
                throw new Error(`Caption fetch failed: ${vttRes.status}`);
            }

            const vttText = await vttRes.text();
            const cues = parseVtt(vttText);

            if (!cues?.length) {
                throw new Error('Failed to parse VTT');
            }

            log(`invidious (${instance}): Got ${cues.length} cues in ${langParam}`);
            return {
                data: buildResponse(videoId, caption.language_code || langParam, cleanTranscriptSegments(cues))
            };
        } catch (e) {
            log(`Invidious ${instance} failed: ${e.message}`);
            errors.push(`${instance}: ${e.message}`);
            continue; // Try next instance
        }
    }

    // All instances failed
    throw new Error(`All Invidious instances failed: ${errors.join(', ')}`);
}

// ============================================================================
// Subtitle Parsing Helpers
// ============================================================================

function parseSubtitle(text) {
    if (!text) return null;

    // Try JSON3 format
    if (text.trimStart().startsWith('{')) {
        const result = parseJson3(text);
        if (result?.length) return result;
    }

    // Try XML format
    if (text.includes('<text')) {
        const result = parseXml(text);
        if (result?.length) return result;
    }

    // Try VTT format
    if (text.includes('WEBVTT')) {
        const result = parseVtt(text);
        if (result?.length) return result;
    }

    return null;
}

function parseJson3(text) {
    try {
        const { events = [] } = JSON.parse(text);
        return events
            .filter(e => e.segs && (e.tStartMs !== undefined))
            .map(e => ({
                text: decode(e.segs.map(s => s.utf8 || '').join('').trim()),
                start: (e.tStartMs || 0) / 1000,
                duration: (e.dDurationMs || 0) / 1000
            }))
            .filter(s => s.text); // Filter empty lines
    } catch {
        return null;
    }
}

function parseXml(text) {
    const segs = [];
    // Flexible regex that handles attribute order variations
    const regex = /<text[^>]*start="([\d.]+)"[^>]*dur="([\d.]+)"[^>]*>([^<]*)<\/text>/g;

    let m;
    while ((m = regex.exec(text))) {
        const t = decode(m[3].trim());
        if (t) {
            segs.push({
                text: t,
                start: parseFloat(m[1]),
                duration: parseFloat(m[2])
            });
        }
    }
    return segs.length ? segs : null;
}

function parseVtt(text) {
    const segs = [];
    // Normalize line endings
    const lines = text.replace(/\r\n/g, '\n').split('\n');

    let i = 0;
    while (i < lines.length) {
        const line = lines[i].trim();

        // Skip header and empty lines
        if (line === 'WEBVTT' || !line) {
            i++;
            continue;
        }

        // Check for time range: 00:00:00.000 --> 00:00:00.000
        const timeMatch = line.match(/((?:\d{2}:)?\d{2}:\d{2}\.\d{3})\s*-->\s*((?:\d{2}:)?\d{2}:\d{2}\.\d{3})/);

        if (timeMatch) {
            const start = vttTime(timeMatch[1]);
            const end = vttTime(timeMatch[2]);

            // Collect text lines until next empty line or timestamp
            let txt = '';
            i++;
            while (i < lines.length) {
                const textLine = lines[i].trim();
                // If it looks like a timestamp or is empty, break
                if (!textLine || textLine.includes('-->')) break;

                txt += (txt ? ' ' : '') + textLine;
                i++;
            }

            // Clean VTT tags like <c> or <00:00:00.000>
            txt = txt.replace(/<[^>]*>/g, '');

            if (txt) {
                segs.push({
                    text: decode(txt),
                    start,
                    duration: end - start
                });
            }
        } else {
            // Skip ID lines or other non-timestamp lines
            i++;
        }
    }

    return segs.length ? segs : null;
}

function vttTime(ts) {
    const parts = ts.split(':');
    let h = 0, m = 0, s = 0;

    if (parts.length === 3) {
        [h, m, s] = parts;
    } else {
        [m, s] = parts;
    }

    const [seconds, millis = '0'] = s.split('.');

    return (+h * 3600) + (+m * 60) + (+seconds) + (+millis / 1000);
}

function decode(t) {
    if (!t) return '';
    return t
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&apos;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
        .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
        .replace(/\n/g, ' ')
        .trim();
}

function buildResponse(videoId, lang, content) {
    return {
        videoDetails: { videoId },
        captions: {
            playerCaptionsTracklistRenderer: {
                captionTracks: [{ languageCode: lang, content }]
            }
        }
    };
}