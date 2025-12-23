/**
 * YouTube Transcript Proxy (Cloudflare Function)
 *
 * Hybrid fallback strategy for speed + reliability:
 *   1. Cache (instant)
 *   2. Race YouTube sources in parallel (Innertube + scrape + youtube-caption-extractor)
 *   3. Parallel third-party fallback
 *
 * @version 7.0.0
 * @updated 2025-12
 */

import { jsonResponse, handleOptions, errorResponse, validateVideoId } from '../_shared/utils.js';
import { cleanTranscriptSegments } from '../_shared/transcript-utils.js';
import { getSubtitles, getVideoDetails } from 'youtube-caption-extractor';

// ============================================================================
// Configuration
// ============================================================================

const DEBUG = true;
const CACHE_TTL = 60 * 60 * 24 * 30; // 30 days
const DEFAULT_TARGET_LANGS = ['ja', 'zh', 'ko', 'en'];

const TIMEOUTS = {
    youtube: 6000,   // Innertube + scrape (slightly increased for reliability)
    thirdParty: 4000, // Per-API timeout for racing
    caption: 2500    // Individual caption fetch
};

// Ordered by reliability for captions
const INNERTUBE_CLIENTS = [
    {
        name: 'WEB',
        clientName: 'WEB',
        clientVersion: '2.20241220.00.00',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        clientId: '1'
    },
    {
        name: 'ANDROID_MUSIC',
        clientName: 'ANDROID_MUSIC',
        clientVersion: '7.27.52',
        userAgent: 'com.google.android.apps.youtube.music/7.27.52 (Linux; U; Android 14; Pixel 8 Pro)',
        clientId: '21'
    },
    {
        name: 'TVHTML5_SIMPLY',
        clientName: 'TVHTML5_SIMPLY',
        clientVersion: '1.0',
        userAgent: 'Mozilla/5.0 (ChromiumStylePlatform) Cobalt/Version',
        clientId: '85'
    }
];

// Third-party fallback - raced in parallel
// Note: All Invidious instances have api:false as of Dec 2024, use Piped only
const THIRD_PARTY_APIS = [
    { url: 'https://pipedapi.kavin.rocks/streams/', name: 'piped-kavin', type: 'piped' },
    { url: 'https://api.piped.otter.sh/streams/', name: 'piped-otter', type: 'piped' },
    { url: 'https://pipedapi.drgns.space/streams/', name: 'piped-drgns', type: 'piped' },
    { url: 'https://pipedapi.tokhmi.xyz/streams/', name: 'piped-tokhmi', type: 'piped' },
    { url: 'https://pipedapi.moomoo.me/streams/', name: 'piped-moomoo', type: 'piped' },
    { url: 'https://pipedapi.syncpundit.io/streams/', name: 'piped-syncpundit', type: 'piped' }
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
        const cacheKey = `captions:v6:${videoId}`;

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
        // Tier 2: Parallel third-party fallback
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
        // Tier 3: Apify fallback (proxy-based, uses credits)
        // =====================================================================
        const apifyApiKey = env.APIFY_API_KEY;
        if (apifyApiKey) {
            try {
                const apifyResult = await tryApifyTranscript(videoId, targetLanguages, apifyApiKey);
                if (apifyResult.success) {
                    log(`Apify success (${timer()}ms)`);
                    if (apifyResult.hasContent && cache && !metadataOnly) {
                        cacheResult(cache, cacheKey, apifyResult);
                    }
                    return jsonResponse({
                        ...apifyResult,
                        source: 'apify',
                        timing: timer()
                    });
                }
            } catch (apifyError) {
                log('Apify failed:', apifyError.message);
            }
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
        // youtube-caption-extractor package (designed for CF Workers)
        tryYoutubeCaptionExtractor(videoId, targetLanguages)
            .then(r => ({ ...r, source: 'youtube-caption-extractor' }))
            .catch(e => ({ success: false, error: e.message })),
        // Engagement panel transcript (mimics YouTube website behavior)
        tryEngagementPanelTranscript(videoId, apiKey, targetLanguages, signal)
            .then(r => ({ ...r, source: 'engagement_panel' }))
            .catch(e => ({ success: false, error: e.message })),
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

        // Log all errors for debugging
        const errors = aggregateError.errors || [aggregateError];
        log('YouTube strategies failed:', errors.map(e => e?.error || e?.message || 'unknown'));

        // Check if any error was age-restriction
        const ageRestricted = errors.some(e => e?.error === 'Age-restricted' || e?.ageRestricted);

        return { success: false, ageRestricted };
    }
}

// ============================================================================
// Tier 2: Third-Party Sources (raced in parallel)
// ============================================================================

async function tryThirdPartySources(videoId, targetLanguages, metadataOnly) {
    const controller = new AbortController();
    const { signal } = controller;

    // Race all third-party APIs in parallel
    const promises = THIRD_PARTY_APIS.map(api =>
        tryThirdPartyAPI(videoId, api, targetLanguages, metadataOnly, signal)
            .then(r => ({ ...r, source: `thirdparty:${api.name}` }))
            .catch(e => ({ success: false, error: `${api.name}: ${e.message}` }))
    );

    // Set overall timeout for third-party phase
    const timeoutPromise = new Promise(resolve => {
        setTimeout(() => resolve({ success: false, timeout: true }), TIMEOUTS.thirdParty);
    });

    try {
        const result = await Promise.any([
            ...promises.map(p => p.then(r => {
                if (r.success) return r;
                throw r; // Convert failure to rejection for Promise.any
            })),
            timeoutPromise.then(() => { throw { timeout: true }; })
        ]);

        controller.abort(); // Cancel other pending requests
        return result;

    } catch (aggregateError) {
        controller.abort();
        const errors = aggregateError.errors || [];
        log('Third-party strategies failed:', errors.map(e => e?.error || 'unknown'));
        return { success: false };
    }
}

// ============================================================================
// Tier 3: Apify YouTube Transcript Actor (proxy-based, high reliability)
// ============================================================================

async function tryApifyTranscript(videoId, targetLanguages, apifyApiKey) {
    if (!apifyApiKey) {
        throw new Error('APIFY_API_KEY not configured');
    }

    log('Apify: starting transcript extraction');

    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

    // Use synchronous actor run with 25s timeout (CF limit is 30s)
    const response = await fetch(
        `https://api.apify.com/v2/acts/karamelo~youtube-transcripts/run-sync-get-dataset-items?token=${apifyApiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                urls: [youtubeUrl],
                outputFormat: 'with_timestamps',  // Get {start, end, text}
                retries: 2
            })
        }
    );

    if (!response.ok) {
        throw new Error(`Apify API failed: HTTP ${response.status}`);
    }

    const results = await response.json();

    if (!results || results.length === 0) {
        throw new Error('Apify returned empty results');
    }

    const result = results[0];

    if (!result.captions || result.captions.length === 0) {
        throw new Error('Apify: no captions in result');
    }

    log(`Apify: found ${result.captions.length} captions`);

    // Convert Apify format to our format
    const cues = result.captions.map((cap, index) => ({
        id: index,
        start: cap.start || 0,
        duration: (cap.end || cap.start + 2) - (cap.start || 0),
        text: (cap.text || '').replace(/<[^>]*>/g, '').trim()  // Strip HTML tags
    })).filter(cue => cue.text.length > 0);

    const cleanedCues = cleanTranscriptSegments(cues);

    return {
        success: true,
        hasContent: true,
        captions: {
            playerCaptionsTracklistRenderer: {
                captionTracks: [{
                    languageCode: targetLanguages[0] || 'en',
                    content: cleanedCues
                }]
            }
        },
        cues: cleanedCues,
        totalCues: cleanedCues.length
    };
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
            log(`${client.name}: No caption tracks returned`);
            throw new Error('No captions');
        }

        log(`${client.name}: Found ${captionTracks.length} caption tracks:`, captionTracks.map(t => t.languageCode));

        const filteredTracks = filterTracksByLanguage(captionTracks, targetLanguages);
        if (!filteredTracks.length) {
            log(`${client.name}: No tracks match target languages`, targetLanguages);
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

        const filteredTracks = filterTracksByLanguage(captionTracks, targetLanguages);
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

// ============================================================================
// youtube-caption-extractor npm package (designed for Cloudflare Workers)
// ============================================================================

async function tryYoutubeCaptionExtractor(videoId, targetLanguages) {
    log('youtube-caption-extractor: starting');

    // Try each target language
    for (const lang of targetLanguages) {
        try {
            const subtitles = await getSubtitles({ videoID: videoId, lang });

            if (subtitles && subtitles.length > 0) {
                log(`youtube-caption-extractor: found ${subtitles.length} subtitles for ${lang}`);

                // Convert to our format
                const cues = subtitles.map((sub, index) => ({
                    id: index,
                    start: parseFloat(sub.start),
                    duration: parseFloat(sub.dur),
                    text: sub.text.trim()
                })).filter(cue => cue.text.length > 0);

                const cleanedCues = cleanTranscriptSegments(cues);

                return {
                    success: true,
                    hasContent: true,
                    captions: {
                        playerCaptionsTracklistRenderer: {
                            captionTracks: [{
                                languageCode: lang,
                                content: cleanedCues
                            }]
                        }
                    },
                    cues: cleanedCues,
                    totalCues: cleanedCues.length
                };
            }
        } catch (err) {
            log(`youtube-caption-extractor: ${lang} failed:`, err.message);
        }
    }

    throw new Error('No subtitles found with youtube-caption-extractor');
}

// ============================================================================
// Engagement Panel Transcript (mimics YouTube website behavior)
// Uses /next + /get_transcript endpoints which may bypass bot detection
// ============================================================================

async function tryEngagementPanelTranscript(videoId, apiKey, targetLanguages, masterSignal) {
    const controller = new AbortController();
    const cleanup = linkAbortSignals(masterSignal, controller);

    const client = {
        clientName: 'WEB',
        clientVersion: '2.20250222.10.00',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    };

    const visitorData = generateVisitorData();

    try {
        // Step 1: Call /next endpoint to get engagement panels
        log('Engagement panel: calling /next endpoint');
        const nextResponse = await fetch(
            `https://www.youtube.com/youtubei/v1/next?key=${apiKey}&prettyPrint=false`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': client.userAgent,
                    'X-Youtube-Client-Version': client.clientVersion,
                    'X-Youtube-Client-Name': '1',
                    'X-Goog-Visitor-Id': visitorData,
                    'Origin': 'https://www.youtube.com',
                    'Referer': 'https://www.youtube.com/'
                },
                body: JSON.stringify({
                    context: {
                        client: {
                            clientName: client.clientName,
                            clientVersion: client.clientVersion,
                            hl: 'en',
                            gl: 'US',
                            visitorData
                        }
                    },
                    videoId
                }),
                signal: controller.signal
            }
        );

        if (!nextResponse.ok) {
            throw new Error(`/next failed: HTTP ${nextResponse.status}`);
        }

        const nextData = await nextResponse.json();

        // Step 2: Find transcript engagement panel
        const engagementPanels = nextData.engagementPanels || [];
        const transcriptPanel = engagementPanels.find(panel =>
            panel?.engagementPanelSectionListRenderer?.panelIdentifier ===
            'engagement-panel-searchable-transcript'
        );

        if (!transcriptPanel) {
            throw new Error('No transcript panel found');
        }

        log('Engagement panel: found transcript panel');

        // Step 3: Extract continuation token
        const content = transcriptPanel.engagementPanelSectionListRenderer?.content;
        let continuationToken = null;

        // Try multiple extraction methods
        const continuationItem = content?.continuationItemRenderer;
        if (continuationItem?.continuationEndpoint?.getTranscriptEndpoint?.params) {
            continuationToken = continuationItem.continuationEndpoint.getTranscriptEndpoint.params;
        } else if (continuationItem?.continuationEndpoint?.continuationCommand?.token) {
            continuationToken = continuationItem.continuationEndpoint.continuationCommand.token;
        }

        // Try in sectionListRenderer
        if (!continuationToken && content?.sectionListRenderer?.contents) {
            for (const item of content.sectionListRenderer.contents) {
                if (item?.transcriptRenderer?.footer?.transcriptFooterRenderer?.languageMenu) {
                    const menuItems = item.transcriptRenderer.footer.transcriptFooterRenderer
                        .languageMenu.sortFilterSubMenuRenderer?.subMenuItems || [];

                    // Find target language or first available
                    const targets = targetLanguages.map(t => t.toLowerCase());
                    const langItem = menuItems.find(mi =>
                        targets.some(t => mi?.title?.toLowerCase().includes(t))
                    ) || menuItems.find(mi => mi?.selected) || menuItems[0];

                    if (langItem?.continuation?.reloadContinuationData?.continuation) {
                        continuationToken = langItem.continuation.reloadContinuationData.continuation;
                        break;
                    }
                }
            }
        }

        if (!continuationToken) {
            throw new Error('No continuation token found');
        }

        log('Engagement panel: calling /get_transcript');

        // Step 4: Call /get_transcript endpoint
        const transcriptResponse = await fetch(
            `https://www.youtube.com/youtubei/v1/get_transcript?key=${apiKey}&prettyPrint=false`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': client.userAgent,
                    'X-Youtube-Client-Version': client.clientVersion,
                    'X-Youtube-Client-Name': '1',
                    'Origin': 'https://www.youtube.com',
                    'Referer': 'https://www.youtube.com/'
                },
                body: JSON.stringify({
                    context: {
                        client: {
                            clientName: client.clientName,
                            clientVersion: client.clientVersion,
                            hl: 'en',
                            gl: 'US',
                            visitorData
                        }
                    },
                    params: continuationToken
                }),
                signal: controller.signal
            }
        );

        if (!transcriptResponse.ok) {
            throw new Error(`/get_transcript failed: HTTP ${transcriptResponse.status}`);
        }

        const transcriptData = await transcriptResponse.json();

        // Step 5: Parse transcript segments
        const segments = transcriptData?.actions?.[0]?.updateEngagementPanelAction?.content
            ?.transcriptRenderer?.content?.transcriptSearchPanelRenderer?.body
            ?.transcriptSegmentListRenderer?.initialSegments;

        if (!segments?.length) {
            throw new Error('No transcript segments found');
        }

        log(`Engagement panel: found ${segments.length} segments`);

        // Convert to our format
        const cues = segments
            .filter(seg => seg.transcriptSegmentRenderer)
            .map((seg, index) => {
                const renderer = seg.transcriptSegmentRenderer;
                const startMs = parseInt(renderer.startMs || '0');
                const endMs = parseInt(renderer.endMs || '0');

                let text = '';
                if (renderer.snippet?.simpleText) {
                    text = renderer.snippet.simpleText;
                } else if (renderer.snippet?.runs) {
                    text = renderer.snippet.runs.map(run => run.text).join('');
                }

                return {
                    id: index,
                    start: startMs / 1000,
                    duration: (endMs - startMs) / 1000,
                    text: text.trim()
                };
            })
            .filter(cue => cue.text.length > 0);

        // Clean and return
        const cleanedCues = cleanTranscriptSegments(cues);

        // Build response matching expected format
        const result = {
            success: true,
            hasContent: true,
            captions: {
                playerCaptionsTracklistRenderer: {
                    captionTracks: [{
                        languageCode: targetLanguages[0] || 'en',
                        content: cleanedCues
                    }]
                }
            },
            cues: cleanedCues,
            totalCues: cleanedCues.length
        };

        return result;

    } finally {
        cleanup();
    }
}

// Generate visitor data for better request authenticity
function generateVisitorData() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let result = '';
    for (let i = 0; i < 11; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
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

async function tryThirdPartyAPI(videoId, api, targetLanguages, metadataOnly, signal) {
    const response = await fetch(`${api.url}${videoId}`, {
        headers: {
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (compatible; LinguaTube/1.0)'
        },
        signal
    });



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

    const filteredTracks = filterTracksByLanguage(rawTracks, targetLanguages);

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
        if (!cached) {
            log('Cache miss: no data');
            return null;
        }

        const tracks = cached?.captions?.playerCaptionsTracklistRenderer?.captionTracks || [];
        const targets = targetLanguages.map(t => t.toLowerCase());

        // Verify cache has content for at least one target language
        const hasValidContent = tracks.some(track =>
            track.content?.length > 0 &&
            targets.some(t => (track.languageCode || '').toLowerCase().startsWith(t))
        );

        if (!hasValidContent) {
            log('Cache miss: no valid content for', targets, 'in', tracks.length, 'tracks');
        }

        return hasValidContent ? cached : null;
    } catch (e) {
        log('Cache error:', e.message);
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