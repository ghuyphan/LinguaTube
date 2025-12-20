const https = require('https');

// Test different approaches to fetch captions
const videoId = '_aCjA73ZyF4';

// Approach 1: Try getting video info via innertube API
const innertubeData = JSON.stringify({
    context: {
        client: {
            clientName: 'WEB',
            clientVersion: '2.20231219.04.00'
        }
    },
    videoId: videoId
});

const options = {
    hostname: 'www.youtube.com',
    path: '/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(innertubeData),
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        try {
            const parsed = JSON.parse(data);
            const captions = parsed?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
            if (captions && captions.length > 0) {
                console.log('Found', captions.length, 'caption tracks via innertube:');
                captions.forEach(c => console.log('-', c.languageCode, c.name?.simpleText));

                // Try fetching the actual caption
                const captionUrl = captions[0].baseUrl + '&fmt=json3';
                console.log('\nFetching caption from:', captionUrl.substring(0, 100) + '...');

                https.get(captionUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                        'Accept': '*/*',
                        'Accept-Language': 'en-US,en;q=0.9'
                    }
                }, (captionRes) => {
                    let captionData = '';
                    captionRes.on('data', chunk => captionData += chunk);
                    captionRes.on('end', () => {
                        console.log('\nCaption response length:', captionData.length);
                        if (captionData.length > 0) {
                            console.log('First 500 chars:', captionData.substring(0, 500));
                        }
                    });
                }).on('error', e => console.log('Caption fetch error:', e.message));
            } else {
                console.log('No captions found in innertube response');
                console.log('Status reason:', parsed?.playabilityStatus?.reason);
            }
        } catch (e) {
            console.log('Parse error:', e.message);
            console.log('Response:', data.substring(0, 500));
        }
    });
});

req.on('error', e => console.log('Request error:', e.message));
req.write(innertubeData);
req.end();
