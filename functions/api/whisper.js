
// Cloudflare Pages Function handler
export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const body = await request.json();
        const { videoId } = body;

        if (!videoId) {
            return new Response(JSON.stringify({ error: 'videoId is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (!env.GROQ_API_KEY) {
            return new Response(JSON.stringify({ error: 'GROQ_API_KEY not set in environment variables' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log(`[Whisper CF] Starting transcription for video: ${videoId} `);

        // Use Cobalt API to get audio
        const cobaltData = await tryCobaltFallback(videoId);

        if (!cobaltData) {
            return new Response(JSON.stringify({ error: 'Could not fetch video audio (Cobalt API failed)' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const response = await fetch(cobaltData.url);
        if (!response.ok) throw new Error(`Cobalt fetch failed status: ${response.status} `);

        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = Buffer.from(arrayBuffer); // Needs nodejs_compat in wrangler.toml

        if (audioBuffer.length > 25 * 1024 * 1024) {
            return new Response(JSON.stringify({ error: 'Audio file too large.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const file = new File([audioBuffer], 'audio.mp3', { type: 'audio/mpeg' });

        // Call Groq Whisper API directly using fetch to avoid node:sqlite dependency in groq-sdk
        const formData = new FormData();
        formData.append('file', file);
        formData.append('model', 'whisper-large-v3-turbo');
        formData.append('response_format', 'verbose_json');
        formData.append('timestamp_granularities[]', 'segment');

        const groqResponse = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${env.GROQ_API_KEY} `,
            },
            body: formData
        });

        if (!groqResponse.ok) {
            const errorText = await groqResponse.text();
            throw new Error(`Groq API failed: ${groqResponse.status} ${errorText} `);
        }

        const transcription = await groqResponse.json();

        const segments = (transcription.segments || []).map((seg, index) => ({
            id: index,
            text: seg.text.trim(),
            start: seg.start,
            duration: seg.end - seg.start
        }));

        return new Response(JSON.stringify({
            success: true,
            language: transcription.language,
            duration: transcription.duration,
            segments
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('[Whisper CF] Error:', error.message);

        return new Response(JSON.stringify({
            error: `Transcription failed.Details: ${error.message} `
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}


async function tryCobaltFallback(videoId) {
    const instances = [
        'https://co.wuk.sh/api/json',
        'https://api.cobalt.tools/api/json',
        'https://cobalt.api.kwiatekmiki.pl/api/json'
    ];

    for (const instance of instances) {
        try {
            const response = await fetch(instance, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    url: `https://www.youtube.com/watch?v=${videoId}`,
                    isAudioOnly: true,
                    aFormat: 'mp3'
                })
            });

            const data = await response.json();
            if (data.url) {
                return data;
            }
        } catch (e) {
            console.log(`[Whisper CF] Instance ${instance} failed: ${e.message}`);
        }
    }
    return null;
}

