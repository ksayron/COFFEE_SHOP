# Selected full-site concept · 19 October 2026

Human selection: **Printed coffee club for the whole site**. The earlier
three-concept comparison is retained, and `/` now uses the selected identity.
Local URL: http://localhost:5173/ · comparison: http://localhost:5173/designs.

## Implementation

The approved Club hero and original SVG remain shared with the short demo.
The full page adds the founders' story, four cream product labels with supplied
prices, a subscription poster, delivery and pickup/hours, callback form and footer.
Cobalt, butter and Unbounded are balanced with Golos body text and plain controls.
No generated interior photos, animation library or runtime external assets.
The favicon, theme colour and 1200×630 social artwork match the chosen identity.

Product buttons set the one-time interest and correct coffee; subscription/advice
buttons select their interest, scroll to the form and focus its heading. Existing
LeadForm state, validation, attribution and POST logic are unchanged. Its styles
are now isolated in a CSS Module. No API/database/deployment changes.

Tradeoff: the expressive hero fills most of a desktop first viewport. The offer
and action remain legible, and lower sections use quieter type for scanning.
At 320 px the subscription quantity wraps; the caption remains inside the arch.

## Executed verification

- `node node_modules/typescript/bin/tsc --noEmit -p apps/web`: passed.
- `npm run build -w @kvarta/web`: passed with installed packages; no reinstall.
- Browser layout checks at 390, 768, 1440 and extra 320 CSS px: loaded fonts,
  all four products/form present, no horizontal overflow. Primary product actions
  measured 45–46 px high; advice action 44 px. See
  [responsive measurements](../evidence/coffee-club-site/responsive-checks.json).
- Product preselection/removal, subscription/question actions, invalid foreign
  phone correction and focus were exercised. Keyboard controls received a visible
  outline; ArrowRight moved radio focus, Space selected the focused choice.
- A real local POST encountered the offline API: clear recoverable error/retry,
  entered values retained. Synthetic test data only; no accepted lead claimed.
- Local production preview at port 5174: direct `/#application`, refresh, correct
  heading focus, loaded fonts, 50 px inputs and no overflow. The preserved Club
  demo also rendered from the built bundle. Temporary preview server stopped.
  [Production observations](../evidence/coffee-club-site/production-preview.json).
- Read-only diff confirmed LeadForm changes are presentation classes/import only.
  The author's untracked lockfile/Next declaration hashes remain unchanged.

Representative screenshots: [desktop hero](../evidence/coffee-club-site/hero-1440.png),
[mobile hero](../evidence/coffee-club-site/hero-390.png),
[products](../evidence/coffee-club-site/products-1440.png),
[tablet subscription](../evidence/coffee-club-site/subscription-768.png),
[desktop form](../evidence/coffee-club-site/form-1440.png),
[mobile form](../evidence/coffee-club-site/form-390.png),
[mobile retry](../evidence/coffee-club-site/form-error-390.png).
PNG dimensions can differ from the CSS viewport in the in-app browser; the asset
manifest records capture dimensions separately. These are sampled views, not a
single full-page screenshot or a screen-reader/device accessibility audit.

## Corrections and limits

A 320 px review caught an arched caption clipping; its width was reduced. CSS
formatting left stale CSS Module hashes during Vite hot refresh; a fresh load
and separate production check verified the final styling. Earlier/final captures
with a stale viewport or unfinished styling were replaced or excluded.

The local Next API was unavailable during this iteration; no successful database
save, concurrent API deduplication or Compose persistence was reverified. Those
checks remain open. No public deployment, Lighthouse, messenger preview validation,
GitHub changes or dependency downloads were performed. Reduced-motion CSS exists;
OS preference switching and additional browser engines were not exercised.
