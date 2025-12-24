/**
 * YouTube Transcript Proxy (Cloudflare Function)
 * 
 * Parallel racing for speed, clean architecture for debugging.
 *
 * Strategy:
 *   Tier 0: Cache (instant)
 *   Tier 1: Race all YouTube methods in parallel (first success wins)
 *   Tier 2: Race third-party APIs (fallback)
 *   Tier 3: Apify (paid last resort)
 *
 * @version 8.0.0
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
import { getTranscript, saveTranscript } from '../_shared/transcript-db.js';
import { getSubtitles } from 'youtube-caption-extractor';

// ============================================================================
// Configuration
// ============================================================================

const DEBUG = true;
const CACHE_TTL = 60 * 60 * 24 * 30; // 30 days
const DEFAULT_LANGS = ['ja', 'zh', 'ko', 'en'];

const TIMEOUT = {
    tier1: 8000,      // YouTube strategies race
    tier2: 5000,      // Third-party race
    caption: 3000,    // Individual caption fetch
};

// Innertube clients (Jan 2025)
const CLIENTS = [
    {
        name: 'WEB',
        clientName: 'WEB',
        clientVersion: '2.20250120.01.00',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        clientId: '1'
    },
    {
        name: 'MWEB',
        clientName: 'MWEB',
        clientVersion: '2.20250120.01.00',
        userAgent: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
        clientId: '2'
    },
    {
        name: 'TV',
        clientName: 'TVHTML5_SIMPLY_EMBEDDED_PLAYER',
        clientVersion: '2.0',
        userAgent: 'Mozilla/5.0 (PlayStation; PlayStation 5/5.10) AppleWebKit/605.1.15',
        clientId: '85'
    }
];

const PIPED_INSTANCES = [
    'https://pipedapi.kavin.rocks',
    'https://api.piped.otter.sh',
    'https://pipedapi.drgns.space',
];

// ============================================================================
// Helpers
// ============================================================================

const log = (...args) => DEBUG && console.log('[Innertube]', ...args);
const timer = () => { const s = Date.now(); return () => Date.now() - s; };

// Race promises, return first success or null if all fail
async function raceForSuccess(promises, timeoutMs, label) {
    const withTimeout = promises.map(p =>
        Promise.race([
            p.catch(e => { throw e; }), // Preserve rejections
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeoutMs))
        ])
    );

    try {
        // Promise.any resolves with first successful promise
        return await Promise.any(withTimeout);
    } catch (e) {
        // AggregateError means all failed
        const errors = e.errors || [e];
        log(`${label} all failed:`, errors.map(err => err.message).slice(0, 3));
        return null;
    }
}

// ============================================================================
// Request Handlers
// ============================================================================

export const onRequestOptions = () => handleOptions(['POST', 'OPTIONS']);

export async function onRequestPost(context) {
    const { request, env } = context;
    const elapsed = timer();

    try {
        const body = await request.json();
        const { videoId, forceRefresh = false, targetLanguages = DEFAULT_LANGS } = body;

        if (!validateVideoId(videoId)) {
            return jsonResponse({ error: 'Invalid videoId' }, 400);
        }

        const apiKey = env.INNERTUBE_API_KEY;
        if (!apiKey) {
            return errorResponse('INNERTUBE_API_KEY not configured', 500);
        }

        const cache = env.TRANSCRIPT_CACHE;
        const db = env.VOCAB_DB;
        const primaryLang = targetLanguages[0];

        log(`Request: ${videoId}`);

        // =====================================================================
        // Tier 0: Cache (instant)
        // =====================================================================
        if (!forceRefresh) {
            const cached = await checkCache(cache, db, videoId, primaryLang);
            if (cached) {
                log(`Cache hit (${elapsed()}ms)`);
                return jsonResponse({ ...cached, timing: elapsed() });
            }
        }

        // =====================================================================
        // Tier 1: Race ALL YouTube methods in parallel
        // =====================================================================
        const tier1Promises = [
            // youtube-caption-extractor
            tryCaptionExtractor(videoId, targetLanguages)
                .then(r => r ? { ...r, source: 'caption-extractor' } : Promise.reject(new Error('no result'))),

            // Innertube clients
            ...CLIENTS.map(client =>
                tryInnertube(videoId, apiKey, client, targetLanguages)
                    .then(r => r ? { ...r, source: `innertube:${client.name}` } : Promise.reject(new Error('no result')))
            ),

            // Watch page scrape
            tryScrape(videoId, targetLanguages)
                .then(r => r ? { ...r, source: 'scrape' } : Promise.reject(new Error('no result')))
        ];

        log(`Tier 1: Racing ${tier1Promises.length} YouTube strategies...`);
        const tier1Result = await raceForSuccess(tier1Promises, TIMEOUT.tier1, 'Tier1');

        if (tier1Result) {
            log(`${tier1Result.source} won (${elapsed()}ms)`);
            saveToCache(cache, db, videoId, primaryLang, tier1Result.data, tier1Result.source);
            return jsonResponse({ ...tier1Result.data, source: tier1Result.source, timing: elapsed() });
        }

        // =====================================================================
        // Tier 2: Race third-party APIs
        // =====================================================================
        const tier2Promises = PIPED_INSTANCES.map(instance =>
            tryPiped(videoId, targetLanguages, instance)
                .then(r => r ? { ...r, source: `piped:${new URL(instance).hostname}` } : Promise.reject(new Error('no result')))
        );

        log(`Tier 2: Racing ${tier2Promises.length} Piped instances...`);
        const tier2Result = await raceForSuccess(tier2Promises, TIMEOUT.tier2, 'Tier2');

        if (tier2Result) {
            log(`${tier2Result.source} won (${elapsed()}ms)`);
            saveToCache(cache, db, videoId, primaryLang, tier2Result.data, tier2Result.source);
            return jsonResponse({ ...tier2Result.data, source: tier2Result.source, timing: elapsed() });
        }

        // =====================================================================
        // Tier 3: Apify (paid, sequential - no racing needed)
        // =====================================================================
        if (env.APIFY_API_KEY) {
            log('Tier 3: Trying Apify...');
            try {
                const apifyResult = await tryApify(videoId, targetLanguages, env.APIFY_API_KEY);
                if (apifyResult) {
                    log(`Apify success (${elapsed()}ms)`);
                    saveToCache(cache, db, videoId, primaryLang, apifyResult.data, 'apify');
                    return jsonResponse({ ...apifyResult.data, source: 'apify', timing: elapsed() });
                }
            } catch (e) {
                log(`Apify failed: ${e.message}`);
            }
        }

        // =====================================================================
        // All failed
        // =====================================================================
        log(`All strategies failed (${elapsed()}ms)`);
        return jsonResponse({
            videoDetails: { videoId },
            captions: { playerCaptionsTracklistRenderer: { captionTracks: [] } },
            source: 'none',
            warning: 'No captions available',
            timing: elapsed()
        });

    } catch (error) {
        console.error('[Innertube] Fatal:', error);
        return errorResponse(error.message);
    }
}

// ============================================================================
// Cache
// ============================================================================

async function checkCache(cache, db, videoId, lang) {
    const cacheKey = `captions:v8:${videoId}`;

    if (cache) {
        try {
            const cached = await cache.get(cacheKey, 'json');
            if (cached?.captions?.playerCaptionsTracklistRenderer?.captionTracks?.some(t => t.content?.length)) {
                return { ...cached, source: 'cache:kv' };
            }
        } catch { /* ignore */ }
    }

    if (db) {
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
    }
    return null;
}

function saveToCache(cache, db, videoId, lang, data, source) {
    const cacheKey = `captions:v8:${videoId}`;

    cache?.put(cacheKey, JSON.stringify(data), { expirationTtl: CACHE_TTL }).catch(() => { });

    const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    const track = tracks?.find(t => t.languageCode === lang) || tracks?.[0];
    if (track?.content?.length && db) {
        saveTranscript(db, videoId, track.languageCode, track.content, source).catch(() => { });
    }
}

// ============================================================================
// Strategy: youtube-caption-extractor
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
                    return { data: buildResponse(videoId, lang, cleanTranscriptSegments(cues)) };
                }
            }
        } catch { /* try next lang */ }
    }
    return null;
}

// ============================================================================
// Strategy: Innertube
// ============================================================================

async function tryInnertube(videoId, apiKey, client, langs) {
    const res = await fetch(
        `https://www.youtube.com/youtubei/v1/player?key=${apiKey}&prettyPrint=false`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': client.userAgent,
                'Origin': 'https://www.youtube.com',
                'Referer': 'https://www.youtube.com/',
                'X-Youtube-Client-Name': client.clientId,
                'X-Youtube-Client-Version': client.clientVersion
            },
            body: JSON.stringify({
                context: {
                    client: {
                        clientName: client.clientName,
                        clientVersion: client.clientVersion,
                        hl: 'en', gl: 'US'
                    }
                },
                videoId,
                contentCheckOk: true,
                racyCheckOk: true
            })
        }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const status = data.playabilityStatus?.status;
    if (status === 'LOGIN_REQUIRED') throw new Error('Age-restricted');
    if (status === 'ERROR' || status === 'UNPLAYABLE') throw new Error('Unavailable');

    const tracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    if (!tracks?.length) throw new Error('No captions');

    const filtered = filterTracks(tracks, langs);
    if (!filtered.length) throw new Error('No matching lang');

    await fetchAllContent(filtered, client.userAgent);
    const valid = filtered.filter(t => t.content?.length);
    if (!valid.length) throw new Error('No content fetched');

    return {
        data: {
            videoDetails: data.videoDetails,
            captions: { playerCaptionsTracklistRenderer: { captionTracks: valid } }
        }
    };
}

// ============================================================================
// Strategy: Scrape
// ============================================================================

async function tryScrape(videoId, langs) {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
        headers: {
            'User-Agent': CLIENTS[0].userAgent,
            'Accept': 'text/html',
            'Accept-Language': 'en-US,en;q=0.9'
        }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();

    const data = extractPlayerResponse(html);
    if (!data) throw new Error('No player response');

    const tracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    if (!tracks?.length) throw new Error('No captions');

    const filtered = filterTracks(tracks, langs);
    if (!filtered.length) throw new Error('No matching lang');

    await fetchAllContent(filtered, CLIENTS[0].userAgent);
    const valid = filtered.filter(t => t.content?.length);
    if (!valid.length) throw new Error('No content');

    return {
        data: {
            videoDetails: data.videoDetails,
            captions: { playerCaptionsTracklistRenderer: { captionTracks: valid } }
        }
    };
}

function extractPlayerResponse(html) {
    const marker = 'ytInitialPlayerResponse = ';
    const start = html.indexOf(marker);
    if (start === -1) return null;

    const jsonStart = start + marker.length;
    let depth = 0, inStr = false, esc = false;

    for (let i = jsonStart; i < Math.min(html.length, jsonStart + 500000); i++) {
        const c = html[i];
        if (esc) { esc = false; continue; }
        if (c === '\\' && inStr) { esc = true; continue; }
        if (c === '"') { inStr = !inStr; continue; }
        if (!inStr) {
            if (c === '{') depth++;
            else if (c === '}' && --depth === 0) {
                try { return JSON.parse(html.substring(jsonStart, i + 1)); }
                catch { return null; }
            }
        }
    }
    return null;
}

// ============================================================================
// Strategy: Piped
// ============================================================================

async function tryPiped(videoId, langs, instance) {
    const res = await fetch(`${instance}/streams/${videoId}`, {
        headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    if (!data.subtitles?.length) throw new Error('No subtitles');

    const filtered = data.subtitles
        .filter(s => langs.some(l => s.code?.toLowerCase().startsWith(l)))
        .map(s => ({ baseUrl: s.url, languageCode: s.code, name: { simpleText: s.name || s.code } }));

    if (!filtered.length) throw new Error('No matching lang');

    await fetchAllContent(filtered, CLIENTS[0].userAgent);
    const valid = filtered.filter(t => t.content?.length);
    if (!valid.length) throw new Error('No content');

    return {
        data: {
            videoDetails: { videoId, title: data.title, author: data.uploader },
            captions: { playerCaptionsTracklistRenderer: { captionTracks: valid } }
        }
    };
}

// ============================================================================
// Strategy: Apify
// ============================================================================

async function tryApify(videoId, langs, apiKey) {
    const res = await fetch(
        `https://api.apify.com/v2/acts/karamelo~youtube-transcripts/run-sync-get-dataset-items?token=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                urls: [`https://www.youtube.com/watch?v=${videoId}`],
                outputFormat: 'with_timestamps',
                retries: 2
            })
        }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const results = await res.json();
    if (!results?.[0]?.captions?.length) throw new Error('No captions');

    const cues = results[0].captions
        .map((c, i) => ({
            id: i,
            start: c.start || 0,
            duration: (c.end || c.start + 2) - (c.start || 0),
            text: (c.text || '').replace(/<[^>]*>/g, '').trim()
        }))
        .filter(c => c.text);

    return { data: buildResponse(videoId, langs[0], cleanTranscriptSegments(cues)) };
}

// ============================================================================
// Caption Helpers
// ============================================================================

function filterTracks(tracks, langs) {
    return tracks.filter(t => langs.some(l => (t.languageCode || '').toLowerCase().startsWith(l)));
}

async function fetchAllContent(tracks, ua) {
    await Promise.all(tracks.map(async t => {
        try { t.content = await fetchContent(t.baseUrl, ua); }
        catch { t.content = null; }
    }));
}

async function fetchContent(baseUrl, ua) {
    for (const fmt of ['json3', 'srv3', 'vtt']) {
        try {
            const url = baseUrl.includes('fmt=')
                ? baseUrl.replace(/fmt=[^&]+/, `fmt=${fmt}`)
                : `${baseUrl}&fmt=${fmt}`;

            const res = await Promise.race([
                fetch(url, { headers: { 'User-Agent': ua, 'Referer': 'https://www.youtube.com/' } }),
                new Promise((_, r) => setTimeout(() => r(new Error('timeout')), TIMEOUT.caption))
            ]);

            if (!res.ok) continue;
            const text = await res.text();
            if (text.length < 10) continue;

            const segs = parseCaption(text, fmt);
            if (segs?.length) return cleanTranscriptSegments(segs);
        } catch { /* next */ }
    }
    return null;
}

function parseCaption(text, hint) {
    if (hint === 'json3' || text.trimStart().startsWith('{')) {
        const r = parseJson3(text); if (r?.length) return r;
    }
    if (hint === 'srv3' || text.includes('<text start=')) {
        const r = parseXml(text); if (r?.length) return r;
    }
    if (hint === 'vtt' || text.includes('WEBVTT')) {
        const r = parseVtt(text); if (r?.length) return r;
    }
    return parseJson3(text) || parseXml(text) || parseVtt(text) || [];
}

function parseJson3(text) {
    try {
        const { events = [] } = JSON.parse(text);
        return events.filter(e => e.segs).map(e => ({
            text: decode(e.segs.map(s => s.utf8 || '').join('').trim()),
            start: (e.tStartMs || 0) / 1000,
            duration: (e.dDurationMs || 0) / 1000
        })).filter(s => s.text);
    } catch { return null; }
}

function parseXml(text) {
    const segs = [];
    const re = /<text start="([^"]+)" dur="([^"]+)"[^>]*>([^<]*)<\/text>/g;
    let m;
    while ((m = re.exec(text))) {
        const t = decode(m[3].trim());
        if (t) segs.push({ text: t, start: parseFloat(m[1]), duration: parseFloat(m[2]) });
    }
    return segs.length ? segs : null;
}

function parseVtt(text) {
    const segs = [], lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})/);
        if (m) {
            const start = vttTime(m[1]), end = vttTime(m[2]);
            let txt = '';
            while (++i < lines.length && lines[i].trim() && !lines[i].includes('-->')) {
                txt += (txt ? ' ' : '') + lines[i].trim();
            }
            if (txt) segs.push({ text: decode(txt), start, duration: end - start });
        }
    }
    return segs.length ? segs : null;
}

function vttTime(ts) {
    const [h, m, r] = ts.split(':'), [s, ms] = r.split('.');
    return +h * 3600 + +m * 60 + +s + +ms / 1000;
}

function decode(t) {
    return t.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
        .replace(/\n/g, ' ').trim();
}

function buildResponse(videoId, lang, content) {
    return {
        videoDetails: { videoId },
        captions: { playerCaptionsTracklistRenderer: { captionTracks: [{ languageCode: lang, content }] } }
    };
}