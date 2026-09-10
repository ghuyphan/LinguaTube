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
import { synthesizeEdgeTts, normalizeVoiceName, getCachedAudio } from '../utils/edge-tts.js';

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

async function fetchGoogleTts(text, lang) {
  const tlMap = { ja: 'ja', zh: 'zh-CN', ko: 'ko', en: 'en' };
  const targetLang = tlMap[lang] || lang;
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${encodeURIComponent(targetLang)}&client=tw-ob`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
      'Referer': 'https://translate.google.com/',
    },
  });
  if (!res.ok) {
    throw new Error(`Google TTS HTTP ${res.status}`);
  }
  const buffer = await res.arrayBuffer();
  if (!buffer || buffer.byteLength < 100) {
    throw new Error('Google TTS returned empty audio');
  }
  return buffer;
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

  const resolvedVoice = normalizeVoiceName(voice, cleanLang);
  const cacheKey = `${cleanLang}:${resolvedVoice}:${cleanText}`;
  const isMemoryHit = !!getCachedAudio(cacheKey);

  // 1. Primary: Microsoft Edge Neural TTS
  try {
    const audioBuffer = await synthesizeEdgeTts(cleanText, {
      language: cleanLang,
      voice,
      timeoutMs: 5000,
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
        'X-TTS-Voice': resolvedVoice,
        'X-Cache': isMemoryHit ? 'HIT-MEMORY' : 'MISS',
      },
    });
  } catch (edgeErr) {
    console.warn(`[EdgeTTS] Edge synthesis failed for "${cleanText.slice(0, 30)}", falling back to Google TTS:`, edgeErr.message || edgeErr);

    // 2. Server-side Failover: Google Translate TTS stream (ensures >99.5% reliability with zero client CORS issues)
    try {
      const googleBuffer = await fetchGoogleTts(cleanText, cleanLang);
      return new Response(googleBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Length': googleBuffer.byteLength.toString(),
          'Cache-Control': 'public, max-age=2592000, immutable',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'X-TTS-Engine': 'Google-Fallback',
          'X-Cache': 'MISS',
        },
      });
    } catch (googleErr) {
      console.error(`[TTS] Both Edge & Google TTS failed for "${cleanText.slice(0, 30)}":`, googleErr.message || googleErr);
      return jsonResponse({
        error: 'TTS synthesis failed',
        message: edgeErr.message || 'Internal error',
      }, 502);
    }
  }
}
