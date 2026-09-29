export interface SupportedCountry {
    code: string;
    name: string;
    nativeName: string;
    flagUrl: string;
    emoji: string;
}

export const SUPPORTED_COUNTRIES: readonly SupportedCountry[] = [
    { code: 'VN', name: 'Vietnam', nativeName: 'Việt Nam', flagUrl: '/flags/vn.svg', emoji: '🇻🇳' },
    { code: 'US', name: 'United States', nativeName: 'United States', flagUrl: '/flags/us.svg', emoji: '🇺🇸' },
    { code: 'JP', name: 'Japan', nativeName: '日本', flagUrl: '/flags/jp.svg', emoji: '🇯🇵' },
    { code: 'KR', name: 'South Korea', nativeName: '대한민국', flagUrl: '/flags/kr.svg', emoji: '🇰🇷' },
    { code: 'CN', name: 'China', nativeName: '中国', flagUrl: '/flags/cn.svg', emoji: '🇨🇳' },
    { code: 'GB', name: 'United Kingdom', nativeName: 'United Kingdom', flagUrl: '/flags/gb.svg', emoji: '🇬🇧' },
    { code: 'CA', name: 'Canada', nativeName: 'Canada', flagUrl: '/flags/ca.svg', emoji: '🇨🇦' },
    { code: 'AU', name: 'Australia', nativeName: 'Australia', flagUrl: '/flags/au.svg', emoji: '🇦🇺' },
    { code: 'FR', name: 'France', nativeName: 'France', flagUrl: '/flags/fr.svg', emoji: '🇫🇷' },
    { code: 'DE', name: 'Germany', nativeName: 'Deutschland', flagUrl: '/flags/de.svg', emoji: '🇩🇪' },
    { code: 'ES', name: 'Spain', nativeName: 'España', flagUrl: '/flags/es.svg', emoji: '🇪🇸' },
    { code: 'IT', name: 'Italy', nativeName: 'Italia', flagUrl: '/flags/it.svg', emoji: '🇮🇹' },
    { code: 'BR', name: 'Brazil', nativeName: 'Brasil', flagUrl: '/flags/br.svg', emoji: '🇧🇷' },
    { code: 'RU', name: 'Russia', nativeName: 'Россия', flagUrl: '/flags/ru.svg', emoji: '🇷🇺' },
    { code: 'TH', name: 'Thailand', nativeName: 'ประเทศไทย', flagUrl: '/flags/th.svg', emoji: '🇹🇭' },
    { code: 'ID', name: 'Indonesia', nativeName: 'Indonesia', flagUrl: '/flags/id.svg', emoji: '🇮🇩' },
    { code: 'PT', name: 'Portugal', nativeName: 'Portugal', flagUrl: '/flags/pt.svg', emoji: '🇵🇹' }
] as const;

export const COUNTRY_FLAG_MAP: Record<string, string> = {
    // ISO-2 codes
    VN: '/flags/vn.svg',
    US: '/flags/us.svg',
    JP: '/flags/jp.svg',
    KR: '/flags/kr.svg',
    CN: '/flags/cn.svg',
    GB: '/flags/gb.svg',
    CA: '/flags/ca.svg',
    AU: '/flags/au.svg',
    FR: '/flags/fr.svg',
    DE: '/flags/de.svg',
    ES: '/flags/es.svg',
    IT: '/flags/it.svg',
    BR: '/flags/br.svg',
    RU: '/flags/ru.svg',
    TH: '/flags/th.svg',
    ID: '/flags/id.svg',
    PT: '/flags/pt.svg',
    // Lowercase ISO-2 codes
    vn: '/flags/vn.svg',
    us: '/flags/us.svg',
    jp: '/flags/jp.svg',
    kr: '/flags/kr.svg',
    cn: '/flags/cn.svg',
    gb: '/flags/gb.svg',
    ca: '/flags/ca.svg',
    au: '/flags/au.svg',
    fr: '/flags/fr.svg',
    de: '/flags/de.svg',
    es: '/flags/es.svg',
    it: '/flags/it.svg',
    br: '/flags/br.svg',
    ru: '/flags/ru.svg',
    th: '/flags/th.svg',
    id: '/flags/id.svg',
    pt: '/flags/pt.svg',
    // Flag emojis
    '🇻🇳': '/flags/vn.svg',
    '🇺🇸': '/flags/us.svg',
    '🇯🇵': '/flags/jp.svg',
    '🇰🇷': '/flags/kr.svg',
    '🇨🇳': '/flags/cn.svg',
    '🇬🇧': '/flags/gb.svg',
    '🇨🇦': '/flags/ca.svg',
    '🇦🇺': '/flags/au.svg',
    '🇫🇷': '/flags/fr.svg',
    '🇩🇪': '/flags/de.svg',
    '🇪🇸': '/flags/es.svg',
    '🇮🇹': '/flags/it.svg',
    '🇧🇷': '/flags/br.svg',
    '🇷🇺': '/flags/ru.svg',
    '🇹🇭': '/flags/th.svg',
    '🇮🇩': '/flags/id.svg',
    '🇵🇹': '/flags/pt.svg'
};

/**
 * Returns the SVG flag URL for a country code or emoji.
 * Returns an empty string if no valid country flag is found.
 */
export function getCountryFlagUrl(country: string | null | undefined): string {
    if (!country) return '';
    const trimmed = country.trim();
    if (COUNTRY_FLAG_MAP[trimmed]) return COUNTRY_FLAG_MAP[trimmed];
    const upper = trimmed.toUpperCase();
    if (COUNTRY_FLAG_MAP[upper]) return COUNTRY_FLAG_MAP[upper];
    return '';
}
