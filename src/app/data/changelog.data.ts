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

import { APP_VERSION } from '../core/constants/version';

export interface ReleaseInfo {
    version: string;
    buildDate: string;
    highlights: Record<string, string[]>;
}

export const CURRENT_RELEASE_INFO: ServerVersionInfo = {
    version: APP_VERSION,
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-13',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'AI Dual Subtitle Layout Stabilization: Pre-allocated two-line bounding heights and smooth opacity transitions eliminate vertical layout shifts across inline, fullscreen, and transcript list views when AI translations load',
            'Refined Minimalist AI Design: Replaced the wand icon and purple/pink glowing gradient with a modern, brand-consistent coral accent ring and clean sparkles aesthetic',
            'Instant Subtitle Availability Discovery: Subtitle presence checks for videos without native transcripts now short-circuit in < 20ms using global negative caching and D1 registries, eliminating 15s upstream timeouts',
            'Natural Speech Utterance Splitting: AI transcription turns and long monologue blocks are split into natural, readable 1–2 line cues at sentence and clause punctuation boundaries'
        ],
        vi: [
            'Ổn Định Bố Cục Phụ Đề Song Ngữ AI: Thiết lập vùng đệm 2 dòng cố định và hiệu ứng mờ dần mượt mà, triệt tiêu hoàn toàn hiện tượng chữ bị giật nảy khi tải bản dịch AI trên cả chế độ khung, toàn màn hình và danh sách câu',
            'Thiết Kế AI Tinh Tế & Đồng Bộ: Thay thế biểu tượng đũa phép và dải màu tím phát sáng bằng vòng quay màu san hô thương hiệu sang trọng cùng biểu tượng ánh sao tối giản',
            'Phát Hiện Phụ Đề Tức Thì: Kiểm tra tính sẵn sàng của phụ đề cho các video không có phụ đề gốc giờ đây hoàn tất trong < 20ms nhờ bộ nhớ đệm phủ định toàn cục và D1, loại bỏ hoàn toàn độ trễ 15 giây',
            'Tách Câu Hội Thoại Tự Nhiên: Các đoạn nói dài từ AI transcription được tách thông minh thành các câu phụ đề 1–2 dòng vừa mắt tại các dấu ngắt câu và mệnh đề'
        ],
        ja: [
            'AI二重字幕レイアウトの安定化: 2行分の表示高を事前確保しスムーズなフェード効果を採用することで、AI翻訳読み込み時に発生していた字幕テキストの上下ジャンプを完全に解消',
            '洗練されたミニマルなAIデザイン: 魔法の杖アイコンや紫/ピンクのグラデーション発光を廃止し、ブランド統一のコーラルアクセントリングと星アイコンによる上品な装いに刷新',
            '字幕有無の即時判定: 字幕が存在しない動画の確認がグローバルネガティブキャッシュとD1により20ms未満で高速完了し、15秒のタイムアウト待機を完全に解消',
            '自然な発話単位での字幕分割: AI音声認識の長文や会話ターンを、句読点や節の境界で読みやすい1〜2行の自然な字幕キューへとインテリジェントに自動分割'
        ],
        ko: [
            'AI 이중 자막 레이아웃 안정화: 2줄 높이를 사전 확보하고 부드러운 페이드 전환을 적용하여 AI 번역 로드 시 인라인, 전체화면 및 자막 목록에서 텍스트가 흔들리는 현상 완전 근절',
            '세련되고 미니멀한 AI 비주얼 디자인: 요술봉 아이콘과 보라/분홍빛 그라데이션을 걷어내고 브랜드 고유의 코랄 액센트 링과 깔끔한 스파클 아이콘으로 현대적인 감각 완성',
            '자막 가용성 즉시 감지: 자막이 없는 비디오의 가용성 확인이 전역 네거티브 캐시 및 D1을 통해 20ms 미만으로 단축되어 15초의 업스트림 대기 시간을 완전 제거',
            '자연스러운 발화 단위 분할: AI 전사로 생성된 긴 단락 및 대화 발화를 문장 부호와 절 경계에 맞춰 가독성 높은 1~2줄 자막으로 지능형 분할'
        ],
        zh: [
            'AI双语字幕布局稳定性优化: 预设双行基准高度并引入平滑淡入效果，彻底杜绝AI译文加载时在主面板、全屏模式以及字幕列表中引发的字句垂直跳动',
            '简约精致的AI视觉重塑: 移除魔杖图标与紫粉色炫光渐变，全面升级为品牌珊瑚色转圈指示环与极简星光微章',
            '即时字幕存在性探测: 针对无原生字幕的视频，依托全局否定缓存与D1注册表在20ms内快速响应，彻底消除长达15秒的上游抓取超时等待',
            '自然发音句断句拆分: 智能对齐标点符号与从句分界，将AI听写的大段连贯语句平滑拆分为1至2行舒适自然的字幕小句'
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
