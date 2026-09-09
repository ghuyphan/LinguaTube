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
    version: '1.0.28',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Unified Caption & Language Badge: Fixed video card subtitle pill clutter by merging duplicate CC indicators into a clean, compact subtitle badge with active language flag and +N counter',
            'History & Playlist Subtitle Alignment: Watch history and playlists now exclusively track verified server subtitles (sub_languages) instead of raw YouTube caption tracks',
            'Auto-Evict Stale Recommendations: Purged legacy cached video recommendation lists from LocalStorage to ensure only authentic subtitle tracks are displayed'
        ],
        vi: [
            'Hợp nhất huy hiệu phụ đề & ngôn ngữ: Sửa lỗi hiển thị rườm rà trên thẻ video bằng cách gộp biểu tượng CC và cờ ngôn ngữ thành một huy hiệu phụ đề gọn gàng với bộ đếm +N',
            'Đồng bộ phụ đề cho Lịch sử & Danh sách phát: Lịch sử xem và danh sách phát giờ đây chỉ ghi nhận các phụ đề đã xác thực trên máy chủ thay vì toàn bộ danh sách YouTube',
            'Tự động dọn dẹp bộ nhớ đệm đề xuất cũ: Loại bỏ dữ liệu đề xuất cũ trong LocalStorage để đảm bảo hiển thị đúng các ngôn ngữ phụ đề thực tế'
        ],
        ja: [
            '字幕・言語バッジの統合UI改善：重複していたCCバッジと国旗リストを整理し、学習言語フラグと+N表記を備えたすっきりとした字幕バッジに刷新',
            '履歴・プレイリストの検証済み字幕同期：視聴履歴およびプレイリストにおいて、YouTubeの全字幕ではなくサーバー上に実際に存在する検証済み字幕（sub_languages）のみを記録',
            'レコメンドキャッシュの自動更新：古いローカルストレージの動画推薦キャッシュを無効化し、常に正確な検証済み字幕のみを表示'
        ],
        ko: [
            '자막 및 언어 배지 UI 통합: 중복 표시되던 CC 배지와 긴 언어 목록을 활성 언어 국기와 +N 카운터가 포함된 깔끔한 자막 배지로 개선',
            '시청 기록 및 재생목록 자막 언어 동기화: 시청 기록과 재생목록에 YouTube의 모든 자막 대신 서버 검증 자막(sub_languages)만 기록하도록 정렬',
            '오래된 추천 캐시 자동 제거: 로컬스토리지의 과거 추천 캐시를 정리하여 항상 검증된 실제 자막만 표시'
        ],
        zh: [
            '字幕与语言角标一体化设计：合并重复的CC标识与过长的语言列表，升级为带有当前语言国旗和+N计数的紧凑字幕徽章',
            '观看历史与播放列表字幕对齐：历史记录与播放列表现仅记录服务器上实际已验证的字幕语言（sub_languages），不再受YouTube全部音轨干扰',
            '推荐缓存自动失效更新：自动清理LocalStorage中残留的旧版推荐视频缓存，确保展示真实的字幕语言'
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
