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

import { APP_VERSION } from '../core/constants/version';

export interface ReleaseInfo {
    version: string;
    buildDate: string;
    highlights: Record<string, string[]>;
}

export const CURRENT_RELEASE_INFO: ServerVersionInfo = {
    version: APP_VERSION,
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-11',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Mobile Miniplayer Blur Glass Design: Implemented frosted glassmorphic card styling unified with the bottom navigation bar, aligning responsive margins with the For You feed',
            'Silent Feed Refresh: Removed intrusive toast notifications upon refreshing recommendations for a smooth, native-feeling pull-to-refresh experience',
            'Mobile Icon Reliability: Added versioned SVG sprite cache busting and cross-browser xlink compatibility, ensuring fullscreen, miniplayer, and maximize icons render instantly on mobile Chrome'
        ],
        vi: [
            'Giao diện Miniplayer Mobile Kính Mờ: Áp dụng thiết kế thẻ kính mờ (blur glass) đồng bộ với thanh điều hướng dưới, căn chỉnh lề vừa khít với nội dung Dành Cho Bạn',
            'Làm Mới Bảng Tin Tự Nhiên: Loại bỏ thông báo toast khi làm mới video đề xuất, mang lại trải nghiệm kéo để làm mới mượt mà, không bị gián đoạn',
            'Hiển Thị Biểu Tượng Ổn Định Trên Mobile: Bổ sung cơ chế cache-busting và tương thích xlink cho SVG sprite, giúp các biểu tượng toàn màn hình, thu nhỏ và phóng to hiển thị chính xác trên Chrome di động'
        ],
        ja: [
            'モバイルミニプレーヤーのフロストガラスUI: ボトムナビゲーションバーと統一されたすりガラスデザインを採用し、「おすすめ」フィードと余白を完全に一致させました',
            'スムーズなフィード更新: おすすめ動画の更新時にトースト通知を表示しないようにし、自然で快適な引っ張って更新体験を実現しました',
            'モバイルアイコン表示の最適化: SVGスプライトのバージョン管理とxlink互換性により、モバイルChromeで全画面・最小化・拡大アイコンが確実に表示されるように改善しました'
        ],
        ko: [
            '모바일 미니플레이어 블러 글래스 디자인: 하단 내비게이션 바와 일관된 반투명 블러 글래스 스타일을 적용하고, 맞춤 추천 피드와 여백을 완벽하게 맞췄습니다',
            '자연스러운 피드 새로고침: 추천 영상 새로고침 시 나타나던 토스트 알림을 제거하여 더욱 매끄럽고 방해 없는 당겨서 새로고침 경험을 제공합니다',
            '모바일 아이콘 표시 안정화: SVG 스프라이트 버전 관리 및 xlink 호환성을 추가하여 모바일 Chrome에서 전체화면, 최소화, 확대 아이콘이 안정적으로 표시되도록 개선했습니다'
        ],
        zh: [
            '移动端迷你播放器毛玻璃设计: 采用与底部导航栏一致的磨砂毛玻璃质感，并精确对齐“为你推荐”内容的页面边距',
            '静默刷新推荐内容: 移除刷新推荐视频时的浮动提示，带来更加丝滑自然的下拉刷新体验',
            '移动端图标显示修复: 引入带有版本控制的SVG精灵图缓存刷新与xlink兼容性，确保全屏、最小化和最大化图标在移动端Chrome上正常呈现'
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
