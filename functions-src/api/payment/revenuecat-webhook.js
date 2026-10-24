import { matchesSecret } from '../../utils/secret-auth.js';
/** RevenueCat callbacks are authenticated and durably queued before acknowledgement. */
import { jsonResponse, handleOptions } from '../../utils/utils.js';
import { recoverRevenueCatEvent } from '../../services/revenuecat-recovery.js';
import { serviceRoleRequest } from '../../services/supabase-rest.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function onRequestOptions() { return handleOptions(['POST', 'OPTIONS']); }

export async function onRequestPost(context) {
    const { request, env } = context;
    try {
        const secret = env.REVENUECAT_WEBHOOK_SECRET?.trim();
        if (!secret) return jsonResponse({ success: false, error: 'Webhook verification unavailable' }, 503);
        const actual = request.headers.get('Authorization') || '';
        const expected = secret.startsWith('Bearer ') ? secret : `Bearer ${secret}`;
        if (!(await matchesSecret(actual, expected)) && !(await matchesSecret(actual, secret))) {
            return jsonResponse({ success: false, error: 'Unauthorized webhook' }, 401);
        }
        const body = await request.json().catch(() => null);
        const event = body?.event;
        if (!event || typeof event.type !== 'string') return jsonResponse({ error: 'Invalid event' }, 400);
        const eventType = event.type;
        if (eventType === 'TEST') return jsonResponse({ success: true, status: 'acknowledged' });
        // Never grant production access from sandbox purchases.
        if (event.environment !== 'PRODUCTION') return jsonResponse({ success: true, status: 'ignored_environment' });
        const candidates = [event.app_user_id, event.original_app_user_id,
            ...(Array.isArray(event.aliases) ? event.aliases : []),
            ...(Array.isArray(event.transferred_from) ? event.transferred_from : []),
            ...(Array.isArray(event.transferred_to) ? event.transferred_to : [])];
        const userIds = [...new Set(candidates.filter(id => typeof id === 'string' && UUID.test(id)).map(id => id.toLowerCase()))];
        if (!userIds.length) return jsonResponse({ success: true, status: 'anonymous' });
        if (userIds.length > 20) return jsonResponse({ error: 'Too many identities' }, 400);
        if (typeof event.id !== 'string' || !event.id || event.id.length > 200 ||
            !Number.isSafeInteger(event.event_timestamp_ms) || event.event_timestamp_ms <= 0 ||
            event.event_timestamp_ms > Date.now() + 300000) return jsonResponse({ error: 'Invalid event metadata' }, 400);
        await serviceRoleRequest(env, 'billing_webhook_inbox?on_conflict=event_id', { method: 'POST',
            prefer: 'resolution=ignore-duplicates,return=minimal', body: {
                event_id: event.id, event_type: eventType, user_ids: userIds,
                event_at: new Date(event.event_timestamp_ms).toISOString()
            } });
        // A successful acknowledgement means the work is durable, not that an upstream call happened to finish.
        if (context.waitUntil) context.waitUntil(recoverRevenueCatEvent(env, event.id).catch(error => {
            console.warn('[RevenueCat] Background recovery deferred', { message: error.message });
        }));
        return jsonResponse({ success: true, eventType, status: 'queued' });
    } catch (error) {
        console.error('[RevenueCat Webhook] Processing failed:', error.message);
        return jsonResponse({ success: false, error: 'Webhook processing failed' }, 503);
    }
}
