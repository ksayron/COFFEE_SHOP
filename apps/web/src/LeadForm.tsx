import { useEffect, useRef, useState, type FormEvent } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { ArrowRightIcon, CheckIcon, ReloadIcon, Cross2Icon } from '@radix-ui/react-icons';
import { leadSchema, normalizePhone, formatPhoneInput, PHONE_INPUT_MAX_LENGTH, products, type Interest, type ProductId } from '@kvarta/shared';
import { attribution } from './attribution';
import s from './LeadForm.module.css';
export type Selection = {
  interest: Interest;
  product: ProductId | null;
  revision: number;
};
const interests: {
  value: Interest;
  label: string;
}[] = [{ value: 'subscription', label: 'Подписка' }, { value: 'one_time', label: 'Разовый заказ' }, { value: 'question', label: 'Вопрос' }];
export function LeadForm({ selection }: {
  selection: Selection;
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [interest, setInterest] = useState<Interest>(selection.interest);
  const [product, setProduct] = useState<ProductId | null>(selection.product);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'pending' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const [duplicate, setDuplicate] = useState(false);
  const pending = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => { attribution(); return () => abortRef.current?.abort(); }, []);
  useEffect(() => {
    if (!pending.current) {
      setInterest(selection.interest);
      setProduct(selection.product);
      setStatus('idle');
      setMessage('');
    }
  }, [selection]);
  useEffect(() => {
    if (status === 'success')
      successRef.current?.focus();
  }, [status]);
  const clearError = (field: string) => setErrors(previous => { const next = { ...previous }; delete next[field]; return next; });
  function updatePhone(raw: string, input: HTMLInputElement, caret: number, inputType = '') {
    // Deleting a generated space should also remove the adjacent digit, so
    // Backspace/Delete never get stuck at a formatting boundary.
    if (inputType.startsWith('delete') && raw !== phone && raw.replace(/\D/g, '').length === phone.replace(/\D/g, '').length) {
      const backward = inputType === 'deleteContentBackward';
      for (let index = backward ? caret - 1 : caret; index >= 0 && index < raw.length; index += backward ? -1 : 1) {
        if (/\d/.test(raw[index])) {
          raw = raw.slice(0, index) + raw.slice(index + 1);
          if (backward) caret--;
          break;
        }
      }
    }
    const formatted = formatPhoneInput(raw);
    const position = Math.min(formatPhoneInput(raw.slice(0, caret)).length, formatted.length);
    setPhone(formatted);
    clearError('phone');
    requestAnimationFrame(() => {
      if (document.activeElement === input && !input.disabled) input.setSelectionRange(position, position);
    });
  }
  function focusError(fields: Record<string, string>) {
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(fields)[0]}"]`)?.focus());
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (pending.current)
      return;
    const parsed = leadSchema.safeParse({ name, phone, interest, product, comment, attribution: attribution() });
    if (!parsed.success) {
      const fields = Object.fromEntries(parsed.error.issues.map(issue => [issue.path[0], issue.message]));
      setErrors(fields);
      focusError(fields);
      return;
    }
    pending.current = true;
    setStatus('pending');
    setMessage('');
    setErrors({});
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(parsed.data), signal: controller.signal });
      const body = await response.json().catch(() => null);
      if (!response.ok || body?.accepted !== true) {
        if (body?.fields) {
          setErrors(body.fields);
          focusError(body.fields);
        }
        throw new Error(body?.message || 'Сервис временно недоступен. Данные остались в форме. Попробуйте ещё раз через минуту.');
      }
      setDuplicate(body.duplicate === true);
      setStatus('success');
    }
    catch (error) {
      setStatus('error');
      setMessage(error instanceof Error && error.name !== 'AbortError' && error.message !== 'Failed to fetch'
        ? error.message : 'Связь прервалась. Данные остались в форме. Проверьте интернет и отправьте ещё раз: повторной заявки не будет.');
    }
    finally {
      clearTimeout(timeout);
      pending.current = false;
      abortRef.current = null;
    }
  }
  const chosen = products.find(item => item.id === product);
  if (status === 'success')
    return <div className={s.successPanel} tabIndex={-1} ref={successRef} role="status">
      <CheckIcon className={s.successMark} />
      <h3>
        {duplicate ? 'Заявка уже у нас.' : 'Спасибо, заявка у нас.'}
      </h3>
      <p>
        {duplicate ? 'Повторную заявку не создали. Менеджер свяжется с вами, чтобы обсудить детали.' : 'Менеджер свяжется с вами, чтобы уточнить кофе, доставку и удобное время.'}
      </p>
      <button className={s.textLink} onClick={() => { setStatus('idle'); setName(''); setPhone(''); setComment(''); setProduct(null); }}>Вернуться к форме <ArrowRightIcon /></button>
    </div>;
  return <form onSubmit={submit} noValidate ref={formRef} aria-busy={status === 'pending'}>
    <fieldset disabled={status === 'pending'} className={s.interestFieldset}>
      <legend>Что вас интересует?</legend>
      <RadioGroup.Root className={s.interestOptions} value={interest} onValueChange={value => {
        setInterest(value as Interest);
        if (value !== 'one_time')
          setProduct(null);
      }} aria-label="Что вас интересует?">
        {interests.map(item => <label className={s.interestOption} key={item.value}>
          <RadioGroup.Item className={s.radio} value={item.value} aria-label={item.label}>
            <RadioGroup.Indicator className={s.radioIndicator} />
          </RadioGroup.Item>
          {item.label}
        </label>)}
      </RadioGroup.Root>
    </fieldset>
    {chosen && <div className={s.selectedProduct}>В заявке: {chosen.name}<button type="button" disabled={status === 'pending'} onClick={() => setProduct(null)} aria-label="Убрать выбранный кофе">
      <Cross2Icon />
    </button></div>}
    <div className={s.formPair}>
      <div className={s.field}>
        <label htmlFor="name">Ваше имя <span>обязательно</span></label>
        <input id="name" name="name" autoComplete="given-name" maxLength={80} value={name} onChange={event => { setName(event.target.value); clearError('name'); }} disabled={status === 'pending'} required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
        {errors.name && <p id="name-error" className={s.fieldError}>
          {errors.name}
        </p>}
      </div>
      <div className={s.field}>
        <label htmlFor="phone">Телефон <span>обязательно</span></label>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+375 29 123 45 67" maxLength={PHONE_INPUT_MAX_LENGTH} value={phone} onChange={event => {
          const input = event.currentTarget;
          updatePhone(input.value, input, input.selectionStart ?? input.value.length, (event.nativeEvent as InputEvent).inputType);
        }} onPaste={event => {
          // Format the full clipboard value before the native length limit can
          // truncate a longer domestic notation such as 8 (029) 123-45-67.
          event.preventDefault();
          const input = event.currentTarget;
          const start = input.selectionStart ?? 0;
          const end = input.selectionEnd ?? start;
          const pasted = event.clipboardData.getData('text');
          updatePhone(input.value.slice(0, start) + pasted + input.value.slice(end), input, start + pasted.length);
        }} onBlur={() => {
          const normalized = normalizePhone(phone);
          if (normalized) setPhone(formatPhoneInput(normalized));
          else if (phone)
            setErrors(previous => ({ ...previous, phone: 'Нужен белорусский номер: +375 29 123 45 67' }));
        }} disabled={status === 'pending'} required aria-invalid={!!errors.phone} aria-describedby={`phone-hint${errors.phone ? ' phone-error' : ''}`} />
        <p id="phone-hint" className={s.fieldHint}>Формат: +375 29 123 45 67</p>
        {errors.phone && <p id="phone-error" className={s.fieldError}>
          {errors.phone}
        </p>}
      </div>
    </div>
    <div className={[s.field, s.commentField].join(' ')}>
      <label htmlFor="comment">Комментарий <span>если хочется</span></label>
      <textarea id="comment" name="comment" rows={3} maxLength={1000} value={comment} onChange={event => { setComment(event.target.value); clearError('comment'); }} placeholder="Как готовите кофе? Что любите во вкусе?" disabled={status === 'pending'} aria-invalid={!!errors.comment} aria-describedby={errors.comment ? 'comment-error' : undefined} />
      {errors.comment && <p id="comment-error" className={s.fieldError}>
        {errors.comment}
      </p>}
    </div>
    {status === 'error' && <div className={s.formError} role="alert">
      <strong>Пока не получилось отправить</strong>
      <p>
        {message}
      </p>
    </div>}
    <div className={s.formSubmit}>
      <button className={s.button} type="submit" disabled={status === 'pending'}>
        {status === 'pending' ? 'Отправляем…' : status === 'error' ? 'Попробовать ещё раз' : 'Оставить заявку'}
        {status === 'pending' ? <ReloadIcon /> : <ArrowRightIcon />}
      </button>
      <p>Перезвоним и всё уточним.<br />Оплачивать сейчас ничего не нужно.</p>
    </div>
  </form>;
}
