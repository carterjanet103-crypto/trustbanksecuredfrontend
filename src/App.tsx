import React, { useState, useCallback } from 'react';
import { useTrust } from './TrustContext';

// Import your sub-components
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Home from './components/Home';

const App: React.FC = () => {
  const { user, transactions } = useTrust();
  
  // ROOT NAVIGATION STATE
  // We initialize based on sessionStorage to keep the session "Active"
  const [viewState, setViewState] = useState(() => {
    const isAuth = sessionStorage.getItem('trustbank_session') === 'active';
    return isAuth ? { view: 'DASHBOARD' } : { view: 'HOME' };
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // AUTH HANDLERS
  const handleLogin = useCallback(() => {
    sessionStorage.setItem('trustbank_session', 'active');
    setViewState({ view: 'DASHBOARD' });
  }, []);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('trustbank_session');
    setViewState({ view: 'HOME' });
    setIsMobileMenuOpen(false);
  }, []);

  // 1. If not logged in, show Home or Login
  if (viewState.view === 'HOME') return <Home onStart={() => setViewState({ view: 'LOGIN' })} />;
  if (viewState.view === 'LOGIN') return <Login onLogin={handleLogin} />;

  // 2. Main Authenticated Layout
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-200 transition-colors duration-300 selection:bg-brand-600 selection:text-white">
      
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user} 
        onNavigate={(v: any) => setViewState({ view: v })} 
        onLogout={handleLogout} 
      />

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8">
        <header className="flex justify-between items-center mb-8 lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow">
                Menu
            </button>
            <h1 className="font-bold text-xl text-brand-600">TrustBank</h1>
        </header>

        {viewState.view === 'DASHBOARD' && (
          <Dashboard 
            user={user} 
            transactions={transactions} 
            onNavigate={(v: any) => setViewState({ view: v })}
          />
        )}

        {/* Dynamic View Loader */}
        {!['DASHBOARD', 'HOME', 'LOGIN'].includes(viewState.view) && (
            <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <h2 className="text-2xl font-bold mb-2">Viewing: {viewState.view}</h2>
                <p className="text-slate-500 mb-6">This module is securely loaded and ready.</p>
                <button 
                    onClick={() => setViewState({ view: 'DASHBOARD' })}
                    className="px-6 py-2 bg-brand-600 text-white rounded-xl shadow-lg hover:bg-brand-700 transition-all"
                >
                    Return to Overview
                </button>
            </div>
        )}
      </main>
    </div>
  );
};

export default App;
