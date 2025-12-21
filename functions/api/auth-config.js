// Cloudflare Pages Function to serve auth configuration
// Reads GOOGLE_CLIENT_ID from environment secrets

export async function onRequestGet(context) {
    const { env } = context;

    const clientId = env.GOOGLE_CLIENT_ID || '';

    return new Response(JSON.stringify({
        clientId,
        enabled: !!clientId
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
        }
    });
}
