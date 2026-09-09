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
    version: '1.0.22',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'YouTube-Style Channel Avatars: Video cards now fetch and display official YouTube channel avatars with sleek letter-initial fallbacks, matching authentic YouTube aesthetics',
            'Smart Multi-Language Sub-Badges: Videos now feature dedicated language badges (e.g. 🇯🇵 JA, 🇯🇵 JA / 🇬🇧 EN, 🇨🇳 ZH +2) with prioritized target language sorting and accurate BCP 47 flag matching',
            'Persistent Database & Avatar Schema: Extended Cloudflare D1 video metadata schema with channel_avatar caching for sub-millisecond edge delivery'
        ],
        vi: [
            'Ảnh đại diện kênh chuẩn phong cách YouTube: Thẻ video hiện lấy và hiển thị ảnh đại diện chính thức của kênh YouTube cùng chữ cái thay thế thanh lịch khi chưa tải được',
            'Huy hiệu đa ngôn ngữ thông minh: Video hiện có huy hiệu ngôn ngữ riêng biệt (ví dụ: 🇯🇵 JA, 🇯🇵 JA / 🇬🇧 EN, 🇨🇳 ZH +2) với cờ chuẩn BCP 47 và luôn ưu tiên ngôn ngữ bạn đang học lên đầu',
            'Nâng cấp Cơ sở dữ liệu D1: Bổ sung trường channel_avatar vào Cloudflare D1 giúp lưu vĩnh viễn và phản hồi siêu tốc dưới 1 mili-giây'
        ],
        ja: [
            'YouTubeスタイルのチャンネルアバター：動画カードにYouTube公式チャンネルアイコンを表示。未取得時は洗練されたイニシャルプレースホルダーで自然に表示',
            'スマートな多言語バッジシステム：動画カードに専用言語バッジ（例：🇯🇵 JA、🇯🇵 JA / 🇬🇧 EN、🇨🇳 ZH +2）を追加し、学習対象言語を常に最優先かつ正確な国旗で表示',
            'D1データベースとアバターキャッシュ：Cloudflare D1のvideo_languagesテーブルにchannel_avatarを追加し、高速エッジ配信を実現'
        ],
        ko: [
            '유튜브 스타일 채널 아바타 지원: 동영상 카드에 공식 유튜브 채널 프로필 사진을 가져와 표시하며, 미제공 시 세련된 이니셜 플레이스홀더를 제공',
            '스마트 다국어 배지 시스템: 동영상에 전용 언어 배지(예: 🇯🇵 JA, 🇯🇵 JA / 🇬🇧 EN, 🇨🇳 ZH +2)를 도입하여 학습 중인 언어를 최우선으로 정렬하고 정확한 BCP 47 국기를 표시',
            'D1 데이터베이스 스키마 확장: Cloudflare D1 video_languages 테이블에 channel_avatar 컬럼을 추가하여 1ms 미만의 엣지 캐싱 지원'
        ],
        zh: [
            'YouTube 风格频道头像支持：视频卡片现已支持获取并展示官方 YouTube 频道头像，加载前提供精致的首字母占位图标',
            '智能多语言独立标签系统：视频卡片新增专属语言标签（如 🇯🇵 JA、🇯🇵 JA / 🇬🇧 EN、🇨🇳 ZH +2），自动置顶当前学习语言并精准匹配 BCP 47 旗帜',
            'D1 数据库与头像持久化存储：为 Cloudflare D1 video_languages 表扩展 channel_avatar 字段，实现毫秒级边缘高速缓存'
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
