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
        const info = await ytdl.getInfo(videoUrl);

        console.log(`[Whisper] Video title: ${info.videoDetails.title}`);
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
        const audioStream = ytdl.downloadFromInfo(info, { format: audioFormat });

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

        // Create a File-like object for Groq
        const audioFile = new File([audioBuffer], 'audio.mp4', {
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
        console.error('[Whisper] Error:', error.message);

        if (error.message?.includes('Video unavailable')) {
            return res.status(400).json({ error: 'Video unavailable or private' });
        }

        if (error.message?.includes('Sign in')) {
            return res.status(400).json({ error: 'Video requires sign-in (age-restricted)' });
        }

        res.status(500).json({
            error: error.message || 'Transcription failed'
        });
    }
});

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
