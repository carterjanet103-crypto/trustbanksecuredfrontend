import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Receipt from './components/Receipt';
import Sidebar from './components/Sidebar';
import Cards from './components/Cards';
import Statements from './components/Statements';
import Settings from './components/Settings';
import Home from './components/Home';
import Transfers from './components/Transfers';
import Support from './components/Support';
import Tools from './components/Tools';
import ReceiptsIndex from './components/ReceiptsIndex';
import PaymentRequired from './components/PaymentRequired';
import { ViewState, ViewType, Transaction, User, TransactionType, TransactionCategory } from './types';
import { CURRENT_USER, MOCK_TRANSACTIONS } from './constants';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>({ view: 'HOME' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Global State
  const [user, setUser] = useState<User>(CURRENT_USER);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
    }
    return false;
  });

  // Session restore + initial data load
  useEffect(() => {
    const storedSession = sessionStorage.getItem('trustbank_session');
    if (storedSession === 'active') {
      setViewState({ view: 'DASHBOARD' });
    }

    const timer = setTimeout(() => {
      setTransactions(MOCK_TRANSACTIONS);
      setIsLoadingData(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Theme persistence
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewState]);

  // Toast helper
  const showNotification = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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
    if (view === 'RECEIPT') return;
    setViewState({ view: view as any });
    setIsMobileMenuOpen(false);
  };

  const navigateToReceipt = (transactionId: string) => {
    setViewState({ view: 'RECEIPT', transactionId });
  };

  const handleTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
    if (tx.type === TransactionType.DEBIT) {
      setUser(prev => ({ ...prev, balance: prev.balance - tx.amount }));
    } else if (tx.type === TransactionType.CREDIT) {
      setUser(prev => ({ ...prev, balance: prev.balance + tx.amount }));
    }
    showNotification('Transaction completed successfully');
  };

  const handlePayCharges = () => {
    const amount = user.dueCharges;
    const newTx: Transaction = {
      id: `tx_${Date.now()}`,
      date: new Date().toISOString(),
      merchant: 'TrustBank Fees',
      amount: amount,
      type: TransactionType.DEBIT,
      category: TransactionCategory.FEES,
      status: 'Completed',
      location: 'System Charge',
      note: 'Payment for outstanding re-issuing charges',
    };

    setTransactions(prev => [newTx, ...prev]);
    setUser(prev => ({
      ...prev,
      balance: prev.balance - amount,
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

  // View routing
  if (viewState.view === 'HOME') {
    return <Home onStart={() => setViewState({ view: 'LOGIN' })} />;
  }

  if (viewState.view === 'LOGIN') {
    return <Login onLogin={handleLogin} />;
  }

  if (viewState.view === 'PAYMENT_REQUIRED') {
    return (
      <PaymentRequired
        user={user}
        onPay={handlePayCharges}
        onBack={() => setViewState({ view: 'DASHBOARD' })}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300 overflow-x-hidden">
      {/* Global Toast Notification */}
      {toast && (
        <div
          className="fixed top-6 right-6 z-[100] animate-fade-in-up cursor-pointer"
          onClick={() => setToast(null)}
          role="alert"
          aria-live="assertive"
        >
          <div
            className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border ${
              toast.type === 'success'
                ? 'bg-green-600 border-green-500'
                : toast.type === 'info'
                ? 'bg-brand-600 border-brand-500'
                : 'bg-red-600 border-red-500'
            } text-white`}
          >
            {toast.type === 'success' && (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            )}
            {toast.type === 'error' && (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            )}
            <span className="font-bold text-sm">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-700 z-50 flex items-center justify-between px-4 transition-colors duration-300">
        <div className="font-black text-lg tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round
