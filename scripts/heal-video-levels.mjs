#!/usr/bin/env node
// See doc/backend-api.md for dry-run, review, rollback and scheduler setup.
import { parseArgs } from 'node:util';

const { values } = parseArgs({ options: {
    origin: { type: 'string' }, cursor: { type: 'string' }, video: { type: 'string' },
    language: { type: 'string' }, apply: { type: 'boolean' }, approve: { type: 'string' },
    rollback: { type: 'string' }, 'rollback-version': { type: 'string' }, reconcile: { type: 'boolean' },
} });
if (!values.origin) throw new Error('Pass --origin for the environment to use');
const origin = new URL(values.origin);
if (origin.protocol !== 'https:' && !(origin.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(origin.hostname))) {
    throw new Error('Use HTTPS for remote grading maintenance');
}
if ((values.approve || values.rollback) && (!values.apply || !values.video || !values.language)) {
    throw new Error('Review and rollback require --apply, --video and --language');
}
const rollbackVersion = values['rollback-version'];
if (rollbackVersion && (!values.apply || !/^[1-9]\d*$/.test(rollbackVersion) ||
    values.video || values.language || values.approve || values.rollback)) {
    throw new Error('Version rollback requires only --apply and a positive --rollback-version');
}
const rollingBack = Boolean(values.rollback || rollbackVersion);
const secret = process.env.HEAL_ADMIN_SECRET;
const maintenance = process.env.BACKEND_MAINTENANCE_SECRET;
if (!secret && !(values.reconcile && maintenance)) throw new Error('Set the maintenance credential in the environment');

async function request(action, body) {
    const url = new URL('/api/heal-levels', origin);
    url.searchParams.set('action', action);
    const response = await fetch(url, {
        method: 'POST', redirect: 'error', signal: AbortSignal.timeout(60000),
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Voca-Video-Grading/1.0',
            ...(secret ? { 'x-admin-secret': secret } : { Authorization: 'Bearer ' + maintenance }) },
        body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error('Maintenance failed with HTTP ' + response.status);
    return response.json();
}

if (values.reconcile) {
    console.log(JSON.stringify(await request('reconcile', {})));
} else {
    let cursor = values.cursor;
    do {
        try {
            const page = await request(rollingBack ? 'rollback' : 'backfill', {
                cursor, videoId: values.video, language: values.language,
                dryRun: !values.apply, approveRevision: values.approve, revision: values.rollback,
                graderVersion: rollbackVersion && Number(rollbackVersion),
            });
            if (values.apply && !rollingBack) {
                // Let the operator's backfill drain bounded batches without waiting for the next scheduler tick.
                for (let batch = 0; batch < 8; batch++) {
                    const result = await request('reconcile', {});
                    console.log(JSON.stringify(result));
                    if (!result.processed || !result.pending) break;
                }
            }
            console.log(JSON.stringify(page));
            cursor = page.nextCursor;
        } catch (error) {
            throw new Error(error.message + '. Resume after ' + (cursor || 'start'));
        }
    } while (cursor);
}
