import { attributionKeys, attributionSchema, type Attribution } from '@kvarta/shared';
const KEY = 'kvarta:first-touch:v1';
let firstTouch: Omit<Attribution, 'submissionUrl'> | undefined;
const pageUrl = () => location.href.slice(0, 2048);
export function attribution(): Attribution {
  if (!firstTouch) {
    try {
      const stored = sessionStorage.getItem(KEY);
      if (stored) {
        const parsed = attributionSchema.safeParse({ ...JSON.parse(stored), submissionUrl: pageUrl() });
        if (parsed.success) {
          const { submissionUrl: _, ...initial } = parsed.data;
          firstTouch = initial;
        }
      }
    }
    catch { /* Storage may be disabled. Keep first touch in memory. */ }
    if (!firstTouch) {
      firstTouch = { landingUrl: pageUrl(), referrer: document.referrer.slice(0, 2048) };
      const params = new URLSearchParams(location.search);
      for (const key of attributionKeys) {
        const value = params.get(key);
        if (value)
          firstTouch[key] = value.slice(0, 256);
      }
      try {
        sessionStorage.setItem(KEY, JSON.stringify(firstTouch));
      }
      catch { /* Private browser mode remains usable. */ }
    }
  }
  return { ...firstTouch, submissionUrl: pageUrl() };
}
