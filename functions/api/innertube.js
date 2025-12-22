/**
 * YouTube Innertube Proxy (Cloudflare Function)
 * Fetches captions with parallel fallback strategies
 * 
 * Updated: December 2024 - Fixed client configuration for YouTube API changes
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';

const DEBUG = true; // Enable debug logging to diagnose issues

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

        log('Received request for videoId:', videoId);

        // Validate video ID
        if (!validateVideoId(videoId)) {
            log('Invalid videoId:', videoId);
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
                log('Cache read error:', e.message);
            }
        }

        // Strategy 1: Try innertube API first (with multiple client configs)
        log('Strategy 1: Trying innertube API');
        let data = await tryInnertubeAPI(videoId);
        let source = 'innertube';

        // Check if we got captions
        let hasCaptions = !!data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        log('Innertube result - hasCaptions:', hasCaptions, 'hasVideoDetails:', !!data?.videoDetails);

        // Strategy 2 & 3: If no captions, run fallbacks in parallel
        if (!hasCaptions) {
            log('Innertube failed or no captions, trying fallbacks in parallel');

            const results = await Promise.allSettled([
                tryWatchPageScrape(videoId),
                tryThirdPartyAPI(videoId)
            ]);

            // Find first successful result with captions
            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                if (result.status === 'fulfilled' &&
                    result.value?.captions?.playerCaptionsTracklistRenderer?.captionTracks) {
                    data = result.value;
                    hasCaptions = true;
                    source = i === 0 ? 'scrape' : 'piped';
                    log('Fallback success, source:', source);
                    break;
                }
            }
        }

        if (!hasCaptions) {
            log('All strategies failed to find captions');
        }

        // Cache successful responses with captions (24 hour TTL)
        if (data?.captions?.playerCaptionsTracklistRenderer?.captionTracks && CAPTION_CACHE) {
            try {
                await CAPTION_CACHE.put(cacheKey, JSON.stringify(data), { expirationTtl: 60 * 60 * 24 });
                log('Cached result for', videoId);
            } catch (e) {
                log('Cache write error:', e.message);
            }
        }

        return jsonResponse({ ...data, source });

    } catch (error) {
        console.error('[Innertube] Error:', error.message);
        return errorResponse(error.message);
    }
}

// Strategy 1: Direct innertube API with multiple client configurations
async function tryInnertubeAPI(videoId) {
    // Try multiple client configurations - YouTube frequently changes what works
    const clientConfigs = [
        // iOS client - often works best for captions
        {
            clientName: 'IOS',
            clientVersion: '19.45.4',
            deviceMake: 'Apple',
            deviceModel: 'iPhone16,2',
            osName: 'iOS',
            osVersion: '18.1.0.22B83',
            userAgent: 'com.google.ios.youtube/19.45.4 (iPhone16,2; U; CPU iOS 18_1_0 like Mac OS X;)'
        },
        // Android client
        {
            clientName: 'ANDROID',
            clientVersion: '19.44.38',
            androidSdkVersion: 34,
            osName: 'Android',
            osVersion: '14',
            userAgent: 'com.google.android.youtube/19.44.38 (Linux; U; Android 14; en_US; sdk_gphone64_x86_64 Build/UE1A.230829.036.A1) gzip'
        },
        // Web client (fallback)
        {
            clientName: 'WEB',
            clientVersion: '2.20241210.01.00',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        },
        // TV embedded client
        {
            clientName: 'TVHTML5_SIMPLY_EMBEDDED_PLAYER',
            clientVersion: '2.0',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }
    ];

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
                    'X-Youtube-Client-Name': config.clientName === 'WEB' ? '1' :
                        config.clientName === 'ANDROID' ? '3' :
                            config.clientName === 'IOS' ? '5' : '85',
                    'X-Youtube-Client-Version': config.clientVersion
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                log('Client', config.clientName, 'returned status:', response.status);
                continue;
            }

            const data = await response.json();

            // Check if this client got us captions
            const hasCaptions = !!data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
            const hasVideo = !!data?.videoDetails;

            log('Client', config.clientName, '- hasCaptions:', hasCaptions, 'hasVideo:', hasVideo);

            if (hasCaptions) {
                log('Success with client:', config.clientName);
                return data;
            }

            // If we got video details but no captions, the video might just not have captions
            if (hasVideo && !hasCaptions) {
                log('Video found but no captions available');
                return data; // Return this so we know the video exists
            }

        } catch (error) {
            log('Client', config.clientName, 'error:', error.message);
        }
    }

    log('All innertube clients failed');
    return {};
}

// Strategy 2: Scrape watch page for ytInitialPlayerResponse
async function tryWatchPageScrape(videoId) {
    try {
        log('Trying watch page scrape for:', videoId);

        const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'identity'
            }
        });

        if (!response.ok) {
            log('Watch page returned status:', response.status);
            return {};
        }

        const html = await response.text();
        log('Watch page HTML length:', html.length);

        // Try to extract ytInitialPlayerResponse using balanced brace matching
        const jsonStr = extractJSON(html, 0);
        if (jsonStr) {
            try {
                const data = JSON.parse(jsonStr);
                const hasCaptions = !!data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
                log('Scrape found player response, hasCaptions:', hasCaptions);
                return data;
            } catch (e) {
                log('JSON parse error:', e.message);
            }
        }

        // Fallback: Try to extract just the caption tracks using regex
        const captionMatch = html.match(/"captionTracks":\s*(\[[\s\S]*?\])/);
        if (captionMatch) {
            try {
                const captionTracks = JSON.parse(captionMatch[1]);
                log('Regex found caption tracks:', captionTracks.length);
                return {
                    captions: {
                        playerCaptionsTracklistRenderer: {
                            captionTracks: captionTracks
                        }
                    }
                };
            } catch (e) {
                log('Caption tracks regex parse error:', e.message);
            }
        }

        log('No player response found in HTML');
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
        `https://api.piped.yt/streams/${videoId}`,
        `https://pipedapi.in.projectsegfau.lt/streams/${videoId}`
    ];

    for (const apiUrl of apis) {
        try {
            log('Trying third-party API:', apiUrl);

            const response = await fetch(apiUrl, {
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                signal: AbortSignal.timeout(5000) // 5 second timeout
            });

            if (!response.ok) {
                log('Third-party API returned status:', response.status);
                continue;
            }

            const data = await response.json();

            // Convert Piped format to innertube format
            if (data.subtitles && data.subtitles.length > 0) {
                log('Third-party API found subtitles:', data.subtitles.length);
                return {
                    captions: {
                        playerCaptionsTracklistRenderer: {
                            captionTracks: data.subtitles.map(sub => ({
                                baseUrl: sub.url,
                                languageCode: sub.code,
                                name: { simpleText: sub.name || sub.code }
                            }))
                        }
                    },
                    videoDetails: {
                        title: data.title,
                        author: data.uploader
                    }
                };
            }

            log('Third-party API returned no subtitles');
        } catch (error) {
            log('Third-party API error:', error.message);
        }
    }

    return {};
}