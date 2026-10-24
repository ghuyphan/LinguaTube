import { serviceRoleRequest } from './supabase-rest.js';

const PREMIUM = new Set(['founder', 'premium', 'lifetime', 'voca_founder', 'voca_premium']);
const PRO = new Set(['voca_pro', 'pro', 'supporter', 'vocapro']);

export function subscriberGrants(subscriber, now = Date.now()) {
    if (!subscriber || typeof subscriber.entitlements !== 'object' || !subscriber.entitlements) throw new Error('Invalid subscriber');
    const tiers = new Map();
    for (const [id, entitlement] of Object.entries(subscriber.entitlements)) {
        const key = id.toLowerCase().trim();
        const tier = PREMIUM.has(key) ? 'premium' : PRO.has(key) ? 'pro' : null;
        if (!tier) continue;
        const productId = entitlement.product_identifier;
        const subscription = subscriber.subscriptions?.[productId];
        const transactions = subscriber.non_subscriptions?.[productId];
        const nonRenewing = Array.isArray(transactions) ? [...transactions].sort((a,b) => Date.parse(b.purchase_date)-Date.parse(a.purchase_date))[0] : null;
        const purchase = subscription || nonRenewing;
        // Production callbacks must never promote access based on a sandbox receipt.
        if (!purchase || purchase.is_sandbox !== false) continue;
        const paidExpiry = entitlement.expires_date == null ? null : Date.parse(entitlement.expires_date);
        const graceExpiry = Date.parse(entitlement.grace_period_expires_date || '');
        const expiry = paidExpiry !== null && Number.isFinite(graceExpiry) ? Math.max(paidExpiry, graceExpiry) : paidExpiry;
        if (expiry !== null && (!Number.isFinite(expiry) || expiry <= now)) continue;
        // Only a verified non-renewing purchase may create an unlimited grant.
        if (expiry === null && !nonRenewing) continue;
        if (!tiers.has(tier) || expiry === null || (tiers.get(tier) !== null && expiry > tiers.get(tier))) tiers.set(tier, expiry);
    }
    return [...tiers].map(([tier, expiry]) => ({ tier, expires_at: expiry === null ? null : new Date(expiry).toISOString() }));
}

export async function recoverRevenueCatEvent(env, eventId = null, deadline = Date.now() + 20000) {
    if (!env.REVENUECAT_SECRET_API_KEY || Date.now() >= deadline) return false;
    const rpc = (path, body) => serviceRoleRequest(env, path, { method: 'POST', body, timeoutMs: Math.max(1, Math.min(4000, deadline - Date.now())) });
    const job = await rpc('rpc/claim_revenuecat_event', { p_event_id: eventId });
    if (!job) return false;
    let success = false;
    let retryAfter = 0;
    try {
        for (const userId of job.user_ids.filter(id => !(job.completed_user_ids || []).includes(id))) {
            if (Date.now() >= deadline) throw new Error('Reconciliation budget exhausted');
            const response = await fetch(`https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(userId)}`, {
                headers: { Authorization: `Bearer ${env.REVENUECAT_SECRET_API_KEY}` }, signal: AbortSignal.timeout(Math.max(1, Math.min(4000, deadline - Date.now()))), redirect: 'error'
            });
            if (!response.ok) {
                const header = response.headers.get('Retry-After');
                const seconds = header && /^\d+$/.test(header) ? Number(header) : (Date.parse(header || '') - Date.now()) / 1000;
                if (Number.isFinite(seconds)) retryAfter = Math.min(86400, Math.max(0, Math.ceil(seconds)));
                throw new Error(`Subscriber HTTP ${response.status}`);
            }
            const data = await response.json();
            if (!Number.isSafeInteger(data.request_date_ms)) throw new Error('Subscriber timestamp missing');
            const applied = await rpc('rpc/apply_revenuecat_snapshot', {
                p_event_id: job.event_id, p_lease: job.lease_token, p_user_id: userId,
                p_snapshot_at: new Date(data.request_date_ms).toISOString(), p_grants: subscriberGrants(data.subscriber)
            });
            if (applied !== true) throw new Error('Subscriber snapshot unconfirmed');
        }
        success = true;
    } catch (error) { console.warn('[RevenueCat] Deferred subscriber reconciliation', { eventId: job.event_id, message: error.message }); }
    await rpc('rpc/finish_revenuecat_event', {
        p_event_id: job.event_id, p_lease: job.lease_token, p_success: success, p_retry_after: retryAfter
    });
    return success;
}
