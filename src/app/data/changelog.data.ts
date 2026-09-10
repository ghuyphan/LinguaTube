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
    version: '1.1.11',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Daily Missions & Reward Chest: Complete 3 daily quests (video immersion, vocabulary, SRS flashcards, dictionary) to unlock the bonus XP chest',
            'Weekly Leaderboard & Trophy Hub: Compete in weekly league resets alongside lifetime rankings in a unified Missions, Achievements & Leaderboard hub',
            'Refined Video Layout: Sidebar height seamlessly aligns to the 16:9 video player without layout shifts or height jumping',
            'Polished UI & Tactile Press States: Consistent card padding, refreshed high-res PWA icons, and smooth micro-interactions without text jitter'
        ],
        vi: [
            'Nhiệm vụ ngày & Rương phần thưởng: Hoàn thành 3 thử thách hằng ngày (xem video, lưu từ, luyện SRS, tra từ) để mở rương thưởng XP',
            'Đua top tuần & Trung tâm vinh danh: Tranh tài bảng xếp hạng tuần mới mẻ và tích lũy trọn đời tại giao diện hợp nhất Nhiệm vụ, Thành tựu & Bảng xếp hạng',
            'Bố cục xem video tinh gọn: Chiều cao thanh bên đồng bộ chuẩn xác với khung video 16:9, không bị giật hay co giãn khi đóng/chuyển video',
            'Giao diện đồng nhất & Chạm mượt mà: Chuẩn hóa khoảng đệm thẻ, cập nhật bộ icon PWA sắc nét và tối ưu hiệu ứng nhấn êm ái'
        ],
        ja: [
            'デイリーミッション＆宝箱：動画視聴、単語保存、SRS復習、辞書検索の3つのクエストをクリアしてXPボーナスチェストを開封',
            '週間ランキング＆トロフィーハブ：毎週リセットされる週間リーグと累計ランキングを統合したミッション・実績・ランキング画面',
            '動画レイアウトの最適化：単語サイドバーの高さが16:9動画プレイヤーに美しく揃い、動画開閉時の不自然な伸縮を解消',
            'デザイン統一＆滑らかなタップ操作：カード余白の統一、高解像度PWAアイコンの刷新、文字ブレのない心地よいタップフィードバック'
        ],
        ko: [
            '일일 미션 및 보상 상자: 동영상 시청, 단어 저장, SRS 복습, 사전 검색 3가지 퀘스트 완료 시 추가 XP 보너스 상자 지급',
            '주간 리더보드 & 트로피 허브: 주간 리그 및 누적 랭킹을 한눈에 확인하는 미션·업적·리더보드 통합 인터페이스',
            '동영상 화면 레이아웃 최적화: 단어 사이드바 높이가 16:9 동영상 프레임에 맞춰 정렬되며, 동영상 전환 시 불필요한 크기 변화 제거',
            '디자인 통일 & 편안한 터치감: 카드 여백 표준화, 고해상도 PWA 아이콘 개선, 글자 흔들림 없는 부드러운 클릭 반응'
        ],
        zh: [
            '每日任务与通关宝箱：完成视频沉浸、生词收集、SRS复习、查词等3项每日挑战，开启额外XP通关宝箱',
            '每周天梯榜与荣誉中心：全新每周结算排行榜与终身荣誉结合，一体化呈现任务、成就与全球竞技',
            '优化视频学习布局：生词侧边栏高度与16:9视频框架精准对齐，关闭或切换视频时不再出现抖动和尺寸伸缩',
            '统一视觉规范与舒适交互：规范全站卡片内边距，更新高分辨率PWA图标，去除文字抖动，触控更顺滑'
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
