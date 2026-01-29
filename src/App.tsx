import React, { useState, useCallback, useEffect } from 'react';
import { useTrust } from './TrustContext';

// Production Component Imports
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Transfers from './components/Transfers';
import Security from './components/Security';
import Cards from './components/Cards'; // Added
import Home from './components/Home';

const App: React.FC = () => {
  const { user, transactions } = useTrust();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [viewState, setViewState] = useState(() => {
    const isAuth = sessionStorage.getItem('trustbank_session') === 'active';
    return isAuth ? { view: 'DASHBOARD' } : { view: 'HOME' };
  });

  const handleLogin = useCallback(() => {
    sessionStorage.setItem('trustbank_session', 'active');
    setViewState({ view: 'DASHBOARD' });
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('trustbank_session');
    setViewState({ view: 'HOME' });
  }, []);

  // Authentication Gates
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
        {/* Dynamic Navigation Switcher */}
        {viewState.view === 'DASHBOARD' && (
          <Dashboard user={user} transactions={transactions} onNavigate={(v: any) => setViewState({ view: v })} />
        )}

        {viewState.view === 'TRANSFERS' && <Transfers />}
        
        {viewState.view === 'CARDS' && <Cards />}

        {viewState.view === 'SETTINGS' && <Security />}
      </main>
    </div>
  );
};

export default App;
