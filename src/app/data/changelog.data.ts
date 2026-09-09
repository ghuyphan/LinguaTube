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
    version: '1.0.31',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Unified Subtitle Display Layout: Eliminated vertical cue jumping by stabilizing reading baseline heights across single and multi-line subtitles',
            'Mobile Typographic Baseline Alignment: Standardized word token alignments across Japanese furigana, Chinese, Korean, and English text on mobile screens',
            'Difficulty Level Lifecycle & Shimmer Skeleton: Added elegant placeholder skeleton during subtitle fetching and eradicated stale level badges on video switch',
            'Optimized Playback Performance: Enhanced active cue matching and throttled lazy loading to minimize layout reflow during continuous playback'
        ],
        vi: [
            'Ổn định giao diện phụ đề: Loại bỏ hiện tượng phụ đề nhảy dòng bằng cách cố định chiều cao đường cơ sở cho cả phụ đề 1 dòng và nhiều dòng',
            'Căn chỉnh đường cơ sở trên di động: Chuẩn hóa căn lề typographic cho furigana tiếng Nhật, tiếng Trung, tiếng Hàn và tiếng Anh trên thiết bị di động',
            'Vòng đời huy hiệu cấp độ & hiệu ứng Skeleton: Bổ sung huy hiệu shimmer sang trọng khi tải phụ đề và xóa sạch huy hiệu cấp độ cũ khi chuyển video',
            'Tối ưu hiệu năng phát video: Cải thiện so khớp cue đang phát và tiết chế kiểm tra lazy load nhằm triệt tiêu hiện tượng giật khung hình'
        ],
        ja: [
            '字幕表示レイアウトの安定化：1行・複数行字幕の基準高さを統一し、再生中の垂直方向の字幕の揺れ・跳ね上がりを解消',
            'モバイルタイポグラフィの整列：日本語のルビ（ふりがな）、中国語、韓国語、英語の単語ベースラインを全画面幅で完全に一致化',
            '難易度バッジのライフサイクルとシマースケルトン：字幕読み込み中に自然なスケルトンを表示し、前動画のバッジが残る問題を完全に解決',
            '動画再生パフォーマンスの向上：アクティブ字幕の比較処理を最適化し、スクロール時の不要なリフローとCPU負荷を大幅に削減'
        ],
        ko: [
            '자막 레이아웃 안정화: 1줄 및 다중 줄 자막 간의 기준선 높이를 고정하여 재생 중 자막이 위아래로 튀는 현상 완벽 해결',
            '모바일 타이포그래피 베이스라인 정렬: 일본어 후리가나, 중국어, 한국어, 영어 단어 토큰의 기준선을 모바일 화면에서도 일관되게 정렬',
            '난이도 배지 라이프사이클 및 쉬머 스켈레톤: 자막 로딩 중 세련된 스켈레톤 UI를 표시하고 이전 동영상의 배지가 남는 문제 완전 해결',
            '재생 성능 최적화: 활성 자막 매칭 로직을 정수 인덱스로 최적화하고 지연 로딩 검사를 조절하여 레이아웃 리플로우 최소화'
        ],
        zh: [
            '字幕展示布局深度稳定：统一单行与多行字幕的基础排版高度，彻底消除字幕切换时的垂直跳动与视觉位移',
            '移动端文字基准线对齐：完美统一日语假名注音、中文、韩语及英语在小屏幕上的文字排版基线，告别参差错位',
            '难度徽章生命周期与骨架屏：字幕加载及AI转录期间呈现精致微光骨架屏，并在切换视频时即时重置避免显示旧级别',
            '视频播放性能大幅优化：优化当前字幕匹配机制并节流懒加载检测，显著降低持续播放时的DOM重排与性能损耗'
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
