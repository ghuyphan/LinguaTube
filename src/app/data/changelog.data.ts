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
    version: '1.0.6',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Server-Side Difficulty Filtering: Recommended videos and playlists now query Cloudflare D1 and PocketBase by proficiency tier (Beginner to Advanced), delivering full shelves of level-matched content',
            'Dual-Layer Filter Cache: Warm isolate caching and reactive Angular signals provide instant, zero-latency switching between difficulty levels',
            'Unified Proficiency Standard: Consistent tier mapping across Japanese (JLPT), Chinese (HSK), Korean (TOPIK), and English (CEFR) frameworks'
        ],
        vi: [
            'Lọc độ khó phía máy chủ: Video đề xuất và danh sách phát giờ đây truy vấn Cloudflare D1 và PocketBase theo trình độ (Sơ cấp đến Cao cấp), hiển thị đầy đủ nội dung tương ứng',
            'Bộ đệm lọc hai lớp: Kết hợp bộ nhớ đệm Worker và Angular Signals giúp chuyển đổi tức thì giữa các cấp độ khó mà không bị trễ',
            'Chuẩn hóa trình độ ngôn ngữ: Áp dụng phân cấp chuẩn hóa đồng bộ cho tiếng Nhật (JLPT), tiếng Trung (HSK), tiếng Hàn (TOPIK) và tiếng Anh (CEFR)'
        ],
        ja: [
            'サーバーサイド難易度フィルタリング：おすすめ動画とプレイリストがJLPT/HSK/TOPIK/CEFRの習熟度別にサーバー検索され、該当レベルのコンテンツを完全に網羅',
            '2層フィルタキャッシュ：エッジWorkerメモリとAngular Signalsにより、難易度切り替えが遅延ゼロで瞬時に反映',
            '統一された言語レベル基準：日本語、中国語、韓国語、英語の間で一貫した難易度分類を実現'
        ],
        ko: [
            '서버 사이드 난이도 필터링: 추천 비디오와 재생목록이 숙련도 등급(초급~고급)별로 서버에서 직접 조회되어 항상 충분한 학습 콘텐츠 제공',
            '2계층 필터 캐시: 엣지 워커 메모리와 Angular Signals를 결합하여 난이도 변경 시 지연 없는 즉각적인 전환 지원',
            '통합 언어 숙련도 표준: 일본어(JLPT), 중국어(HSK), 한국어(TOPIK), 영어(CEFR) 전반에 일관된 레벨 체계 적용'
        ],
        zh: [
            '服务端难度分级筛选：推荐视频与歌单现已支持按语言水平等级（初级至高级）直接服务端检索，确保结果充足不遗漏',
            '双层过滤高速缓存：结合边缘 Worker 内存与 Angular Signals，实现各难度等级之间零延迟无缝切换',
            '统一语言水平标准：全面覆盖并标准化日语 (JLPT)、中文 (HSK)、韩语 (TOPIK) 与英语 (CEFR) 分级体系'
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
