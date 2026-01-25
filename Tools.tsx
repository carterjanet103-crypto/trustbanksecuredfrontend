
import React, { useState } from 'react';
import { Transaction, TransactionType, TransactionCategory, User } from '../types';

interface ToolsProps {
  user: User;
  onTransaction: (tx: Transaction) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const Tools: React.FC<ToolsProps> = ({ user, onTransaction, onNotify }) => {
  // Bill Pay State
  const [biller, setBiller] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [isPayingBill, setIsPayingBill] = useState(false);

  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState(25000);
  const [loanTerm, setLoanTerm] = useState(60); // months
  const [interestRate, setInterestRate] = useState(5.5);

  // Currency Converter State
  const [baseAmount, setBaseAmount] = useState('100');
  const [targetCurrency, setTargetCurrency] = useState('EUR');

  // Savings Goals State
  const [goals, setGoals] = useState([
    { id: 1, name: 'Emergency Fund', target: 20000, current: 12450, color: 'bg-emerald-500' },
    { id: 2, name: 'New Vehicle', target: 35000, current: 8500, color: 'bg-blue-500' },
    { id: 3, name: 'Vacation', target: 5000, current: 1200, color: 'bg-purple-500' },
  ]);

  // Bill Pay Handler
  const handlePayBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biller || !billAmount) return;
    
    setIsPayingBill(true);
    setTimeout(() => {
      onTransaction({
        id: `tx_${Date.now()}`,
        date: new Date().toISOString(),
        merchant: biller,
        amount: parseFloat(billAmount),
        type: TransactionType.DEBIT,
        category: TransactionCategory.UTILITIES,
        status: 'Completed',
        location: 'Bill Pay Service',
        note: `Online payment to ${biller}`,
      });
      setIsPayingBill(false);
      setBiller('');
      setBillAmount('');
    }, 1500);
  };

  // Loan Calculation
  const calculateMonthlyPayment = () => {
    const r = interestRate / 100 / 12;
    const n = loanTerm;
    const p = loanAmount;
    if (r === 0) return p / n;
    const payment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return payment;
  };

  // Currency Calculation
  const rates: Record<string, number> = { 'EUR': 0.92, 'GBP': 0.79, 'JPY': 149.50, 'CAD': 1.36 };
  const convertedAmount = (parseFloat(baseAmount || '0') * rates[targetCurrency]).toFixed(2);

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="px-1">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Financial Tools</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Utilities to manage, plan, and grow your wealth.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. Quick Bill Pay */}
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 p-8 flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Quick Bill Pay</h3>
              <p className="text-xs text-slate-500 font-bold">Pay your utilities instantly</p>
            </div>
          </div>

          <form onSubmit={handlePayBill} className="space-y-4 flex-1">
            <div>
               <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Service Provider</label>
               <select 
                 value={biller} 
                 onChange={(e) => setBiller(e.target.value)}
                 className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-bold outline-none focus:ring-4 focus:ring-brand-500/10 transition-all appearance-none"
               >
                 <option value="">Select Biller...</option>
                 <option value="Comcast Xfinity">Comcast Xfinity</option>
                 <option value="Verizon Wireless">Verizon Wireless</option>
                 <option value="City Water Dept">City Water Dept</option>
                 <option value="State Electric Co">State Electric Co</option>
                 <option value="Geico Insurance">Geico Insurance</option>
               </select>
            </div>
            <div>
               <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Amount Due</label>
               <input 
                 type="number" 
                 value={billAmount} 
                 onChange={(e) => setBillAmount(e.target.value)}
                 placeholder="0.00" 
                 className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-black text-lg outline-none focus:ring-4 focus:ring-brand-500/10 transition-all"
               />
            </div>
            <div className="pt-2 mt-auto">
               <button 
                 type="submit" 
                 disabled={isPayingBill || !biller || !billAmount}
                 className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black shadow-lg disabled:opacity-50 hover:opacity-90 transition-opacity active:scale-[0.98]"
               >
                 {isPayingBill ? 'Processing...' : 'Pay Bill Now'}
               </button>
            </div>
          </form>
        </div>

        {/* 2. Loan Estimator */}
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Loan Estimator</h3>
              <p className="text-xs text-slate-500 font-bold">Calculate monthly payments</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 text-center">
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Estimated Monthly Payment</p>
               <h4 className="text-3xl font-black text-brand-600 dark:text-brand-400">${calculateMonthlyPayment().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-500">Loan Amount</span>
                  <span className="text-slate-900 dark:text-white">${loanAmount.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max="500000" 
                  step="1000" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-500">Term (Months)</span>
                  <span className="text-slate-900 dark:text-white">{loanTerm} Mo</span>
                </div>
                <input 
                  type="range" 
                  min="12" 
                  max="360" 
                  step="12" 
                  value={loanTerm} 
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-slate-500">Interest Rate (%)</span>
                  <span className="text-slate-900 dark:text-white">{interestRate}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="15" 
                  step="0.1" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
              </div>
            </div>
            
            <button className="w-full py-3 bg-brand-50 dark:bg-brand-900/10 text-brand-600 dark:text-brand-400 font-black text-xs uppercase tracking-widest rounded-xl hover:bg-brand-100 dark:hover:bg-brand-900/20 transition-colors">
              Check Pre-Approval
            </button>
          </div>
        </div>

        {/* 3. Savings Goals */}
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 p-8">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Savings Goals</h3>
              <button className="text-brand-600 dark:text-brand-400 text-xs font-black uppercase tracking-widest hover:underline">+ New Goal</button>
           </div>
           
           <div className="space-y-6">
              {goals.map(goal => (
                <div key={goal.id} className="group">
                   <div className="flex justify-between items-end mb-2">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{goal.name}</h4>
                        <p className="text-xs text-slate-500 font-medium">${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}</p>
                      </div>
                      <span className="text-xs font-black text-slate-900 dark:text-white">{Math.round((goal.current / goal.target) * 100)}%</span>
                   </div>
                   <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${goal.color} rounded-full transition-all duration-1000 ease-out relative`} 
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      >
                         <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                   </div>
                   <div className="flex justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onNotify(`Transferred $500 to ${goal.name}`, 'success')}
                        className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-600"
                      >
                        Quick Add $500
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* 4. Currency Converter */}
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 p-8">
           <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Exchange Rate</h3>
              <p className="text-xs text-slate-500 font-bold">Real-time currency calculator</p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 mb-6">
             <div className="flex items-center justify-between mb-4">
                <input 
                  type="number" 
                  value={baseAmount}
                  onChange={(e) => setBaseAmount(e.target.value)}
                  className="bg-transparent text-2xl font-black text-slate-900 dark:text-white w-32 outline-none"
                />
                <span className="text-sm font-black text-slate-400">USD</span>
             </div>
             <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700 mb-4 relative">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-2 rounded-full border border-slate-200 dark:border-slate-700">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                </div>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-brand-600 dark:text-brand-400">{convertedAmount}</span>
                <select 
                  value={targetCurrency}
                  onChange={(e) => setTargetCurrency(e.target.value)}
                  className="bg-transparent text-sm font-black text-slate-900 dark:text-white outline-none cursor-pointer"
                >
                  {Object.keys(rates).map(r => <option key={r} value={r}>{r}</option>)}
                </select>
             </div>
          </div>
          <p className="text-[10px] text-center text-slate-400 font-medium">
             Market rates are delayed by 15 minutes. 
             <br/>
             <span className="text-brand-600 dark:text-brand-400 cursor-pointer hover:underline">View full market data</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Tools;
