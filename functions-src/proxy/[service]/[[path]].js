/**
 * Unified Proxy API (Cloudflare Function)
 * Configurable proxy for multiple external services
 * Route: /proxy/[service]/[[path]]
 */

import { jsonResponse, handleOptions, errorResponse } from '../../utils/utils.js';
import {
    consumeRateLimit,
    getClientIP,
    rateLimitResponse,
    getRateLimitHeaders
} from '../../middlewares/rate-limiter.js';

// Rate limiting: 100 requests per hour per IP
const RATE_LIMIT_CONFIG = { max: 100, windowSeconds: 3600, keyPrefix: 'proxy' };

// ============================================================================
// Security: SSRF Protection
// ============================================================================

/**
 * Sanitize path segments to prevent path traversal attacks
 * Filters out ".." and segments starting with "."
 */
function sanitizePath(segments) {
    return segments.filter(seg => {
        if (!seg) return false;
        // Block ".." (parent traversal) and hidden files/dirs starting with "."
        if (seg === '..' || seg.startsWith('.')) return false;
        return true;
    });
}

/**
 * Check if hostname resolves to internal/private IP ranges
 * Blocks: 127.x, 10.x, 192.168.x, 172.16-31.x, localhost, 0.0.0.0
 */
function isInternalHost(hostname) {
    const patterns = [
        /^127\./,                           // Loopback: 127.x.x.x
        /^10\./,                            // Private: 10.x.x.x
        /^192\.168\./,                      // Private: 192.168.x.x
        /^172\.(1[6-9]|2[0-9]|3[01])\./,    // Private: 172.16-31.x.x
        /^localhost$/i,                     // Localhost hostname
        /^0\.0\.0\.0$/,                     // All interfaces
        /^\[::1\]$/,                        // IPv6 loopback
    ];
    return patterns.some(p => p.test(hostname));
}

// Service configuration map
const SERVICE_CONFIG = {
    invidious1: {
        baseUrl: 'https://yewtu.be',
        methods: ['GET'],
        accept: 'application/json'
    },
    jisho: {
        baseUrl: 'https://jisho.org',
        methods: ['GET'],
        accept: '*/*'
    },
    jotoba: {
        baseUrl: 'https://jotoba.de',
        methods: ['GET', 'POST'],
        accept: 'application/json',
        contentType: 'application/json'
    },
    piped1: {
        baseUrl: 'https://pipedapi.kavin.rocks',
        methods: ['GET'],
        accept: 'application/json'
    }
};

// Handle preflight requests
export async function onRequestOptions(context) {
    const { params } = context;
    const service = params.service;
    const config = SERVICE_CONFIG[service];

    if (!config) {
        return handleOptions(['GET', 'OPTIONS']);
    }

    return handleOptions([...config.methods, 'OPTIONS']);
}

export async function onRequest(context) {
    const { request, params, env } = context;
    const service = params.service;
    const pathSegments = params.path || [];

    // Rate limiting
    const clientIP = getClientIP(request);
    const rateCheck = await consumeRateLimit(env.TRANSCRIPT_CACHE, clientIP, RATE_LIMIT_CONFIG);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    // Validate service
    const config = SERVICE_CONFIG[service];
    if (!config) {
        return jsonResponse(
            { error: `Unknown service: ${service}. Available: ${Object.keys(SERVICE_CONFIG).join(', ')}` },
            400
        );
    }

    // Validate HTTP method
    if (!config.methods.includes(request.method)) {
        return jsonResponse(
            { error: `Method ${request.method} not allowed for ${service}` },
            405
        );
    }

    try {
        const url = new URL(request.url);

        // Security: Sanitize path segments to prevent traversal attacks
        const sanitizedSegments = sanitizePath(pathSegments);
        if (sanitizedSegments.length !== pathSegments.length) {
            return jsonResponse(
                { error: 'Invalid path: path traversal detected' },
                400
            );
        }

        const targetPath = '/' + sanitizedSegments.join('/');
        const targetUrl = `${config.baseUrl}${targetPath}${url.search}`;

        // Security: Validate target URL doesn't resolve to internal/private IPs
        const targetUrlObj = new URL(targetUrl);
        if (isInternalHost(targetUrlObj.hostname)) {
            return jsonResponse(
                { error: 'Invalid target: internal hosts not allowed' },
                400
            );
        }

        console.log(`[Proxy ${service}] ${request.method} ${targetUrl}`);

        const headers = new Headers();
        headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
        headers.set('Accept', config.accept || 'application/json');

        if (config.contentType) {
            headers.set('Content-Type', config.contentType);
        }

        const fetchOptions = {
            method: request.method,
            headers
        };

        // Forward body for POST requests
        if (request.method === 'POST') {
            fetchOptions.body = await request.text();
        }

        const response = await fetch(targetUrl, fetchOptions);
        const data = await response.text();

        const responseHeaders = {
            'Content-Type': response.headers.get('Content-Type') || 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': config.methods.join(', ') + ', OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'X-Proxied-Service': service,
            ...getRateLimitHeaders(rateCheck.remaining, rateCheck.resetAt)
        };

        if (request.method === 'GET' && response.ok) {
            responseHeaders['Cache-Control'] = 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400';
        }

        return new Response(data, {
            status: response.status,
            headers: responseHeaders
        });

    } catch (error) {
        console.error(`[Proxy ${service}] Error:`, error.message);
        return errorResponse(error.message);
    }
}
