import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate biometric/secure check
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800">
        <div className="text-center">
          <div className="inline-block p-4 bg-brand-50 dark:bg-brand-900/20 rounded-3xl mb-4">
            <span className="text-4xl">🛡️</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Secure Login</h2>
          <p className="text-slate-500 mt-2">Enter your credentials to access your vault</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase ml-2">Access ID</label>
              <input 
                type="text" 
                defaultValue="TRUST-8829-X"
                className="w-full mt-1 px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase ml-2">Security Key</label>
              <input 
                type="password" 
                defaultValue="••••••••"
                className="w-full mt-1 px-5 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-brand-500 transition-all outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold shadow-lg shadow-brand-600/20 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Authorize Access"
            )}
          </button>
        </form>
        
        <p className="text-center text-xs text-slate-400">
          Encrypted with AES-256 Hardware Security
        </p>
      </div>
    </div>
  );
};

export default Login;
