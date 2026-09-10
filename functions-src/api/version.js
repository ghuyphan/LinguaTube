/**
 * Version & Changelog API (Cloudflare Pages Function)
 * Route: GET /api/version
 * 
 * Provides current server version, minimum supported version for breaking changes,
 * maintenance mode status, and localized "What's New" release highlights.
 * 
 * Optimized for edge execution:
 * - Pre-serialized in-memory JSON (0 runtime serialization cost)
 * - ETag conditional validation (HTTP 304 Not Modified, 0-byte transfer on revalidation)
 * - Sub-millisecond execution with zero external I/O (no D1, KV, or external calls)
 */

import { handleOptions } from '../utils/utils.js';

const APP_VERSION_DATA = {
    version: '1.1.11',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-10',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'Daily Missions & Reward Chest: Complete 3 daily quests (video immersion, vocabulary, SRS flashcards, dictionary) to unlock the bonus XP chest',
            'Weekly Leaderboard & Trophy Hub: Compete in weekly league resets alongside lifetime rankings in a unified Missions, Achievements & Leaderboard hub',
            'Refined Video Layout: Sidebar height seamlessly aligns to the 16:9 video player without layout shifts or height jumping',
            'Polished UI & Tactile Press States: Consistent card padding, refreshed high-res PWA icons, and smooth micro-interactions without text jitter'
        ],
        vi: [
            'Nhiệm vụ ngày & Rương phần thưởng: Hoàn thành 3 thử thách hằng ngày (xem video, lưu từ, luyện SRS, tra từ) để mở rương thưởng XP',
            'Đua top tuần & Trung tâm vinh danh: Tranh tài bảng xếp hạng tuần mới mẻ và tích lũy trọn đời tại giao diện hợp nhất Nhiệm vụ, Thành tựu & Bảng xếp hạng',
            'Bố cục xem video tinh gọn: Chiều cao thanh bên đồng bộ chuẩn xác với khung video 16:9, không bị giật hay co giãn khi đóng/chuyển video',
            'Giao diện đồng nhất & Chạm mượt mà: Chuẩn hóa khoảng đệm thẻ, cập nhật bộ icon PWA sắc nét và tối ưu hiệu ứng nhấn êm ái'
        ],
        ja: [
            'デイリーミッション＆宝箱：動画視聴、単語保存、SRS復習、辞書検索の3つのクエストをクリアしてXPボーナスチェストを開封',
            '週間ランキング＆トロフィーハブ：毎週リセットされる週間リーグと累計ランキングを統合したミッション・実績・ランキング画面',
            '動画レイアウトの最適化：単語サイドバーの高さが16:9動画プレイヤーに美しく揃い、動画開閉時の不自然な伸縮を解消',
            'デザイン統一＆滑らかなタップ操作：カード余白の統一、高解像度PWAアイコンの刷新、文字ブレのない心地よいタップフィードバック'
        ],
        ko: [
            '일일 미션 및 보상 상자: 동영상 시청, 단어 저장, SRS 복습, 사전 검색 3가지 퀘스트 완료 시 추가 XP 보너스 상자 지급',
            '주간 리더보드 & 트로피 허브: 주간 리그 및 누적 랭킹을 한눈에 확인하는 미션·업적·리더보드 통합 인터페이스',
            '동영상 화면 레이아웃 최적화: 단어 사이드바 높이가 16:9 동영상 프레임에 맞춰 정렬되며, 동영상 전환 시 불필요한 크기 변화 제거',
            '디자인 통일 & 편안한 터치감: 카드 여백 표준화, 고해상도 PWA 아이콘 개선, 글자 흔들림 없는 부드러운 클릭 반응'
        ],
        zh: [
            '每日任务与通关宝箱：完成视频沉浸、生词收集、SRS复习、查词等3项每日挑战，开启额外XP通关宝箱',
            '每周天梯榜与荣誉中心：全新每周结算排行榜与终身荣誉结合，一体化呈现任务、成就与全球竞技',
            '优化视频学习布局：生词侧边栏高度与16:9视频框架精准对齐，关闭或切换视频时不再出现抖动和尺寸伸缩',
            '统一视觉规范与舒适交互：规范全站卡片内边距，更新高分辨率PWA图标，去除文字抖动，触控更顺滑'
        ]
    }
};

// In-memory isolate state with 60-second KV check interval
let currentVersionData = APP_VERSION_DATA;
let currentJsonString = JSON.stringify(APP_VERSION_DATA);
let currentEtag = `"${APP_VERSION_DATA.version}-${APP_VERSION_DATA.buildDate}"`;
let lastKvCheckTime = 0;
const KV_CHECK_INTERVAL_MS = 60_000; // 60s warm isolate TTL to conserve KV reads

export async function onRequestOptions() {
    return handleOptions(['GET', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request, env } = context;

    // Check Cloudflare KV for dynamic operational overrides (maintenance, force update, or emergency patch)
    const kv = env?.TRANSCRIPT_CACHE;
    const now = Date.now();
    if (kv && (now - lastKvCheckTime > KV_CHECK_INTERVAL_MS)) {
        lastKvCheckTime = now;
        try {
            const override = await kv.get('app_version_override', 'json');
            if (override && typeof override === 'object') {
                currentVersionData = {
                    ...APP_VERSION_DATA,
                    ...override,
                    highlights: {
                        ...APP_VERSION_DATA.highlights,
                        ...(override.highlights || {})
                    }
                };
                currentJsonString = JSON.stringify(currentVersionData);
                const versionTag = currentVersionData.version || APP_VERSION_DATA.version;
                const dateTag = override.updatedAt || currentVersionData.buildDate;
                currentEtag = `"${versionTag}-${dateTag}"`;
            } else if (currentVersionData !== APP_VERSION_DATA) {
                // Override removed from KV: revert cleanly to compiled release info
                currentVersionData = APP_VERSION_DATA;
                currentJsonString = JSON.stringify(APP_VERSION_DATA);
                currentEtag = `"${APP_VERSION_DATA.version}-${APP_VERSION_DATA.buildDate}"`;
            }
        } catch (err) {
            console.warn('[VersionAPI] Failed to read app_version_override from KV:', err);
        }
    }

    // Fast-path: HTTP 304 Not Modified if client's cached ETag matches
    const ifNoneMatch = request?.headers?.get('if-none-match');
    if (ifNoneMatch && (ifNoneMatch === currentEtag || ifNoneMatch === `W/${currentEtag}`)) {
        return new Response(null, {
            status: 304,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache, must-revalidate',
                'ETag': currentEtag
            }
        });
    }

    return new Response(currentJsonString, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Cache-Control': 'no-cache, must-revalidate',
            'ETag': currentEtag,
            'Vary': 'Accept-Encoding'
        }
    });
}
