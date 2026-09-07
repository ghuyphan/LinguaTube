/**
 * Create Payment Order Endpoint
 * POST /api/payment/create-order
 */

import { validateAuthToken, unauthorizedResponse } from '../../middlewares/auth.js';
import { createPayOsPaymentLink } from '../../providers/payos.js';
import { jsonResponse, handleOptions } from '../../utils/utils.js';

export const PLANS = {
    pro_1m: {
        id: 'pro_1m',
        name: 'Voca Pro - 1 Month',
        amount: 49000, // 49,000 VND
        durationDays: 30,
        diamonds: 20
    },
    pro_1y: {
        id: 'pro_1y',
        name: 'Voca Pro - 1 Year',
        amount: 490000, // 490,000 VND (~40k/mo)
        durationDays: 365,
        diamonds: 20
    }
};

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const authResult = await validateAuthToken(request, env);
        if (!authResult.valid || !authResult.user) {
            return unauthorizedResponse('Please sign in to upgrade your subscription');
        }

        const body = await request.json().catch(() => ({}));
        const planId = body.planId || 'pro_1m';
        const plan = PLANS[planId] || PLANS.pro_1m;

        // Generate a 6-digit to 8-digit unique numeric order code (payOS requires integer)
        const orderCode = Math.floor(Date.now() / 1000) % 90000000 + 10000000;
        const description = `VOCA${orderCode}`.slice(0, 25);

        // Store pending order in KV with 1 hour expiration
        if (env.TRANSCRIPT_CACHE) {
            const orderMeta = {
                orderCode,
                userId: authResult.user.id,
                userEmail: authResult.user.email,
                planId: plan.id,
                durationDays: plan.durationDays,
                diamonds: plan.diamonds,
                amount: plan.amount,
                createdAt: new Date().toISOString()
            };
            await env.TRANSCRIPT_CACHE.put(`order:${orderCode}`, JSON.stringify(orderMeta), { expirationTtl: 3600 });
        }

        const paymentData = await createPayOsPaymentLink(env, {
            orderCode,
            amount: plan.amount,
            description,
            returnUrl: body.returnUrl || 'https://voca.vn/video',
            cancelUrl: body.cancelUrl || 'https://voca.vn/video'
        });

        return jsonResponse({
            success: true,
            orderCode,
            plan: plan.id,
            amount: plan.amount,
            checkoutUrl: paymentData.checkoutUrl,
            qrCode: paymentData.qrCode,
            isMock: paymentData.isMock || false
        }, 200);
    } catch (err) {
        console.error('[Payment API] Create order error:', err.message);
        return jsonResponse({
            success: false,
            error: err.message || 'Failed to create payment order'
        }, 500);
    }
}
