import { resolveVerifiedVideoMetadata } from '../services/video-metadata.service.js';
import { readBoundedBody } from '../utils/response-body.js';

const inFlightDetails = new Map();

/**
 * Video Validation Utilities
 * Shared validation for language and duration before expensive API calls
 */

// Supported languages for the app
export const SUPPORTED_LANGUAGES = ['ja', 'ko', 'zh', 'en'];

// Max video duration limits (in seconds)
export const MAX_DURATION = {
    innertube: 3 * 60 * 60,  // 3 hours for regular captions
    whisper: 20 * 60         // 20 minutes for AI transcription
};

/**
 * Scrape approximate video duration and livestream status from YouTube public page (free, no API key required)
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<{duration: number | null, isLive: boolean}>} Duration in seconds and livestream flag
 */
export async function fetchYouTubeVideoDetails(videoId) {
    const existing = inFlightDetails.get(videoId);
    if (existing) return existing;
    const pending = loadYouTubeVideoDetails(videoId);
    if (inFlightDetails.size >= 100) return pending;
    inFlightDetails.set(videoId, pending);
    try { return await pending; }
    finally { if (inFlightDetails.get(videoId) === pending) inFlightDetails.delete(videoId); }
}

async function loadYouTubeVideoDetails(videoId) {
    if (!videoId) return { duration: null, isLive: false };
    try {
        const signal = AbortSignal.timeout(6000);
        const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            signal, redirect: 'manual'
        });
        if (!res.ok) return { duration: null, isLive: false };
        const html = new TextDecoder().decode(await readBoundedBody(res, signal, 8 * 1024 * 1024));
        const isLive = /"isLive(?:Broadcast|Content|Now)?"\s*:\s*true|"status"\s*:\s*"LIVE"/i.test(html);
        const match = html.match(/"approxDurationMs"\s*:\s*"(\d+)"/);
        let duration = null;
        if (match && match[1]) {
            const seconds = Math.ceil(parseInt(match[1], 10) / 1000);
            if (!isNaN(seconds) && seconds > 0) duration = seconds;
        }
        if (!duration) {
            const matchLen = html.match(/"lengthSeconds"\s*:\s*"(\d+)"/);
            if (matchLen && matchLen[1]) {
                const seconds = parseInt(matchLen[1], 10);
                if (!isNaN(seconds) && seconds > 0) duration = seconds;
            }
        }
        if (!duration) {
            const matchIso = html.match(/itemprop="duration"\s+content="PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?"/i);
            if (matchIso) {
                const h = parseInt(matchIso[1] || '0', 10);
                const m = parseInt(matchIso[2] || '0', 10);
                const s = parseInt(matchIso[3] || '0', 10);
                const total = h * 3600 + m * 60 + s;
                if (total > 0) duration = total;
            }
        }

        let genre = null;
        const genreMatch = html.match(/itemprop="genre"\s+content="([^"]+)"/i) || html.match(/"category":"([^"]+)"/i);
        if (genreMatch && genreMatch[1]) {
            genre = genreMatch[1].replace(/&amp;/g, '&').trim();
        }

        const tags = [];
        const tagMatches = html.matchAll(/<meta\s+property="og:video:tag"\s+content="([^"]+)"/gi);
        for (const tm of tagMatches) {
            if (tm[1] && !tags.includes(tm[1].trim())) {
                tags.push(tm[1].trim());
            }
        }

        return { duration, isLive, genre, tags };
    } catch {
        return { duration: null, isLive: false, genre: null, tags: [] };
    }
}

/**
 * Scrape approximate video duration from YouTube public page (free, no API key required)
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<number | null>} Duration in seconds, or null
 */
export async function fetchYouTubeDuration(videoId) {
    const details = await fetchYouTubeVideoDetails(videoId);
    if (details.isLive) return null;
    return details.duration;
}

/** Public metadata compatibility shape backed by the official server resolver. */
export async function getVideoMetadata(videoId, context = null) {
    if (!context) return null;
    try {
        const { snippet } = await resolveVerifiedVideoMetadata(context, videoId, { includeDisplay: true });
        return { title: snippet.title, author_name: snippet.channel,
            author_url: `https://www.youtube.com/channel/${snippet.channelId}`, thumbnail_url: snippet.thumbnail };
    } catch {
        return null;
    }
}

/**
 * Fetch channel avatar from YouTube channel page
 * @param {string} authorUrl - YouTube channel URL (e.g. https://www.youtube.com/@ChannelName)
 * @returns {Promise<string | null>}
 */
export async function fetchChannelAvatar(authorUrl) {
    if (!authorUrl || typeof authorUrl !== 'string') return null;
    const cleanUrl = authorUrl.trim();
    if (!cleanUrl.startsWith('https://www.youtube.com/') && !cleanUrl.startsWith('https://youtube.com/')) {
        return null;
    }
    if (cleanUrl.includes('/redirect')) {
        return null;
    }

    try {
        const res = await fetch(cleanUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html'
            },
            signal: AbortSignal.timeout(4500),
            redirect: 'manual'
        });
        let targetRes = res;
        if (res.status >= 300 && res.status < 400) {
            const loc = res.headers.get('location');
            if (loc && (loc.startsWith('https://www.youtube.com/') || loc.startsWith('https://youtube.com/') || loc.startsWith('/@') || loc.startsWith('/channel/'))) {
                const targetUrl = loc.startsWith('/') ? `https://www.youtube.com${loc}` : loc;
                if (targetUrl.includes('/redirect')) return null;
                targetRes = await fetch(targetUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Accept': 'text/html'
                    },
                    signal: AbortSignal.timeout(3000),
                    redirect: 'manual'
                });
                if (targetRes.status >= 300 && targetRes.status < 400) {
                    return null;
                }
            } else {
                return null;
            }
        }
        if (!targetRes.ok) return null;
        const html = await targetRes.text();
        const match = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i)
            || html.match(/<link\s+rel=["']image_src["']\s+href=["']([^"']+)["']/i);
        if (match && match[1]) {
            const avatarUrl = match[1];
            if (avatarUrl.includes('ggpht.com') || avatarUrl.includes('googleusercontent.com')) {
                return avatarUrl;
            }
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * Resolve channel avatar URL for a video ID or author URL
 * Resolves author_url via oEmbed if needed, then extracts the creator avatar
 * @param {string} videoId - YouTube video ID
 * @param {string} [authorUrl] - Optional author channel URL
 * @returns {Promise<string | null>}
 */
export async function resolveVideoChannelAvatar(videoId, authorUrl = null) {
    if (authorUrl) {
        const directAvatar = await fetchChannelAvatar(authorUrl);
        if (directAvatar) return directAvatar;
    }

    if (!videoId || typeof videoId !== 'string') return null;

    try {
        const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`, {
            signal: AbortSignal.timeout(4000)
        });
        if (!oembedRes.ok) return null;
        const data = await oembedRes.json();
        if (data && data.author_url) {
            return await fetchChannelAvatar(data.author_url);
        }
    } catch {
        return null;
    }
    return null;
}

/**
 * Detect language from video title using Unicode patterns
 * @param {string} title - Video title
 * @returns {'ja' | 'ko' | 'zh' | 'en' | 'unknown'}
 */
export function detectTitleLanguage(title) {
    if (!title) return 'unknown';

    // Japanese: Contains Hiragana or Katakana
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(title)) return 'ja';

    // Korean: Contains Hangul
    if (/[\uAC00-\uD7AF\u1100-\u11FF]/.test(title)) return 'ko';

    // Chinese: Contains CJK characters but no Japanese kana
    if (/[\u4E00-\u9FFF]/.test(title) && !/[\u3040-\u309F\u30A0-\u30FF]/.test(title)) return 'zh';

    // English: Mostly Latin letters after stripping emojis/punctuation/numbers
    const cleanLetters = title.replace(/[\p{Emoji}\p{Symbol}\p{Punctuation}\d\s]/gu, '');
    if (cleanLetters.length > 0) {
        const latinRatio = (cleanLetters.match(/[a-zA-Z]/g) || []).length / cleanLetters.length;
        if (latinRatio > 0.7) return 'en';
    }

    return 'unknown';
}

/**
 * Check if a language is supported
 * @param {string} lang - Language code
 * @returns {boolean}
 */
export function isLanguageSupported(lang) {
    return SUPPORTED_LANGUAGES.includes(lang);
}

/**
 * Validate video request - returns null if valid, error object if invalid
 * @param {string} videoId - YouTube video ID
 * @param {string} requestedLang - Requested language code
 * @param {number} [duration] - Video duration in seconds (optional)
 * @param {'innertube' | 'whisper'} endpoint - Which endpoint is calling
 * @param {number} [maxDurationOverride] - Max duration limit override
 * @param {Object} [options] - Additional hints { title, channel }
 * @returns {Promise<{error: string, [key: string]: any} | null>}
 */
export async function validateVideoRequest(videoId, requestedLang, duration, endpoint = 'innertube', maxDurationOverride = null, options = {}) {
    if (duration != null && (typeof duration !== 'number' || !Number.isFinite(duration) || duration <= 0)) {
        return { error: 'invalid_duration' };
    }
    // 0. Validate videoId format
    if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        return {
            error: 'invalid_video_id',
            message: 'Invalid YouTube video ID format'
        };
    }

    // 1. Validate requested language is supported
    if (!isLanguageSupported(requestedLang)) {
        return {
            error: 'unsupported_language',
            requestedLanguage: requestedLang,
            supportedLanguages: SUPPORTED_LANGUAGES
        };
    }

    // 2. Validate duration
    const maxDuration = maxDurationOverride || MAX_DURATION[endpoint];
    let effectiveDuration = duration;

    // For whisper/AI, ALWAYS verify via YouTube page details, never trust client-supplied duration
    if (endpoint === 'whisper') {
        const ytDetails = await fetchYouTubeVideoDetails(videoId);
        if (ytDetails.isLive) {
            return {
                error: 'livestream_unsupported',
                message: 'AI transcription is not supported for live streams'
            };
        }
        if (!Number.isFinite(ytDetails.duration) || ytDetails.duration <= 0) return { error: 'video_duration_unavailable' };
        effectiveDuration = ytDetails.duration;
    }

    if (effectiveDuration && effectiveDuration > maxDuration) {
        return {
            error: 'video_too_long',
            duration: effectiveDuration,
            maxDuration,
            maxDurationMinutes: Math.round(maxDuration / 60)
        };
    }

    // 3. Optional: Check video title for language hint
    const title = options.title || (options.skipMetadata ? null : (await getVideoMetadata(videoId, options.context))?.title);
    if (title) {
        const detectedLang = detectTitleLanguage(title);

        // Only reject if the title is clearly in an unsupported non-Latin/non-CJK script (e.g. Cyrillic, Arabic, Thai, Devanagari)
        if (detectedLang === 'unknown') {
            const cleanTitle = title.replace(/[\p{Emoji}\p{Symbol}\p{Punctuation}\d\s]/gu, '');
            const hasCJK = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/.test(cleanTitle);
            const hasLatin = /[a-zA-Z]/.test(cleanTitle);
            const hasUnsupportedScript = /[\u0400-\u04FF\u0600-\u06FF\u0E00-\u0E7F\u0900-\u097F]/.test(cleanTitle);

            if (hasUnsupportedScript && !hasCJK && !hasLatin) {
                return {
                    error: 'unsupported_video_language',
                    videoTitle: title,
                    message: 'This video appears to be in an unsupported language'
                };
            }
        }
    }

    return null; // Valid
}
