/**
 * Transcript Proxy API (Cloudflare Function)
 * Proxies YouTube timedtext API for caption content
 */

import { handleOptions, errorResponse } from '../_shared/utils.js';

// Handle preflight requests
export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request } = context;

    try {
        const url = new URL(request.url);

        // Get all query params and forward to YouTube
        const youtubeUrl = new URL('https://www.youtube.com/api/timedtext');
        url.searchParams.forEach((value, key) => {
            youtubeUrl.searchParams.set(key, value);
        });

        const response = await fetch(youtubeUrl.toString(), {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.youtube.com/'
            }
        });

        const data = await response.text();

        return new Response(data, {
            status: 200,
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'text/plain',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        console.error('[Transcript Proxy] Error:', error.message);
        return errorResponse(error.message);
    }
}
