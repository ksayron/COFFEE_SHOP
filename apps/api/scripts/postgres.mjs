import pg from 'pg';
import { Pool as NeonPool, Client as NeonClient, neonConfig } from '@neondatabase/serverless';
import WebSocket from 'ws';
import { attachDatabasePool } from '@vercel/functions';

neonConfig.webSocketConstructor = WebSocket;
const isNeon = connectionString => new URL(connectionString).hostname.endsWith('.neon.tech');

// Both drivers expose these SQL methods; use their common surface rather than
// combining their distinct sets of TypeScript query overloads.
/** @typedef {{ query(sql: string, values?: unknown[]): Promise<import('pg').QueryResult> }} Queryable */
/** @typedef {Queryable & { release(): void }} DatabaseClient */
/** @typedef {Queryable & { connect(): Promise<DatabaseClient>, on(event: string, listener: (...args: unknown[]) => void): unknown, end(): Promise<void> }} DatabasePool */

/**
 * @param {import('pg').PoolConfig & {connectionString: string}} config
 * @returns {DatabasePool}
 */
export function createPool(config) {
  // Secure WebSockets preserve interactive transactions when TCP 5432 is blocked.
  if (isNeon(config.connectionString) && !process.env.VERCEL) return new NeonPool(config);
  const url = new URL(config.connectionString);
  if (isNeon(config.connectionString) && url.searchParams.get('sslmode') === 'require') {
    url.searchParams.set('sslmode', 'verify-full');
  }
  const pool = new pg.Pool({ ...config, connectionString: url.toString() });
  if (process.env.VERCEL) attachDatabasePool(pool);
  return pool;
}

/** @param {import('pg').ClientConfig & {connectionString: string}} config */
export function createClient(config) {
  return isNeon(config.connectionString) ? new NeonClient(config) : new pg.Client(config);
}
