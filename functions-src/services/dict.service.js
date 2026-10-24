/** Concrete source orchestration: provider failure is not a dictionary miss. */
export class DictionaryService {
    constructor(dictionaryProvider, translationProvider) {
        this.dictProvider = dictionaryProvider;
        this.transProvider = translationProvider;
    }

    async fetchWithFallback(word, from, to, { deadline = Date.now() + 12000, signal } = {}) {
        const controller = new AbortController();
        const combined = signal ? AbortSignal.any([signal, controller.signal]) : controller.signal;
        const options = { deadline, signal: combined };
        try {
            // Don't make the exact same English lookup twice.
            const directSources = this.dictProvider.getSources(from, to);
            const direct = this._fetchFromSources(directSources, word, options);
            const englishSources = this.dictProvider.getSources(from, 'en').filter(source => !directSources.some(direct => direct.url === source.url));
            const english = to === 'en' ? null : this._fetchFromSources(englishSources, word, options);
            const first = await direct;
            const fallback = first.entries.length ? null : await english;
            const found = first.entries.length ? first : fallback;
            if (!found?.entries.length) return { entries: [], source: 'none', outcome: first.outcome === 'unavailable' || fallback?.outcome === 'unavailable' ? 'unavailable' : 'empty' };
            const actualLanguage = found.language;
            if (actualLanguage === to) return { entries: found.entries.map(entry => ({ ...entry, definitionLanguage: to, definitionKind: 'native' })), source: found.source, outcome: 'found' };
            const translated = await this.transProvider.translateEntries(found.entries, to, {
                sourceLang: actualLanguage, deadline: Math.min(deadline, Date.now() + 4000), signal: combined
            });
            if (translated.length) return { entries: translated.map(entry => ({ ...entry, definitionLanguage: to, definitionKind: 'translated' })), source: `${found.source}+translated`, outcome: 'found' };
            return { entries: found.entries.map(entry => ({ ...entry,
                definitions: entry.definitions.map(value => actualLanguage === 'en' ? `[EN] ${value}` : value),
                definitionLanguage: actualLanguage, definitionKind: 'fallback'
            })), source: `${found.source}+raw`, outcome: 'found' };
        } finally { controller.abort(); }
    }

    async _fetchFromSources(sources, word, options) {
        let unavailable = false;
        for (const source of sources) {
            if (Date.now() >= options.deadline || options.signal.aborted) { unavailable = true; break; }
            try {
                const entries = await this.dictProvider.fetchFromSource(source, word,
                    Math.min(this.dictProvider.primaryTimeout, options.deadline - Date.now()), options.signal);
                if (entries.length) return { entries, source: source.parser, language: source.definitionLanguage, outcome: 'found' };
            } catch { unavailable = true; }
        }
        return { entries: [], outcome: unavailable ? 'unavailable' : 'empty' };
    }
}
