/**
 * Unified Dictionary Parsers (Cloudflare Function)
 * Parser functions for various dictionary API sources
 * All parsers return a standardized format: { word, reading, definitions, partOfSpeech, ... }
 */

/**
 * Standardized dictionary entry format
 * @typedef {Object} DictEntry
 * @property {string} word - The word being defined
 * @property {string} [reading] - Reading/pronunciation (kana, pinyin, romanization)
 * @property {string[]} definitions - Array of definitions
 * @property {string} [partOfSpeech] - Part of speech
 * @property {number} [level] - Proficiency level (JLPT, HSK, TOPIK)
 */

/**
 * Parse Naver Korean dictionary API response
 * Used for: ko-en, ko-vi, ko-ja, ko-zh, ko-ko
 * @param {Object} data - Raw API response
 * @returns {DictEntry[]}
 */
export function parseNaver(data) {
    const wordResults = data?.searchResultMap?.searchResultListMap?.WORD?.items || [];

    return wordResults.slice(0, 5).map(item => {
        // Extract word (handle HTML entities)
        const word = (item.expEntry || '').replace(/<[^>]+>/g, '');

        // Extract romanization/pronunciation
        const reading = (item.expEntrySuperscript || item.phoneticSigns?.[0]?.sign || '').replace(/<[^>]+>/g, '');

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

        return { word, reading, definitions, partOfSpeech };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse Jotoba Japanese dictionary API response
 * Used for: ja-en
 * @param {Object} data - Raw API response from Jotoba
 * @returns {DictEntry[]}
 */
export function parseJotoba(data) {
    if (!data.words || data.words.length === 0) {
        return [];
    }

    return data.words.slice(0, 5).map(entry => {
        const word = entry.reading?.kanji || entry.reading?.kana || '';
        const reading = entry.reading?.kana || '';

        const definitions = [];
        entry.senses?.forEach(sense => {
            if (sense.glosses) {
                definitions.push(sense.glosses.join(', '));
            }
        });

        const partOfSpeech = entry.senses?.[0]?.pos
            ?.map(p => (typeof p === 'string' ? p : p.Pretty || p.Short || ''))
            .filter(Boolean)
            .join(', ') || '';

        const level = entry.common?.jlpt ? parseInt(entry.common.jlpt) : null;

        return { word, reading, definitions, partOfSpeech, level };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse Jotoba Japanese dictionary API response for Japanese monolingual output
 * Used for: ja-ja (Japanese definitions for Japanese words)
 * Jotoba with language: 'Japanese' returns Japanese glosses
 * @param {Object} data - Raw API response from Jotoba
 * @returns {DictEntry[]}
 */
export function parseJotobaJapanese(data) {
    if (!data.words || data.words.length === 0) {
        return [];
    }

    return data.words.slice(0, 5).map(entry => {
        const word = entry.reading?.kanji || entry.reading?.kana || '';
        const reading = entry.reading?.kana || '';

        const definitions = [];
        entry.senses?.forEach(sense => {
            if (sense.glosses) {
                definitions.push(sense.glosses.join('、'));
            }
        });

        const partOfSpeech = entry.senses?.[0]?.pos
            ?.map(p => (typeof p === 'string' ? p : p.Pretty || p.Short || ''))
            .filter(Boolean)
            .join(', ') || '';

        const level = entry.common?.jlpt ? parseInt(entry.common.jlpt) : null;

        return { word, reading, definitions, partOfSpeech, level };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse Mazii Japanese-Vietnamese dictionary API response
 * Used for: ja-vi
 * API: POST https://mazii.net/api/search with { dict: 'javi', type: 'word', query: word, page: 1 }
 * Response structure: { status, found, data: [{ word, phonetic, short_mean, means: [{ mean, kind, examples }] }] }
 * @param {Object} response - Raw API response from Mazii
 * @returns {DictEntry[]}
 */
export function parseMazii(response) {
    // Mazii returns data in 'data' field, not 'results'
    const results = response.data || response.results || [];
    if (!results || results.length === 0) {
        return [];
    }

    return results.slice(0, 5).map(entry => {
        const word = entry.word || '';
        const reading = entry.phonetic || entry.reading || '';

        // Extract definitions from means array or short_mean
        const definitions = [];

        // Primary: means array with nested mean field
        if (entry.means && Array.isArray(entry.means)) {
            entry.means.forEach(m => {
                if (m.mean) {
                    // Clean up HTML and split by semicolons/newlines
                    const cleanMean = m.mean.replace(/<[^>]+>/g, '').trim();
                    if (cleanMean) definitions.push(cleanMean);
                }
            });
        }

        // Fallback: short_mean field
        if (definitions.length === 0 && entry.short_mean) {
            definitions.push(entry.short_mean);
        }

        // Legacy fallback: entry.mean (old format)
        if (definitions.length === 0 && entry.mean) {
            const means = entry.mean.split(/[;\n]/).map(m => m.trim()).filter(Boolean);
            definitions.push(...means);
        }

        // Extract part of speech from means[0].kind or entry.type
        const partOfSpeech = entry.means?.[0]?.kind || entry.type || '';
        const level = entry.level ? parseInt(String(entry.level).replace('N', '')) : null;

        return { word, reading, definitions, partOfSpeech, level };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse Free Dictionary API response (English)
 * Used for: en-en
 * @param {Array} data - Raw API response array
 * @returns {DictEntry[]}
 */
export function parseFreeDictionary(data) {
    if (!Array.isArray(data) || data.length === 0) {
        return [];
    }

    return data.slice(0, 3).map(entry => {
        const word = entry.word || '';
        const reading = entry.phonetics?.find(p => p.text)?.text || '';

        const definitions = [];
        const posList = [];

        entry.meanings?.forEach(meaning => {
            if (meaning.partOfSpeech && !posList.includes(meaning.partOfSpeech)) {
                posList.push(meaning.partOfSpeech);
            }
            meaning.definitions?.forEach(def => {
                if (def.definition) definitions.push(def.definition);
            });
        });

        return {
            word,
            reading,
            definitions: definitions.slice(0, 5),
            partOfSpeech: posList.join(', ')
        };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse MDBG Chinese dictionary HTML response using HTMLRewriter
 * Used for: zh-en
 * Note: This returns a transformer, call with response object
 * @param {Response} response - Fetch response from MDBG
 * @returns {Promise<DictEntry[]>}
 */
export async function parseMdbg(response) {
    const entries = [];
    let currentEntry = null;
    let captureText = null;

    const rewriter = new HTMLRewriter()
        .on('tr.row', {
            element() {
                currentEntry = { word: '', reading: '', definitions: [], level: null };
                entries.push(currentEntry);
            }
        })
        .on('tr.row .hanzi span', {
            text(text) {
                if (currentEntry && !currentEntry.word) {
                    if (text.text.trim()) currentEntry.word += text.text;
                }
            }
        })
        .on('tr.row .pinyin span', {
            text(text) {
                if (currentEntry) {
                    if (text.text.trim()) currentEntry.reading += text.text;
                }
            }
        })
        .on('tr.row .defs', {
            element() { captureText = 'defs'; },
            text(text) {
                if (currentEntry && captureText === 'defs') {
                    if (!currentEntry._rawDefs) currentEntry._rawDefs = '';
                    currentEntry._rawDefs += text.text;
                }
            }
        })
        .on('tr.row .hsk', {
            text(text) {
                if (currentEntry && text.text.includes('HSK')) {
                    const match = text.text.match(/HSK\s*(\d+)/);
                    if (match) currentEntry.level = parseInt(match[1]);
                }
            }
        });

    await rewriter.transform(response).arrayBuffer();

    return entries.map(e => {
        const definitions = e._rawDefs
            ? e._rawDefs.split('/').map(d => d.trim()).filter(d => d)
            : [];

        return {
            word: e.word.trim(),
            reading: e.reading.trim(),
            definitions,
            partOfSpeech: '',
            level: e.level
        };
    }).filter(e => e.word && e.definitions.length > 0);
}

/**
 * Parse Glosbe dictionary HTML response using HTMLRewriter
 * Used for: zh-vi (replaces broken Hanzii parser - Hanzii is SPA, content unavailable via HTML)
 * @param {Response} response - Fetch response from Glosbe
 * @returns {Promise<DictEntry[]>}
 */
export async function parseGlosbe(response) {
    const entries = [];
    let summaryText = '';

    const rewriter = new HTMLRewriter()
        // Get summary translations from <strong> in content-summary
        .on('#content-summary strong', {
            text(text) {
                summaryText += text.text;
            }
        })
        // Get individual translations from li[data-element="translation"] h3
        .on('li[data-element="translation"] h3.translation__item__pharse', {
            text(text) {
                const t = text.text.trim();
                if (t && !entries.some(e => e.definitions.includes(t))) {
                    entries.push({
                        word: '',
                        reading: '',
                        definitions: [t],
                        partOfSpeech: ''
                    });
                }
            }
        });

    await rewriter.transform(response).arrayBuffer();

    // If no individual entries, parse summary (fallback)
    if (entries.length === 0 && summaryText) {
        // Decode HTML entities and split by comma
        const decoded = summaryText
            .replace(/&agrave;/g, 'à')
            .replace(/&aacute;/g, 'á')
            .replace(/&egrave;/g, 'è')
            .replace(/&eacute;/g, 'é')
            .replace(/&ograve;/g, 'ò')
            .replace(/&oacute;/g, 'ó')
            .replace(/&ugrave;/g, 'ù')
            .replace(/&uacute;/g, 'ú')
            .replace(/&amp;/g, '&');
        const defs = decoded.split(',').map(d => d.trim()).filter(Boolean);
        if (defs.length > 0) {
            entries.push({
                word: '',
                reading: '',
                definitions: defs.slice(0, 5),
                partOfSpeech: ''
            });
        }
    }

    return entries.slice(0, 5);
}
