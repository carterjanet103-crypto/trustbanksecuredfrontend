
import React, { useState } from 'react';
import { TransactionCategory, Transaction, TransactionType, User } from '../types';
import TransactionRow from './TransactionRow';
import SpendingChart from './SpendingChart';

interface DashboardProps {
  user: User;
  transactions: Transaction[];
  isLoadingData: boolean;
  onTransaction: (tx: Transaction) => void;
  onPayChargesRedirect: () => void;
  onUpdateNote: (id: string, note: string) => void;
  onNavigateReceipt: (id: string) => void;
  onViewAll?: () => void;
  isDarkMode?: boolean;
}

const DashboardSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="flex flex-col md:flex-row justify-between gap-4">
      <div className="space-y-2">
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      </div>
      <div className="flex gap-3">
        <div className="h-10 w-28 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl hidden lg:block"></div>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  transactions, 
  isLoadingData, 
  onTransaction, 
  onPayChargesRedirect, 
  onUpdateNote,
  onNavigateReceipt, 
  onViewAll, 
  isDarkMode 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [sortConfig, setSortConfig] = useState<{ key: 'merchant' | 'date' | 'amount'; direction: 'asc' | 'desc' }>({ 
    key: 'date', 
    direction: 'desc' 
  });
  
  const [activeModal, setActiveModal] = useState<'ADD_MONEY' | 'TRANSFER' | null>(null);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const isOnHold = user.accountStatus === 'On Hold';

  const handleCloseModal = () => {
    setActiveModal(null);
    setAmount('');
    setRecipient('');
    setSuccessMsg('');
    setIsProcessing(false);
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    setIsProcessing(true);
    setTimeout(() => {
      onTransaction({
        id: `tx_${Date.now()}`,
        date: new Date().toISOString(),
        merchant: 'External Bank Deposit',
        amount: parseFloat(amount),
        type: TransactionType.CREDIT,
        category: TransactionCategory.INCOME,
        status: 'Completed',
        location: 'Secure Transfer',
      });
      setIsProcessing(false);
      setSuccessMsg('Funds deposited!');
      setTimeout(() => handleCloseModal(), 1500);
    }, 1500);
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || !recipient) return;
    if (isOnHold) return;

    setIsProcessing(true);
    setTimeout(() => {
      onTransaction({
        id: `tx_${Date.now()}`,
        date: new Date().toISOString(),
        merchant: `Transfer to ${recipient}`,
        amount: parseFloat(amount),
        type: TransactionType.DEBIT,
        category: TransactionCategory.TRANSFER,
        status: 'Completed',
        location: 'TrustBank Network',
      });
      setIsProcessing(false);
      setSuccessMsg('Transfer sent!');
      setTimeout(() => handleCloseModal(), 1500);
    }, 1500);
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (tx.note && tx.note.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'All' || tx.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const { key, direction } = sortConfig;
    let comparison = key === 'date' ? new Date(a.date).getTime() - new Date(b.date).getTime() :
                    key === 'amount' ? a.amount - b.amount : a.merchant.localeCompare(b.merchant);
    return direction === 'asc' ? comparison : -comparison;
  });

  if (isLoadingData) return <DashboardSkeleton />;

  return (
    <div className="space-y-8 animate-fade-in relative pb-10">
      
      {/* Account Hold Banner */}
      {isOnHold && (
        <div className="bg-white dark:bg-red-900/10 border-l-4 border-red-600 rounded-r-lg p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="text-red-600 dark:text-red-400 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Account Restricted</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                 Outstanding charges of <span className="font-bold text-slate-900 dark:text-white">${user.dueCharges.toFixed(2)}</span> are pending. Features limited.
              </p>
            </div>
          </div>
          <button 
            onClick={onPayChargesRedirect}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg shadow-sm whitespace-nowrap transition-colors"
          >
            Resolve Now
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Dashboard</h2>
          <p className="text-base text-slate-500 dark:text-slate-400 mt-1 font-medium">Welcome back, {user.name}.</p>
        </div>
        <div className="flex gap-3">
           <button onClick={() => setActiveModal('ADD_MONEY')} className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
             Deposit
           </button>
           <button 
             onClick={() => setActiveModal('TRANSFER')} 
             disabled={isOnHold}
             className={`px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition-colors ${
               isOnHold 
                 ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed' 
                 : 'bg-brand-600 text-white hover:bg-brand-700'
             }`}
           >
             Transfer Funds
           </button>
        </div>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Super Checking - Primary */}
        <div className={`rounded-xl p-7 text-white shadow-md relative overflow-hidden flex flex-col justify-between h-64 transition-all hover:shadow-lg ${isOnHold ? 'bg-slate-700' : 'bg-brand-800'}`}>
          <div className="absolute top-0 right-0 p-24 bg-white/5 rounded-full transform translate-x-8 -translate-y-8 blur-2xl"></div>
          <div>
            <div className="flex justify-between items-start mb-6">
              <span className="text-brand-100 text-sm font-bold uppercase tracking-wider">Super Checking</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            <p className="text-brand-200 text-sm mt-2 font-medium">Available Balance</p>
          </div>
          <div className="flex justify-between items-end border-t border-white/10 pt-5 mt-2">
             <div>
                <p className="text-brand-200 text-xs uppercase tracking-wider mb-1 font-bold">Account Number</p>
                <p className="font-mono text-base tracking-wide text-white">{user.accountNumber}</p>
             </div>
          </div>
        </div>

        {/* Traditional Savings */}
        <div className="bg-white dark:bg-slate-900 p-7 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-between h-64 hover:border-brand-300 transition-colors">
           <div>
             <div className="flex justify-between items-start mb-6">
                <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Traditional Savings</span>
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-600 dark:text-emerald-400"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
             </div>
             <h3 className="text-3xl font-bold text-slate-900 dark:text-white">$852,895.00</h3>
             <p className="text-emerald-600 dark:text-emerald-400 text-sm mt-2 font-bold flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"/></svg>
                3.4% APY
             </p>
           </div>
           <div className="flex justify-between items-end border-t border-slate-100 dark:border-slate-800 pt-5">
              <div>
                 <p className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-bold">Account Number</p>
                 <p className="font-mono text-base tracking-wide text-slate-700 dark:text-slate-300">•••• 6729</p>
              </div>
           </div>
        </div>

        {/* Savings */}
        <div className="bg-white dark:bg-slate-900 p-7 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col justify-between h-64 hover:border-brand-300 transition-colors">
           <div>
             <div className="flex justify-between items-start mb-6">
                <span className="text-slate-500 text-sm font-bold uppercase tracking-wider">Savings</span>
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600 dark:text-blue-400"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                </div>
             </div>
             <h3 className="text-3xl font-bold text-slate-900 dark:text-white">$619,730.00</h3>
             <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">Goal: Retirement</p>
           </div>
           <div className="flex justify-between items-end border-t border-slate-100 dark:border-slate-800 pt-5">
              <div>
                 <p className="text-slate-400 text-xs uppercase tracking-wider mb-1 font-bold">Account Number</p>
                 <p className="font-mono text-base tracking-wide text-slate-700 dark:text-slate-300">•••• 8834</p>
              </div>
           </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col min-h-[500px]">
          <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between gap-4 items-center bg-slate-50/50 dark:bg-slate-800/30 rounded-t-xl">
             <h3 className="font-bold text-slate-900 dark:text-white text-lg">Recent Activity</h3>
             <div className="flex gap-2 w-full sm:w-auto">
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-bold outline-none focus:border-brand-500 shadow-sm text-slate-700 dark:text-slate-300">
                   <option value="All">All Transactions</option>
                   {Object.values(TransactionCategory).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-xs font-medium outline-none w-full sm:w-48 focus:border-brand-500 shadow-sm" />
             </div>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 flex-1 overflow-y-auto">
            {sortedTransactions.length > 0 ? (
              sortedTransactions.slice(0, 10).map(tx => (
                <TransactionRow 
                  key={tx.id} 
                  transaction={tx} 
                  onClick={() => onNavigateReceipt(tx.id)}
                  onUpdateNote={onUpdateNote}
                />
              ))
            ) : (
              <div className="p-12 text-center text-slate-400 text-sm font-medium">No transactions found matching your criteria.</div>
            )}
          </div>
          {onViewAll && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/20 rounded-b-xl">
              <button onClick={onViewAll} className="w-full py-2.5 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-wide hover:underline transition-all">View Full Statement</button>
            </div>
          )}
        </div>

        {/* Analytics & Stats */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wide">Monthly Cash Flow</h3>
            <div className="h-64"><SpendingChart /></div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
             <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Budget Status</h3>
             <div className="mb-4">
                <div className="flex justify-between mb-2">
                   <span className="text-xs font-bold text-slate-500">Weekly Spending Limit</span>
                   <span className="text-xs font-bold text-slate-900 dark:text-white">65% used</span>
                </div>
                <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700">
                  <div className="h-full bg-brand-600 rounded-full" style={{width: '65%'}}></div>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-right font-medium">$700.00 remaining of $2,000.00</p>
             </div>
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={handleCloseModal}>
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md p-8 border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{activeModal === 'ADD_MONEY' ? 'Deposit Funds' : 'Transfer Funds'}</h3>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            {!successMsg ? (
              <form onSubmit={activeModal === 'ADD_MONEY' ? handleDeposit : handleTransfer} className="space-y-6">
                {activeModal === 'TRANSFER' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Recipient</label>
                    <input type="text" placeholder="Enter name or account" value={recipient} onChange={e => setRecipient(e.target.value)} required className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 font-medium transition-all" />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-xl">$</span>
                    <input type="number" step="0.01" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} required className="w-full pl-8 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 font-bold text-2xl transition-all" />
                  </div>
                </div>
                
                <div className="pt-2">
                  <button type="submit" disabled={isProcessing} className="w-full bg-brand-700 text-white font-bold py-3.5 rounded-lg shadow-sm hover:bg-brand-800 transition-all flex justify-center items-center">
                    {isProcessing ? 'Processing...' : 'Confirm Transaction'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6">
                 <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200 dark:border-green-800"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></div>
                 <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{successMsg}</h4>
                 <p className="text-slate-500 text-sm">Ref: {Math.random().toString(36).slice(7).toUpperCase()}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
