import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function loadD1Schema(root) {
    const migrations = 'db/migrations/d1';
    const files = (await readdir(join(root, migrations)))
        .filter(file => file.endsWith('.sql'))
        .sort()
        .map(file => join(migrations, file));
    return Promise.all(['db/schema.sql', ...files].map(file => readFile(join(root, file), 'utf8')));
}

export async function applyD1Schema(db, schemas) {
    for (const sql of schemas) {
        let statement = '';
        let trigger = false;
        for (const rawLine of sql.split('\n')) {
            const line = rawLine.replace(/--.*$/, '').trim();
            if (!line) continue;
            if (!statement && /^CREATE TRIGGER\b/i.test(line)) trigger = true;
            statement += line + '\n';
            if (line.endsWith(';') && (!trigger || /^END;$/i.test(line))) {
                await db.prepare(statement).run();
                statement = '';
                trigger = false;
            }
        }
        if (statement.trim()) throw new Error('Incomplete D1 fixture statement: ' + statement);
    }
}
