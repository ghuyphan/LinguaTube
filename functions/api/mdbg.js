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

    const targetUrl = `https://www.mdbg.net/chinese/dictionary?page=worddict&wdqt=${encodeURIComponent(word)}&wdrst=0&wdqtm=0&wdqcham=1`;

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        // We will use HTMLRewriter to extract data
        const entries = [];
        let currentEntry = null;
        let captureText = null; // 'word', 'pinyin', 'defs', 'hsk'

        // HTMLRewriter handlers
        const rewriter = new HTMLRewriter()
            .on('tr.row', {
                element(el) {
                    currentEntry = { word: '', pinyin: '', definitions: [], hsk: null };
                    entries.push(currentEntry);
                }
            })
            .on('tr.row .hanzi .mpt4', {
                text(text) {
                    if (currentEntry && !currentEntry.word) {
                        // Just take the first one or accumulate? MDBG has one main word per row usually.
                        // But sometimes it splits characters. captureText logic is safer.
                        if (text.text.trim()) currentEntry.word += text.text;
                    }
                }
            })
            .on('tr.row .pinyin .mpt4', {
                text(text) {
                    if (currentEntry) {
                        // Pinyin chunks
                        if (text.text.trim()) currentEntry.pinyin += text.text;
                    }
                }
            })
            .on('tr.row .defs', {
                element() { captureText = 'defs'; },
                text(text) {
                    if (currentEntry && captureText === 'defs') {
                        // We need to handle the output text manually, splitting by '/'
                        // But HTMLRewriter streams text chunks. We should accumulate raw text then split.
                        if (!currentEntry._rawDefs) currentEntry._rawDefs = '';
                        currentEntry._rawDefs += text.text;
                    }
                }
            })
            .on('tr.row .hsk', {
                text(text) {
                    if (currentEntry && text.text.includes('HSK')) {
                        const match = text.text.match(/HSK\s*(\d+)/);
                        if (match) currentEntry.hsk = parseInt(match[1]);
                    }
                }
            });

        // Process the response
        await rewriter.transform(response).arrayBuffer(); // Consume the stream to trigger handlers

        // Post-process entries
        const cleanEntries = entries.map(e => {
            // Clean definitions
            const defs = e._rawDefs
                ? e._rawDefs.split('/').map(d => d.trim()).filter(d => d)
                : [];

            return {
                word: e.word.trim(),
                pinyin: e.pinyin.trim(),
                definitions: defs,
                hsk: e.hsk
            };
        }).filter(e => e.word); // Filter empty

        return new Response(JSON.stringify(cleanEntries), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
