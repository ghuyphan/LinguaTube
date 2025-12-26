const { getSubtitles } = require('youtube-caption-extractor');

async function test() {
    const videoId = 'jNQXAC9IVRw'; // Me at the zoo
    const langs = ['ja', 'en'];

    console.log(`Testing video: ${videoId}`);

    for (const lang of langs) {
        try {
            console.log(`Fetching ${lang}...`);
            const subs = await getSubtitles({ videoID: videoId, lang });
            if (subs && subs.length) {
                console.log(`Success in ${lang}: Found ${subs.length} cues`);
                console.log('Sample:', subs[0]);
                return;
            } else {
                console.log(`Failed ${lang}: No subtitles found or empty`);
            }
        } catch (e) {
            console.error(`Error ${lang}:`, e.message);
        }
    }
}

test();
