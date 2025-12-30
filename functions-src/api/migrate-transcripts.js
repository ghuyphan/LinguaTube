/**
 * One-time migration script: D1 → R2
 * 
 * Run with: npx wrangler pages functions tail --local
 * Or deploy and hit: POST /api/migrate-transcripts
 * 
 * This migrates all completed transcripts from D1 to R2.
 * Safe to run multiple times (uses PUT, which overwrites if exists).
 */

import { jsonResponse, handleOptions, errorResponse } from '../_shared/utils.js';

export async function onRequestOptions() {
    return handleOptions(['POST', 'OPTIONS']);
}

export async function onRequestPost(context) {
    const { env } = context;
    const db = env.VOCAB_DB;
    const r2 = env.TRANSCRIPT_STORAGE;

    if (!db) {
        return errorResponse('D1 database not configured');
    }

    if (!r2) {
        return errorResponse('R2 bucket not configured');
    }

    try {
        // Get all completed transcripts from D1
        const { results } = await db.prepare(`
            SELECT video_id, language, segments, source 
            FROM transcripts 
            WHERE status = 'complete' AND segments IS NOT NULL AND segments != '[]'
        `).all();

        console.log(`[Migration] Found ${results.length} transcripts to migrate`);

        let migrated = 0;
        let failed = 0;
        const errors = [];

        for (const row of results) {
            try {
                const segments = JSON.parse(row.segments);

                if (!segments?.length) {
                    console.log(`[Migration] Skipping empty: ${row.video_id}:${row.language}`);
                    continue;
                }

                const key = `transcripts/${row.video_id}/${row.language}.json`;
                const data = {
                    videoId: row.video_id,
                    language: row.language,
                    segments,
                    source: row.source || 'migrated',
                    timestamp: Date.now()
                };

                await r2.put(key, JSON.stringify(data), {
                    httpMetadata: { contentType: 'application/json' },
                    customMetadata: {
                        source: row.source || 'migrated',
                        segmentCount: String(segments.length),
                        timestamp: String(Date.now())
                    }
                });

                migrated++;
                console.log(`[Migration] ✓ ${row.video_id}:${row.language} (${segments.length} segments)`);

            } catch (err) {
                failed++;
                errors.push(`${row.video_id}:${row.language} - ${err.message}`);
                console.error(`[Migration] ✗ ${row.video_id}:${row.language}:`, err.message);
            }
        }

        return jsonResponse({
            success: true,
            total: results.length,
            migrated,
            failed,
            errors: errors.slice(0, 10) // Only show first 10 errors
        });

    } catch (error) {
        console.error('[Migration] Fatal error:', error);
        return errorResponse(error.message);
    }
}
