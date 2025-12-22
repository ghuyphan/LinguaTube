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
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';

const DEBUG = true;

function log(...args) {
    if (DEBUG) console.log('[Innertube]', ...args);
}

// Handle preflight requests
export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const CAPTION_CACHE = env.TRANSCRIPT_CACHE;

    try {
        const body = await request.json();
        const videoId = body.videoId;

        log('Request body:', JSON.stringify(body));
        log('Request for videoId:', videoId, 'type:', typeof videoId);

        if (!validateVideoId(videoId)) {
            log('Validation failed for videoId:', videoId);
            return jsonResponse({ error: 'Invalid or missing videoId' }, 400);
        }

        const cacheKey = `captions:v2:${videoId}`;

        const forceRefresh = body.forceRefresh === true;

        if (forceRefresh) {
            log('Force refresh requested - bypassing cache read');
        }

        // Check cache first (if not forced)
        if (CAPTION_CACHE && !forceRefresh) {
            try {
                const cached = await CAPTION_CACHE.get(cacheKey, 'json');
                if (cached && cached.captions?.playerCaptionsTracklistRenderer?.captionTracks?.some(t => t.content)) {
                    log('Cache hit with content for', videoId);
                    return jsonResponse({ ...cached, source: 'cache' });
                }
            } catch (e) {
                log('Cache read error:', e.message);
            }
        }

        // Strategy 1: Innertube API with immediate content fetch
        log('Strategy 1: Innertube API');
        let result = await tryInnertubeWithContent(videoId);

        if (result.success && result.hasContent) {
            log('Innertube success with content');
            await cacheResult(CAPTION_CACHE, cacheKey, result.data);
            return jsonResponse({ ...result.data, source: 'innertube' });
        }

        // Strategy 2: Watch page scrape with immediate content fetch
        log('Strategy 2: Watch page scrape');
        result = await tryWatchPageWithContent(videoId);

        if (result.success && result.hasContent) {
            log('Watch page scrape success with content');
            await cacheResult(CAPTION_CACHE, cacheKey, result.data);
            return jsonResponse({ ...result.data, source: 'scrape' });
        }

        // Strategy 3: Third-party APIs (they handle content fetching internally)
        log('Strategy 3: Third-party APIs');
        result = await tryThirdPartyAPIs(videoId);

        if (result.success && result.hasContent) {
            log('Third-party API success');
            await cacheResult(CAPTION_CACHE, cacheKey, result.data);
            return jsonResponse({ ...result.data, source: 'piped' });
        }

        // No captions found - return empty but valid response
        log('All strategies failed to get caption content');
        return jsonResponse({
            videoDetails: result.data?.videoDetails || { videoId },
            captions: { playerCaptionsTracklistRenderer: { captionTracks: [] } },
            source: 'none'
        });

    } catch (error) {
        console.error('[Innertube] Error:', error.message);
        return errorResponse(error.message);
    }
}

/**
 * Cache successful results
 */
async function cacheResult(cache, key, data) {
    if (!cache) return;
    try {
        await cache.put(key, JSON.stringify(data), { expirationTtl: 60 * 60 * 24 });
        log('Cached result');
    } catch (e) {
        log('Cache write error:', e.message);
    }
}

/**
 * Strategy 1: Innertube API with immediate content fetch
 * Tries multiple client configurations and fetches content immediately
 */
async function tryInnertubeWithContent(videoId) {
    const clientConfigs = [
        // iOS client - often works best for captions
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
        // Android client
        {
            clientName: 'ANDROID',
            clientVersion: '19.44.38',
            androidSdkVersion: 34,
            osName: 'Android',
            osVersion: '14',
            userAgent: 'com.google.android.youtube/19.44.38 (Linux; U; Android 14; en_US; sdk_gphone64_x86_64 Build/UE1A.230829.036.A1) gzip',
            clientId: '3'
        },
        // Web client
        {
            clientName: 'WEB',
            clientVersion: '2.20241220.00.00',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            clientId: '1'
        },
        // TV embedded client
        {
            clientName: 'TVHTML5_SIMPLY_EMBEDDED_PLAYER',
            clientVersion: '2.0',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            clientId: '85'
        }
    ];

    let bestData = null;

    for (const config of clientConfigs) {
        try {
            log('Trying client:', config.clientName);

            const requestBody = {
                context: {
                    client: {
                        clientName: config.clientName,
                        clientVersion: config.clientVersion,
                        ...(config.deviceMake && { deviceMake: config.deviceMake }),
                        ...(config.deviceModel && { deviceModel: config.deviceModel }),
                        ...(config.osName && { osName: config.osName }),
                        ...(config.osVersion && { osVersion: config.osVersion }),
                        ...(config.androidSdkVersion && { androidSdkVersion: config.androidSdkVersion }),
                        hl: 'en',
                        gl: 'US'
                    }
                },
                videoId: videoId,
                contentCheckOk: true,
                racyCheckOk: true
            };

            const response = await fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
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
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                log('Client', config.clientName, 'returned status:', response.status);
                continue;
            }

            const data = await response.json();

            // Save this data if it has video details, as a fallback
            if (data?.videoDetails) {
                bestData = data;
            }

            const captionTracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

            if (!captionTracks || captionTracks.length === 0) {
                log('Client', config.clientName, '- no captions, hasVideo:', !!data?.videoDetails);
                if (data?.captions) {
                    log('Client', config.clientName, '- captions object keys:', Object.keys(data.captions));
                }
                // Continue to next client even if video found, because maybe another client sees captions
                continue;
            }

            log('Client', config.clientName, '- found', captionTracks.length, 'caption tracks');

            // IMMEDIATELY fetch caption content while URLs are still valid
            const contentResults = await fetchAllCaptionContent(captionTracks, config.userAgent);

            // Check if we got any content
            const tracksWithContent = captionTracks.filter(t => t.content && t.content.length > 0);
            log('Tracks with content:', tracksWithContent.length, '/', captionTracks.length);

            if (tracksWithContent.length > 0) {
                return { success: true, hasContent: true, data };
            }

            // Got tracks but no content - try next client
            log('Client', config.clientName, '- failed to fetch content');

        } catch (error) {
            log('Client', config.clientName, 'error:', error.message);
        }
    }

    // If we have valid video data but no captions after all retries
    if (bestData) {
        return { success: true, hasContent: false, data: bestData };
    }

    return { success: false, hasContent: false, data: {} };
}

/**
 * Strategy 2: Watch page scrape with immediate content fetch
 */
async function tryWatchPageWithContent(videoId) {
    try {
        const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

        const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
            headers: {
                'User-Agent': userAgent,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'identity'
            }
        });

        if (!response.ok) {
            return { success: false, hasContent: false, data: {} };
        }

        const html = await response.text();
        const data = extractPlayerResponse(html);

        if (!data) {
            return { success: false, hasContent: false, data: {} };
        }

        const captionTracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

        if (!captionTracks || captionTracks.length === 0) {
            return { success: true, hasContent: false, data };
        }

        log('Scrape found', captionTracks.length, 'caption tracks');

        // IMMEDIATELY fetch caption content
        await fetchAllCaptionContent(captionTracks, userAgent);

        const tracksWithContent = captionTracks.filter(t => t.content && t.content.length > 0);
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

/**
 * Extract ytInitialPlayerResponse from watch page HTML
 */
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
                    } catch (e) {
                        return null;
                    }
                }
            }
        }
    }
    return null;
}

/**
 * Fetch caption content for all tracks in parallel
 * This must happen IMMEDIATELY after getting URLs to avoid signature expiration
 */
async function fetchAllCaptionContent(captionTracks, userAgent) {
    const fetchPromises = captionTracks.map(async (track) => {
        try {
            const content = await fetchCaptionContentWithRetry(track.baseUrl, userAgent);
            track.content = content;
        } catch (e) {
            log('Failed to fetch content for', track.languageCode, ':', e.message);
            track.content = null;
        }
    });

    await Promise.all(fetchPromises);
}

/**
 * Fetch caption content with retry and multiple format attempts
 */
async function fetchCaptionContentWithRetry(baseUrl, userAgent, retries = 2) {
    // Try different formats - JSON3 is preferred, but XML works too
    const formats = ['json3', 'srv3', 'vtt'];

    for (const format of formats) {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                let url = baseUrl;

                // Add or replace format
                if (url.includes('fmt=')) {
                    url = url.replace(/fmt=[^&]+/, `fmt=${format}`);
                } else {
                    url += `&fmt=${format}`;
                }

                const response = await fetch(url, {
                    headers: {
                        'User-Agent': userAgent,
                        'Accept': '*/*',
                        'Accept-Language': 'en-US,en;q=0.9',
                        'Referer': 'https://www.youtube.com/'
                    }
                });

                if (!response.ok) {
                    if (attempt < retries) {
                        await new Promise(r => setTimeout(r, 100 * (attempt + 1)));
                        continue;
                    }
                    continue; // Try next format
                }

                const text = await response.text();

                // Validate response
                if (text.length < 10 || text === '1' || text.includes('404')) {
                    continue; // Try next format
                }

                // Parse based on format
                const segments = parseCaption(text, format);

                if (segments && segments.length > 0) {
                    log(`Fetched ${segments.length} segments using ${format} format`);
                    return segments;
                }

            } catch (e) {
                if (attempt < retries) {
                    await new Promise(r => setTimeout(r, 100 * (attempt + 1)));
                }
            }
        }
    }

    return null;
}

/**
 * Parse caption content based on format
 */
function parseCaption(text, format) {
    if (format === 'json3' || (text.startsWith('{') && text.includes('"events"'))) {
        return parseJSON3(text);
    } else if (format === 'srv3' || text.includes('<?xml') || text.includes('<text start=')) {
        return parseXML(text);
    } else if (format === 'vtt' || text.includes('WEBVTT')) {
        return parseVTT(text);
    }

    // Try all parsers as fallback
    let result = parseJSON3(text);
    if (result && result.length > 0) return result;

    result = parseXML(text);
    if (result && result.length > 0) return result;

    return parseVTT(text);
}

/**
 * Parse YouTube JSON3 format
 */
function parseJSON3(text) {
    try {
        const parsed = JSON.parse(text);
        const events = parsed.events || [];
        const segments = [];

        for (const event of events) {
            if (!event.segs) continue;

            const segmentText = event.segs.map(seg => seg.utf8 || '').join('');
            if (segmentText.trim()) {
                segments.push({
                    text: decodeHtmlEntities(segmentText.trim()),
                    start: (event.tStartMs || 0) / 1000,
                    duration: (event.dDurationMs || 0) / 1000
                });
            }
        }

        return segments;
    } catch (e) {
        return null;
    }
}

/**
 * Parse XML format
 */
function parseXML(text) {
    const segments = [];
    const regex = /<text start="([^"]+)" dur="([^"]+)"[^>]*>([^<]*)<\/text>/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        const start = parseFloat(match[1]);
        const duration = parseFloat(match[2]);
        const segmentText = decodeHtmlEntities(match[3]);

        if (segmentText.trim()) {
            segments.push({ text: segmentText.trim(), start, duration });
        }
    }

    return segments;
}

/**
 * Parse WebVTT format
 */
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
            while (i < lines.length && lines[i].trim() !== '' && !lines[i].match(/-->/)) {
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
    const parts = time.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const secondsParts = parts[2].split('.');
    const seconds = parseInt(secondsParts[0], 10);
    const milliseconds = parseInt(secondsParts[1], 10);
    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
}

/**
 * Strategy 3: Third-party APIs (Piped/Invidious)
 * These services handle content fetching internally, avoiding signature issues
 * 
 * 2025 Update: We use a "Shotgun Strategy" - trying multiple high-uptime instances.
 * Public instances often block bots, so we need a diverse list.
 * 
 * PERFORMANCE FIX: Requests are now parallelized. The first one to return valid captions wins.
 */
async function tryThirdPartyAPIs(videoId) {
    const apis = [
        // Flagship / Most Stable Instances (Priority)
        { url: `https://yewtu.be/api/v1/captions/${videoId}`, name: 'yewtu.be (Europe)', type: 'invidious' },
        { url: `https://api.piped.video/streams/${videoId}`, name: 'piped.video (Official)', type: 'piped' },
        { url: `https://vid.puffyan.us/api/v1/captions/${videoId}`, name: 'puffyan (US)', type: 'invidious' },
        { url: `https://pipedapi.kavin.rocks/streams/${videoId}`, name: 'kavin.rocks (India)', type: 'piped' },

        // Reliable Backups
        { url: `https://inv.tux.pizza/api/v1/captions/${videoId}`, name: 'tux.pizza', type: 'invidious' },
        { url: `https://pipedapi.drg.li/streams/${videoId}`, name: 'drg.li (Piped)', type: 'piped' },
        { url: `https://invidious.drg.li/api/v1/captions/${videoId}`, name: 'drg.li (Invidious)', type: 'invidious' },
        { url: `https://invidious.nerdvpn.de/api/v1/captions/${videoId}`, name: 'nerdvpn', type: 'invidious' },

        // Deep Reserves
        { url: `https://api.piped.privacydev.net/streams/${videoId}`, name: 'privacydev', type: 'piped' },
        { url: `https://pipedapi.adminforge.de/streams/${videoId}`, name: 'adminforge', type: 'piped' }
    ];

    // Helper to process a single API
    const checkApi = async (api) => {
        try {
            log('Starting check for', api.name);
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s max per request

            const response = await fetch(api.url, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) throw new Error(`Status ${response.status}`);

            const data = await response.json();
            const captionTracks = [];

            // Handle Piped Response
            if (api.type === 'piped') {
                if (!data.subtitles || data.subtitles.length === 0) throw new Error('No subtitles');

                // log(api.name, '- found', data.subtitles.length, 'subtitles');

                // Piped: Fetch content for the first available track to verify it works
                // We don't need to fetch ALL tracks to prove the API works, but we should try to grab at least one
                // to match the "content pre-fetch" architecture.

                // Optimization: Fetch all tracks in parallel
                const validTracks = await Promise.all(data.subtitles.map(async (sub) => {
                    try {
                        const content = await fetchThirdPartyContent(sub.url);
                        if (content && content.length > 0) {
                            return {
                                baseUrl: sub.url,
                                languageCode: sub.code,
                                name: { simpleText: sub.name || sub.code },
                                content: content
                            };
                        }
                    } catch (e) { return null; }
                }));

                captionTracks.push(...validTracks.filter(t => t));

            }
            // Handle Invidious Response
            else if (api.type === 'invidious') {
                const captions = Array.isArray(data.captions) ? data.captions : (Array.isArray(data) ? data : []);
                if (captions.length === 0) throw new Error('No subtitles');

                // log(api.name, '- found', captions.length, 'subtitles');

                const instanceUrl = new URL(api.url).origin;

                const validTracks = await Promise.all(captions.map(async (sub) => {
                    try {
                        const fullUrl = sub.url.startsWith('http') ? sub.url : `${instanceUrl}${sub.url}`;
                        const content = await fetchThirdPartyContent(fullUrl);
                        if (content && content.length > 0) {
                            return {
                                baseUrl: fullUrl,
                                languageCode: sub.languageCode || sub.label,
                                name: { simpleText: sub.label || sub.languageCode },
                                content: content
                            };
                        }
                    } catch (e) { return null; }
                }));

                captionTracks.push(...validTracks.filter(t => t));
            }

            if (captionTracks.length > 0) {
                log('Dynamic Win:', api.name);
                return {
                    success: true,
                    hasContent: true,
                    data: {
                        captions: {
                            playerCaptionsTracklistRenderer: {
                                captionTracks: captionTracks
                            }
                        },
                        videoDetails: {
                            title: data.title || 'Unknown Title',
                            author: data.uploader || data.author || 'Unknown Author',
                            videoId: videoId
                        }
                    }
                };
            }

            throw new Error('No valid content found');

        } catch (error) {
            // log(api.name, 'failed:', error.message);
            throw error;
        }
    };

    // Run all checks in parallel and return the first success
    // We map each promise to invert rejection so Promise.any logic applies correctly
    // or simply use Promise.any if available (Cloudflare support newer JS)

    try {
        // We limit concurrency slightly or just blast them all? 10 requests is fine for CF.
        const result = await Promise.any(apis.map(api => checkApi(api)));
        return result;
    } catch (aggregateError) {
        log('All third-party APIs failed');
        return { success: false, hasContent: false, data: {} };
    }
}

/**
 * Helper to fetch content from third-party URL
 */
async function fetchThirdPartyContent(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(url, {
            headers: { 'Accept': '*/*' },
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
            const text = await response.text();
            // Piped/Invidious usually return VTT
            return parseCaption(text, 'vtt');
        }
        return null;
    } catch (e) {
        return null;
    }
}

/**
 * Decode HTML entities
 */
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