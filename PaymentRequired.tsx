
import React, { useState } from 'react';
import { User } from '../types';

interface PaymentRequiredProps {
  user: User;
  onPay: () => void;
  onBack: () => void;
}

const PaymentRequired: React.FC<PaymentRequiredProps> = ({ user, onPay, onBack }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('saved_card');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      onPay(); // This lifts the hold and navigates back
    }, 2500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 animate-fade-in">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
           <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 animate-bounce shadow-xl shadow-red-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
           </div>
           <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Payment Required</h2>
           <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
             Access to dashboard services is temporarily restricted until outstanding re-issuing fees are settled.
           </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700">
           <div className="p-8 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex justify-between items-end">
                 <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Due</span>
                 <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">${user.dueCharges.toFixed(2)}</span>
              </div>
           </div>
           
           <div className="p-8 space-y-6">
              <form onSubmit={handlePay} className="space-y-6">
                 <div className="space-y-4">
                    <label className="flex items-center gap-4 p-4 border border-brand-500 bg-brand-50/50 dark:bg-brand-900/10 rounded-2xl cursor-pointer transition-all">
                       <input 
                         type="radio" 
                         name="payment" 
                         value="saved_card" 
                         checked={paymentMethod === 'saved_card'} 
                         onChange={() => setPaymentMethod('saved_card')}
                         className="w-5 h-5 text-brand-600 border-gray-300 focus:ring-brand-500"
                       />
                       <div className="flex-1">
                          <div className="flex justify-between items-center">
                             <span className="font-bold text-slate-900 dark:text-white">TrustBank Platinum</span>
                             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                          </div>
                          <span className="text-xs text-slate-500">•••• 4582</span>
                       </div>
                    </label>

                    <label className="flex items-center gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all opacity-60">
                       <input 
                         type="radio" 
                         name="payment" 
                         value="new_card" 
                         disabled
                         className="w-5 h-5 text-brand-600 border-gray-300 focus:ring-brand-500"
                       />
                       <span className="font-bold text-slate-400">Use Another Method</span>
                    </label>
                 </div>

                 <button 
                   type="submit" 
                   disabled={isProcessing}
                   className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-black rounded-2xl shadow-xl shadow-brand-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                 >
                    {isProcessing ? (
                       <>
                          <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processing...
                       </>
                    ) : (
                       `Pay $${user.dueCharges.toFixed(2)}`
                    )}
                 </button>
              </form>
              
              <button onClick={onBack} className="w-full text-center text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                 Cancel & Return
              </button>
           </div>
        </div>
        
        <p className="text-center text-xs text-slate-400 max-w-xs mx-auto">
           Secure SSL encrypted payment. Transaction ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
        </p>
      </div>
    </div>
  );
};

export default PaymentRequired;
