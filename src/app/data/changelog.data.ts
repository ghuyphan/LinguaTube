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
    version: '1.1.8',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Natural Bottom Subtitle Placement: Lowered resting fullscreen subtitle position to 94% (expanded range to 10%–95%), matching authentic caption areas and eliminating excessive vertical gap',
            'Proportional Controls Clearance: Tuned player controls bottom lift to 3.25rem (2.5rem on mobile), ensuring subtitles float cleanly above controls without jumping into the video center',
            'Fluid Direct Drag & Gesture Snapping: Re-engineered fullscreen subtitle drag controller outside Angular zone, eliminating the 50% anchor flip oscillation and enabling effortless Top/Bottom snapping',
            'Legacy Settings Auto-Migration: Automatically upgrades previous 84% subtitle positions in local storage to the new natural 94% placement'
        ],
        vi: [
            'Vị trí phụ đề đáy tự nhiên: Hạ vị trí phụ đề toàn màn hình xuống 94% (mở rộng giới hạn 10%–95%), khớp hoàn hảo với vị trí phụ đề video tiêu chuẩn và loại bỏ khoảng trống thừa bên dưới',
            'Nâng phụ đề cân đối khi hiện điều khiển: Tinh chỉnh khoảng nâng phụ đề khi thanh điều khiển xuất hiện xuống 3.25rem (2.5rem trên di động), giúp phụ đề nằm ngay phía trên thanh phát mà không bị đẩy lên giữa màn hình',
            'Kéo thả mượt mà & cử chỉ hít vị trí: Thiết kế lại cơ chế kéo phụ đề toàn màn hình chạy hoàn toàn ngoài Angular zone, loại bỏ hiện tượng giật nhảy khi qua mốc 50% và hỗ trợ hít vị trí Trên/Dưới mượt mà',
            'Tự động nâng cấp cài đặt cũ: Tự động di chuyển cài đặt phụ đề cũ từ 84% sang vị trí 94% mới trong bộ nhớ trình duyệt'
        ],
        ja: [
            '自然な下部字幕配置：全画面字幕の標準下部位置を94%（調整範囲を10%〜95%）へ引き下げ、YouTube等の標準字幕エリアと自然に一致させ不要な余白を解消',
            'コントロール表示時の最適な逃げ幅：下部バー表示時の字幕リフト幅を3.25rem（モバイル2.5rem）へ調整し、画面中央に飛び上がることなく操作バーのすぐ上に綺麗に配置',
            '滑らかなドラッグ操作とスナップジェスチャー：Angularゾーン外で直接制御するドラッグ処理へ刷新し、50%境界での反転跳躍バグを完全解消、上下端への快適なスナップを実現',
            '既存設定の自動アップグレード：旧バージョンで保存された84%の位置設定をブラウザストレージから自動的に新標準の94%へ移行'
        ],
        ko: [
            '자연스러운 하단 자막 배치: 전체화면 기본 자막 위치를 94%로 낮추고(조정 범위 10%~95%로 확장) 스트리밍 표준 자막 위치에 자연스럽게 맞춰 과도한 하단 공백 제거',
            '컨트롤 표시 시 균형 잡힌 위치 조정: 하단 플레이어 컨트롤 표시 시 자막 상승 폭을 3.25rem(모바일 2.5rem)으로 최적화하여 화면 중앙으로 치솟지 않고 컨트롤 바로 위에 안정적으로 배치',
            '부드러운 직접 드래그 및 스냅 제스처: Angular 존 외부에서 직접 제어하는 드래그 엔진으로 전면 개편하여 50% 지점 반전 튀김 현상을 제거하고 상/하단 스냅 지원',
            '기존 설정 자동 마이그레이션: 로컬 스토리지에 저장된 이전 84% 자막 위치를 새로운 표준인 94%로 자동 업그레이드'
        ],
        zh: [
            '自然贴合的底部字幕位置：将全屏字幕默认底部高度下调至 94%（调节范围扩展至 10%–95%），完美契合主流视频字幕区域，彻底消除底部过大空白',
            '控件浮起间距黄金优化：将播放控制栏出现时的字幕上移幅度微调至 3.25rem（移动端 2.5rem），既能优雅避让控制条，又绝不上跳至屏幕正中',
            '跟手无感拖拽与手势吸附：全新重构脱离 Angular 变更检测的直接手势引擎，彻底根除越过 50% 时的锚点抖动跳变，支持轻触切换与上下端丝滑吸附',
            '历史设置平滑自动迁移：自动将本地缓存中旧版的 84% 字幕位置无缝升级为全新的 94% 黄金位置'
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
