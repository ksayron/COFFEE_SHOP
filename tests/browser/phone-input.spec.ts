import { test, expect } from '@playwright/test';

test.use({ channel: process.env.PLAYWRIGHT_CHANNEL ?? 'msedge', launchOptions: { args: ['--disable-quic',
  ...(process.env.PLAYWRIGHT_HOST_RULES ? ['--host-resolver-rules=' + process.env.PLAYWRIGHT_HOST_RULES] : []),
] } });
test.setTimeout(60000);
test.beforeEach(async ({ page }) => { await page.goto('/#application', { waitUntil: 'domcontentloaded' }); });

test('typing adds spaces, ignores letters and caps a complete Belarus number', async ({ page }) => {
  const phone = page.getByRole('textbox', { name: /Телефон/ });
  await phone.pressSequentially('375291234567', { delay: 25 });
  await expect(phone).toHaveValue('+375 29 123 45 67');
  await expect(phone).toHaveAttribute('maxlength', '17');
  await phone.pressSequentially('890abc');
  await expect(phone).toHaveValue('+375 29 123 45 67');
  await phone.press('ControlOrMeta+A');
  await phone.press('Backspace');
  await expect(phone).toHaveValue('');
});

test('pasting domestic notation preserves every digit before formatting', async ({ page }) => {
  const phone = page.getByRole('textbox', { name: /Телефон/ });
  await phone.focus();
  await phone.evaluate(input => {
    const clipboard = new DataTransfer();
    clipboard.setData('text/plain', '8 (029) 123-45-67');
    input.dispatchEvent(new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: clipboard }));
  });
  await expect(phone).toHaveValue('+375 29 123 45 67');
});

test('middle edits retain the cursor and Backspace crosses generated spaces', async ({ page }) => {
  const phone = page.getByRole('textbox', { name: /Телефон/ });
  await phone.fill('+375291234567');
  await phone.evaluate(input => (input as HTMLInputElement).setSelectionRange(9, 10));
  await phone.pressSequentially('8');
  await expect(phone).toHaveValue('+375 29 183 45 67');
  expect(await phone.evaluate(input => (input as HTMLInputElement).selectionStart)).toBe(10);
  await phone.fill('+375291234567');
  await phone.evaluate(input => (input as HTMLInputElement).setSelectionRange(12, 12));
  await phone.press('Backspace');
  await expect(phone).toHaveValue('+375 29 124 56 7');
});

test('national entry formats on blur and foreign numbers stay invalid', async ({ page }) => {
  const phone = page.getByRole('textbox', { name: /Телефон/ });
  await phone.pressSequentially('291234567', { delay: 25 });
  await expect(phone).toHaveValue('29 123 45 67');
  await phone.blur();
  await expect(phone).toHaveValue('+375 29 123 45 67');
  await phone.fill('+79991234567');
  await phone.blur();
  await expect(phone).toHaveValue('+7 999 123 45 67');
  await expect(page.locator('#phone-error')).toContainText('белорусский');
});
