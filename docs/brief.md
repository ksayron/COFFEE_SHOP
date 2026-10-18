# Approved brief and decisions

Human approved implementation on 18 October 2026. Deadline 19 October, 18:00 +03.

## Source of truth

Кварта, fictional Minsk workshop. Аня and Дмитрий, former baristas, roast since
2019 in 5 kg batches. Roast Thursday, deliver Friday; beans arrive 1–3 days after
roasting. Pickup: Минск, ул. Короля, 9. Mon–Fri 8:00–20:00,
Sat–Sun 10:00–18:00. Friday Minsk delivery free from 50 BYN.

| Product | Description | Price |
| --- | --- | --- |
| Эфиопия Иргачеффе | цветочный, бергамот; светлая обжарка; 250 г | 32 BYN |
| Колумбия Уила | карамель, красное яблоко; 250 г | 29 BYN |
| Бразилия Серрадо | орех, шоколад; под эспрессо; 250 г | 26 BYN |
| Дрип-пакеты, ассорти | 10 штук | 18 BYN |
| Подписка | 2 × 250 г / месяц, доставка бесплатно | 54 BYN / мес |

Primary outcome: enquiry, manager calls; no payment/cart. Audience 25–45, mostly
mobile ad traffic. Warm plain Russian. No supplied phone/email: address and form
are the contact route. Supplied premises are fictional client data.

## Approved references

- [Florets / 1/1 Studio](https://1of1studio.com/projects/florets-bakery):
  physical identity, useful typography, menu and subscription.
- [Jolene / Design Week](https://www.designweek.co.uk/studio-frith-on-jolenes-living-brand-evolution/):
  a human detail, candid photography, disciplined layout.
- [Zerno / Studio11](https://studio11.by/zerno-ru),
  [ArchDaily](https://www.archdaily.com/957067/zerno-coffee-shop-studio11):
  daylight, simple materials, Minsk texture. Research photography only.

No copying logos, layouts verbatim, photographs or contacts. Current mobile
reference performance remains unverified after research browser loading failed.
Use original/generated/licensed final images, recording provenance.

## Architecture and assumptions

Browser → Nginx (Vite SPA, /api proxy) → Next.js Node API → PostgreSQL.
Public approved exception: Vercel SPA/API + Neon; rewrites replace Nginx publicly.
Radix supplies behaviour, with custom styling. Shared validation, SQL migrations.
Per-phone transaction advisory lock, then rolling 10-minute check and insert.
Canonical +375 phone. 201 new, 200 duplicate, 400 invalid, 503 storage failure.
First UTMs/click IDs/landing/referrer persist per tab; submission URL captured separately.

Design dials: variation 6, motion 2, density 3. Printed light workshop identity;
no theme toggle required. Two previews compare composition before extension.
Headline: «Обжариваем в четверг. В пятницу привозим по Минску.»
No fabricated founder portraits, reviews, business phone/email, admin or payments.
Telegram deferred. Public demo is fictional, personal and noncommercial.
