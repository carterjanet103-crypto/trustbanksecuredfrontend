import React, { useState, useEffect } from 'react';

const Security: React.FC = () => {
  const [is2FA, setIs2FA] = useState(() => localStorage.getItem('is2FAEnabled') === 'true');
  const [isBiometric, setIsBiometric] = useState(() => localStorage.getItem('trustbank_device_registered') === 'true');
  const [lastLogin, setLastLogin] = useState('January 29, 2026 at 10:22 AM');

  const toggle2FA = () => {
    const newValue = !is2FA;
    setIs2FA(newValue);
    localStorage.setItem('is2FAEnabled', newValue.toString());
  };

  const toggleBiometric = () => {
    const newValue = !isBiometric;
    setIsBiometric(newValue);
    localStorage.setItem('trustbank_device_registered', newValue.toString());
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <header className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">Security Vault</h2>
        <p className="text-slate-500">Manage your account protection and access methods.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Auth Methods */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="text-brand-500">🛡️</span> Authentication
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500">Require a code to sign in</p>
              </div>
              <button 
                onClick={toggle2FA}
                className={`w-12 h-6 rounded-full transition-colors relative ${is2FA ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${is2FA ? 'left-7' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Biometric Access</p>
                <p className="text-xs text-slate-500">Use FaceID or TouchID</p>
              </div>
              <button 
                onClick={toggleBiometric}
                className={`w-12 h-6 rounded-full transition-colors relative ${isBiometric ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isBiometric ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Device History */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="text-brand-500">📱</span> Active Sessions
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="text-2xl">💻</div>
              <div>
                <p className="text-sm font-bold">MacBook Pro (Current)</p>
                <p className="text-[10px] text-slate-400 uppercase font-black">Lagos, Nigeria • {lastLogin}</p>
              </div>
            </div>
            <button className="w-full py-3 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 rounded-xl transition-colors">
              Log out of all other devices
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Security;
