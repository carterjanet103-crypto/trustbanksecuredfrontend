
import React, { useState } from 'react';
import { CURRENT_USER } from '../constants';

interface SettingsProps {
  onNotify?: (msg: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNotify }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: CURRENT_USER.name,
    email: 'jenifer.jackson@trustbank.com',
    phone: '+1 (555) 123-4567'
  });
  
  const [is2FAEnabled, setIs2FAEnabled] = useState(() => localStorage.getItem('is2FAEnabled') === 'true');
  const [isDeviceRegistered, setIsDeviceRegistered] = useState(() => localStorage.getItem('trustbank_device_registered') === 'true');

  const handle2FAToggle = () => {
    const newValue = !is2FAEnabled;
    setIs2FAEnabled(newValue);
    localStorage.setItem('is2FAEnabled', String(newValue));
    onNotify?.(newValue ? "2FA Enabled" : "2FA Disabled");
  };

  const handleDeviceRegistration = async () => {
    // ... existing logic retained for brevity, style update below ...
     setIsRegistering(true);
     setTimeout(() => {
        localStorage.setItem('trustbank_device_registered', 'true');
        setIsDeviceRegistered(true);
        setIsRegistering(false);
        onNotify?.("Device registered successfully");
     }, 1500);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onNotify?.("Profile updated");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Account Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Manage your profile information and security preferences.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Settings Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Contact Info Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wide">Contact Information</h3>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2 bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wide">Security</h3>
            </div>
            <div className="p-6 divide-y divide-slate-100 dark:divide-slate-800">
               
               <div className="flex items-center justify-between py-4 first:pt-0">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">Multi-Factor Authentication</h4>
                    <p className="text-xs text-slate-500 mt-1">Require a verification code when signing in from unknown devices.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={is2FAEnabled} onChange={handle2FAToggle} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
                  </label>
               </div>

               <div className="flex items-center justify-between py-4 last:pb-0">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white">Trusted Device (Biometrics)</h4>
                    <p className="text-xs text-slate-500 mt-1">Enable Fingerprint/Face ID for quick access on this device.</p>
                  </div>
                  <button 
                    onClick={handleDeviceRegistration}
                    disabled={isRegistering}
                    className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wide transition-colors border ${
                      isDeviceRegistered 
                      ? 'border-red-200 text-red-600 bg-red-50 hover:bg-red-100' 
                      : 'border-brand-200 text-brand-700 bg-brand-50 hover:bg-brand-100'
                    }`}
                  >
                    {isDeviceRegistered ? 'Remove' : 'Enable'}
                  </button>
               </div>

            </div>
          </div>
        </div>

        {/* Sidebar Status */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-xl p-6 shadow-md text-white">
             <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Security Status</h4>
             <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold">Good</span>
             </div>
             <div className="w-full bg-slate-700 h-1.5 rounded-full mb-4">
                <div className="bg-green-500 h-1.5 rounded-full w-[95%]"></div>
             </div>
             <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                   Strong Password
                </li>
                <li className="flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                   2FA Enabled
                </li>
             </ul>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
             <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Support</h4>
             <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Need help with your account settings?</p>
             <button className="text-brand-600 text-sm font-semibold hover:underline">Contact Support Team &rarr;</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
