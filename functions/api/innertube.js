/**
 * YouTube Innertube Proxy (Cloudflare Function)
 * Robust caption fetching with multiple fallback strategies
 *
 * Strategy Order:
 * 1. Innertube API (TV/Web clients in PARALLEL) - first success wins
 * 2. Watch page scrape + immediate content fetch
 * 3. Third-party APIs (Piped/Invidious) - parallel race
 *
 * Environment:
 * - INNERTUBE_API_KEY: YouTube Innertube API key (optional, has default)
 * - TRANSCRIPT_CACHE: KV namespace binding for caching
 *
 * @version 3.0.0
 * @updated 2025-12
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';

// ============================================================================
// Configuration
// ============================================================================

const DEBUG = false;
const CACHE_TTL = 60 * 60 * 24; // 24 hours
const DEFAULT_API_KEY = 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w';

const TIMEOUTS = {
    innertube: 8000,
    watchPage: 8000,
    thirdParty: 8000,
    caption: 5000
};

/**
 * Client configurations - Updated December 2025
 * Based on yt-dlp source: https://github.com/yt-dlp/yt-dlp/blob/master/yt_dlp/extractor/youtube/_base.py
 * 
 * Note: iOS/Android clients now require PO tokens and are deprecated
 * Default priority: tv_simply, tv, web
 */
const CLIENT_CONFIGS = [
    // TV Simply - Best for captions, no PO token required
    {
        clientName: 'TVHTML5_SIMPLY',
        clientVersion: '1.0',
        userAgent: 'Mozilla/5.0 (ChromiumStylePlatform) Cobalt/25.lts.30.1034943-gold',
        clientId: '85'
    },
    // TV HTML5 - Cobalt-based client
    {
        clientName: 'TVHTML5',
        clientVersion: '7.20250312.16.00',
        userAgent: 'Mozilla/5.0 (ChromiumStylePlatform) Cobalt/25.lts.30.1034943-gold',
        clientId: '7'
    },
    // Web - Standard browser client
    {
        clientName: 'WEB',
        clientVersion: '2.20250312.04.00',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        clientId: '1'
    },
    // Mobile Web - iPad Safari
    {
        clientName: 'MWEB',
        clientVersion: '2.20250311.03.00',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_7_10 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1,gzip(gfe)',
        clientId: '2'
    }
];

const THIRD_PARTY_APIS = [
    { url: 'https://yewtu.be/api/v1/captions/', name: 'yewtu.be', type: 'invidious' },
    { url: 'https://api.piped.video/streams/', name: 'piped.video', type: 'piped' },
    { url: 'https://vid.puffyan.us/api/v1/captions/', name: 'puffyan', type: 'invidious' },
    { url: 'https://pipedapi.kavin.rocks/streams/', name: 'kavin.rocks', type: 'piped' },
    { url: 'https://inv.tux.pizza/api/v1/captions/', name: 'tux.pizza', type: 'invidious' },
    { url: 'https://invidious.nerdvpn.de/api/v1/captions/', name: 'nerdvpn', type: 'invidious' }
];

// ============================================================================
// Logging
// ============================================================================

function log(...args) {
    if (DEBUG) console.log('[Innertube]', ...args);
}

// ============================================================================
// Request Handlers
// ============================================================================

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const apiKey = env.INNERTUBE_API_KEY || DEFAULT_API_KEY;
    const cache = env.TRANSCRIPT_CACHE;

    try {
        const body = await request.json();
        const { videoId, forceRefresh = false } = body;

        log('Request for videoId:', videoId);

        if (!validateVideoId(videoId)) {
            return jsonResponse({ error: 'Invalid or missing videoId' }, 400);
        }

        const cacheKey = `captions:v3:${videoId}`;

        // Check cache (unless force refresh)
        if (!forceRefresh && cache) {
            const cached = await getCachedResult(cache, cacheKey);
            if (cached) {
                log('Cache hit for', videoId);
                return jsonResponse({ ...cached, source: 'cache' });
            }
        }

        // Execute strategies
        const result = await executeStrategies(videoId, apiKey);

        // Cache successful results
        if (result.hasContent && cache) {
            await cacheResult(cache, cacheKey, result.data);
        }

        return jsonResponse({
            ...result.data,
            source: result.source,
            ...(result.warning && { warning: result.warning })
        });

    } catch (error) {
        console.error('[Innertube] Error:', error.message);
        return errorResponse(error.message);
    }
}

// ============================================================================
// Strategy Orchestration
// ============================================================================

async function executeStrategies(videoId, apiKey) {
    // Strategy 1: Innertube API (PARALLEL - first success wins)
    log('Strategy 1: Innertube API (parallel)');
    let result = await tryInnertubeParallel(videoId, apiKey);

    if (result.success && result.hasContent) {
        log('Innertube success via', result.client);
        return { ...result, source: 'innertube' };
    }

    // Strategy 2: Watch page scrape
    log('Strategy 2: Watch page scrape');
    result = await tryWatchPageWithContent(videoId);

    if (result.success && result.hasContent) {
        log('Watch page success');
        return { ...result, source: 'scrape' };
    }

    // Strategy 3: Third-party APIs (parallel)
    log('Strategy 3: Third-party APIs');
    result = await tryThirdPartyAPIs(videoId);

    if (result.success && result.hasContent) {
        log('Third-party success');
        return { ...result, source: 'thirdparty' };
    }

    // All strategies failed
    log('All strategies exhausted');
    return {
        success: false,
        hasContent: false,
        source: 'none',
        data: {
            videoDetails: result.data?.videoDetails || { videoId },
            captions: { playerCaptionsTracklistRenderer: { captionTracks: [] } }
        },
        warning: result.warning
    };
}

// ============================================================================
// Strategy 1: Innertube API (PARALLEL)
// ============================================================================

async function tryInnertubeParallel(videoId, apiKey) {
    const controllers = [];

    const tryClient = async (config) => {
        const controller = new AbortController();
        controllers.push(controller);

        const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.innertube);

        try {
            log('Trying client:', config.clientName);

            const requestBody = {
                context: {
                    client: {
                        clientName: config.clientName,
                        clientVersion: config.clientVersion,
                        hl: 'en',
                        gl: 'US'
                    }
                },
                videoId,
                contentCheckOk: true,
                racyCheckOk: true
            };

            const response = await fetch(
                `https://www.youtube.com/youtubei/v1/player?key=${apiKey}&prettyPrint=false`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': config.userAgent,
                        'Accept': '*/*',
                        'Accept-Language': 'en-US,en;q=0.9',
                        'Origin': 'https://www.youtube.com',
                        'Referer': 'https://www.youtube.com/',
                        'X-Youtube-Client-Name': config.clientId,
                        'X-Youtube-Client-Version': config.clientVersion
                    },
                    body: JSON.stringify(requestBody),
                    signal: controller.signal
                }
            );

            clearTimeout(timeoutId);

            if (!response.ok) throw new Error(`Status ${response.status}`);

            const data = await response.json();

            // Check for errors
            if (data.playabilityStatus?.status === 'LOGIN_REQUIRED') {
                throw new Error('Age-restricted');
            }

            if (data.playabilityStatus?.status === 'ERROR') {
                throw new Error(data.playabilityStatus.reason || 'Playback error');
            }

            const captionTracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks;

            if (!captionTracks?.length) {
                throw new Error('No captions');
            }

            log('Client', config.clientName, '- found', captionTracks.length, 'tracks');

            // Fetch content immediately
            await fetchAllCaptionContent(captionTracks, config.userAgent);

            const tracksWithContent = captionTracks.filter(t => t.content?.length > 0);

            if (tracksWithContent.length === 0) {
                throw new Error('Failed to fetch caption content');
            }

            log('Client', config.clientName, '- success with', tracksWithContent.length, 'tracks');

            return {
                success: true,
                hasContent: true,
                client: config.clientName,
                data
            };

        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    };

    try {
        // Race all clients - first success wins
        const result = await Promise.any(CLIENT_CONFIGS.map(tryClient));

        // Abort remaining requests
        controllers.forEach(c => c.abort());

        return result;

    } catch (aggregateError) {
        controllers.forEach(c => c.abort());

        // Check if age-restricted
        const ageRestricted = aggregateError.errors?.some(e =>
            e.message?.includes('Age-restricted')
        );

        return {
            success: false,
            hasContent: false,
            data: {},
            warning: ageRestricted ? 'Video may be age-restricted' : undefined
        };
    }
}

// ============================================================================
// Strategy 2: Watch Page Scrape
// ============================================================================

async function tryWatchPageWithContent(videoId) {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.watchPage);

        const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
            headers: {
                'User-Agent': userAgent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'identity'
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            return { success: false, hasContent: false, data: {} };
        }

        const html = await response.text();
        const data = extractPlayerResponse(html);

        if (!data) {
            return { success: false, hasContent: false, data: {} };
        }

        const captionTracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks;

        if (!captionTracks?.length) {
            return { success: true, hasContent: false, data };
        }

        log('Scrape found', captionTracks.length, 'tracks');

        await fetchAllCaptionContent(captionTracks, userAgent);

        const tracksWithContent = captionTracks.filter(t => t.content?.length > 0);

        return {
            success: true,
            hasContent: tracksWithContent.length > 0,
            data
        };

    } catch (error) {
        log('Watch page error:', error.message);
        return { success: false, hasContent: false, data: {} };
    }
}

function extractPlayerResponse(html) {
    const marker = 'ytInitialPlayerResponse = ';
    const startIndex = html.indexOf(marker);

    if (startIndex === -1) return null;

    const jsonStart = startIndex + marker.length;
    let braceCount = 0;
    let inString = false;
    let escape = false;

    for (let i = jsonStart; i < html.length && i < jsonStart + 500000; i++) {
        const char = html[i];

        if (escape) { escape = false; continue; }
        if (char === '\\' && inString) { escape = true; continue; }
        if (char === '"' && !escape) { inString = !inString; continue; }

        if (!inString) {
            if (char === '{') braceCount++;
            else if (char === '}') {
                braceCount--;
                if (braceCount === 0) {
                    try {
                        return JSON.parse(html.substring(jsonStart, i + 1));
                    } catch {
                        return null;
                    }
                }
            }
        }
    }

    return null;
}

// ============================================================================
// Strategy 3: Third-Party APIs (Parallel)
// ============================================================================

async function tryThirdPartyAPIs(videoId) {
    const controllers = [];

    const checkApi = async (api) => {
        const controller = new AbortController();
        controllers.push(controller);

        const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.thirdParty);

        try {
            const response = await fetch(`${api.url}${videoId}`, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) throw new Error(`Status ${response.status}`);

            const data = await response.json();
            const captionTracks = await processThirdPartyResponse(api, data);

            if (captionTracks.length > 0) {
                log('Third-party win:', api.name);
                return {
                    success: true,
                    hasContent: true,
                    data: {
                        captions: {
                            playerCaptionsTracklistRenderer: { captionTracks }
                        },
                        videoDetails: {
                            title: data.title || 'Unknown Title',
                            author: data.uploader || data.author || 'Unknown Author',
                            videoId
                        }
                    }
                };
            }

            throw new Error('No valid content');

        } catch {
            clearTimeout(timeoutId);
            throw new Error('Failed');
        }
    };

    try {
        const result = await Promise.any(THIRD_PARTY_APIS.map(checkApi));
        controllers.forEach(c => c.abort());
        return result;

    } catch {
        log('All third-party APIs failed');
        controllers.forEach(c => c.abort());
        return { success: false, hasContent: false, data: {} };
    }
}

async function processThirdPartyResponse(api, data) {
    const captionTracks = [];

    if (api.type === 'piped') {
        if (!data.subtitles?.length) return [];

        const results = await Promise.all(
            data.subtitles.map(async (sub) => {
                try {
                    const content = await fetchThirdPartyContent(sub.url);
                    if (content?.length > 0) {
                        return {
                            baseUrl: sub.url,
                            languageCode: sub.code,
                            name: { simpleText: sub.name || sub.code },
                            content
                        };
                    }
                } catch { /* ignore */ }
                return null;
            })
        );

        captionTracks.push(...results.filter(Boolean));

    } else if (api.type === 'invidious') {
        const captions = Array.isArray(data.captions) ? data.captions : (Array.isArray(data) ? data : []);
        if (!captions.length) return [];

        const instanceUrl = new URL(api.url).origin;

        const results = await Promise.all(
            captions.map(async (sub) => {
                try {
                    const fullUrl = sub.url.startsWith('http') ? sub.url : `${instanceUrl}${sub.url}`;
                    const content = await fetchThirdPartyContent(fullUrl);
                    if (content?.length > 0) {
                        return {
                            baseUrl: fullUrl,
                            languageCode: sub.languageCode || sub.label,
                            name: { simpleText: sub.label || sub.languageCode },
                            content
                        };
                    }
                } catch { /* ignore */ }
                return null;
            })
        );

        captionTracks.push(...results.filter(Boolean));
    }

    return captionTracks;
}

async function fetchThirdPartyContent(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.caption);

    try {
        const response = await fetch(url, {
            headers: { 'Accept': '*/*' },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) return null;

        const text = await response.text();
        return parseCaption(text, 'vtt');

    } catch {
        clearTimeout(timeoutId);
        return null;
    }
}

// ============================================================================
// Caption Content Fetching
// ============================================================================

async function fetchAllCaptionContent(captionTracks, userAgent) {
    await Promise.all(
        captionTracks.map(async (track) => {
            try {
                track.content = await fetchCaptionContent(track.baseUrl, userAgent);
            } catch {
                track.content = null;
            }
        })
    );
}

async function fetchCaptionContent(baseUrl, userAgent) {
    const formats = ['json3', 'srv3', 'vtt'];

    for (const format of formats) {
        try {
            const url = baseUrl.includes('fmt=')
                ? baseUrl.replace(/fmt=[^&]+/, `fmt=${format}`)
                : `${baseUrl}&fmt=${format}`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.caption);

            const response = await fetch(url, {
                headers: {
                    'User-Agent': userAgent,
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Referer': 'https://www.youtube.com/'
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) continue;

            const text = await response.text();

            if (text.length < 10 || text === '1') continue;

            const segments = parseCaption(text, format);

            if (segments?.length > 0) {
                return segments;
            }

        } catch { /* try next format */ }
    }

    return null;
}

// ============================================================================
// Caption Parsing
// ============================================================================

function parseCaption(text, format) {
    if (format === 'json3' || (text.startsWith('{') && text.includes('"events"'))) {
        const result = parseJSON3(text);
        if (result?.length) return result;
    }

    if (format === 'srv3' || text.includes('<?xml') || text.includes('<text start=')) {
        const result = parseXML(text);
        if (result?.length) return result;
    }

    if (format === 'vtt' || text.includes('WEBVTT')) {
        const result = parseVTT(text);
        if (result?.length) return result;
    }

    return parseJSON3(text) || parseXML(text) || parseVTT(text) || [];
}

function parseJSON3(text) {
    try {
        const { events = [] } = JSON.parse(text);
        const segments = [];

        for (const event of events) {
            if (!event.segs) continue;

            const segmentText = event.segs.map(seg => seg.utf8 || '').join('');
            const cleanText = decodeHtmlEntities(segmentText.trim());

            if (cleanText) {
                segments.push({
                    text: cleanText,
                    start: (event.tStartMs || 0) / 1000,
                    duration: (event.dDurationMs || 0) / 1000
                });
            }
        }

        return segments;
    } catch {
        return null;
    }
}

function parseXML(text) {
    const segments = [];
    const regex = /<text start="([^"]+)" dur="([^"]+)"[^>]*>([^<]*)<\/text>/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        const cleanText = decodeHtmlEntities(match[3].trim());
        if (cleanText) {
            segments.push({
                text: cleanText,
                start: parseFloat(match[1]),
                duration: parseFloat(match[2])
            });
        }
    }

    return segments;
}

function parseVTT(text) {
    const segments = [];
    const lines = text.split('\n');
    let i = 0;

    while (i < lines.length) {
        const line = lines[i].trim();
        const timestampMatch = line.match(/(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})/);

        if (timestampMatch) {
            const startTime = parseVTTTime(timestampMatch[1]);
            const endTime = parseVTTTime(timestampMatch[2]);

            let text = '';
            i++;

            while (i < lines.length && lines[i].trim() !== '' && !lines[i].includes('-->')) {
                text += (text ? ' ' : '') + lines[i].trim();
                i++;
            }

            if (text) {
                segments.push({
                    text: decodeHtmlEntities(text),
                    start: startTime,
                    duration: endTime - startTime
                });
            }
        } else {
            i++;
        }
    }

    return segments;
}

function parseVTTTime(time) {
    const [hours, minutes, secondsMs] = time.split(':');
    const [seconds, milliseconds] = secondsMs.split('.');

    return (
        parseInt(hours, 10) * 3600 +
        parseInt(minutes, 10) * 60 +
        parseInt(seconds, 10) +
        parseInt(milliseconds, 10) / 1000
    );
}

// ============================================================================
// Caching
// ============================================================================

async function getCachedResult(cache, key) {
    try {
        const cached = await cache.get(key, 'json');
        const hasContent = cached?.captions?.playerCaptionsTracklistRenderer?.captionTracks?.some(
            t => t.content?.length > 0
        );
        return hasContent ? cached : null;
    } catch {
        return null;
    }
}

async function cacheResult(cache, key, data) {
    try {
        await cache.put(key, JSON.stringify(data), { expirationTtl: CACHE_TTL });
        log('Cached result');
    } catch (e) {
        log('Cache error:', e.message);
    }
}

// ============================================================================
// Utilities
// ============================================================================

function decodeHtmlEntities(text) {
    return text
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
        .replace(/\n/g, ' ')
        .trim();
}