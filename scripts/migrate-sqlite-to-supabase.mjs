import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const DB_PATH = '/Users/huyphan/Downloads/voca_backup/data.db';

function queryJson(sql) {
    const output = execSync(`sqlite3 "${DB_PATH}" ".mode json" "${sql.replace(/"/g, '\\"')}"`, { encoding: 'utf-8' });
    if (!output.trim()) return [];
    return JSON.parse(output);
}

function sqlStr(val) {
    if (val === null || val === undefined) return 'NULL';
    return `'${String(val).replace(/'/g, "''")}'`;
}

function sqlJson(val, defaultVal = '[]') {
    if (!val) return `'${defaultVal}'::jsonb`;
    if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
    try {
        JSON.parse(val);
        return `'${String(val).replace(/'/g, "''")}'::jsonb`;
    } catch {
        return `'${defaultVal}'::jsonb`;
    }
}

function sqlDate(val) {
    if (!val || val === '') return 'NULL';
    return `'${val}'::timestamptz`;
}

function sqlNum(val, defaultVal = 0) {
    const num = Number(val);
    return isNaN(num) ? defaultVal : num;
}

function sqlBool(val) {
    return val === 1 || val === true || val === 'true' ? 'TRUE' : 'FALSE';
}

const sqlStatements = [];

// 1. Migrate Users to legacy_pb_users
const users = queryJson('SELECT id, email, name, avatar, subscription_tier, diamonds FROM users;');
console.log(`Found ${users.length} users in PocketBase.`);
for (const u of users) {
    sqlStatements.push(`
INSERT INTO public.legacy_pb_users (pb_id, email, name, avatar, subscription_tier, diamonds)
VALUES (${sqlStr(u.id)}, ${sqlStr(u.email)}, ${sqlStr(u.name)}, ${sqlStr(u.avatar)}, ${sqlStr(u.subscription_tier || 'free')}, ${sqlNum(u.diamonds, 5)})
ON CONFLICT (pb_id) DO UPDATE SET
  email = EXCLUDED.email,
  name = EXCLUDED.name,
  avatar = EXCLUDED.avatar,
  subscription_tier = EXCLUDED.subscription_tier,
  diamonds = EXCLUDED.diamonds;`);
}

// 2. Migrate Vocabulary
const vocab = queryJson('SELECT id, user, word, reading, pinyin, romanization, meaning, language, level, examples, created, updated FROM vocabulary;');
console.log(`Found ${vocab.length} vocabulary items.`);
for (const v of vocab) {
    sqlStatements.push(`
INSERT INTO public.vocabulary (id, legacy_user_id, word, reading, pinyin, romanization, meaning, language, level, examples, created_at, updated_at)
VALUES (${sqlStr(v.id)}, ${sqlStr(v.user)}, ${sqlStr(v.word)}, ${sqlStr(v.reading)}, ${sqlStr(v.pinyin)}, ${sqlStr(v.romanization)}, ${sqlStr(v.meaning)}, ${sqlStr(v.language)}, ${sqlStr(v.level || 'new')}, ${sqlJson(v.examples, '[]')}, ${sqlDate(v.created)}, ${sqlDate(v.updated)})
ON CONFLICT (id) DO NOTHING;`);
}

// 3. Migrate Streaks
const streaks = queryJson('SELECT id, user, current_streak, longest_streak, last_activity, freezes_remaining, last_freeze_used, activity_log, created, updated FROM streaks;');
console.log(`Found ${streaks.length} streak items.`);
for (const s of streaks) {
    sqlStatements.push(`
INSERT INTO public.streaks (id, legacy_user_id, current_streak, longest_streak, last_activity, freezes_remaining, last_freeze_used, activity_log, created_at, updated_at)
VALUES (${sqlStr(s.id)}, ${sqlStr(s.user)}, ${sqlNum(s.current_streak)}, ${sqlNum(s.longest_streak)}, ${sqlDate(s.last_activity)}, ${sqlNum(s.freezes_remaining, 2)}, ${sqlDate(s.last_freeze_used)}, ${sqlJson(s.activity_log, '[]')}, ${sqlDate(s.created)}, ${sqlDate(s.updated)})
ON CONFLICT (id) DO NOTHING;`);
}

// 4. Migrate History
const history = queryJson('SELECT id, user, video_id, title, thumbnail, channel, duration, language, languages, progress, is_favorite, watched_at, created, updated FROM history;');
console.log(`Found ${history.length} history items.`);
for (const h of history) {
    sqlStatements.push(`
INSERT INTO public.history (id, legacy_user_id, video_id, title, thumbnail, channel, duration, language, languages, progress, is_favorite, watched_at, created_at, updated_at)
VALUES (${sqlStr(h.id)}, ${sqlStr(h.user)}, ${sqlStr(h.video_id)}, ${sqlStr(h.title)}, ${sqlStr(h.thumbnail)}, ${sqlStr(h.channel)}, ${sqlNum(h.duration)}, ${sqlStr(h.language || 'ja')}, ${sqlJson(h.languages, '[]')}, ${sqlNum(h.progress)}, ${sqlBool(h.is_favorite)}, ${sqlDate(h.watched_at)}, ${sqlDate(h.created)}, ${sqlDate(h.updated)})
ON CONFLICT (id) DO NOTHING;`);
}

// 5. Migrate Playlists
const playlists = queryJson('SELECT id, user, title, description, visibility, language, tags, video_ids, video_count, thumbnail, save_count, is_featured, created, updated FROM playlists;');
console.log(`Found ${playlists.length} playlists.`);
for (const p of playlists) {
    sqlStatements.push(`
INSERT INTO public.playlists (id, legacy_user_id, title, description, visibility, language, tags, video_ids, video_count, thumbnail, save_count, is_featured, created_at, updated_at)
VALUES (${sqlStr(p.id)}, ${sqlStr(p.user)}, ${sqlStr(p.title)}, ${sqlStr(p.description)}, ${sqlStr(p.visibility || 'private')}, ${sqlStr(p.language || 'ja')}, ${sqlJson(p.tags, '[]')}, ${sqlJson(p.video_ids, '[]')}, ${sqlNum(p.video_count)}, ${sqlStr(p.thumbnail)}, ${sqlNum(p.save_count)}, ${sqlBool(p.is_featured)}, ${sqlDate(p.created)}, ${sqlDate(p.updated)})
ON CONFLICT (id) DO NOTHING;`);
}

// 6. Migrate Gamification
const gamification = queryJson('SELECT id, user, xp, level, total_videos_watched, total_quizzes_completed, unlocked_achievements, notified_achievements, created, updated FROM gamification;');
console.log(`Found ${gamification.length} gamification records.`);
for (const g of gamification) {
    sqlStatements.push(`
INSERT INTO public.gamification (id, legacy_user_id, xp, level, weekly_xp, total_videos_watched, total_quizzes_completed, unlocked_achievements, notified_achievements, created_at, updated_at)
VALUES (${sqlStr(g.id)}, ${sqlStr(g.user)}, ${sqlNum(g.xp)}, ${sqlNum(g.level, 1)}, 0, ${sqlNum(g.total_videos_watched)}, ${sqlNum(g.total_quizzes_completed)}, ${sqlJson(g.unlocked_achievements, '{}')}, ${sqlJson(g.notified_achievements, '[]')}, ${sqlDate(g.created)}, ${sqlDate(g.updated)})
ON CONFLICT (id) DO NOTHING;`);
}

const finalSql = sqlStatements.join('\n');
writeFileSync('scripts/seed_data.sql', finalSql, 'utf-8');
console.log(`Generated scripts/seed_data.sql with ${sqlStatements.length} statements.`);
