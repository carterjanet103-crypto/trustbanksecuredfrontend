
import React, { useState } from 'react';
import { CURRENT_USER, MOCK_TRANSACTIONS } from '../constants';
import { Transaction, TransactionType, TransactionCategory } from '../types';
import TransactionRow from './TransactionRow';

interface CardsProps {
  onNotify: (msg: string, type?: 'success' | 'info') => void;
}

const Cards: React.FC<CardsProps> = ({ onNotify }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [isVirtualLocked, setIsVirtualLocked] = useState(false);
  const [activeTab, setActiveTab] = useState<'physical' | 'virtual'>('physical');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    onNotify("Card number copied", "success");
  };

  const toggleLock = (isVirtual: boolean) => {
    if (isVirtual) {
      setIsVirtualLocked(!isVirtualLocked);
      onNotify(isVirtualLocked ? "Virtual card unlocked" : "Virtual card locked", "info");
    } else {
      setIsLocked(!isLocked);
      onNotify(isLocked ? "Physical card unlocked" : "Physical card locked", "info");
    }
  };

  const handleIssueNew = () => {
    onNotify("New card request initiated", "success");
  };

  const physicalTransactions = MOCK_TRANSACTIONS.filter(t => t.cardLast4 === '4582');

  const virtualTransactions: Transaction[] = [
    {
      id: 'v_tx_1',
      date: '2023-10-25T14:15:00',
      merchant: 'AWS Cloud Services',
      amount: 124.50,
      type: TransactionType.DEBIT,
      category: TransactionCategory.UTILITIES,
      status: 'Completed',
      location: 'Seattle, WA',
      cardLast4: '9921',
      note: 'Monthly infrastructure',
    },
    {
      id: 'v_tx_2',
      date: '2023-10-24T09:30:00',
      merchant: 'GitHub Pro',
      amount: 4.00,
      type: TransactionType.DEBIT,
      category: TransactionCategory.UTILITIES,
      status: 'Completed',
      location: 'San Francisco, CA',
      cardLast4: '9921',
    },
    {
      id: 'v_tx_3',
      date: '2023-10-22T11:45:00',
      merchant: 'Digital Ocean',
      amount: 15.00,
      type: TransactionType.DEBIT,
      category: TransactionCategory.UTILITIES,
      status: 'Pending',
      location: 'New York, NY',
      cardLast4: '9921',
      note: 'Droplet backup',
    },
  ];

  const currentTransactions = activeTab === 'physical' ? physicalTransactions : virtualTransactions;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Card Management</h2>
          <p className="text-slate-500 dark:text-slate-400 text-base font-medium">Control your physical and virtual payment methods.</p>
        </div>
        <button 
          onClick={handleIssueNew}
          className="bg-brand-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-brand-800 transition-colors shadow-sm"
        >
          Request New Card
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Physical Asset */}
        <div className="space-y-4">
          <div 
            className={`relative h-60 w-full bg-slate-800 rounded-xl shadow-lg overflow-hidden p-8 text-white flex flex-col justify-between transition-transform cursor-pointer hover:-translate-y-1 ${isLocked ? 'grayscale opacity-75' : ''}`} 
            onClick={() => setActiveTab('physical')}
          >
            {activeTab === 'physical' && <div className="absolute top-3 right-3 w-3 h-3 bg-brand-500 rounded-full border-2 border-slate-800"></div>}
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="font-bold text-xl tracking-wide">TrustBank</h3>
                  <span className="text-xs uppercase tracking-wider text-slate-300 font-bold">Platinum Debit</span>
               </div>
               <div className="w-12 h-9 bg-white/20 rounded flex items-center justify-center border border-white/20">
                  <div className="w-7 h-5 border border-white/40 rounded-sm"></div>
               </div>
            </div>
            <div className="font-mono text-2xl tracking-widest mt-4">•••• •••• •••• 4582</div>
            <div className="flex justify-between items-end">
               <div>
                  <p className="text-[10px] uppercase text-slate-400 mb-0.5 font-bold">Cardholder</p>
                  <p className="font-bold text-sm uppercase tracking-wide">{CURRENT_USER.name}</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] uppercase text-slate-400 mb-0.5 font-bold">Expires</p>
                  <p className="font-mono text-sm font-bold">09/27</p>
               </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700 flex justify-between items-center shadow-sm">
             <div>
                <h4 className="font-bold text-slate-800 dark:text-white text-base">Physical Card</h4>
                <p className="text-sm text-slate-500 font-medium">{isLocked ? 'Status: Frozen' : 'Status: Active'}</p>
             </div>
             <div className="flex gap-2">
                <button onClick={() => toggleLock(false)} className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wide border transition-colors ${isLocked ? 'border-red-200 text-red-600 bg-red-50' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                   {isLocked ? 'Unlock' : 'Lock'}
                </button>
             </div>
          </div>
        </div>

        {/* Virtual Asset */}
        <div className="space-y-4">
          <div 
            className={`relative h-60 w-full bg-gradient-to-br from-brand-700 to-brand-900 rounded-xl shadow-lg overflow-hidden p-8 text-white flex flex-col justify-between transition-transform cursor-pointer hover:-translate-y-1 ${isVirtualLocked ? 'grayscale opacity-75' : ''}`} 
            onClick={() => setActiveTab('virtual')}
          >
            {activeTab === 'virtual' && <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full border-2 border-brand-800"></div>}
             <div className="flex justify-between items-start">
               <div>
                  <h3 className="font-bold text-xl tracking-wide">Virtual</h3>
                  <span className="text-xs uppercase tracking-wider text-brand-200 font-bold">Online Only</span>
               </div>
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            </div>
            <div className="font-mono text-2xl tracking-widest mt-4">•••• •••• •••• 9921</div>
            <div className="flex justify-between items-end">
               <div>
                  <p className="text-[10px] uppercase text-brand-200 mb-0.5 font-bold">Cardholder</p>
                  <p className="font-bold text-sm uppercase tracking-wide">{CURRENT_USER.name}</p>
               </div>
               <div className="text-right">
                   <p className="text-[10px] uppercase text-brand-200 mb-0.5 font-bold">Daily Limit</p>
                   <p className="font-mono text-sm font-bold">$5,000</p>
               </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700 flex justify-between items-center shadow-sm">
             <div>
                <h4 className="font-bold text-slate-800 dark:text-white text-base">Virtual Card</h4>
                <p className="text-sm text-slate-500 font-medium">{isVirtualLocked ? 'Status: Frozen' : 'Status: Active'}</p>
             </div>
             <div className="flex gap-2">
                <button onClick={() => toggleLock(true)} className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wide border transition-colors ${isVirtualLocked ? 'border-red-200 text-red-600 bg-red-50' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                   {isVirtualLocked ? 'Unlock' : 'Lock'}
                </button>
             </div>
          </div>
        </div>
      </div>

      {/* Transaction History Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden min-h-[400px]">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wide">
            Recent Transactions ({activeTab === 'physical' ? 'Physical Card' : 'Virtual Card'})
          </h3>
        </div>
        
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
           {currentTransactions.length > 0 ? (
             currentTransactions.map(tx => (
               <TransactionRow 
                 key={tx.id} 
                 transaction={tx} 
                 onClick={() => {}} 
               />
             ))
           ) : (
             <div className="p-12 text-center">
                <p className="text-sm text-slate-500 font-medium">No transactions found for this card in the current period.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
