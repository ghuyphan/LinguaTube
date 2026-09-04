/**
 * Global API Middleware for Cloudflare Pages Functions
 * Intercepts all /api/* requests for bot defense and security
 */

import { checkBot } from '../middlewares/bot-defense.js';
import { jsonResponse } from '../utils/utils.js';

export async function onRequest(context) {
    const { request, next } = context;

    // Fast-path bot defense check
    const botCheck = checkBot(request);
    if (botCheck.isBot) {
        console.warn(`[BotDefense] Blocked request: ${botCheck.reason}`);
        return jsonResponse(
            { error: 'Access denied: automated requests not allowed', code: 'BOT_DETECTED' },
            403
        );
    }

    return next();
}
