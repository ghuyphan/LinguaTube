/**
 * Shared utilities for Cloudflare Pages Functions
 */

/**
 * Common CORS headers for API responses
 */
export const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

/**
 * Create a JSON response with proper headers
 * @param {any} data - Response data to serialize
 * @param {number} status - HTTP status code (default: 200)
 * @param {object} extraHeaders - Additional headers to include
 * @returns {Response}
 */
export function jsonResponse(data, status = 200, extraHeaders = {}) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            ...extraHeaders
        }
    });
}

/**
 * Handle CORS preflight OPTIONS requests
 * @param {string[]} methods - Allowed HTTP methods (default: ['GET', 'POST', 'OPTIONS'])
 * @returns {Response}
 */
export function handleOptions(methods = ['GET', 'POST', 'OPTIONS']) {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': methods.join(', '),
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    });
}

/**
 * Validate YouTube video ID format
 * @param {string} id - Video ID to validate
 * @returns {boolean} - True if valid 11-character YouTube ID
 */
export function validateVideoId(id) {
    if (!id || typeof id !== 'string') return false;
    return /^[a-zA-Z0-9_-]{11}$/.test(id);
}

/**
 * Standard error response - sanitizes messages in production
 */
export function errorResponse(message, status = 500) {
    // Log full error for debugging
    console.error(`[Error ${status}]`, message);

    // Don't leak internal details for server errors
    const safeMessage = status >= 500
        ? 'Internal server error'
        : sanitizeMessage(message);

    return jsonResponse({ error: safeMessage }, status);
}

/**
 * Remove sensitive info from error messages
 */
function sanitizeMessage(message) {
    if (typeof message !== 'string') return 'Unknown error';

    return message
        .replace(/\/[^\s]*\.(js|ts)/g, '[file]')  // Remove file paths
        .replace(/at\s+.+\(.+\)/g, '')             // Remove stack traces
        .replace(/Bearer\s+[^\s]+/g, 'Bearer [redacted]')
        .slice(0, 200);
}

/**
 * Sanitize word input for dictionary lookups
 * Prevents injection and limits length
 * @param {string} word - Raw word input
 * @returns {string|null} - Sanitized word or null if invalid
 */
export function sanitizeWord(word) {
    if (!word || typeof word !== 'string') return null;

    return word
        .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
        .replace(/[<>\"\'\\]/g, '')       // Remove potential injection chars
        .trim()
        .slice(0, 100); // Limit length
}

/**
 * Sanitize video ID
 * @param {string} id - Raw video ID
 * @returns {string|null} - Sanitized ID or null if invalid
 */
export function sanitizeVideoId(id) {
    if (!id || typeof id !== 'string') return null;
    // YouTube IDs are exactly 11 chars: alphanumeric, dash, underscore
    const cleaned = id.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 11);
    return cleaned.length === 11 ? cleaned : null;
}

/**
 * Validate and sanitize language code
 * @param {string} lang - Language code
 * @param {string[]} allowed - Allowed language codes
 * @returns {string|null} - Valid language or null
 */
export function sanitizeLanguage(lang, allowed = ['ja', 'zh', 'ko', 'en', 'vi']) {
    if (!lang || typeof lang !== 'string') return null;
    const cleaned = lang.toLowerCase().trim().slice(0, 5);
    return allowed.includes(cleaned) ? cleaned : null;
}

/**
 * Add consistent CORS headers for all responses
 */
export function addCorsHeaders(response) {
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return new Response(response.body, { ...response, headers });
}

/**
 * Validate text input length
 * @param {string} text - Text to validate
 * @param {number} maxLength - Maximum allowed length in characters (default: 10000)
 * @returns {{valid: boolean, error?: string}}
 */
export function validateTextLength(text, maxLength = 10000) {
    if (!text || typeof text !== 'string') {
        return { valid: false, error: 'Missing or invalid text field' };
    }
    if (text.length > maxLength) {
        return { valid: false, error: `Text too long (max ${maxLength} characters)` };
    }
    return { valid: true };
}

/**
 * Validate batch/array size
 * @param {Array} items - Array to validate
 * @param {number} maxSize - Maximum allowed items (default: 100)
 * @returns {{valid: boolean, error?: string}}
 */
export function validateBatchSize(items, maxSize = 100) {
    if (!Array.isArray(items)) {
        return { valid: false, error: 'Items must be an array' };
    }
    if (items.length === 0) {
        return { valid: false, error: 'Items array cannot be empty' };
    }
    if (items.length > maxSize) {
        return { valid: false, error: `Too many items (max ${maxSize})` };
    }
    return { valid: true };
}

/**
 * Verify that text matches expected language
 * Uses Unicode script detection to catch silent fallback to wrong language
 * @param {string} text - Sample text to verify
 * @param {string} expectedLang - Expected language code
 * @returns {boolean} - True if language appears correct
 */
export function verifyLanguage(text, expectedLang) {
    if (!text || text.length < 50) return true; // Too short to verify reliably

    const sample = text.slice(0, 1000);

    // Japanese: Hiragana/Katakana presence
    if (expectedLang === 'ja') {
        const kanaCount = (sample.match(/[\u3040-\u309F\u30A0-\u30FF]/g) || []).length;
        return kanaCount > 5;
    }

    // Korean: Hangul presence
    if (expectedLang === 'ko') {
        const hangulCount = (sample.match(/[\uAC00-\uD7AF]/g) || []).length;
        const kanaCount = (sample.match(/[\u3040-\u309F\u30A0-\u30FF]/g) || []).length;
        if (kanaCount > hangulCount * 2) return false;
        return hangulCount > 5;
    }

    // Chinese: CJK Unified Ideographs but NO Hiragana/Katakana/Hangul
    if (expectedLang === 'zh') {
        const hanziCount = (sample.match(/[\u4E00-\u9FFF]/g) || []).length;
        const kanaCount = (sample.match(/[\u3040-\u309F\u30A0-\u30FF]/g) || []).length;
        const hangulCount = (sample.match(/[\uAC00-\uD7AF]/g) || []).length;
        return hanziCount > 10 && kanaCount < 5 && hangulCount < 5;
    }

    return true; // Default to pass for other languages
}
