import React, { useState, useCallback } from 'react';
import { useTrust } from './TrustContext';

// Component Imports
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Transfers from './components/Transfers';
import Security from './components/Security';
import Cards from './components/Cards';
import Home from './components/Home';

const App: React.FC = () => {
  const { user, transactions } = useTrust();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [viewState, setViewState] = useState(() => {
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('trustbank_session') === 'active';
      return isAuth ? { view: 'DASHBOARD' } : { view: 'HOME' };
    }
    return { view: 'HOME' };
  });

  const handleLogin = useCallback(() => {
    sessionStorage.setItem('trustbank_session', 'active');
    setViewState({ view: 'DASHBOARD' });
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('trustbank_session');
    setViewState({ view: 'HOME' });
  }, []);

  // HOME SCREEN
  if (viewState.view === 'HOME')
    return <Home onStart={() => setViewState({ view: 'LOGIN' })} />;

  // LOGIN SCREEN
  if (viewState.view === 'LOGIN')
    return <Login onLogin={handleLogin} />;

  // AUTHENTICATED AREA
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
        {viewState.view === 'DASHBOARD' && (
          <Dashboard
            user={user}
            transactions={transactions}
            onNavigate={(v: any) => setViewState({ view: v })}
          />
        )}

        {viewState.view === 'TRANSFERS' && <Transfers />}
        {viewState.view === 'CARDS' && <Cards />}
        {viewState.view === 'SETTINGS' && <Security />}
      </main>
    </div>
  );
};

export default App;
