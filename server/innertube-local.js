/**
 * YouTube Transcript Proxy (Cloudflare Function)
 *
 * Hybrid fallback strategy for speed + reliability:
 *   1. Cache (instant)
 *   2. Race YouTube sources in parallel (Innertube + scrape)
 *   3. Sequential third-party fallback (respectful)
 *
 * @version 5.0.0
 * @updated 2024-12
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';

// ============================================================================
// Configuration
// ============================================================================

const DEBUG = true;
const CACHE_TTL = 60 * 60 * 24 * 30; // 30 days
const DEFAULT_TARGET_LANGS = ['ja', 'zh', 'ko', 'en'];

const TIMEOUTS = {
    youtube: 5000,   // Innertube + scrape
    thirdParty: 4000,
    caption: 3000
};

// Ordered by reliability for captions
const INNERTUBE_CLIENTS = [
    {
        name: 'TVHTML5_SIMPLY',
        clientName: 'TVHTML5_SIMPLY',
        clientVersion: '1.0',
        userAgent: 'Mozilla/5.0 (ChromiumStylePlatform) Cobalt/Version',
        clientId: '85'
    },
    {
        name: 'WEB',
        clientName: 'WEB',
        clientVersion: '2.20241220.00.00',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        clientId: '1'
    }
];

// Last resort - be respectful, try sequentially
const THIRD_PARTY_APIS = [
    { url: 'https://yewtu.be/api/v1/captions/', name: 'yewtu.be', type: 'invidious' },
    { url: 'https://vid.puffyan.us/api/v1/captions/', name: 'puffyan', type: 'invidious' }
];

// ============================================================================
// Logging & Timing
// ============================================================================

const log = (...args) => DEBUG && console.log('[Innertube]', ...args);

function createTimer() {
    const start = Date.now();
    return () => Date.now() - start;
}

// ============================================================================
// Request Handlers
// ============================================================================

export const onRequestOptions = () => handleOptions(['POST', 'OPTIONS']);

export async function onRequestPost(context) {
    const { request, env } = context;
    const timer = createTimer();

    try {
        const body = await request.json();
        const {
            videoId,
            forceRefresh = false,
            targetLanguages = DEFAULT_TARGET_LANGS,
            metadataOnly = false
        } = body;

        log('Request:', { videoId, targetLanguages, metadataOnly, forceRefresh });

        if (!validateVideoId(videoId)) {
            return jsonResponse({ error: 'Invalid or missing videoId' }, 400);
        }

        const apiKey = env.INNERTUBE_API_KEY;
        if (!apiKey) {
            return errorResponse('INNERTUBE_API_KEY not configured', 500);
        }
        const cache = env.TRANSCRIPT_CACHE;
        const cacheKey = `captions:v5:${videoId}`;

        // =====================================================================
        // Tier 0: Cache (instant)
        // =====================================================================
        if (!forceRefresh && cache) {
            const cached = await getCachedResult(cache, cacheKey, targetLanguages);
            if (cached) {
                log(`Cache hit (${timer()}ms)`);
                return jsonResponse({ ...cached, source: 'cache', timing: timer() });
            }
        }

        // =====================================================================
        // Tier 1: Race YouTube sources (Innertube + scrape)
        // =====================================================================
        const youtubeResult = await tryYouTubeSources(videoId, apiKey, targetLanguages, metadataOnly);

        if (youtubeResult.success) {
            log(`YouTube success via ${youtubeResult.source} (${timer()}ms)`);
            if (youtubeResult.hasContent && cache && !metadataOnly) {
                cacheResult(cache, cacheKey, youtubeResult.data); // Don't await
            }
            return jsonResponse({
                ...youtubeResult.data,
                source: youtubeResult.source,
                timing: timer()
            });
        }

        // Check for age-restriction (don't bother with third-party)
        if (youtubeResult.ageRestricted) {
            return jsonResponse({
                ...createEmptyResponse(videoId),
                source: 'none',
                warning: 'Video is age-restricted',
                timing: timer()
            });
        }

        // =====================================================================
        // Tier 2: Sequential third-party fallback
        // =====================================================================
        const thirdPartyResult = await tryThirdPartySources(videoId, targetLanguages, metadataOnly);

        if (thirdPartyResult.success) {
            log(`Third-party success via ${thirdPartyResult.source} (${timer()}ms)`);
            if (thirdPartyResult.hasContent && cache && !metadataOnly) {
                cacheResult(cache, cacheKey, thirdPartyResult.data);
            }
            return jsonResponse({
                ...thirdPartyResult.data,
                source: thirdPartyResult.source,
                timing: timer()
            });
        }

        // =====================================================================
        // All failed
        // =====================================================================
        log(`All strategies failed (${timer()}ms)`);
        return jsonResponse({
            ...createEmptyResponse(videoId),
            source: 'none',
            warning: 'No captions available',
            timing: timer()
        });

    } catch (error) {
        console.error('[Innertube] Error:', error.message);
        return errorResponse(error.message);
    }
}

// ============================================================================
// Tier 1: YouTube Sources (raced in parallel)
// ============================================================================

async function tryYouTubeSources(videoId, apiKey, targetLanguages, metadataOnly) {
    const controller = new AbortController();
    const { signal } = controller;

    const strategies = [
        // Innertube clients
        ...INNERTUBE_CLIENTS.map(client =>
            tryInnertubeClient(videoId, apiKey, client, targetLanguages, metadataOnly, signal)
                .then(r => ({ ...r, source: `innertube:${client.name}` }))
                .catch(e => ({ success: false, error: e.message }))
        ),
        // Watch page scrape
        tryWatchPage(videoId, targetLanguages, metadataOnly, signal)
            .then(r => ({ ...r, source: 'scrape' }))
            .catch(e => ({ success: false, error: e.message }))
    ];

    // Set overall timeout
    const timeoutPromise = new Promise(resolve => {
        setTimeout(() => resolve({ success: false, timeout: true }), TIMEOUTS.youtube);
    });

    try {
        // Race all YouTube strategies
        const result = await Promise.any([
            ...strategies.map(p => p.then(r => {
                if (r.success) return r;
                throw r; // Convert failure to rejection for Promise.any
            })),
            timeoutPromise.then(() => { throw { timeout: true }; })
        ]);

        controller.abort(); // Cancel pending requests
        return result;

    } catch (aggregateError) {
        controller.abort();

        // Check if any error was age-restriction
        const errors = aggregateError.errors || [aggregateError];
        const ageRestricted = errors.some(e => e?.error === 'Age-restricted' || e?.ageRestricted);

        return { success: false, ageRestricted };
    }
}

// ============================================================================
// Tier 2: Third-Party Sources (sequential, respectful)
// ============================================================================

async function tryThirdPartySources(videoId, targetLanguages, metadataOnly) {
    for (const api of THIRD_PARTY_APIS) {
        try {
            log(`Trying third-party: ${api.name}`);
            const result = await tryThirdPartyAPI(videoId, api, targetLanguages, metadataOnly);

            if (result.success) {
                return { ...result, source: `thirdparty:${api.name}` };
            }
        } catch (error) {
            log(`${api.name} failed:`, error.message);
        }
    }

    return { success: false };
}

// ============================================================================
// Innertube Client Implementation
// ============================================================================

async function tryInnertubeClient(videoId, apiKey, client, targetLanguages, metadataOnly, masterSignal) {
    const controller = new AbortController();
    const cleanup = linkAbortSignals(masterSignal, controller);

    try {
        const response = await fetch(
            `https://www.youtube.com/youtubei/v1/player?key=${apiKey}&prettyPrint=false`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': client.userAgent,
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.9',
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

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Check playability status
        const status = data.playabilityStatus?.status;
        if (status === 'LOGIN_REQUIRED') {
            throw new Error('Age-restricted');
        }
        if (status === 'ERROR' || status === 'UNPLAYABLE') {
            throw new Error(data.playabilityStatus?.reason || 'Video unavailable');
        }

        // Extract and filter caption tracks
        const captionTracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        if (!captionTracks?.length) {
            throw new Error('No captions');
        }

        let filteredTracks = filterTracksByLanguage(captionTracks, targetLanguages);
        if (!filteredTracks.length && captionTracks.length > 0) {
            filteredTracks = [captionTracks[0]];
        }

        if (!filteredTracks.length) {
            throw new Error('No matching languages');
        }

        // Fetch caption content
        if (!metadataOnly) {
            await fetchCaptionContents(filteredTracks, client.userAgent);

            if (!filteredTracks.some(t => t.content?.length > 0)) {
                throw new Error('Failed to fetch content');
            }
        }

        data.captions.playerCaptionsTracklistRenderer.captionTracks = filteredTracks;

        return { success: true, hasContent: !metadataOnly, data };

    } finally {
        cleanup();
    }
}

// ============================================================================
// Watch Page Scrape Implementation
// ============================================================================

async function tryWatchPage(videoId, targetLanguages, metadataOnly, masterSignal) {
    const userAgent = INNERTUBE_CLIENTS[1].userAgent; // Use WEB client UA
    const controller = new AbortController();
    const cleanup = linkAbortSignals(masterSignal, controller);

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

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const html = await response.text();
        const data = extractPlayerResponse(html);

        if (!data) {
            throw new Error('Failed to extract player response');
        }

        const captionTracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        if (!captionTracks?.length) {
            throw new Error('No captions');
        }

        let filteredTracks = filterTracksByLanguage(captionTracks, targetLanguages);
        if (!filteredTracks.length && captionTracks.length > 0) {
            filteredTracks = [captionTracks[0]];
        }

        if (!filteredTracks.length) {
            throw new Error('No matching languages');
        }

        if (!metadataOnly) {
            await fetchCaptionContents(filteredTracks, userAgent);

            if (!filteredTracks.some(t => t.content?.length > 0)) {
                throw new Error('Failed to fetch content');
            }
        }

        data.captions.playerCaptionsTracklistRenderer.captionTracks = filteredTracks;

        return { success: true, hasContent: !metadataOnly, data };

    } finally {
        cleanup();
    }
}

/**
 * Extract ytInitialPlayerResponse from watch page HTML
 * Optimized JSON boundary detection
 */
function extractPlayerResponse(html) {
    const marker = 'ytInitialPlayerResponse = ';
    const startIdx = html.indexOf(marker);
    if (startIdx === -1) return null;

    const jsonStart = startIdx + marker.length;
    let depth = 0;
    let inString = false;
    let escaped = false;

    // Limit search to 500KB to prevent hanging on malformed responses
    const maxLen = Math.min(html.length, jsonStart + 500000);

    for (let i = jsonStart; i < maxLen; i++) {
        const char = html[i];

        if (escaped) {
            escaped = false;
            continue;
        }

        if (char === '\\' && inString) {
            escaped = true;
            continue;
        }

        if (char === '"') {
            inString = !inString;
            continue;
        }

        if (!inString) {
            if (char === '{') depth++;
            else if (char === '}') {
                depth--;
                if (depth === 0) {
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
// Third-Party API Implementation
// ============================================================================

async function tryThirdPartyAPI(videoId, api, targetLanguages, metadataOnly) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.thirdParty);

    try {
        const response = await fetch(`${api.url}${videoId}`, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (compatible; LinguaTube/1.0)'
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const captionTracks = await processThirdPartyResponse(api, data, targetLanguages, metadataOnly);

        if (!captionTracks.length) {
            throw new Error('No valid tracks');
        }

        return {
            success: true,
            hasContent: !metadataOnly,
            data: {
                captions: { playerCaptionsTracklistRenderer: { captionTracks } },
                videoDetails: {
                    videoId,
                    title: data.title || '',
                    author: data.uploader || data.author || ''
                }
            }
        };

    } finally {
        clearTimeout(timeoutId);
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
        const captions = Array.isArray(data.captions) ? data.captions :
            Array.isArray(data) ? data : [];
        const baseUrl = new URL(api.url).origin;

        rawTracks = captions.map(sub => ({
            baseUrl: sub.url?.startsWith('http') ? sub.url : `${baseUrl}${sub.url}`,
            languageCode: sub.languageCode || sub.label,
            name: { simpleText: sub.label || sub.languageCode }
        }));
    }

    let filteredTracks = filterTracksByLanguage(rawTracks, targetLanguages);
    if (!filteredTracks.length && rawTracks.length > 0) {
        filteredTracks = [rawTracks[0]];
    }

    if (metadataOnly) {
        return filteredTracks;
    }

    // Fetch content for all tracks in parallel
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
        if (text.length < 10) return null;

        const segments = parseCaption(text, 'vtt');
        return segments?.length ? cleanTranscriptSegments(segments) : null;

    } finally {
        clearTimeout(timeoutId);
    }
}

// ============================================================================
// Caption Content Fetching
// ============================================================================

function filterTracksByLanguage(tracks, targetLanguages) {
    const targets = targetLanguages.map(t => t.toLowerCase());

    return tracks.filter(track => {
        const lang = (track.languageCode || '').toLowerCase();
        return targets.some(target => lang.startsWith(target));
    });
}

async function fetchCaptionContents(tracks, userAgent) {
    await Promise.all(
        tracks.map(async track => {
            try {
                track.content = await fetchCaptionContent(track.baseUrl, userAgent);
            } catch {
                track.content = null;
            }
        })
    );
}

async function fetchCaptionContent(baseUrl, userAgent) {
    // Try formats in order of preference (json3 is fastest to parse)
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
                return cleanTranscriptSegments(segments);
            }
        } catch {
            // Try next format
        }
    }

    return null;
}

// ============================================================================
// Caption Parsing
// ============================================================================

function parseCaption(text, hint) {
    // Try hinted format first, then auto-detect
    const parsers = [
        { check: () => hint === 'json3' || text.trimStart().startsWith('{'), parse: parseJSON3 },
        { check: () => hint === 'srv3' || text.includes('<text start='), parse: parseXML },
        { check: () => hint === 'vtt' || text.includes('WEBVTT'), parse: parseVTT }
    ];

    for (const { check, parse } of parsers) {
        if (check()) {
            const result = parse(text);
            if (result?.length) return result;
        }
    }

    // Fallback: try all parsers
    for (const { parse } of parsers) {
        const result = parse(text);
        if (result?.length) return result;
    }

    return [];
}

function parseJSON3(text) {
    try {
        const { events = [] } = JSON.parse(text);
        const segments = [];

        for (const event of events) {
            if (!event.segs) continue;

            const segmentText = event.segs.map(s => s.utf8 || '').join('');
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
        const timeMatch = line.match(/(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})/);

        if (timeMatch) {
            const startTime = parseVTTTimestamp(timeMatch[1]);
            const endTime = parseVTTTimestamp(timeMatch[2]);
            let textContent = '';
            i++;

            // Collect all text lines until empty line or next timestamp
            while (i < lines.length && lines[i].trim() && !lines[i].includes('-->')) {
                textContent += (textContent ? ' ' : '') + lines[i].trim();
                i++;
            }

            if (textContent) {
                segments.push({
                    text: decodeHtmlEntities(textContent),
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

function parseVTTTimestamp(timestamp) {
    const [hours, minutes, rest] = timestamp.split(':');
    const [seconds, ms] = rest.split('.');

    return parseInt(hours) * 3600 +
        parseInt(minutes) * 60 +
        parseInt(seconds) +
        parseInt(ms) / 1000;
}

// ============================================================================
// Caching
// ============================================================================

async function getCachedResult(cache, key, targetLanguages) {
    try {
        const cached = await cache.get(key, 'json');
        if (!cached) return null;

        const tracks = cached?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
        const targets = targetLanguages.map(t => t.toLowerCase());

        // Verify cache has content for at least one target language
        const hasValidContent = tracks.some(track =>
            track.content?.length > 0 &&
            targets.some(t => (track.languageCode || '').toLowerCase().startsWith(t))
        );

        return hasValidContent ? cached : null;
    } catch {
        return null;
    }
}

async function cacheResult(cache, key, data) {
    try {
        await cache.put(key, JSON.stringify(data), { expirationTtl: CACHE_TTL });
        log('Cached successfully');
    } catch (e) {
        log('Cache error:', e.message);
    }
}

// ============================================================================
// Utilities
// ============================================================================

function createEmptyResponse(videoId) {
    return {
        videoDetails: { videoId },
        captions: { playerCaptionsTracklistRenderer: { captionTracks: [] } }
    };
}

/**
 * Link child AbortController to master signal
 * Returns cleanup function to remove listener
 */
function linkAbortSignals(masterSignal, childController) {
    if (!masterSignal) return () => { };

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
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)))
        .replace(/\n/g, ' ')
        .trim();
}