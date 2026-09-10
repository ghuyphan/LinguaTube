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
    version: '1.1.17',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Tablet & Responsive Layout Polish: Collapsed multi-column layouts into comfortable full-width feeds on tablet screens (<=1024px), preventing sidebar squeeze',
            'Header & Toolbar Anti-Collision: Prevented badge overlap on panel titles and enabled flexible wrapping for search bars, action buttons, and filter chips',
            'Enhanced Video Card Readability: Expanded video title display in the resume banner and removed dead/duplicate CSS rules across panels'
        ],
        vi: [
            'Tối ưu giao diện máy tính bảng: Thu gọn bố cục nhiều cột thành dạng danh sách toàn chiều rộng tối ưu trên tablet (<=1024px), chống ép hẹp nội dung',
            'Chống đè chữ tiêu đề & thanh công cụ: Khắc phục hiện tượng huy hiệu đè lên tiêu đề thẻ, hỗ trợ thanh tìm kiếm và bộ lọc tự động xuống dòng linh hoạt',
            'Cải thiện hiển thị thẻ video: Mở rộng không gian hiển thị tiêu đề video đang xem dở và loại bỏ các đoạn mã CSS trùng lặp'
        ],
        ja: [
            'タブレット表示＆レスポンシブ最適化：タブレット端末（<=1024px）で複数列レイアウトを快適な全幅表示に統合し、サイドバーによる圧迫を解消',
            'ヘッダー＆ツールバーの重なり防止：パネルタイトルのバッジ衝突を防ぎ、検索バーやフィルターボタンが柔軟に折り返されるよう改善',
            '動画カード視認性の向上：視聴再開バナーのタイトル表示行数を拡張し、各パネルの重複CSSコードを整理・最適化'
        ],
        ko: [
            '태블릿 반응형 레이아웃 최적화: 태블릿 화면(<=1024px)에서 다중 열을 쾌적한 전체 너비 피드로 자동 전환하여 사이드바 압박 현상 해결',
            '헤더 및 툴바 겹침 방지: 패널 제목과 배지의 겹침을 방지하고, 검색창 및 필터 칩이 부드럽게 줄바꿈되도록 유연성 향상',
            '동영상 카드 가독성 개선: 이어보기 배너의 동영상 제목 표시를 2줄로 확대하고 중복 CSS 스타일을 말끔히 정리'
        ],
        zh: [
            '平板端与响应式布局优化：针对平板屏幕（<=1024px）自动收起次级侧边栏并转为舒适的全宽单列，消除内容挤压变形',
            '标题与工具栏防重叠改进：修复状态徽章覆盖面板标题的问题，支持搜索框、操作按钮和筛选芯片自适应换行',
            '视频卡片可读性提升：拓展继续观看横幅中的标题展示空间，并全面精简剔除各面板中的冗余重复 CSS 样式'
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
