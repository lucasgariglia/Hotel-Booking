import React from 'react';
// Note the change here: we use 'react-dom' instead of 'react-dom/client' for v19 compatibility
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}