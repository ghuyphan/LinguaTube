/**
 * GET /api/translate/[[path]]
 * Proxy requests to Lingva Translate API
 * path segments: [source, target, text]
 */
export async function onRequestGet(context) {
    const { params } = context;
    const pathSegments = params.path; // e.g., ['en', 'vi', 'hello']

    if (!pathSegments || pathSegments.length < 3) {
        return new Response(JSON.stringify({ error: 'Invalid path' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Construct the target URL
    // Lingva API: https://lingva.ml/api/v1/{source}/{target}/{text}
    const source = pathSegments[0];
    const target = pathSegments[1];
    const text = pathSegments.slice(2).join('/'); // Rejoin valid text that might contain slashes

    const url = `https://lingva.ml/api/v1/${source}/${target}/${text}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                // Mimic a browser to avoid some bot blocks, though Lingva is usually open
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        // Forward the response
        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
                // Allow CORS for our frontend
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Translation proxy failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
