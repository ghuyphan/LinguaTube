export const environment = {
  production: false,
  // Supabase Configuration
  supabaseUrl: 'https://edbkvzviqeulwzcnrrlb.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkYmt2enZpcWV1bHd6Y25ycmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NTI5NjAsImV4cCI6MjEwNTAyODk2MH0.F2Js6UWUyUX-uVfDMVCNLJBG7eL6Clo9EGimjh2wgUg',

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
