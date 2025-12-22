/**
 * YouTube Innertube Proxy (Cloudflare Function)
 * Fetches captions with parallel fallback strategies
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';

const DEBUG = false;

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

        // Validate video ID
        if (!validateVideoId(videoId)) {
            return jsonResponse({ error: 'Invalid or missing videoId' }, 400);
        }

        const cacheKey = `captions:${videoId}`;

        // Check cache first
        if (CAPTION_CACHE) {
            try {
                const cached = await CAPTION_CACHE.get(cacheKey, 'json');
                if (cached) {
                    log('Cache hit for', videoId);
                    return jsonResponse({ ...cached, source: 'cache' });
                }
            } catch (e) {
                // Cache read failed, continue with fetch
            }
        }

        // Strategy 1: Try innertube API first
        let data = await tryInnertubeAPI(body);
        let source = 'innertube';

        // Check if we got captions
        let hasCaptions = !!data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

        // Strategy 2 & 3: If no captions, run fallbacks in parallel
        if (!hasCaptions) {
            log('Innertube failed, trying fallbacks in parallel');

            const results = await Promise.allSettled([
                tryWatchPageScrape(videoId),
                tryThirdPartyAPI(videoId)
            ]);

            // Find first successful result with captions
            for (const result of results) {
                if (result.status === 'fulfilled' &&
                    result.value?.captions?.playerCaptionsTracklistRenderer?.captionTracks) {
                    data = result.value;
                    hasCaptions = true;
                    source = result === results[0] ? 'scrape' : 'piped';
                    break;
                }
            }
        }

        // Cache successful responses with captions (24 hour TTL)
        if (data?.captions?.playerCaptionsTracklistRenderer?.captionTracks && CAPTION_CACHE) {
            try {
                await CAPTION_CACHE.put(cacheKey, JSON.stringify(data), { expirationTtl: 60 * 60 * 24 });
            } catch (e) {
                // Cache write failed, continue
            }
        }

        return jsonResponse({ ...data, source });

    } catch (error) {
        console.error('[Innertube] Error:', error.message);
        return errorResponse(error.message);
    }
}

// Strategy 1: Direct innertube API
async function tryInnertubeAPI(body) {
    try {
        const response = await fetch('https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Origin': 'https://www.youtube.com',
                'Referer': 'https://www.youtube.com/'
            },
            body: JSON.stringify(body)
        });
        return await response.json();
    } catch (error) {
        log('Innertube API error:', error.message);
        return {};
    }
}

// Strategy 2: Scrape watch page for ytInitialPlayerResponse
async function tryWatchPageScrape(videoId) {
    try {
        const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'identity'
            }
        });

        const html = await response.text();

        // Try to extract ytInitialPlayerResponse using balanced brace matching
        const jsonStr = extractJSON(html, 0);
        if (jsonStr) {
            return JSON.parse(jsonStr);
        }

        // Fallback: Try to extract just the caption tracks using regex
        const captionMatch = html.match(/"captionTracks":\s*(\[[\s\S]*?\])/);
        if (captionMatch) {
            try {
                const captionTracks = JSON.parse(captionMatch[1]);
                return {
                    captions: {
                        playerCaptionsTracklistRenderer: {
                            captionTracks: captionTracks
                        }
                    }
                };
            } catch (e) {
                // Regex parse failed
            }
        }

        return {};
    } catch (error) {
        log('Watch page scrape error:', error.message);
        return {};
    }
}

// Helper to extract balanced JSON from HTML
function extractJSON(html, startSearchIndex) {
    const marker = 'ytInitialPlayerResponse = ';
    const startIndex = html.indexOf(marker, startSearchIndex);
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
                    return html.substring(jsonStart, i + 1);
                }
            }
        }
    }
    return null;
}

// Strategy 3: Use third-party caption API (Piped/Invidious)
async function tryThirdPartyAPI(videoId) {
    const apis = [
        `https://pipedapi.kavin.rocks/streams/${videoId}`,
        `https://api.piped.yt/streams/${videoId}`
    ];

    for (const apiUrl of apis) {
        try {
            const response = await fetch(apiUrl, {
                headers: { 'Accept': 'application/json' }
            });

            if (!response.ok) continue;

            const data = await response.json();

            // Convert Piped format to innertube format
            if (data.subtitles && data.subtitles.length > 0) {
                return {
                    captions: {
                        playerCaptionsTracklistRenderer: {
                            captionTracks: data.subtitles.map(sub => ({
                                baseUrl: sub.url,
                                languageCode: sub.code,
                                name: { simpleText: sub.name || sub.code }
                            }))
                        }
                    }
                };
            }
        } catch (error) {
            // Continue to next API
        }
    }

    return {};
}
