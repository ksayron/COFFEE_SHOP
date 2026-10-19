import { NextResponse } from 'next/server';
import { pool } from '../../../src/db';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    await pool.query('SELECT 1 FROM leads LIMIT 1');
    return NextResponse.json({ status: 'ok', service: 'kvarta-api' }, { headers: { 'Cache-Control': 'no-store' } });
  }
  catch {
    return NextResponse.json({ status: 'unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
