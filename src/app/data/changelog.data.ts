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
            'Hardened Edge Security & Anti-Poisoning: Blocked unverified AI transcription fallthrough, secured dual subtitle persistence with mandatory auth checks, and restricted CORS and internal IP redirection',
            'Eliminated 60Hz Hot-Path CPU Churn: Restructured segment loop effects and center control bindings to stay completely dormant during normal playback, reducing mobile battery drain',
            'Memory Leak Elimination: Fixed background payment polling subscriptions on dialog dismiss and cancelled in-flight dictionary lookup queries',
            'Rule 4 Deterministic Sync & i18n Harmonization: Unified history persistence with deterministic record keys, chunked cloud batch translations, and accurately localized Premium 45m transcription duration limits across all 5 languages'
        ],
        vi: [
            'Tăng Cường Bảo Mật Biên & Chống Đầu Độc Dữ Liệu: Khắc phục triệt để lỗ hổng bỏ qua xác thực phiên âm AI, siết chặt quyền lưu phụ đề song ngữ và chặn chuyển hướng IP nội bộ',
            'Triệt Tiêu Hao Tổn CPU 60Hz Trong Phát Video: Tái cấu trúc hiệu ứng lặp câu và điều khiển trung tâm để giữ trạng thái nghỉ hoàn toàn khi phát thường, tiết kiệm pin điện thoại',
            'Loại Bỏ Rò Rỉ Bộ Nhớ: Ngăn chặn triệt để tiến trình polling thanh toán ngầm khi đóng bảng nâng cấp và dọn dẹp các truy vấn từ điển dở dang',
            'Đồng Bộ Chuẩn Định Danh Rule 4 & Bản Địa Hóa Toàn Diện: Chuẩn hóa lưu lịch sử với khóa xác định, chia nhỏ gói dịch phụ đề đám mây và cập nhật thời lượng Premium 45 phút trên toàn bộ 5 ngôn ngữ'
        ],
        ja: [
            'エッジセキュリティ強化とデータ改ざん防止: 未検証のAI文字起こしバイパスを遮断し、二重字幕の保存に認証を義務付け、内部IPへのリダイレクトを防止',
            '動画再生時の60Hz CPU負荷を解消: ループ処理とコントロールバインディングを最適化し、通常再生時は完全に休止させてバッテリー消費を抑制',
            'メモリリークの解消: ダイアログ終了時のバックグラウンド決済ポーリングを確実に停止し、辞書検索の中断処理を改善',
            'Rule 4 決定的同期と多言語ローカライズの刷新: 履歴同期を決定論的IDで統一し、クラウド一括翻訳をチャンク化、5言語すべてで45分のPremium上限表記を反映'
        ],
        ko: [
            '엣지 보안 강화 및 데이터 변조 방지: 미검증 AI 자막 우회 경로를 차단하고 이중 자막 저장 시 인증을 의무화하며 내부 IP 리다이렉션을 제한했습니다',
            '동영상 재생 시 60Hz 불필요한 CPU 소모 제거: 반복 구간 이펙트와 중앙 컨트롤 바인딩을 최적화하여 일반 재생 중 완전한 유휴 상태를 유지하고 배터리를 절약합니다',
            '메모리 누수 완전 차단: 결제 창 종료 시 백그라운드 폴링 구독을 확실히 해제하고 불필요한 사전 조회 요청을 정리했습니다',
            'Rule 4 결정론적 동기화 및 전방위 다국어 개선: 결정론적 레코드 키로 시청 기록을 통합하고, 클라우드 배치 번역을 분할 처리하며 5개 언어 모두 45분 Premium 자막 안내를 완비했습니다'
        ],
        zh: [
            '边缘安全强化与防篡改保护: 彻底修复未授权AI转录绕过漏洞，双语字幕持久化引入强制鉴权，并严格限制CORS与内网重定向',
            '消除播放时60Hz热点CPU空转: 重构字幕循环效果与控制器绑定逻辑，在常规播放期间完全休眠以大幅减少设备电量消耗',
            '内存泄漏与后台轮询清除: 修复升级弹窗关闭后残留的后台支付轮询，并在面板注销时取消未完成的词典查询',
            'Rule 4 确定性记录同步与多语言规范化: 采用确定性ID统一历史记录存储，分块请求云端批量翻译，并在全部5种语言中统一45分钟Premium转录说明'
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
