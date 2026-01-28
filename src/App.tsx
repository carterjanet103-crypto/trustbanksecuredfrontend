import React, { useState, useCallback, useEffect } from 'react';
import { useTrust } from './TrustContext';
import { ViewState, ViewType } from './types';

// Component Imports
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Home from './components/Home';
import Transfers from './components/Transfers';

const App: React.FC = () => {
  const { user, transactions } = useTrust();
  
  // ROOT STATE: Handles which screen is currently "mounted"
  const [viewState, setViewState] = useState<ViewState>(() => {
    const isAuth = sessionStorage.getItem('trustbank_session') === 'active';
    return isAuth ? { view: 'DASHBOARD' } : { view: 'HOME' };
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // THEME SYNC: Ensures the app stays in the mode selected at Login
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // NAVIGATION HANDLERS
  const handleLogin = useCallback(() => {
    sessionStorage.setItem('trustbank_session', 'active');
    setViewState({ view: 'DASHBOARD' });
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('trustbank_session');
    setViewState({ view: 'HOME' });
    setIsMobileMenuOpen(false);
  }, []);

  // --- ROUTING LOGIC ---
  if (viewState.view === 'HOME') return <Home onStart={() => setViewState({ view: 'LOGIN' })} />;
  if (viewState.view === 'LOGIN') return <Login onLogin={handleLogin} />;

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      
      {/* Navigation Layer */}
      <Sidebar 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user} 
        onNavigate={(v: any) => setViewState({ view: v })} 
        onLogout={handleLogout} 
      />

      {/* Main Content Layer */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800"
          >
            <span className="text-xl">☰</span>
          </button>
          <h1 className="text-xl font-black text-brand-600">TrustBank</h1>
          <div className="w-10 h-10 rounded-full bg-brand-500"></div>
        </div>

        {/* Dynamic Component Loader */}
        {viewState.view === 'DASHBOARD' && (
          <Dashboard 
            user={user} 
            transactions={transactions} 
            onNavigate={(v: any) => setViewState({ view: v })}
          />
        )}

        {viewState.view === 'TRANSFERS' && <Transfers />}

        {/* Default / Fallback View */}
        {!['DASHBOARD', 'HOME', 'LOGIN', 'TRANSFERS'].includes(viewState.view) && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div className="text-6xl mb-6">🚧</div>
            <h2 className="text-2xl font-bold">Module "{viewState.view}" Encrypted</h2>
            <p className="text-slate-500 mt-2 max-w-xs mx-auto">This banking feature is currently undergoing scheduled maintenance.</p>
            <button 
              onClick={() => setViewState({ view: 'DASHBOARD' })}
              className="mt-8 px-6 py-3 bg-brand-600 text-white rounded-2xl font-bold shadow-lg shadow-brand-500/20"
            >
              Back to Safety
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
