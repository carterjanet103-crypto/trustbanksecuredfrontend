import React, { useState, useEffect, useCallback, useRef } from 'react';
// ... (imports remain the same)

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>({ view: 'HOME' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const [user, setUser] = useState<User>(CURRENT_USER);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // Ref to handle toast timeout cleanup
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // INITIAL DATA LOAD
  useEffect(() => {
    const storedSession = sessionStorage.getItem('trustbank_session');
    if (storedSession === 'active') {
      setViewState({ view: 'DASHBOARD' });
    }

    const timer = setTimeout(() => {
      setTransactions(MOCK_TRANSACTIONS);
      setIsLoadingData(false);
    }, 800);

    return () => {
      clearTimeout(timer);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // THEME PERSISTENCE
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // VIEW NAVIGATION SCROLL
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewState.view]);

  const showNotification = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ message, type });
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const handleLogin = () => {
    sessionStorage.setItem('trustbank_session', 'active');
    setViewState({ view: 'DASHBOARD' });
    showNotification(`Welcome back, ${user.name.split(' ')[0]}`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('trustbank_session');
    setViewState({ view: 'HOME' });
    setIsMobileMenuOpen(false);
    showNotification('Securely signed out', 'info');
  };

  const handleNavigate = (view: ViewType) => {
    // Prevent navigation to abstract view types without IDs
    if (view === 'RECEIPT') return; 
    setViewState({ view });
    setIsMobileMenuOpen(false);
  };

  const navigateToReceipt = (transactionId: string) => {
    setViewState({ view: 'RECEIPT', transactionId });
  };

  const handleTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);

    setUser(prev => ({
      ...prev,
      balance:
        tx.type === TransactionType.DEBIT
          ? prev.balance - tx.amount
          : prev.balance + tx.amount,
    }));

    showNotification('Transaction completed successfully');
  };

  const handlePayCharges = () => {
    const amountToPay = user.dueCharges; // Capture current due amount

    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      date: new Date().toISOString(),
      merchant: 'TrustBank Fees',
      amount: amountToPay,
      type: TransactionType.DEBIT,
      category: TransactionCategory.FEES,
      status: 'Completed',
      location: 'System Charge',
      note: 'Payment for outstanding re-issuing charges',
    };

    setTransactions(prev => [newTx, ...prev]);

    setUser(prev => ({
      ...prev,
      balance: prev.balance - amountToPay,
      accountStatus: 'Active',
      dueCharges: 0,
    }));

    setViewState({ view: 'DASHBOARD' });
    showNotification('Charges paid successfully. Account hold lifted.', 'success');
  };

  const updateTransactionNote = (id: string, note: string) => {
    setTransactions(prev => prev.map(t => (t.id === id ? { ...t, note } : t)));
    showNotification('Note updated', 'info');
  };

  // --- RENDERING LOGIC ---

  if (viewState.view === 'HOME') return <Home onStart={() => setViewState({ view: 'LOGIN' })} />;
  if (viewState.view === 'LOGIN') return <Login onLogin={handleLogin} />;

  if (viewState.view === 'PAYMENT_REQUIRED') {
    return (
      <PaymentRequired
        user={user}
        onPay={handlePayCharges}
        onBack={() => setViewState({ view: 'DASHBOARD' })}
      />
    );
  }

  // Safety check for Receipt view
  const currentTransaction = viewState.view === 'RECEIPT' 
    ? transactions.find(t => t.id === viewState.transactionId)
    : null;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] cursor-pointer animate-in fade-in slide-in-from-top-4" onClick={() => setToast(null)}>
          <div className={`px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 border text-white ${
            toast.type === 'success' ? 'bg-green-600 border-green-500' : 
            toast.type === 'info' ? 'bg-blue-600 border-blue-500' : 'bg-red-600 border-red-500'
          }`}>
            <span className="font-bold text-sm">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50 flex items-center justify-between px-4">
        <div className="font-black text-lg flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          TrustBank
        </div>

        <button 
          aria-label="Toggle Menu"
          className="p-2 rounded-md bg-slate-200 dark:bg-slate-700" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        user={user}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />

      <main className="flex-1 mt-16 lg:mt-0 p-4 lg:p-8">
        {viewState.view === 'DASHBOARD' && (
          <Dashboard
            user={user}
            transactions={transactions}
            isLoading={isLoadingData}
            onNavigate={handleNavigate}
            onReceipt={navigateToReceipt}
          />
        )}

        {viewState.view === 'CARDS' && <Cards user={user} />}
        {viewState.view === 'STATEMENTS' && <Statements transactions={transactions} />}
        {viewState.view === 'SETTINGS' && <Settings user={user} onLogout={handleLogout} />}
        {viewState.view === 'TRANSFERS' && (
          <Transfers user={user} onTransaction={handleTransaction} />
        )}
        {viewState.view === 'SUPPORT' && <Support />}
        {viewState.view === 'TOOLS' && <Tools />}
        {viewState.view === 'RECEIPTS' && (
          <ReceiptsIndex transactions={transactions} onOpen={navigateToReceipt} />
        )}

        {viewState.view === 'RECEIPT' && currentTransaction ? (
          <Receipt
            transaction={currentTransaction}
            onUpdateNote={updateTransactionNote}
            onBack={() => setViewState({ view: 'RECEIPTS' })}
          />
        ) : viewState.view === 'RECEIPT' && (
          <div className="p-8 text-center">Transaction not found.</div>
        )}
      </main>
    </div>
  );
};

export default App;
