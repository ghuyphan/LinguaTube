/**
 * YouTube Innertube Proxy (Cloudflare Function)
 * Fetches captions using parallel fallback strategies
 *
 * Strategies (raced in parallel):
 * - Innertube API (TV/Web clients)
 * - Watch page scrape
 * - Third-party APIs (Piped/Invidious)
 *
 * @version 4.1.0
 * @updated 2025-12
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';

// ============================================================================
// Configuration
// ============================================================================

const DEBUG = false;
const CACHE_TTL = 60 * 60 * 24 * 30;
const DEFAULT_API_KEY = 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w';
const DEFAULT_TARGET_LANGS = ['ja', 'zh', 'en'];

const TIMEOUTS = {
    innertube: 5000,
    watchPage: 5000,
    thirdParty: 5000,
    caption: 3000
};

const CLIENT_CONFIGS = [
    {
        clientName: 'TVHTML5_SIMPLY',
        clientVersion: '1.0',
        userAgent: 'Mozilla/5.0 (ChromiumStylePlatform) Cobalt/Version',
        clientId: '85'
    },
    {
        clientName: 'TVHTML5',
        clientVersion: '7.20251220.00.00',
        userAgent: 'Mozilla/5.0 (ChromiumStylePlatform) Cobalt/Version',
        clientId: '7'
    },
    {
        clientName: 'WEB',
        clientVersion: '2.20251220.00.00',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        clientId: '1'
    }
];

const THIRD_PARTY_APIS = [
    { url: 'https://yewtu.be/api/v1/captions/', name: 'yewtu.be', type: 'invidious' },
    { url: 'https://vid.puffyan.us/api/v1/captions/', name: 'puffyan', type: 'invidious' },
    { url: 'https://inv.tux.pizza/api/v1/captions/', name: 'tux.pizza', type: 'invidious' },
    { url: 'https://api.piped.video/streams/', name: 'piped.video', type: 'piped' },
    { url: 'https://pipedapi.kavin.rocks/streams/', name: 'kavin.rocks', type: 'piped' }
];

// ============================================================================
// Logging
// ============================================================================

const log = (...args) => DEBUG && console.log('[Innertube]', ...args);

// ============================================================================
// Request Handlers
// ============================================================================

export const onRequestOptions = () => handleOptions(['POST', 'OPTIONS']);

export async function onRequestPost(context) {
    const { request, env } = context;
    const apiKey = env.INNERTUBE_API_KEY || DEFAULT_API_KEY;
    const cache = env.TRANSCRIPT_CACHE;

    try {
        const body = await request.json();
        const {
            videoId,
            forceRefresh = false,
            targetLanguages = DEFAULT_TARGET_LANGS,
            metadataOnly = false
        } = body;

        log('Request:', { videoId, targetLanguages, metadataOnly });

        if (!validateVideoId(videoId)) {
            return jsonResponse({ error: 'Invalid or missing videoId' }, 400);
        }

        const cacheKey = `captions:v4:${videoId}`;

        // Check cache
        if (!forceRefresh && cache) {
            const cached = await getCachedResult(cache, cacheKey, targetLanguages);
            if (cached) {
                log('Cache hit');
                return jsonResponse({ ...cached, source: 'cache' });
            }
        }

        // Execute all strategies in parallel
        const result = await executeStrategies(videoId, apiKey, targetLanguages, metadataOnly);

        // Cache successful results
        if (result.hasContent && cache && !metadataOnly) {
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

async function executeStrategies(videoId, apiKey, targetLanguages, metadataOnly) {
    const masterController = new AbortController();
    const { signal } = masterController;

    const strategies = [
        // Innertube clients
        ...CLIENT_CONFIGS.map(config =>
            tryInnertubeClient(videoId, apiKey, config, targetLanguages, metadataOnly, signal)
                .then(r => ({ ...r, source: `innertube:${config.clientName}` }))
        ),
        // Watch page scrape
        tryWatchPage(videoId, targetLanguages, metadataOnly, signal)
            .then(r => ({ ...r, source: 'scrape' })),
        // Third-party APIs
        ...THIRD_PARTY_APIS.map(api =>
            tryThirdPartyAPI(videoId, api, targetLanguages, metadataOnly, signal)
                .then(r => ({ ...r, source: `thirdparty:${api.name}` }))
        )
    ];

    try {
        const result = await Promise.any(strategies);
        masterController.abort();
        log('Success via:', result.source);
        return result;

    } catch (aggregateError) {
        masterController.abort();
        log('All strategies failed');

        const ageRestricted = aggregateError.errors?.some(e =>
            e.message?.includes('Age-restricted')
        );

        return {
            success: false,
            hasContent: false,
            source: 'none',
            data: {
                videoDetails: { videoId },
                captions: { playerCaptionsTracklistRenderer: { captionTracks: [] } }
            },
            warning: ageRestricted ? 'Video may be age-restricted' : 'No captions available'
        };
    }
}

// ============================================================================
// Innertube Client
// ============================================================================

async function tryInnertubeClient(videoId, apiKey, config, targetLanguages, metadataOnly, masterSignal) {
    const controller = new AbortController();
    const cleanup = linkSignal(masterSignal, controller);
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.innertube);

    try {
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
                body: JSON.stringify({
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
                }),
                signal: controller.signal
            }
        );

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        // Check playability
        if (data.playabilityStatus?.status === 'LOGIN_REQUIRED') {
            throw new Error('Age-restricted');
        }
        if (data.playabilityStatus?.status === 'ERROR') {
            throw new Error(data.playabilityStatus.reason || 'Playback error');
        }

        const captionTracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        if (!captionTracks?.length) throw new Error('No captions');

        const filteredTracks = filterTracksByLanguage(captionTracks, targetLanguages);
        if (!filteredTracks.length) throw new Error('No matching language tracks');

        if (!metadataOnly) {
            await fetchCaptionContents(filteredTracks, config.userAgent);
            if (!filteredTracks.some(t => t.content?.length > 0)) {
                throw new Error('Failed to fetch content');
            }
        }

        data.captions.playerCaptionsTracklistRenderer.captionTracks = filteredTracks;

        return { success: true, hasContent: !metadataOnly, data };

    } finally {
        clearTimeout(timeoutId);
        cleanup();
    }
}

// ============================================================================
// Watch Page Scrape
// ============================================================================

async function tryWatchPage(videoId, targetLanguages, metadataOnly, masterSignal) {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
    const controller = new AbortController();
    const cleanup = linkSignal(masterSignal, controller);
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.watchPage);

    try {
        const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
            headers: {
                'User-Agent': userAgent,
                'Accept': 'text/html,application/xhtml+xml',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'identity'
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const html = await response.text();
        const data = extractPlayerResponse(html);
        if (!data) throw new Error('Failed to extract player response');

        const captionTracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        if (!captionTracks?.length) throw new Error('No captions');

        const filteredTracks = filterTracksByLanguage(captionTracks, targetLanguages);
        if (!filteredTracks.length) throw new Error('No matching language tracks');

        if (!metadataOnly) {
            await fetchCaptionContents(filteredTracks, userAgent);
            if (!filteredTracks.some(t => t.content?.length > 0)) {
                throw new Error('Failed to fetch content');
            }
        }

        data.captions.playerCaptionsTracklistRenderer.captionTracks = filteredTracks;

        return { success: true, hasContent: !metadataOnly, data };

    } finally {
        clearTimeout(timeoutId);
        cleanup();
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
// Third-Party APIs
// ============================================================================

async function tryThirdPartyAPI(videoId, api, targetLanguages, metadataOnly, masterSignal) {
    const controller = new AbortController();
    const cleanup = linkSignal(masterSignal, controller);
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

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const captionTracks = await processThirdPartyResponse(api, data, targetLanguages, metadataOnly);

        if (!captionTracks.length) throw new Error('No valid tracks');

        return {
            success: true,
            hasContent: !metadataOnly,
            data: {
                captions: { playerCaptionsTracklistRenderer: { captionTracks } },
                videoDetails: {
                    title: data.title || 'Unknown',
                    author: data.uploader || data.author || 'Unknown',
                    videoId
                }
            }
        };

    } finally {
        clearTimeout(timeoutId);
        cleanup();
    }
}

async function processThirdPartyResponse(api, data, targetLanguages, metadataOnly) {
    let rawTracks = [];

    if (api.type === 'piped' && data.subtitles?.length) {
        rawTracks = data.subtitles.map(sub => ({
            baseUrl: sub.url,
            languageCode: sub.code,
            name: { simpleText: sub.name || sub.code }
        }));
    } else if (api.type === 'invidious') {
        const captions = Array.isArray(data.captions) ? data.captions : (Array.isArray(data) ? data : []);
        const instanceUrl = new URL(api.url).origin;

        rawTracks = captions.map(sub => ({
            baseUrl: sub.url?.startsWith('http') ? sub.url : `${instanceUrl}${sub.url}`,
            languageCode: sub.languageCode || sub.label,
            name: { simpleText: sub.label || sub.languageCode }
        }));
    }

    const filteredTracks = filterTracksByLanguage(rawTracks, targetLanguages);
    if (metadataOnly) return filteredTracks;

    await Promise.all(
        filteredTracks.map(async track => {
            try {
                track.content = await fetchThirdPartyContent(track.baseUrl);
            } catch {
                track.content = null;
            }
        })
    );

    return filteredTracks.filter(t => t.content?.length > 0);
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
        const segments = parseCaption(text, 'vtt');
        // Clean segments server-side
        return segments?.length ? cleanTranscriptSegments(segments) : null;

    } catch {
        clearTimeout(timeoutId);
        return null;
    }
}

// ============================================================================
// Caption Content Fetching
// ============================================================================

function filterTracksByLanguage(tracks, targetLanguages) {
    return tracks.filter(track => {
        const langCode = track.languageCode?.toLowerCase() || '';
        return targetLanguages.some(target =>
            langCode.startsWith(target.toLowerCase())
        );
    });
}

async function fetchCaptionContents(captionTracks, userAgent) {
    await Promise.all(
        captionTracks.map(async track => {
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
                // Clean segments server-side for deduplication and timing fixes
                return cleanTranscriptSegments(segments);
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
        const match = line.match(/(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})/);

        if (match) {
            const startTime = parseVTTTime(match[1]);
            const endTime = parseVTTTime(match[2]);
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

async function getCachedResult(cache, key, targetLanguages) {
    try {
        const cached = await cache.get(key, 'json');
        if (!cached) return null;

        const tracks = cached?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];

        const hasTargetContent = tracks.some(t =>
            t.content?.length > 0 &&
            targetLanguages.some(lang => t.languageCode?.toLowerCase().startsWith(lang.toLowerCase()))
        );

        return hasTargetContent ? cached : null;
    } catch {
        return null;
    }
}

async function cacheResult(cache, key, data) {
    try {
        await cache.put(key, JSON.stringify(data), { expirationTtl: CACHE_TTL });
        log('Cached');
    } catch (e) {
        log('Cache error:', e.message);
    }
}

// ============================================================================
// Utilities
// ============================================================================

/**
 * Link child abort controller to master signal (with cleanup)
 */
function linkSignal(masterSignal, childController) {
    const onAbort = () => childController.abort();
    masterSignal.addEventListener('abort', onAbort, { once: true });
    return () => masterSignal.removeEventListener('abort', onAbort);
}

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