import React, { useState, useEffect } from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [twoFACode, setTwoFACode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  
  const [username, setUsername] = useState('jenifer.jackson');
  const [password, setPassword] = useState('');

  // Sync theme state with document element
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const biometricsAvailable = !!(window.PublicKeyCredential && window.navigator.credentials);
  // We'll treat it as registered for this demo, or you can check localStorage
  const hasRegisteredBiometrics = true; 

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setAuthError('Please enter both username and password.');
      return;
    }
    setIsLoading(true);
    setAuthError(null);
    
    setTimeout(() => {
      setIsLoading(false);
      const is2FAEnabled = localStorage.getItem('is2FAEnabled') === 'true' || username === 'jenifer.jackson';
      if (is2FAEnabled) {
        setShow2FA(true);
      } else {
        onLogin();
      }
    }, 1200);
  };

  const handleBiometricLogin = async () => {
    setAuthError(null);
    setIsAuthenticating(true);
    
    // Simulated Biometric Scan
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin();
    }, 2000);
  };

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    if (twoFACode === '123456') {
      onLogin();
    } else {
      setAuthError('Invalid verification code (Hint: Use 123456)');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 sm:p-6 overflow-y-auto selection:bg-brand-500/30 transition-colors duration-500">
      
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand-500 transition-all shadow-sm"
        >
          {isDarkMode ? '🌞' : '🌙'}
        </button>
      </div>

      <div className="max-w-md w-full py-8">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-brand-600 to-brand-400 rounded-3xl flex items-center justify-center text-white shadow-xl mx-auto mb-6 animate-fade-in">
            <span className="text-3xl">🛡️</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">TrustBank</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Secure Banking Gateway</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-slate-100 dark:border-white/5 transition-colors duration-500">
          
          {/* Biometric Overlay */}
          {isAuthenticating && (
            <div className="absolute inset-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-fade-in">
               <div className="w-24 h-24 mb-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Authenticating</h3>
               <p className="text-slate-500 dark:text-slate-400 text-sm">Verifying biometric identity...</p>
               <button onClick={() => setIsAuthenticating(false)} className="mt-8 text-xs font-bold uppercase text-slate-400">Cancel</button>
            </div>
          )}

          {show2FA ? (
            <div className="p-8 sm:p-12 animate-fade-in">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Verification</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm">Enter the 6-digit code (Hint: 123456)</p>
              <form onSubmit={handleVerify2FA} className="space-y-6">
                <input 
                  type="text" 
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  className="w-full px-4 py-5 rounded-2xl border-2 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-center tracking-[0.5em] text-3xl font-black outline-none focus:border-brand-500"
                  placeholder="000000"
                />
                <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-5 rounded-2xl shadow-lg">Confirm Identity</button>
              </form>
            </div>
          ) : (
            <div className="p-8 sm:p-12">
              <div className="mb-10">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-1">Sign In</h2>
                <p className="text-slate-500 font-medium">Welcome back, Jenifer.</p>
              </div>
              
              {authError && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">{authError}</div>}

              <form onSubmit={handlePasswordLogin} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white outline-none focus:border-brand-500"
                    placeholder="••••••••"
                  />
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-5 rounded-2xl shadow-xl flex justify-center items-center">
                  {isLoading ? 'Processing...' : 'Open Dashboard'}
                </button>
              </form>

              {hasRegisteredBiometrics && (
                <div className="mt-8 pt-8 border-t dark:border-slate-800 text-center">
                  <button onClick={handleBiometricLogin} className="text-brand-500 font-bold flex items-center justify-center gap-2 w-full">
                    <span>🧬</span> Biometric Login
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <p className="text-center text-slate-400 mt-10 text-sm">Protected by TrustBank Secure Infrastructure</p>
      </div>
    </div>
  );
};

export default Login;
