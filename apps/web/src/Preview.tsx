import './styles.css';
const ArrowRightIcon = () => <span aria-hidden="true">→</span>;
export function Preview({ variant }: {
  variant: 'notice' | 'photo';
}) {
  return <div className={`preview preview-${variant}`}>
    <header className="site-header wrap">
      <a className="wordmark" href="/">кварта<span>обжарка кофе</span></a>
      <span className="header-location">Минск, Короля, 9</span>
      <a className="text-link" href="#application">Оставить заявку <ArrowRightIcon /></a>
    </header>
    <main className="wrap">
      <section className="hero">
        <div className="hero-copy">
          <p className="intro">Маленькая мастерская. Свежий кофе.</p>
          <h1>Обжариваем в&nbsp;четверг.<br /><span>В пятницу привозим по&nbsp;Минску.</span></h1>
          <p className="hero-description">Из нашей обжарки к вам домой за 1–3 дня. Небольшими партиями, с 2019 года.</p>
          <a className="button" href="#application">Выбрать свой кофе <ArrowRightIcon /></a>
        </div>
        <figure className="hero-photo">
          <img src="/images/workshop-1280.webp" width="1536" height="1024" alt="Небольшая мастерская с ростером у окна" />
          <figcaption>Пять килограммов за раз. Всё внимание к зерну.</figcaption>
        </figure>
      </section>
      <section className="preview-product">
        <h2>Что обжариваем</h2>
        <div className="product-row">
          <div>
            <h3>Эфиопия Иргачеффе</h3>
            <p>Цветы, бергамот · светлая обжарка · 250 г</p>
          </div>
          <strong>32 <small>BYN</small></strong>
          <a className="round-action" href="#application" aria-label="Заказать Эфиопию Иргачеффе">
            <ArrowRightIcon />
          </a>
        </div>
      </section>
      <section id="application" className="preview-application">
        <h2>Хороший кофе начинается с разговора.</h2>
        <a className="button" href="/">Оставить заявку <ArrowRightIcon /></a>
      </section>
    </main>
  </div>;
}
