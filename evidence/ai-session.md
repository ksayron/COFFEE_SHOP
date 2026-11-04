# Visible AI session export

Authentic visible human/assistant messages exported from this Codex conversation.
Internal instructions, private reasoning and raw tool payloads are excluded.
Desktop environment/page metadata is omitted; this covers the available implementation segment.
Tool results, source changes and original images are documented separately in the repository.
This snapshot stops before the final handoff; it is not a Claude Code export.

## 2026-10-18T17:30:01.774Z · user · message

````text
# AGENTS.md instructions

<INSTRUCTIONS>
<!-- design-explorer:start -->
## Frontend design selection

For frontend design, redesign, or visual refinement, first read `C:/Users/user/.agents/skills/design-explorer/SKILL.md` before selecting a design implementation skill. Choose by task fit, not skill list order, popularity, or habit. For a substantial open visual direction, compare three distinct concepts and two small representative previews; for incremental changes, preserve the accepted product identity and skip speculative prototypes. Explicit user style and skill choices take precedence.

Use the Design Explorer installed-skill reference to locate the chosen specialists; read only relevant instructions. Do not combine every design skill by default. Use the separate authorized `C:/Users/user/.codex/design-history.jsonl` journal to avoid repeated outcomes across unrelated projects, and record implemented substantial design directions there. Keep that journal separate from Codex memories. If Design Explorer is unavailable, apply these principles directly and report the missing skill.
<!-- design-explorer:end -->
</INSTRUCTIONS>
````

## 2026-10-18T17:30:01.947Z · user · message

````text
in this dialog we just discuss and prepare before future work. acknoledge task and its context. i need to do test assignement for job appliation.
the task:
ТЕСТОВОЕ ЗАДАНИЕ · ВЕБ-РАЗРАБОТЧИК JUNIOR+\
Лендинг для обжарки кофе, который\
не выглядит сгенерированным\
Соберите лендинг для небольшой обжарки с работающей формой заявки.\
ИИ использовать можно и нужно: нам важно увидеть, как вы им управляете,\
а не только итог.\
4–6 ч\
чистой работы\
19.10, 18:00\
1 ссылка\
дедлайн, пн, по Москве\
на живой сайт\
01\
Клиент\
Обжарка «Кварта», Минск. Клиент вымышленный, все факты ниже даны\
для работы.\
Маленькая мастерская: обжаривают партиями по 5 кг с 2019 года.\
Основатели — Аня и Дмитрий, раньше работали бариста. Обжаривают\
по четвергам, по пятницам развозят по Минску. Свежесть — главное,\
что они продают: зерно приходит к клиенту на 1–3 день после обжарки.\
Эфиопия Иргачеффе\
цветочный, бергамот, светлая обжарка · 250 г\
32 BYN\
Колумбия Уила\
карамель, красное яблоко · 250 г\
29 BYN\
Бразилия Серрадо\
орех, шоколад, под эспрессо · 250 г\
26 BYN\
Дрип-пакеты, ассорти\
10 штук\
18 BYN\
Подписка\
2 пачки по 250 г раз в месяц, доставка бесплатно\
54 BYN / мес\
Адрес мастерской: Минск, ул. Короля, 9 (самовывоз). Часы: пн–пт 8:00\
20:00, сб–вс 10:00–18:00. Доставка по Минску в пятницу, от 50 BYN\
бесплатно.\
Кто покупает: 25–45 лет, пьют кофе дома или в офисе, большинство\
заходит с телефона по рекламе в Instagram и Яндексе. Тон: тёплый и\
простой, без пафоса и без «премиального» глянца.\
02\
Задача лендинга\
Главная цель — заявка на подписку или на разовый заказ. Менеджер\
перезванивает и оформляет. Корзина и онлайн-оплата не нужны.\
Обязательно должно быть: кто они и почему свежесть важна,\
ассортимент с ценами, подписка, доставка и самовывоз, контакты и\
форма заявки. Порядок, структура, дополнительные блоки и тексты —\
на ваше усмотрение. Тексты выше можно переписать.\
Главное требование к виду: сайт должен выглядеть как\
работа хорошей студии для конкретно этого клиента, а не\
как типовой сгенерированный лендинг. Если вы попросили\
ИИ «сделать красиво» и согласились с первым вариантом,\
скорее всего, это будет заметно.\
03\
Форма и бэкенд\
Форма: имя, телефон, что интересует (подписка, разовый заказ,\
вопрос), комментарий. Заявку принимает ваш эндпоинт, например\
POST /api/lead . Требования:\
Телефон — белорусский номер. Неверный номер не принимается,\
человек видит понятную подсказку.\
Повторная отправка того же номера в течение 10 минут, в том числе\
двойное нажатие на кнопку, не создаёт вторую заявку.\
Заявки идут с рекламы. Менеджеру важно знать, откуда пришёл\
клиент: из какой рекламы, с какого объявления, с какой страницы.\
Если отправка не удалась, человек должен это увидеть и понять, что\
делать.\
Куда складывать заявки — выберите сами: файл, SQLite или что-то\
ещё. Объясните выбор в README.\
Будет плюсом, но не обязательно\
Дублировать заявку в Telegram-бот.\
Превью ссылки в мессенджерах: картинка, заголовок и описание.\
Анимации, если они уместны и не тормозят сайт.\
04\
Рамки\
Стек свободный. Next.js будет плюсом, у нас основной стек такой.\
ИИ-инструменты любые. Предпочтительно Claude Code: у него есть\
экспорт сессии.\
Хостинг бесплатный: Vercel, Netlify, Cloudflare Pages или аналог.\
Сайт должен открываться по ссылке, и форма должна работать\
прямо там.\
Фото подберите сами с бесплатной лицензией (Unsplash, Pexels)\
или сгенерируйте. Логотип можно сделать текстом.\
Вопросы можно задавать. Если решили что-то сами, просто\
запишите допущение в README.\
05\
Что прислать\
1\
2\
3\
4\
5\
Ссылку на сайт.\
Ссылку на репозиторий (публичный или с доступом для нас).\
Коммиты по шагам, а не один коммит в конце.\
Лог работы с ИИ: экспорт сессии (\
/export в Claude Code) или\
скриншоты ключевых моментов. Причесывать не нужно, нам\
интересен настоящий процесс.\
Замер Lighthouse для мобильной версии (скриншот или отчёт).\
README на полстраницы: что делали сами, а что ИИ; где ИИ\
ошибся и как вы это заметили; что не успели или сделали бы\
иначе.\
Всё отправьте одним сообщением тому, кто прислал задание.\
Дедлайн: понедельник, 19 октября, 18:00 по Москве. Работы,\
присланные позже, не принимаются.\
Неполная работа с честным README лучше, чем «идеальная» без объяснений. Если работа\
подойдёт, мы с вами свяжемся
context:
**VitAi World&#x20;**&#x441;троит цифровые продукты для бизнеса и не только: сайты, внутреннюю CRM-платформу, игры, ботов, интеграции и автоматизацию. Проектов много и они разные, поэтому много и небольших задач: поправить интерфейс, собрать страницу, починить баг, подключить форму.
Мы ищем junior-разработчика, который возьмёт эти задачи на себя. Код у нас в основном пишется с помощью ИИ-агентов вроде Claude Code и Cursor. От вас нужно не набирать код быстро, а аккуратно доводить задачу до конца и понимать, что именно вы сделали.

**Какие задачи:**
• Сайты и лендинги: вёрстка, правки, адаптация под телефоны, перенос с конструкторов вроде Тильды в код.
• Интерфейс внутренней платформы: экраны, таблицы, формы, доработки по готовому описанию.
• Боты, скрипты и автоматизации, в том числе с LLM.
• Мелкие баги в любом из проектов: воспроизвести, найти причину, исправить.
• Уборка кода, документация, тесты на готовую логику.

**Кого мы ищем:**
• Знаете хотя бы один язык (JavaScript, TypeScript, Python или другой) на уровне, достаточном, чтобы читать чужой код и понимать, что он делает.
• Делали хотя бы один живой проект: сайт, бота или автоматизацию, которой кто-то пользуется.
• Пользуетесь ИИ-инструментами в работе и проверяете то, что они написали, а не принимаете всё подряд.
• Понимаете основы: клиент и сервер, как работает запрос, зачем нужны git и ветки.
• Спокойно переключаетесь между проектами и быстро разбираетесь в незнакомом коде.
• Сначала разбираетесь в задаче, потом делаете.
• Честно говорите, когда не понимаете или ошиблись, и задаёте вопросы вовремя.

**Будет плюсом:**
• React, Next.js или TypeScript.
• Tailwind и адаптивная вёрстка.
• Опыт с Тильдой или другими конструкторами сайтов.
• Свой VPS, Docker, опыт выкатки проекта.
• Боты и автоматизации с LLM API.

**Как устроена работа:**
• Каждая задача в отдельной ветке и через pull request.
• Сначала простые и хорошо проверяемые задачи, потом сложнее по мере того, как растёт опыт.
• Внутренние правила и договорённости записаны, их не нужно угадывать.

**Что мы даём:**
• Разные реальные проекты, которыми пользуются люди, а не учебные задания.
• Full-time или part-time, удалённо или гибрид.
• Оплата обсуждается по уровню и растёт вместе с задачами.
````

## 2026-10-18T17:30:24.095Z · assistant · final_answer

````text
Understood. This chat is for **discussion and preparation**. I’ll wait for your instruction before starting implementation or changing files.

The assignment is a real, deployed landing page for **«Кварта», a small coffee roastery in Minsk**. Its strongest distinguishing facts are the founders’ barista background, 5 kg batches, Thursday roasting, Friday delivery, and beans reaching customers within 1–3 days.

The main priorities are:

- **Specific, thoughtful design:** warm, simple, mobile-first, with a visual identity grounded in this particular business.
- **A working lead flow:** Belarusian phone validation, reliable 10-minute duplicate prevention, advertising attribution, persistent storage, and clear success/error feedback.
- **Complete delivery:** live website, repository with incremental commits, authentic AI work log, mobile Lighthouse evidence, and a short, honest README.

Next.js is preferred. Telegram notifications, social link previews, and suitable animation are optional extras. The intended effort is **4–6 focused hours**, with submission due **19 October at 18:00 Moscow time**, which is also 18:00 in Minsk.

The hiring context matters: they are assessing how you understand a task, direct AI, catch mistakes, verify behavior, and finish the work. Our preparation should make those decisions deliberate and leave you able to explain every important part yourself.
````

## 2026-10-18T18:08:02.450Z · user · message

````text
key point for landing design is to not look generated so first i would like for you to research popular designs that are recongnised as great. at the same time design shouldn't be overcomplicated with heavy animations. look for articles, compilations, etc. feel free to explore close domains for small local buisnesses. design should feel warm and touching, for design purposes you can take one real local coffee shop in minsk for photos of interier or location. project should be build using react + ui elements kits servred from nginx as spa bundle, backend in next.js, db - postgres. all should be packed in single docker compose. do not apply design before my explicit approval for which use as refrences. Make multiple phases for devolpment and issues in GitHub repository named COFFEE_SHOP, using github.md(update for this specific project)
````

## 2026-10-18T18:23:01.982Z · assistant · commentary

````text
I’ll research distinctive, warm sites for coffee shops and similar local businesses, focusing on typography, photography, and layout rather than heavy animation. I’ll also inspect the project’s GitHub guidance and prepare a phased issue backlog. Reference selection will stay open for your explicit approval.

I’m using the Design Explorer skill to guide the comparison.
````

## 2026-10-18T18:25:02.311Z · assistant · commentary

````text
The GitHub repository [`ksayron/COFFEE_SHOP`](https://github.com/ksayron/COFFEE_SHOP) exists and currently has no issues or milestones. Locally, there’s only a `github.md` copied from Sensei++; its repository, board, CI, and milestone rules need replacing.

Your stack implies three Compose services: Nginx serving the React bundle, Next.js handling `/api/*`, and PostgreSQL storing leads. The public hosting choice needs attention because the assignment requires a free live site. I’ll check that alongside the design research.
````

## 2026-10-18T18:27:12.965Z · assistant · commentary

````text
The strongest candidates so far get their character from packaging, photography, type, and small human details. That looks promising for Кварта’s brief without adding animation work.

I’m checking the sites visually before narrowing the shortlist. For a Minsk atmosphere reference, Zerno is a good candidate; published interior photos can guide the mood, but we’ll need licensed, original, or generated images for the delivered site.
````

## 2026-10-18T18:35:24.643Z · assistant · commentary

````text
Jolene and Little Wolf are especially useful references for the “warm and touching” direction: both have published design case studies showing how small, personal details give a business its identity.

The browser couldn’t load the reference pages, so this pass relies on published case studies, gallery screenshots, and accessible page content. I can support the visual shortlist, but I haven’t verified how these sites currently behave on a phone.
````

## 2026-10-18T18:36:49.169Z · assistant · commentary

````text
Here’s the shortlist I’d put in front of you. “Recognised” here means inclusion in a curated gallery or coverage in design publications; it doesn’t mean every example won an award.

| Reference | Evidence and what it offers Кварта |
|---|---|
| **Florets Bakery** | [1/1 Studio’s case study](https://1of1studio.com/projects/florets-bakery). A useful small-business reference: a coherent identity across signage, menus, photography, and the website. I’d borrow the connection between the physical place and the page. |
| **Jolene** | [Design Week’s case study](https://www.designweek.co.uk/studio-frith-on-jolenes-living-brand-evolution/) and [the live site](https://www.jolenebakery.com/). A personal, imperfect mark gives an otherwise restrained identity warmth. The lesson is one meaningful human detail, rather than decoration everywhere. |
| **Touchy Coffee** | [Siteinspire credits its designer](https://www.siteinspire.com/profile/9388-abbr-projects); [Lapa Ninja has screenshots](https://www.lapa.ninja/post/touchycoffee/). Strong colour fields, recognisable lettering, and straightforward product presentation. Useful for character; its unusual navigation and motion needn’t carry over. |
| **Little Wolf** | [BP&O’s detailed review](https://bpando.org/2017/12/04/coffee-packaging-little-wolf/). Friendly illustration paired with precise product labels. Particularly relevant to making specialty coffee feel approachable. |
| **Union Boulangerie** | [Selected by Siteinspire](https://www.siteinspire.com/website/13641-union-boulangerie). Useful for editorial hierarchy and a story rooted in ingredients and process. Its interactive ingredient-collecting experience would add unnecessary scope here. |

The broader collections worth keeping are [Siteinspire’s Food & Drink selection](https://www.siteinspire.com/websites/category/food-and-drink) and [BP&O’s café identities](https://bpando.org/2017/03/14/bpo-collections-cafes/).

That gives us three materially different directions to discuss:

- **A — Neighbourhood workshop:** Florets + Jolene. Photography and people lead; the assortment reads like a carefully made shop menu. My recommendation for warmth and a realistic 4–6-hour build.
- **B — Roaster’s journal:** Union + the product-label discipline of Little Wolf. Coffee and the weekly roasting process lead; structured rows, batch-label details, and short documentary captions.
- **C — Coffee companions:** Touchy + Little Wolf. More illustration and colour, with a friendly graphic identity carrying the page. Distinctive, but needs more original asset work.

For local atmosphere, I suggest [Zerno, documented by its architects Studio11](https://studio11.by/zerno-ru): daylight, exposed historical details, and simple materials. It would be an atmosphere reference; Кварта’s supplied address and business facts remain the content source.
````

## 2026-10-18T18:50:04.409Z · assistant · commentary

````text
You’ve approved **A: Neighbourhood workshop**: Florets + Jolene as the main references, with Zerno for Minsk atmosphere. You’ve also accepted **Vercel + Neon for the public demo**, with the complete Nginx/Next.js/PostgreSQL setup retained in one Compose file.

I’ll make those decisions explicit in the handoff plan and draft issues. Since this chat is in planning mode, the repository, `github.md`, and GitHub issues will remain unchanged this turn.
````

## 2026-10-18T18:51:59.930Z · assistant · final_answer

````text
<proposed_plan>
# Кварта — approved references and development plan

## 1. Research and approved direction

**Approved:** “Neighbourhood workshop,” using **Florets + Jolene** as the main references and **Zerno in Minsk** for atmosphere. Reference approval is recorded; no design has been applied.

The useful pattern across these examples is **a coherent business identity expressed through ordinary details**: signage, packaging, photographs, menus, and language. Кварта can achieve that through its founders, small batches, and Thursday–Friday rhythm, with restrained animation.

| Reference | Evidence | What we take from it |
|---|---|---|
| **Florets Bakery — primary** | [1/1 Studio’s case study](https://1of1studio.com/projects/florets-bakery) documents typography, packaging, signage, desktop/mobile pages, and subscriptions. | A close relationship between the physical workshop and its website; readable, menu-like product presentation. |
| **Jolene — primary** | [Design Week’s article](https://www.designweek.co.uk/studio-frith-on-jolenes-living-brand-evolution/) examines Studio Frith’s identity and digital work. | One memorable human detail, candid photography, and an otherwise disciplined layout. |
| **Zerno — atmosphere** | [Studio11’s project](https://studio11.by/zerno-ru) documents the Minsk interior; [ArchDaily](https://www.archdaily.com/957067/zerno-coffee-shop-studio11) identifies the architects and photographer. | Daylight, simple materials, historical texture, and a recognisable local setting. |
| **Touchy — alternative considered** | Featured by [Lapa Ninja](https://www.lapa.ninja/post/touchycoffee/) and credited on [Siteinspire](https://www.siteinspire.com/profile/9388-abbr-projects). | Strong personality through lettering, colour, and packaging. Its playful direction was not selected. |
| **Little Wolf — alternative considered** | [BP&O’s detailed review](https://bpando.org/2017/12/04/coffee-packaging-little-wolf/) covers its friendly illustrated identity. | Warmth paired with clear product information. Illustration would require additional original assets. |
| **Union Boulangerie — alternative considered** | [Siteinspire’s selection](https://www.siteinspire.com/website/13641-union-boulangerie). | Process-based storytelling and editorial hierarchy. Its interactive experience adds unnecessary scope here. |

Useful broader compilations: [Siteinspire: Food & Drink](https://www.siteinspire.com/websites/category/food-and-drink), [BP&O: Coffee](https://bpando.org/2017/06/14/bpo-collections-coffee/), and [BP&O: Cafés & Coffee Shops](https://bpando.org/2017/03/14/bpo-collections-cafes/).

These are curated references and published case studies, not a claim that every example won an award. Browser loading failed during research; current mobile interaction and performance remain unverified.

## 2. Design and content approach

Use **Design Taste Frontend** as the primary implementation workflow because this is a bespoke small-business landing page. Its layout and identity guidance fits better than a broad component catalogue. User requirements override its motion defaults.

- Develop two small representative previews within the approved direction, each showing the same hero, product sample, and application action on mobile and desktop. Compare composition and readability before extending the stronger version.
- Lead with the workshop’s specific promise: **«Обжариваем в четверг. В пятницу привозим по Минску.»**
- Follow with freshness and the founders’ story, assortment and prices, subscription, delivery/self-pickup, then the application form and contact details.
- Give the subscription a clear offer: **54 BYN/month, two 250 g packs, free delivery**. Product actions preselect the relevant interest and carry the selected product into the application.
- Build personality through photography, typography, short captions, and roast-label details. Establish final colours and Cyrillic font choices during the preview phase.
- Use normal scrolling and brief control-state transitions. Avoid autoplay video, scroll hijacking, parallax, and an animation library.
- Use Zerno photographs as research references. Delivered images must be original, generated, or explicitly licensed for reuse; attribution alone does not establish permission. Record asset provenance.
- Preserve the fictional client’s supplied address, prices, schedule, and founders’ names. Do not borrow Zerno’s contact details or identify unrelated people as Аня and Дмитрий.

## 3. Architecture and application behaviour

**Local package:** one Docker Compose file with three services:

`Browser → Nginx: React SPA + /api proxy → Next.js API → PostgreSQL`

- React + TypeScript + Vite frontend.
- Radix Primitives for the few controls needing accessible interaction, with project-specific styling. Radix ships unstyled, allowing the identity to remain custom. [Official documentation](https://www.radix-ui.com/primitives/docs/overview/introduction)
- Next.js Route Handlers for the backend, using its Node runtime and standalone Docker output. [Official deployment documentation](https://nextjs.org/docs/app/getting-started/deploying)
- PostgreSQL accessed through `pg`, with versioned SQL migrations.
- Shared validation definitions; pinned dependencies and committed lockfile.
- Nginx exposes the public port; the API and database remain internal to Compose. PostgreSQL uses a persistent named volume.

**Approved public deployment:** Vercel frontend and Next.js API projects, with Neon PostgreSQL. The frontend forwards `/api/*` to the backend, keeping browser requests on the site’s origin. Document that Vercel replaces Nginx publicly; the full Compose deployment remains reproducible locally. [Vercel rewrites](https://vercel.com/docs/routing/rewrites), [Neon Free plan](https://neon.com/pricing)

Treat this as a fictional portfolio demonstration within Vercel Hobby’s personal, non-commercial scope. [Vercel Hobby documentation](https://vercel.com/docs/plans/hobby)

**Public interface:** `POST /api/lead`

- Accept name, Belarusian phone, interest (`subscription`, `one_time`, `question`), optional comment, selected product, and attribution.
- Parse and validate the phone on both client and server; store its canonical `+375…` representation. Show a Russian example and an inline correction message.
- Save UTMs, advertising click identifiers (`yclid`, `gclid`, `fbclid`), initial landing URL, initial referrer, and submission URL. Preserve initial attribution across reloads within the browser tab.
- Store the lead and attribution together. Provide a documented read-only SQL query for inspecting applications; an admin interface is outside this assignment.
- Prevent duplicates through a PostgreSQL transaction and a transaction-scoped lock per normalised phone. Check the preceding ten minutes after acquiring the lock, then insert only when eligible. This must work across concurrent API instances. [PostgreSQL locking documentation](https://www.postgresql.org/docs/current/explicit-locking.html)
- Return `201` for a new application, `200` for an already accepted duplicate, `400` for invalid input, and `503` for temporary storage failure.
- Disable repeat submission while pending. On failure, retain entered values and offer retry. Confirm success only after the database commit.
- Include `GET /api/health`, bounded request size, parameterised SQL, and logs without full application contents.

## 4. GitHub phases and issue backlog

Verified repository: [ksayron/COFFEE_SHOP](https://github.com/ksayron/COFFEE_SHOP). It currently has no issues or milestones. The local workspace contains only the copied [github.md](/D:/Projects/COFFEE_LANDING/github.md) and is not yet a Git checkout.

**The following are issue drafts, not created GitHub issues.** Planning mode prevents file and GitHub mutations this turn.

| Milestone | Issue to create | Observable acceptance |
|---|---|---|
| **M0 — Delivery setup** | Adapt GitHub runbook and initialise repository | Project-specific `github.md`, initial `main`, labels, milestones, and linked backlog exist. |
| **M1 — Runnable foundation** | Bootstrap React SPA, Next API, and shared validation | Both applications build; API health check responds. |
| M1 | Package Nginx, API, and PostgreSQL in Compose | One documented command starts the stack; migrations run; data survives restart. |
| M1 | Establish Vercel + Neon deployment | Public skeleton loads and a test request reaches persistent storage. |
| **M2 — Visual direction** | Document references, copy, and image provenance | Approved references and supplied business facts are recorded; assets have provenance. |
| M2 | Compare two representative previews | Mobile and desktop compositions are inspected; selected treatment is documented. |
| **M3 — Landing and leads** | Build the responsive landing and enquiry flow | All required content and prices are present; product/subscription actions reach the form. |
| M3 | Implement persistent leads, attribution, and deduplication | Validation, concurrent duplicate handling, attribution, and recoverable failures pass integration checks. |
| **M4 — Verification** | Verify browser behaviour, accessibility, and public deployment | Mobile/desktop evidence and public form/database checks are saved. |
| **M5 — Submission** | Capture Lighthouse and assemble honest handoff | Live URL, repository URL, AI evidence, report, and concise README are ready together. |

Target **4–6 implementation hours**, excluding research already completed. Establish public deployment early; prioritise the working lead flow and visual coherence. Include social preview metadata and an image. Keep Telegram as an optional follow-up after required acceptance checks pass.

Update `github.md` specifically for this project:

- Replace all Sensei++ repository, board, architecture, CI, and milestone references.
- Require explicit `-R ksayron/COFFEE_SHOP` for supported GitHub commands.
- Use milestones for phases; do not reuse another project’s board.
- Retain `todo → in-progress → review → done` status labels, one priority/type label, and relevant scope labels.
- Give each issue an outcome, deliverables, acceptance criteria, dependencies, and exclusions.
- Establish `main` with one bootstrap commit, then use short-lived issue branches and pull requests with incremental commits.
- Close issues only after acceptance evidence is linked. Do not claim branch protection until configured and verified.

## 5. Verification and handoff

Required checks:

- Valid Belarusian formats normalise consistently; invalid and foreign numbers are rejected server-side.
- Double clicks, parallel requests, and retry after a lost response create one application within ten minutes.
- A new application is accepted after the rolling window expires; different phones remain independent.
- Advertising parameters and original landing attribution survive reload and reach PostgreSQL.
- Database failure produces a visible, recoverable error without losing form values.
- Compose works from a clean start, and persisted applications survive restart.
- At 390, 768, and 1440 px: readable content, no horizontal overflow, usable form controls, keyboard focus, and reduced-motion support.
- The public form creates a real database record; the same public deployment receives the mobile Lighthouse audit.

Aim for **90+ mobile Lighthouse performance**, reporting the actual result and conditions. Save the report, representative screenshots, and genuine AI decision/correction evidence without inventing mistakes.

The half-page README will explain ownership between you and AI, actual errors caught, PostgreSQL and deployment choices, image sources, assumptions, verification, and unfinished work. No fabricated business phone or email will be introduced; the supplied address and working enquiry form provide the contact route.

Submission deadline: **19 October 2026, 18:00 Moscow/Minsk time**.
</proposed_plan>

<oai-mem-citation>
<citation_entries>
MEMORY.md:793-800|note=[design workflow selection and distinct concept comparison]
</citation_entries>
<rollout_ids>
01a117eb-adc9-7860-856e-aa66f7b8b585
</rollout_ids>
</oai-mem-citation>
````

## 2026-10-18T18:53:08.076Z · user · message

````text
PLEASE IMPLEMENT THIS PLAN:
# Кварта — approved references and development plan

## 1. Research and approved direction

**Approved:** “Neighbourhood workshop,” using **Florets + Jolene** as the main references and **Zerno in Minsk** for atmosphere. Reference approval is recorded; no design has been applied.

The useful pattern across these examples is **a coherent business identity expressed through ordinary details**: signage, packaging, photographs, menus, and language. Кварта can achieve that through its founders, small batches, and Thursday–Friday rhythm, with restrained animation.

| Reference | Evidence | What we take from it |
|---|---|---|
| **Florets Bakery — primary** | [1/1 Studio’s case study](https://1of1studio.com/projects/florets-bakery) documents typography, packaging, signage, desktop/mobile pages, and subscriptions. | A close relationship between the physical workshop and its website; readable, menu-like product presentation. |
| **Jolene — primary** | [Design Week’s article](https://www.designweek.co.uk/studio-frith-on-jolenes-living-brand-evolution/) examines Studio Frith’s identity and digital work. | One memorable human detail, candid photography, and an otherwise disciplined layout. |
| **Zerno — atmosphere** | [Studio11’s project](https://studio11.by/zerno-ru) documents the Minsk interior; [ArchDaily](https://www.archdaily.com/957067/zerno-coffee-shop-studio11) identifies the architects and photographer. | Daylight, simple materials, historical texture, and a recognisable local setting. |
| **Touchy — alternative considered** | Featured by [Lapa Ninja](https://www.lapa.ninja/post/touchycoffee/) and credited on [Siteinspire](https://www.siteinspire.com/profile/9388-abbr-projects). | Strong personality through lettering, colour, and packaging. Its playful direction was not selected. |
| **Little Wolf — alternative considered** | [BP&O’s detailed review](https://bpando.org/2017/12/04/coffee-packaging-little-wolf/) covers its friendly illustrated identity. | Warmth paired with clear product information. Illustration would require additional original assets. |
| **Union Boulangerie — alternative considered** | [Siteinspire’s selection](https://www.siteinspire.com/website/13641-union-boulangerie). | Process-based storytelling and editorial hierarchy. Its interactive experience adds unnecessary scope here. |

Useful broader compilations: [Siteinspire: Food & Drink](https://www.siteinspire.com/websites/category/food-and-drink), [BP&O: Coffee](https://bpando.org/2017/06/14/bpo-collections-coffee/), and [BP&O: Cafés & Coffee Shops](https://bpando.org/2017/03/14/bpo-collections-cafes/).

These are curated references and published case studies, not a claim that every example won an award. Browser loading failed during research; current mobile interaction and performance remain unverified.

## 2. Design and content approach

Use **Design Taste Frontend** as the primary implementation workflow because this is a bespoke small-business landing page. Its layout and identity guidance fits better than a broad component catalogue. User requirements override its motion defaults.

- Develop two small representative previews within the approved direction, each showing the same hero, product sample, and application action on mobile and desktop. Compare composition and readability before extending the stronger version.
- Lead with the workshop’s specific promise: **«Обжариваем в четверг. В пятницу привозим по Минску.»**
- Follow with freshness and the founders’ story, assortment and prices, subscription, delivery/self-pickup, then the application form and contact details.
- Give the subscription a clear offer: **54 BYN/month, two 250 g packs, free delivery**. Product actions preselect the relevant interest and carry the selected product into the application.
- Build personality through photography, typography, short captions, and roast-label details. Establish final colours and Cyrillic font choices during the preview phase.
- Use normal scrolling and brief control-state transitions. Avoid autoplay video, scroll hijacking, parallax, and an animation library.
- Use Zerno photographs as research references. Delivered images must be original, generated, or explicitly licensed for reuse; attribution alone does not establish permission. Record asset provenance.
- Preserve the fictional client’s supplied address, prices, schedule, and founders’ names. Do not borrow Zerno’s contact details or identify unrelated people as Аня and Дмитрий.

## 3. Architecture and application behaviour

**Local package:** one Docker Compose file with three services:

`Browser → Nginx: React SPA + /api proxy → Next.js API → PostgreSQL`

- React + TypeScript + Vite frontend.
- Radix Primitives for the few controls needing accessible interaction, with project-specific styling. Radix ships unstyled, allowing the identity to remain custom. [Official documentation](https://www.radix-ui.com/primitives/docs/overview/introduction)
- Next.js Route Handlers for the backend, using its Node runtime and standalone Docker output. [Official deployment documentation](https://nextjs.org/docs/app/getting-started/deploying)
- PostgreSQL accessed through `pg`, with versioned SQL migrations.
- Shared validation definitions; pinned dependencies and committed lockfile.
- Nginx exposes the public port; the API and database remain internal to Compose. PostgreSQL uses a persistent named volume.

**Approved public deployment:** Vercel frontend and Next.js API projects, with Neon PostgreSQL. The frontend forwards `/api/*` to the backend, keeping browser requests on the site’s origin. Document that Vercel replaces Nginx publicly; the full Compose deployment remains reproducible locally. [Vercel rewrites](https://vercel.com/docs/routing/rewrites), [Neon Free plan](https://neon.com/pricing)

Treat this as a fictional portfolio demonstration within Vercel Hobby’s personal, non-commercial scope. [Vercel Hobby documentation](https://vercel.com/docs/plans/hobby)

**Public interface:** `POST /api/lead`

- Accept name, Belarusian phone, interest (`subscription`, `one_time`, `question`), optional comment, selected product, and attribution.
- Parse and validate the phone on both client and server; store its canonical `+375…` representation. Show a Russian example and an inline correction message.
- Save UTMs, advertising click identifiers (`yclid`, `gclid`, `fbclid`), initial landing URL, initial referrer, and submission URL. Preserve initial attribution across reloads within the browser tab.
- Store the lead and attribution together. Provide a documented read-only SQL query for inspecting applications; an admin interface is outside this assignment.
- Prevent duplicates through a PostgreSQL transaction and a transaction-scoped lock per normalised phone. Check the preceding ten minutes after acquiring the lock, then insert only when eligible. This must work across concurrent API instances. [PostgreSQL locking documentation](https://www.postgresql.org/docs/current/explicit-locking.html)
- Return `201` for a new application, `200` for an already accepted duplicate, `400` for invalid input, and `503` for temporary storage failure.
- Disable repeat submission while pending. On failure, retain entered values and offer retry. Confirm success only after the database commit.
- Include `GET /api/health`, bounded request size, parameterised SQL, and logs without full application contents.

## 4. GitHub phases and issue backlog

Verified repository: [ksayron/COFFEE_SHOP](https://github.com/ksayron/COFFEE_SHOP). It currently has no issues or milestones. The local workspace contains only the copied [github.md](/D:/Projects/COFFEE_LANDING/github.md) and is not yet a Git checkout.

**The following are issue drafts, not created GitHub issues.** Planning mode prevents file and GitHub mutations this turn.

| Milestone | Issue to create | Observable acceptance |
|---|---|---|
| **M0 — Delivery setup** | Adapt GitHub runbook and initialise repository | Project-specific `github.md`, initial `main`, labels, milestones, and linked backlog exist. |
| **M1 — Runnable foundation** | Bootstrap React SPA, Next API, and shared validation | Both applications build; API health check responds. |
| M1 | Package Nginx, API, and PostgreSQL in Compose | One documented command starts the stack; migrations run; data survives restart. |
| M1 | Establish Vercel + Neon deployment | Public skeleton loads and a test request reaches persistent storage. |
| **M2 — Visual direction** | Document references, copy, and image provenance | Approved references and supplied business facts are recorded; assets have provenance. |
| M2 | Compare two representative previews | Mobile and desktop compositions are inspected; selected treatment is documented. |
| **M3 — Landing and leads** | Build the responsive landing and enquiry flow | All required content and prices are present; product/subscription actions reach the form. |
| M3 | Implement persistent leads, attribution, and deduplication | Validation, concurrent duplicate handling, attribution, and recoverable failures pass integration checks. |
| **M4 — Verification** | Verify browser behaviour, accessibility, and public deployment | Mobile/desktop evidence and public form/database checks are saved. |
| **M5 — Submission** | Capture Lighthouse and assemble honest handoff | Live URL, repository URL, AI evidence, report, and concise README are ready together. |

Target **4–6 implementation hours**, excluding research already completed. Establish public deployment early; prioritise the working lead flow and visual coherence. Include social preview metadata and an image. Keep Telegram as an optional follow-up after required acceptance checks pass.

Update `github.md` specifically for this project:

- Replace all Sensei++ repository, board, architecture, CI, and milestone references.
- Require explicit `-R ksayron/COFFEE_SHOP` for supported GitHub commands.
- Use milestones for phases; do not reuse another project’s board.
- Retain `todo → in-progress → review → done` status labels, one priority/type label, and relevant scope labels.
- Give each issue an outcome, deliverables, acceptance criteria, dependencies, and exclusions.
- Establish `main` with one bootstrap commit, then use short-lived issue branches and pull requests with incremental commits.
- Close issues only after acceptance evidence is linked. Do not claim branch protection until configured and verified.

## 5. Verification and handoff

Required checks:

- Valid Belarusian formats normalise consistently; invalid and foreign numbers are rejected server-side.
- Double clicks, parallel requests, and retry after a lost response create one application within ten minutes.
- A new application is accepted after the rolling window expires; different phones remain independent.
- Advertising parameters and original landing attribution survive reload and reach PostgreSQL.
- Database failure produces a visible, recoverable error without losing form values.
- Compose works from a clean start, and persisted applications survive restart.
- At 390, 768, and 1440 px: readable content, no horizontal overflow, usable form controls, keyboard focus, and reduced-motion support.
- The public form creates a real database record; the same public deployment receives the mobile Lighthouse audit.

Aim for **90+ mobile Lighthouse performance**, reporting the actual result and conditions. Save the report, representative screenshots, and genuine AI decision/correction evidence without inventing mistakes.

The half-page README will explain ownership between you and AI, actual errors caught, PostgreSQL and deployment choices, image sources, assumptions, verification, and unfinished work. No fabricated business phone or email will be introduced; the supplied address and working enquiry form provide the contact route.

Submission deadline: **19 October 2026, 18:00 Moscow/Minsk time**.
````

## 2026-10-18T18:53:23.685Z · assistant · commentary

````text
I’ll start with the GitHub setup and a runnable deployment skeleton, then build the approved visual direction and lead flow. I’ll keep commits and verification evidence along the way, and check hosting access early so any account dependency doesn’t hold up the rest of the work.
````

## 2026-10-18T18:54:17.390Z · assistant · commentary

````text
Reading this as a mobile-first landing page for a neighbourhood roastery: warm photography, practical shop typography, and a prominent Thursday–Friday rhythm. I’m using the approved Design Taste Frontend workflow, with Radix controls and minimal motion.

Docker Desktop’s engine is stopped. I’ll start it for the Compose checks and check whether Vercel and Neon are already authenticated.
````

## 2026-10-18T18:57:01.048Z · assistant · commentary

````text
The approved references and technical choices are now the implementation baseline. I’m setting up the repository and acceptance checklist first, so each phase can be reviewed against working behaviour and saved evidence.
````

## 2026-10-18T19:00:37.545Z · assistant · commentary

````text
The repository’s bootstrap commit is ready. I found no saved Vercel or Neon credentials, so public deployment will need account access; the local build can proceed independently.

The package registry also timed out during version checks. I’m checking that connection before installing dependencies.
````

## 2026-10-18T19:03:44.963Z · assistant · commentary

````text
Repository publication succeeded, but DNS failures are now interrupting GitHub and npm requests. I’ll address that connection issue while preparing the application files.

For the imagery, I’m using the Imagegen skill to create an original workshop scene. Zerno’s photographs will remain research references.
````

## 2026-10-18T19:03:48.442Z · user · message

````text
<send_user_message_question_reply>
[{"questionItemId":"[\"request_user_input_async\",\"call_bb54d3c4cc2e4093b0a7496b11001b69\",0]","question":"Public deployment needs Vercel and Neon account access; neither has saved credentials here. Are you available to complete their browser sign-in flows when I provide the login links?","answer":"finish locallly (launched docker for you), leave deploy for later"}]
</send_user_message_question_reply>
````

## 2026-10-18T19:03:59.905Z · assistant · commentary

````text
Understood. I’ll complete and verify the local Docker deployment, prepare the Vercel/Neon configuration, and leave public deployment and its Lighthouse audit for later.
````

## 2026-10-18T19:07:29.058Z · assistant · commentary

````text
Docker is now available. Public deployment is deferred as requested.

The two previews will compare a type-led workshop notice with a photo-led introduction. Both will use the same headline, product sample and action, so the choice rests on composition and readability.
````

## 2026-10-18T19:15:37.995Z · assistant · commentary

````text
The original workshop image is ready: daylight, a compact roaster, worn timber and plain packaging. It gives the page a consistent visual setting without borrowing another café’s identity.

Seven GitHub issues have been created. Intermittent connection failures interrupted the rest; I’ll finish the backlog and link the evidence as work lands.
````

## 2026-10-18T19:29:25.434Z · assistant · commentary

````text
The ten-issue backlog and milestones are in place, and the setup PR is merged.

The API now has the core transaction flow: acquire a PostgreSQL lock for the normalised phone, check the preceding ten minutes, then insert or return the accepted duplicate. Next I’ll test that with concurrent requests and connect the form’s pending, failure and success states.
````

## 2026-10-18T19:49:38.411Z · assistant · commentary

````text
The landing and form code are ready for browser checks. Product actions carry the chosen coffee into the form; failed requests retain the entered values; successful submissions wait for the API’s committed result.

The tests cover double clicks, lost-response retries, attribution after reload, two API containers submitting concurrently, and database failure/recovery. Dependency downloads are still slow, so these checks have not run yet.
````

## 2026-10-18T19:58:34.151Z · assistant · commentary

````text
The images, font licenses and self-hosted Cyrillic fonts are prepared, with their sources and prompts recorded.

Downloads are still interrupting local verification: npm requests stall and a Docker layer download ended early. I’m retrying cached downloads while keeping the remaining work local.
````

## 2026-10-18T19:59:45.676Z · user · message

````text
<send_user_message_question_reply>
[{"questionItemId":"[\"request_user_input_async\",\"call_ac7bc8305b9e44e6a114949669c9b8d7\",0]","question":"GitHub, npm and Docker downloads are repeatedly timing out or disconnecting, including a partial Docker layer. Is there a VPN/proxy or connection issue you can check? I’ll continue with the implementation and retries meanwhile.","answer":"leave dependencies for me to download"}]
</send_user_message_question_reply>
````

## 2026-10-18T20:00:03.266Z · assistant · commentary

````text
Understood. I’ll stop the downloads and finish the code, configuration and handoff instructions. I’ll use offline checks where possible and clearly mark builds, browser checks and Docker verification as pending.
````

## 2026-10-18T20:16:33.586Z · assistant · commentary

````text
I can inspect the layouts without downloading packages: both previews render to static HTML using an existing local React toolchain. The type-led version is the stronger starting point so far, keeping the Thursday–Friday promise ahead of the photo.

I also caught a bug in the preview server: a missing file could crash it after headers were sent. I’m fixing that before completing the comparison.
````

## 2026-10-18T20:21:04.918Z · assistant · commentary

````text
Both previews are captured at 390 and 1440 px. I’m selecting the type-led composition: its main action appears roughly 300 px earlier on mobile while keeping the workshop photo prominent.

Downloads have stopped as requested. I’ll leave package installation and runtime verification pending, and keep the implementation PR in draft rather than closing unchecked issues.
````

## 2026-10-18T20:26:30.224Z · assistant · commentary

````text
The offline checks passed: source syntax and local imports, Compose configuration, Nginx configuration syntax, and the migration on a disposable cached PostgreSQL 17 container. Sixteen concurrent locked inserts produced one row; expiring the window allowed another.

These checks do not exercise the Next.js endpoint or React form. Those remain pending installation. The serif font is also smaller now—about 94 KB instead of 266 KB—while retaining Cyrillic and the required weights.
````

## 2026-10-18T20:37:30.499Z · assistant · commentary

````text
I’m finishing the local source, verification notes, and draft pull request. Dependency downloads remain with you; I’ll clearly separate the checks already run from the full build and form tests that still need installation.
````

## 2026-10-18T20:38:03.554Z · assistant · commentary

````text
The page source and lead-handling logic are complete. I’m preparing the handoff so your first installation has a clear path: generate the lockfile, run the checks, then start Compose. The draft PR will keep runtime acceptance open.
````

## 2026-10-19T09:10:58.822Z · user · message

````text
finish where you left off
````

## 2026-10-19T09:11:04.387Z · assistant · commentary

````text
I’ll pick up from the local implementation and finish the handoff and GitHub draft. Dependency downloads stay with you, and public deployment remains deferred.
````

## 2026-10-19T09:12:26.494Z · assistant · commentary

````text
The refreshed source and configuration checks passed. I also found a screenshot captured before the browser finished resizing, so I’m replacing that comparison image before committing the evidence. Full application tests still await installation.
````

## 2026-10-19T09:14:32.249Z · assistant · commentary

````text
The source, Compose configuration, and preview checks passed again. Docker is stopped now, so I couldn’t repeat the container checks; the handoff will retain the successful PostgreSQL/Nginx results from 18 October and note today’s failed rerun separately.
````
