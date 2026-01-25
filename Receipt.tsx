
import React, { useState, useEffect } from 'react';
import { MOCK_TRANSACTIONS } from '../constants';
import { TransactionType } from '../types';

interface ReceiptProps {
  transactionId: string;
  onBack: () => void;
  onNotify?: (msg: string) => void;
}

const Receipt: React.FC<ReceiptProps> = ({ transactionId, onBack, onNotify }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const transaction = MOCK_TRANSACTIONS.find(t => t.id === transactionId);
  if (!transaction) return <div className="p-20 text-center font-bold">Transaction record not found in system vault.</div>;

  const handleDownload = () => {
    onNotify?.("Preparing PDF Statement...");
    setTimeout(() => onNotify?.("Receipt downloaded to local storage"), 1500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `TrustBank Receipt - ${transaction.merchant}`, text: `Receipt for $${transaction.amount}`, url: window.location.href });
    } else {
      onNotify?.("Share link generated and copied");
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-fade-in pb-12">
      <button onClick={onBack} className="mb-8 flex items-center text-slate-500 font-black text-xs uppercase tracking-widest hover:text-brand-600 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
        Return to Dashboard
      </button>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-slate-100 dark:border-slate-700">
        <div className="h-2 bg-brand-600"></div>
        <div className="p-10 text-center border-b border-dashed border-slate-100 dark:border-slate-700">
           <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-brand-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
           </div>
           <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">${transaction.amount.toFixed(2)}</h2>
           <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{transaction.merchant}</p>
        </div>
        <div className="p-10 space-y-6">
          <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-700 text-base">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Date</span>
            <span className="font-black text-slate-900 dark:text-white">{new Date(transaction.date).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-700 text-base">
            <span className="text-slate-400 font-bold uppercase text-[10px]">System Reference</span>
            <span className="font-mono text-xs text-slate-500">{transaction.id.toUpperCase()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-slate-700 text-base">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Category</span>
            <span className="font-black text-slate-900 dark:text-white">{transaction.category}</span>
          </div>
        </div>
        <div className="p-8 bg-slate-50 dark:bg-slate-900/50 flex gap-4">
           <button onClick={handleDownload} className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PDF
           </button>
           <button onClick={handleShare} className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              Share Asset
           </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
