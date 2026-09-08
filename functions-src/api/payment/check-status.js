/**
 * Payment Status Check Endpoint
 * GET /api/payment/check-status?orderCode=12345678
 */

import { jsonResponse, handleOptions } from '../../utils/utils.js';
import { consumeRateLimit, rateLimitResponse } from '../../middlewares/rate-limiter.js';

const RATE_LIMIT_CONFIG = {
    max: 60,
    windowSeconds: 600,
    keyPrefix: 'pay_status'
};

export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const orderCode = url.searchParams.get('orderCode');

    if (!orderCode) {
        return jsonResponse({ success: false, error: 'Missing orderCode parameter' }, 400);
    }

    const kv = env.TRANSCRIPT_CACHE;
    const clientIp = request.headers.get('cf-connecting-ip') || 'anonymous';
    const rateCheck = await consumeRateLimit(kv, clientIp, RATE_LIMIT_CONFIG);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.resetAt);
    }

    if (!kv) {
        return jsonResponse({ success: true, status: 'PENDING' }, 200);
    }

    try {
        const processed = await kv.get(`order_processed:${orderCode}`);
        if (processed) {
            const data = JSON.parse(processed);
            return jsonResponse({
                success: true,
                status: 'PAID',
                processedAt: data.processedAt
            }, 200, { 'Cache-Control': 'no-store' });
        }

        return jsonResponse({
            success: true,
            status: 'PENDING'
        }, 200, { 'Cache-Control': 'no-store' });
    } catch (err) {
        return jsonResponse({ success: false, error: err.message }, 500);
    }
}
