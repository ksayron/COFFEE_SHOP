# Selected treatment: workshop notice

The human approved Florets + Jolene, with Zerno for atmosphere, before implementation.
Design Taste Frontend is the primary workflow. Variation 6 / motion 2 / density 3.
An intentionally light printed identity overrides automatic dark-mode/motion defaults.

## Comparison actually inspected

Both previews use the same headline, workshop image, Ethiopia sample and enquiry
action. React server-rendered representative previews were inspected through the
Codex browser at 390×844 and 1440×900 on 18 October 2026. This used an existing local
React/TypeScript toolchain, not a completed install of this project's dependencies.
They are static visual previews, not evidence that the SPA/API works.
Captures were refreshed on 19 October. The responsive override is 390×844 or
1440×900 CSS pixels; PNG capture dimensions differ in the in-app browser and
are recorded in `evidence/assets.json`. Saved DOM measurements show loaded fonts
and `scrollWidth <= innerWidth` for the selected representative preview.

| Treatment | Composition | Observed result |
| --- | --- | --- |
| Notice (selected) | Headline before image on mobile; text left, photo right on desktop | Main action begins around y=490 on mobile, before the photo; readable promise first |
| Photo | Image before headline on mobile; photo left, text right on desktop | Strong atmosphere, but main action starts around y=810, too late for ad visitors |

- [Notice mobile](../evidence/previews/notice-390.png)
- [Notice desktop](../evidence/previews/notice-1440.png)
- [Photo mobile](../evidence/previews/photo-390.png)
- [Photo desktop](../evidence/previews/photo-1440.png)

The selected treatment extends into an ordinary product menu, a small tilted roast
note, packaging photograph with subscription, delivery details and a plain form.
Golos Text supports clear Russian UI; Literata gives headlines and wordmark a
printed-shop character. Pale paper and celadon match the original fictional
photographs. Forest green is the one action colour. No scroll effects or animation library.

Long Russian headline is deliberately five lines on mobile, keeping the exact
approved promise readable; the action still fits before the first photo. Small
captions are secondary; price, product and CTA remain primary. Original photos
and supplied Thursday/Friday rhythm carry identity instead of decorative cards.

## Verification limits

The preview server initially crashed on a missing file after sending headers.
Reading the file before writing the response fixed it; subsequent captures worked.
Full SPA rendering, real Radix keyboard behaviour, accessibility auditing and
cross-browser/device testing remain pending dependency installation. See
`docs/verification.md`; do not infer those checks from these screenshots.
