
import React, { useState, useEffect } from 'react';

interface StatementsProps {
  onNotify?: (msg: string) => void;
}

const StatementsSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="space-y-2">
      <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded"></div>
      <div className="h-4 w-64 bg-slate-200 dark:bg-slate-700 rounded"></div>
    </div>
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="h-10 bg-slate-100 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700"></div>
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-white dark:bg-slate-800"></div>
        ))}
      </div>
    </div>
  </div>
);

const Statements: React.FC<StatementsProps> = ({ onNotify }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = (month: string) => {
    onNotify?.(`Downloading statement for ${month}...`);
    setTimeout(() => onNotify?.("Download complete"), 1500);
  };

  const statements = [
    { id: 1, month: 'October 2023', size: '1.2 MB', date: 'Oct 31, 2023' },
    { id: 2, month: 'September 2023', size: '1.1 MB', date: 'Sep 30, 2023' },
    { id: 3, month: 'August 2023', size: '1.3 MB', date: 'Aug 31, 2023' },
    { id: 4, month: 'July 2023', size: '1.1 MB', date: 'Jul 31, 2023' },
    { id: 5, month: 'June 2023', size: '1.4 MB', date: 'Jun 30, 2023' },
    { id: 6, month: 'May 2023', size: '1.0 MB', date: 'May 31, 2023' },
  ];

  if (isLoading) return <StatementsSkeleton />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Statements</h2>
        <p className="text-slate-500 dark:text-slate-400">View and download your monthly account statements.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
           <div className="col-span-5 md:col-span-4 pl-2">Period</div>
           <div className="col-span-3 md:col-span-3">Date Issued</div>
           <div className="col-span-2 md:col-span-2">Size</div>
           <div className="col-span-2 md:col-span-3 text-right pr-2">Action</div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {statements.map((stmt) => (
            <div key={stmt.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
               <div className="col-span-5 md:col-span-4 flex items-center gap-3 pl-2">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  </div>
                  <span className="font-medium text-slate-900 dark:text-white">{stmt.month}</span>
               </div>
               <div className="col-span-3 md:col-span-3 text-sm text-slate-500 dark:text-slate-400">
                  {stmt.date}
               </div>
               <div className="col-span-2 md:col-span-2 text-sm text-slate-500 dark:text-slate-400">
                  {stmt.size}
               </div>
               <div className="col-span-2 md:col-span-3 text-right pr-2">
                  <button 
                    onClick={() => handleDownload(stmt.month)}
                    className="p-2 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-colors" 
                    title="Download"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statements;
