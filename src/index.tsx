import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { TrustProvider } from './TrustContext';

const container = document.getElementById('root');

if (!container) {
  console.error("Critical Error: The #root element was not found in index.html");
} else {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <TrustProvider>
        <App />
      </TrustProvider>
    </React.StrictMode>
  );
}
