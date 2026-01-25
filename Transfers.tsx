
import React, { useState } from 'react';
import { Transaction, TransactionType, TransactionCategory, User } from '../types';

interface TransfersProps {
  onTransaction: (tx: Transaction) => void;
  user: User;
}

const Transfers: React.FC<TransfersProps> = ({ onTransaction, user }) => {
  const [step, setStep] = useState(1);
  const [transferMode, setTransferMode] = useState<'internal' | 'external'>('internal');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  
  // External Transfer Fields
  const [bankName, setBankName] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const linkedAccounts = [
    { id: '1', name: 'Traditional Savings', balance: 852895.00, color: 'bg-brand-500' },
    { id: '2', name: 'Savings', balance: 619730.00, color: 'bg-emerald-500' },
    { id: '3', name: 'Card', balance: 76983.00, color: 'bg-amber-500' }
  ];

  const isOnHold = user.accountStatus === 'On Hold';

  const handleModeSelect = (mode: 'internal' | 'external') => {
    setTransferMode(mode);
    setStep(2);
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newTx: Transaction = {
        id: `tx_${Date.now()}`,
        date: new Date().toISOString(),
        merchant: transferMode === 'external' ? `Transfer to ${recipient} (${bankName})` : `Transfer to ${recipient}`,
        amount: parseFloat(amount),
        type: TransactionType.DEBIT,
        category: TransactionCategory.TRANSFER,
        status: 'Completed',
        location: 'Mobile App',
        note: transferMode === 'external' ? `External Transfer to ${bankName} •••• ${accountNumber.slice(-4)}` : 'Internal Transfer',
      };

      onTransaction(newTx);
      setIsProcessing(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setStep(1);
        // Reset form
        setAmount('');
        setRecipient('');
        setBankName('');
        setRoutingNumber('');
        setAccountNumber('');
      }, 3000);
    }, 2000);
  };

  if (isOnHold) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-fade-in max-w-lg mx-auto">
        <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-red-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Transfers Restricted</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed mb-8">
          Your account is currently on hold due to outstanding charges. You must clear the due balance of <span className="text-red-600 dark:text-red-400 font-bold">${user.dueCharges.toFixed(2)}</span> on your Dashboard before initiating new transfers.
        </p>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-fade-in">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-8 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Transfer Successful!</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Funds are on their way to {recipient || 'your account'}.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      <div className="px-1 sm:px-0">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Transfers</h2>
        <p className="text-base text-slate-500 dark:text-slate-400 font-medium">Move money between accounts or send to others.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Transfer Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 sm:p-10">
            {/* Steps - refined for mobile */}
            <div className="flex items-center gap-2 sm:gap-4 mb-10 overflow-x-auto no-scrollbar pb-2">
               <div className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all ${step >= 1 ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'}`}>1</div>
               <div className={`h-[2px] flex-1 min-w-[20px] transition-colors ${step >= 2 ? 'bg-brand-600' : 'bg-slate-100 dark:bg-slate-900'}`}></div>
               <div className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all ${step >= 2 ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'}`}>2</div>
               <div className={`h-[2px] flex-1 min-w-[20px] transition-colors ${step >= 3 ? 'bg-brand-600' : 'bg-slate-100 dark:bg-slate-900'}`}></div>
               <div className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center text-xs sm:text-sm font-black transition-all ${step >= 3 ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30' : 'bg-slate-100 dark:bg-slate-900 text-slate-400'}`}>3</div>
            </div>

            <form onSubmit={handleTransfer} className="space-y-6 sm:space-y-8">
              {step === 1 && (
                <div className="animate-fade-in space-y-6">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Select Transfer Type</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button type="button" onClick={() => handleModeSelect('internal')} className="p-6 sm:p-8 rounded-3xl border-2 border-slate-50 dark:border-slate-900 hover:border-brand-500 bg-slate-50/50 dark:bg-slate-900/50 transition-all text-left group">
                      <div className="w-12 h-12 bg-brand-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
                      </div>
                      <span className="font-black text-slate-900 dark:text-white block text-lg">My Accounts</span>
                      <p className="text-sm text-slate-500 mt-2 font-medium">Transfer between your TrustBank wallets instantly.</p>
                    </button>
                    <button type="button" onClick={() => handleModeSelect('external')} className="p-6 sm:p-8 rounded-3xl border-2 border-slate-50 dark:border-slate-900 hover:border-brand-500 bg-slate-50/50 dark:bg-slate-900/50 transition-all text-left group">
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
                      </div>
                      <span className="font-black text-slate-900 dark:text-white block text-lg">External Link</span>
                      <p className="text-sm text-slate-500 mt-2 font-medium">Send money to any bank account via Wire or ACH.</p>
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-fade-in space-y-6">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {transferMode === 'external' ? 'External Transfer Details' : 'Internal Transfer Details'}
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Recipient Name</label>
                      <input 
                        type="text" 
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Full Name of Recipient"
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-brand-500/10 font-medium transition-all text-lg"
                      />
                    </div>
                    
                    {transferMode === 'external' && (
                      <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Bank Name</label>
                            <input 
                              type="text" 
                              value={bankName}
                              onChange={(e) => setBankName(e.target.value)}
                              placeholder="e.g. Chase"
                              className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-brand-500/10 font-medium transition-all text-base"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Routing Number</label>
                            <input 
                              type="text" 
                              value={routingNumber}
                              onChange={(e) => setRoutingNumber(e.target.value)}
                              placeholder="9 Digits"
                              className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-brand-500/10 font-medium transition-all text-base"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Account Number</label>
                          <input 
                            type="text" 
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                            placeholder="Account Number"
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-brand-500/10 font-medium transition-all text-base"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Amount ($)</label>
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-brand-500/10 font-black text-4xl transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <button type="button" onClick={() => setStep(1)} className="order-2 sm:order-1 flex-1 py-4 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-2xl font-black transition-colors hover:bg-slate-200 dark:hover:bg-slate-800 text-lg">Cancel</button>
                    <button type="button" onClick={() => setStep(3)} className="order-1 sm:order-2 flex-1 py-4 bg-brand-600 text-white rounded-2xl font-black shadow-xl shadow-brand-500/20 active:scale-95 transition-transform text-lg">Continue</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-fade-in space-y-8">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Review Transaction</h3>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-8 rounded-[2rem] border border-dashed border-slate-200 dark:border-slate-700 space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Recipient</span>
                      <span className="font-black text-slate-900 dark:text-white truncate max-w-[150px] text-lg">{recipient || 'N/A'}</span>
                    </div>
                    
                    {transferMode === 'external' && (
                      <>
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                           <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Bank</span>
                           <span className="font-black text-slate-900 dark:text-white truncate max-w-[150px] text-lg">{bankName}</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                           <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Account</span>
                           <span className="font-black text-slate-900 dark:text-white truncate max-w-[150px] text-lg">•••• {accountNumber.slice(-4)}</span>
                        </div>
                      </>
                    )}

                    <div className="flex justify-between items-center py-4 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Amount</span>
                      <span className="font-black text-3xl text-slate-900 dark:text-white">${parseFloat(amount || '0').toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 text-xs text-brand-600 dark:text-brand-400 font-black uppercase tracking-widest">
                      <span>Delivery Method</span>
                      <span className="px-2 py-0.5 bg-brand-100 dark:bg-brand-900/30 rounded">
                        {transferMode === 'external' ? 'Standard ACH (1-2 Days)' : 'Instant'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button type="button" onClick={() => setStep(2)} className="order-2 sm:order-1 flex-1 py-4 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-2xl font-black transition-colors hover:bg-slate-200 dark:hover:bg-slate-800 text-lg">Modify</button>
                    <button 
                      type="submit" 
                      disabled={isProcessing}
                      className="order-1 sm:order-2 flex-1 py-4 bg-brand-600 text-white rounded-2xl font-black shadow-xl shadow-brand-500/30 flex items-center justify-center gap-3 active:scale-95 transition-transform text-lg"
                    >
                      {isProcessing ? <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Confirm & Transfer'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Sidebar Linked Accounts - stacks on mobile */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 px-1">Frequent Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {linkedAccounts.map(acc => (
              <button key={acc.id} className="p-5 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-[0.98] group">
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-3 h-3 rounded-full shrink-0 ${acc.color} group-hover:scale-125 transition-transform`}></div>
                  <div className="text-left min-w-0">
                    <div className="text-base font-black text-slate-900 dark:text-white truncate">{acc.name}</div>
                    <div className="text-xs font-bold text-slate-400 mt-0.5 tracking-tight">${acc.balance.toLocaleString()} available</div>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-200 group-hover:text-brand-500 transition-colors shrink-0 ml-2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            ))}
            <button className="p-5 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl flex items-center justify-center gap-2 text-slate-400 hover:text-brand-600 hover:border-brand-600 hover:bg-brand-50/10 transition-all text-xs font-black uppercase tracking-wider">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
              Add Connection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfers;
