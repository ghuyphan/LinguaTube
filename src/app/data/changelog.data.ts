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
    version: '1.0.32',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Subtitle Reading Display Sub-Panel: Dedicated settings sub-panel for Furigana, Pinyin, Romanization, and Romaji with active checkmarks',
            'Grammar Highlights Sub-Panel: Streamlined grammar mode into an organized sub-page matching playback speed and font size menus',
            'Refined Script Badges & Icons: Redesigned reading display icon badges with crisp optical borders and typography',
            'Complete Reading Localization: Full localization coverage for Furigana, Pinyin, and Romanization options across all languages'
        ],
        vi: [
            'Trang cài đặt chế độ hiển thị phiên âm: Thiết kế bảng phụ riêng cho Furigana, Pinyin, Phiên âm và Romaji kèm dấu tích xác nhận trực quan',
            'Bảng cài đặt chế độ ngữ pháp: Đồng bộ hóa tùy chọn bật/tắt ngữ pháp thành trang menu phụ đồng nhất với tốc độ và cỡ chữ',
            'Huy hiệu biểu tượng & typographic tinh chỉnh: Thiết kế lại huy hiệu chữ phiên âm với đường viền quang học sắc nét và cân đối',
            'Bổ sung đa ngôn ngữ hoàn chỉnh: Bản địa hóa đầy đủ các tùy chọn Furigana, Pinyin và Phiên âm cho toàn bộ 5 ngôn ngữ'
        ],
        ja: [
            '読み・ふりがな設定サブパネル：ふりがな、ピンイン、ローマ字表示を専用のサブ画面で選択可能にし、チェックマークで視覚化',
            '文法モード設定サブパネル：文法解説のオン／オフを再生速度やフォントサイズと同様の統一されたサブメニューに刷新',
            '文字バッジとアイコンの洗練：読み表示アイコンに光学的な境界線と統一されたタイポグラフィを採用し視認性を向上',
            '多言語ローカライズの完全対応：ふりがな、ピンイン、ローマ字表記の設定項目を5言語すべてで完全サポート'
        ],
        ko: [
            '발음 표기 설정 서브패널: 후리가나, 병음, 로마자 표기 설정을 전용 서브페이지로 분리하고 체크마크로 현재 모드 표시',
            '문법 모드 설정 서브패널: 문법 강조 On/Off 설정을 재생 속도 및 글자 크기와 동일한 일관된 하위 메뉴로 개편',
            '문자 배지 및 아이콘 디자인 개선: 발음 표시 아이콘에 섬세한 테두리와 타이포그래피를 적용하여 시각적 완성도 향상',
            '완전한 다국어 현지화: 후리가나, 병음, 로마자 표기 설정 번역을 5개 지원 언어 전반에 걸쳐 완벽하게 적용'
        ],
        zh: [
            '读音注音设置子页面：为振假名、拼音、罗马拼音及关模式提供专属子菜单，以选中勾选标记直观呈现',
            '语法标注设置子页面：将语法高亮切换升级为与播放速度、字号一致的标准子页面，操作逻辑更连贯',
            '文字图标徽章精细打磨：重新设计注音模式图标徽章，加入微光边框与精致文字排版，视觉更统一',
            '多语言注音词条全量本地化：补齐全部5种语言下的假名注音、拼音与罗马拼音本地化文案'
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
