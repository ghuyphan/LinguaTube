// Cloudflare Pages Function to proxy Free Dictionary API
// Route: /freedict/*

export async function onRequest(context) {
    const { request } = context;

    try {
        const url = new URL(request.url);
        // Remove the /freedict prefix and forward the rest
        const targetPath = url.pathname.replace(/^\/freedict/, '') || '/';
        const targetUrl = `https://api.dictionaryapi.dev/api/v2/entries${targetPath}${url.search}`;

        console.log(`[FreeDictionary Proxy] ${request.method} ${targetUrl}`);

        const response = await fetch(targetUrl, {
            method: request.method,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/json'
            }
        });

        const data = await response.text();

        return new Response(data, {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });

    } catch (error) {
        console.error('[FreeDictionary Proxy] Error:', error.message);
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
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
