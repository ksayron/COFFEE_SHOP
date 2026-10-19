import { useState } from 'react';
import { ArrowRightIcon, ArrowTopRightIcon } from '@radix-ui/react-icons';
import { products, type Interest, type ProductId } from '@kvarta/shared';
import { ClubHero } from './components/ClubHero';
import club from './components/Club.module.css';
import { LeadForm, type Selection } from './LeadForm';
import s from './App.module.css';

export function App() {
  const [selection, setSelection] = useState<Selection>({ interest: 'subscription', product: null, revision: 0 });
  function choose(interest: Interest, product: ProductId | null = null) {
    setSelection(previous => ({ interest, product, revision: previous.revision + 1 }));
    requestAnimationFrame(() => {
      document.getElementById('application')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      document.getElementById('application-title')?.focus({ preventScroll: true });
    });
  }
  return <div className={s.page}>
    <a className={s.skipLink} href="#main">К содержимому</a>
    <header className={s.header}>
      <a className={club.brand} href="#" aria-label="Кварта, наверх">кварта<span>кофе для своих</span></a>
      <nav aria-label="Основная навигация"><a href="#coffee">Наш кофе</a><a href="#subscription">Подписка</a><a href="#visit">Как получить</a></nav>
      <a className={s.headerAction} href="#application">Будем пить кофе? <ArrowRightIcon /></a>
    </header>
    <main id="main">
      <ClubHero />
      <section className={s.story} aria-labelledby="story-title">
        <div><p className={s.eyebrow}>Аня + Дмитрий / Минск / с 2019</p><h2 id="story-title">Хорошее зерно.<br />Знакомые руки.</h2></div>
        <div className={s.storyCopy}><p>Привет! Мы Аня и Дмитрий. Раньше работали бариста, а потом открыли маленькую обжарку. Хотелось делать кофе, который самим приятно пить каждый день.</p><p>Обжариваем по 5 кг и не держим зерно про запас. Так к вам попадает свежий кофе — с тем самым ароматом, ради которого хочется задержаться на кухне.</p><span className={s.storySignoff}>Из нашей мастерской — в вашу чашку.</span></div>
      </section>
      <section className={s.catalog} id="coffee" aria-labelledby="coffee-title">
        <div className={s.sectionHeading}><div><p className={s.eyebrow}>С полки мастерской</p><h2 id="coffee-title">С чего ваше утро?</h2></div><p>Зерно для дома и офиса.<br />И дрипы, которые удобно взять с собой.</p></div>
        <div className={s.productGrid}>
          {products.map((product, index) => <article className={s.product} key={product.id}>
            <div className={s.productTop}><span>0{index + 1} / {product.id === 'drips' ? 'ДРИПЫ' : 'ЗЕРНО'}</span><span>{product.weight}</span></div>
            <h3>{product.name}</h3><p className={s.taste}>{product.notes}</p><p className={s.productDetail}>{product.detail}</p>
            <div className={s.productBottom}><strong>{product.price} <small>BYN</small></strong><button onClick={() => choose('one_time', product.id)} aria-label={`Заказать: ${product.name}`}>Попробовать <ArrowRightIcon /></button></div>
          </article>)}
        </div>
        <div className={s.help}><p>Не знаете, какой кофе выбрать?</p><button onClick={() => choose('question')}>Расскажите, как готовите. Подскажем. <ArrowRightIcon /></button></div>
      </section>
      <section className={s.subscription} id="subscription" aria-labelledby="subscription-title">
        <div className={s.subscriptionPoster}><p className={s.eyebrow}>Ваша ежемесячная встреча с кофе</p><div className={s.quantity}>2 × 250<span>г</span></div><p>Две пачки.<br />Один хороший повод проснуться.</p><span className={s.clubMark} aria-hidden="true">к.</span></div>
        <div className={s.subscriptionCopy}><p className={s.eyebrow}>Кофе по подписке</p><h2 id="subscription-title">Чтобы кофе<br />не кончался.</h2><p>Раз в месяц привозим две пачки по 250 г. Свежая обжарка и доставка по Минску уже внутри.</p><div className={s.subscriptionPrice}><strong>54 <span>BYN / мес</span></strong><span>Доставка<br />бесплатно</span></div><button className={s.pill} onClick={() => choose('subscription')}>Хочу подписку <ArrowRightIcon /></button><p className={s.smallPrint}>Какой кофе вам нравится и когда привезти —<br />обсудим по телефону. Оплата не нужна сейчас.</p></div>
      </section>
      <section className={s.visit} id="visit" aria-labelledby="visit-title">
        <div className={s.sectionHeading}><div><p className={s.eyebrow}>От нашей двери до вашей</p><h2 id="visit-title">Привезём.<br />Или заходите.</h2></div><p>Маленькая мастерская.<br />Рады каждому знакомству.</p></div>
        <div className={s.visitGrid}>
          <article><div className={s.visitTitle}><span className={s.dayStamp}>пт</span><h3>Пятница —<br />кофе у вас.</h3></div><p>Развозим по Минску по пятницам.<br />От 50 BYN доставка бесплатная.</p><p className={s.smallPrint}>Для заказа поменьше уточним стоимость,<br />когда будем созваниваться.</p></article>
          <article><div className={s.visitTitle}><span className={s.addressStamp}>9</span><h3>Самовывоз<br />из мастерской.</h3></div><p>Минск, ул. Короля, 9</p><dl className={s.hours}><div><dt>Пн–пт</dt><dd>8:00–20:00</dd></div><div><dt>Сб–вс</dt><dd>10:00–18:00</dd></div></dl><a href="https://yandex.by/maps/157/minsk/?text=Минск%2C%20улица%20Короля%2C%209" target="_blank" rel="noopener noreferrer">Открыть адрес на карте <ArrowTopRightIcon /></a></article>
        </div>
      </section>
      <section className={s.application} id="application" aria-labelledby="application-title">
        <div className={s.applicationIntro}><p className={s.eyebrow}>Давайте начнём с разговора</p><h2 id="application-title" tabIndex={-1}>Будем<br />пить кофе?</h2><p>Оставьте номер. Поможем выбрать зерно, оформим подписку или ответим на вопрос.</p><p>Менеджер перезвонит и всё уточнит.<br />Корзина и оплата сейчас не нужны.</p><span aria-hidden="true" className={s.applicationMark}>кварта</span></div>
        <div className={s.formPaper}><LeadForm selection={selection} /></div>
      </section>
    </main>
    <footer className={s.footer}><a className={club.brand} href="#">кварта<span>кофе для своих</span></a><p>Минск, Короля, 9<br />С 2019 года. По 5 кг за раз.</p><p className={s.demoNote}>Учебный проект. Мастерская вымышлена.<br />Заявки сохраняются для демонстрации формы.</p></footer>
  </div>;
}
