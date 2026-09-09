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
    version: '1.0.25',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Dual Subtitles by Default: Interactive bilingual translated subtitles are now enabled out of the box for all supported videos',
            'Edge Abuse & Quota Hardening: Strictly enforce server-verified video durations for AI transcriptions and reject live broadcasts',
            'Cloudflare KV Optimization: Added L1 in-memory caches and throttled rate-limiter syncs to protect the daily KV write quota',
            'Security Fortification: Closed path traversal in dev server and sanitized PocketBase filter queries across all repository layers'
        ],
        vi: [
            'Bật phụ đề song ngữ mặc định: Phụ đề dịch song ngữ tương tác hiện được kích hoạt mặc định trên mọi video hỗ trợ',
            'Bảo vệ hạn mức AI & Chống lạm dụng Edge: Xác thực thời lượng video từ máy chủ cho AI transcription và từ chối phát trực tiếp',
            'Tối ưu hóa Cloudflare KV: Bổ sung bộ nhớ đệm L1 in-memory và điều tiết ghi KV giới hạn tốc độ để bảo toàn định ngạch miễn phí',
            'Củng cố bảo mật toàn diện: Vá lỗ hổng duyệt thư mục (path traversal) ở dev server và làm sạch truy vấn PocketBase filter'
        ],
        ja: [
            'デュアル字幕のデフォルト有効化：対応するすべての動画で、高精度な対訳字幕が初期状態で自動表示されるように改善',
            'AI利用枠とEdgeセキュリティの強化：AI文字起こし時の動画尺をサーバー側で厳格に検証し、ライブ配信の不正処理を遮断',
            'Cloudflare KVの最適化：L1インメモリーキャッシュの導入とレート制限時のKV同期制御により、無料枠の書き込み上限を保護',
            '堅牢なセキュリティ防御：ローカル開発サーバーのパストラバーサル防止およびPocketBaseフィルターのインジェクション対策を完了'
        ],
        ko: [
            '이중 자막 기본 활성화: 지원되는 모든 영상에서 유용한 번역 보조 자막이 기본적으로 켜지도록 UX 개선',
            'AI 쿼터 및 Edge 보안 강화: AI 전사 시 영상 길이를 서버에서 직접 검증하고 라이브 스트림 요청을 완벽히 차단',
            'Cloudflare KV 최적화: L1 인메모리 캐시 도입 및 속도 제한 시 KV 동기화 조절로 일일 KV 쓰기 쿼터 절약',
            '보안 취약점 전면 보강: 개발 서버의 경로 탐색(Path Traversal) 방지 및 PocketBase 필터 인젝션 방어 적용'
        ],
        zh: [
            '双语字幕默认开启：所有支持的视频现已默认启用交互式双语对照字幕，全面提升学习体验',
            'AI 配额与 Edge 防刷增强：在服务端严格校验 AI 转录的视频时长，杜绝篡改并拒绝直播内容',
            'Cloudflare KV 极致优化：引入 L1 内存缓存并节流限流写入，严格保护每日免费 KV 写入配额',
            '全栈安全防护巩固：修复本地开发服务器的路径遍历隐患，并彻底净化 PocketBase 过滤器注入风险'
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
