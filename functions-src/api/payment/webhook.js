/**
 * payOS Webhook Endpoint
 * POST /api/payment/webhook
 * Receives bank payment confirmation and automatically upgrades PocketBase user account.
 */

import { verifyWebhookSignature } from '../../providers/payos.js';
import { jsonResponse, handleOptions } from '../../utils/utils.js';

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

        // In production, enforce HMAC-SHA256 signature verification (fail closed)
        if (checksumKey) {
            const isValid = await verifyWebhookSignature(body, checksumKey);
            if (!isValid) {
                console.error('[payOS Webhook] Signature verification failed');
                return jsonResponse({ success: false, error: 'Invalid signature' }, 400);
            }
        } else if (env.ENVIRONMENT === 'development') {
            console.warn('[payOS Webhook] PAYOS_CHECKSUM_KEY not configured, processing in permissive dev mode');
        } else {
            console.error('[payOS Webhook] PAYOS_CHECKSUM_KEY not configured in production');
            return jsonResponse({ success: false, error: 'Webhook verification key unconfigured' }, 500);
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

        const pbUrl = env.PB_URL || env.POCKETHOST_URL || 'https://voca.pockethost.io';
        const adminEmail = env.PB_ADMIN_EMAIL;
        const adminPassword = env.PB_ADMIN_PASSWORD;

            if (adminEmail && adminPassword) {
                // 1. Admin login to PocketBase (try /api/admins first, fallback to /api/collections/_superusers)
                let authRes = await fetch(`${pbUrl}/api/admins/auth-with-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identity: adminEmail, password: adminPassword }),
                    signal: AbortSignal.timeout(5000)
                }).catch(() => null);

                if (!authRes || authRes.status === 404) {
                    authRes = await fetch(`${pbUrl}/api/collections/_superusers/auth-with-password`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ identity: adminEmail, password: adminPassword }),
                        signal: AbortSignal.timeout(5000)
                    }).catch(() => null);
                }

                if (authRes.ok) {
                    const authData = await authRes.json();
                    const adminToken = authData.token;

                    const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();

                    // 2. Upgrade user record to target tier ('pro' or 'premium')
                    const updateRes = await fetch(`${pbUrl}/api/collections/users/records/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': adminToken
                        },
                        body: JSON.stringify({
                            subscription_tier: targetTier,
                            subscription_expires: expiresAt,
                            diamonds: grantedDiamonds,
                            last_diamond_regen: new Date().toISOString()
                        })
                    });

                    if (updateRes.ok) {
                        console.log(`[payOS Webhook] Successfully upgraded user ${userId} to ${targetTier} until ${expiresAt}`);
                    } else {
                        console.error(`[payOS Webhook] Failed to update user ${userId}: ${updateRes.status}`);
                    }
                }
            }

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
        return jsonResponse({ success: false, error: err.message }, 500);
    }
}
