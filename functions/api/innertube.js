// Cloudflare Pages Function to proxy YouTube innertube API
// Route: /api/innertube

export async function onRequestPost(context) {
    const { request } = context;

    try {
        const body = await request.json();
        const videoId = body.videoId;

        console.log(`[Innertube] Fetching captions for video: ${videoId}`);

        // Strategy 1: Try innertube API first
        let data = await tryInnertubeAPI(body);

        // Check if we got captions
        let hasCaptions = !!data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        let captionCount = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks?.length || 0;

        console.log(`[Innertube] Innertube API result: has captions: ${hasCaptions}, count: ${captionCount}`);

        // Strategy 2: If no captions, try scraping the watch page
        if (!hasCaptions) {
            console.log(`[Innertube] Innertube failed, trying watch page scrape...`);
            const scrapedData = await tryWatchPageScrape(videoId);

            if (scrapedData?.captions?.playerCaptionsTracklistRenderer?.captionTracks) {
                data = scrapedData;
                hasCaptions = true;
                captionCount = scrapedData.captions.playerCaptionsTracklistRenderer.captionTracks.length;
                console.log(`[Innertube] Watch page scrape successful: ${captionCount} tracks found`);
            }
        }

        // Strategy 3: If still no captions, try third-party API
        if (!hasCaptions) {
            console.log(`[Innertube] Scrape failed, trying third-party API...`);
            const thirdPartyData = await tryThirdPartyAPI(videoId);

            if (thirdPartyData?.captions?.playerCaptionsTracklistRenderer?.captionTracks) {
                data = thirdPartyData;
                captionCount = thirdPartyData.captions.playerCaptionsTracklistRenderer.captionTracks.length;
                console.log(`[Innertube] Third-party API successful: ${captionCount} tracks found`);
            }
        }

        if (data.playabilityStatus?.status === 'ERROR') {
            console.log(`[Innertube] Playability error: ${data.playabilityStatus.reason}`);
        }

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('[Innertube] Error:', error.message);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
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
        console.error('[Innertube] Innertube API error:', error.message);
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
                'Accept-Language': 'en-US,en;q=0.9'
            }
        });

        const html = await response.text();

        // Extract ytInitialPlayerResponse
        const match = html.match(/ytInitialPlayerResponse\s*=\s*(\{.+?\});/s);
        if (match && match[1]) {
            // Find the complete JSON by matching braces
            const jsonStr = extractJSON(html, html.indexOf('ytInitialPlayerResponse'));
            if (jsonStr) {
                return JSON.parse(jsonStr);
            }
        }

        return {};
    } catch (error) {
        console.error('[Innertube] Watch page scrape error:', error.message);
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
            console.log(`[Innertube] Trying: ${apiUrl}`);
            const response = await fetch(apiUrl, {
                headers: {
                    'Accept': 'application/json'
                }
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
            console.log(`[Innertube] Third-party API ${apiUrl} failed:`, error.message);
        }
    }

    return {};
}

// Handle preflight requests
export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}

