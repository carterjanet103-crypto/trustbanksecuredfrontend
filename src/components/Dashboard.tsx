import React from 'react';

interface DashboardProps {
  user: any;
  transactions: any[];
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, transactions, onNavigate }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome & Balance Header */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-gradient-to-br from-brand-700 to-brand-900 text-white rounded-3xl shadow-xl shadow-brand-900/20">
          <p className="text-brand-100 text-sm font-medium mb-1">Total Available Balance</p>
          <h2 className="text-4xl font-bold mb-6">${user.balance.toLocaleString()}</h2>
          <div className="flex gap-3">
            <button 
                onClick={() => onNavigate('TRANSFERS')}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl transition-all text-sm font-semibold"
            >
                Send Money
            </button>
            <button className="px-4 py-2 bg-white text-brand-800 rounded-xl font-semibold text-sm">
                Add Funds
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 text-xs mb-1">Monthly Income</p>
                <p className="text-xl font-bold text-emerald-500">+$4,250.00</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 text-xs mb-1">Monthly Spending</p>
                <p className="text-xl font-bold text-rose-500">-$1,840.12</p>
            </div>
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 col-span-2">
                <p className="text-slate-500 text-xs mb-1">Account Status</p>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <p className="font-semibold">{user.accountStatus || 'Verified'}</p>
                </div>
            </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold">Recent Activity</h3>
          <button className="text-brand-600 text-sm font-semibold">View All</button>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {transactions.slice(0, 5).map((tx) => (
            <div key={tx.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex justify-between items-center cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-slate-500">
                  {tx.merchant.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{tx.merchant}</p>
                  <p className="text-xs text-slate-500">{tx.date}</p>
                </div>
              </div>
              <p className={`font-bold ${tx.type === 'DEBIT' ? 'text-rose-500' : 'text-emerald-500'}`}>
                {tx.type === 'DEBIT' ? '-' : '+'}${tx.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
