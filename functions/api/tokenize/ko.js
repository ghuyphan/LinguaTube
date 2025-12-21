/**
 * Korean Tokenization API (Cloudflare Function)
 * Uses Intl.Segmenter for word segmentation (built-in)
 * Korean is space-delimited, making segmentation straightforward
 */

export async function onRequest(context) {
    const { request } = context;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { text } = await request.json();

        if (!text || typeof text !== 'string') {
            return new Response(JSON.stringify({ error: 'Missing or invalid "text" field' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Use Intl.Segmenter for word segmentation
        const segmenter = new Intl.Segmenter('ko', { granularity: 'word' });
        const segments = [...segmenter.segment(text)];

        // Convert to token format
        const tokens = segments
            .filter(seg => seg.isWordLike || seg.segment.trim())
            .map(seg => ({ surface: seg.segment }));

        return new Response(JSON.stringify({ tokens }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });

    } catch (error) {
        console.error('[Tokenize KO] Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
