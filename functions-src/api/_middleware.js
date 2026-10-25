/**
 * Global API Middleware for Cloudflare Pages Functions
 * Intercepts all /api/* requests for bot defense and security
 */

import { checkBot } from '../middlewares/bot-defense.js';
import { jsonResponse } from '../utils/utils.js';

export async function onRequest(context) {
    const { request, next } = context;

    const path = new URL(request.url).pathname.replace(/\/$/, '');
    const webhook = ['/api/payment/webhook', '/api/payment/revenuecat-webhook', '/api/gladia-webhook', '/api/internal/reconcile'].includes(path);
    if (!webhook) {
        const botCheck = checkBot(request);
        if (botCheck.isBot) {
            return jsonResponse({ error: 'Access denied: automated requests not allowed', code: 'BOT_DETECTED' }, 403);
        }
    }
    // Enforce actual streamed bytes as well as Content-Length before JSON parsing.
    // This also applies to callbacks, whose authentication is enforced by their handlers.
    const maxBytes = 2 * 1024 * 1024;
    if (Number(request.headers.get('Content-Length')) > maxBytes) return jsonResponse({ error: 'Request too large' }, 413);
    if (!request.body) {
        // Maintenance endpoints intentionally accept authenticated no-body calls.
        const optionalBody = ['/api/internal/reconcile', '/api/heal-levels'].includes(path);
        if (['POST', 'PUT', 'PATCH'].includes(request.method) && !optionalBody) {
            return jsonResponse({ error: 'JSON object body required' }, 400);
        }
        return next();
    }
    const reader = request.body.getReader();
    const chunks = [];
    let size = 0;
    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            size += value.byteLength;
            if (size > maxBytes) {
                await reader.cancel();
                return jsonResponse({ error: 'Request too large' }, 413);
            }
            chunks.push(value);
        }
    } finally { reader.releaseLock(); }
    const body = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength; }
    // HTTP adapters can expose an absent POST body as a zero-byte stream.
    const emptyMaintenance = size === 0 && ['/api/internal/reconcile', '/api/heal-levels'].includes(path);
    // API body handlers consume JSON objects. Reject malformed/scalar payloads
    // before they become 500s or accidentally select a default mutation.
    // Forward the original bytes unchanged for webhook signature verification.
    if (['POST', 'PUT', 'PATCH'].includes(request.method) && !emptyMaintenance) {
        try {
            const parsed = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(body));
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Object required');
        } catch {
            return jsonResponse({ error: 'Invalid JSON object' }, 400);
        }
    }
    return next(new Request(request, { body }));
}
