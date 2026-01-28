import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TrustProvider } from './TrustContext';
import './index.css'; // Ensure this file exists for Tailwind

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <TrustProvider>
      <App />
    </TrustProvider>
  </React.StrictMode>
);
