const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * POST /api/whisper
 * Transcribe YouTube video using Gladia API
 * Gladia accepts YouTube URLs directly - no audio extraction needed!
 */
app.post('/api/whisper', async (req, res) => {
    const { videoId } = req.body;
    const gladiaKey = process.env.GLADIA_API_KEY;

    if (!videoId) {
        return res.status(400).json({ error: 'videoId is required' });
    }

    if (!gladiaKey) {
        return res.status(500).json({
            error: 'GLADIA_API_KEY not set. Get your free key at gladia.io'
        });
    }

    const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
    console.log(`[Gladia] Starting transcription for: ${youtubeUrl}`);

    try {
        // Step 1: Submit transcription request to Gladia
        const submitResponse = await fetch('https://api.gladia.io/v2/pre-recorded', {
            method: 'POST',
            headers: {
                'x-gladia-key': gladiaKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                audio_url: youtubeUrl
            })
        });

        if (!submitResponse.ok) {
            const errorData = await submitResponse.json().catch(() => ({}));
            console.log('[Gladia] Full error:', JSON.stringify(errorData, null, 2));
            throw new Error(`Gladia submit failed: ${submitResponse.status} - ${JSON.stringify(errorData)}`);
        }

        const submitData = await submitResponse.json();
        console.log('[Gladia] Transcription submitted:', submitData.id || 'pending');

        // Step 2: Poll for results (Gladia is async)
        const resultUrl = submitData.result_url;
        if (!resultUrl) {
            throw new Error('No result_url returned from Gladia');
        }

        // Poll for completion (max 5 minutes)
        const maxAttempts = 60;
        const pollInterval = 5000; // 5 seconds

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            await new Promise(resolve => setTimeout(resolve, pollInterval));

            const resultResponse = await fetch(resultUrl, {
                headers: { 'x-gladia-key': gladiaKey }
            });

            if (!resultResponse.ok) {
                console.log(`[Gladia] Poll attempt ${attempt + 1} failed: ${resultResponse.status}`);
                continue;
            }

            const resultData = await resultResponse.json();

            if (resultData.status === 'done') {
                console.log(`[Gladia] Transcription complete!`);

                // Convert Gladia format to our expected format
                const utterances = resultData.result?.transcription?.utterances || [];
                const segments = utterances.map((utt, index) => ({
                    id: index,
                    text: utt.text?.trim() || '',
                    start: utt.start || 0,
                    duration: (utt.end || 0) - (utt.start || 0)
                }));

                return res.json({
                    success: true,
                    language: resultData.result?.transcription?.languages?.[0] || 'unknown',
                    duration: resultData.result?.metadata?.audio_duration || 0,
                    segments
                });
            }

            if (resultData.status === 'error') {
                throw new Error(`Gladia transcription error: ${resultData.error_message || 'Unknown'}`);
            }

            console.log(`[Gladia] Status: ${resultData.status} (attempt ${attempt + 1}/${maxAttempts})`);
        }

        throw new Error('Transcription timed out after 5 minutes');

    } catch (error) {
        console.error('[Gladia] Error:', error.message);
        res.status(500).json({
            error: error.message || 'Transcription failed'
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        hasGladiaKey: !!process.env.GLADIA_API_KEY
    });
});

app.listen(PORT, () => {
    console.log(`[Server] Gladia transcription server running on port ${PORT}`);
    if (!process.env.GLADIA_API_KEY) {
        console.warn('[Server] WARNING: GLADIA_API_KEY not set!');
        console.warn('[Server] Get your free key at: https://gladia.io');
    }
});
