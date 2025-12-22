/**
 * YouTube Innertube Proxy (Cloudflare Function)
 * Robust caption fetching with multiple fallback strategies
 *
 * Strategy Order:
 * 1. Innertube API (iOS/Android/Web clients) - fetch content immediately
 * 2. Watch page scrape + immediate content fetch
 * 3. Third-party APIs (Piped/Invidious) - they handle content fetching internally
 *
 * Key Insight: YouTube's timedtext URLs have IP-bound signatures that expire quickly.
 * We MUST fetch caption content immediately after getting the URLs, in the same request context.
 *
 * @version 2.0.0
 * @updated 2025-01
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';

// ============================================================================
// Configuration
// ============================================================================

const CONFIG = {
    debug: true,
    cache: {
        ttl: 60 * 60 * 24, // 24 hours
        keyPrefix: 'captions:v2:'
    },
    timeouts: {
        innertubeRequest: 10000,
        watchPageRequest: 10000,
        thirdPartyRequest: 8000,
        captionFetch: 5000
    },
    retries: {
        captionFetch: 2,
        retryDelayMs: 100
    }
};

// YouTube's public Innertube API key (improves reliability)
const INNERTUBE_API_KEY = 'AIzaSyA8eiZmM1FaDVjRy-df2KTyQ_vz_yYM39w';

// Client configurations - Update versions periodically when YouTube changes requirements
// Check: https://github.com/yt-dlp/yt-dlp/blob/master/yt_dlp/extractor/youtube.py for latest
const CLIENT_CONFIGS = [
    {
        clientName: 'IOS',
        clientVersion: '19.45.4',
        deviceMake: 'Apple',
        deviceModel: 'iPhone16,2',
        osName: 'iOS',
        osVersion: '18.1.0.22B83',
        userAgent: 'com.google.ios.youtube/19.45.4 (iPhone16,2; U; CPU iOS 18_1_0 like Mac OS X;)',
        clientId: '5'
    },
    {
        clientName: 'ANDROID',
        clientVersion: '19.44.38',
        androidSdkVersion: 34,
        osName: 'Android',
        osVersion: '14',
        userAgent: 'com.google.android.youtube/19.44.38 (Linux; U; Android 14; en_US; sdk_gphone64_x86_64 Build/UE1A.230829.036.A1) gzip',
        clientId: '3'
    },
    {
        clientName: 'WEB',
        clientVersion: '2.20250115.01.00',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        clientId: '1'
    },
    {
        clientName: 'TVHTML5_SIMPLY_EMBEDDED_PLAYER',
        clientVersion: '2.0',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        clientId: '85'
    }
];

// Third-party API instances (sorted by reliability)
const THIRD_PARTY_APIS = [
    // Flagship / Most Stable
    { url: 'https://yewtu.be/api/v1/captions/', name: 'yewtu.be', type: 'invidious' },
    { url: 'https://api.piped.video/streams/', name: 'piped.video', type: 'piped' },
    { url: 'https://vid.puffyan.us/api/v1/captions/', name: 'puffyan', type: 'invidious' },
    { url: 'https://pipedapi.kavin.rocks/streams/', name: 'kavin.rocks', type: 'piped' },
    // Reliable Backups
    { url: 'https://inv.tux.pizza/api/v1/captions/', name: 'tux.pizza', type: 'invidious' },
    { url: 'https://pipedapi.drg.li/streams/', name: 'drg.li-piped', type: 'piped' },
    { url: 'https://invidious.drg.li/api/v1/captions/', name: 'drg.li-inv', type: 'invidious' },
    { url: 'https://invidious.nerdvpn.de/api/v1/captions/', name: 'nerdvpn', type: 'invidious' },
    // Deep Reserves
    { url: 'https://api.piped.privacydev.net/streams/', name: 'privacydev', type: 'piped' },
    { url: 'https://pipedapi.adminforge.de/streams/', name: 'adminforge', type: 'piped' }
];

// ============================================================================
// Logging
// ============================================================================

function log(...args) {
    if (CONFIG.debug) {
        console.log('[Innertube]', ...args);
    }
}

function logError(...args) {
    console.error('[Innertube]', ...args);
}

// ============================================================================
// Request Handlers
// ============================================================================

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const cache = env.TRANSCRIPT_CACHE;

    try {
        const body = await request.json();
        const { videoId, forceRefresh = false } = body;

        log('Request for videoId:', videoId);

        if (!validateVideoId(videoId)) {
            log('Validation failed for videoId:', videoId);
            return jsonResponse({ error: 'Invalid or missing videoId' }, 400);
        }

        const cacheKey = `${CONFIG.cache.keyPrefix}${videoId}`;

        // Check cache (unless force refresh)
        if (!forceRefresh) {
            const cached = await getCachedResult(cache, cacheKey);
            if (cached) {
                log('Cache hit for', videoId);
                return jsonResponse({ ...cached, source: 'cache' });
            }
        }

        // Execute strategies in order
        const result = await executeStrategies(videoId);

        // Cache successful results
        if (result.hasContent) {
            await cacheResult(cache, cacheKey, result.data);
        }

        return jsonResponse({
            ...result.data,
            source: result.source,
            ...(result.warning && { warning: result.warning })
        });

    } catch (error) {
        logError('Request error:', error.message);
        return errorResponse(error.message);
    }
}

// ============================================================================
// Strategy Orchestration
// ============================================================================

async function executeStrategies(videoId) {
    // Strategy 1: Innertube API
    log('Strategy 1: Innertube API');
    let result = await tryInnertubeWithContent(videoId);

    if (result.success && result.hasContent) {
        log('Innertube success');
        return { ...result, source: 'innertube' };
    }

    // Strategy 2: Watch page scrape
    log('Strategy 2: Watch page scrape');
    result = await tryWatchPageWithContent(videoId);

    if (result.success && result.hasContent) {
        log('Watch page success');
        return { ...result, source: 'scrape' };
    }

    // Strategy 3: Third-party APIs
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
// Strategy 1: Innertube API
// ============================================================================

async function tryInnertubeWithContent(videoId) {
    let bestData = null;
    let ageRestricted = false;

    for (const config of CLIENT_CONFIGS) {
        try {
            log('Trying client:', config.clientName);

            const data = await fetchInnertubePlayer(videoId, config);

            if (!data) continue;

            // Check for age restriction
            if (data.playabilityStatus?.status === 'LOGIN_REQUIRED') {
                ageRestricted = true;
                log('Age-restricted content detected');
                continue;
            }

            // Save video details as fallback
            if (data.videoDetails) {
                bestData = data;
            }

            const captionTracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks;

            if (!captionTracks?.length) {
                log('Client', config.clientName, '- no captions');
                continue;
            }

            log('Client', config.clientName, '- found', captionTracks.length, 'tracks');

            // Fetch content immediately while URLs are valid
            await fetchAllCaptionContent(captionTracks, config.userAgent);

            const tracksWithContent = captionTracks.filter(t => t.content?.length > 0);
            log('Tracks with content:', tracksWithContent.length, '/', captionTracks.length);

            if (tracksWithContent.length > 0) {
                return { success: true, hasContent: true, data };
            }

        } catch (error) {
            log('Client', config.clientName, 'error:', error.message);
        }
    }

    return {
        success: !!bestData,
        hasContent: false,
        data: bestData || {},
        warning: ageRestricted ? 'Video may be age-restricted. Sign-in required.' : undefined
    };
}

async function fetchInnertubePlayer(videoId, config) {
    const requestBody = {
        context: {
            client: {
                clientName: config.clientName,
                clientVersion: config.clientVersion,
                hl: 'en',
                gl: 'US',
                ...(config.deviceMake && { deviceMake: config.deviceMake }),
                ...(config.deviceModel && { deviceModel: config.deviceModel }),
                ...(config.osName && { osName: config.osName }),
                ...(config.osVersion && { osVersion: config.osVersion }),
                ...(config.androidSdkVersion && { androidSdkVersion: config.androidSdkVersion })
            }
        },
        videoId,
        contentCheckOk: true,
        racyCheckOk: true
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeouts.innertubeRequest);

    try {
        const response = await fetch(
            `https://www.youtube.com/youtubei/v1/player?key=${INNERTUBE_API_KEY}&prettyPrint=false`,
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

        if (!response.ok) {
            log('Client', config.clientName, 'status:', response.status);
            return null;
        }

        return await response.json();

    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

// ============================================================================
// Strategy 2: Watch Page Scrape
// ============================================================================

async function tryWatchPageWithContent(videoId) {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeouts.watchPageRequest);

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

        // Fetch content immediately
        await fetchAllCaptionContent(captionTracks, userAgent);

        const tracksWithContent = captionTracks.filter(t => t.content?.length > 0);
        log('Scrape - tracks with content:', tracksWithContent.length);

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

        if (escape) {
            escape = false;
            continue;
        }

        if (char === '\\' && inString) {
            escape = true;
            continue;
        }

        if (char === '"' && !escape) {
            inString = !inString;
            continue;
        }

        if (!inString) {
            if (char === '{') {
                braceCount++;
            } else if (char === '}') {
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
// Strategy 3: Third-Party APIs
// ============================================================================

async function tryThirdPartyAPIs(videoId) {
    const controllers = [];

    const checkApi = async (api) => {
        const controller = new AbortController();
        controllers.push(controller);

        const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeouts.thirdPartyRequest);

        try {
            const response = await fetch(`${api.url}${videoId}`, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Status ${response.status}`);
            }

            const data = await response.json();
            const captionTracks = await processThirdPartyResponse(api, data, videoId);

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

        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    };

    try {
        const result = await Promise.any(THIRD_PARTY_APIS.map(checkApi));

        // Abort all other pending requests
        controllers.forEach(c => c.abort());

        return result;

    } catch {
        log('All third-party APIs failed');
        controllers.forEach(c => c.abort());
        return { success: false, hasContent: false, data: {} };
    }
}

async function processThirdPartyResponse(api, data, videoId) {
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
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeouts.captionFetch);

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
                track.content = await fetchCaptionContentWithRetry(track.baseUrl, userAgent);
            } catch (error) {
                log('Failed to fetch content for', track.languageCode, ':', error.message);
                track.content = null;
            }
        })
    );
}

async function fetchCaptionContentWithRetry(baseUrl, userAgent) {
    const formats = ['json3', 'srv3', 'vtt'];
    const { retries, retryDelayMs } = CONFIG.retries;

    for (const format of formats) {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const url = buildCaptionUrl(baseUrl, format);
                const segments = await fetchCaptionFormat(url, userAgent, format);

                if (segments?.length > 0) {
                    log(`Fetched ${segments.length} segments using ${format}`);
                    return segments;
                }

            } catch {
                if (attempt < retries) {
                    await sleep(retryDelayMs * (attempt + 1));
                }
            }
        }
    }

    return null;
}

function buildCaptionUrl(baseUrl, format) {
    if (baseUrl.includes('fmt=')) {
        return baseUrl.replace(/fmt=[^&]+/, `fmt=${format}`);
    }
    return `${baseUrl}&fmt=${format}`;
}

async function fetchCaptionFormat(url, userAgent, format) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.timeouts.captionFetch);

    try {
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

        if (!response.ok) return null;

        const text = await response.text();

        // Validate response
        if (text.length < 10 || text === '1' || text.includes('404')) {
            return null;
        }

        return parseCaption(text, format);

    } catch {
        clearTimeout(timeoutId);
        return null;
    }
}

// ============================================================================
// Caption Parsing
// ============================================================================

function parseCaption(text, format) {
    // Try format-specific parsing first
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

    // Fallback: try all parsers
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
    if (!cache) return null;

    try {
        const cached = await cache.get(key, 'json');

        // Validate cached data has actual content
        const hasContent = cached?.captions?.playerCaptionsTracklistRenderer?.captionTracks?.some(
            t => t.content?.length > 0
        );

        return hasContent ? cached : null;

    } catch (error) {
        log('Cache read error:', error.message);
        return null;
    }
}

async function cacheResult(cache, key, data) {
    if (!cache) return;

    try {
        await cache.put(key, JSON.stringify(data), {
            expirationTtl: CONFIG.cache.ttl
        });
        log('Cached result');
    } catch (error) {
        log('Cache write error:', error.message);
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}