/**
 * Bot Defense Module for Cloudflare Pages Functions
 * Protects API endpoints from automated scrapers, crawlers, and abusive scripts
 * Cost: 0 KV reads, 0 KV writes, < 0.1ms CPU
 */

// Known scraper, crawler, and automation User-Agent signatures
const BAD_USER_AGENTS = [
    'curl/',
    'python-requests',
    'python-urllib',
    'aiohttp',
    'httpx',
    'scrapy',
    'go-http-client',
    'java/',
    'apache-httpclient',
    'wget/',
    'libwww-perl',
    'mechanize',
    'node-fetch',
    'axios/',
    'postmanruntime',
    'insomnia',
    'gptbot',
    'chatgpt-user',
    'bytespider',
    'claudebot',
    'anthropic-ai',
    'ccbot',
    'diffbot',
    'semrushbot',
    'ahrefsbot',
    'mj12bot',
    'dotbot'
];

/**
 * Check if incoming request exhibits bot or scraper characteristics
 * @param {Request} request
 * @returns {{ isBot: boolean, reason?: string }}
 */
export function checkBot(request) {
    // Allow CORS preflight requests without checking User-Agent
    if (request.method === 'OPTIONS') {
        return { isBot: false };
    }

    const userAgent = (request.headers.get('user-agent') || '').toLowerCase().trim();

    // 1. Missing or empty User-Agent (typical of basic scripts/bots)
    if (!userAgent || userAgent.length < 5) {
        return { isBot: true, reason: 'missing_user_agent' };
    }

    // 2. Automated tool / scraper User-Agent match
    for (const bad of BAD_USER_AGENTS) {
        if (userAgent.includes(bad)) {
            return { isBot: true, reason: `bad_user_agent:${bad}` };
        }
    }

    // 3. Cloudflare Threat Intelligence (score > 40 indicates high risk/known abusive IP)
    const threatScore = request.cf?.threatScore;
    if (typeof threatScore === 'number' && threatScore > 40) {
        return { isBot: true, reason: `cf_threat_score:${threatScore}` };
    }

    return { isBot: false };
}
