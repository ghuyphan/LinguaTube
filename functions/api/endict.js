/**
 * English Dictionary API (Cloudflare Function)
 * Uses Free Dictionary API for word definitions
 */

import { jsonResponse, handleOptions, errorResponse } from './_shared/utils.js';

const FREE_DICT_API = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export async function onRequest(context) {
    const { request } = context;

    if (request.method === 'OPTIONS') {
        return handleOptions(['GET', 'OPTIONS']);
    }

    if (request.method !== 'GET') {
        return jsonResponse({ error: 'Method not allowed' }, 405);
    }

    const url = new URL(request.url);
    const word = url.searchParams.get('q')?.trim();

    if (!word) {
        return jsonResponse({ error: 'Missing query parameter: q' }, 400);
    }

    try {
        console.log(`[English Dict] Looking up: ${word}`);

        const response = await fetch(`${FREE_DICT_API}/${encodeURIComponent(word)}`);

        if (!response.ok) {
            if (response.status === 404) {
                return jsonResponse([]);
            }
            throw new Error(`Dictionary API returned ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
            return jsonResponse([]);
        }

        // Parse and format the response
        const results = data.map(entry => {
            const phonetic = entry.phonetics?.find(p => p.text)?.text || '';
            const audio = entry.phonetics?.find(p => p.audio)?.audio || '';

            const definitions = [];
            const partOfSpeech = [];

            entry.meanings?.forEach(meaning => {
                if (meaning.partOfSpeech && !partOfSpeech.includes(meaning.partOfSpeech)) {
                    partOfSpeech.push(meaning.partOfSpeech);
                }

                meaning.definitions?.forEach(def => {
                    definitions.push(def.definition);
                });
            });

            return {
                word: entry.word || word,
                phonetic,
                audio,
                definitions,
                partOfSpeech
            };
        });

        return jsonResponse(results);

    } catch (error) {
        console.error('[English Dict] Error:', error.message);
        return errorResponse(error.message);
    }
}
