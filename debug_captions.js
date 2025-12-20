const http = require('http');

http.get('http://localhost:4200/youtube/watch?v=_aCjA73ZyF4', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const startMarker = 'ytInitialPlayerResponse = ';
        const startIndex = data.indexOf(startMarker);

        if (startIndex !== -1) {
            let braceCount = 0;
            let jsonStart = startIndex + startMarker.length;
            let jsonEnd = jsonStart;
            let inString = false;
            let escape = false;

            for (let i = jsonStart; i < data.length && i < jsonStart + 500000; i++) {
                const char = data[i];
                if (escape) { escape = false; continue; }
                if (char === '\\' && inString) { escape = true; continue; }
                if (char === '"' && !escape) { inString = !inString; continue; }
                if (!inString) {
                    if (char === '{') braceCount++;
                    else if (char === '}') {
                        braceCount--;
                        if (braceCount === 0) { jsonEnd = i + 1; break; }
                    }
                }
            }

            if (jsonEnd > jsonStart) {
                const jsonStr = data.substring(jsonStart, jsonEnd);
                const parsed = JSON.parse(jsonStr);
                const captions = parsed?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

                if (captions && captions.length > 0) {
                    const jaCaption = captions.find(c => c.languageCode === 'ja') || captions[0];
                    const fullUrl = jaCaption.baseUrl;
                    console.log('Full caption URL:');
                    console.log(fullUrl);

                    // Test fetching directly
                    const https = require('https');
                    https.get(fullUrl, (captionRes) => {
                        let captionData = '';
                        captionRes.on('data', chunk => captionData += chunk);
                        captionRes.on('end', () => {
                            console.log('\nDirect fetch length:', captionData.length);
                            console.log('First 500 chars:', captionData.substring(0, 500));
                        });
                    }).on('error', e => console.log('Direct fetch error:', e.message));
                }
            }
        }
    });
}).on('error', (e) => {
    console.log('Request error:', e.message);
});
