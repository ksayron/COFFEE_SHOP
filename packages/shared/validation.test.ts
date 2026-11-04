import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizePhone, leadSchema } from './index';
test('Belarus formats normalise to the same phone', () => {
  for (const value of ['+375 29 123-45-67', '375291234567', '8 (029) 123-45-67', '0291234567']) {
    assert.equal(normalizePhone(value), '+375291234567', value);
  }
});
test('invalid and foreign phones are rejected', () => {
  for (const value of ['+7 999 1234567', '123', '+375 11 1234567', 'call +375291234567', '+375291234567 ext123', '++375291234567', '']) {
    assert.equal(normalizePhone(value), null, value);
  }
});
test('server contract validates and strips unknown fields', () => {
  const data = { name: '  Тест  ', phone: '+375291234567', interest: 'one_time', attribution: { landingUrl: 'https://example.com/?utm_source=ad', referrer: '', submissionUrl: 'https://example.com/' }, junk: 'ignored' };
  const lead = leadSchema.parse(data);
  assert.equal(lead.name, 'Тест');
  assert.equal(lead.comment, '');
  assert.equal(lead.product, null);
  assert.equal('junk' in lead, false);
  assert.equal(leadSchema.safeParse({ ...data, name: ' ' }).success, false);
  assert.equal(leadSchema.safeParse({ ...data, interest: 'other' }).success, false);
  assert.equal(leadSchema.safeParse({ ...data, attribution: { ...data.attribution, landingUrl: 'javascript:alert(1)' } }).success, false);
});
