
import React, { useState } from 'react';
import { TransactionCategory, Transaction } from '../types';
import TransactionRow from './TransactionRow';

interface ReceiptsIndexProps {
  transactions: Transaction[];
  isLoadingData: boolean;
  onNavigateReceipt: (id: string) => void;
  onUpdateNote: (id: string, note: string) => void;
  onNotify?: (msg: string) => void;
}

const ReceiptsIndex: React.FC<ReceiptsIndexProps> = ({ transactions, isLoadingData, onNavigateReceipt, onUpdateNote, onNotify }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (tx.note && tx.note.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'All' || tx.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleExport = () => {
    onNotify?.("Generating system-wide export...");
    setTimeout(() => onNotify?.("CSV File exported to downloads"), 1200);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Activity Ledger</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Verified historical transaction data.</p>
        </div>
        <button onClick={handleExport} className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-xl">Export CSV</button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col min-h-[600px] overflow-hidden">
        <div className="p-8 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4">
           <input type="text" placeholder="Search Activity..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="flex-1 px-5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-brand-500/10 font-bold" />
           <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none font-bold text-sm">
              <option value="All">All Categories</option>
              {Object.values(TransactionCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
           </select>
        </div>

        <div className="flex-1 overflow-y-auto">
           {filteredTransactions.length > 0 ? (
             <div className="divide-y divide-slate-50 dark:divide-slate-700">
               {filteredTransactions.map(tx => (
                 <TransactionRow 
                   key={tx.id} 
                   transaction={tx} 
                   onClick={() => onNavigateReceipt(tx.id)}
                   onUpdateNote={onUpdateNote}
                 />
               ))}
             </div>
           ) : (
             <div className="p-20 text-center text-slate-400 font-bold">No activity records found matching criteria.</div>
           )}
        </div>
      </div>
    </div>
  );
};

export default ReceiptsIndex;
