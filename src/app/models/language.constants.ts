export interface SupportedLanguage {
  code: 'ja' | 'zh' | 'ko' | 'en';
  name: string;
  nativeName?: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: readonly SupportedLanguage[] = [
  { code: 'ja', name: '日本語', nativeName: '日本語', flag: 'https://hatscripts.github.io/circle-flags/flags/jp.svg' },
  { code: 'zh', name: '中文', nativeName: '中文', flag: 'https://hatscripts.github.io/circle-flags/flags/cn.svg' },
  { code: 'ko', name: '한국어', nativeName: '한국어', flag: 'https://hatscripts.github.io/circle-flags/flags/kr.svg' },
  { code: 'en', name: 'English', nativeName: 'English', flag: 'https://hatscripts.github.io/circle-flags/flags/gb.svg' }
] as const;
