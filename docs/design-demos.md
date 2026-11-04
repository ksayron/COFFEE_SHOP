# Three local homepage concepts · 19 October 2026

The human requested a radical comparison after finding the original too generic.
They chose short concept pages and real photography plus illustration. The
initial implementation added alternatives. The human subsequently selected **Printed
coffee club for the whole site**; see [the full-site implementation](coffee-club-site.md).

## Open locally

Run `npm run dev:web` from the repository root. Existing development server:

- [Comparison](http://localhost:5173/designs)
- [01 · Neighbourhood storefront](http://localhost:5173/designs/storefront)
- [02 · Printed coffee club](http://localhost:5173/designs/club)
- [03 · Roast ticket](http://localhost:5173/designs/roast-ticket)
- [Current full homepage](http://localhost:5173/)

These are ordinary SPA paths with native links and lazy page modules; no router
package was added. Unknown `/designs/...` paths show the comparison with a clear
message. The original query-string representative previews still work in dev.

## Design Explorer decision

Frontend Design is the primary workflow: three independent art directions need
composition, lettering and original visual assets. Design Taste Frontend was
considered but refining its existing treatment would not answer this request.
React, native CSS Modules and the existing Radix icons remain the foundation.

| Direction | Composition and hierarchy | Audience fit / tradeoff |
| --- | --- | --- |
| Storefront | Brick-red sign, compact wordmark, documentary street photo, shop-counter product/offer layout; Golos | Most familiar neighbourhood-business feel. Real atmosphere helps warmth; photo depicts another cafe, so the review footer explicitly identifies it |
| Club | Butter/cobalt poster, Unbounded, original cup-and-bag illustration, tilted product label | Most playful and extensible to packaging. Illustration costs more to develop; strong colour and display type require restraint when expanding |
| Roast ticket | Thursday-to-Friday type composition, label rules, orange subscription panel, monospaced annotations | Most direct and graphic, with offers visible early on mobile. Less inherently cosy; the founders' plain-language copy balances the utilitarian layout |

Each uses the same factual promise, 5 kg batches, founders, Ethiopia 250 g / 32 BYN
and subscription 2 × 250 g / 54 BYN with free delivery. All enquiry actions go to
the main `/#application` form; no demo sends a lead or simulates success.
The initial comparison kept `/` unchanged. The subsequent approved Club expansion
now lives at `/`; the checks below describe the earlier comparison phase.

## Assets

- Documentary photograph: Luigi Ritchie, [Unsplash source](https://unsplash.com/photos/people-inside-a-coffee-roasters-shop-BglKEQdyQzM),
  explicitly free under the [Unsplash license](https://unsplash.com/license), checked 19 October.
  Source image `photo-1760132800545-67831c723bb1`; only resize/rotation metadata
  normalization and WebP compression. Layout cropping uses CSS. This is another
  business, not evidence of premises at Короля, 9. People are not identified as founders.
- Club illustration: original SVG paths/text in the React component, two colours;
  no generated interior photographs used by the demos.
- [Unbounded source](https://github.com/google/fonts/tree/main/ofl/unbounded):
  SIL OFL, fixed at weight 700 and subset for Latin/Cyrillic. Delivered 42,276 bytes.
- [IBM Plex Mono source](https://github.com/google/fonts/tree/main/ofl/ibmplexmono):
  SIL OFL, regular Latin/Cyrillic subset. The source reserves the name "Plex";
  modified subset family/PostScript names are renamed **Kvarta Label Demo** and
  original copyright/license retained. Delivered 24,172 bytes.
- Licenses are beside fonts in `apps/web/public/fonts/demos`. Asset hashes, sizes
  and screenshot dimensions: [assets.json](../evidence/design-demos/assets.json).
- Gallery thumbnails are compressed copies of actual desktop browser captures.

Reproduction uses `node scripts/prepare-demo-assets.mjs`, then
`python scripts/prepare-demo-fonts.py` (existing local fontTools required).
No npm dependency install is part of these scripts. Assets are served locally;
the demos do not load third-party font/image URLs at runtime.

## Executed verification · initial comparison phase

- Frontend `tsc --noEmit -p apps/web` and Vite production build passed with the
  author's existing installed dependencies. No dependency installation performed.
- All three concepts plus comparison index inspected at 390, 768 and 1440 CSS px.
  Twelve final measurements: `scrollWidth <= clientWidth`, fonts loaded, displayed
  images loaded. [Responsive evidence](../evidence/design-demos/responsive-checks.json).
  In-app PNG dimensions differ from CSS viewport dimensions; both are recorded.
- Direct navigation and refresh passed for all three demo routes in dev and in
  the local production preview. [Refresh](../evidence/design-demos/refresh-checks.json),
  [built preview](../evidence/design-demos/production-preview.json). Temporary preview server stopped afterwards.
- Gallery-to-concept navigation and enquiry links tested. Form heading receives
  focus after navigation; no form submission or database mutation performed.
- Keyboard Tab reaches the visible skip link with a 3 px outline. Main action
  targets measured at least 44 px high. Source uses only short opacity transitions,
  disabled by reduced-motion CSS; OS preference switching was not emulated.
- Original homepage before/after at 1440×900: identical hero geometry/font and
  **zero changed pixel channels** in the saved viewport captures.
  [Comparison record](../evidence/design-demos/original-comparison.json).
- Screenshots include desktop/mobile/tablet first views and sampled lower offers.
  [Comparison screenshot](../evidence/design-demos/gallery-1440.png).

Browser scope: one in-app Chromium engine with viewport resizing, not physical
devices, Safari, screen-reader testing or a complete accessibility audit. Backend,
real submission, public hosting and Lighthouse are outside this design iteration.

## Corrections observed during implementation

The first mobile storefront wordmark overflowed by 11 px relative to the client
width. Reduced size and looser tracking removed it. Club display tracking was
also loosened after visual inspection. The gallery thumbnail aspect ratio was
matched to the actual captures to avoid cutting off words.

Lazy loading caused the browser's initial `#application` lookup to happen before
the form existed. Added a post-mount, font-ready initial-fragment position/focus
step; verified the actual destination. Original homepage layout is unchanged.

The local fontTools version failed on Unbounded's retained variation axis.
Instantiating one display weight before subsetting fixed it. The font license
review also caught IBM's reserved name; the modified font metadata was renamed.
