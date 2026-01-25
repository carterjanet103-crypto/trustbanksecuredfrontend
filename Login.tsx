
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

  // Manage theme specifically for login screen before entering dashboard
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
  const hasRegisteredBiometrics = localStorage.getItem('trustbank_device_registered') === 'true';

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setAuthError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    setAuthError(null);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const is2FAEnabled = localStorage.getItem('is2FAEnabled') === 'true';
      if (is2FAEnabled) {
        setShow2FA(true);
      } else {
        onLogin();
      }
    }, 1200);
  };

  const handleBiometricLogin = async () => {
    if (!biometricsAvailable || !hasRegisteredBiometrics) {
      setAuthError('Biometric authentication is not set up on this device.');
      return;
    }

    setAuthError(null);
    setIsAuthenticating(true);

    try {
      const publicKeyOptions: PublicKeyCredentialRequestOptions = {
        challenge: Uint8Array.from("trustbank_secure_challenge_" + Date.now(), c => c.charCodeAt(0)),
        timeout: 60000,
        userVerification: "required",
        rpId: window.location.hostname || "localhost",
      };

      try {
        const credential = await navigator.credentials.get({
          publicKey: publicKeyOptions
        });
        
        if (credential) {
          setTimeout(() => {
            setIsAuthenticating(false);
            onLogin();
          }, 800);
        }
      } catch (domException) {
        // Fallback simulation for local/restricted environments where actual WebAuthn might fail
        console.warn("WebAuthn skipped in dev environment, falling back to simulated success.");
        setTimeout(() => {
          setIsAuthenticating(false);
          onLogin();
        }, 2000);
      }
    } catch (err) {
      setIsAuthenticating(false);
      setAuthError('Biometric verification failed. Please try password.');
    }
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
      
      {/* Absolute Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-all shadow-sm"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          )}
        </button>
      </div>

      <div className="max-w-md w-full py-8">
        {/* Brand Header */}
        <div className="text-center mb-10">
           <div className="w-16 h-16 bg-gradient-to-tr from-brand-600 to-brand-400 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-brand-500/20 dark:shadow-[0_0_40px_rgba(14,165,233,0.3)] mx-auto mb-6 animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
          </div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">TrustBank</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Secure Banking Gateway</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-slate-100 dark:border-white/5 transition-colors duration-500">
          
          {/* Biometric Overlay */}
          {isAuthenticating && (
            <div className="absolute inset-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-fade-in">
               <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-full border-2 border-brand-500/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500 animate-pulse"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <div className="absolute inset-0 border-4 border-brand-500 rounded-full border-t-transparent animate-spin"></div>
               </div>
               <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Authenticating</h3>
               <p className="text-slate-500 dark:text-slate-400 text-sm">Please verify your identity using system biometrics.</p>
               <button 
                onClick={() => setIsAuthenticating(false)}
                className="mt-8 text-slate-400 dark:text-slate-500 hover:text-brand-500 transition-colors text-xs font-bold uppercase tracking-widest"
               >
                 Cancel Scan
               </button>
            </div>
          )}

          {show2FA ? (
            <div className="p-8 sm:p-12 animate-fade-in">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Verification</h2>
              <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm">A 6-digit secure code has been sent to your primary device.</p>
              
              <form onSubmit={handleVerify2FA} className="space-y-6">
                <input 
                  type="text" 
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                  className="w-full px-4 py-5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:border-brand-500 focus:outline-none transition-all text-center tracking-[0.8em] text-3xl font-black font-mono shadow-inner"
                  placeholder="000000"
                  autoFocus
                />
                <button 
                  type="submit" 
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-brand-500/30 transition-all active:scale-[0.98]"
                >
                  Confirm Identity
                </button>
              </form>
            </div>
          ) : (
            <div className="p-8 sm:p-12">
              <div className="mb-10 text-center sm:text-left">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-1">Sign In</h2>
                <p className="text-base text-slate-500 font-medium">Jenifer, welcome back to your account.</p>
              </div>
              
              {authError && (
                 <div className="mb-8 p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 text-xs font-bold rounded-2xl flex items-center gap-3 border border-red-100 dark:border-red-500/20 animate-shake">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {authError}
                 </div>
              )}

              <form onSubmit={handlePasswordLogin} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2.5">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 outline-none transition-all font-medium text-base"
                    placeholder="jenifer.jackson"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2.5">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Password</label>
                    <a href="#" className="text-[10px] font-black uppercase tracking-widest text-brand-500 hover:text-brand-400">Recovery?</a>
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 outline-none transition-all font-medium text-base"
                    placeholder="••••••••"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-500/30 transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center gap-3 text-lg"
                >
                  {isLoading ? <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Open Dashboard'}
                </button>
              </form>

              {hasRegisteredBiometrics && (
                <div className="mt-10">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-white dark:bg-slate-900 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Trusted Device</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleBiometricLogin}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 font-bold py-5 rounded-2xl transition-all hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-3 shadow-sm active:scale-95 text-base"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                    Biometric Login
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <p className="text-center text-slate-400 dark:text-slate-500 mt-12 text-sm font-medium">
          Protected by TrustBank Secure Infrastructure <span className="mx-2">•</span> <a href="#" className="text-brand-500 hover:text-brand-400 font-bold">Privacy</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
