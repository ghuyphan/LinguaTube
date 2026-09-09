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
    version: '1.0.13',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Proficiency Level Video Filtering: Fixed video level filtering across Japanese, English, Korean, and Chinese with authentic multi-tier video classifications',
            'Missing Translation Fixes: Resolved raw translation keys (such as common.noResults) with localized empty-state messages for video and playlist filters',
            'Instant Recommendation Refresh: Optimized edge and client caching to eliminate stale empty states and deliver instant updates when switching levels'
        ],
        vi: [
            'Lọc Video theo Cấp độ Trôi chảy: Khắc phục lỗi lọc video theo cấp độ cho tiếng Nhật, Anh, Hàn, Trung với dữ liệu phân loại độ khó thực tế',
            'Hoàn thiện Bản dịch Còn thiếu: Sửa lỗi hiển thị mã ngôn ngữ thô (như common.noResults), bổ sung thông báo trạng thái trống rõ ràng trên bộ lọc video và playlist',
            'Làm mới Đề xuất Tức thì: Tối ưu bộ nhớ đệm tại edge và máy khách, loại bỏ trạng thái trống cũ và cập nhật ngay lập tức khi đổi cấp độ'
        ],
        ja: [
            '難易度レベル別動画フィルターの改善：日本語・英語・韓国語・中国語の各難易度レベルに応じた正確な分類とフィルタリングを修正',
            '未翻訳キーの修正：未翻訳のまま表示されていたキー（common.noResults など）を解消し、動画・プレイリストの空状態メッセージを多言語対応',
            'おすすめ動画の即時反映：エッジおよびクライアントのキャッシュを最適化し、古い空データの残存を防ぎ、レベル切替時の高速表示を実現'
        ],
        ko: [
            '난이도별 추천 동영상 필터 개선: 일본어, 영어, 한국어, 중국어의 실제 난이도 등급에 맞춰 동영상 필터링 기능 정상화',
            '누락된 번역 키 수정: common.noResults 등 번역되지 않은 키 표시 오류를 해결하고 동영상 및 재생목록 필터의 빈 상태 안내 메시지 추가',
            '추천 동영상 즉각 갱신: 엣지 및 클라이언트 캐시를 최적화하여 이전 빈 캐시 잔존을 방지하고 레벨 전환 시 즉시 반영'
        ],
        zh: [
            '难度等级视频筛选优化：修复了日语、英语、韩语和汉语按语言等级筛选视频的功能，补充真实多阶难度分类',
            '补齐缺失的本地化文案：修复未翻译的原始文本键（如 common.noResults），规范视频与播放列表筛选为空时的多语言提示',
            '推荐视频即时刷新：优化边缘端与客户端缓存机制，清除过期的空结果缓存，切换难度等级时即可秒级展示'
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
