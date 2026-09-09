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
    version: '1.1.1',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Global Leaderboard Community: Merged real learners with 28 active baseline learners across Japanese, Korean, Chinese, and English, keeping the board and podium vibrant',
            'Accurate Competitive Ranking: XP-based rank resolution dynamically places learners relative to the entire community, resolving the isolated single-user display',
            'Instant Score Sync & Refresh: Hardened private cache controls ensure clicking the sync button immediately delivers real-time XP and updated ranks'
        ],
        vi: [
            'Cộng đồng bảng xếp hạng toàn cầu: Kết hợp người học thực tế cùng 28 bạn học chuẩn mực trên 4 ngôn ngữ (Nhật, Hàn, Trung, Anh), giúp bục vinh quang Top 3 luôn sôi động',
            'Xếp hạng điểm số chuẩn xác: Tính toán thứ hạng linh hoạt theo tổng XP, khắc phục hoàn toàn lỗi bảng xếp hạng chỉ hiển thị duy nhất 1 người',
            'Đồng bộ & làm mới điểm số tức thì: Tối ưu hóa bộ nhớ đệm riêng tư giúp nút đồng bộ lập tức cập nhật điểm XP và thứ hạng mới nhất'
        ],
        ja: [
            'グローバルリーダーボードのコミュニティ拡充：日本語・韓国語・中国語・英語の28名の基準学習者と実ユーザーを統合し、表彰台と順位表を常に活性化',
            '正確なXPランキング算出：全体のXP分布に基づき相対順位を動的に算出し、ユーザーが1名のみ孤立表示される不具合を解消',
            '即時スコア同期と更新：プライベートキャッシュ制御を適用し、更新ボタンを押した際に最新のXPと順位を即座に反映'
        ],
        ko: [
            '글로벌 리더보드 커뮤니티 강화: 일본어·한국어·중국어·영어의 28명 기준 학습자와 실제 학습자를 통합하여 항상 활기찬 시상대와 순위표 제공',
            '정확한 XP 기반 순위 산출: 전체 학습자 데이터에 기반하여 상대적 순위를 동적으로 계산하고 혼자만 표시되던 버그 완벽 해결',
            '실시간 점수 동기화 및 새로고침: 비공개 캐시 제어를 적용하여 동기화 버튼 클릭 시 최신 XP와 순위를 즉시 반영'
        ],
        zh: [
            '全球排行榜社区活力升级：融合真实学员与覆盖日、韩、中、英四种语言的28位基准学员，确保领奖台与榜单始终充满活力',
            '精准XP经验值竞争排名：基于全员经验值动态计算相对名次，彻底修复之前只显示单个用户的异常',
            '实时经验值同步与刷新：优化私有缓存控制，点击同步按钮即刻获取最新经验值与实时排名'
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
