/**
 * Korean Dictionary API (Cloudflare Function)
 * Scrapes Naver Korean-English dictionary for word definitions
 */

export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    const word = url.searchParams.get('q');

    if (!word) {
        return new Response(JSON.stringify({ error: 'Missing query parameter "q"' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Use Naver Korean-English dictionary
    const targetUrl = `https://en.dict.naver.com/api3/enko/search?query=${encodeURIComponent(word)}&m=pc&range=all`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Referer': 'https://en.dict.naver.com/'
            }
        });

        if (!response.ok) {
            throw new Error(`Naver API returned ${response.status}`);
        }

        const data = await response.json();

        // Parse searchResultMap -> searchResultListMap -> WORD -> items
        const wordResults = data?.searchResultMap?.searchResultListMap?.WORD?.items || [];

        const entries = wordResults.slice(0, 5).map(item => {
            // Extract word (handle HTML entities)
            const word = (item.expEntry || '').replace(/<[^>]+>/g, '');

            // Extract romanization/pronunciation
            const romanization = (item.expEntrySuperscript || item.phoneticSigns?.[0]?.sign || '').replace(/<[^>]+>/g, '');

            // Extract definitions from meansCollector
            const definitions = [];
            if (item.meansCollector) {
                item.meansCollector.forEach(collector => {
                    if (collector.means) {
                        collector.means.forEach(mean => {
                            const def = (mean.value || '').replace(/<[^>]+>/g, '').trim();
                            if (def) definitions.push(def);
                        });
                    }
                });
            }

            // Extract part of speech
            const partOfSpeech = (item.sourceDictnameKo || '').replace(/<[^>]+>/g, '');

            return {
                word,
                romanization,
                definitions,
                partOfSpeech
            };
        }).filter(e => e.word && e.definitions.length > 0);

        return new Response(JSON.stringify(entries), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=86400' // Cache for 1 day
            }
        });

    } catch (error) {
        console.error('[Korean Dict] Error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
