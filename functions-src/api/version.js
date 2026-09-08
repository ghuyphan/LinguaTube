/**
 * Version & Changelog API (Cloudflare Pages Function)
 * Route: GET /api/version
 * 
 * Provides current server version, minimum supported version for breaking changes,
 * maintenance mode status, and localized "What's New" release highlights.
 */

import { jsonResponse, handleOptions } from '../utils/utils.js';

const APP_VERSION_DATA = {
    version: '1.0.0',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-08',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Lightweight Service Worker updates (under 150KB)',
            'In-app update checker and version viewer in Settings',
            'Corrupted cache auto-recovery and infinite reload protection',
            'Persistent update indicator badges on navigation items'
        ],
        vi: [
            'Cập nhật Service Worker siêu nhẹ (dưới 150KB)',
            'Nút kiểm tra cập nhật và xem phiên bản trong Cài đặt',
            'Tự động khôi phục khi bộ nhớ đệm lỗi và chống lặp tải lại',
            'Huy hiệu chấm báo cập nhật trên thanh điều hướng'
        ],
        ja: [
            '150KB未満の超高速サービスワーカーアップデート',
            '設定画面にアップデート確認ボタンとバージョン表示を追加',
            'キャッシュ破損時の自動復旧と無限リロード防止ガード',
            'ナビゲーションに更新通知ドットバッジを表示'
        ],
        ko: [
            '150KB 미만의 초고속 서비스 워커 업데이트',
            '설정에 업데이트 확인 버튼 및 버전 뷰어 추가',
            '손상된 캐시 자동 복구 및 무한 새로고침 방지',
            '내비게이션에 지속적인 업데이트 알림 점 표시'
        ],
        zh: [
            '低于150KB的极速Service Worker更新',
            '设置中新增检查更新按钮与版本查看',
            '损坏缓存自动恢复与防无限刷新保护',
            '导航栏常驻更新提示圆点徽标'
        ]
    }
};

export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet() {
    return jsonResponse(APP_VERSION_DATA, 200, {
        'Cache-Control': 'no-store, no-cache, must-revalidate'
    });
}
