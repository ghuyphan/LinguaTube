// Warm isolates bound their own upstream connections and waiting requests.
const MAX_ACTIVE = 12;
const MAX_WAITING = 36;
const COOLDOWN_MS = 30_000;
const providerStates = new Map();

function logFailure(provider, reason, status) {
    console.warn(JSON.stringify({ event: 'dictionary_upstream_failure', provider, reason, status }));
}

function waitForSlot(state, signal) {
    return new Promise((resolve, reject) => {
        const wake = () => {
            signal.removeEventListener('abort', abort);
            resolve();
        };
        const abort = () => {
            state.waiting.delete(wake);
            reject(signal.reason);
        };
        state.waiting.add(wake);
        signal.addEventListener('abort', abort, { once: true });
    });
}

export async function withDictionaryUpstream(provider, signal, lookup) {
    let state = providerStates.get(provider);
    if (!state) {
        state = { active: 0, waiting: new Set(), cooldownUntil: 0, loggedUntil: 0 };
        providerStates.set(provider, state);
    }

    if (signal.aborted) throw signal.reason;
    if (Date.now() < state.cooldownUntil) throw new Error('Dictionary upstream cooling down');

    if (state.active < MAX_ACTIVE) {
        state.active++;
    } else {
        if (state.waiting.size >= MAX_WAITING) {
            if (Date.now() >= state.loggedUntil) {
                state.loggedUntil = Date.now() + COOLDOWN_MS;
                logFailure(provider, 'capacity');
            }
            throw new Error('Dictionary upstream at capacity');
        }
        await waitForSlot(state, signal);
    }

    let status;
    try {
        if (signal.aborted) throw signal.reason;
        if (Date.now() < state.cooldownUntil) throw new Error('Dictionary upstream cooling down');
        return await lookup(async (url, options) => {
            const response = await fetch(url, { ...options, signal });
            status = response.status;
            if (status === 429 || status === 403) {
                const now = Date.now();
                const retryAfter = response.headers.get('Retry-After');
                const delay = /^\d+$/.test(retryAfter ?? '')
                    ? Number(retryAfter) * 1000
                    : Date.parse(retryAfter) - now;
                if (now >= state.cooldownUntil) logFailure(provider, 'cooldown', status);
                state.cooldownUntil = Math.max(state.cooldownUntil,
                    now + Math.max(COOLDOWN_MS, Number.isFinite(delay) ? delay : 0));
                state.loggedUntil = state.cooldownUntil;
            }
            if (!response.ok) void response.body?.cancel().catch(() => {});
            return response;
        });
    } catch (error) {
        const reason = signal.aborted ? (signal.reason?.name === 'TimeoutError' ? 'timeout' : 'cancelled')
            : status >= 400 ? 'http' : status ? 'format' : 'network';
        if (reason !== 'cancelled' && Date.now() >= state.loggedUntil) {
            state.loggedUntil = Date.now() + COOLDOWN_MS;
            logFailure(provider, reason, status);
        }
        throw error;
    } finally {
        const next = state.waiting.values().next().value;
        if (next) {
            state.waiting.delete(next);
            next();
        } else {
            state.active--;
        }
    }
}
