
import Groq from 'groq-sdk';
import ytdl from '@distube/ytdl-core';

// Cloudflare Pages Function handler
export async function onRequestPost(context) {
    const { request, env } = context;

    // Initialize Groq client
    // env.GROQ_API_KEY is available in Cloudflare Pages context
    const groq = new Groq({
        apiKey: env.GROQ_API_KEY
    });

    // Configure ytdl agent
    const agent = ytdl.createAgent(undefined, {
        os: 'android',
        osVersion: '12',
        clientName: 'ANDROID'
    });

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

        console.log(`[Whisper CF] Starting transcription for video: ${videoId}`);

        // Get video info
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const info = await ytdl.getInfo(videoUrl, { agent });

        // Check video length
        const durationSeconds = parseInt(info.videoDetails.lengthSeconds);
        if (durationSeconds > 1800) { // 30 minutes
            return new Response(JSON.stringify({ error: 'Video too long. Please use videos under 30 minutes.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Get audio-only stream
        const audioFormat = ytdl.chooseFormat(info.formats, {
            quality: 'lowestaudio',
            filter: 'audioonly'
        });

        if (!audioFormat) {
            return new Response(JSON.stringify({ error: 'Could not find audio format' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Download audio
        // In Cloudflare Workers/Pages, we need to handle streams carefully. 
        // ytdl.downloadFromInfo returns a Node stream, which we need to consume.
        const audioStream = ytdl.downloadFromInfo(info, { format: audioFormat, agent });

        const audioChunks = [];
        await new Promise((resolve, reject) => {
            audioStream.on('data', chunk => audioChunks.push(chunk));
            audioStream.on('end', resolve);
            audioStream.on('error', reject);
        });

        const audioBuffer = Buffer.concat(audioChunks); // Needs nodejs_compat

        if (audioBuffer.length > 25 * 1024 * 1024) {
            return new Response(JSON.stringify({ error: 'Audio file too large.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Create File object for Groq
        // Using the same Blob/Buffer approach as Node since we have nodejs_compat
        const file = new File([audioBuffer], 'audio.mp4', { type: 'audio/mp4' });

        const transcription = await groq.audio.transcriptions.create({
            file: file,
            model: 'whisper-large-v3-turbo',
            response_format: 'verbose_json',
            timestamp_granularities: ['segment']
        });

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
        const errors = [`Primary YTDL failed: ${error.message}`];

        // Cobalt Fallback
        try {
            const cobaltData = await tryCobaltFallback(videoId);
            if (cobaltData) {
                const response = await fetch(cobaltData.url);
                if (!response.ok) throw new Error(`Cobalt fetch failed status: ${response.status}`);

                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = Buffer.from(arrayBuffer); // Needs nodejs_compat

                if (audioBuffer.length > 25 * 1024 * 1024) {
                    return new Response(JSON.stringify({ error: 'Audio file too large.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
                }

                const file = new File([audioBuffer], 'audio.mp3', { type: 'audio/mpeg' });

                const transcription = await groq.audio.transcriptions.create({
                    file: file,
                    model: 'whisper-large-v3-turbo',
                    response_format: 'verbose_json',
                    timestamp_granularities: ['segment']
                });

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
            }
        } catch (cobaltError) {
            console.error('[Whisper CF] Cobalt fallback failed:', cobaltError.message);
            errors.push(`Cobalt fallback failed: ${cobaltError.message}`);
        }

        return new Response(JSON.stringify({
            error: `Transcription failed. Details: ${errors.join(' | ')}`
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
