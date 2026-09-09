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

export const LANGUAGE_FLAGS: Record<string, string> = {
  ja: 'https://hatscripts.github.io/circle-flags/flags/jp.svg',
  zh: 'https://hatscripts.github.io/circle-flags/flags/cn.svg',
  ko: 'https://hatscripts.github.io/circle-flags/flags/kr.svg',
  en: 'https://hatscripts.github.io/circle-flags/flags/gb.svg',
  vi: 'https://hatscripts.github.io/circle-flags/flags/vn.svg',
  es: 'https://hatscripts.github.io/circle-flags/flags/es.svg',
  fr: 'https://hatscripts.github.io/circle-flags/flags/fr.svg',
  de: 'https://hatscripts.github.io/circle-flags/flags/de.svg',
  it: 'https://hatscripts.github.io/circle-flags/flags/it.svg',
  ru: 'https://hatscripts.github.io/circle-flags/flags/ru.svg',
  pt: 'https://hatscripts.github.io/circle-flags/flags/pt.svg',
  th: 'https://hatscripts.github.io/circle-flags/flags/th.svg',
  id: 'https://hatscripts.github.io/circle-flags/flags/id.svg',
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
