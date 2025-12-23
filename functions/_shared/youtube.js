/**
 * Shared YouTube Utilities
 * interacting with YouTube Internal API (Innertube)
 */

import { validateVideoId } from './utils.js';

// ============================================================================
// Configuration
// ============================================================================

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

// ============================================================================
// Core Fetching Logic
// ============================================================================

export async function fetchVideoData(videoId, apiKey) {
    if (!validateVideoId(videoId)) {
        throw new Error('Invalid video ID');
    }

    // Try clients in order
    for (const client of INNERTUBE_CLIENTS) {
        try {
            return await fetchFromInnertube(videoId, apiKey, client);
        } catch (e) {
            // Continue to next client
        }
    }

    // Fallback to scrape
    return await scrapeWatchPage(videoId);
}

async function fetchFromInnertube(videoId, apiKey, client) {
    const response = await fetch(
        `https://www.youtube.com/youtubei/v1/player?key=${apiKey}&prettyPrint=false`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': client.userAgent,
                'X-Youtube-Client-Name': client.clientId,
                'X-Youtube-Client-Version': client.clientVersion,
                'Origin': 'https://www.youtube.com'
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
            })
        }
    );

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    if (data.playabilityStatus?.status === 'LOGIN_REQUIRED') {
        throw new Error('Age-restricted');
    }

    return data;
}

async function scrapeWatchPage(videoId) {
    const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
        headers: {
            'User-Agent': INNERTUBE_CLIENTS[1].userAgent,
            'Accept-Language': 'en-US,en;q=0.9'
        }
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();

    // Extract ytInitialPlayerResponse
    const marker = 'ytInitialPlayerResponse = ';
    const startIdx = html.indexOf(marker);
    if (startIdx === -1) throw new Error('Player response not found');

    const jsonStart = startIdx + marker.length;
    let braceCount = 0;
    let jsonEnd = -1;
    let inString = false;

    // Simple JSON extractor
    for (let i = jsonStart; i < html.length; i++) {
        if (html[i] === '"' && html[i - 1] !== '\\') inString = !inString;
        if (!inString) {
            if (html[i] === '{') braceCount++;
            else if (html[i] === '}') {
                braceCount--;
                if (braceCount === 0) {
                    jsonEnd = i + 1;
                    break;
                }
            }
        }
    }

    if (jsonEnd === -1) throw new Error('Failed to parse player response');
    return JSON.parse(html.substring(jsonStart, jsonEnd));
}

// ============================================================================
// Helpers
// ============================================================================

export function getAudioUrl(videoData) {
    const formats = videoData.streamingData?.adaptiveFormats || [];

    // Find best audio format (m4a/opus)
    const audioFormats = formats.filter(f => f.mimeType.includes('audio'));
    const bestAudio = audioFormats.sort((a, b) => b.bitrate - a.bitrate)[0];

    return bestAudio?.url || null;
}
