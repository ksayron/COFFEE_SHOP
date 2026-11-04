import assert from 'node:assert/strict';
import { randomInt, randomUUID } from 'node:crypto';
import { chromium } from '@playwright/test';
import { createRequire } from 'node:module';
import { mkdir, writeFile, unlink } from 'node:fs/promises';
const { neon } = createRequire(new URL('../apps/api/package.json', import.meta.url))('@neondatabase/serverless');

const base = process.env.TEST_BASE_URL ?? 'http://127.0.0.1:4173';
const target = new URL(base);
const local = ['localhost', '127.0.0.1'].includes(target.hostname);
assert.ok(local || (target.protocol === 'https:' && process.env.TEST_ALLOW_REMOTE === target.origin && base === target.origin),
  'Remote verification requires TEST_ALLOW_REMOTE set to the exact HTTPS TEST_BASE_URL');
assert.ok(process.env.DATABASE_URL, 'DATABASE_URL must be loaded from the root env file');
assert.ok(new URL(process.env.DATABASE_URL).hostname.endsWith('.neon.tech'), 'Expected a Neon database');
// Verification reads and fixture cleanup are independent queries, so HTTP is
// sufficient here; the app's transactional write path is tested through its API.
const db = { query: async (text, values = []) => {
  for (let attempt = 0; ; attempt++) {
    try {
      return await neon(process.env.DATABASE_URL, {
        fullResults: true, fetchOptions: { signal: AbortSignal.timeout(15000) },
      }).query(text, values);
    } catch (error) {
      // Only verification reads and idempotent fixture deletes use this helper.
      if (attempt === 2 || !error.sourceError) throw error;
      await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }
} };
const name = `__NEON_E2E_${randomUUID()}__`;
const fixtureFile = new URL(`../.local/${name}.json`, import.meta.url);
let phone;
let browser;
let verificationError;
try { await db.query('SELECT 1'); }
catch {
  console.error('FAIL Neon verification database connection unavailable; no fixture was written.');
  process.exit(1);
}
try {
  // Choose an unused synthetic phone; never modify a pre-existing enquiry.
  do {
    phone = `+37529${randomInt(1000000, 10000000)}`;
  } while ((await db.query('SELECT 1 FROM leads WHERE phone=$1', [phone])).rowCount);
  await mkdir(new URL('../.local/', import.meta.url), { recursive: true });
  await writeFile(fixtureFile, JSON.stringify({ name, phone }));
  const health = await fetch(`${base}/api/health`);
  assert.equal(health.status, 200);
  assert.equal((await health.json()).status, 'ok');
  console.log('PASS /api/health -> HTTP 200 (Next.js -> Neon Postgres)');

  browser = await chromium.launch({ headless: true,
    ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}),
    args: ['--disable-quic', ...(process.env.PLAYWRIGHT_HOST_RULES ? ['--host-resolver-rules=' + process.env.PLAYWRIGHT_HOST_RULES] : [])],
  });
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(60000);
  const sourceUrl = `${base}/?utm_source=neon-e2e&utm_campaign=${encodeURIComponent(name)}#application`;
  await page.goto(sourceUrl, { waitUntil: 'commit' });
  await page.locator('#phone').waitFor({ timeout: 60000 });
  const submit = async () => {
    await page.getByLabel('Ваше имя', { exact: false }).fill(name);
    await page.getByLabel('Телефон', { exact: false }).fill(phone);
    await page.getByLabel('Комментарий', { exact: false }).fill('Synthetic Neon verification; automatically removed.');
    const response = page.waitForResponse(r => r.url().endsWith('/api/lead') && r.request().method() === 'POST');
    await page.getByRole('button', { name: 'Оставить заявку', exact: true }).click();
    return await response;
  };
  const response = await submit();
  assert.equal(response.status(), 201);
  assert.deepEqual(await response.json(), { accepted: true, duplicate: false });
  await page.getByRole('heading', { name: 'Спасибо, заявка у нас.', exact: true }).waitFor();
  const result = await db.query('SELECT phone, interest, comment, attribution FROM leads WHERE name=$1 AND phone=$2', [name, phone]);
  assert.equal(result.rowCount, 1);
  assert.equal(result.rows[0].phone, phone);
  assert.equal(result.rows[0].interest, 'subscription');
  assert.equal(result.rows[0].attribution.utm_source, 'neon-e2e');
  assert.equal(result.rows[0].attribution.utm_campaign, name);
  assert.equal(result.rows[0].attribution.landingUrl, sourceUrl);
  console.log('PASS browser form -> HTTP 201 -> success UI -> exact row + attribution read back from Neon');

  await page.reload({ waitUntil: 'commit' });
  await page.locator('#phone').waitFor({ timeout: 60000 });
  const duplicate = await submit();
  assert.equal(duplicate.status(), 200);
  assert.deepEqual(await duplicate.json(), { accepted: true, duplicate: true });
  await page.getByRole('heading', { name: 'Заявка уже у нас.', exact: true }).waitFor();
  console.log('PASS browser retry -> HTTP 200 duplicate -> duplicate success UI');

  const payload = { name, phone, interest: 'subscription', comment: result.rows[0].comment, attribution: result.rows[0].attribution };
  const post = data => fetch(`${base}/api/lead`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
  // Removing only this run's row lets parallel requests exercise first-insert locking.
  await db.query('DELETE FROM leads WHERE name=$1 AND phone=$2', [name, phone]);
  const statuses = await Promise.all(Array.from({ length: 8 }, async () => (await post(payload)).status));
  console.log('Concurrent submission statuses:', statuses.join(', '));
  assert.equal(statuses.filter(s => s === 201).length, 1);
  assert.equal(statuses.filter(s => s === 200).length, 7);
  assert.equal((await db.query('SELECT count(*)::int AS n FROM leads WHERE name=$1 AND phone=$2', [name, phone])).rows[0].n, 1);
  console.log('PASS 8 concurrent submissions -> 1 HTTP 201 + 7 HTTP 200 -> exactly 1 Neon row');
  assert.equal((await post({ ...payload, phone: '+79991234567' })).status, 400);
  console.log('PASS invalid phone -> HTTP 400');
} catch (error) {
  verificationError = error;
  throw error;
} finally {
  await browser?.close();
  if (phone) {
    try {
      await db.query('DELETE FROM leads WHERE name=$1 AND phone=$2', [name, phone]);
      assert.equal((await db.query('SELECT count(*)::int AS n FROM leads WHERE name=$1 AND phone=$2', [name, phone])).rows[0].n, 0);
      await unlink(fixtureFile).catch(() => {});
      console.log('PASS synthetic fixture cleanup -> 0 rows remaining');
    } catch (error) {
      console.error(`FAIL synthetic cleanup; exact fixture retained in ${fixtureFile.pathname}`);
      if (!verificationError) throw error;
    }
  }
}
