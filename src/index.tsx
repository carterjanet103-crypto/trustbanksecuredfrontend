import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TrustProvider } from './TrustContext';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <TrustProvider>
        <App />
      </TrustProvider>
    </React.StrictMode>
  );
}
