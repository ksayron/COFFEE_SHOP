import { ArrowRightIcon } from '@radix-ui/react-icons';
import club from './Club.module.css';
import '../club-fonts.css';

function Arrow() { return <ArrowRightIcon aria-hidden="true" />; }

function CupIllustration() {
  return <svg className={club.illustration} viewBox="0 0 620 490" role="img" aria-label="Две синие чашки кофе рядом с пакетом зерна, оригинальная иллюстрация">
    <g fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M358 67 495 47 539 286 392 310Z" fill="var(--butter)" />
      <path d="m358 67 11-28 120-18 6 26M377 109l124-18" />
      <path d="m406 148 70-11 14 74-71 11Z" fill="currentColor" />
      <text x="447" y="202" fill="var(--butter)" stroke="none" fontFamily="Golos Demo, sans-serif" fontWeight="800" fontSize="46" textAnchor="middle" transform="rotate(-9 447 185)">к.</text>
      <path d="M82 253c-15 24-6 66 12 86m48-157c-5-24-34-28-28-52m74 35c24-26-5-35 11-55" />
      <path d="M70 266c2 71 20 131 89 135 73 4 109-50 117-117Z" fill="var(--butter)" />
      <ellipse cx="175" cy="270" rx="105" ry="35" fill="currentColor" />
      <path d="M268 302c77-33 65 54-19 57M302 333c-8 76 20 115 94 108 67-7 91-54 88-122Z" fill="var(--butter)" />
      <ellipse cx="393" cy="323" rx="93" ry="32" fill="currentColor" />
      <path d="M483 346c71-22 72 41-10 53M370 270c-16-33 19-40 8-65" />
      <path d="M52 421c84 46 167 37 208 10m37 35c87 16 151 6 217-27" strokeWidth="4" />
      <path d="m66 167-14-15m8 45-20 1m476-57 21-10m-15 35 21 2" strokeWidth="4" />
    </g>
  </svg>;
}


export function ClubHero({ actionHref = '#application' }: { actionHref?: string }) {
  return <section className={club.poster}>
        <div className={club.posterTop}><span>Небольшая обжарка. Хорошая привычка.</span><span>Короля, 9 / Минск</span></div>
        <h1>Утро лучше,<br /><span>когда есть кофе.</span></h1>
        <div className={club.posterBody}>
          <div className={club.promise}><p>Обжариваем в четверг.<br />В пятницу привозим<br />по Минску.</p><span>По 5 кг за раз.<br />К вам за 1–3 дня<br />после обжарки.</span><a href={actionHref}>Оставить заявку <Arrow /></a></div>
          <CupIllustration />
          <div className={club.smallNote}>Две чашки —<br />уже компания.</div>
        </div>
      </section>;
}
