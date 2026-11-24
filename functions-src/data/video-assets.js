const VIDEO_ASSET_ROOTS = ['transcripts', 'translations'];

export function videoAssetPrefix(root, videoId, generation) {
    const legacy = `${root}/${videoId}/`;
    return generation === 0 ? legacy : `${legacy}g${generation}/`;
}

/** Capture a generation before work begins. Late writes can only reach retired keys. */
export function scopedVideoAssets(bucket, videoId, generation) {
    if (!bucket || generation === 0) return bucket;
    const scopedKey = key => {
        const [root, id, basename, extra] = key.split('/');
        if (!VIDEO_ASSET_ROOTS.includes(root) || id !== videoId || !basename || extra !== undefined) {
            throw new Error('Invalid video asset key');
        }
        return videoAssetPrefix(root, videoId, generation) + basename;
    };
    return {
        get: (key, ...options) => bucket.get(scopedKey(key), ...options),
        head: (key, ...options) => bucket.head(scopedKey(key), ...options),
        put: (key, ...options) => bucket.put(scopedKey(key), ...options)
    };
}

export async function captureVideoAssets(env, videoId) {
    if (env.VIDEO_ELIGIBILITY !== 'true') return { generation: 0, blocked: false, bucket: env.TRANSCRIPT_STORAGE };
    const row = await env.VOCAB_DB.prepare('SELECT asset_generation, embed_blocked FROM video_languages WHERE video_id=?').bind(videoId).first();
    const generation = row?.asset_generation ?? 0;
    return {
        generation,
        blocked: row?.embed_blocked === 1,
        bucket: scopedVideoAssets(env.TRANSCRIPT_STORAGE, videoId, generation)
    };
}

export async function deleteRetiredVideoAssets(bucket, videoId, generation) {
    if (!bucket) return false;
    let complete = true;
    for (const root of VIDEO_ASSET_ROOTS) {
        // Delete only direct objects. The legacy prefix also contains current generation folders.
        const page = await bucket.list({ prefix: videoAssetPrefix(root, videoId, generation), delimiter: '/', limit: 100 });
        if (page.objects.length) await bucket.delete(page.objects.map(object => object.key));
        complete &&= !page.truncated;
    }
    return complete;
}

export async function reconcileRetiredVideoAssets(env) {
    if (env.VIDEO_ELIGIBILITY !== 'true') return { candidates: 0, purged: 0 };
    const db = env.VOCAB_DB;
    const { results } = await db.prepare(`SELECT r.video_id, r.generation FROM video_asset_retirements r
        JOIN video_languages v ON v.video_id=r.video_id
        WHERE r.purged_at IS NULL AND r.confirmed_at IS NOT NULL
          AND v.embed_blocked=1 AND v.asset_generation>r.generation
        ORDER BY r.blocked_at, r.video_id LIMIT 5`).all();
    if (env.VIDEO_ASSET_PURGE !== 'enabled') return { candidates: results.length, purged: 0 };

    let purged = 0;
    for (const { video_id: videoId, generation } of results) {
        if (!await deleteRetiredVideoAssets(env.TRANSCRIPT_STORAGE, videoId, generation)) continue;
        const result = await db.batch([
            db.prepare(`UPDATE video_languages SET sub_languages='[]', ai_languages='[]', available_languages='[]', levels='{}'
                WHERE video_id=? AND embed_blocked=1 AND asset_generation=?`).bind(videoId, generation + 1),
            db.prepare(`DELETE FROM video_grading_jobs WHERE video_id=? AND EXISTS (
                SELECT 1 FROM video_languages WHERE video_id=? AND embed_blocked=1 AND asset_generation=?)`)
                .bind(videoId, videoId, generation + 1),
            db.prepare(`UPDATE video_asset_retirements SET purged_at=? WHERE video_id=? AND generation=? AND purged_at IS NULL`)
                .bind(Date.now(), videoId, generation)
        ]);
        purged += result[2].meta?.changes ?? 0;
    }
    return { candidates: results.length, purged };
}
