import React, { useState } from 'react';

const Cards: React.FC = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <header>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">My Cards</h2>
        <p className="text-slate-500">Manage your physical and virtual assets.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* The Card Visual */}
        <div className="relative group">
          <div className={`w-full aspect-[1.58/1] rounded-[2rem] p-8 text-white shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 bg-gradient-to-br from-slate-800 via-slate-900 to-black border border-white/10 overflow-hidden`}>
            {/* Glossy Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
            
            <div className="relative h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-md opacity-80 shadow-inner"></div>
                <span className="font-black italic text-xl tracking-tighter opacity-80">TRUSTBANK</span>
              </div>

              <div className="space-y-4">
                <p className="text-2xl font-mono tracking-[0.25em] drop-shadow-md">
                  {showDetails ? "4482 9901 2234 8829" : "•••• •••• •••• 8829"}
                </p>
                <div className="flex gap-8 text-[10px] uppercase tracking-widest font-black opacity-60">
                  <div>
                    <p>Expiry</p>
                    <p className="text-sm text-white opacity-100">09/29</p>
                  </div>
                  <div>
                    <p>CVV</p>
                    <p className="text-sm text-white opacity-100">{showDetails ? "103" : "•••"}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <p className="text-sm font-bold tracking-wide uppercase">Jenifer Jackson</p>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-red-500/80"></div>
                  <div className="w-8 h-8 rounded-full bg-yellow-500/80"></div>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-black uppercase tracking-widest rounded-full shadow-xl border border-slate-100 dark:border-slate-700 hover:scale-105 transition-transform"
          >
            {showDetails ? "Hide Info" : "Reveal Details"}
          </button>
        </div>

        {/* Card Controls */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl text-center hover:bg-brand-50 transition-colors">
                <span className="block text-xl mb-1">❄️</span>
                <span className="text-[10px] font-black uppercase text-slate-500">Freeze Card</span>
              </button>
              <button className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl text-center hover:bg-brand-50 transition-colors">
                <span className="block text-xl mb-1">⚙️</span>
                <span className="text-[10px] font-black uppercase text-slate-500">Limits</span>
              </button>
            </div>
          </div>

          <div className="p-6 bg-brand-600 rounded-3xl text-white shadow-lg shadow-brand-500/20">
            <p className="text-xs font-bold uppercase opacity-80 mb-1">Spend Limit</p>
            <div className="flex justify-between items-end mb-2">
              <h4 className="text-2xl font-black">$12,500.00</h4>
              <p className="text-[10px] font-bold opacity-80">Remaining</p>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
