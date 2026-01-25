
import React, { useState } from 'react';

interface SupportProps {
  onNotify?: (msg: string) => void;
}

const Support: React.FC<SupportProps> = ({ onNotify }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const faqs = [
    {
      q: "How do I reset my transaction PIN?",
      a: "Go to Settings > Security Protocols and select 'Change PIN'. You will need to verify your identity via SMS or biometric scan."
    },
    {
      q: "What are the daily transfer limits?",
      a: "Standard accounts have a daily internal transfer limit of $5,000 and an external wire limit of $10,000. Contact support to request an increase."
    },
    {
      q: "How do I report a lost card?",
      a: "Navigate to the 'Cards' tab and select the card you wish to manage. Click the 'Lock Card' icon immediately to prevent unauthorized use, then contact support for a replacement."
    },
    {
      q: "Are my funds FDIC insured?",
      a: "Yes, funds held in TrustBank accounts are insured up to $250,000 per depositor through our partner banking network."
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;

    setIsSending(true);
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setSubject('');
      setMessage('');
      onNotify?.("Message sent to support team");
      
      setTimeout(() => setSentSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-12">
      <div className="px-1">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Help Center</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Get assistance with your account and transactions.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
             <div className="p-8 sm:p-10">
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Secure Message</h3>
                
                {sentSuccess ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-2xl p-6 text-center animate-fade-in">
                     <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                     </div>
                     <h4 className="font-bold text-slate-900 dark:text-white">Message Sent</h4>
                     <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Case ID: #TB-{Math.floor(Math.random() * 10000)}<br/>A representative will reply within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-5">
                    <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Topic</label>
                       <select 
                         value={subject}
                         onChange={(e) => setSubject(e.target.value)}
                         className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-brand-500 outline-none transition-all font-medium appearance-none"
                         required
                       >
                         <option value="">Select a topic...</option>
                         <option value="Transaction Dispute">Transaction Dispute</option>
                         <option value="Account Access">Account Access</option>
                         <option value="Card Issues">Card Issues</option>
                         <option value="General Inquiry">General Inquiry</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Message</label>
                       <textarea 
                         value={message}
                         onChange={(e) => setMessage(e.target.value)}
                         className="w-full px-5 py-3.5 rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-brand-500 outline-none transition-all font-medium min-h-[150px] resize-none"
                         placeholder="Describe your issue in detail..."
                         required
                       />
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSending}
                      className="w-full bg-brand-600 hover:bg-brand-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-brand-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center"
                    >
                       {isSending ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
             </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden p-8 sm:p-10">
             <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h3>
             <div className="space-y-4">
               {faqs.map((faq, i) => (
                 <div key={i} className="border border-slate-100 dark:border-slate-700 rounded-2xl p-5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">{faq.q}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
           <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-24 bg-brand-500/20 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4 relative z-10">Direct Contact</h4>
              
              <div className="space-y-6 relative z-10">
                 <div>
                    <div className="text-2xl font-black text-white">1-800-TRUST-BK</div>
                    <div className="text-xs text-slate-400 mt-1">24/7 Priority Support Line</div>
                 </div>
                 <div>
                    <div className="text-lg font-bold text-white">support@trustbank.com</div>
                    <div className="text-xs text-slate-400 mt-1">General Inquiries</div>
                 </div>
                 <div className="pt-4 border-t border-white/10">
                    <div className="text-xs text-slate-400 mb-2 font-medium">Headquarters</div>
                    <address className="text-sm text-white not-italic">
                       100 Financial District Blvd<br/>
                       Suite 500<br/>
                       New York, NY 10005
                    </address>
                 </div>
              </div>
           </div>
           
           <div className="bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/30 rounded-[2rem] p-8">
              <h4 className="font-bold text-brand-900 dark:text-white mb-2">Live Chat Status</h4>
              <div className="flex items-center gap-2 mb-4">
                 <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                 <span className="text-sm font-medium text-brand-700 dark:text-brand-300">Agents Available</span>
              </div>
              <p className="text-xs text-brand-600 dark:text-brand-400 leading-relaxed">
                 Our support team is currently experiencing normal call volumes. Expected wait time: &lt; 2 minutes.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
