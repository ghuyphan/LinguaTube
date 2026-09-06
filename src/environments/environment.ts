export const environment = {
  production: false,
  // Add your API keys here
  jishoApiUrl: 'https://jisho.org/api/v1/search/words',
  // For production, use a CORS proxy or your own backend
  corsProxyUrl: '',
  // PocketBase/PocketHost URL - configure your instance URL here
  pocketbaseUrl: 'https://voca.pockethost.io',

  // Cloudflare Turnstile CAPTCHA
  turnstileSiteKey: '0x4AAAAAAEovhgOIyoBL8eMc',

  // Centralized API Endpoints
  api: {
    // Dictionary
    dict: '/api/dict',

    // Subtitles & Translation
    tokenizeBatch: '/api/tokenize-batch',
    translate: '/api/translate',
    translateBatch: '/api/translate/batch',
    dualSubtitles: '/api/dual-subtitles',

    // Transcripts
    transcript: '/api/transcript',

    // Video
    videoInfo: '/api/video-info',
  }
};
