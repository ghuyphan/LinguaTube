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
    version: '1.0.4',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-08',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Localization Polish: Comprehensive audit of all 5 UI languages with natural phrasing and zero AI literalisms',
            '100% Translation Parity: Added missing playlist and subtitle state keys across Vietnamese, Japanese, Korean, and Chinese',
            'Interpolation Fixes: Dynamic placeholders now properly support diverse language sentence structures in account and study views'
        ],
        vi: [
            'Chuẩn hoá ngôn ngữ: Đại tu toàn bộ 5 ngôn ngữ giao diện, dùng từ tự nhiên và loại bỏ hoàn toàn các lỗi dịch máy thô',
            'Đồng bộ 100% bản dịch: Bổ sung đầy đủ các khóa trạng thái danh sách phát và phụ đề cho toàn bộ các ngôn ngữ',
            'Khắc phục lỗi tham số: Hỗ trợ linh hoạt cấu trúc câu tiếng Việt trong trang cài đặt tài khoản và chế độ học từ'
        ],
        ja: [
            'UIローカライズの全面刷新：不自然な直訳やカタカナ語（「単語マイナー」等）を自然な日本語表現に改善',
            '100%の翻訳整合性：プレイリストや字幕状態に関する未翻訳キーを全言語で完全に同期・補完',
            '動的パラメータ補間の修正：アカウント表示や学習モードの達成メッセージで各言語の語順に対応'
        ],
        ko: [
            'UI 현지화 대규모 개선: 어색한 직역 표현을 다듬고 겹치는 업적 명칭을 고유한 한국어 표현으로 정비',
            '100% 번역 일치: 베트남어, 일본어, 한국어, 중국어 전반에 걸쳐 누락되었던 재생목록 및 자막 상태 키 추가',
            '동적 매개변수 보간 수정: 계정 프로필 및 학습 모드 연속 학습 메시지의 문장 어순 완벽 지원'
        ],
        zh: [
            '界面本地化体验优化：全面排查直译与语境不符词汇，统一音乐术语为精准的视频播放列表表达',
            '100% 词条完整同步：补全中日韩越各语言中缺失的播放列表与字幕状态本地化词条',
            '动态参数插值修复：优化个人中心与学习模式连胜提示中的占位符，完美贴合不同语言语序'
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
