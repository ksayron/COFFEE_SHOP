import pg from 'pg';
const globalDb = globalThis as unknown as { kvartaPool?: pg.Pool };
export const pool = globalDb.kvartaPool ?? new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5, connectionTimeoutMillis: 3000, idleTimeoutMillis: 10000,
  statement_timeout: 5000, application_name: 'kvarta-api',
});
globalDb.kvartaPool = pool;
pool.on('error', () => console.error(JSON.stringify({event:'database_pool_error'})));
