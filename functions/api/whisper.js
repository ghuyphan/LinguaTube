
// Cloudflare Pages Function handler
// Uses Gladia API - accepts YouTube URLs directly
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

        const gladiaKey = env.GLADIA_API_KEY;
        if (!gladiaKey) {
            return new Response(JSON.stringify({ error: 'GLADIA_API_KEY not set' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
        console.log(`[Gladia CF] Starting transcription for: ${youtubeUrl}`);

        // Step 1: Submit transcription request
        const submitResponse = await fetch('https://api.gladia.io/v2/pre-recorded', {
            method: 'POST',
            headers: {
                'x-gladia-key': gladiaKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                audio_url: youtubeUrl,
                output_format: 'json',
            })
        });

        if (!submitResponse.ok) {
            const errorData = await submitResponse.json().catch(() => ({}));
            throw new Error(`Gladia submit failed: ${submitResponse.status} - ${errorData.message || 'Unknown'}`);
        }

        const submitData = await submitResponse.json();
        const resultUrl = submitData.result_url;

        if (!resultUrl) {
            throw new Error('No result_url from Gladia');
        }

        // Step 2: Poll for results (max 5 min, but CF has 30s limit so we try quickly)
        const maxAttempts = 60;
        const pollInterval = 3000;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            await new Promise(resolve => setTimeout(resolve, pollInterval));

            const resultResponse = await fetch(resultUrl, {
                headers: { 'x-gladia-key': gladiaKey }
            });

            if (!resultResponse.ok) continue;

            const resultData = await resultResponse.json();

            if (resultData.status === 'done') {
                const utterances = resultData.result?.transcription?.utterances || [];
                const segments = utterances.map((utt, index) => ({
                    id: index,
                    text: utt.text?.trim() || '',
                    start: utt.start || 0,
                    duration: (utt.end || 0) - (utt.start || 0)
                }));

                return new Response(JSON.stringify({
                    success: true,
                    language: resultData.result?.transcription?.languages?.[0] || 'unknown',
                    duration: resultData.result?.metadata?.audio_duration || 0,
                    segments
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            if (resultData.status === 'error') {
                throw new Error(`Gladia error: ${resultData.error_message}`);
            }
        }

        throw new Error('Transcription timed out');

    } catch (error) {
        console.error('[Gladia CF] Error:', error.message);
        return new Response(JSON.stringify({
            error: `Transcription failed: ${error.message}`
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
