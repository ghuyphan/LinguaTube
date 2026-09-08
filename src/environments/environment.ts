export const environment = {
  production: false,
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
    translateBatch: '/api/translate/batch',
    dualSubtitles: '/api/dual-subtitles',

    // Transcripts
    transcript: '/api/transcript',

    // Video recommendations
    recommendedVideos: '/api/recommended-videos',
  }
};
