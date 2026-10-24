/** Read a bounded upstream body, including cancellation while waiting for bytes. */
export async function readBoundedBody(response, signal, maxBytes) {
    const reader = response.body?.getReader();
    if (!reader) return new Uint8Array();
    let rejectAbort;
    const aborted = new Promise((_, reject) => { rejectAbort = reject; });
    const onAbort = () => { void reader.cancel().catch(() => {}); rejectAbort(signal.reason || new Error('Request aborted')); };
    signal?.addEventListener('abort', onAbort, { once: true });
    if (signal?.aborted) onAbort();
    const chunks = [];
    let size = 0;
    try {
        while (true) {
            const { done, value } = await Promise.race([reader.read(), aborted]);
            if (done) break;
            size += value.byteLength;
            if (size > maxBytes) { void reader.cancel().catch(() => {}); throw new Error('Upstream response too large'); }
            chunks.push(value);
        }
        if (signal?.aborted) throw signal.reason;
        const bytes = new Uint8Array(size);
        let offset = 0;
        for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
        return bytes;
    } finally {
        signal?.removeEventListener('abort', onAbort);
        reader.releaseLock();
    }
}

export function requestSignal(deadline, timeoutMs, signal) {
    const timeout = AbortSignal.timeout(Math.max(1, Math.min(timeoutMs, deadline - Date.now())));
    return signal ? AbortSignal.any([timeout, signal]) : timeout;
}
