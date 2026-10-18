import { parsePhoneNumberFromString } from 'libphonenumber-js/max';
import { z } from 'zod';

export const products = [
  { id: 'ethiopia', name: 'Эфиопия Иргачеффе', notes: 'Цветы, бергамот', detail: 'Светлая обжарка', weight: '250 г', price: 32 },
  { id: 'colombia', name: 'Колумбия Уила', notes: 'Карамель, красное яблоко', detail: 'Для неспешного утра', weight: '250 г', price: 29 },
  { id: 'brazil', name: 'Бразилия Серрадо', notes: 'Орех, шоколад', detail: 'Под эспрессо', weight: '250 г', price: 26 },
  { id: 'drips', name: 'Дрип-пакеты, ассорти', notes: 'Любимый кофе, где угодно', detail: 'Нужны только чашка и вода', weight: '10 штук', price: 18 },
] as const;

export function normalizePhone(raw: string): string | null {
  if (!/^[+\d\s().-]+$/.test(raw) || raw.length > 40) return null;
  // The conventional Belarus domestic trunk prefix is 8 0xx.
  const digits = raw.replace(/\D/g, '');
  const candidate = digits.length === 11 && digits.startsWith('80')
    ? '+375' + digits.slice(2)
    : raw;
  const phone = parsePhoneNumberFromString(candidate, 'BY');
  return phone?.country === 'BY' && phone.isValid() ? phone.number : null;
}

const url = z.string().max(2048).refine(value => {
  try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; }
}, 'Некорректная ссылка');
const attributionSchema = z.object({
  landingUrl: url,
  referrer: z.union([url, z.literal('')]),
  submissionUrl: url,
  utm_source: z.string().max(256).optional(),
  utm_medium: z.string().max(256).optional(),
  utm_campaign: z.string().max(256).optional(),
  utm_term: z.string().max(256).optional(),
  utm_content: z.string().max(256).optional(),
  yclid: z.string().max(256).optional(),
  gclid: z.string().max(256).optional(),
  fbclid: z.string().max(256).optional(),
});
export const leadSchema = z.object({
  name: z.string().trim().min(1, 'Как к вам обращаться?').max(80, 'Не больше 80 символов'),
  phone: z.string().transform((raw, ctx) => {
    const phone = normalizePhone(raw);
    if (!phone) { ctx.addIssue({ code: 'custom', message: 'Введите белорусский номер, например +375 29 123-45-67' }); return z.NEVER; }
    return phone;
  }),
  interest: z.enum(['subscription', 'one_time', 'question'], {error: 'Выберите, что вас интересует'}),
  comment: z.string().trim().max(1000, 'Не больше 1000 символов').default(''),
  product: z.enum(['ethiopia', 'colombia', 'brazil', 'drips']).nullable().default(null),
  attribution: attributionSchema,
});
export type Lead = z.infer<typeof leadSchema>;
export type Interest = Lead['interest'];
export type ProductId = NonNullable<Lead['product']>;
export type Attribution = Lead['attribution'];
export const attributionKeys = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','yclid','gclid','fbclid'] as const;
