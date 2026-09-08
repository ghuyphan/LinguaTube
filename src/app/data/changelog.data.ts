/**
 * Changelog & Version Data Structures
 */

export interface ServerVersionInfo {
    version: string;
    minSupportedVersion: string;
    buildDate: string;
    forceUpdate: boolean;
    maintenance: boolean;
    maintenanceMessage?: string;
    highlights: Record<string, string[]>;
}

export interface ReleaseInfo {
    version: string;
    buildDate: string;
    highlights: Record<string, string[]>;
}

export const CURRENT_RELEASE_INFO: ServerVersionInfo = {
    version: '1.0.2',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-08',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Introducing Voca Premium: 25 Diamonds capacity, 4-minute regeneration, and AI transcription up to 45 minutes',
            'Redesigned Pro plan at an affordable price (49,000 VND/mo) with 10 Diamonds and 20-minute video limit',
            'Brand-new subscription tier switcher with real-time benefit comparisons in the Upgrade Dialog',
            'Dynamic duration-based Diamond billing and higher rate limit allocations for paid subscribers'
        ],
        vi: [
            'Ra mắt gói Voca Premium: Sức chứa 25 Kim Cương, hồi phục mỗi 4 phút và phiên âm video AI lên tới 45 phút',
            'Gói Voca Pro mới với mức giá tiết kiệm (49.000đ/tháng), 10 Kim Cương và hỗ trợ video tới 20 phút',
            'Giao diện nâng cấp tài khoản hoàn toàn mới, dễ dàng so sánh quyền lợi giữa Pro và Premium',
            'Cơ chế tiêu thụ Kim Cương linh hoạt theo độ dài video cùng giới hạn gọi API mở rộng cho thành viên trả phí'
        ],
        ja: [
            '新プラン「Voca Premium」登場：ダイヤ上限25個、4分回復、最長45分のAI文字起こし対応',
            'より手軽になった新「Voca Pro」プラン（月額49,000 VND）：ダイヤ上限10個、20分動画対応',
            'ProとPremiumの特典をひと目で比較できる刷新されたアップグレード画面',
            '動画の長さに応じたダイヤ消費と、有料会員向けの高レートリミット枠の最適化'
        ],
        ko: [
            '새로운 Voca Premium 출시: 다이아몬드 최대 25개, 4분마다 충전, 최대 45분 AI 영상 자막 생성',
            '합리적인 가격의 새로운 Voca Pro 플랜 (월 49,000 VND): 다이아몬드 10개, 20분 영상 지원',
            'Pro와 Premium 혜택을 한눈에 비교하고 선택할 수 있는 업그레이드 다이얼로그 개편',
            '영상 길이에 맞춘 다이내믹 다이아몬드 차감 및 유료 회원을 위한 확장된 API 처리량 제공'
        ],
        zh: [
            '全新推出 Voca Premium 会员：25颗钻石上限、4分钟极速恢复，支持长达45分钟的AI视频听写',
            '全新轻量 Pro 会员更实惠（月费 49,000 VND）：10颗钻石上限与20分钟视频支持',
            '全新升级窗口，支持一键切换并直观对比 Pro 与 Premium 专属权益',
            '按视频时长动态消耗钻石，并为付费会员提供更高规格的 API 速率配额'
        ]
    }
};

/**
 * Extract localized highlights with English fallback
 */
export function getLocalizedHighlights(
    highlights: Record<string, string[]> | undefined | null,
    langCode: string
): string[] {
    if (!highlights) {
        return [];
    }

    const normalizedLang = langCode.toLowerCase().split('-')[0];
    if (highlights[normalizedLang] && highlights[normalizedLang].length > 0) {
        return highlights[normalizedLang];
    }

    return highlights['en'] || [];
}

/**
 * Compare two semver strings (e.g. "1.0.0" vs "1.1.0").
 * Returns true if v1 is strictly older than v2.
 */
export function isVersionOlder(v1: string, v2: string): boolean {
    const parse = (v: string) => v.replace(/^v/, '').split('.').map(n => parseInt(n, 10) || 0);
    const p1 = parse(v1);
    const p2 = parse(v2);

    for (let i = 0; i < Math.max(p1.length, p2.length); i++) {
        const n1 = p1[i] || 0;
        const n2 = p2[i] || 0;
        if (n1 < n2) return true;
        if (n1 > n2) return false;
    }
    return false;
}
