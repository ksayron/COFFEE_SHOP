import { useState } from 'react';
import { ArrowRightIcon, ArrowTopRightIcon } from '@radix-ui/react-icons';
import { products, type Interest, type ProductId } from '@kvarta/shared';
import { LeadForm, type Selection } from './LeadForm';
import './styles.css';
export function App() {
  const [selection, setSelection] = useState<Selection>({ interest: 'subscription', product: null, revision: 0 });
  function choose(interest: Interest, product: ProductId | null = null) {
    setSelection(previous => ({ interest, product, revision: previous.revision + 1 }));
    requestAnimationFrame(() => {
      document.getElementById('application')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      document.getElementById('application-title')?.focus({ preventScroll: true });
    });
  }
  return <>
    <a className="skip-link" href="#main">К содержимому</a>
    <header className="site-header wrap">
      <a className="wordmark" href="#" aria-label="Кварта, наверх">кварта<span>обжарка кофе</span></a>
      <nav aria-label="Основная навигация">
        <a href="#coffee">Наш кофе</a>
        <a href="#subscription">Подписка</a>
        <a href="#visit">Как получить</a>
      </nav>
      <a className="text-link header-action" href="#application">Оставить заявку <ArrowRightIcon /></a>
    </header>
    <main id="main">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="intro">Маленькая мастерская. Свежий кофе.</p>
          <h1 id="hero-title">Обжариваем в&nbsp;четверг.<br /><span>В пятницу привозим по&nbsp;Минску.</span></h1>
          <p className="hero-description">Из нашей обжарки к вам домой за 1–3 дня. Небольшими партиями, с 2019 года.</p>
          <a className="button" href="#coffee">Выбрать свой кофе <ArrowRightIcon /></a>
        </div>
        <figure className="hero-photo">
          <img src="/images/workshop-1280.webp" srcSet="/images/workshop-640.webp 640w, /images/workshop-1280.webp 1280w" sizes="(max-width:650px) 100vw, 50vw" width="1536" height="1024" fetchPriority="high" alt="Ростер у большого окна, деревянный стол и крафтовые пакеты" />
          <figcaption>Пять килограммов за раз. Всё внимание к зерну.</figcaption>
        </figure>
      </section>
      <section className="story wrap" aria-labelledby="story-title">
        <div className="story-heading">
          <p className="section-note">Будем знакомы</p>
          <h2 id="story-title">Не склад кофе.<br />Мастерская.</h2>
        </div>
        <div className="story-copy">
          <p>Мы Аня и Дмитрий. Раньше стояли за барной стойкой, а в 2019-м открыли свою обжарку. Хотелось делать кофе, который самим приятно пить каждый день.</p>
          <p>Поэтому не обжариваем впрок. Каждую неделю берём небольшую партию и отправляем её вам свежей, чтобы сохранить аромат зерна до вашей чашки.</p>
          <p className="story-signoff">Хорошее зерно. Знакомые руки.</p>
        </div>
        <div className="roast-note">
          <span>Наш недельный ритм</span>
          <div>
            <b>чт</b>
            <p>обжариваем</p>
          </div>
          <ArrowRightIcon />
          <div>
            <b>пт</b>
            <p>привозим</p>
          </div>
          <p className="roast-note-bottom">У вас на 1–3 день<br />после обжарки</p>
        </div>
      </section>
      <section className="coffee-section wrap" id="coffee" aria-labelledby="coffee-title">
        <div className="menu-heading">
          <div>
            <p className="section-note">Из ближайшей обжарки</p>
            <h2 id="coffee-title">Какой кофе вам ближе?</h2>
          </div>
          <p>Для дома, офиса<br />и вашей любимой чашки.</p>
        </div>
        <div className="coffee-menu">
          {products.map((product, index) => <article className="product-row" key={product.id}>
            <span className="origin-mark" aria-hidden="true">
              {['Э', 'К', 'Б', 'Д'][index]}
            </span>
            <div className="product-info">
              <h3>
                {product.name}
              </h3>
              <p>
                {product.notes}
              </p>
              <span className="product-detail">{product.detail} · {product.weight}</span>
            </div>
            <strong>{product.price} <small>BYN</small></strong>
            <button className="round-action" onClick={() => choose('one_time', product.id)} aria-label={`Заказать: ${product.name}`}>
              <ArrowRightIcon />
            </button>
          </article>)}
        </div>
        <p className="menu-footnote">Не уверены, что выбрать? <button className="inline-button" onClick={() => choose('question')}>Расскажите, как готовите кофе, и мы подскажем.</button></p>
      </section>
      <section className="subscription wrap" id="subscription" aria-labelledby="subscription-title">
        <div className="subscription-photo">
          <img src="/images/subscription-1200.webp" srcSet="/images/subscription-600.webp 600w, /images/subscription-1200.webp 1200w" sizes="(max-width:650px) 100vw, 50vw" width="1536" height="1024" loading="lazy" alt="Два пакета кофе на рабочем столе рядом с чашкой" />
        </div>
        <div className="subscription-copy">
          <p className="section-note">Кофе по подписке</p>
          <h2 id="subscription-title">Чтобы дома<br />всегда был кофе.</h2>
          <p>Две пачки по 250 г раз в месяц. Свежая обжарка и доставка по Минску уже внутри.</p>
          <div className="subscription-price">
            <strong>54 <span>BYN / мес</span></strong>
            <span>2 пачки × 250 г<br />доставка бесплатно</span>
          </div>
          <button className="button" onClick={() => choose('subscription')}>Хочу подписку <ArrowRightIcon /></button>
          <p className="subscription-detail">Кофе и детали обсудим по телефону.<br />Начнём с того, что вы любите.</p>
        </div>
      </section>
      <section className="visit wrap" id="visit" aria-labelledby="visit-title">
        <h2 id="visit-title">Привезём. Или заходите.</h2>
        <div className="visit-grid">
          <article>
            <span className="visit-symbol" aria-hidden="true">пт</span>
            <h3>По Минску в пятницу</h3>
            <p>От 50 BYN доставим бесплатно.<br />Для заказа поменьше уточним стоимость,<br className="desktop-break" /> когда будем созваниваться.</p>
            <p className="visit-small">День и детали согласуем при оформлении.</p>
          </article>
          <article>
            <span className="visit-symbol" aria-hidden="true">
              <ArrowTopRightIcon />
            </span>
            <h3>Самовывоз из мастерской</h3>
            <p>Минск, ул. Короля, 9<br />Пн–пт 8:00–20:00<br />Сб–вс 10:00–18:00</p>
            <a href="https://yandex.by/maps/157/minsk/?text=Минск%2C%20улица%20Короля%2C%209" target="_blank" rel="noopener noreferrer" className="text-link">Открыть адрес на карте <ArrowTopRightIcon /></a>
          </article>
        </div>
      </section>
      <section className="application-section" id="application" aria-labelledby="application-title">
        <div className="application-layout wrap">
          <div className="application-intro">
            <p className="section-note">Давайте начнём с чашки</p>
            <h2 id="application-title" tabIndex={-1}>Оставьте номер.<br />Остальное обсудим.</h2>
            <p>Поможем выбрать зерно, оформим подписку или ответим на вопрос. Просто расскажите, что вам нужно.</p>
            <span className="application-wordmark" aria-hidden="true">кварта</span>
          </div>
          <LeadForm selection={selection} />
        </div>
      </section>
    </main>
    <footer className="site-footer wrap">
      <a className="wordmark" href="#">кварта<span>обжарка кофе</span></a>
      <p>Минск, Короля, 9<br />Каждую неделю свежая обжарка.</p>
      <p className="demo-note">Учебный проект. Мастерская вымышлена.<br />Заявки сохраняются для демонстрации формы.</p>
    </footer>
  </>;
}
