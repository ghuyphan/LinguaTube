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
    version: '1.1.0',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Smooth Infinite Scroll Feed: Replaced jarring card skeletons with a sleek, centered YouTube-style loading spinner when browsing recommended videos',
            'Unified Global Spinner Component: Introduced standardized `.spinner` design tokens with multiple size and theme variants across the app',
            'Full-Transcript Dual Subtitles Streaming: Dual subtitles now progressively stream and translate 100% of the video\'s transcript in the background with zero playback lag',
            'Instant Video Level Detection: Language proficiency levels (JLPT, HSK, TOPIK, CEFR) now resolve instantaneously with zero shimmer delay via server caching and stratified sampling',
            'Adaptive Subtitle Display & Seek Preemption: Responsive multi-line height expansion for lengthy cues and instant seek preemption for immediate subtitle response'
        ],
        vi: [
            'Cuộn vô tận mượt mà trên trang Video: Thay thế các khung xương giật cục bằng vòng xoay tải trang mượt mà chuẩn YouTube khi cuộn xem thêm video',
            'Bộ thành phần Spinner toàn cục chuẩn hóa: Thêm class thiết kế `.spinner` dùng chung với nhiều kích cỡ và biến thể giao diện cho toàn bộ ứng dụng',
            'Dịch toàn bộ phụ đề song ngữ ngầm: Phụ đề song ngữ tự động dịch tuần tự 100% toàn bộ video dưới nền mượt mà mà không gây khựng phát video',
            'Xác định cấp độ video tức thì: Đánh giá độ khó (JLPT, HSK, TOPIK, CEFR) hiển thị ngay lập tức không cần chờ nhờ bộ nhớ đệm máy chủ và thuật toán lấy mẫu phân tầng',
            'Khung phụ đề thích ứng & ưu tiên tua: Tự động co giãn chiều cao linh hoạt cho các câu dài và hủy công việc ngầm để ưu tiên câu hiện tại khi tua video'
        ],
        ja: [
            '動画フィードの無限スクロール改善：おすすめ動画のスクロール時に発生していたプレースホルダーのチラつきを解消し、YouTube準拠の滑らかな中央スピナーを導入',
            '統一グローバルスピナーコンポーネント：アプリ全体で再利用可能なサイズ・テーマ対応の標準`.spinner`コンポーネントを追加',
            '全文デュアル字幕のバックグラウンドストリーミング：再生を妨げることなく、動画全体の字幕をバックグラウンドで100%翻訳・キャッシュ',
            '動画レベルの即時表示：サーバーキャッシュと階層化サンプリングにより、JLPT/HSK/TOPIK/CEFRレベル判定が待機時間ゼロで瞬時に完了',
            '可変字幕レイアウトとシーク優先処理：長文に追従する自動伸縮フレームと、シーク時の即時字幕レスポンスを実現'
        ],
        ko: [
            '동영상 피드 무한 스크롤 개선: 추천 영상 스크롤 시 깜빡이던 스켈레톤 카드를 유튜브 스타일의 깔끔한 중앙 로딩 스피너로 교체',
            '통합 글로벌 스피너 컴포넌트: 다양한 크기와 테마를 지원하는 재사용 가능한 표준 `.spinner` 디자인 토큰 추가',
            '전체 자막 백그라운드 번역 스트리밍: 재생 중단 없이 영상 전체의 100% 자막을 백그라운드에서 순차 번역 및 캐싱',
            '비디오 난이도 레벨 즉각 판정: 서버 캐싱과 계층화 샘플링을 통해 JLPT/HSK/TOPIK/CEFR 레벨을 지연 없이 즉시 표시',
            '유연한 반응형 자막 및 시크 즉각 반응: 긴 문장 자동 높이 조절 및 탐색 시 백그라운드 작업을 전환하여 즉시 자막 제공'
        ],
        zh: [
            '视频推荐流无限滚动体验升级：彻底消除加载更多时的骨架屏跳跃，引入对齐YouTube的原生居中平滑加载环',
            '全局统一Spinner组件：规范化新增支持多尺寸与主题变体的标准`.spinner`设计样式',
            '全篇双语字幕后台流式翻译：在不影响播放流畅度的情况下，后台自动递进完成全片100%字幕翻译并沉淀云端缓存',
            '视频语言等级秒级判定：结合服务端缓存与分层抽样算法，JLPT/HSK/TOPIK/CEFR语言等级瞬间呈现，无需等待',
            '自适应字幕高度排版与进度抢占：长文动态伸展防遮挡，进度条拖动抢先响应极速交付字幕'
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
