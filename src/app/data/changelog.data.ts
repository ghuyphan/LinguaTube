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
    version: '1.1.13',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Single-Line Channel Truncation: Video player header limits channel names to one line with responsive ellipsis and hover tooltip, preventing difficulty level badges from being pushed off-screen',
            'In-Memory Feed & Scroll Memory: Recommendations feed stays preserved in memory while watching videos, instantly returning to your exact card and scroll offset upon closing',
            'Native Touch Pull-to-Refresh: Added smooth YouTube-style downward drag gesture with a floating circular refresh indicator to easily refresh video recommendations'
        ],
        vi: [
            'Rút gọn tên kênh một dòng: Tiêu đề trình phát giới hạn tên kênh trên 1 dòng với dấu chấm lửng co giãn và chú giải đầy đủ, tránh làm tràn huy hiệu độ khó',
            'Giữ vị trí cuộn & Bảng tin tức thì: Danh sách gợi ý được giữ nguyên trong bộ nhớ khi xem video, trở lại ngay vị trí thẻ đang xem khi đóng video',
            'Kéo xuống để làm mới kiểu YouTube: Thêm thao tác kéo vuốt xuống mượt mà kèm biểu tượng tròn để làm mới danh sách video gợi ý nhanh chóng'
        ],
        ja: [
            'チャンネル名の1行省略表示：動画ヘッダーのチャンネル名をレスポンシブな最大幅と1行省略に制限し、レベルバッジの押し出しを防止',
            'フィード保持＆スクロール復元：動画再生中もおすすめフィードをメモリに保持し、動画終了時に直前の閲覧位置へ瞬時に復帰',
            'YouTube風プルダウン更新：ホームフィード上部で下スワイプすると回転インジケーターが表示され、おすすめ動画を手軽に最新化'
        ],
        ko: [
            '채널명 1줄 말줄임 처리: 동영상 플레이어 헤더의 채널명을 반응형 최대 너비와 1줄로 제한하여 난이도 뱃지가 밀려나지 않도록 개선',
            '피드 메모리 유지 & 스크롤 복원: 동영상 시청 중에도 홈 피드가 메모리에 유지되어 영상을 닫았을 때 보던 위치로 즉시 복귀',
            'YouTube 스타일 당겨서 새로고침: 홈 피드 상단에서 아래로 당겨 추천 동영상 목록을 간편하게 새로고침하는 터치 제스처 추가'
        ],
        zh: [
            '频道名称单行截断优化：播放器顶部频道名称限制为单行并设置自适应最大宽度，防止挤压或换行语言难度等级徽章',
            '推荐列表常驻与滚动记忆：观看视频时推荐流完整保存在内存中，关闭视频后立即恢复至先前的浏览位置与卡片',
            'YouTube 风格下拉刷新：在主页顶部向下滑动可呼出圆环刷新指示器，流畅获取最新推荐视频与播放列表'
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
