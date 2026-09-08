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
    version: '1.0.8',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Edge Infrastructure & D1 Optimization: Added compound indexes to D1 tables, removed destructive upserts, precompiled linguistic regexes, and capped batch operations to ensure Worker CPU stays strictly under 10ms',
            'Frontend Request Storm Elimination: Added cooldowns to translation retries, capped subtitle recovery loops, stopped payment polling on dialog close, and enabled negative transcript caching',
            'Smart Video Recommendation Caching: Introduced persistent LocalStorage caching (1-hour TTL) for curated video feeds, preventing redundant backend hits on page reloads and route transitions',
            'Dead Code & Clean Route Architecture: Purged legacy API routes, obsolete environment properties, and updated service worker caching strategies for maximum edge efficiency'
        ],
        vi: [
            'Tối ưu hóa hạ tầng Edge & D1: Bổ sung chỉ mục phức hợp cho bảng D1, loại bỏ upsert ghi đè dữ liệu, biên dịch trước regex ngôn ngữ và giới hạn kích thước đợt để đảm bảo CPU Worker luôn dưới 10ms',
            'Triệt tiêu vòng lặp & dồn dập request ở frontend: Thiết lập thời gian chờ giãn cách cho dịch thuật, giới hạn thử lại phụ đề, hủy polling thanh toán khi đóng dialog và lưu cache âm tính cho video không có phụ đề',
            'Bộ đệm đề xuất video thông minh: Lưu trữ persistent LocalStorage (TTL 1 giờ) cho danh sách video chọn lọc, ngăn chặn việc gọi API backend lặp lại khi tải lại trang hoặc đổi route',
            'Dọn dẹp mã thừa & chuẩn hóa route: Xóa bỏ các route API cũ, các thuộc tính cấu hình không còn sử dụng và cập nhật chiến lược cache PWA Service Worker để đạt hiệu quả biên tối đa'
        ],
        ja: [
            'エッジインフラ＆D1クエリの最適化：D1複合インデックスの追加、破壊的upsertの排除、言語解析正規表現の事前コンパイル、バッチサイズ制限によりWorker CPU時間を10ms未満に抑制',
            'フロントエンドのリクエスト過多＆リーク防止：翻訳リトライのクールダウン導入、字幕取得リトライの上限設定、決済ポーリングの破棄、字幕なし動画のネガティブキャッシュを実装',
            'おすすめ動画のスマートキャッシュ：ローカルストレージキャッシュ（有効期限1時間）を導入し、ページ再読み込みや画面遷移時の冗長なバックエンドアクセスを防止',
            'デッドコード削除＆ルート最適化：不要なレガシーAPIエンドポイントや環境変数を整理し、Service Workerのキャッシュ設定を最新化'
        ],
        ko: [
            '엣지 인프라 및 D1 쿼리 최적화: D1 복합 인덱스 추가, 파괴적 upsert 제거, 언어 분석 정규식 사전 컴파일, 배치 크기 제한을 통해 Worker CPU 시간을 10ms 미만으로 엄격히 유지',
            '프론트엔드 요청 폭주 및 누수 방지: 번역 재시도 백오프 적용, 자막 재시도 횟수 제한, 다이얼로그 종료 시 결제 폴링 해제, 자막 부재 동영상에 대한 네거티브 캐시 구현',
            '추천 비디오 스마트 캐싱: 1시간 유효기간의 로컬 스토리지 캐시를 적용하여 새로고침 및 페이지 이동 시 불필요한 백엔드 호출을 차단',
            '미사용 코드 정리 및 라우트 최적화: 레거시 API 엔드포인트와 불필요한 환경 변수를 제거하고 PWA Service Worker 캐시 전략을 최적화'
        ],
        zh: [
            '边缘基础架构与 D1 数据库深度优化：为 D1 添加复合索引，消除破坏性覆盖写入，预编译语言学正则，限制批处理规模以确保 Worker CPU 执行严格控制在 10ms 以内',
            '前端请求风暴与资源泄漏消除：为翻译重试添加指数退避冷却，限制字幕拉取重试，在弹窗关闭时即时终止支付轮询，并引入无字幕负向缓存',
            '视频推荐智能持久化缓存：为推荐视频列表引入 LocalStorage 持久化缓存（1 小时有效期），杜绝页面刷新和路由切换时的冗余后端请求',
            '废弃代码清理与路由架构优化：彻底清理遗留 API 路由与无用环境配置，并更新 Service Worker 缓存策略以最大化边缘运行效率'
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
