import React, { useState, useEffect, useCallback } from 'react';
import { useTrust } from './TrustContext';
import { ViewState, ViewType } from './types';

// Component Imports
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Home from './components/Home';

const App: React.FC = () => {
  const { user, transactions } = useTrust();

  // ROOT STATE: Initialize instantly from storage to prevent session loops
  const [viewState, setViewState] = useState<ViewState>(() => {
    const isAuth = sessionStorage.getItem('trustbank_session') === 'active';
    return isAuth ? { view: 'DASHBOARD' } : { view: 'HOME' };
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // SESSION WATCHER: Keep the root in sync with browser storage
  useEffect(() => {
    const handleStorageChange = () => {
      const isAuth = sessionStorage.getItem('trustbank_session') === 'active';
      if (!isAuth && viewState.view !== 'HOME' && viewState.view !== 'LOGIN') {
        setViewState({ view: 'HOME' });
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [viewState.view]);

  const handleLogin = useCallback(() => {
    sessionStorage.setItem('trustbank_session', 'active');
    setViewState({ view: 'DASHBOARD' });
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('trustbank_session');
    setViewState({ view: 'HOME' });
    setIsMobileMenuOpen(false);
  }, []);

  // --- ROOT RENDERING ---
  if (viewState.view === 'HOME') return <Home onStart={() => setViewState({ view: 'LOGIN' })} />;
  if (viewState.view === 'LOGIN') return <Login onLogin={handleLogin} />;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={(v: ViewType) => setViewState({ view: v })}
        onLogout={handleLogout}
        user={user}
      />

      <main className="flex-1 p-4 lg:p-8">
        {viewState.view === 'DASHBOARD' && (
          <Dashboard 
            user={user} 
            transactions={transactions} 
            onNavigate={(v: ViewType) => setViewState({ view: v })} 
            onReceipt={(id) => setViewState({ view: 'RECEIPT', transactionId: id })}
          />
        )}

        {/* This catches any pages not yet explicitly handled */}
        {!['DASHBOARD', 'HOME', 'LOGIN'].includes(viewState.view) && (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-xl font-bold">View "{viewState.view}" Ready</h2>
            <button 
              onClick={() => setViewState({ view: 'DASHBOARD' })}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
