import { readBoundedBody } from '../utils/response-body.js';
/**
 * Edge Neural Text-to-Speech API (Cloudflare Pages Function)
 * Endpoint: GET /api/tts?text={text}&lang={ja|zh|ko|en}&voice={optionalVoice}
 * 
 * Generates natural Azure Neural TTS audio using Microsoft Edge synthesis.
 * Incurs ZERO Cloudflare KV operations.
 * Successful neural synthesis is cached for 30 days.
 */

import {
  jsonResponse,
  sanitizeLanguage,
  getRequestJson,
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
  if (memTtsRateLimits.size >= MAX_MEM_ENTRIES) {
    for (const [ip, record] of memTtsRateLimits.entries()) {
      if (now > record.resetAt) {
        memTtsRateLimits.delete(ip);
      }
    }
    if (memTtsRateLimits.size >= MAX_MEM_ENTRIES) {
      const oldestKey = memTtsRateLimits.keys().next().value;
      if (oldestKey) memTtsRateLimits.delete(oldestKey);
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
  const tlMap = { ja: 'ja', zh: 'zh-CN', ko: 'ko', en: 'en', vi: 'vi' };
  const targetLang = tlMap[lang] || lang;
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=${encodeURIComponent(targetLang)}&client=tw-ob`;
  const signal = AbortSignal.timeout(5000);
  const res = await fetch(url, {
    signal,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
      'Referer': 'https://translate.google.com/',
    },
  });
  if (!res.ok) {
    throw new Error(`Google TTS HTTP ${res.status}`);
  }
  const bytes = await readBoundedBody(res, signal, 1024 * 1024);
  const buffer = bytes.buffer;
  if (!buffer || buffer.byteLength < 100) {
    throw new Error('Google TTS returned empty audio');
  }
  return buffer;
}

export async function onRequest(context) {
  const { request } = context;

  let text = '';
  let lang = 'ja';
  let voice = undefined;

  if (request.method === 'POST') {
    try {
      const body = await getRequestJson(context);
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

  if (typeof text !== 'string' || typeof lang !== 'string' || (voice != null && typeof voice !== 'string')) return jsonResponse({ error: 'Invalid TTS parameter types' }, 400);
  const cleanText = text.trim();
  if (!cleanText) {
    return jsonResponse({ error: 'Missing required parameter: text' }, 400);
  }

  if (cleanText.length > 300) {
    return jsonResponse({ error: 'Text too long (max 300 characters)' }, 400);
  }

  const cleanLang = sanitizeLanguage(lang) || 'ja';

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
  const edgeCacheUrl = new URL(
    `/api/tts?lang=${encodeURIComponent(cleanLang)}&voice=${encodeURIComponent(resolvedVoice)}&text=${encodeURIComponent(cleanText)}`,
    new URL(request.url).origin
  );

  const neuralCacheControl = 'public, max-age=2592000, immutable';
  const audioResponse = (buffer, cacheStatus, isFallback = false) => new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Length': buffer.byteLength.toString(),
      'Cache-Control': isFallback ? 'no-store' : neuralCacheControl,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'X-TTS-Engine': isFallback ? 'Google-Fallback' : 'Edge-Neural',
      ...(!isFallback && { 'X-TTS-Voice': resolvedVoice }),
      'X-Cache': cacheStatus,
    },
  });

  let regional;
  if (!isMemoryHit) {
    try {
      regional = await globalThis.caches?.open('tts-v2');
      const edgeHit = await regional?.match(edgeCacheUrl);
      if (edgeHit?.ok) {
        return audioResponse(await edgeHit.arrayBuffer(), 'HIT-EDGE');
      }
    } catch { /* Fall through to synthesis. */ }
  }

  // 1. Primary: Microsoft Edge Neural TTS
  try {
    const audioBuffer = await synthesizeEdgeTts(cleanText, {
      language: cleanLang,
      voice,
      timeoutMs: 5000,
    });
    if (regional && context.waitUntil && audioBuffer.byteLength > 0) {
      context.waitUntil(regional.put(edgeCacheUrl, new Response(audioBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': neuralCacheControl,
        },
      })).catch(() => {}));
    }
    return audioResponse(audioBuffer, isMemoryHit ? 'HIT-MEMORY' : 'MISS');
  } catch {
    console.warn('[EdgeTTS] Synthesis failed; trying fallback');

    // 2. Server-side fallback with a bounded audio read
    try {
      const googleBuffer = await fetchGoogleTts(cleanText, cleanLang);
      return audioResponse(googleBuffer, 'MISS', true);
    } catch {
      console.error('[TTS] Both providers unavailable');
      return jsonResponse({ error: 'TTS synthesis failed' }, 502, { 'Cache-Control': 'no-store' });
    }
  }
}
