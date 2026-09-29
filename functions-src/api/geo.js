/**
 * Geo-IP Lookup API (Cloudflare Pages Function)
 * Returns the client's 2-letter ISO country code from Cloudflare Edge GeoIP.
 */
import { jsonResponse, handleOptions } from '../utils/utils.js';

export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request } = context;
    const rawCountry = request.cf?.country || request.headers.get('cf-ipcountry') || null;
    const country = rawCountry && rawCountry !== 'XX' && rawCountry !== 'T1' ? rawCountry.toUpperCase() : null;

    return jsonResponse({
        success: true,
        country
    }, 200, {
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800'
    });
}
