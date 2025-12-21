// Cloudflare Pages Function for vocabulary sync
// Uses D1 database for persistent storage

export async function onRequestGet(context) {
    const { request, env } = context;
    const DB = env.VOCAB_DB;

    if (!DB) {
        return new Response(JSON.stringify({ error: 'Database not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Get user ID from query params
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
        return new Response(JSON.stringify({ error: 'userId required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { results } = await DB.prepare(
            'SELECT * FROM vocabulary WHERE user_id = ? ORDER BY updated_at DESC'
        ).bind(userId).all();

        return new Response(JSON.stringify({
            success: true,
            items: results,
            count: results.length
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function onRequestPost(context) {
    const { request, env } = context;
    const DB = env.VOCAB_DB;

    if (!DB) {
        return new Response(JSON.stringify({ error: 'Database not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { userId, items } = await request.json();

        if (!userId || !items || !Array.isArray(items)) {
            return new Response(JSON.stringify({ error: 'userId and items[] required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const now = Date.now();
        let synced = 0;

        for (const item of items) {
            await DB.prepare(`
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
            ).run();
            synced++;
        }

        return new Response(JSON.stringify({
            success: true,
            synced
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function onRequestDelete(context) {
    const { request, env } = context;
    const DB = env.VOCAB_DB;

    if (!DB) {
        return new Response(JSON.stringify({ error: 'Database not configured' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { userId, word, language } = await request.json();

        if (!userId || !word || !language) {
            return new Response(JSON.stringify({ error: 'userId, word, and language required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        await DB.prepare(
            'DELETE FROM vocabulary WHERE user_id = ? AND word = ? AND language = ?'
        ).bind(userId, word, language).run();

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
