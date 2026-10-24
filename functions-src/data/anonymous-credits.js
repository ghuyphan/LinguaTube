import { sha256 } from '../utils/utils.js';

const INTERVAL = 20 * 60 * 1000;

export async function anonymousBalance(db, kv, clientId, now = Date.now()) {
    if (!db || !clientId) throw new Error('Anonymous credit database unavailable');
    const key = await sha256(clientId);
    let row = await db.prepare('SELECT * FROM anonymous_credit_balances WHERE client_id=?').bind(key).first();
    if (!row) {
        const legacy = kv ? await kv.get(`diamonds:${clientId}`, 'json') : null;
        const diamonds = Number.isSafeInteger(legacy?.d) ? Math.max(0, Math.min(3, legacy.d)) : 3;
        const lastRegen = Number.isSafeInteger(legacy?.l) ? Math.min(now, legacy.l) : now;
        await db.prepare('INSERT INTO anonymous_credit_balances(client_id,diamonds,last_regen) VALUES(?,?,?) ON CONFLICT DO NOTHING')
            .bind(key, diamonds, lastRegen).run();
        row = await db.prepare('SELECT * FROM anonymous_credit_balances WHERE client_id=?').bind(key).first();
    }
    if (row.diamonds < 3 && now - row.last_regen >= INTERVAL) {
        await db.prepare(`UPDATE anonymous_credit_balances SET diamonds=MIN(3,diamonds+CAST((?-last_regen)/? AS INTEGER)),
            last_regen=last_regen+CAST((?-last_regen)/? AS INTEGER)*? WHERE client_id=? AND diamonds<3 AND ?-last_regen>=?`)
            .bind(now, INTERVAL, now, INTERVAL, INTERVAL, key, now, INTERVAL).run();
        row = await db.prepare('SELECT * FROM anonymous_credit_balances WHERE client_id=?').bind(key).first();
    }
    return { ...row, diamonds: row.diamonds, nextRegenAt: row.diamonds < 3 ? row.last_regen + INTERVAL : null };
}

export async function consumeAnonymousCredits(db, kv, clientId, amount, jobId) {
    if (!Number.isSafeInteger(amount) || amount < 1 || amount > 3) throw new Error('Invalid anonymous credit amount');
    const balance = await anonymousBalance(db, kv, clientId);
    if (!jobId) {
        const updated = await db.prepare(`UPDATE anonymous_credit_balances SET diamonds=diamonds-?,
            last_regen=CASE WHEN diamonds=3 THEN ? ELSE last_regen END WHERE client_id=? AND diamonds>=? RETURNING diamonds`)
            .bind(amount, Date.now(), balance.client_id, amount).first();
        return { success: !!updated, diamonds: updated?.diamonds ?? balance.diamonds };
    }
    await db.prepare(`INSERT INTO anonymous_credit_charges(job_id,client_id,amount,state)
        SELECT ?,?,?, 'charged' WHERE EXISTS(SELECT 1 FROM anonymous_credit_balances WHERE client_id=? AND diamonds>=?)
        ON CONFLICT DO NOTHING`).bind(jobId, balance.client_id, amount, balance.client_id, amount).run();
    const charge = await db.prepare('SELECT * FROM anonymous_credit_charges WHERE job_id=?').bind(jobId).first();
    if (charge && (charge.client_id !== balance.client_id || charge.amount !== amount)) throw new Error('Anonymous charge mismatch');
    const current = await db.prepare('SELECT diamonds FROM anonymous_credit_balances WHERE client_id=?').bind(balance.client_id).first();
    return { success: charge?.state === 'charged', diamonds: current.diamonds };
}

export async function refundAnonymousJob(db, kv, job) {
    if (!Number.isSafeInteger(job.diamonds_charged) || job.diamonds_charged < 1 || job.diamonds_charged > 3) throw new Error('Invalid anonymous credit amount');
    const balance = await anonymousBalance(db, kv, job.client_id);
    await db.batch([
        db.prepare(`INSERT INTO anonymous_credit_charges(job_id,client_id,amount,state) VALUES(?,?,?,'cancelled') ON CONFLICT DO NOTHING`)
            .bind(job.id, balance.client_id, job.diamonds_charged),
        db.prepare("UPDATE anonymous_credit_charges SET state='refunded' WHERE job_id=? AND client_id=? AND amount=? AND state='charged'")
            .bind(job.id, balance.client_id, job.diamonds_charged)
    ]);
    const charge = await db.prepare('SELECT * FROM anonymous_credit_charges WHERE job_id=?').bind(job.id).first();
    if (!charge || charge.client_id !== balance.client_id || charge.amount !== job.diamonds_charged) throw new Error('Anonymous refund mismatch');
    return charge.state === 'refunded' || charge.state === 'cancelled';
}
