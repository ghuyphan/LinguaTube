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
    buildDate: '2026-09-12',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Streamlined Study Launcher: Removed redundant tabs, sub-headings, and language pickers for a clean, distraction-free flashcard practice experience',
            'Centralized Review Indicators: Integrated next-review timing badges directly into your vocabulary notebook in Dictionary, unifying all saved word management',
            'Toast Streak Celebrations: Converted streak continuation into a smooth, non-intrusive toast notification upon session completion',
            'Standardized Card Spacing & Gaps: Harmonized card padding and vertical content gaps across Study panels and sidebars to match explore and dictionary layouts'
        ],
        vi: [
            'Tinh Gọn Giao Diện Ôn Tập: Loại bỏ các tab và tiêu đề phụ dư thừa, mang lại trải nghiệm luyện tập thẻ ghi nhớ trực quan và tức thì',
            'Đồng Bộ Lịch Ôn Tập Vào Sổ Từ: Tích hợp huy hiệu thời gian ôn tiếp theo trực tiếp vào sổ từ vựng tại Từ điển, tập trung toàn bộ quản lý từ đã lưu tại một nơi',
            'Thông Báo Chuỗi Học Dạng Toast: Chuyển đổi thông báo nối dài chuỗi ngày sang dạng toast thông minh, tinh gọn màn hình hoàn thành buổi học',
            'Chuẩn Hóa Khoảng Cách Thẻ: Đồng bộ khoảng cách đệm (padding) và khoảng cách nội dung (gap) trên màn hình Ôn tập chuẩn theo thiết kế toàn ứng dụng'
        ],
        ja: [
            '洗練された復習画面: 不要なタブや見出しを整理し、迷わずすぐにフラッシュカード練習を開始できるシンプルなUIを実現',
            '復習スケジュールの統合表示: 辞書画面の単語帳カードに次回復習バッジを直接統合し、保存した単語の管理を1箇所に集約',
            '連続学習記録のトースト化: 学習完了時のストリーク通知をコンパクトなトースト表示に移行し、完了画面をすっきりと整理',
            'カード余白・ギャップの統一: 学習パネルとサイドバーのパディングとコンテンツ間隔をアプリ全体のデザイン基準に合わせて最適化'
        ],
        ko: [
            '간결해진 복습 런처: 불필요한 탭과 중복 제목을 정리하여 방해 없이 즉시 플래시카드 학습을 시작할 수 있는 최적화된 UI 제공',
            '복습 일정 단어장 통합: 사전의 단어장 카드에 다음 복습 예정일 배지를 직접 표시하여 저장된 모든 단어 관리를 한곳으로 통합',
            '토스트형 연속 학습 알림: 세션 완료 시 스트릭 연장 축하를 깔끔한 토스트 알림으로 전환하여 완료 화면을 더욱 직관적으로 개선',
            '카드 패딩 및 여백 표준화: 학습 화면과 사이드바의 카드 여백 및 요소 간 간격을 앱 전반의 표준 디자인에 맞춰 깔끔하게 정돈'
        ],
        zh: [
            '精简复习启动面板: 移除冗余的队列标签页和次级标题，打造专注无干扰的即时抽认卡背单词体验',
            '集中式复习排期展示: 将下一次复习时间徽章直接集成至词典的单词本列表中，统一管理所有已收藏单词',
            '连胜庆祝转为轻量提示: 学习完成时的连续打卡提示升级为优雅的Toast轻量浮窗，保持结算界面清爽简洁',
            '标准化卡片内边距与间距: 全面统一背单词页面与侧边栏的卡片内边距和垂直内容间距，深度对齐全局设计语言'
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
