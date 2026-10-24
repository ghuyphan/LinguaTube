import { validateAuthToken, unauthorizedResponse } from '../../middlewares/auth.js';
import { serviceRoleRequest } from '../../services/supabase-rest.js';
/**
 * Payment Status Check Endpoint
 * GET /api/payment/check-status?orderCode=12345678
 */

import { jsonResponse, handleOptions, errorResponse } from '../../utils/utils.js';
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

    if (!orderCode || !/^\d{1,16}$/.test(orderCode) || !Number.isSafeInteger(Number(orderCode))) {
        return jsonResponse({ success: false, error: 'Missing orderCode parameter' }, 400);
    }

    const auth = await validateAuthToken(request, env);
    if (!auth.valid || !auth.user) return unauthorizedResponse();
    const kv = env.TRANSCRIPT_CACHE;
    const rateCheck = await consumeRateLimit(kv, auth.user.id, RATE_LIMIT_CONFIG, context);
    if (!rateCheck.allowed) return rateLimitResponse(rateCheck.resetAt);

    try {
        const orders = await serviceRoleRequest(env, `orders?order_code=eq.${orderCode}&user_id=eq.${auth.user.id}&select=status,paid_at`);
        const order = orders?.[0];
        if (order) return jsonResponse({ success: true, status: order.status, processedAt: order.paid_at }, 200, { 'Cache-Control': 'no-store' });
        // Compatibility for pending/processed orders created before database persistence.
        const raw = kv ? await kv.get(`order:${orderCode}`) : null;
        const legacy = raw ? JSON.parse(raw) : null;
        if (legacy?.userId !== auth.user.id) return jsonResponse({ error: 'Order not found' }, 404, { 'Cache-Control': 'no-store' });
        const processed = await kv.get(`order_processed:${orderCode}`);
        if (processed) return jsonResponse({ success: true, status: 'PAID', processedAt: JSON.parse(processed).processedAt }, 200, { 'Cache-Control': 'no-store' });
        return jsonResponse({
            success: true,
            status: 'PENDING'
        }, 200, { 'Cache-Control': 'no-store' });
    } catch (err) {
        console.error('[Payment API] Check status error:', err.message);
        return errorResponse('Failed to check payment status', 500);
    }
}
