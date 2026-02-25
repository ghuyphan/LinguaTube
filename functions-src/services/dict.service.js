/**
 * Service for handling Dictionary lookups and translation fallbacks
 */

export class DictionaryService {
    /**
     * @param {Object} dictionaryProvider 
     * @param {Object} translationProvider 
     */
    constructor(dictionaryProvider, translationProvider) {
        this.dictProvider = dictionaryProvider;
        this.transProvider = translationProvider;
    }

    /**
     * Fetches dictionary entries with intelligent fallback strategy:
     * 1. Start primary source(s) immediately
     * 2. For non-English targets, also start English lookup in parallel
     * 3. Use first successful result, translate English if needed
     * 
     * @param {string} word 
     * @param {string} from 
     * @param {string} to 
     * @returns {Promise<{entries: any[], source: string}>}
     */
    async fetchWithFallback(word, from, to) {
        const directSources = this.dictProvider.getSources(from, to);
        const englishSources = to !== 'en' ? this.dictProvider.getSources(from, 'en') : [];

        // Build parallel fetch promises
        const promises = [];
        const promiseLabels = [];

        // Primary sources (with fallback within the same pair)
        if (directSources.length > 0) {
            promises.push(this._fetchFromSources(directSources, word, this.dictProvider.primaryTimeout));
            promiseLabels.push('direct');
        }

        // English fallback (runs in parallel, not after primary fails)
        if (englishSources.length > 0) {
            promises.push(this._fetchFromSources(englishSources, word, this.dictProvider.fallbackTimeout));
            promiseLabels.push('english');
        }

        if (promises.length === 0) {
            return { entries: [], source: 'none' };
        }

        // Race: Use Promise.allSettled to get all results, then pick best
        const results = await Promise.allSettled(promises);

        // Check direct sources first
        const directIdx = promiseLabels.indexOf('direct');
        if (directIdx !== -1 && results[directIdx].status === 'fulfilled') {
            const direct = results[directIdx].value;
            if (direct?.entries?.length > 0) {
                return { entries: direct.entries, source: direct.source };
            }
        }

        // Fallback: Translate English definitions to target
        const englishIdx = promiseLabels.indexOf('english');
        if (englishIdx !== -1 && results[englishIdx].status === 'fulfilled') {
            const english = results[englishIdx].value;
            if (english?.entries?.length > 0) {
                const translated = await this.transProvider.translateEntries(english.entries, to);
                if (translated?.length > 0) {
                    return { entries: translated, source: `${english.source}+lingva` };
                }
                // Return English entries with [EN] prefix if translation fails
                const fallbackEntries = english.entries.map(e => ({
                    ...e,
                    definitions: e.definitions.map(d => `[EN] ${d}`)
                }));
                return { entries: fallbackEntries, source: `${english.source}+raw` };
            }
        }

        return { entries: [], source: 'none' };
    }

    /**
     * Try multiple sources in order, return first successful result
     */
    async _fetchFromSources(sources, word, timeout) {
        for (const source of sources) {
            try {
                const entries = await this.dictProvider.fetchFromSource(source, word, timeout);
                if (entries?.length > 0) {
                    return { entries, source: source.parser };
                }
            } catch (e) {
                console.log(`[DictService] ${source.parser} failed:`, e.message);
                // Try next source
            }
        }
        return null;
    }
}
