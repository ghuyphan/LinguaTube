/** Bounded server-only Supabase REST calls. Mutations are never retried implicitly. */
export async function serviceRoleRequest(env, path, { method = 'GET', body, prefer, timeoutMs = 5000 } = {}) {
    if (!env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Supabase service unavailable');
    const response = await fetch(`${env.SUPABASE_URL || 'https://edbkvzviqeulwzcnrrlb.supabase.co'}/rest/v1/${path}`, {
        method,
        headers: {
            apikey: env.SUPABASE_SERVICE_ROLE_KEY,
            Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json',
            ...(prefer ? { Prefer: prefer } : {})
        },
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
        signal: AbortSignal.timeout(timeoutMs),
        redirect: 'error'
    });
    if (!response.ok) throw new Error(`Supabase service HTTP ${response.status}`);
    if (response.status === 204) return null;
    const text = await response.text();
    if (!text.trim()) return null;
    try { return JSON.parse(text); } catch { throw new Error('Invalid Supabase service response'); }
}
