/**
 * Unified Tokenization API (Cloudflare Function)
 * Dynamic route handling Japanese, Korean, and Chinese tokenization
 * Uses Intl.Segmenter for word segmentation (built-in)
 */

import { pinyin } from 'pinyin-pro';
import { convert as romanizeKorean } from 'hangul-romanization';
import { jsonResponse, handleOptions, errorResponse } from '../../_shared/utils.js';

const SUPPORTED_LANGUAGES = new Set(['ja', 'ko', 'zh']);

export async function onRequest(context) {
    const { request, params } = context;
    const lang = params.lang;

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
        return handleOptions(['POST', 'OPTIONS']);
    }

    // Validate language
    if (!SUPPORTED_LANGUAGES.has(lang)) {
        return jsonResponse(
            { error: `Unsupported language: ${lang}. Supported: ja, ko, zh` },
            400
        );
    }

    if (request.method !== 'POST') {
        return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    try {
        const { text } = await request.json();

        if (!text || typeof text !== 'string') {
            return jsonResponse({ error: 'Missing or invalid "text" field' }, 400);
        }

        // Use Intl.Segmenter for word segmentation
        const segmenter = new Intl.Segmenter(lang, { granularity: 'word' });
        const segments = [...segmenter.segment(text)];

        // Convert to token format and add readings
        const tokens = segments
            .filter(seg => seg.isWordLike || seg.segment.trim())
            .map(seg => {
                const token = { surface: seg.segment };

                // Add Chinese Pinyin
                if (lang === 'zh') {
                    try {
                        const py = pinyin(token.surface, { toneType: 'symbol', type: 'string' });
                        if (py !== token.surface) {
                            token.pinyin = py;
                        }
                    } catch (e) {
                        // Ignore errors
                    }
                }

                // Add Korean Romanization
                if (lang === 'ko') {
                    try {
                        token.romanization = romanizeKorean(token.surface);
                    } catch (e) {
                        // Ignore errors
                    }
                }

                return token;
            });

        return jsonResponse({ tokens });

    } catch (error) {
        console.error(`[Tokenize ${lang.toUpperCase()}] Error:`, error);
        return errorResponse(error.message);
    }
}
