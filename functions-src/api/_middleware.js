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
    if (!request.body) return next();
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
    return next(new Request(request, { body }));
}
