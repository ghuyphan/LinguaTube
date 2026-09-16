/**
 * payOS Webhook Endpoint
 * POST /api/payment/webhook
 * Receives bank payment confirmation and automatically upgrades Supabase user account.
 */

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

        // Idempotency & lock check: prevent duplicate credit and concurrent execution
        if (kv) {
            const processed = await kv.get(`order_processed:${orderCode}`);
            if (processed) {
                console.log(`[payOS Webhook] Order ${orderCode} already processed`);
                return jsonResponse({ success: true, status: 'already_processed' }, 200);
            }

            const lock = await kv.get(`order_lock:${orderCode}`);
            if (lock) {
                console.log(`[payOS Webhook] Order ${orderCode} is already processing concurrently`);
                return jsonResponse({ success: true, status: 'processing' }, 200);
            }
            await kv.put(`order_lock:${orderCode}`, '1', { expirationTtl: 60 });
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

        // Verify paid amount matches the plan price
        if (orderMeta && orderMeta.amount != null) {
            const expectedAmount = Number(orderMeta.amount);
            const receivedAmount = Number(data.amount);
            if (receivedAmount < expectedAmount) {
                console.error(`[payOS Webhook] Amount mismatch for order ${orderCode}: expected ${expectedAmount}, received ${receivedAmount}`);
                if (kv) await kv.delete(`order_lock:${orderCode}`).catch(() => {});
                return jsonResponse({ success: false, error: 'Amount mismatch' }, 400);
            }
        }

        const userId = orderMeta?.userId;
        if (!userId) {
            console.error(`[payOS Webhook] Order metadata or userId not found for order ${orderCode}`);
            if (kv) await kv.delete(`order_lock:${orderCode}`).catch(() => {});
            return jsonResponse({ success: false, error: 'Order metadata missing or expired' }, 422);
        }

        const durationDays = orderMeta?.durationDays || 30;
        const targetTier = orderMeta?.tier || (orderMeta?.planId?.startsWith('premium') ? 'premium' : 'pro');
        const defaultDiamonds = targetTier === 'premium' ? 25 : 10;
        const grantedDiamonds = orderMeta?.diamonds || defaultDiamonds;

        const supabaseUrl = env.SUPABASE_URL || 'https://edbkvzviqeulwzcnrrlb.supabase.co';
        const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
        if (!serviceRoleKey) {
            console.error('[payOS Webhook] SUPABASE_SERVICE_ROLE_KEY unconfigured; cannot upgrade profile');
            if (kv) await kv.delete(`order_lock:${orderCode}`).catch(() => {});
            return jsonResponse({ success: false, error: 'Database service key unconfigured' }, 500);
        }
        const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();

        // Upgrade user record to target tier ('pro' or 'premium') in Supabase
        const updateRes = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'apikey': serviceRoleKey,
                'Authorization': `Bearer ${serviceRoleKey}`
            },
            body: JSON.stringify({
                subscription_tier: targetTier,
                subscription_expires: expiresAt,
                diamonds: grantedDiamonds,
                diamonds_updated_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }),
            signal: AbortSignal.timeout(5000)
        }).catch(() => null);

        if (!updateRes || !updateRes.ok) {
            console.error(`[payOS Webhook] Failed to update user ${userId}: ${updateRes?.status}`);
            if (kv) await kv.delete(`order_lock:${orderCode}`).catch(() => {});
            return errorResponse('Failed to update user subscription', 500);
        }

        console.log(`[payOS Webhook] Successfully upgraded user ${userId} to ${targetTier} until ${expiresAt}`);

        // Mark as processed (retained for 90 days)
        if (kv) {
            await kv.put(`order_processed:${orderCode}`, JSON.stringify({
                orderCode,
                userId,
                processedAt: new Date().toISOString()
            }), { expirationTtl: 90 * 24 * 60 * 60 });
            await kv.delete(`order_lock:${orderCode}`).catch(() => {});
        }

        return jsonResponse({ success: true, orderCode }, 200);
    } catch (err) {
        console.error('[payOS Webhook] Execution error:', err.message);
        return errorResponse('Webhook processing failed', 500);
    }
}
