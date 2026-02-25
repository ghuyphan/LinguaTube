/**
 * Provider for Lingva Translation API
 */

const BROWSER_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache'
};

const LINGVA_INSTANCES = [
    'https://lingva.ml',
    'https://lingva.lunar.icu',
    'https://translate.plausibility.cloud'
];

const TRANSLATION_TIMEOUT_MS = 4000;

export class TranslationProvider {
    /**
     * Translate dictionary entries to target language
     * - Parallel: All translations run at once
     * - Distributed: Round-robin across instances
     * - Limited: 2 entries × 2 definitions = 4 max translations
     * 
     * @param {any[]} entries - Parsed dictionary entries
     * @param {string} targetLang - Language code to translate to
     * @returns {Promise<any[]>} Translated entries
     */
    async translateEntries(entries, targetLang) {
        if (!entries?.length) return [];

        // Limit to 2 entries, 2 definitions each
        const limitedEntries = entries.slice(0, 2);
        const translationTasks = [];

        limitedEntries.forEach((entry, entryIdx) => {
            entry.definitions.slice(0, 2).forEach((def, defIdx) => {
                translationTasks.push({
                    entryIdx,
                    defIdx,
                    text: def,
                    instance: LINGVA_INSTANCES[(entryIdx * 2 + defIdx) % LINGVA_INSTANCES.length]
                });
            });
        });

        if (translationTasks.length === 0) return [];

        // Parallel translation with timeout
        const translationPromises = translationTasks.map(task =>
            this._translateWithInstance(task.text, 'en', targetLang, task.instance)
                .catch(() => null)
        );

        const translations = await Promise.race([
            Promise.all(translationPromises),
            new Promise(resolve => setTimeout(() => resolve(translationTasks.map(() => null)), TRANSLATION_TIMEOUT_MS))
        ]);

        // Reassemble entries
        const result = limitedEntries.map(entry => ({
            ...entry,
            definitions: []
        }));

        translationTasks.forEach((task, i) => {
            const translated = translations[i];
            if (translated) {
                result[task.entryIdx].definitions.push(translated);
            }
        });

        return result.filter(e => e.definitions.length > 0);
    }

    /**
     * Translate text using a specific Lingva instance
     */
    async _translateWithInstance(text, source, target, instance) {
        const url = `${instance}/api/v1/${source}/${target}/${encodeURIComponent(text)}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: { 'User-Agent': BROWSER_HEADERS['User-Agent'] },
            signal: AbortSignal.timeout(3000)
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        return data.translation || null;
    }
}
