
import React from 'react';
import { SPENDING_DATA } from '../constants';

const SpendingChart: React.FC = () => {
  const max = Math.max(...SPENDING_DATA.map(d => d.amount));
  
  // Calculate points for the SVG path
  // Map data to 0-100 coordinate space
  const points = SPENDING_DATA.map((d, i) => {
    const x = (i / (SPENDING_DATA.length - 1)) * 100;
    // Leave 20% padding at top
    const y = 100 - ((d.amount / max) * 80); 
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="h-64 w-full relative bg-white dark:bg-slate-800/50 rounded-3xl overflow-hidden p-6 border border-slate-100 dark:border-slate-700/50">
      <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
         {/* Background Grid Lines */}
         <div className="w-full h-px bg-slate-100 dark:bg-slate-700/50"></div>
         <div className="w-full h-px bg-slate-100 dark:bg-slate-700/50"></div>
         <div className="w-full h-px bg-slate-100 dark:bg-slate-700/50"></div>
         <div className="w-full h-px bg-slate-100 dark:bg-slate-700/50"></div>
         <div className="w-full h-px bg-slate-100 dark:bg-slate-700/50"></div>
      </div>

      <div className="relative h-full w-full flex items-end justify-between">
        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
           <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                 <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                 <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </linearGradient>
           </defs>
           {/* Area Fill */}
           <polygon points={`0,100 ${points} 100,100`} fill="url(#chartGradient)" />
           {/* Line Stroke */}
           <polyline 
              points={points} 
              fill="none" 
              stroke="#0ea5e9" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              vectorEffect="non-scaling-stroke" 
           />
           {/* Data Points */}
           {SPENDING_DATA.map((d, i) => {
             const x = (i / (SPENDING_DATA.length - 1)) * 100;
             const y = 100 - ((d.amount / max) * 80); 
             return (
                <circle key={i} cx={x} cy={y} r="1.5" className="fill-brand-600 dark:fill-brand-400 stroke-white dark:stroke-slate-900 stroke-[0.5]" vectorEffect="non-scaling-stroke" />
             );
           })}
        </svg>

        {/* X Axis Labels */}
        {SPENDING_DATA.map((d, i) => (
           <div key={i} className="relative z-10 pt-4 text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{d.name}</span>
           </div>
        ))}
      </div>
      
      {/* Tooltip Simulation (Static for visual) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl opacity-0 hover:opacity-100 transition-opacity cursor-crosshair">
         Spending Analysis
      </div>
    </div>
  );
};

export default SpendingChart;
