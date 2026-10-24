/** Fixed-size comparison; secrets remain case-sensitive. */
export async function matchesSecret(actual, expected) {
    if (typeof expected !== 'string' || !expected.trim()) return false;
    const encoder = new TextEncoder();
    const [a,b] = await Promise.all([actual || '',expected].map(value => crypto.subtle.digest('SHA-256', encoder.encode(value))));
    const left = new Uint8Array(a), right = new Uint8Array(b);
    let difference = 0;
    for (let i=0;i<left.length;i++) difference |= left[i] ^ right[i];
    return difference === 0;
}
