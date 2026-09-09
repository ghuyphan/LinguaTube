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
    version: '1.0.24',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Resilient 3-Tier Audio Playback Pipeline: Upgraded AudioService with a seamless waterfall (authentic dictionary audio -> neural stream TTS -> native Web Speech API) ensuring 100% pronunciation reliability across all words',
            'Referer-Free Audio Isolation & Diagnostics: Applied strict no-referrer isolation to eliminate upstream 404/403 playback errors on media streams and enhanced diagnostic logging',
            'Offline-Ready Speech Synthesis: Automatic fallback to high-quality system voices for Japanese, Chinese, Korean, and English even without internet access in Study Mode'
        ],
        vi: [
            'Cơ chế phát âm 3 tầng bền bỉ: Nâng cấp AudioService với quy trình tuần hoàn (âm thanh từ điển gốc -> luồng phát âm nơ-ron -> Web Speech API tích hợp) đảm bảo 100% từ vựng đều được phát âm chuẩn xác',
            'Cô lập Referer & Chuẩn đoán lỗi chi tiết: Áp dụng cơ chế no-referrer nghiêm ngặt nhằm triệt tiêu lỗi 404/403 khi tải luồng âm thanh ngoài cùng nhật ký chuẩn đoán trực quan',
            'Phát âm ngoại tuyến trong chế độ Học: Tự động chuyển đổi sang giọng đọc chất lượng cao của hệ điều hành cho tiếng Nhật, Trung, Hàn, Anh ngay cả khi mất mạng'
        ],
        ja: [
            '高信頼性3層音声再生パイプライン：AudioServiceを強化し（辞書本来の音声 -> 高品質ニューラルストリームTTS -> Web Speech API）全単語で100%確実に発音再生できるフェイルオーバーを実現',
            'Referer遮断と詳細エラー診断：外部音声取得時の404/403エラーを防止するno-referrerポリシーの徹底と、詳細なメディアエラー診断ログを導入',
            '学習モードのオフライン音声対応：インターネット接続がない環境でも、日本語・中国語・韓国語・英語の高音質システム音声へ自動フォールバック'
        ],
        ko: [
            '안정적인 3단계 오디오 재생 파이프라인: 원어민 사전 오디오 -> 고음질 신경망 스트림 TTS -> 내장 Web Speech API로 이어지는 장애 복구 체계를 구축하여 모든 단어의 안정적인 발음 지원',
            'Referer 차단 및 진단 강화: 외부 미디어 요청 시 no-referrer 정책을 적용하여 404/403 재생 오류를 원천 차단하고 정밀한 진단 로그 제공',
            '오프라인 음성 합성 지원: 학습 모드에서 네트워크 연결이 끊긴 상태에서도 일본어, 중국어, 한국어, 영어 시스템 음성으로 원활하게 자동 재생'
        ],
        zh: [
            '高可用三级发音播放机制：升级 AudioService，建立（原生词典发音 -> 神经网络音频流 TTS -> 原生 Web Speech API）的三级回退流程，保障所有单词发音 100% 畅通',
            '免 Referer 隔离与精细诊断：严格启用 no-referrer 策略，根除跨域媒体流导致的 404/403 播放失败，并大幅优化诊断日志',
            '离线发音无缝支持：在学习模式或断网环境下，自动无缝回退至系统高品质发音引擎，全面覆盖日语、中文、韩语及英语'
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
