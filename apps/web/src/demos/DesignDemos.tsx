import { useEffect } from 'react';
import { ArrowRightIcon, ArrowTopRightIcon } from '@radix-ui/react-icons';
import { products } from '@kvarta/shared';
import base from './Demos.module.css';
import shop from './Storefront.module.css';
import club from '../components/Club.module.css';
import { ClubHero } from '../components/ClubHero';
import ticket from './Ticket.module.css';

const coffee = products[0];
const enquiry = '/#application';
const concepts = [
  { slug: 'storefront', number: '01', name: 'Соседская обжарка', label: 'Фотография / вывеска / живой город', description: 'Как место, мимо которого ходишь каждый день. Настоящий уличный кадр, красная вывеска и простой разговор о кофе.', detail: 'Ближе всего к небольшому местному бизнесу. Главная роль — у фотографии и узнаваемой вывески.' },
  { slug: 'club', number: '02', name: 'Кофейный клуб', label: 'Иллюстрация / плакат / цвет', description: 'Две чашки, одна привычка. Смелая буква, простая иллюстрация и кофе, который хочется поставить на кухонную полку.', detail: 'Самый дружелюбный и игровой вариант. Характер можно продолжить на пакетах, наклейках и дрипах.' },
  { slug: 'roast-ticket', number: '03', name: 'Лист обжарки', label: 'Типографика / этикетка / ритм недели', description: 'В четверг обжарили. В пятницу привезли. Вся идея — в одном коротком маршруте от мастерской до вашей чашки.', detail: 'Самый прямой и графичный вариант. Меньше образов, больше ясного предложения и характера в наборе.' },
] as const;
type Concept = typeof concepts[number];

function Arrow() { return <ArrowRightIcon aria-hidden="true" />; }

function ReviewNav({ active }: { active?: Concept }) {
  return <nav className={base.reviewNav} aria-label="Сравнение дизайнов">
    <a href="/designs" className={base.reviewHome}>Кварта <span>/ варианты</span></a>
    <div className={base.reviewOptions}>
      {concepts.map(item => <a key={item.slug} href={`/designs/${item.slug}`} aria-label={`${item.number} ${item.name}`} aria-current={active?.slug === item.slug ? 'page' : undefined}>{item.number}<span> {item.name}</span></a>)}
    </div>
    <a href="/" className={base.originalLink}>Текущий сайт <ArrowTopRightIcon aria-hidden="true" /></a>
  </nav>;
}

function ReviewFooter({ active }: { active: Concept }) {
  const next = concepts[(concepts.findIndex(item => item.slug === active.slug) + 1) % concepts.length];
  return <footer className={base.reviewFooter}>
    <div><span className={base.eyebrow}>Концепт {active.number} · {active.label}</span><p>{active.detail}</p>
      <small>Дизайн-пример вымышленной мастерской. Кнопки заявки открывают форму на основном сайте.</small>
      {active.slug === 'storefront' && <small>Фото атмосферы: <a href="https://unsplash.com/photos/people-inside-a-coffee-roasters-shop-BglKEQdyQzM">Luigi Ritchie / Unsplash</a>. На снимке другое кафе, не помещение «Кварты».</small>}
    </div>
    <a href={`/designs/${next.slug}`}>Следующий: {next.name} <Arrow /></a>
  </footer>;
}


function Storefront() {
  return <div className={shop.page}>
    <header className={shop.masthead}>
      <div className={shop.topline}><span>Минск, Короля, 9</span><span>Мастерская Ани и Дмитрия · с 2019</span><a href={enquiry}>Заказать кофе <Arrow /></a></div>
      <a href="/designs/storefront" className={shop.wordmark} aria-label="Кварта, начало концепта">кварта<span className={shop.logoDot}>.</span></a>
      <div className={shop.signline}><span>Небольшая обжарка</span><span>Большая любовь к утренней чашке</span></div>
    </header>
    <main id="demo-main">
      <section className={shop.welcome}>
        <h1>Ваш кофе.<br />Из нашей мастерской.</h1>
        <div><p>Обжариваем в четверг.<br />В пятницу привозим по Минску.</p><a className={shop.cta} href={enquiry}>Оставить заявку <Arrow /></a></div>
      </section>
      <figure className={shop.streetPhoto}>
        <img src="/images/demos/storefront-1600.webp" srcSet="/images/demos/storefront-800.webp 800w, /images/demos/storefront-1600.webp 1600w" sizes="100vw" width="1600" height="2000" fetchPriority="high" alt="Люди за окном небольшой городской кофейни, документальный снимок" />
        <figcaption><span>Кофе — хороший повод быть ближе.</span><span>Фото атмосферы / Luigi Ritchie</span></figcaption>
      </figure>
      <section className={shop.counter} aria-labelledby="store-coffee">
        <div className={shop.counterNote}><span>С полки мастерской</span><p>Обжариваем по 5 кг.<br />У вас — на 1–3 день<br />после обжарки.</p></div>
        <article className={shop.coffee}><span>Для неторопливого утра / светлая обжарка</span><h2 id="store-coffee">{coffee.name}</h2><p>{coffee.notes} · {coffee.weight}</p><div><strong>{coffee.price} <small>BYN</small></strong><a href={enquiry} aria-label="Оставить заявку на кофе">Хочу попробовать <Arrow /></a></div></article>
        <aside className={shop.subscription}><span>А можно каждый месяц</span><h2>Кофе дома.<br />Всегда.</h2><p>2 пачки по 250 г.<br />Доставка бесплатно.</p><a href={enquiry}><strong>54 <small>BYN / мес</small></strong><Arrow /></a></aside>
      </section>
      <div className={shop.signoff}><p>Мы Аня и Дмитрий. Когда-то работали бариста.<br />Теперь обжариваем тот кофе, который любим сами.</p><span>Заглядывайте.<br /><b>Короля, 9</b></span></div>
    </main>
  </div>;
}

function Club() {
  return <div className={club.page}>
    <header className={club.header}><a href="/designs/club" className={club.brand}>кварта<span>кофе для своих</span></a><p>Аня + Дмитрий<br />Минск, с 2019</p><a href={enquiry}>Будем пить кофе? <Arrow /></a></header>
    <main id="demo-main">
      <ClubHero actionHref={enquiry} />
      <section className={club.offers} aria-label="Кофе и подписка">
        <article className={club.product}><span>01 / Знакомство с зерном</span><h2>{coffee.name}</h2><p>Цветы и бергамот.<br />Светлая обжарка, 250 г.</p><div><strong>32 <small>BYN</small></strong><a href={enquiry}>Попробуем? <Arrow /></a></div></article>
        <aside className={club.subscription}><span>02 / Чтобы кофе не кончался</span><h2>Наша ежемесячная<br />встреча.</h2><p>Две пачки по 250 г, доставка бесплатно.</p><a href={enquiry}><strong>54 <small>BYN / мес</small></strong><Arrow /></a></aside>
      </section>
      <footer className={club.signoff}><span>Хорошее зерно.<br />Знакомые руки.</span><p>Мы Аня и Дмитрий — бывшие бариста,<br />а теперь ваша маленькая обжарка.<br />Рады знакомству.</p><b>к.</b></footer>
    </main>
  </div>;
}

function Ticket() {
  return <div className={ticket.page}>
    <header className={ticket.header}><a href="/designs/roast-ticket" className={ticket.brand}>КВАРТА<span>МИНСК / ОБЖАРКА КОФЕ</span></a><span className={ticket.est}>Аня и Дмитрий<br />Работаем с 2019</span><a href={enquiry}>Оставить заявку <ArrowTopRightIcon aria-hidden="true" /></a></header>
    <main id="demo-main">
      <section className={ticket.schedule}>
        <div className={ticket.kicker}><span>Лист обжарки / недельный ритм</span><span>Партиями по 5 кг</span></div>
        <h1><span className={ticket.day}>ЧТ<small>Обжариваем</small></span><span className={ticket.routeArrow} aria-hidden="true">↗</span><span className={ticket.day}>ПТ<small>Привозим по Минску</small></span></h1>
        <div className={ticket.scheduleBottom}><p>Между обжаркой и вашей чашкой —<br /><b>всего 1–3 дня.</b></p><a href={enquiry}>Свежий кофе. На этой неделе. <Arrow /></a></div>
      </section>
      <section className={ticket.offerGrid} aria-label="Кофе и подписка">
        <article className={ticket.product}>
          <div className={ticket.labelTop}><span>Зерно / 01</span><span>Светлая обжарка</span></div>
          <h2>ЭФИОПИЯ<br /><span>ИРГАЧЕФФЕ</span></h2>
          <dl><div><dt>Во вкусе</dt><dd>Цветы, бергамот</dd></div><div><dt>Вес</dt><dd>250 г</dd></div></dl>
          <div className={ticket.productBottom}><strong>32 <small>BYN</small></strong><a href={enquiry}>Попробовать <Arrow /></a></div>
        </article>
        <aside className={ticket.subscription}><span>Подписка / каждый месяц</span><div className={ticket.quantity}>2 × 250<span>г</span></div><h2>Кофе по расписанию.<br />Без лишних забот.</h2><p>Доставка по Минску бесплатно.</p><a href={enquiry}><strong>54 <small>BYN / мес</small></strong><Arrow /></a></aside>
      </section>
      <footer className={ticket.signoff}><p>Сначала мы варили кофе за барной стойкой.<br />Теперь обжариваем для вашей кухни.</p><div>Аня и Дмитрий<br /><span>Самовывоз: Минск, Короля, 9</span></div></footer>
    </main>
  </div>;
}

function Gallery({ missing }: { missing: boolean }) {
  return <main id="demo-main" className={base.gallery}>
    <div className={base.galleryIntro}><span className={base.eyebrow}>Кварта / дизайн-исследование</span><h1>Три характера.<br />Одна мастерская.</h1><p>{missing ? 'Такого концепта нет. Выберите один из трёх вариантов ниже.' : 'Одинаковые факты и предложения. Разные композиции, буквы и образы. Откройте каждый вариант — особенно на телефоне.'}</p></div>
    <div className={base.galleryGrid}>{concepts.map(item => <article key={item.slug} className={base.conceptCard}>
      <a href={`/designs/${item.slug}`} className={base.thumbnail} aria-label={`Открыть: ${item.name}`}><img src={`/images/demos/preview-${item.slug}.webp`} width="1440" height="900" alt={`Первый экран концепта «${item.name}»`} loading="lazy" /><span>{item.number} <ArrowTopRightIcon aria-hidden="true" /></span></a>
      <span className={base.eyebrow}>{item.label}</span><h2><a href={`/designs/${item.slug}`}>{item.name} <Arrow /></a></h2><p>{item.description}</p>
    </article>)}</div>
    <aside className={base.galleryNote}><h2>Выбран кофейный клуб.</h2><p>В каждом варианте есть первый экран, Эфиопия за 32 BYN, подписка за 54 BYN и переход к текущей форме. Для полной страницы выбран вариант 02 — кофейный клуб. Остальные концепты сохранены для сравнения.</p><a href="/">Открыть текущий сайт <ArrowTopRightIcon aria-hidden="true" /></a></aside>
  </main>;
}

export function DesignDemos({ pathname }: { pathname: string }) {
  const active = concepts.find(item => pathname === `/designs/${item.slug}`);
  useEffect(() => { document.title = active ? `Кварта · ${active.name} · концепт ${active.number}` : 'Кварта · три дизайн-концепта'; }, [active]);
  return <div className={base.root}>
    <a className={base.skipLink} href="#demo-main">К содержимому</a>
    <ReviewNav active={active} />
    {active ? <>{active.slug === 'storefront' ? <Storefront /> : active.slug === 'club' ? <Club /> : <Ticket />}<ReviewFooter active={active} /></> : <Gallery missing={pathname !== '/designs'} />}
  </div>;
}
