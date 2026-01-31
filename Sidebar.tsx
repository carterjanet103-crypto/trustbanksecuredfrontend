import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<Props> = ({ isOpen, onClose, user, onNavigate, onLogout }) => {
  return (
    <aside
      className={`fixed lg:static top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 shadow-lg p-6 transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <h2 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white">
        TrustBank
      </h2>

      <nav className="space-y-4">
        <button onClick={() => onNavigate("DASHBOARD")} className="nav-btn">Dashboard</button>
        <button onClick={() => onNavigate("TRANSFERS")} className="nav-btn">Transfers</button>
        <button onClick={() => onNavigate("CARDS")} className="nav-btn">Cards</button>
        <button onClick={() => onNavigate("SETTINGS")} className="nav-btn">Security</button>
      </nav>

      <div className="absolute bottom-6 left-6">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
          Logged in as <strong>{user?.name || "User"}</strong>
        </p>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
