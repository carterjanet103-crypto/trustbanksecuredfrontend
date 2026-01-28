import React, { useState, useCallback } from 'react';
import { useTrust } from './TrustContext';
import { ViewState, ViewType } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Home from './components/Home';

const App: React.FC = () => {
  const { user, transactions } = useTrust();
  
  const [viewState, setViewState] = useState<ViewState>(() => {
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

  if (viewState.view === 'HOME') return <Home onStart={() => setViewState({ view: 'LOGIN' })} />;
  if (viewState.view === 'LOGIN') return <Login onLogin={handleLogin} />;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar 
        user={user} 
        onNavigate={(v: ViewType) => setViewState({ view: v })} 
        onLogout={handleLogout} 
      />
      <main className="flex-1 p-8">
        {viewState.view === 'DASHBOARD' && (
          <Dashboard user={user} transactions={transactions} />
        )}
      </main>
    </div>
  );
};

export default App;
