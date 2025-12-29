import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js'; // Notice we point to App.js now

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  React.createElement(React.StrictMode, null, 
    React.createElement(App, null)
  )
);