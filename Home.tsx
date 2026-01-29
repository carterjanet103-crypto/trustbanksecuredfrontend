
import React from 'react';
import { CURRENT_USER } from './constants';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  const handleDeadLink = (e: React.MouseEvent) => {
    e.preventDefault();
    onStart(); // Redirect marketing links to Sign In for this demo
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white selection:bg-brand-500 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onStart}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight">TrustBank</span>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-8">
              <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-brand-600 transition-colors">Features</a>
                <a href="#security" onClick={(e) => scrollToSection(e, 'security')} className="hover:text-brand-600 transition-colors">Security</a>
                <a href="#invest" onClick={handleDeadLink} className="hover:text-brand-600 transition-colors">Invest</a>
              </div>
              <button 
                onClick={onStart}
                className="bg-brand-600 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/20 active:scale-95"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 text-xs sm:text-sm font-bold border border-brand-100 dark:border-brand-800 mx-auto lg:mx-0">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Next-Gen Banking Platform
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
              Banking for the <span className="text-brand-600">Future.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the world's most secure and intuitive digital banking platform. Manage assets and grow your wealth with 24/7 assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <button 
                onClick={onStart}
                className="px-8 py-4 bg-brand-600 text-white rounded-2xl font-bold text-base sm:text-lg hover:bg-brand-700 transition-all shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2 group active:scale-95"
              >
                Get Started Now
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
              <button 
                onClick={onStart}
                className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white rounded-2xl font-bold text-base sm:text-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center active:scale-95"
              >
                View Plans
              </button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-slate-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-${200 + i * 100}`}></div>
                ))}
              </div>
              <span>Joined by <strong>2M+</strong> users</span>
            </div>
          </div>
          
          <div className="relative group lg:block cursor-pointer" onClick={onStart}>
            <div className="relative bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] p-4 shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-square sm:aspect-video lg:aspect-auto lg:h-[500px]">
               <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent"></div>
               {/* Simplified mobile visual */}
               <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-4/5 sm:w-3/4 h-40 sm:h-48 bg-slate-900 rounded-3xl shadow-2xl p-6 text-white flex flex-col justify-between rotate-[-4deg] group-hover:rotate-0 transition-transform duration-700">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-sm sm:text-base">TrustBank</span>
                    <div className="w-8 sm:w-10 h-5 sm:h-6 bg-yellow-400 rounded-md"></div>
                  </div>
                  <div className="text-lg sm:text-xl font-mono tracking-wider">•••• •••• •••• 4582</div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs sm:text-sm font-medium uppercase">{CURRENT_USER.name}</span>
                    <span className="text-[10px] opacity-50 font-mono">12/28</span>
                  </div>
               </div>
               
               <div className="absolute bottom-6 right-6 w-52 h-52 sm:w-64 sm:h-64 bg-white dark:bg-slate-700 rounded-3xl shadow-2xl p-5 border border-slate-100 dark:border-slate-600 rotate-[3deg] group-hover:rotate-0 transition-transform duration-700 hidden sm:block">
                  <div className="h-3 w-20 bg-slate-100 dark:bg-slate-600 rounded mb-5"></div>
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 bg-brand-50 dark:bg-brand-900/30 rounded-full shrink-0"></div>
                        <div className="flex-1 space-y-1.5">
                          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-600 rounded"></div>
                          <div className="h-1.5 w-1/2 bg-slate-100 dark:bg-slate-600 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <div className="bg-slate-50 dark:bg-slate-950 py-10 sm:py-12 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-between gap-12 sm:gap-16 opacity-30 grayscale min-w-max px-4">
             <span className="text-xl sm:text-2xl font-black italic tracking-tighter">FORBES</span>
             <span className="text-xl sm:text-2xl font-black italic tracking-tighter">BLOOMBERG</span>
             <span className="text-xl sm:text-2xl font-black italic tracking-tighter">TECHCRUNCH</span>
             <span className="text-xl sm:text-2xl font-black italic tracking-tighter">WIRED</span>
             <span className="text-xl sm:text-2xl font-black italic tracking-tighter">FASTCOMPANY</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section id="features" className="py-16 sm:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Everything You Need.</h2>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">Powering your financial future with smart technology and industry-leading security.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { 
                title: 'Global Payments', 
                desc: 'Send money anywhere in the world instantly with competitive exchange rates.',
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
              },
              { 
                title: 'High-Yield Savings', 
                desc: 'Earn up to 4.5% APY on your savings, compounded daily and paid monthly.',
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              },
              { 
                title: 'Ironclad Security', 
                desc: 'Your data and funds are protected by bank-level 256-bit AES encryption.',
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              },
              { 
                title: 'Investment Tools', 
                desc: 'Access real-time market data and automated investment portfolios.',
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
              },
              { 
                title: 'Virtual Cards', 
                desc: 'Generate disposable virtual cards for secure online shopping.',
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
              },
              { 
                title: '24/7 Support', 
                desc: 'Priority access to our dedicated financial concierge team.',
                icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              }
            ].map((f, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-brand-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section (New) */}
      <section id="security" className="py-16 sm:py-24 px-4 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-64 bg-brand-600/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 p-64 bg-blue-600/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                 <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Uncompromising Security.</h2>
                 <p className="text-slate-400 text-lg leading-relaxed">We utilize military-grade encryption and biometric authentication to ensure your assets are accessible only by you.</p>
                 <ul className="space-y-4 mt-4">
                    {['End-to-End Encryption', 'Biometric Hardware Keys', 'Real-time Fraud Monitoring', 'FDIC Insured Deposits'].map((item, i) => (
                       <li key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center">
                             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                          </div>
                          <span className="font-bold">{item}</span>
                       </li>
                    ))}
                 </ul>
              </div>
              <div className="bg-slate-800 rounded-[2.5rem] p-8 border border-slate-700 shadow-2xl">
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                       <div className="w-3 h-3 rounded-full bg-red-500"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs font-mono text-slate-500">SECURE_CONNECTION_ESTABLISHED</div>
                 </div>
                 <div className="space-y-4 font-mono text-sm text-green-400">
                    <div>&gt; initiating_handshake...</div>
                    <div>&gt; verifying_identity_token... <span className="text-brand-400">OK</span></div>
                    <div>&gt; encrypting_channel (AES-256)... <span className="text-brand-400">OK</span></div>
                    <div>&gt; access_granted</div>
                    <div className="h-px bg-slate-700 my-4"></div>
                    <div className="text-white text-center py-8">
                       <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                       <div className="text-xs uppercase tracking-widest text-slate-400">Processing Secure Request</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-16 sm:pt-20 pb-10 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center sm:text-left">
          <div className="col-span-1 sm:col-span-2 space-y-6">
            <div className="flex items-center justify-center sm:justify-start gap-2 cursor-pointer" onClick={onStart}>
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
              </div>
              <span className="text-xl font-bold">TrustBank</span>
            </div>
            <p className="text-slate-400 max-w-sm mx-auto sm:mx-0 text-sm leading-relaxed">TrustBank is a financial technology company. Banking services provided by our partner banks, members FDIC.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Products</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" onClick={handleDeadLink} className="hover:text-white transition-colors">Checking Account</a></li>
              <li><a href="#" onClick={handleDeadLink} className="hover:text-white transition-colors">Savings Builder</a></li>
              <li><a href="#" onClick={handleDeadLink} className="hover:text-white transition-colors">Business Banking</a></li>
              <li><a href="#" onClick={handleDeadLink} className="hover:text-white transition-colors">TrustCard Platinum</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-500">Company</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" onClick={handleDeadLink} className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" onClick={handleDeadLink} className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" onClick={handleDeadLink} className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" onClick={handleDeadLink} className="hover:text-white transition-colors">Legal & Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 mt-16 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] sm:text-xs text-slate-500 text-center sm:text-left">
           <p>© 2025 TrustBank Technologies Inc. All rights reserved.</p>
           <div className="flex gap-6 sm:gap-8 font-medium">
             <a href="#" onClick={handleDeadLink} className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" onClick={handleDeadLink} className="hover:text-white transition-colors">Terms of Service</a>
             <a href="#" onClick={handleDeadLink} className="hover:text-white transition-colors">Cookie Policy</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
