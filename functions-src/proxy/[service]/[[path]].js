/**
 * Unified Proxy API (Cloudflare Function)
 * Configurable proxy for multiple external services
 * Route: /proxy/[service]/[[path]]
 */

import { jsonResponse, handleOptions, errorResponse } from '../../_shared/utils.js';

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
    const { request, params } = context;
    const service = params.service;
    const pathSegments = params.path || [];

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
        const targetPath = '/' + pathSegments.join('/');
        const targetUrl = `${config.baseUrl}${targetPath}${url.search}`;

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

        return new Response(data, {
            status: response.status,
            headers: {
                'Content-Type': response.headers.get('Content-Type') || 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': config.methods.join(', ') + ', OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'X-Proxied-Service': service
            }
        });

    } catch (error) {
        console.error(`[Proxy ${service}] Error:`, error.message);
        return errorResponse(error.message);
    }
}
