import React, { useState, useEffect } from 'react';
import { useTrust } from './TrustContext';
import { ViewState, ViewType } from './types';

// Component Imports
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Home from './components/Home';
import Transfers from './components/Transfers';
import ReceiptsIndex from './components/ReceiptsIndex';
import Receipt from './components/Receipt';
import PaymentRequired from './components/PaymentRequired';

const App: React.FC = () => {
  const { user, transactions, handleTransaction, handlePayCharges, updateNote } = useTrust();
  
  // Start in LOADING state to prevent "Session Paused" flicker
  const [viewState, setViewState] = useState<ViewState>({ view: 'LOADING' as any });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // SESSION CHECK: Runs once when app starts
  useEffect(() => {
    const authStatus = sessionStorage.getItem('trustbank_session');
    if (authStatus === 'active') {
      setViewState({ view: 'DASHBOARD' });
    } else {
      setViewState({ view: 'HOME' });
    }
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem('trustbank_session', 'active');
    setViewState({ view: 'DASHBOARD' });
  };

  const handleLogout = () => {
    sessionStorage.removeItem('trustbank_session');
    setViewState({ view: 'HOME' });
  };

  const navigateToReceipt = (id: string) => {
    setViewState({ view: 'RECEIPT', transactionId: id });
  };

  // --- ROUTING LOGIC ---
  if (viewState.view === ('LOADING' as any)) return <div className="min-h-screen bg-slate-900" />;
  
  if (viewState.view === 'HOME') return <Home onStart={() => setViewState({ view: 'LOGIN' })} />;
  
  if (viewState.view === 'LOGIN') return <Login onLogin={handleLogin} />;

  if (viewState.view === 'PAYMENT_REQUIRED') {
    return <PaymentRequired user={user} onPay={handlePayCharges} onBack={() => setViewState({ view: 'DASHBOARD' })} />;
  }

  const currentTransaction = viewState.view === 'RECEIPT' 
    ? transactions.find(t => t.id === viewState.transactionId) 
    : null;

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
            onReceipt={navigateToReceipt}
          />
        )}

        {viewState.view === 'TRANSFERS' && (
          <Transfers user={user} onTransaction={handleTransaction} />
        )}

        {viewState.view === 'RECEIPTS' && (
          <ReceiptsIndex transactions={transactions} onOpen={navigateToReceipt} />
        )}

        {viewState.view === 'RECEIPT' && currentTransaction && (
          <Receipt 
            transaction={currentTransaction} 
            onUpdateNote={updateNote} 
            onBack={() => setViewState({ view: 'RECEIPTS' })} 
          />
        )}
        
        {/* Fallback if view not found */}
        {['CARDS', 'STATEMENTS', 'SETTINGS', 'SUPPORT', 'TOOLS'].includes(viewState.view) && (
          <div className="p-10 text-center opacity-50">View "{viewState.view}" coming soon.</div>
        )}
      </main>
    </div>
  );
};

export default App;
