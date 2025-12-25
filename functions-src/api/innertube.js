/**
 * YouTube Transcript Proxy (Cloudflare Function) - Simplified Version
 * 
 * Simple sequential fallback for easy debugging:
 *   1. Cache (KV/D1)
 *   2. youtube-caption-extractor
 *   3. youtubei.js
 *   4. Piped (single instance fallback)
 *
 * @version 10.0.0 - Simplified
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
import { getTranscript, saveTranscript } from '../_shared/transcript-db.js';
import { getSubtitles } from 'youtube-caption-extractor';
import { Innertube as YoutubeiJS } from 'youtubei.js';

// ============================================================================
// Configuration
// ============================================================================

const DEBUG = true;
const CACHE_TTL = 60 * 60 * 24 * 30; // 30 days
const DEFAULT_LANGS = ['ja', 'zh', 'ko', 'en'];
const PIPED_INSTANCE = 'https://pipedapi.kavin.rocks';
const STRATEGY_TIMEOUT = 10000; // 10s per strategy

const log = (...args) => DEBUG && console.log('[Innertube]', ...args);
const timer = () => { const s = Date.now(); return () => Date.now() - s; };

// ============================================================================
// Request Handlers
// ============================================================================

export const onRequestOptions = () => handleOptions(['GET', 'POST', 'OPTIONS']);

/**
 * Health check endpoint - GET /api/innertube
 */
export async function onRequestGet(context) {
    return jsonResponse({
        status: 'ok',
        strategies: ['cache', 'caption-extractor', 'youtubei.js', 'piped'],
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
        // Step 2: Try youtube-caption-extractor (fastest)
        // =====================================================================
        log('Trying: caption-extractor...');
        try {
            const result = await withTimeout(
                tryCaptionExtractor(videoId, targetLanguages),
                STRATEGY_TIMEOUT
            );
            if (result) {
                log(`caption-extractor success (${elapsed()}ms)`);
                saveToCache(cache, db, videoId, primaryLang, result.data, 'caption-extractor');
                return jsonResponse({ ...result.data, source: 'caption-extractor', timing: elapsed() });
            }
        } catch (e) {
            log(`caption-extractor failed: ${e.message}`);
        }

        // =====================================================================
        // Step 3: Try youtubei.js
        // =====================================================================
        log('Trying: youtubei.js...');
        try {
            const result = await withTimeout(
                tryYoutubeiJS(videoId, targetLanguages),
                STRATEGY_TIMEOUT
            );
            if (result) {
                log(`youtubei.js success (${elapsed()}ms)`);
                saveToCache(cache, db, videoId, primaryLang, result.data, 'youtubei.js');
                return jsonResponse({ ...result.data, source: 'youtubei.js', timing: elapsed() });
            }
        } catch (e) {
            log(`youtubei.js failed: ${e.message}`);
        }

        // =====================================================================
        // Step 4: Try Piped (fallback)
        // =====================================================================
        log('Trying: piped...');
        try {
            const result = await withTimeout(
                tryPiped(videoId, targetLanguages),
                STRATEGY_TIMEOUT
            );
            if (result) {
                log(`piped success (${elapsed()}ms)`);
                saveToCache(cache, db, videoId, primaryLang, result.data, 'piped');
                return jsonResponse({ ...result.data, source: 'piped', timing: elapsed() });
            }
        } catch (e) {
            log(`piped failed: ${e.message}`);
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
// Cache
// ============================================================================

async function checkCache(cache, db, videoId, lang) {
    const cacheKey = `captions:v8:${videoId}`;

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

function saveToCache(cache, db, videoId, lang, data, source) {
    const cacheKey = `captions:v8:${videoId}`;

    // Save to KV (non-blocking)
    cache?.put(cacheKey, JSON.stringify(data), { expirationTtl: CACHE_TTL }).catch(() => { });

    // Save to D1 (non-blocking)
    const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
    const track = tracks?.find(t => t.languageCode === lang) || tracks?.[0];
    if (track?.content?.length && db) {
        saveTranscript(db, videoId, track.languageCode, track.content, source).catch(() => { });
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
// Strategy 2: youtubei.js
// ============================================================================

async function tryYoutubeiJS(videoId, langs) {
    // Create Innertube instance
    const yt = await YoutubeiJS.create({
        retrieve_player: false,
        lang: langs[0] || 'en',
        fetch: (input, init) => fetch(input, init) // Fix for "Illegal invocation" in CF Workers
    });

    // Get video info
    const info = await yt.getInfo(videoId);
    if (!info) {
        throw new Error('No video info');
    }

    // Get transcript
    const transcriptInfo = await info.getTranscript();

    // Log available languages
    const availableLangs = transcriptInfo?.languages || [];
    const currentLang = transcriptInfo?.selectedLanguage || '';
    log(`youtubei.js: Current="${currentLang}", Available=[${availableLangs.join(', ')}]`);

    // Check if current language matches any requested language
    const matchesRequested = langs.some(l =>
        currentLang.toLowerCase().includes(l.toLowerCase())
    );

    if (matchesRequested) {
        log(`youtubei.js: Current language matches requested`);
        return extractCues(transcriptInfo, videoId, currentLang);
    }

    // Try to find and switch to a matching language
    for (const lang of langs) {
        // Check if this language is available
        const available = availableLangs.find(l =>
            l.toLowerCase().includes(lang.toLowerCase())
        );

        if (available) {
            try {
                log(`youtubei.js: Switching to "${available}"...`);
                const switched = await transcriptInfo.selectLanguage(available);
                if (switched) {
                    return extractCues(switched, videoId, available);
                }
            } catch (e) {
                log(`youtubei.js: selectLanguage("${available}") failed: ${e.message}`);
            }
        }
    }

    // If no matching language but we have a transcript, use it anyway
    if (currentLang) {
        log(`youtubei.js: No matching lang found, using "${currentLang}" anyway`);
        return extractCues(transcriptInfo, videoId, currentLang);
    }

    throw new Error(`No transcript in requested languages: ${langs.join(', ')}`);
}

// Helper to extract cues from transcript info
function extractCues(transcriptInfo, videoId, lang) {
    const segments = transcriptInfo?.transcript?.content?.body?.initial_segments;

    if (!segments?.length) {
        throw new Error('No transcript segments');
    }

    const cues = segments
        .filter(seg => seg.type === 'TranscriptSegment')
        .map((seg, i) => {
            const startMs = parseInt(seg.start_ms, 10) || 0;
            const endMs = parseInt(seg.end_ms, 10) || startMs;
            const text = seg.snippet?.toString?.() || seg.snippet?.text || '';

            return {
                id: i,
                start: startMs / 1000,
                duration: (endMs - startMs) / 1000,
                text: text.trim()
            };
        })
        .filter(c => c.text);

    if (!cues.length) {
        throw new Error('No cues parsed');
    }

    log(`youtubei.js: Got ${cues.length} cues in ${lang}`);
    return { data: buildResponse(videoId, lang, cleanTranscriptSegments(cues)) };
}

// ============================================================================
// Strategy 3: Piped (single instance fallback)
// ============================================================================

async function tryPiped(videoId, langs) {
    const res = await fetch(`${PIPED_INSTANCE}/streams/${videoId}`, {
        headers: { 'Accept': 'application/json' }
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
    const subRes = await fetch(subtitle.url);
    if (!subRes.ok) {
        throw new Error(`Subtitle fetch failed: ${subRes.status}`);
    }

    const text = await subRes.text();
    const cues = parseSubtitle(text);

    if (!cues?.length) {
        throw new Error('Failed to parse subtitle');
    }

    log(`piped: Got ${cues.length} cues in ${subtitle.code}`);
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
}

// ============================================================================
// Subtitle Parsing Helpers
// ============================================================================

function parseSubtitle(text) {
    // Try JSON3 format
    if (text.trimStart().startsWith('{')) {
        const result = parseJson3(text);
        if (result?.length) return result;
    }

    // Try XML format
    if (text.includes('<text start=')) {
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
        return events.filter(e => e.segs).map(e => ({
            text: decode(e.segs.map(s => s.utf8 || '').join('').trim()),
            start: (e.tStartMs || 0) / 1000,
            duration: (e.dDurationMs || 0) / 1000
        })).filter(s => s.text);
    } catch {
        return null;
    }
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
    const segs = [];
    const lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})/);
        if (m) {
            const start = vttTime(m[1]);
            const end = vttTime(m[2]);
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
    const [h, m, r] = ts.split(':');
    const [s, ms] = r.split('.');
    return +h * 3600 + +m * 60 + +s + +ms / 1000;
}

function decode(t) {
    return t
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
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