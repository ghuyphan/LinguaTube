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
    version: '1.1.15',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Desktop Sidebar Modernization: Refined desktop sidebar with YouTube-style bold typography for the brand title and streamlined layout',
            'Dynamic Tier Branding: Automatically displays "Pro", "Premium", or "Voca" based on user subscription tier in clean, solid typography',
            'Unified Audio Playing Indicator: Upgraded the sidebar "Watch" indicator to the animated sound equalizer matching the playlist panel',
            'Microsoft Edge Neural TTS: Studio-grade Azure neural voices (Nanami, Xiaoxiao, SunHi, Jenny) for authentic native pronunciation'
        ],
        vi: [
            'Hiện đại hóa thanh bên: Nâng cấp tiêu đề thanh bên phong cách YouTube sắc nét và tinh gọn giao diện',
            'Hiển thị gói dịch vụ linh hoạt: Tự động đổi tên thương hiệu thành "Pro", "Premium" hoặc "Voca" tương ứng theo gói của người dùng',
            'Đồng bộ chỉ báo đang phát: Nâng cấp chỉ báo mục "Watch" trên thanh bên thành thanh sóng equalizer động đồng bộ với danh sách phát',
            'Phát âm Edge Neural TTS: Giọng đọc Microsoft Azure chuẩn phòng thu (Nanami, Xiaoxiao, SunHi, Jenny) chuẩn bản xứ'
        ],
        ja: [
            'デスクトップサイドバーの刷新：YouTubeスタイルの太字ヘッダーと洗練されたレイアウトに最適化',
            '動的プラン表示：契約プランに応じて「Pro」「Premium」「Voca」をシンプルかつスマートに表示',
            '再生中インジケーターの統一：サイドバーの「Watch」にプレイリストと共通のイコライザーアニメーションを採用',
            'Microsoft Edge Neural TTS：スタジオ品質のAzureニューラル音声（Nanami, Xiaoxiao, SunHi, Jenny）で自然なネイティブ発音'
        ],
        ko: [
            '데스크톱 사이드바 현대화: YouTube 스타일의 볼드 헤더 타이포그래피와 깔끔한 레이아웃 적용',
            '동적 구독 티어 브랜딩: 구독 상태에 따라 "Pro", "Premium", "Voca"로 깔끔하게 전환 표시',
            '재생 중 인디케이터 통일: 사이드바 "Watch" 항목에 재생목록 패널과 동일한 이퀄라이저 애니메이션 적용',
            'Microsoft Edge Neural TTS: 스튜디오급 Azure 뉴럴 보이스(Nanami, Xiaoxiao, SunHi, Jenny)로 자연스러운 원어민 발음 제공'
        ],
        zh: [
            '桌面端侧边栏重构优化：采用类似 YouTube 风格的粗体标题排版与极简整洁的视觉布局',
            '动态会员级别标识：根据用户订阅状态自动切换展示“Pro”、“Premium”或“Voca”纯色字标',
            '统一正在播放动效：将侧边栏“Watch”项升级为与播放列表面板一致的动态均衡器声波动画',
            'Microsoft Edge 神经语音 TTS：录音棚级 Azure 神经语音（Nanami、Xiaoxiao、SunHi、Jenny）呈现母语级自然发音'
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
