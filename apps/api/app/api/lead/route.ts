import { NextResponse } from 'next/server';
import { leadSchema } from '@kvarta/shared';
import { saveLead } from '../../../src/leads';
export const runtime = 'nodejs';
const MAX_BYTES = 16 * 1024;
const headers = { 'Cache-Control': 'no-store' };
const json = (body: unknown, status: number) => NextResponse.json(body, { status, headers });
async function readBounded(request: Request): Promise<string> {
  if (Number(request.headers.get('content-length')) > MAX_BYTES)
    throw new Error('too_large');
  const reader = request.body?.getReader();
  if (!reader)
    return '';
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = '';
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done)
        break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_BYTES) {
        await reader.cancel();
        throw new Error('too_large');
      }
      text += decoder.decode(chunk.value, { stream: true });
    }
    return text + decoder.decode();
  }
  finally {
    reader.releaseLock();
  }
}
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '').split(',').filter(Boolean);
  // Browsers use same-origin /api. Explicit list handles the Vercel reverse proxy.
  if (origin && origin !== new URL(request.url).origin && !allowedOrigins.includes(origin)) {
    return json({ message: 'Отправьте заявку через форму на сайте.' }, 403);
  }
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return json({ message: 'Нужны данные в формате JSON.' }, 400);
  }
  let raw: unknown;
  try {
    raw = JSON.parse(await readBounded(request));
  }
  catch {
    return json({ message: 'Не удалось прочитать заявку. Проверьте данные и попробуйте ещё раз.' }, 400);
  }
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fields = Object.fromEntries(parsed.error.issues.map(issue => [issue.path[0], issue.message]));
    return json({ message: 'Проверьте поля формы.', fields }, 400);
  }
  try {
    const result = await saveLead(parsed.data);
    return json({ accepted: true, duplicate: result.duplicate }, result.duplicate ? 200 : 201);
  }
  catch {
    console.error(JSON.stringify({ event: 'lead_storage_unavailable' }));
    return json({ message: 'Не удалось сохранить заявку. Данные остались в форме. Попробуйте ещё раз через минуту.' }, 503);
  }
}
