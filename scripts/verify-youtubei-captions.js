
const { Innertube } = require('youtubei.js');

(async () => {
    try {
        const yt = await Innertube.create();
        const videoId = 'jNQXAC9IVRw'; // Me at the zoo - has captions? Maybe. Let's use a popular one.
        // Or 'dQw4w9WgXcQ' (Rick Roll) usually has captions.
        // Let's use '5qap5aO4i9A' (Lofi Girl) - wait, maybe a TED talk or something standard.
        // Let's use 'jNQXAC9IVRw' (Me at the zoo)
        const info = await yt.getInfo('jNQXAC9IVRw');

        console.log('Captions object keys:', Object.keys(info.captions || {}));

        if (info.captions?.caption_tracks) {
            console.log('Caption tracks found:', info.captions.caption_tracks.length);
            const firstTrack = info.captions.caption_tracks[0];
            console.log('First track keys:', Object.keys(firstTrack));
            console.log('First track baseUrl:', firstTrack.base_url);
            // Note: In some versions it might be baseUrl or something else.
            // Let's dump the first track to be sure.
            console.log('First track dump:', JSON.stringify(firstTrack, null, 2));
        } else {
            console.log('No caption_tracks found directly on info.captions');
            // Check inside player_captions_tracklist_renderer if it exists
            // youtubei.js usually flattens this but let's check.
        }

    } catch (e) {
        console.error('Error:', e);
    }
})();
