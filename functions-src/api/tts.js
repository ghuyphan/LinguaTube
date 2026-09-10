/**
 * Edge Neural Text-to-Speech API (Cloudflare Pages Function)
 * Endpoint: GET /api/tts?text={text}&lang={ja|zh|ko|en}&voice={optionalVoice}
 * 
 * Generates natural Azure Neural TTS audio using Microsoft Edge synthesis.
 * Incurs ZERO Cloudflare KV operations.
 * Cached via HTTP CDN & browser disk headers: public, max-age=2592000, immutable.
 */

import {
  handleOptions,
  jsonResponse,
  sanitizeLanguage,
} from '../utils/utils.js';
import { synthesizeEdgeTts, DEFAULT_VOICES } from '../utils/edge-tts.js';

// In-memory rate limiting map across warm Worker isolate requests
// Prevents burning daily Cloudflare KV write quota (Rule 2: In-Memory First)
const memTtsRateLimits = new Map();
const MAX_MEM_ENTRIES = 1000;
const TTS_RATE_LIMIT = 120; // 120 requests per hour per IP
const RATE_WINDOW_MS = 60 * 60 * 1000;

function checkInMemoryRateLimit(clientIp) {
  const now = Date.now();
  if (memTtsRateLimits.size > MAX_MEM_ENTRIES) {
    for (const [ip, record] of memTtsRateLimits.entries()) {
      if (now > record.resetAt) {
        memTtsRateLimits.delete(ip);
      }
    }
  }

  let entry = memTtsRateLimits.get(clientIp);
  if (!entry || now > entry.resetAt) {
    entry = { count: 0, resetAt: now + RATE_WINDOW_MS };
    memTtsRateLimits.set(clientIp, entry);
  }

  entry.count += 1;
  return entry.count <= TTS_RATE_LIMIT;
}

export async function onRequest(context) {
  const { request } = context;

  if (request.method === 'OPTIONS') {
    return handleOptions(['GET', 'POST', 'OPTIONS']);
  }

  let text = '';
  let lang = 'ja';
  let voice = undefined;

  if (request.method === 'POST') {
    try {
      const body = await request.json();
      text = body?.text || '';
      lang = body?.lang || body?.language || 'ja';
      voice = body?.voice;
    } catch {
      return jsonResponse({ error: 'Invalid JSON body' }, 400);
    }
  } else {
    const url = new URL(request.url);
    text = url.searchParams.get('text') || '';
    lang = url.searchParams.get('lang') || url.searchParams.get('language') || 'ja';
    voice = url.searchParams.get('voice') || undefined;
  }

  const cleanText = (text || '').trim();
  if (!cleanText) {
    return jsonResponse({ error: 'Missing required parameter: text' }, 400);
  }

  if (cleanText.length > 300) {
    return jsonResponse({ error: 'Text too long (max 300 characters)' }, 400);
  }

  const cleanLang = sanitizeLanguage(lang, ['ja', 'zh', 'ko', 'en']) || 'ja';

  // In-memory rate limiting check (0 KV operations)
  const clientIp = request.headers.get('CF-Connecting-IP') || 
                   request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim() || 
                   'unknown';

  if (!checkInMemoryRateLimit(clientIp)) {
    return jsonResponse({ error: 'Rate limit exceeded. Please try again later.' }, 429);
  }

  try {
    const audioBuffer = await synthesizeEdgeTts(cleanText, {
      language: cleanLang,
      voice,
      timeoutMs: 7000,
    });

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=2592000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'X-TTS-Engine': 'Edge-Neural',
        'X-TTS-Voice': voice || DEFAULT_VOICES[cleanLang] || 'default',
      },
    });
  } catch (err) {
    console.error(`[EdgeTTS] Synthesis failed for text "${cleanText.slice(0, 30)}...":`, err.message || err);
    return jsonResponse({
      error: 'TTS synthesis failed',
      message: err.message || 'Internal error',
    }, 502);
  }
}
