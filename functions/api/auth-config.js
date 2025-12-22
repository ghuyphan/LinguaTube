/**
 * Auth Configuration API (Cloudflare Function)
 * Serves Google OAuth client configuration
 */

import { jsonResponse, handleOptions } from '../_shared/utils.js';

// Handle preflight requests
export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { env } = context;

    const clientId = env.GOOGLE_CLIENT_ID || '';

    return jsonResponse({
        clientId,
        enabled: !!clientId
    }, 200, {
        'Cache-Control': 'public, max-age=3600'
    });
}
