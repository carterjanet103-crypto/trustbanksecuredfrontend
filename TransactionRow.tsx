
import React, { useState } from 'react';
import { Transaction, TransactionType, TransactionCategory } from '../types';

interface TransactionRowProps {
  transaction: Transaction;
  onClick: () => void;
  isSelected?: boolean;
  onSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateNote?: (id: string, note: string) => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ 
  transaction, 
  onClick, 
  isSelected, 
  onSelect,
  onUpdateNote
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteValue, setNoteValue] = useState(transaction.note || '');

  const isCredit = transaction.type === TransactionType.CREDIT;
  const isFailed = transaction.status === 'Failed';
  const dateObj = new Date(transaction.date);
  
  const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const getPaymentMethod = () => {
    let content;
    let tooltipText;

    if (transaction.cardLast4) {
      content = (
        <span className="flex items-center gap-1.5">
           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 shrink-0"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
           <span className="truncate">•••• {transaction.cardLast4}</span>
        </span>
      );
      tooltipText = `Paid via TrustCard ending in ${transaction.cardLast4}. Transaction was processed instantly.`;
    } else if (
      transaction.type === TransactionType.CREDIT || 
      transaction.category === TransactionCategory.INCOME || 
      transaction.category === TransactionCategory.TRANSFER ||
      transaction.category === TransactionCategory.UTILITIES
    ) {
      const refNum = transaction.referenceNumber || transaction.id.slice(-6).toUpperCase() || 'N/A';
      const status = transaction.status || 'Pending';
      
      const statusColor = 
        status === 'Completed' ? 'text-green-500' :
        status === 'Failed' ? 'text-red-500' :
        'text-amber-500';

      content = (
        <div className="flex flex-col leading-tight overflow-hidden">
          <span className="text-slate-600 dark:text-slate-300 font-medium truncate">ACH Transfer</span>
          <div className="flex items-center gap-1 text-[11px] truncate">
            <span className="text-slate-400">Ref: {refNum}</span>
            <span className="text-slate-300 dark:text-slate-600 shrink-0">•</span>
            <span className={`font-bold uppercase shrink-0 ${statusColor}`}>{status}</span>
          </div>
        </div>
      );
      
      tooltipText = isCredit 
        ? `Direct Deposit / ACH Credit Received. Reference: ${refNum}. Status: ${status}.` 
        : `ACH Transfer initiated via linked account. Reference: ${refNum}. Status: ${status}.`;
    } else {
      content = <span className="text-slate-400">Not Specified</span>;
      tooltipText = "Payment method not specified for this transaction type.";
    }

    return (
      <div className="relative group/tooltip inline-block cursor-help max-w-full">
        {content}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs font-medium text-white bg-slate-900 dark:bg-slate-700 rounded-lg shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-all duration-200 pointer-events-none whitespace-normal w-48 text-center z-50 scale-95 group-hover/tooltip:scale-100 origin-bottom">
          {tooltipText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
        </div>
      </div>
    );
  };

  const handleNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateNote) {
      onUpdateNote(transaction.id, noteValue);
    }
    setIsEditingNote(false);
  };

  const Icon = () => {
    return (
      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0 ${
        isFailed ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
        isCredit 
          ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
          : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
      }`}>
        {isFailed ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
        ) : isCredit ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
        )}
      </div>
    );
  };

  const ReviewedBadge = () => (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 shrink-0 border border-green-100 dark:border-green-800" title="Transaction Reviewed">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      Reviewed
    </span>
  );

  return (
    <div 
      className={`group transition-colors border-b border-slate-100 dark:border-slate-700 last:border-0 
        ${isSelected ? 'bg-brand-50 dark:bg-brand-900/10' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}
      `}
    >
      {/* Mobile Layout (Flex) - Optimized for very small screens */}
      <div className="md:hidden flex items-center justify-between p-4 cursor-pointer" onClick={onClick}>
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {onSelect && (
            <div className="flex items-center justify-center shrink-0" onClick={(e) => e.stopPropagation()}>
              <input 
                type="checkbox" 
                checked={isSelected} 
                onChange={onSelect}
                className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800"
              />
            </div>
          )}
          
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Icon />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 min-w-0 overflow-hidden">
                <h4 className="font-bold text-base text-slate-900 dark:text-white truncate" title={transaction.merchant}>
                  {transaction.merchant}
                </h4>
                {transaction.reviewed && <ReviewedBadge />}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span className="truncate">{transaction.category}</span>
                <span className="shrink-0">•</span>
                <span className="shrink-0">{formattedDate}</span>
              </div>
              {transaction.note && <p className="text-xs italic text-brand-600 dark:text-brand-400 mt-1 truncate">"{transaction.note}"</p>}
            </div>
          </div>
        </div>
        
        <div className="text-right pl-3 shrink-0">
          <span className={`block text-base font-bold tracking-tight ${isFailed ? 'text-red-500' : isCredit ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}>
            {isCredit ? '+' : '-'}${transaction.amount.toFixed(2)}
          </span>
          <span className={`text-xs capitalize font-semibold ${isFailed ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'}`}>
            {transaction.status}
          </span>
        </div>
      </div>

      {/* Desktop Layout (Grid) */}
      <div className="hidden md:grid grid-cols-12 gap-4 p-4 items-center cursor-pointer" onClick={onClick}>
          <div className="col-span-1 flex justify-center" onClick={(e) => e.stopPropagation()}>
             {onSelect && (
                <input 
                  type="checkbox" 
                  checked={isSelected} 
                  onChange={onSelect}
                  className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-800 cursor-pointer"
                />
             )}
          </div>

          <div className="col-span-3 flex items-center gap-4 overflow-hidden min-w-0">
             <Icon />
             <div className="truncate min-w-0">
                <div className="flex items-center gap-2 overflow-hidden">
                   <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors truncate" title={transaction.merchant}>
                     {transaction.merchant}
                   </h4>
                   {transaction.reviewed && <ReviewedBadge />}
                </div>
             </div>
          </div>

          <div className="col-span-2 text-xs font-medium text-slate-500 dark:text-slate-400 truncate">
             {transaction.category}
          </div>

          <div className="col-span-2 text-xs font-medium text-slate-500 dark:text-slate-400 overflow-hidden">
             {getPaymentMethod()}
          </div>

          <div className="col-span-2 px-2 min-w-0" onClick={(e) => e.stopPropagation()}>
             {isEditingNote ? (
                <form onSubmit={handleNoteSubmit} className="flex gap-1">
                   <input 
                      type="text" 
                      value={noteValue} 
                      onChange={(e) => setNoteValue(e.target.value)}
                      onBlur={handleNoteSubmit}
                      autoFocus
                      className="w-full text-xs px-2 py-1 bg-white dark:bg-slate-900 border border-brand-500 rounded outline-none text-slate-700 dark:text-white"
                   />
                </form>
             ) : (
                <div 
                  className="flex items-center gap-1 group/note cursor-text" 
                  onClick={() => setIsEditingNote(true)}
                >
                   <span className={`text-xs truncate max-w-[120px] ${transaction.note ? 'text-slate-600 dark:text-slate-300 italic' : 'text-slate-300 dark:text-slate-600'}`}>
                      {transaction.note || 'Add a note...'}
                   </span>
                   <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover/note:opacity-100 transition-opacity text-brand-500 shrink-0"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </div>
             )}
          </div>

          <div className="col-span-1 text-xs font-medium text-slate-500 dark:text-slate-400 whitespace-nowrap">
             {formattedDate}
          </div>

          <div className="col-span-1 text-right">
             <span className={`block text-base font-bold ${isFailed ? 'text-red-500' : isCredit ? 'text-green-600 dark:text-green-400' : 'text-slate-900 dark:text-white'}`}>
                {isCredit ? '+' : '-'}${transaction.amount.toFixed(2)}
             </span>
          </div>
      </div>
    </div>
  );
};

export default TransactionRow;
