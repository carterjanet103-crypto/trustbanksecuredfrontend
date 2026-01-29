import React, { useState, useCallback, useEffect } from 'react';
import { useTrust } from './TrustContext';
import { Analytics } from '@vercel/analytics/react';

// Components
import Sidebar from '../Sidebar';
import Dashboard from '../Dashboard';
import Login from '../Login';
import Transfers from '../Transfers';
import Security from '../Settings'; // Using Settings as Security
import Home from '../Home';

const App: React.FC = () => {
  const { user, transactions } = useTrust();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // ROOT NAVIGATION STATE
  const [viewState, setViewState] = useState(() => {
    const isAuth = sessionStorage.getItem('trustbank_session') === 'active';
    return isAuth ? { view: 'DASHBOARD' } : { view: 'HOME' };
  });

  // Sync Theme from LocalStorage (Security Preference)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogin = useCallback(() => {
    sessionStorage.setItem('trustbank_session', 'active');
    setViewState({ view: 'DASHBOARD' });
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('trustbank_session');
    setViewState({ view: 'HOME' });
    setIsMobileMenuOpen(false);
  }, []);

  // Auth Guard
  if (viewState.view === 'HOME') return <Home onStart={() => setViewState({ view: 'LOGIN' })} />;
  if (viewState.view === 'LOGIN') return <Login onLogin={handleLogin} />;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <Sidebar 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user} 
        onNavigate={(v: any) => setViewState({ view: v })} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {/* MOBILE HEADER */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 dark:text-white">
            <span className="text-2xl">☰</span>
          </button>
          <h1 className="font-black text-brand-600">TrustBank</h1>
        </div>

        {/* DYNAMIC VIEW SWITCHER */}
        {viewState.view === 'DASHBOARD' && (
          <Dashboard 
            user={user} 
            transactions={transactions} 
            onNavigate={(v: any) => setViewState({ view: v })} 
          />
        )}

        {viewState.view === 'TRANSFERS' && <Transfers />}

        {/* SECURITY INTEGRATION */}
        {viewState.view === 'SETTINGS' && <Security />}

        {/* FALLBACK FOR UNFINISHED MODULES */}
        {!['DASHBOARD', 'TRANSFERS', 'SETTINGS'].includes(viewState.view) && (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <span className="text-4xl mb-4">🛡️</span>
            <p className="font-bold">Module {viewState.view} is under maintenance.</p>
            <button 
              onClick={() => setViewState({ view: 'DASHBOARD' })}
              className="mt-4 text-brand-500 text-sm underline"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </main>
      <Analytics />
    </div>
  );
};

export default App;
