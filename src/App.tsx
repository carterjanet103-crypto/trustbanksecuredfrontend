import React, { useState, useEffect } from 'react';
import { useTrust } from './TrustContext';
import { ViewState, ViewType } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Receipt from './components/Receipt';
import Cards from './components/Cards';
import Statements from './components/Statements';
import Settings from './components/Settings';
import Home from './components/Home';
import Transfers from './components/Transfers';
import Support from './components/Support';
import Tools from './components/Tools';
import ReceiptsIndex from './components/ReceiptsIndex';
import PaymentRequired from './components/PaymentRequired';
import Login from './components/Login';

const App: React.FC = () => {
  const { user, transactions, handlePayCharges, updateNote, handleTransaction } = useTrust();
  const [viewState, setViewState] = useState<ViewState>({ view: 'HOME' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auth & Routing
  if (viewState.view === 'HOME') return <Home onStart={() => setViewState({ view: 'LOGIN' })} />;
  if (viewState.view === 'LOGIN') return <Login onLogin={() => setViewState({ view: 'DASHBOARD' })} />;
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
        user={user}
      />
      
      <main className="flex-1 p-4 lg:p-8">
        {viewState.view === 'DASHBOARD' && (
          <Dashboard user={user} transactions={transactions} onNavigate={(v: ViewType) => setViewState({ view: v })} onReceipt={(id) => setViewState({ view: 'RECEIPT', transactionId: id })} />
        )}
        {viewState.view === 'CARDS' && <Cards user={user} />}
        {viewState.view === 'TRANSFERS' && <Transfers user={user} onTransaction={handleTransaction} />}
        {viewState.view === 'RECEIPTS' && <ReceiptsIndex transactions={transactions} onOpen={(id) => setViewState({ view: 'RECEIPT', transactionId: id })} />}
        {viewState.view === 'RECEIPT' && currentTransaction && (
          <Receipt transaction={currentTransaction} onUpdateNote={updateNote} onBack={() => setViewState({ view: 'RECEIPTS' })} />
        )}
        {/* Render other components (Settings, Support, etc.) similarly */}
      </main>
    </div>
  );
};

export default App;
