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
    version: '1.1.3',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Smart Language Switch Flow: Changing target learning language during video playback now cleanly resets the player and navigates to the Home Feed with fresh recommendations for your new language',
            'Native Caption Reliability: Extended timeout to 15s to support longer videos with multiple subtitle tracks without premature aborts',
            'Resilient API Key Failover: Enhanced key rotation to automatically failover across backup keys on quota exhaustion (402), auth errors (401), rate limits (429), and network timeouts',
            'Negative Cache Defense & Retry: Prevented transient network errors from falsely poisoning the no-caption cache and added a manual Retry button on empty subtitle screens'
        ],
        vi: [
            'Chuyển đổi ngôn ngữ học thông minh: Thay đổi ngôn ngữ mục tiêu khi đang xem video sẽ tự động đóng video hiện tại và mở trang Home Feed với các đề xuất dành riêng cho ngôn ngữ mới',
            'Nâng cao độ ổn định phụ đề gốc: Tăng thời gian chờ lên 15 giây giúp xử lý ổn định các video dài có nhiều track phụ đề',
            'Tự động chuyển API key dự phòng: Tự động đổi sang key thay thế khi gặp lỗi hết quota (402), lỗi xác thực (401), giới hạn tốc độ (429) hoặc timeout',
            'Bảo vệ Cache & Nút Thử lại: Ngăn chặn lưu cache âm tính khi gặp lỗi mạng tạm thời và bổ sung nút Thử lại ngay trên màn hình thông báo không có phụ đề'
        ],
        ja: [
            '学習言語切り替えの最適化：動画視聴中に学習対象言語を変更した場合、再生をクリアして新言語のおすすめ動画フィードへスムーズに遷移',
            'YouTube字幕取得の信頼性向上：タイムアウトを15秒に延長し、多言語字幕を持つ長編動画でも安定して字幕を取得',
            '堅牢なAPIキー自動フェイルオーバー：クレジット枯渇（402）、認証エラー（401）、レート制限（429）、通信タイムアウト時に予備キーへ即時自動切り替え',
            'ネガティブキャッシュ保護と再試行機能：一時的な通信エラーによる誤キャッシュを防止し、字幕未取得画面に「再試行」ボタンを追加'
        ],
        ko: [
            '스마트 학습 언어 전환 흐름: 영상 시청 중 목표 학습 언어를 변경하면 현재 영상을 초기화하고 새 언어에 맞춘 홈 추천 피드로 깔끔하게 이동',
            '유튜브 원본 자막 수집 안정성 개선: 타임아웃을 15초로 연장하여 다국어 트랙이 포함된 긴 동영상도 중단 없이 안정적으로 처리',
            '유연한 API 키 자동 장애 조치: 크레딧 소진(402), 인증 오류(401), 속도 제한(429), 타임아웃 발생 시 예비 키로 즉시 자동 전환',
            '부정 캐시 오염 방지 및 재시도 기능: 일시적 네트워크 오류 시 자막 없음 캐시 저장을 차단하고, 자막 화면에 수동 재시도 버튼 추가'
        ],
        zh: [
            '智能学习语言切换体验：在播放视频时切换目标学习语言，将自动重置当前视频并返回主页，无缝呈现新语言的专属推荐视频',
            '增强原生字幕获取稳定性：将超时时间延长至15秒，彻底解决包含多轨字幕的长视频因超时中断的问题',
            '高可用API密钥故障转移：在额度用尽（402）、鉴权错误（401）、限流（429）或超时场景下自动无缝轮换至备用密钥',
            '防范无效缓存与新增重试机制：避免临时网络错误污染无字幕缓存，并在未获取到字幕的界面添加快捷重试按钮'
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
