// Optional embedded PostgreSQL validation, without starting a local server.
// VOCA_PGLITE_MODULE=/absolute/path/to/@electric-sql/pglite/dist/index.js node --test tests/database-security.integration.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const modulePath = process.env.VOCA_PGLITE_MODULE;
test('payment, diamond and proximity migrations execute with role isolation and replay protection', { skip: !modulePath }, async () => {
    const { PGlite } = await import(modulePath);
    const db = new PGlite();
    try {
        await db.exec(`
            CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role;
            CREATE SCHEMA auth;
            CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql AS $$ SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
            CREATE TABLE auth.users(id uuid PRIMARY KEY);
            CREATE TABLE public.profiles(id uuid PRIMARY KEY REFERENCES auth.users(id),name text,target_lang text, subscription_tier text DEFAULT 'free',
                subscription_expires timestamptz, diamonds integer DEFAULT 5, diamonds_updated_at timestamptz DEFAULT now(), updated_at timestamptz DEFAULT now());
            CREATE TABLE public.orders(order_code bigint PRIMARY KEY, user_id uuid REFERENCES auth.users(id), plan_id text NOT NULL,
                tier text NOT NULL, amount integer NOT NULL, status text DEFAULT 'PENDING', paid_at timestamptz, updated_at timestamptz DEFAULT now());
            CREATE TABLE public.streaks(user_id uuid REFERENCES auth.users(id),current_streak integer,last_activity timestamptz);
            INSERT INTO auth.users VALUES ('11111111-1111-4111-8111-111111111111'),('22222222-2222-4222-8222-222222222222');
            INSERT INTO public.profiles(id) SELECT id FROM auth.users;
        `);
        for (const path of [
            '../db/migrations/20260916_atomic_diamond_rpcs.sql',
            '../db/migrations/20261023_payment_event_transactions.sql',
            '../db/migrations/20261023_atomic_diamond_regeneration.sql',
            '../db/migrations/20261023_access_state.sql',
            '../db/migrations/20261023_reliable_credit_operations.sql',
            '../db/migrations/20261023_revenuecat_recovery.sql',
            '../db/migrations/20261020_device_tokens_and_push_notifications.sql',
            '../../voca_flutter/supabase/migrations/20261021065235_create_vocapass_tokens_and_rpcs.sql',
            '../../voca_flutter/supabase/migrations/20261023090000_secure_proximity_and_reminders.sql',
            '../../voca_flutter/supabase/migrations/20261023120000_reminder_delivery_ledger.sql'
        ]) await db.exec(await readFile(new URL(path, import.meta.url), 'utf8'));
        const uid = '11111111-1111-4111-8111-111111111111';
        const payment = `SELECT public.apply_payos_payment(12345678,'${uid}','pro',30,10,49000) AS result`;
        await db.exec('SET ROLE service_role');
        assert.equal((await db.query(payment)).rows[0].result.success, true);
        assert.equal((await db.query(payment)).rows[0].result.status, 'already_processed');
        await db.exec('RESET ROLE');
        const { rows } = await db.query(`SELECT subscription_expires < now()+interval '31 days' AS once FROM profiles WHERE id='${uid}'`);
        assert.equal(rows[0].once, true);
        assert.equal((await db.query('SELECT count(*)::int AS n FROM payment_events')).rows[0].n, 1);
        await db.exec(`SET ROLE authenticated`);
        await assert.rejects(db.query(payment), /permission denied/);
        await assert.rejects(db.query('SELECT public.get_streak_reminder_targets()'), /permission denied/);
        await db.exec('RESET ROLE');
        await assert.rejects(db.query(`SELECT public.apply_payos_payment(12345678,'22222222-2222-4222-8222-222222222222','pro',30,10,49000)`), /Order mismatch/);
        await db.exec(`UPDATE profiles SET diamonds=1,diamonds_updated_at=now() WHERE id='${uid}'`);
        const results = await Promise.all([1,2,3].map(() => db.query(`SELECT public.consume_user_diamonds('${uid}',1) AS result`)));
        assert.equal(results.filter(result => result.rows[0].result.success).length,1);
        await assert.rejects(db.query(`SELECT public.consume_user_diamonds('${uid}',null)`), /Invalid count/);
        await db.exec(`UPDATE profiles SET diamonds=0,diamonds_updated_at=now()-interval '20 minutes' WHERE id='${uid}'`);
        assert.equal((await db.query(`SELECT public.regenerate_user_diamonds('${uid}') AS result`)).rows[0].result.diamonds,2);
        assert.equal((await db.query(`SELECT public.regenerate_user_diamonds('${uid}') AS result`)).rows[0].result.diamonds,2);

        await db.exec(`UPDATE profiles SET diamonds=30 WHERE id='${uid}'`);
        assert.equal((await db.query(`SELECT public.refund_user_diamonds('${uid}',1) AS result`)).rows[0].result.diamonds,30);

        const rc = (id, age, days, kind='RENEWAL') => `SELECT public.apply_revenuecat_event('${id}','${uid}','${kind}',now()-interval '${age} seconds','premium',now()+interval '${days} days') AS result`;
        await db.query(rc('renewal',10,40));
        assert.equal((await db.query(rc('renewal',10,40))).rows[0].result.status,'already_processed');
        assert.equal((await db.query(rc('stale',20,1,'EXPIRATION'))).rows[0].result.status,'stale');
        const state = (await db.query(`SELECT subscription_tier, subscription_expires < now()+interval '41 days' AS absolute FROM profiles WHERE id='${uid}'`)).rows[0];
        assert.equal(state.subscription_tier,'premium'); assert.equal(state.absolute,true);
        await db.query(rc('expire-with-web-grant',1,0,'EXPIRATION'));
        assert.equal((await db.query(`SELECT subscription_tier FROM profiles WHERE id='${uid}'`)).rows[0].subscription_tier,'premium');

        // Higher and lower tiers retain separate expiration dates.
        await db.exec(`UPDATE public.subscription_grants SET expires_at=now()-interval '1 second' WHERE user_id='${uid}' AND tier='premium'`);
        assert.equal((await db.query(`SELECT public.reconcile_user_subscription('${uid}') AS result`)).rows[0].result.tier,'pro');

        await db.exec(`SET request.jwt.claim.sub='${uid}'; SET ROLE authenticated`);
        const slots = (await db.query(`SELECT floor(extract(epoch FROM now())/900)::bigint AS slot`)).rows[0].slot;
        const slot = Number(slots);
        const register = (token, expirySlot=slot) => `SELECT public.register_vocapass_tokens('[{"token":"${token}","slot_index":${expirySlot},"expires_at":"${new Date((expirySlot+1)*900000).toISOString()}"}]'::jsonb)`;
        await db.query(register('abcdef12'));
        await assert.rejects(db.query(register('12345678',slot+10)),/Invalid token slot/);
        await db.exec(`RESET ROLE; SET request.jwt.claim.sub='22222222-2222-4222-8222-222222222222'; SET ROLE authenticated`);
        assert.equal((await db.query('SELECT * FROM vocapass_tokens')).rows.length,0);
        assert.equal((await db.query("SELECT public.resolve_vocapass_token('abcdef12') AS result")).rows[0].result.user_id,uid);
        await assert.rejects(db.query(register('abcdef12')),/Token collision/);
        await db.exec('RESET ROLE; SET ROLE anon');
        await assert.rejects(db.query("SELECT public.resolve_vocapass_token('abcdef12')"),/permission denied/);
        await db.exec('RESET ROLE');
        // A committed charge/refund remains replay-safe when the HTTP acknowledgement is lost.
        await db.exec(`UPDATE profiles SET diamonds=5,diamonds_updated_at=now() WHERE id='${uid}'`);
        const charge = `SELECT public.consume_transcription_credits('credit-job','${uid}',1) AS result`;
        assert.equal((await db.query(charge)).rows[0].result.diamonds,4);
        assert.equal((await db.query(charge)).rows[0].result.diamonds,4);
        const refund = `SELECT public.refund_transcription_credits('credit-job','${uid}',1) AS result`;
        assert.equal((await db.query(refund)).rows[0].result.state,'refunded');
        await db.query(refund);
        assert.equal((await db.query(`SELECT diamonds FROM profiles WHERE id='${uid}'`)).rows[0].diamonds,5);
        await db.query(`SELECT public.refund_transcription_credits('cancel-before-charge','${uid}',1)`);
        assert.equal((await db.query(`SELECT public.consume_transcription_credits('cancel-before-charge','${uid}',1) AS result`)).rows[0].result.success,false);
        // Regeneration/access reads do not write unchanged profile rows.
        await db.exec(`CREATE TABLE profile_write_count(n integer); INSERT INTO profile_write_count VALUES(0);
            CREATE FUNCTION count_profile_write() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN UPDATE public.profile_write_count SET n=n+1; RETURN NEW; END; $$;
            CREATE TRIGGER count_profile_write AFTER UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION count_profile_write();`);
        await db.exec(await readFile(new URL('../db/migrations/20261023_atomic_diamond_regeneration.sql',import.meta.url),'utf8'));
        await db.query(`SELECT public.regenerate_user_diamonds('${uid}')`);
        await db.query(`SELECT public.regenerate_user_diamonds('${uid}')`);
        assert.equal((await db.query('SELECT n FROM profile_write_count')).rows[0].n,2);
        await db.exec('UPDATE profile_write_count SET n=0');
        await db.exec(await readFile(new URL('../db/migrations/20261023_access_state.sql',import.meta.url),'utf8'));
        await db.query(`SELECT public.get_user_access_state('${uid}')`);
        await db.query(`SELECT public.get_user_access_state('${uid}')`);
        assert.equal((await db.query('SELECT n FROM profile_write_count')).rows[0].n,0);

        // A transfer reconciles both identities and never removes the source's web grant.
        const other='22222222-2222-4222-8222-222222222222';
        await db.query(`INSERT INTO public.billing_webhook_inbox(event_id,event_type,user_ids,event_at)
            VALUES('transfer','TRANSFER',$1::jsonb,now())`,[JSON.stringify([uid,other])]);
        const claimed=(await db.query("SELECT public.claim_revenuecat_event('transfer') AS result")).rows[0].result;
        assert.equal((await db.query("SELECT public.claim_revenuecat_event('transfer') AS result")).rows[0].result,null);
        const grants=[{tier:'premium',expires_at:new Date(Date.now()+86400000).toISOString()}];
        await db.query('SELECT public.apply_revenuecat_snapshot($1,$2,$3,now(),$4::jsonb)',['transfer',claimed.lease_token,uid,'[]']);
        await db.query('SELECT public.apply_revenuecat_snapshot($1,$2,$3,now(),$4::jsonb)',['transfer',claimed.lease_token,other,JSON.stringify(grants)]);
        assert.equal((await db.query(`SELECT subscription_tier FROM profiles WHERE id='${uid}'`)).rows[0].subscription_tier,'pro');
        assert.equal((await db.query(`SELECT subscription_tier FROM profiles WHERE id='${other}'`)).rows[0].subscription_tier,'premium');
        await db.query("SELECT public.apply_revenuecat_snapshot($1,$2,$3,now()-interval '1 day',$4::jsonb)",['transfer',claimed.lease_token,other,'[]']);
        assert.equal((await db.query(`SELECT subscription_tier FROM profiles WHERE id='${other}'`)).rows[0].subscription_tier,'premium');
        await db.query('SELECT public.finish_revenuecat_event($1,$2,true)',['transfer',claimed.lease_token]);
        assert.equal((await db.query("SELECT public.claim_revenuecat_event('transfer') AS result")).rows[0].result,null);

        // Distinct renewal callbacks for the same canonical period cannot replenish twice.
        const expiry=new Date(Date.now()+3*86400000).toISOString();
        const renew=async eventId=>{
            await db.query(`INSERT INTO public.billing_webhook_inbox(event_id,event_type,user_ids,event_at) VALUES($1,'RENEWAL',$2::jsonb,now())`,[eventId,JSON.stringify([other])]);
            const job=(await db.query('SELECT public.claim_revenuecat_event($1) AS result',[eventId])).rows[0].result;
            await db.query('SELECT public.apply_revenuecat_snapshot($1,$2,$3,now(),$4::jsonb)',[eventId,job.lease_token,other,JSON.stringify([{tier:'pro',expires_at:expiry}])]);
        };
        await db.exec(`UPDATE public.profiles SET diamonds=0 WHERE id='${other}'`);
        await renew('first-renewal');
        assert.equal((await db.query(`SELECT diamonds FROM profiles WHERE id='${other}'`)).rows[0].diamonds,10);
        await db.exec(`UPDATE public.profiles SET diamonds=2 WHERE id='${other}'`);
        await renew('same-period-duplicate');
        assert.equal((await db.query(`SELECT diamonds FROM profiles WHERE id='${other}'`)).rows[0].diamonds,2);

        await db.exec(`INSERT INTO streaks VALUES('${uid}',5,now()-interval '2 days');
            INSERT INTO device_tokens(user_id,token,platform) VALUES('${uid}','valid-device','ios');`);
        const delivery=(await db.query('SELECT public.claim_streak_reminders(500) AS result')).rows[0].result;
        assert.equal(delivery.length,1);
        assert.equal((await db.query('SELECT public.claim_streak_reminders() AS result')).rows[0].result.length,0);
        const finish=(lease,success)=>db.query('SELECT public.finish_streak_reminder($1,$2,$3,$4,$5) AS result',
            [uid,delivery[0].token_hash,delivery[0].delivery_date,lease,success]);
        await finish(delivery[0].lease_token,false);
        assert.equal((await db.query('SELECT public.claim_streak_reminders() AS result')).rows[0].result.length,0);
        await db.exec("UPDATE streak_reminder_deliveries SET lease_until=now()-interval '1 second',next_attempt=now()-interval '1 second'");
        const retry=(await db.query('SELECT public.claim_streak_reminders() AS result')).rows[0].result[0];
        assert.equal((await finish(delivery[0].lease_token,true)).rows[0].result,false);
        assert.equal((await finish(retry.lease_token,true)).rows[0].result,true);
        assert.equal((await db.query('SELECT public.claim_streak_reminders() AS result')).rows[0].result.length,0);
        await db.exec(`INSERT INTO device_tokens(user_id,token,platform) VALUES('${uid}','bad-payload-device','ios')`);
        const bad=(await db.query('SELECT public.claim_streak_reminders() AS result')).rows[0].result[0];
        await db.query('SELECT public.finish_streak_reminder($1,$2,$3,$4,false,false)',[uid,bad.token_hash,bad.delivery_date,bad.lease_token]);
        assert.equal((await db.query('SELECT public.claim_streak_reminders() AS result')).rows[0].result.length,0);
        await db.exec('SET ROLE authenticated');
        await assert.rejects(db.query('SELECT public.claim_streak_reminders()'),/permission denied/);
        await assert.rejects(db.query("SELECT public.claim_revenuecat_event('transfer')"),/permission denied/);
        await assert.rejects(db.query(refund),/permission denied/);
        await db.exec('RESET ROLE');
    } finally { await db.close(); }
});
