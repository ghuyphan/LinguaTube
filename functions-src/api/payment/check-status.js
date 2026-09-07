/**
 * Payment Status Check Endpoint
 * GET /api/payment/check-status?orderCode=12345678
 */

import { jsonResponse, handleOptions } from '../../utils/utils.js';

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
