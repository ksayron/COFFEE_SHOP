import { createPool } from '../scripts/postgres.mjs';
type DatabasePool = ReturnType<typeof createPool>;
const globalDb = globalThis as unknown as {
  kvartaPool?: DatabasePool;
};
// Initialize on the first request so production builds need no DB credentials.
export function database(): DatabasePool {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required for the API');
  if (globalDb.kvartaPool) return globalDb.kvartaPool;
  const pool = createPool({
    connectionString: process.env.DATABASE_URL,
    // Neon may need a few seconds to wake a suspended compute.
    max: 5, connectionTimeoutMillis: 10000, idleTimeoutMillis: 10000,
    statement_timeout: 5000, application_name: 'kvarta-api',
  });
  pool.on('error', () => console.error(JSON.stringify({ event: 'database_pool_error' })));
  globalDb.kvartaPool = pool;
  return pool;
}
