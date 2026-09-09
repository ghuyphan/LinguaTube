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
    version: '1.0.21',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Seamless Upgrade & Auth Flow: Guests can now browse Pro & Premium plans freely; clicking upgrade smoothly triggers Google Sign-in and automatically proceeds to payment without dead-ends',
            'Unified Pro & Premium Dialog Design: Overhauled the upgrade modal with a pinned sticky actions footer, fixed scrolling and header clipping, and standardized design system tokens',
            'Polished Onboarding Experience: Restored high-contrast primary CTA styling, added English locale fallbacks across all 5 languages, and refined interactive word token demos'
        ],
        vi: [
            'Luồng Nâng cấp & Đăng nhập Liền mạch: Người dùng chưa đăng nhập có thể thoải mái xem các gói Pro & Premium; bấm nâng cấp sẽ tự động đăng nhập Google và chuyển thẳng tới thanh toán VietQR mà không gặp lỗi cụt',
            'Giao diện Nâng cấp Pro & Premium Thống nhất: Thiết kế lại hộp thoại nâng cấp với thanh tác vụ cố định (sticky footer), khắc phục lỗi tràn chữ/cuộn mất tiêu đề và chuẩn hóa biến thiết kế',
            'Hoàn thiện Trải nghiệm Onboarding: Khôi phục nút kêu gọi hành động (CTA) nổi bật, bổ sung cơ chế tự động dự phòng ngôn ngữ tiếng Anh cho cả 5 ngôn ngữ và hoàn thiện demo từ vựng tương tác'
        ],
        ja: [
            'シームレスなアップグレード＆ログイン連携：未ログインのままでもPro・Premiumプランを自由に比較可能。アップグレード選択時にGoogleログインがスムーズに起動し、決済画面へ直行',
            'Pro＆Premiumモーダルのデザイン統一：固定フッター（Sticky Actions）を導入し、ヘッダーのはみ出しやスクロール崩れを解消。デザインシステム規格に完全統一',
            'オンボーディング体験の洗練：目立つプライマリCTAボタンスタイルを復元し、5言語すべてで英語フォールバックを保証。インタラクティブな単語デモの操作感を向上'
        ],
        ko: [
            '매끄러운 업그레이드 및 로그인 흐름: 로그인하지 않아도 Pro 및 Premium 요금제를 자유롭게 비교할 수 있으며, 결제 시 Google 로그인을 자연스럽게 거쳐 VietQR 결제 화면으로 자동 이동',
            'Pro & Premium 업그레이드 모달 디자인 개편: 하단 고정 액션 바(Sticky Footer)를 도입하여 헤더 잘림 및 스크롤 오류를 해결하고 전체 디자인 토큰을 표준화',
            '온보딩 경험 개선: 메인 CTA 버튼 스타일을 선명하게 복원하고, 5개 언어 전체에 영문 폴백을 적용하여 번역 누락을 방지하며 단어 상호작용 데모 품질 향상'
        ],
        zh: [
            '无缝升级与账号登录联动：未登录用户可自由浏览 Pro 与 Premium 会员方案，点击升级即可无缝唤起 Google 登录并直达 VietQR 支付结算，彻底消除中断',
            '统一 Pro 与 Premium 升级弹窗设计：新增底部固定操作栏（Sticky Footer），修复标题文字被裁切与滚动穿透问题，全面对齐系统级设计规范',
            '新手引导（Onboarding）体验优化：恢复高对比醒目的核心操作按钮样式，为全 5 种语言增加英语自动兜底机制，并打磨交互式分词取词试用体验'
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
