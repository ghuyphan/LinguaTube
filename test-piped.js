
// Native fetch is available in Node 18+

const VIDEO_ID = 'jNQXAC9IVRw';
const INSTANCES_URL = 'https://piped-instances.kavin.rocks/';

async function testInstance(url) {
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const res = await fetch(`${url}/streams/${VIDEO_ID}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (res.ok) {
            const data = await res.json();
            const subs = data.subtitles || [];
            console.log(`[PASS] ${url} (Subs: ${subs.length})`);
            return true;
        } else {
            console.log(`[FAIL] ${url} (Status: ${res.status})`);
            return false;
        }
    } catch (e) {
        console.log(`[FAIL] ${url} (Error: ${e.message})`);
        return false;
    }
}

async function main() {
    console.log('Fetching instance list...');
    try {
        const res = await fetch(INSTANCES_URL);
        const instances = await res.json();

        console.log(`Found ${instances.length} instances. Testing...`);

        const candidates = instances
            .filter(i => i.uptime_30d > 80 && i.api_url)
            .sort((a, b) => b.uptime_30d - a.uptime_30d);

        // Add some known manual ones if they aren't in the list
        const manual = [
            'https://pipedapi.kavin.rocks',
            'https://api.piped.private.coffee',
            'https://pipedapi.adminforge.de',
            'https://pipedapi.darkness.services',
            'https://api.piped.yt',
            'https://pipedapi.drgns.space',
            'https://pipedapi.smnz.de',
            'https://api.piped.projectsegfau.lt',
            'https://pipedapi.tokhmi.xyz',
            'https://pipedapi.moomoo.me',
            'https://api.piped.codespace.cz',
            'https://pipedapi.ducks.party',
            'https://pipedapi.r4fo.com'
        ];

        const allUrls = new Set([...candidates.map(c => c.api_url), ...manual]);

        for (const url of allUrls) {
            await testInstance(url);
        }
    } catch (e) {
        console.error('Failed to run test:', e);
    }
}

main();
