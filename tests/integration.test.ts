import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const base = process.env.TEST_BASE_URL ?? 'http://localhost:8080';
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname))
  throw new Error('Integration tests are destructive fixtures: local Compose only.');
const docker = (args: string[]) => execFileSync('docker', args, { encoding: 'utf8', timeout: 90000, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const sql = (query: string) => docker(['compose', 'exec', '-T', 'db', 'psql', '-U', 'kvarta', '-d', 'kvarta', '-t', '-A', '-c', query]);
const fixture = (phone = '+375291111110') => ({ name: '__KVARTA_TEST__', phone, interest: 'one_time', product: 'ethiopia', comment: 'integration fixture', attribution: { landingUrl: 'https://example.test/?utm_source=instagram&utm_content=ad-7&yclid=click-1', referrer: 'https://instagram.com/', submissionUrl: 'https://example.test/#application', utm_source: 'instagram', utm_content: 'ad-7', yclid: 'click-1' } });
const post = (data: unknown) => fetch(base + '/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
const cleanup = () => sql("DELETE FROM leads WHERE name='__KVARTA_TEST__'");
async function waitHealthy() {
  const until = Date.now() + 60000;
  while (Date.now() < until) {
    try {
      if ((await fetch(base + '/api/health')).ok)
        return;
    }
    catch { }
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error('Compose API did not become healthy');
}
before(async () => { await waitHealthy(); cleanup(); });
after(() => { cleanup(); });
test('new, duplicate and exact stored attribution', async () => {
  let response = await post(fixture());
  assert.equal(response.status, 201);
  assert.equal((await response.json()).accepted, true);
  response = await post({ ...fixture(), phone: '8 (029) 111-11-10' });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).duplicate, true);
  assert.equal(sql("SELECT count(*) FROM leads WHERE phone='+375291111110'"), '1');
  const stored = JSON.parse(sql("SELECT json_build_object('phone',phone,'attribution',attribution) FROM leads WHERE phone='+375291111110'"));
  assert.equal(stored.phone, '+375291111110');
  assert.deepEqual(stored.attribution, fixture().attribution);
});
test('server rejects invalid phones, foreign phones and malformed/oversized input', async () => {
  for (const phone of ['123', '+79991234567', '+375111234567'])
    assert.equal((await post({ ...fixture(), phone })).status, 400);
  assert.equal((await post({ ...fixture(), name: ' ' })).status, 400);
  assert.equal((await post({ ...fixture(), comment: 'x'.repeat(17000) })).status, 413);
  const response = await fetch(base + '/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' });
  assert.equal(response.status, 400);
});
test('parallel requests and lost-response retry create one row', async () => {
  const data = fixture('+375291111111');
  const responses = await Promise.all(Array.from({ length: 24 }, () => post(data)));
  assert.equal(responses.filter(r => r.status === 201).length, 1);
  assert.equal(responses.filter(r => r.status === 200).length, 23);
  assert.equal((await post(data)).status, 200);
  assert.equal(sql("SELECT count(*) FROM leads WHERE phone='+375291111111'"), '1');
});
test('rolling window expiry and distinct phones remain independent', async () => {
  sql("UPDATE leads SET created_at=clock_timestamp()-interval '10 minutes 1 second' WHERE phone='+375291111111'");
  assert.equal((await post(fixture('+375291111111'))).status, 201);
  assert.equal((await post(fixture('+375291111112'))).status, 201);
  assert.equal(sql("SELECT count(*) FROM leads WHERE phone='+375291111111'"), '2');
});
test('two API containers share the phone lock', async () => {
  let probeStarted = false;
  try {
    docker(['compose', 'run', '-d', '--no-deps', '--name', 'kvarta-api-probe', 'api']);
    probeStarted = true;
    const script = `
      const probe='http://kvarta-api-probe:3000';
      const until=Date.now()+45000;
      while(true){try{if((await fetch(probe+'/api/health')).ok)break;}catch{}if(Date.now()>until)throw Error('probe unavailable');await new Promise(r=>setTimeout(r,500));}
      const body=${JSON.stringify(fixture('+375291111113'))};
      const statuses=await Promise.all(Array.from({length:24},async(_,i)=>(await fetch((i%2?probe:'http://api:3000')+'/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})).status));
      console.log(JSON.stringify(statuses));`;
    const statuses = JSON.parse(docker(['compose', 'exec', '-T', 'api', 'node', '--input-type=module', '-e', script]));
    assert.equal(statuses.filter((s: number) => s === 201).length, 1);
    assert.equal(statuses.filter((s: number) => s === 200).length, 23);
    assert.equal(sql("SELECT count(*) FROM leads WHERE phone='+375291111113'"), '1');
  }
  finally {
    if (probeStarted)
      docker(['rm', '-f', 'kvarta-api-probe']);
  }
});
test('database outage returns 503 and recovery permits retry', async () => {
  try {
    docker(['compose', 'stop', 'db']);
    assert.equal((await post(fixture('+375291111114'))).status, 503);
    assert.equal((await fetch(base + '/api/health')).status, 503);
  }
  finally {
    docker(['compose', 'start', 'db']);
    await waitHealthy();
  }
  assert.equal((await post(fixture('+375291111114'))).status, 201);
});
