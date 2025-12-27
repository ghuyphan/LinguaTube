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
 * Create an error response
 * @param {string} message - Error message
 * @param {number} status - HTTP status code (default: 500)
 * @returns {Response}
 */
export function errorResponse(message, status = 500) {
    return jsonResponse({ error: message }, status);
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
