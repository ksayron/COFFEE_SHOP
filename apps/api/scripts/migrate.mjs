import { createClient } from './postgres.mjs';
import { readdir, readFile } from 'node:fs/promises';
if (!process.env.DATABASE_URL && !process.env.DATABASE_URL_UNPOOLED) throw new Error('DATABASE_URL is required for migrations');
const client = createClient({connectionString:process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL,connectionTimeoutMillis:15000});
await client.connect();
try {
  await client.query('BEGIN');
  await client.query('SELECT pg_advisory_xact_lock(704219)');
  await client.query('CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())');
  const directory = new URL('../migrations/',import.meta.url);
  for (const name of (await readdir(directory)).filter(n=>n.endsWith('.sql')).sort()) {
    const applied = await client.query('SELECT name FROM schema_migrations WHERE name=$1',[name]);
    if (!applied.rowCount) {
      await client.query(await readFile(new URL(name,directory),'utf8'));
      await client.query('INSERT INTO schema_migrations(name) VALUES($1)',[name]);
      console.log(`Applied migration ${name}`);
    }
  }
  await client.query('COMMIT');
  console.log('Database migrations up to date.');
} catch(error) {
  await client.query('ROLLBACK').catch(()=>{});
  console.error('Migration failed; database unchanged.'); process.exitCode=1;
} finally {await client.end();}
