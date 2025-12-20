const express = require('express');
require('dotenv').config();
const cors = require('cors');
const Groq = require('groq-sdk');
const ytdl = require('@distube/ytdl-core');
const { PassThrough } = require('stream');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Groq client
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Configure ytdl agent with specific client options to avoid 403
// Using IOS client often bypasses the blocks that WEB client hits
const agent = ytdl.createAgent(undefined, {
    os: 'ios',
    osVersion: '17.1.1',
    clientName: 'IOS'
});


/**
 * POST /api/whisper
 * Transcribe YouTube video audio using Groq Whisper
 */
app.post('/api/whisper', async (req, res) => {
    const { videoId } = req.body;

    if (!videoId) {
        return res.status(400).json({ error: 'videoId is required' });
    }

    if (!process.env.GROQ_API_KEY) {
        return res.status(500).json({
            error: 'GROQ_API_KEY not set. Get your free key at console.groq.com'
        });
    }

    console.log(`[Whisper] Starting transcription for video: ${videoId}`);

    try {
        // Get video info first to check availability
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const info = await ytdl.getInfo(videoUrl, { agent });

        console.log(`[Whisper] Video title: ${JSON.stringify(info.videoDetails.title)}`);
        console.log(`[Whisper] Duration: ${info.videoDetails.lengthSeconds}s`);

        // Check video length - Groq has a 25MB limit
        const durationSeconds = parseInt(info.videoDetails.lengthSeconds);
        if (durationSeconds > 1800) { // 30 minutes
            return res.status(400).json({
                error: 'Video too long. Please use videos under 30 minutes.'
            });
        }

        // Get audio-only stream
        const audioFormat = ytdl.chooseFormat(info.formats, {
            quality: 'lowestaudio',
            filter: 'audioonly'
        });

        if (!audioFormat) {
            return res.status(400).json({ error: 'Could not find audio format' });
        }

        console.log(`[Whisper] Audio format: ${audioFormat.mimeType}, bitrate: ${audioFormat.audioBitrate}`);

        // Download audio to buffer
        const audioChunks = [];
        const audioStream = ytdl.downloadFromInfo(info, { format: audioFormat, agent });

        await new Promise((resolve, reject) => {
            audioStream.on('data', chunk => audioChunks.push(chunk));
            audioStream.on('end', resolve);
            audioStream.on('error', reject);
        });

        const audioBuffer = Buffer.concat(audioChunks);
        console.log(`[Whisper] Audio downloaded: ${(audioBuffer.length / 1024 / 1024).toFixed(2)} MB`);

        // Check file size limit (Groq limit is 25MB)
        if (audioBuffer.length > 25 * 1024 * 1024) {
            return res.status(400).json({
                error: 'Audio file too large. Please use a shorter video.'
            });
        }

        // Create a File-like object for Groq using helper
        const audioFile = await toFile(audioBuffer, 'audio.mp4', {
            type: audioFormat.mimeType || 'audio/mp4'
        });

        // Call Groq Whisper API
        console.log('[Whisper] Sending to Groq Whisper API...');

        const transcription = await groq.audio.transcriptions.create({
            file: audioFile,
            model: 'whisper-large-v3-turbo',
            response_format: 'verbose_json',
            timestamp_granularities: ['segment']
        });

        console.log(`[Whisper] Transcription complete. Segments: ${transcription.segments?.length || 0}`);

        // Convert to our expected format
        const segments = (transcription.segments || []).map((seg, index) => ({
            id: index,
            text: seg.text.trim(),
            start: seg.start,
            duration: seg.end - seg.start
        }));

        res.json({
            success: true,
            language: transcription.language,
            duration: transcription.duration,
            segments
        });

    } catch (error) {
        console.error('[Whisper] ytdl Error:', error.message);

        // Try Cobalt fallback if ytdl fails (403, 429, or parsing errors)
        console.log('[Whisper] Attempting Cobalt API fallback...');
        try {
            const cobaltData = await tryCobaltFallback(videoId);
            if (cobaltData) {
                console.log('[Whisper] Cobalt success, downloading audio...');
                // Download from Cobalt URL
                const response = await fetch(cobaltData.url);
                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = Buffer.from(arrayBuffer);

                console.log(`[Whisper] Audio downloaded via Cobalt: ${(audioBuffer.length / 1024 / 1024).toFixed(2)} MB`);

                // Check file size 
                if (audioBuffer.length > 25 * 1024 * 1024) {
                    return res.status(400).json({ error: 'Audio file too large.' });
                }

                const file = await toFile(audioBuffer, 'audio.mp3', { type: 'audio/mpeg' }); // Cobalt usually returns mp3/ogg

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

                return res.json({
                    success: true,
                    language: transcription.language,
                    duration: transcription.duration,
                    segments
                });
            }
        } catch (cobaltError) {
            console.error('[Whisper] Cobalt fallback failed:', cobaltError.message);
        }

        // Original error handling if fallback also fails
        if (error.message?.includes('Video unavailable')) {
            return res.status(400).json({ error: 'Video unavailable or private' });
        }
        res.status(500).json({
            error: error.message || 'Transcription failed'
        });
    }
});

/**
 * Helper to try fetching audio URL from Cobalt API
 */
async function tryCobaltFallback(videoId) {
    const instances = [
        'https://co.wuk.sh/api/json',
        'https://api.cobalt.tools/api/json', // Official, sometimes rate limited
        'https://cobalt.api.kwiatekmiki.pl/api/json'
    ];

    for (const instance of instances) {
        try {
            console.log(`[Whisper] Trying Cobalt instance: ${instance}`);
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
            console.log(`[Whisper] Instance ${instance} failed: ${e.message}`);
        }
    }
    return null;
}

// Helper to convert Buffer to File-like object for Groq SDK
async function toFile(buffer, filename, options) {
    try {
        const { File } = require('node:buffer');
        if (File) {
            return new File([buffer], filename, options);
        }
    } catch (e) {
        console.warn('Node File API not found, falling back');
    }

    return {
        name: filename,
        type: options.type,
        arrayBuffer: async () => buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength),
        [Symbol.toStringTag]: 'File'
    };
}

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        hasApiKey: !!process.env.GROQ_API_KEY
    });
});

app.listen(PORT, () => {
    console.log(`[Server] Whisper transcription server running on port ${PORT}`);
    if (!process.env.GROQ_API_KEY) {
        console.warn('[Server] WARNING: GROQ_API_KEY not set!');
        console.warn('[Server] Get your free key at: https://console.groq.com');
    }
});
