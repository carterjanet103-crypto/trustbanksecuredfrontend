import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, user, onNavigate, onLogout }) => {
  const menuItems = [
    { id: 'DASHBOARD', label: 'Overview', icon: '📊' },
    { id: 'TRANSFERS', label: 'Transfers', icon: '💸' },
    { id: 'CARDS', label: 'My Cards', icon: '💳' },
    { id: 'RECEIPTS', label: 'Receipts', icon: '🧾' },
    { id: 'SETTINGS', label: 'Security', icon: '🔒' },
  ];

  const sidebarClass = `fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  }`;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={sidebarClass}>
        <div className="flex flex-col h-full p-6">
          <div className="mb-10 px-2">
            <h1 className="text-2xl font-black text-brand-600 tracking-tight">TrustBank</h1>
            <p className="text-xs text-slate-500 font-medium">SECURE ASSET MANAGEMENT</p>
          </div>

          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); onClose(); }}
                className="w-full flex items-center gap-4 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-600 rounded-2xl transition-all font-medium"
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6 px-2">
              <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.accountNumber}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full px-4 py-3 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-2xl font-bold text-sm hover:bg-rose-100 transition-colors"
            >
              Sign Out Securely
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
