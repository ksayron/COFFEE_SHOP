import type { Lead } from '@kvarta/shared';
import { pool } from './db';
export async function saveLead(lead: Lead): Promise<{
  duplicate: boolean;
}> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // A transaction-scoped lock serialises all instances for this phone only.
    // Hash collisions merely serialize unrelated phones; equality check stays exact.
    await client.query('SELECT pg_advisory_xact_lock(hashtextextended($1, 0))', [lead.phone]);
    // clock_timestamp (rather than transaction start time) measures after waiting.
    const recent = await client.query("SELECT id FROM leads WHERE phone = $1 AND created_at > clock_timestamp() - interval '10 minutes' LIMIT 1", [lead.phone]);
    if (recent.rowCount) {
      await client.query('COMMIT');
      return { duplicate: true };
    }
    await client.query('INSERT INTO leads (name, phone, interest, comment, product, attribution) VALUES ($1,$2,$3,$4,$5,$6)', [lead.name, lead.phone, lead.interest, lead.comment, lead.product, JSON.stringify(lead.attribution)]);
    await client.query('COMMIT');
    return { duplicate: false };
  }
  catch (error) {
    await client.query('ROLLBACK').catch(() => { });
    throw error;
  }
  finally {
    client.release();
  }
}
