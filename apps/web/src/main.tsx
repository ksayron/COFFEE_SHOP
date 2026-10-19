import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
const root = createRoot(document.getElementById('root')!);
const preview = new URLSearchParams(location.search).get('preview');
if (import.meta.env.DEV && (preview === 'notice' || preview === 'photo')) {
  import('./Preview').then(({ Preview }) => root.render(<React.StrictMode>
    <Preview variant={preview} />
  </React.StrictMode>));
}
else {
  root.render(<React.StrictMode>
    <App />
  </React.StrictMode>);
}
