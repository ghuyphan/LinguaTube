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
    version: '1.0.27',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Verified Server Subtitles (sub_languages): "For You" recommendations are now strictly filtered to videos that actually have stored transcripts on our server, eliminating phantom recommendations',
            'Multi-Language Subtitle Tracking: Videos can now record multiple verified subtitle languages in the database (e.g. JA / EN) as new transcripts are generated or fetched',
            'Accurate Language Badges: Video cards only display badges for languages with verified transcripts on the server, removing misleading badges from YouTube tracklists'
        ],
        vi: [
            'Xác thực phụ đề trên máy chủ (sub_languages): Mục "Dành cho bạn" giờ đây chỉ đề xuất các video thực sự đã có phụ đề lưu trên máy chủ, triệt tiêu các đề xuất ảo',
            'Hỗ trợ đa ngôn ngữ phụ đề: Video có thể lưu trữ nhiều ngôn ngữ phụ đề đã xác thực trên cơ sở dữ liệu (ví dụ: JA / EN) khi có phụ đề mới được tạo',
            'Huy hiệu ngôn ngữ chính xác: Thẻ video chỉ hiển thị huy hiệu cho các ngôn ngữ thực sự có phụ đề trên máy chủ, loại bỏ các huy hiệu ảo từ danh sách YouTube'
        ],
        ja: [
            'サーバー検証済み字幕（sub_languages）：おすすめ動画（For You）でサーバー上に実際に保存されている字幕を持つ動画のみを厳密に推薦し、見かけだけの推薦を解消',
            '多言語字幕の追跡対応：動画に複数の検証済み字幕言語（例：JA / EN）をデータベース上で保存・更新できるように拡張',
            '正確な言語バッジ表示：サーバーに保存済みの字幕言語のみを動画カードにバッジ表示し、YouTubeの全トラックリストによる不要なバッジを排除'
        ],
        ko: [
            '서버 검증 자막 기반 추천 (sub_languages): "추천 영상" 피드에서 서버에 실제로 저장된 자막이 있는 동영상만 엄격하게 필터링하여 허위 추천 제거',
            '다국어 자막 추적 지원: 새로운 자막이 생성되거나 확인될 때 여러 개의 자막 언어(예: JA / EN)를 데이터베이스에 안전하게 기록 및 유지',
            '정확한 언어 배지 표시: 서버에 실제로 저장된 자막 언어만 비디오 카드에 배지로 표시하여 YouTube 트랙으로 인한 혼란 방지'
        ],
        zh: [
            '服务器验证字幕推荐 (sub_languages)：“为你推荐”视频流现在严格仅推荐服务器上实际存储了字幕的视频，杜绝无效推荐',
            '多语言字幕追踪支持：视频现可在数据库中记录并累加多个已验证的字幕语言（如 JA / EN），支持双语及多语种字幕',
            '准确的语言角标展示：视频卡片仅展示服务器上真实存在字幕的语言角标，消除来自 YouTube 外部轨道的虚假角标'
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
