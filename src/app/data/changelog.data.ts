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
    version: '1.1.12',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Domain Migration to voca.study: Official domain updated across all SEO tags, Open Graph previews, sitemaps, and deep links',
            'Brand & Logo Palette Harmonization: Refreshed app icon, favicon, and splash screens with the signature soft strawberry-coral aesthetic',
            'Streamlined Vocabulary Controls: Reordered word item actions to Level Status, Audio Pronunciation, and Delete across video and dictionary views',
            'Unified Tab & Chip Styling: Harmonized segmented navigation chips across Dictionary, Vocabulary, Playlists, and History with consistent borders'
        ],
        vi: [
            'Chuyển đổi tên miền sang voca.study: Cập nhật tên miền chính thức trên toàn bộ thẻ SEO, xem trước Open Graph, sitemap và liên kết ứng dụng',
            'Đồng bộ nhận diện thương hiệu & Logo: Làm mới biểu tượng ứng dụng, favicon và màn hình chờ với gam màu hồng dâu san hô nhẹ nhàng, tinh tế',
            'Sắp xếp thao tác từ vựng trực quan: Điều chỉnh thứ tự nút thành Trạng thái học, Phát âm âm thanh và Xóa tại thanh bên video và từ điển',
            'Chuẩn hóa nút tab & Bộ lọc: Đồng bộ phong cách nút phân đoạn giữa Từ điển, Từ vựng, Danh sách phát và Lịch sử với viền và trạng thái rõ ràng'
        ],
        ja: [
            'voca.study へのドメイン移行：SEOタグ、Open Graphプレビュー、サイトマップ、ディープリンク全体で新公式ドメインに完全移行',
            'ブランド・ロゴカラーの調和：OG画像に合わせ、アプリロゴ、ファビコン、スプラッシュ画面を柔らかなストロベリーコーラル配色に統一',
            '単語リスト操作の最適化：動画サイドバーと辞書画面で、アクションボタンを「習得レベル」「音声再生」「削除」の順に再配置',
            'タブ・チップデザインの統一：辞書・単語・プレイリスト・履歴のセグメント切り替えボタンを統一されたボーダースタイルに標準化'
        ],
        ko: [
            'voca.study 도메인 이전: SEO 메타태그, Open Graph 미리보기, 사이트맵 및 딥링크 전반에 걸쳐 공식 도메인 반영',
            '브랜드 & 로고 컬러 조화: OG 이미지와 일치하도록 앱 아이콘, 파비콘, 스플래시 화면을 부드러운 스트로베리 코럴 색상으로 일원화',
            '단어 목록 조작 순서 최적화: 동영상 사이드바 및 사전 화면에서 액션 버튼을 \'학습 단계\', \'발음 듣기\', \'삭제\' 순으로 재정렬',
            '탭 & 칩 버튼 스타일 통일: 사전, 단어장, 재생목록, 시청 기록의 세그먼트 버튼을 일관된 테두리 스타일로 표준화'
        ],
        zh: [
            '全面迁移至 voca.study 域名：全站更新 SEO 标签、Open Graph 社交分享预览、网站地图与应用直链',
            '品牌视觉与 Logo 调色统一：App 图标、Favicon 和启动画面全面同步 OG 预览图的柔和草莓珊瑚色系',
            '生词操作流顺序优化：在视频侧边栏与词典生词本中，操作按钮统一重排为「掌握等级」、「发音朗读」与「删除」',
            '统一切换标签与筛选胶囊样式：规范词典、生词、播放列表与历史记录的分段切换按钮，保持一致的边框与激活效果'
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
