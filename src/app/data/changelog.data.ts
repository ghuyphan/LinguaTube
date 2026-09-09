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
    version: '1.0.30',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Fixed Server Error 500: Resolved variable scope reference error in backend transcript orchestrator that caused server errors on video playback',
            'Automatic Language Mismatch Detection: Accurately prompts learners with switch suggestions when authentic captions exist in an alternate language',
            'Robust Backend Static Analysis: Integrated comprehensive AST undefined-variable validation and regression tests across all edge API functions'
        ],
        vi: [
            'Khắc phục lỗi máy chủ 500: Sửa triệt để lỗi tham chiếu phạm vi biến trong bộ điều phối phụ đề gây sự cố máy chủ khi phát video',
            'Tự động gợi ý khi có phụ đề ngôn ngữ khác: Tự động phát hiện và gợi ý người học chuyển đổi ngôn ngữ khi video có sẵn phụ đề chuẩn ở ngôn ngữ khác',
            'Kiểm thử tĩnh toàn diện: Tích hợp kiểm tra tự động biến chưa khai báo và bộ hồi quy cho toàn bộ các hàm xử lý API backend'
        ],
        ja: [
            'サーバーエラー500の完全修正：動画再生時にサーバーエラーを引き起こしていたバックエンド字幕オーケストレーターのスコープ参照エラーを修正',
            '利用可能な言語の自動検出と提案：学習対象言語と異なる言語で字幕が存在する場合に言語切り替えダイアログを正確に表示',
            '静的解析テストの強化：全エッジAPI関数に対して未定義変数の自動AST検証と回帰テストを導入し品質を担保'
        ],
        ko: [
            '서버 오류 500 해결: 동영상 재생 시 서버 오류를 유발했던 백엔드 자막 처리 함수의 변수 스코프 참조 오류를 완벽히 수정',
            '대체 언어 자막 자동 감지 및 전환 제안: 학습 대상 언어와 다른 언어로 자막이 제공될 때 언어 전환 모달을 정확히 표시',
            '백엔드 정적 분석 강화: 모든 에지 API 엔드포인트에 미선언 변수 AST 검증 및 회귀 테스트를 도입하여 런타임 안정성 보장'
        ],
        zh: [
            '修复服务器500错误：彻底解决视频播放时因后端字幕调度器变量作用域引用错误导致的服务器异常',
            '替代语言字幕智能识别与提示：当视频存在其他有效语言的原生字幕时，自动精准弹出语言切换建议',
            '后端静态分析全面强化：为所有边缘API函数增加未定义变量AST自动化检验及回归测试，杜绝运行时异常'
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
