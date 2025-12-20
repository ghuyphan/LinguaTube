// Cloudflare Pages Function to proxy Jotoba API (Japanese dictionary)
// Route: /jotoba/*

export async function onRequest(context) {
    const { request } = context;

    try {
        const url = new URL(request.url);
        // Remove the /jotoba prefix and forward the rest
        const targetPath = url.pathname.replace(/^\/jotoba/, '') || '/';
        const targetUrl = `https://jotoba.de${targetPath}${url.search}`;

        console.log(`[Jotoba Proxy] ${request.method} ${targetUrl}`);

        const headers = new Headers();
        headers.set('Accept', 'application/json');
        headers.set('Content-Type', 'application/json');
        headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

        const fetchOptions = {
            method: request.method,
            headers: headers
        };

        // Forward body for POST requests
        if (request.method === 'POST') {
            fetchOptions.body = await request.text();
        }

        const response = await fetch(targetUrl, fetchOptions);
        const data = await response.text();

        return new Response(data, {
            status: response.status,
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        });

    } catch (error) {
        console.error('[Jotoba Proxy] Error:', error.message);
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
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
