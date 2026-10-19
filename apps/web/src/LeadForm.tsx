import { useEffect, useRef, useState, type FormEvent } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { ArrowRightIcon, CheckIcon, ReloadIcon, Cross2Icon } from '@radix-ui/react-icons';
import { leadSchema, normalizePhone, products, type Interest, type ProductId } from '@kvarta/shared';
import { attribution } from './attribution';
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
    return <div className="success-panel" tabIndex={-1} ref={successRef} role="status">
      <CheckIcon className="success-mark" />
      <h3>
        {duplicate ? 'Заявка уже у нас.' : 'Спасибо, заявка у нас.'}
      </h3>
      <p>
        {duplicate ? 'Повторную заявку не создали. Менеджер свяжется с вами, чтобы обсудить детали.' : 'Менеджер свяжется с вами, чтобы уточнить кофе, доставку и удобное время.'}
      </p>
      <button className="text-link" onClick={() => { setStatus('idle'); setName(''); setPhone(''); setComment(''); setProduct(null); }}>Вернуться к форме <ArrowRightIcon /></button>
    </div>;
  return <form onSubmit={submit} noValidate ref={formRef} aria-busy={status === 'pending'}>
    <fieldset disabled={status === 'pending'} className="interest-fieldset">
      <legend>Что вас интересует?</legend>
      <RadioGroup.Root className="interest-options" value={interest} onValueChange={value => {
        setInterest(value as Interest);
        if (value !== 'one_time')
          setProduct(null);
      }} aria-label="Что вас интересует?">
        {interests.map(item => <label className="interest-option" key={item.value}>
          <RadioGroup.Item className="radio" value={item.value} aria-label={item.label}>
            <RadioGroup.Indicator className="radio-indicator" />
          </RadioGroup.Item>
          {item.label}
        </label>)}
      </RadioGroup.Root>
    </fieldset>
    {chosen && <div className="selected-product">В заявке: {chosen.name}<button type="button" disabled={status === 'pending'} onClick={() => setProduct(null)} aria-label="Убрать выбранный кофе">
      <Cross2Icon />
    </button></div>}
    <div className="form-pair">
      <div className="field">
        <label htmlFor="name">Ваше имя <span>обязательно</span></label>
        <input id="name" name="name" autoComplete="given-name" maxLength={80} value={name} onChange={event => { setName(event.target.value); clearError('name'); }} disabled={status === 'pending'} required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
        {errors.name && <p id="name-error" className="field-error">
          {errors.name}
        </p>}
      </div>
      <div className="field">
        <label htmlFor="phone">Телефон <span>обязательно</span></label>
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+375 29 123-45-67" maxLength={40} value={phone} onChange={event => { setPhone(event.target.value); clearError('phone'); }} onBlur={() => {
          if (phone && !normalizePhone(phone))
            setErrors(previous => ({ ...previous, phone: 'Нужен белорусский номер: +375 29 123-45-67' }));
        }} disabled={status === 'pending'} required aria-invalid={!!errors.phone} aria-describedby={`phone-hint${errors.phone ? ' phone-error' : ''}`} />
        <p id="phone-hint" className="field-hint">Белорусский номер с кодом +375</p>
        {errors.phone && <p id="phone-error" className="field-error">
          {errors.phone}
        </p>}
      </div>
    </div>
    <div className="field comment-field">
      <label htmlFor="comment">Комментарий <span>если хочется</span></label>
      <textarea id="comment" name="comment" rows={3} maxLength={1000} value={comment} onChange={event => { setComment(event.target.value); clearError('comment'); }} placeholder="Как готовите кофе? Что любите во вкусе?" disabled={status === 'pending'} aria-invalid={!!errors.comment} aria-describedby={errors.comment ? 'comment-error' : undefined} />
      {errors.comment && <p id="comment-error" className="field-error">
        {errors.comment}
      </p>}
    </div>
    {status === 'error' && <div className="form-error" role="alert">
      <strong>Пока не получилось отправить</strong>
      <p>
        {message}
      </p>
    </div>}
    <div className="form-submit">
      <button className="button" type="submit" disabled={status === 'pending'}>
        {status === 'pending' ? 'Отправляем…' : status === 'error' ? 'Попробовать ещё раз' : 'Оставить заявку'}
        {status === 'pending' ? <ReloadIcon /> : <ArrowRightIcon />}
      </button>
      <p>Перезвоним и всё уточним.<br />Оплачивать сейчас ничего не нужно.</p>
    </div>
  </form>;
}
