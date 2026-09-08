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
    version: '1.0.7',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Edge KV Quota Preservation: Optimized Cloudflare KV operations by removing redundant writes from video metadata and subtitle batching, slashing daily KV writes by over 90%',
            'Smart Rate-Limiter Synchronization: Distributed rate-limiting counters now sync to KV only when approaching limits or blocking abusers, eliminating write spikes during normal usage',
            'Warm In-Memory Isolate Caches: Added ultra-fast in-memory LRU caching to dictionary lookups, video info, and tokenization endpoints for instant sub-millisecond responses'
        ],
        vi: [
            'Tối ưu hóa hạn ngạch Cloudflare KV: Giảm hơn 90% lượt ghi KV hàng ngày bằng cách loại bỏ việc ghi thừa đối với thông tin video và dịch phụ đề theo đợt',
            'Đồng bộ hóa giới hạn tốc độ thông minh: Bộ đếm rate-limit phân tán chỉ đồng bộ lên KV khi tiệm cận giới hạn hoặc chặn hành vi lạm dụng, chấm dứt tình trạng tốn quota khi sử dụng thông thường',
            'Bộ nhớ đệm Isolate siêu tốc: Bổ sung bộ đệm LRU trong bộ nhớ Worker cho tra cứu từ điển, thông tin video và tách từ để phản hồi tức thì dưới 1 mili-giây'
        ],
        ja: [
            'Cloudflare KVクォータ最適化：動画メタデータや字幕一括翻訳の冗長な書き込みを排除し、日次KV書き込みを90%以上削減',
            'スマートなレート制限同期：通常使用時の書き込みスパムを防止し、クォータ上限接近時または不正遮断時のみKV同期を実行',
            '超高速インメモリキャッシュ：辞書検索、動画情報、トークン化エンドポイントにWorkerメモリLRUキャッシュを追加し、1ミリ秒未満の高速レスポンスを実現'
        ],
        ko: [
            'Cloudflare KV 할당량 최적화: 비디오 메타데이터 및 자막 배치 번역의 중복 쓰기를 제거하여 일일 KV 쓰기 작업을 90% 이상 절감',
            '스마트 속도 제한 동기화: 정상 사용 중 불필요한 동기화를 방지하고, 제한 접근 시 또는 남용 차단 시에만 분산 KV 동기화 수행',
            '초고속 인메모리 캐시: 사전 검색, 비디오 정보, 토큰화 엔드포인트에 워커 메모리 LRU 캐시를 도입하여 1밀리초 미만의 즉각적인 응답 제공'
        ],
        zh: [
            'Cloudflare KV 配额深度优化：彻底移除视频元数据与字幕分批翻译的冗余写入，日常 KV 写入量降低 90% 以上',
            '智能速率限制同步机制：仅在接近配额阈值或拦截恶意请求时才向 KV 同步计数，杜绝日常正常访问时的写入激增',
            '热内存 Isolate 极速缓存：为词典查询、视频元数据与分词接口引入内存级 LRU 缓存，实现低于 1 毫秒的毫秒级即时响应'
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
