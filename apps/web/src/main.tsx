import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root')!);
// Lazy page loading finishes after the browser's initial fragment lookup.
function InitialHashPosition() {
  useEffect(() => {
    const id = location.hash.slice(1);
    if (!id) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: 'instant' });
      target?.querySelector<HTMLElement>('[tabindex="-1"]')?.focus({ preventScroll: true });
    });
    return () => { cancelled = true; };
  }, []);
  return null;
}
const preview = new URLSearchParams(location.search).get('preview');
const pathname = location.pathname.replace(/\/+$/, '') || '/';
if (pathname === '/designs' || pathname.startsWith('/designs/')) {
  import('./demos/DesignDemos').then(({ DesignDemos }) => root.render(<React.StrictMode>
    <DesignDemos pathname={pathname} />
  </React.StrictMode>));
}
else if (import.meta.env.DEV && (preview === 'notice' || preview === 'photo')) {
  import('./Preview').then(({ Preview }) => root.render(<React.StrictMode>
    <Preview variant={preview} />
  </React.StrictMode>));
}
else {
  import('./App').then(({ App }) => root.render(<React.StrictMode>
    <App />
    <InitialHashPosition />
  </React.StrictMode>));
}
