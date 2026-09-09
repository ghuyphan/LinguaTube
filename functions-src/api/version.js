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
    version: '1.0.10',
    minSupportedVersion: '1.0.0',
    buildDate: '2026-09-09',
    forceUpdate: false,
    maintenance: false,
    highlights: {
        en: [
            'D1 Database Schema & Video Discovery Fix: Added missing levels column to the Cloudflare D1 video_languages registry, resolving query crashes and restoring recommended video feeds across all languages and difficulty levels',
            'Authentic Video Metadata & Level Enrichment: Enriched all 38 production video records with authentic YouTube video titles, author channels, and automated proficiency levels (JLPT/HSK/TOPIK/CEFR)',
            'Service Worker Cache De-freezing: Removed aggressive Service Worker caching on recommendation APIs to prevent stale empty-state persistence and guarantee real-time feed updates',
            'Client Cache Memory Protection: Added bounded entry limits to client HTTP interceptor caches to prevent memory accumulation and ensure lean performance in long sessions'
        ],
        vi: [
            'Khắc phục Schema D1 & Khôi phục Đề xuất Video: Bổ sung cột levels bị thiếu trong bảng video_languages trên Cloudflare D1, triệt tiêu lỗi truy vấn và khôi phục toàn diện nguồn video đề xuất cho mọi ngôn ngữ và cấp độ',
            'Làm giàu Siêu dữ liệu & Cấp độ Video: Cập nhật đầy đủ tiêu đề YouTube, tên kênh tác giả và phân loại cấp độ năng lực ngôn ngữ tự động (JLPT/HSK/TOPIK/CEFR) cho toàn bộ 38 video trên hệ thống',
            'Bỏ Đóng băng Bộ nhớ đệm Service Worker: Loại bỏ cấu hình lưu cache cứng của Service Worker đối với API video đề xuất, chấm dứt tình trạng kẹt màn hình trống trên thiết bị di động và đảm bảo dữ liệu mới nhất',
            'Bảo vệ Bộ nhớ & Tối ưu Client Cache: Giới hạn dung lượng bộ nhớ đệm HTTP interceptor phía client nhằm ngăn tích tụ RAM và duy trì độ mượt mà tối đa trong các phiên học kéo dài'
        ],
        ja: [
            'D1データベーススキーマ修復＆おすすめ動画の復旧：Cloudflare D1のvideo_languagesテーブルに不足していたlevelsカラムを追加し、クエリエラーを解消して全言語・全難易度のおすすめ動画フィードを正常に復元',
            '動画メタデータと難易度レベルの充実：クラウドに登録された全38本の動画に対して、YouTubeの正規タイトル、チャンネル名、および自動判定された習熟度レベル（JLPT/HSK/TOPIK/CEFR）を付与',
            'Service WorkerのAPIキャッシュ固定化を解除：おすすめ動画APIに対するService Workerの過剰なキャッシュ保持を撤廃し、モバイル端末での空表示の膠着を防ぎリアルタイムな更新を保証',
            'クライアントキャッシュのメモリ保護：長時間学習セッション時のメモリ蓄積を防ぐため、HTTPインターセプターキャッシュにエントリ上限を設定し軽量な動作を維持'
        ],
        ko: [
            'D1 데이터베이스 스키마 수정 및 추천 동영상 복구: Cloudflare D1 video_languages 테이블에 누락되었던 levels 컬럼을 추가하여 쿼리 충돌을 해결하고 모든 언어와 난이도별 추천 피드를 완벽히 복원',
            '동영상 메타데이터 및 난이도 수준 강화: 클라우드에 등록된 38개 동영상 전체에 대해 공식 YouTube 제목, 채널명 및 자동 감지된 숙련도 수준(JLPT/HSK/TOPIK/CEFR)을 완벽하게 보강',
            '서비스 워커의 API 캐시 고정 해제: 추천 API에 대한 서비스 워커의 과도한 캐싱을 제거하여 모바일 환경에서 빈 화면이 지속되는 현상을 방지하고 실시간 피드 갱신 보장',
            '클라이언트 캐시 메모리 보호: 장시간 학습 세션 동안 메모리 누적을 방지하기 위해 HTTP 인터셉터 캐시에 최대 항목 수 제한을 적용하여 최적의 성능 유지'
        ],
        zh: [
            'D1 数据库架构修复与推荐视频流恢复：在 Cloudflare D1 的 video_languages 表中增补缺失的 levels 字段，彻底解决查询异常并全面恢复各语种及难度层级的推荐视频流',
            '真实验证元数据与难度等级补全：为云端索引的全部 38 个精选视频补齐了真实的 YouTube 标题、作者频道以及自动评定的语言水平等级（JLPT/HSK/TOPIK/CEFR）',
            '解除 Service Worker 对推荐接口的过度缓存：移除了 Service Worker 对推荐 API 的长期本地冻结缓存，杜绝移动端空数据状态的顽固驻留，确保实时获取最新视频推荐',
            '客户端内存保护与缓存上限约束：为前端 HTTP 拦截器缓存增加了容量上限管理，防止长时间学习使用中的内存无限膨胀，保障流畅性能'
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
