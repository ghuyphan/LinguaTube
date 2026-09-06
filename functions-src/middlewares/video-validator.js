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
 * Scrape approximate video duration from YouTube public page (free, no API key required)
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<number | null>} Duration in seconds, or null
 */
export async function fetchYouTubeDuration(videoId) {
    if (!videoId) return null;
    try {
        const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            signal: AbortSignal.timeout(4000)
        });
        if (!res.ok) return null;
        const html = await res.text();
        const match = html.match(/"approxDurationMs":"(\d+)"/);
        if (match && match[1]) {
            const seconds = Math.round(parseInt(match[1], 10) / 1000);
            if (!isNaN(seconds) && seconds > 0) return seconds;
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * Fetch video metadata from YouTube oEmbed (free, no API key required)
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<{title: string, author_name: string} | null>}
 */
export async function getVideoMetadata(videoId) {
    try {
        const url = `https://www.youtube.com/oembed?format=json&url=https://www.youtube.com/watch?v=${videoId}`;
        const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
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
 * @returns {Promise<{error: string, [key: string]: any} | null>}
 */
export async function validateVideoRequest(videoId, requestedLang, duration, endpoint = 'innertube') {
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
    const maxDuration = MAX_DURATION[endpoint];
    let effectiveDuration = duration;

    // For whisper (AI transcription), if client duration is missing or needs verification, attempt server check
    if (!effectiveDuration && endpoint === 'whisper') {
        effectiveDuration = await fetchYouTubeDuration(videoId);
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
    const metadata = await getVideoMetadata(videoId);
    if (metadata?.title) {
        const detectedLang = detectTitleLanguage(metadata.title);

        // Only reject if the title is clearly in an unsupported non-Latin/non-CJK script (e.g. Cyrillic, Arabic, Thai, Devanagari)
        if (detectedLang === 'unknown') {
            const cleanTitle = metadata.title.replace(/[\p{Emoji}\p{Symbol}\p{Punctuation}\d\s]/gu, '');
            const hasCJK = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uAC00-\uD7AF]/.test(cleanTitle);
            const hasLatin = /[a-zA-Z]/.test(cleanTitle);
            const hasUnsupportedScript = /[\u0400-\u04FF\u0600-\u06FF\u0E00-\u0E7F\u0900-\u097F]/.test(cleanTitle);

            if (hasUnsupportedScript && !hasCJK && !hasLatin) {
                return {
                    error: 'unsupported_video_language',
                    videoTitle: metadata.title,
                    message: 'This video appears to be in an unsupported language'
                };
            }
        }
    }

    return null; // Valid
}
