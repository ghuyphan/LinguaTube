/**
 * Vocabulary Sync API (Cloudflare Function)
 * Uses D1 database for persistent storage with batch operations
 */

import { jsonResponse, handleOptions, errorResponse } from '../_shared/utils.js';

// Handle CORS preflight
export async function onRequestOptions() {
    return handleOptions(['GET', 'POST', 'DELETE', 'OPTIONS']);
}

export async function onRequestGet(context) {
    const { request, env } = context;
    const DB = env.VOCAB_DB;

    if (!DB) {
        return errorResponse('Database not configured');
    }

    // Get user ID from query params
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
        return jsonResponse({ error: 'userId required' }, 400);
    }

    try {
        const { results } = await DB.prepare(
            'SELECT * FROM vocabulary WHERE user_id = ? ORDER BY updated_at DESC'
        ).bind(userId).all();

        return jsonResponse({
            success: true,
            items: results,
            count: results.length
        });
    } catch (error) {
        console.error('[Sync] GET Error:', error);
        return errorResponse(error.message);
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const DB = env.VOCAB_DB;

    if (!DB) {
        return errorResponse('Database not configured');
    }

    try {
        const { userId, items } = await request.json();

        if (!userId || !items || !Array.isArray(items)) {
            return jsonResponse({ error: 'userId and items[] required' }, 400);
        }

        if (items.length === 0) {
            return jsonResponse({ success: true, synced: 0 });
        }

        const now = Date.now();

        // Use D1 batch operations for bulk inserts/updates
        const statements = items.map(item =>
            DB.prepare(`
                INSERT INTO vocabulary (id, user_id, word, reading, pinyin, romanization, meaning, language, level, examples, added_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(user_id, word, language) DO UPDATE SET
                    reading = excluded.reading,
                    pinyin = excluded.pinyin,
                    romanization = excluded.romanization,
                    meaning = excluded.meaning,
                    level = excluded.level,
                    examples = excluded.examples,
                    updated_at = excluded.updated_at
            `).bind(
                item.id || `${userId}-${item.word}-${item.language}`,
                userId,
                item.word,
                item.reading || null,
                item.pinyin || null,
                item.romanization || null,
                item.meaning,
                item.language,
                item.level || 'new',
                JSON.stringify(item.examples || []),
                item.addedAt || now,
                now
            )
        );

        // Execute all statements in a single batch
        await DB.batch(statements);

        return jsonResponse({
            success: true,
            synced: items.length
        });
    } catch (error) {
        console.error('[Sync] POST Error:', error);
        return errorResponse(error.message);
    }
}

export async function onRequestDelete(context) {
    const { request, env } = context;
    const DB = env.VOCAB_DB;

    if (!DB) {
        return errorResponse('Database not configured');
    }

    try {
        const { userId, word, language } = await request.json();

        if (!userId || !word || !language) {
            return jsonResponse({ error: 'userId, word, and language required' }, 400);
        }

        await DB.prepare(
            'DELETE FROM vocabulary WHERE user_id = ? AND word = ? AND language = ?'
        ).bind(userId, word, language).run();

        return jsonResponse({ success: true });
    } catch (error) {
        console.error('[Sync] DELETE Error:', error);
        return errorResponse(error.message);
    }
}
