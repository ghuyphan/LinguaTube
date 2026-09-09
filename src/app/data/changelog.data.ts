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
    version: '1.0.29',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'On-Device Translation Priority: Dual subtitles leverage Chrome Built-in AI / W3C Translator API on device first for instant translation without network latency, with seamless cloud fallback',
            'Dual Subtitle Self-Healing & Loading Fix: Resolved infinite loading on cached transcripts with fuzzy cue matching and automatic background recovery of missing subtitle lines',
            'Accurate Native Transcript Discovery: Fixed false-negative transcript errors by normalizing regional language codes and preserving authentic alternate captions',
            'Optimized AI Transcription: Upgraded Gladia pipeline to v2 pre-recorded endpoint, conserved edge KV quotas, and hardened translation queues against timeouts'
        ],
        vi: [
            'Ưu tiên dịch trực tiếp trên thiết bị: Phụ đề song ngữ tận dụng AI tích hợp trên trình duyệt (Chrome Built-in AI) giúp dịch tức thì không độ trễ, tự động chuyển về máy chủ khi cần',
            'Tự sửa lỗi & chấm dứt tải vô hạn: Khắc phục triệt để lỗi quay tròn vô tận trên phụ đề có sẵn nhờ khớp thời gian thông minh và tự động dịch bù các câu còn thiếu',
            'Nhận diện phụ đề gốc chính xác: Chuẩn hóa mã ngôn ngữ vùng miền và lưu giữ phụ đề gốc thay thế, khắc phục lỗi báo không lấy được phụ đề',
            'Tối ưu hóa phiên âm AI: Nâng cấp luồng Gladia lên chuẩn v2 pre-recorded, tiết kiệm hạn ngạch KV Cloudflare và bảo vệ hàng đợi dịch trước nguy cơ quá thời gian chờ'
        ],
        ja: [
            'デバイス内AI翻訳の優先適用：Chrome Built-in AI（端末内翻訳）を最優先で実行し、ネットワーク遅延のない即時翻訳を実現（非対応時はクラウドへ自動フォールバック）',
            '二重字幕の自動修復と無限ローディング解消：タイムスタンプとテキストのあいまい一致により既存字幕の読み込み停止を解消し、未翻訳の行を視聴中に自動修復',
            'ネイティブ字幕取得精度の向上：地域言語コードの正規化と代替字幕の保持により、「字幕を取得できません」という誤検知エラーを解消',
            'AI文字起こしパイプラインの最適化：Gladia APIを最新のv2 pre-recordedへ移行し、エッジKVクォータの節約と翻訳キューのタイムアウト耐性を強化'
        ],
        ko: [
            '기기 내 AI 번역 우선 실행: Chrome Built-in AI 번역 API를 온디바이스에서 최우선으로 실행하여 네트워크 지연 없이 즉각 번역 지원 (미지원 시 클라우드 자동 전환)',
            '이중 자막 무한 로딩 해결 및 누락 자막 자동 복구: 타임스탬프 근접 매칭으로 캐시된 자막의 멈춤 현상을 해결하고, 재생 중 누락된 자막을 백그라운드에서 자동 보완',
            '정확한 원본 자막 탐색: 지역 언어 코드 정규화 및 대체 언어 자막 보존을 통해 자막을 찾을 수 없다는 오류 해결',
            'AI 음성 인식 파이프라인 최적화: Gladia API를 v2 pre-recorded 엔드포인트로 업그레이드하고 에지 KV 할당량을 절약하며 큐 지연 방지'
        ],
        zh: [
            '优先采用端侧设备AI翻译：优先调用浏览器内置Chrome Built-in AI翻译，实现零网络延迟的实时双语对照，并在不支持时无缝回退至云端',
            '双语字幕无限加载修复与缺失行自愈：通过时间戳智能模糊匹配解决已缓存字幕无限转圈问题，并在播放过程中自动补全修复缺失的字幕行',
            '原生字幕识别精准度提升：规范化各地区语言代码并完整保留多语言原生音轨，彻底解决误报无法获取字幕的问题',
            'AI转写流水线性能调优：升级Gladia接口至v2 pre-recorded最新规范，大幅削减Cloudflare KV写配额消耗并增强队列抗超时能力'
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
