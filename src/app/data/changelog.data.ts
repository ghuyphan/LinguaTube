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
    version: '1.0.3',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-08',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Dual Subtitle Engine 2.0: High-speed translation with Google GTX and automatic client rotation',
            'Eliminated subtitle freeze and cancellation race conditions during tokenization and seeking',
            'Extended long video support up to 10,000 subtitle cues with lightweight cache checking',
            'Visual polish: borderless subtitle placeholders and smoother playback transitions'
        ],
        vi: [
            'Công cụ Phụ đề Song ngữ 2.0: Tốc độ dịch siêu nhanh với Google GTX và xoay vòng client tự động',
            'Khắc phục hoàn toàn hiện tượng đơ phụ đề hoặc hủy dịch ngầm khi tách từ vựng và tua video',
            'Hỗ trợ video dài lên tới 10.000 dòng phụ đề cùng cơ chế kiểm tra bộ nhớ đệm siêu nhẹ',
            'Tinh chỉnh giao diện: loại bỏ viền thừa của khung chờ phụ đề và chuyển động mượt mà hơn'
        ],
        ja: [
            'デュアル字幕エンジン2.0：Google GTXとクライアント自動ローテーションによる超高速翻訳',
            '形態素解析時や動画シーク時の字幕停止・リクエスト中断の競合問題を完全解消',
            '軽量キャッシュチェックにより最大10,000行の長尺動画字幕を快適にサポート',
            'UI改善：空の字幕プレースホルダーの枠線を排除し、より滑らかな表示を実現'
        ],
        ko: [
            '이중 자막 엔진 2.0: Google GTX 및 자동 클라이언트 로테이션을 통한 초고속 번역',
            '단어 토큰화 및 영상 탐색 시 자막이 멈추거나 번역이 취소되던 현상 완전 해결',
            '경량 캐시 확인 메커니즘으로 최대 10,000개 자막을 가진 긴 영상도 원활하게 지원',
            'UI 개선: 빈 자막 영역의 불필요한 테두리를 제거하고 더욱 매끄러운 화면 전환 제공'
        ],
        zh: [
            '双语字幕引擎 2.0：结合 Google GTX 与多客户端自动轮换的高速翻译',
            '彻底解决分词处理与视频快进时字幕冻结或被意外取消的问题',
            '超轻量级缓存检测机制，全面支持长达 10,000 行字幕的长视频',
            '界面视觉优化：去除空白占位框边框，字幕过渡更平滑自然'
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
