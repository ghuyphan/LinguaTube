export const environment = {
  production: false,
  // Add your API keys here
  jishoApiUrl: 'https://jisho.org/api/v1/search/words',
  // For production, use a CORS proxy or your own backend
  corsProxyUrl: '',
  // PocketBase/PocketHost URL - configure your instance URL here
  pocketbaseUrl: 'https://voca.pockethost.io',

  // Cloudflare Turnstile CAPTCHA (Always-passes test key for development)
  turnstileSiteKey: '1x00000000000000000000AA',

  // Centralized API Endpoints
  api: {
    // Dictionary
    dict: '/api/dict',
    jotobaProxy: '/proxy/jotoba/api/search/words',
    mdbg: '/api/mdbg',
    krdict: '/api/krdict',
    endict: '/api/endict',

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
