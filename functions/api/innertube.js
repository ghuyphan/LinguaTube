// Cloudflare Pages Function to proxy YouTube innertube API
// Route: /api/innertube

export async function onRequestPost(context) {
    const { request } = context;

    try {
        const body = await request.json();
        const videoId = body.videoId;

        console.log(`[Innertube] Fetching captions for video: ${videoId}`);

        // Forward to YouTube's innertube API
        const url = new URL(request.url);
        const key = url.searchParams.get('key') || 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';

        const response = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${key}`, {
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

        const data = await response.json();

        // Log what we got for debugging
        const hasCaptions = !!data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
        const captionCount = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks?.length || 0;
        console.log(`[Innertube] Response status: ${response.status}, has captions: ${hasCaptions}, count: ${captionCount}`);

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

