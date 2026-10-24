/**
 * payOS Webhook Endpoint
 * POST /api/payment/webhook
 * Receives bank payment confirmation and automatically upgrades Supabase user account.
 */

import { serviceRoleRequest } from '../../services/supabase-rest.js';
import { verifyWebhookSignature } from '../../providers/payos.js';
import { jsonResponse, handleOptions, errorResponse } from '../../utils/utils.js';

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const body = await request.json().catch(() => null);
        if (!body) {
            return jsonResponse({ success: false, error: 'Empty payload' }, 400);
        }

        const checksumKey = env.PAYOS_CHECKSUM_KEY;

        // Enforce HMAC-SHA256 signature verification in all environments (Fail Closed)
        if (!checksumKey) {
            console.error('[payOS Webhook] PAYOS_CHECKSUM_KEY unconfigured');
            return jsonResponse({ success: false, error: 'Webhook verification key unconfigured' }, 500);
        }

        const isValid = await verifyWebhookSignature(body, checksumKey);
        if (!isValid) {
            console.error('[payOS Webhook] Signature verification failed');
            return jsonResponse({ success: false, error: 'Invalid signature' }, 400);
        }

        const data = body.data || body;
        const { orderCode, code } = data;

        // If transaction was not successful (code !== '00'), acknowledge without action
        if (code !== '00') {
            console.log(`[payOS Webhook] Transaction code ${code} for order ${orderCode}`);
            return jsonResponse({ success: true, status: 'ignored' }, 200);
        }

        const kv = env.TRANSCRIPT_CACHE;

        // Legacy marker remains a read-only compatibility guard for already granted orders.
        if (kv && await kv.get(`order_processed:${orderCode}`)) {
            return jsonResponse({ success: true, status: 'already_processed' });
        }
        if (!Number.isSafeInteger(orderCode) || orderCode <= 0 ||
            !Number.isSafeInteger(data.amount) || data.amount <= 0) {
            return jsonResponse({ error: 'Invalid payment metadata' }, 400);
        }

        // Retrieve order metadata saved during creation
        let orderMeta = null;
        if (kv) {
            const rawMeta = await kv.get(`order:${orderCode}`);
            if (rawMeta) {
                try {
                    orderMeta = JSON.parse(rawMeta);
                } catch { }
            }
        }

        const orders = await serviceRoleRequest(env, `orders?order_code=eq.${orderCode}&select=*`);
        const order = orders?.[0];
        if (order) {
            orderMeta = { userId: order.user_id, planId: order.plan_id, tier: order.tier, amount: order.amount,
                durationDays: order.plan_id.endsWith('1y') ? 365 : 30 };
        }
        if (!orderMeta?.userId) return jsonResponse({ error: 'Order metadata missing' }, 422);
        const expectedAmount = Number(orderMeta.amount);
        if (!Number.isSafeInteger(expectedAmount) || expectedAmount <= 0 || data.amount !== expectedAmount) {
            return jsonResponse({ error: 'Amount mismatch' }, 400);
        }
        const userId = orderMeta.userId;
        const durationDays = orderMeta?.durationDays || 30;
        const targetTier = orderMeta?.tier || (orderMeta?.planId?.startsWith('premium') ? 'premium' : 'pro');
        const defaultDiamonds = targetTier === 'premium' ? 25 : 10;
        const grantedDiamonds = orderMeta?.diamonds || defaultDiamonds;

        // The unique event insert and profile update commit in the same transaction.
        // Timeouts are retried with the same ID; never PATCH a balance after an ambiguous result.
        const result = await serviceRoleRequest(env, 'rpc/apply_payos_payment', { method: 'POST', body: {
            p_order_code: orderCode, p_user_id: userId, p_tier: targetTier,
            p_days: durationDays, p_diamonds: grantedDiamonds, p_amount: expectedAmount
        } });
        if (!result?.success) return errorResponse('Failed to apply payment', 503);

        return jsonResponse({ success: true, orderCode }, 200);
    } catch (err) {
        console.error('[payOS Webhook] Execution error:', err.message);
        return errorResponse('Webhook processing failed', 500);
    }
}
