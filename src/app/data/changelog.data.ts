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
    version: '1.1.20',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'YouTube-Style Infinite Scroll & Card Grid: Standardized History and Playlists to use automatic infinite scrolling with IntersectionObserver sentinels and modern multi-column card grids, identical to the "For You" feed',
            'Theater Mode & Player Sizing: Added an expansive YouTube-style Theater Mode ("T" key) and responsive layout options for distraction-free subtitle immersion',
            'Refined Thumbnail & Card Design: Polished 16:9 thumbnail cards with duration badges, watch progress, and hover play overlays while eliminating top shadow lines',
            'Fluid Skeleton Wave Shimmer: Restored responsive multi-column skeleton wave gradient animations across thumbnails, avatars, and text lines during initial page loads'
        ],
        vi: [
            'Cuộn vô tận & Lưới thẻ kiểu YouTube: Chuẩn hóa Lịch sử và Danh sách phát với tính năng tự động tải tiếp qua IntersectionObserver và lưới thẻ đa cột hiện đại, mượt mà tương tự nguồn cấp "Dành cho bạn"',
            'Chế độ Rạp chiếu phim & Kích thước trình phát: Bổ sung Chế độ Rạp chiếu phim chuẩn YouTube (phím tắt "T") giúp trải nghiệm học phụ đề tập trung và rộng rãi hơn',
            'Thiết kế thẻ & Ảnh thu nhỏ tinh gọn: Tinh chỉnh thẻ ảnh 16:9 với huy hiệu thời lượng, tiến trình xem và lớp phủ phát mượt mà, loại bỏ đường viền bóng thừa',
            'Hiệu ứng Shimmer Skeleton mượt mà: Chuẩn hóa lưới khung xương tải trang với hiệu ứng sóng chuyển động gradient trên cả ảnh đại diện, thumbnail và tiêu đề'
        ],
        ja: [
            'YouTubeスタイルの無限スクロール＆カードグリッド：履歴とプレイリストに「おすすめ」同様のIntersectionObserver無限スクロールと複数カラムカードグリッドを導入し、クリック不要でスムーズな読み込みを実現',
            'シアターモード＆プレイヤー表示切り替え：YouTube風のシアターモード（ショートカットキー "T"）を追加し、字幕学習に集中できるワイド表示に対応',
            '洗練されたサムネイル＆カードデザイン：不要な上部境界線やシャドウを除去し、16:9サムネイル、再生時間バッジ、視聴進捗バー、ホバー再生オーバーレイを最適化',
            '滑らかなスケルトン波形アニメーション：初回読み込み時のスケルトンカードにグラデーション波形アニメーションを適用し、複数カラムグリッドの表示崩れを解消'
        ],
        ko: [
            'YouTube 스타일 무한 스크롤 및 카드 그리드: 시청 기록 및 재생목록에 "맞춤 추천"과 동일한 IntersectionObserver 기반 자동 무한 스크롤을 도입하여 버튼 클릭 없이 매끄럽게 콘텐츠를 탐색',
            '영화관 모드 및 플레이어 확장: 방해 요소 없이 자막 학습에 몰입할 수 있도록 YouTube 스타일 영화관 모드(단축키 "T") 및 반응형 레이아웃 추가',
            '정돈된 썸네일 및 카드 디자인: 상단 그림자/경계선을 제거하고 16:9 썸네일, 재생 시간 배지, 시청 진행률 표시줄, 호버 재생 오버레이 정돈',
            '유려한 스켈레톤 웨이브 애니메이션: 썸네일, 아바타, 텍스트 라인 전반에 반응형 멀티 컬럼 스켈레톤 그라디언트 웨이브 애니메이션 적용'
        ],
        zh: [
            'YouTube风格无限滚动与卡片网格：在历史记录与播放列表页面全面引入与“推荐”一致的IntersectionObserver自动无限加载，无需手动点击即可流畅畅览',
            '影院模式与播放器扩展：新增标准YouTube影院模式（快捷键 "T"），提供全宽沉浸式双语字幕学习体验',
            '精致卡片与缩略图优化：彻底消除顶部突兀的阴影边框，优化16:9缩略图、时长徽章、观看进度条与悬浮播放遮罩',
            '流畅骨架屏波浪动画：修复多列卡片骨架屏布局并注入渐变波浪微光动画，提供更加丝滑的初始加载过渡'
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
