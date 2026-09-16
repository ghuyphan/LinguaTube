export interface SupportedLanguage {
  code: 'ja' | 'zh' | 'ko' | 'en';
  name: string;
  nativeName?: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: readonly SupportedLanguage[] = [
  { code: 'ja', name: '日本語', nativeName: '日本語', flag: '/flags/jp.svg' },
  { code: 'zh', name: '中文', nativeName: '中文', flag: '/flags/cn.svg' },
  { code: 'ko', name: '한국어', nativeName: '한국어', flag: '/flags/kr.svg' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '/flags/gb.svg' }
] as const;

export const LANGUAGE_FLAGS: Record<string, string> = {
  ja: '/flags/jp.svg',
  zh: '/flags/cn.svg',
  ko: '/flags/kr.svg',
  en: '/flags/gb.svg',
  vi: '/flags/vn.svg',
  es: '/flags/es.svg',
  fr: '/flags/fr.svg',
  de: '/flags/de.svg',
  it: '/flags/it.svg',
  ru: '/flags/ru.svg',
  pt: '/flags/pt.svg',
  th: '/flags/th.svg',
  id: '/flags/id.svg',
};

/**
 * Returns the circular SVG flag URL for a given language code.
 * Supports BCP 47 language tags (e.g. 'zh-CN', 'zh-Hans', 'en-US', 'ja-JP').
 * Defaults to the English (GB) flag if the language is unknown or invalid.
 */
export function getLanguageFlagUrl(lang: string | null | undefined): string {
  if (!lang) return LANGUAGE_FLAGS['en'];
  const code = lang.toLowerCase().trim();
  if (LANGUAGE_FLAGS[code]) return LANGUAGE_FLAGS[code];
  const primary = code.split('-')[0].split('_')[0];
  return LANGUAGE_FLAGS[primary] || LANGUAGE_FLAGS['en'];
}
