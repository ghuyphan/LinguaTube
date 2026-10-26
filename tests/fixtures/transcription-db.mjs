import { DatabaseSync } from 'node:sqlite';
import { readFile } from 'node:fs/promises';
import { reserveAiJob } from '../../functions-src/data/transcript-db.js';
export async function fixture(t) {
    const sqlite=new DatabaseSync(':memory:');
    sqlite.exec(await readFile(new URL('../../db/schema.sql',import.meta.url),'utf8'));
    sqlite.exec(await readFile(new URL('../../db/migrations/d1/20261023_credit_recovery.sql',import.meta.url),'utf8'));
    t.after(()=>sqlite.close());
    sqlite.exec(await readFile(new URL('../../db/migrations/d1/20261024_gladia_inbox.sql',import.meta.url),'utf8'));
    sqlite.exec(await readFile(new URL('../../db/migrations/d1/20261025_gladia_submission_state.sql',import.meta.url),'utf8'));
    sqlite.exec(await readFile(new URL('../../db/migrations/d1/20261026_verified_video_metadata.sql',import.meta.url),'utf8'));
    sqlite.exec(await readFile(new URL('../../db/migrations/d1/20261026_video_metadata_details.sql',import.meta.url),'utf8'));
    const db={prepare(sql){
        const statement=sqlite.prepare(sql);
        return {args:[],bind(...args){this.args=args;return this;},runSync(){const value=statement.run(...this.args);return {meta:{changes:Number(value.changes)}};},
            async run(){return this.runSync();},async first(){return statement.get(...this.args)||null;},async all(){return {results:statement.all(...this.args)};}};
    },async batch(statements){sqlite.exec('BEGIN');try{const result=statements.map(s=>s.runSync());sqlite.exec('COMMIT');return result;}catch(error){sqlite.exec('ROLLBACK');throw error;}}};
    const reserve=async (videoId,userId=null)=> (await reserveAiJob(db,{videoId,language:'ja',clientId:'client-a',userId,diamondsCharged:1})).job;
    return {db,sqlite,reserve};
}

