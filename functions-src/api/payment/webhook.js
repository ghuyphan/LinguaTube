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

        // In production, enforce HMAC-SHA256 signature verification
        if (checksumKey) {
            const isValid = await verifyWebhookSignature(body, checksumKey);
            if (!isValid) {
                console.error('[payOS Webhook] Signature verification failed');
                return jsonResponse({ success: false, error: 'Invalid signature' }, 400);
            }
        } else {
            console.warn('[payOS Webhook] PAYOS_CHECKSUM_KEY not configured, processing in permissive dev mode');
        }

        const data = body.data || body;
        const { orderCode, code } = data;

        // If transaction was not successful (code !== '00'), acknowledge without action
        if (code !== '00') {
            console.log(`[payOS Webhook] Transaction code ${code} for order ${orderCode}`);
            return jsonResponse({ success: true, status: 'ignored' }, 200);
        }

        const kv = env.TRANSCRIPT_CACHE;

        // Idempotency check: prevent duplicate credit / replay attacks
        if (kv) {
            const processed = await kv.get(`order_processed:${orderCode}`);
            if (processed) {
                console.log(`[payOS Webhook] Order ${orderCode} already processed`);
                return jsonResponse({ success: true, status: 'already_processed' }, 200);
            }
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

        const userId = orderMeta?.userId;
        const durationDays = orderMeta?.durationDays || 30;
        const grantedDiamonds = orderMeta?.diamonds || 20;

        if (userId) {
            const pbUrl = env.PB_URL || env.POCKETHOST_URL || 'https://voca.pockethost.io';
            const adminEmail = env.PB_ADMIN_EMAIL;
            const adminPassword = env.PB_ADMIN_PASSWORD;

            if (adminEmail && adminPassword) {
                // 1. Admin login to PocketBase
                const authRes = await fetch(`${pbUrl}/api/admins/auth-with-password`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identity: adminEmail, password: adminPassword })
                });

                if (authRes.ok) {
                    const authData = await authRes.json();
                    const adminToken = authData.token;

                    const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();

                    // 2. Upgrade user record to 'pro' tier
                    const updateRes = await fetch(`${pbUrl}/api/collections/users/records/${userId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': adminToken
                        },
                        body: JSON.stringify({
                            subscription_tier: 'pro',
                            subscription_expires: expiresAt,
                            diamonds: grantedDiamonds,
                            last_diamond_regen: new Date().toISOString()
                        })
                    });

                    if (updateRes.ok) {
                        console.log(`[payOS Webhook] Successfully upgraded user ${userId} to Pro until ${expiresAt}`);
                    } else {
                        console.error(`[payOS Webhook] Failed to update user ${userId}: ${updateRes.status}`);
                    }
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
        }

        return jsonResponse({ success: true, orderCode }, 200);
    } catch (err) {
        console.error('[payOS Webhook] Execution error:', err.message);
        return jsonResponse({ success: false, error: err.message }, 500);
    }
}
